import React, { Component } from "react";
import Container from "../../components/Container";
import vehicleApi from "../../utils/API";
import forumApi from "../../utils/forumApi";
import Loading from "../../components/Loading";
import ThreadDetails from "../../components/ThreadDetails";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import { toast } from "react-toastify";
import { defaults } from "../../assets/Defaults";
import { events } from "../../assets/Events";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import DeleteThreadModal from "../../components/Modal/DeleteThreadModal";
import DeleteThreadCommentModal from "../../components/Modal/DeleteThreadCommentModal";
import EditOneThreadCommentModal from "../../components/Modal/EditOneThreadCommentModal";
import UpdateThreadDetailsSuccessModal from "../../components/Modal/UpdateThreadDetailsSuccessModal";

export default class Thread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props,
      uniqueCreatorId: "",
      commentId: "",
      email: "",
      loggedin: false,
      theme: "",
      currentTheme: "",
      backgroundPicture: "",
      pageLoaded: false,
      threadId: "",
      threadTitle: "",
      threadTitleBackup: "",
      threadDescription: "",
      threadDescriptionBackup: "",
      threadComment: "",
      threadCommentToUpdate: "",
      commentsToShowInModal: "",
      allThreads: [],
      formattedEmail: "",
      formattedDate: "",
      disableEditThreadDetails: true,
      showUpdateThreadDetailsSuccessModal: false,
      showDeleteThreadModal: false,
      disableUpVoteButton: false,
      disableDownVoteButton: false,
      showDeleteThreadCommentModal: false,
      disableConfirmSaveEditThreadCommentButton: false,
      showEditOneThreadCommentModal: false,
      disableSubmitCommentOnThreadButton: false
    };
  };

  /**
   * Get the theme for the user
   */
  componentDidMount = () => {
    try {
      this.setState(
        {
          threadId: this.state.props.location.state[0],
          threadTitle: this.state.props.location.state[1],
          threadTitleBackup: this.state.props.location.state[1],
          threadDescription: this.state.props.location.state[2],
          threadDescriptionBackup: this.state.props.location.state[2],
          formattedEmail: this.state.props.location.state[3],
          formattedDate: this.state.props.location.state[4]
        }, () => {
          this.getAllThreadComments();
        });
    } catch (e) {
      window.location = "/";
    }
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Scroll to the top of the page
   */
  backToTopOfPage = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /**
   * Simulate the back button to go to the previous page
   */
  backButton = () => {
    try {
      window.history.back();
    } catch (e) {
      window.location = "/";
    }
  };

  /**
   * Check if the user input value is blank
   */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Retrieve the theme for the user then load the page
   */
  getUserInformation = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                uniqueCreatorId: user.uid,
                email: user.email,
                pageLoaded: true,
                loggedin: true
              }, () => this.determineTheme());
            } catch (err) {
              this.errorNotification(err);
              this.setState({ pageLoaded: true });
            }
          })
          .catch(err => {
            this.errorNotification(err);
            this.setState({ pageLoaded: true });
          });
      } else {
        this.setState({ pageLoaded: true });
      }
    });
  };

  /**
   * Get all comments to the thread
   */
  getAllThreadComments = () => {
    forumApi.getAllThreadComments(this.state.threadId)
      .then(res => {
        this.setState({ allThreads: res.data[0] },
          () => this.getUserInformation());
      })
      .catch(err => {
        this.errorNotification(err);
        this.setState({ pageLoaded: true });
      });
  };

  /**
   * Add a comment to the chosen thread
   */
  addOneCommentToThread = () => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.addCommentToThread;
    let threadCommentPayload = {
      creator: this.state.uniqueCreatorId,
      email: this.state.email,
      comment: this.state.threadComment,
      votes: 0
    }
    forumApi.addOneCommentToOneThread(this.state.threadId, threadCommentPayload)
      .then(() => {
        this.setState({
          threadComment: "",
          disableSubmitCommentOnThreadButton: false
        },
          () => {
            eventLogHandler.successful(creatorId, email, event);
            this.successNotification(defaults.addThreadCommentSucess);
            this.getAllThreadComments();
          });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
        this.setState({ disableSubmitCommentOnThreadButton: false });
      });
  };

  /**
   * Update the title to the thread
   */
  handleUpdateThreadDetails = () => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.updateThreadDetails;
    let threadPayload = {
      threadTitle: this.state.threadTitle,
      threadDescription: this.state.threadDescription
    }
    forumApi.handleUpdateThreadDetails(this.state.threadId, threadPayload)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.showUpdateThreadDetailsSuccessModal();
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
      });
  };

  /**
   * Delete a thread
   */
  handleDeleteThread = () => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.deleteThread;
    forumApi.deleteThread(this.state.threadId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        window.location.assign(window.location.origin + "/forum");
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
      });
  };

  /**
   * Handle up vote on a comment
   */
  handleUpvoteComment = commentId => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.upvoteComment;
    forumApi.handleCommentUpVote(this.state.threadId, commentId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        vehicleApi.recordVotedThreadComment(this.state.uniqueCreatorId, commentId)
          .then(() => {
            this.setState({ disableUpVoteButton: false }, () => {
              this.getAllThreadComments();
            });
          })
          .catch(err => {
            this.setState({ disableUpVoteButton: false }, () => {
              this.errorNotification(err);
            });
          });
      })
      .catch(err => {
        this.setState({ disableUpVoteButton: false }, () => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.errorNotification(err);
        });
      });
  };

  /**
   * Handle down vote on a comment
   */
  handleDownvoteComment = commentId => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.downvoteComment;
    forumApi.handleCommentDownVote(this.state.threadId, commentId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        vehicleApi.recordVotedThreadComment(this.state.uniqueCreatorId, commentId)
          .then(() => {
            this.setState({ disableDownVoteButton: false }, () => {
              this.getAllThreadComments();
            });
          })
          .catch(err => {
            this.setState({ disableDownVoteButton: false }, () => {
              this.errorNotification(err);
            });
          });
      })
      .catch(err => {
        this.setState({ disableDownVoteButton: false }, () => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.errorNotification(err);
        });
      });
  };

  /**
   * Delete the comment from the thread
   */
  handleDeleteThreadComment = () => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.deleteThreadComment;
    forumApi.handleDeleteThreadComment(this.state.threadId, this.state.commentId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.successNotification(defaults.deleteThreadCommentSucess)
        this.hideDeleteThreadCommentModal();
        this.getAllThreadComments();
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.hideDeleteThreadCommentModal();
        this.errorNotification(err);
      });
  };

  /**
   * Update the thread comment
   */
  handleUpdateThreadComment = newComment => {
    this.setState({ disableConfirmSaveEditThreadCommentButton: true });
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.updateThreadComment;
    const updatedThreadCommentPayload = {
      comment: newComment
    };
    forumApi.handleUpdateThreadComment(
      this.state.commentId,
      updatedThreadCommentPayload
    ).then(() => {
      this.setState({
        threadCommentToUpdate: "",
        disableConfirmSaveEditThreadCommentButton: false
      },
        () => {
          eventLogHandler.successful(creatorId, email, event);
          this.successNotification(defaults.updateThreadCommentSucess);
          this.hideEditOneThreadCommentModal();
          this.getAllThreadComments();
        });
    }).catch(err => {
      eventLogHandler.failure(creatorId, email, event, err);
      this.setState({ disableConfirmSaveEditThreadCommentButton: false });
      this.errorNotification(err);
    });
  };

  /**
   * Validate the new thread comment input before saving it
   */
  validateAddOneCommentToThread = e => {
    e.preventDefault();
    this.setState({ disableSubmitCommentOnThreadButton: true });
    if (this.state.threadComment === "" || this.checkIfStringIsBlank(this.state.threadComment)) {
      this.setState({ disableSubmitCommentOnThreadButton: false },
        () => this.errorNotification(defaults.threadCommentsCannotBeBlank));
    } else {
      this.addOneCommentToThread();
    }
  };

  /**
   * Validate the edited thread title before saving it
   */
  validateEditedThreadDetails = () => {
    if (
      this.state.threadTitle === "" ||
      this.state.threadDescription === "" ||
      this.checkIfStringIsBlank(this.state.threadTitle) ||
      this.checkIfStringIsBlank(this.state.threadDescription)
    ) {
      this.setState({
        threadTitle: this.state.threadTitleBackup,
        threadDescription: this.state.threadDescriptionBackup,
      }, () => this.errorNotification(defaults.threadDetailsCannotBeBlank));
    } else {
      this.handleUpdateThreadDetails();
    }
  };

  /**
   * Check if the user has voted on this comment before for up voting
   */
  validateUserToUpvoteComment = commentId => {
    this.setState({ disableUpVoteButton: true });
    vehicleApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        let votedComments = res.data.votedComments;
        let hasUserVotedOnThisComment = votedComments.includes(commentId);
        if (hasUserVotedOnThisComment) {
          this.errorNotification(defaults.alreadyVotedOnComment);
          this.setState({ disableUpVoteButton: false });
        } else {
          this.handleUpvoteComment(commentId);
        }
      })
      .catch(err => {
        this.setState(
          { disableUpVoteButton: false },
          () => this.errorNotification(err)
        );
      });
  };

  /**
   * Check if the user has voted on this comment before for down voting
   */
  validateUserToDownvoteComment = commentId => {
    this.setState({ disableDownVoteButton: true });
    vehicleApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        let votedComments = res.data.votedComments;
        let hasUserVotedOnThisComment = votedComments.includes(commentId);
        if (hasUserVotedOnThisComment) {
          this.errorNotification(defaults.alreadyVotedOnComment);
          this.setState({ disableDownVoteButton: false });
        } else {
          this.handleDownvoteComment(commentId);
        }
      })
      .catch(err => {
        this.setState(
          { disableDownVoteButton: false },
          () => this.errorNotification(err)
        );
      });
  };

  /**
   * Check the updated comment before saving
   */
  validateThreadCommentInput = e => {
    e.preventDefault();
    let unTouchedComment = this.state.commentsToShowInModal;
    let commentToUpdate = this.state.threadCommentToUpdate;
    let newComment = "";
    if (commentToUpdate) {
      newComment = commentToUpdate;
    } else {
      newComment = unTouchedComment;
    }
    if (this.checkIfStringIsBlank(newComment)) {
      this.errorNotification(defaults.threadCommentsCannotBeBlank);
    } else {
      this.handleUpdateThreadComment(newComment);
    }
  };

  /**
   * Determine what the current theme is
   */
  determineTheme = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.renderTheme(themes.carSpace);
          break;
        case "light":
          this.renderTheme(themes.light);
          break;
        case "grey":
          this.renderTheme(themes.grey);
          break;
        case "dark":
          this.renderTheme(themes.dark);
          break;
        default:
          this.errorNotification(defaults.themeSelectionError);
      }
    }
  };

  /**
   * Render the theme and background picture
   */
  renderTheme = theme => {
    this.setState({ currentTheme: theme });
    if (this.state.backgroundPicture) {
      document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
    } else {
      document.body.style.backgroundColor = theme.backgroundColor;
    }
  };

  /**
   * Enable editing for the thread details
   */
  enableEditThreadDetails = () => {
    if (this.state.disableEditThreadDetails) {
      this.setState({ disableEditThreadDetails: false });
    } else {
      this.setState({ disableEditThreadDetails: true });
    }
  };

  /**
   * Enable editing for the thread comment
   */
  showEditOneThreadCommentModal = (commentId, commentsToShowInModal) => {
    this.setState({
      showEditOneThreadCommentModal: true,
      commentId: commentId,
      commentsToShowInModal: commentsToShowInModal
    });
  };

  /**
   * Show the delete thread comment modal
   */
  showDeleteThreadCommentModal = commentId => {
    this.setState({
      showDeleteThreadCommentModal: true,
      commentId: commentId
    });
  };

  /**
   * Show the delete thread modal
   */
  showDeleteThreadModal = () => {
    this.setState({ showDeleteThreadModal: true });
  };

  /**
   * Show the update thread details success modal
   */
  showUpdateThreadDetailsSuccessModal = () => {
    this.setState({ showUpdateThreadDetailsSuccessModal: true });
  };

  /**
   * Hide the delete thread comment modal
   */
  hideDeleteThreadCommentModal = () => {
    this.setState({
      showDeleteThreadCommentModal: false,
      commentId: ""
    });
  };

  /**
   * Hide the delete thread modal
   */
  hideDeleteThreadModal = () => {
    this.setState({ showDeleteThreadModal: false });
  };

  /**
   * Hide the update thread details success modal
   */
  hideUpdateThreadDetailsSuccessModal = () => {
    window.location.assign(window.location.origin + "/forum");
  };

  /**
   * Hide the update thread comment modal
   */
  hideEditOneThreadCommentModal = () => {
    this.setState({ showEditOneThreadCommentModal: false });
  };

  /**
   * Display the success notification when the user performs an action successfully
   * 
   * @param message the message to display to the user
   */
  successNotification = message => {
    toast.success(message);
  };

  /**
   * Display the error notification when an error occurs while loading data from the database
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.pageLoaded ?
            (
              <Container>
                <ThreadDetails
                  loggedin={this.state.loggedin}
                  uniqueCreatorId={this.state.uniqueCreatorId}
                  threadTitle={this.state.threadTitle}
                  threadDescription={this.state.threadDescription}
                  threadComment={this.state.threadComment}
                  allThreads={this.state.allThreads}
                  disableEditThreadDetails={this.state.disableEditThreadDetails}
                  disableUpVoteButton={this.state.disableUpVoteButton}
                  disableDownVoteButton={this.state.disableDownVoteButton}
                  disableEditThreadComment={this.state.disableEditThreadComment}
                  disableSubmitCommentOnThreadButton={this.state.disableSubmitCommentOnThreadButton}
                  showEditOneThreadCommentModal={this.showEditOneThreadCommentModal}
                  showDeleteThreadCommentModal={this.showDeleteThreadCommentModal}
                  showDeleteThreadModal={this.showDeleteThreadModal}
                  validateEditedThreadDetails={this.validateEditedThreadDetails}
                  enableEditThreadDetails={this.enableEditThreadDetails}
                  handleChange={this.handleChange}
                  backToTopOfPage={this.backToTopOfPage}
                  backButton={this.backButton}
                  validateAddOneCommentToThread={this.validateAddOneCommentToThread}
                  validateUserToUpvoteComment={this.validateUserToUpvoteComment}
                  validateUserToDownvoteComment={this.validateUserToDownvoteComment}
                  currentTheme={this.state.currentTheme}
                />
              </Container>
            ) : (
              <Loading />
            )
        }
        <DeleteThreadModal
          showDeleteThreadModal={this.state.showDeleteThreadModal}
          hideDeleteThreadModal={this.hideDeleteThreadModal}
          handleDeleteThread={this.handleDeleteThread}
          currentTheme={this.state.currentTheme}
        />
        <DeleteThreadCommentModal
          showDeleteThreadCommentModal={this.state.showDeleteThreadCommentModal}
          hideDeleteThreadCommentModal={this.hideDeleteThreadCommentModal}
          handleDeleteThreadComment={this.handleDeleteThreadComment}
          currentTheme={this.state.currentTheme}
        />
        <EditOneThreadCommentModal
          commentsToShowInModal={this.state.commentsToShowInModal}
          showEditOneThreadCommentModal={this.state.showEditOneThreadCommentModal}
          disableConfirmSaveEditThreadCommentButton={this.state.disableConfirmSaveEditThreadCommentButton}
          handleChange={this.handleChange}
          hideEditOneThreadCommentModal={this.hideEditOneThreadCommentModal}
          validateThreadCommentInput={this.validateThreadCommentInput}
          currentTheme={this.state.currentTheme}
        />
        <UpdateThreadDetailsSuccessModal
          showUpdateThreadDetailsSuccessModal={this.state.showUpdateThreadDetailsSuccessModal}
          hideUpdateThreadDetailsSuccessModal={this.hideUpdateThreadDetailsSuccessModal}
          currentTheme={this.state.currentTheme}
        />
      </React.Fragment>
    );
  };
};
