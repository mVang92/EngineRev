import React, { Component } from "react";
import Container from "../../components/Container";
import userApi from "../../utils/userApi";
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
    super()
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
      disableSubmitCommentOnThreadButton: false,
      disableSaveEditThreadButton: false
    };
  };

  uniqueCreatorId;
  incrementViewsTimeout;

  /**
   * Load state
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
          threadCategory: this.state.props.location.state[3],
          formattedEmail: this.state.props.location.state[4],
          formattedDate: this.state.props.location.state[5]
        }, () => {
          this.getAllThreadComments();
        });
    } catch (e) {
      window.location = "/";
    }
  };

  /**
   * Cleanup DOM elements to prevent memory leak 
   */
  componentWillUnmount = () => {
    clearTimeout(this.incrementViewsTimeout);
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
   * 
   * @param string the user input to check against
   */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getUserInformation = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        userApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                uniqueCreatorId: user.uid,
                email: user.email,
                pageLoaded: true,
                loggedin: true
              }, () => {
                this.uniqueCreatorId = this.state.uniqueCreatorId;
                this.determineTheme();
              });
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
            let element = document.getElementById("commentsSection");
            element.scrollIntoView();
          });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
        this.setState({ disableSubmitCommentOnThreadButton: false });
      });
  };

  /**
   * Update the title, description, and category to the thread
   * 
   * @param threadCategory the category to record for the thread
   */
  handleUpdateThreadDetails = threadCategory => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.updateThreadDetails;
    let threadPayload = {
      threadTitle: this.state.threadTitle,
      threadDescription: this.state.threadDescription,
      threadCategory: threadCategory
    }
    this.setState({ disableSaveEditThreadButton: true });
    forumApi.handleUpdateThreadDetails(this.state.threadId, threadPayload)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.showUpdateThreadDetailsSuccessModal();
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.setState({ disableSaveEditThreadButton: false });
        this.errorNotification(err);
      });
  };

  /**
   * Validate the user has permission to delete the thread
   */
  validateDeleteThread = () => {
    userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        if (res.data.creator === this.uniqueCreatorId) {
          this.handleDeleteThread();
        } else {
          this.doNoAuthorization();
        }
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
   * 
   * @param commentId the comment id to apply vote to and record to the user voted comments
   */
  handleUpvoteComment = commentId => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.upvoteComment;
    forumApi.handleCommentUpVote(this.state.threadId, commentId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        userApi.recordVotedThreadComment(this.state.uniqueCreatorId, commentId)
          .then(() => {
            this.setState({
              disableUpVoteButton: false,
              disableDownVoteButton: false
            }, () => this.getAllThreadComments());
          })
          .catch(err => {
            this.setState({
              disableUpVoteButton: false,
              disableDownVoteButton: false
            }, () => this.errorNotification(err));
          });
      })
      .catch(err => {
        this.setState({
          disableUpVoteButton: false,
          disableDownVoteButton: false
        }, () => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.errorNotification(err);
        });
      });
  };

  /**
   * Handle down vote on a comment
   * 
   * @param commentId the comment id to apply vote to and record to the user voted comments
   */
  handleDownvoteComment = commentId => {
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.downvoteComment;
    forumApi.handleCommentDownVote(this.state.threadId, commentId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        userApi.recordVotedThreadComment(this.state.uniqueCreatorId, commentId)
          .then(() => {
            this.setState({
              disableUpVoteButton: false,
              disableDownVoteButton: false
            }, () => this.getAllThreadComments());
          })
          .catch(err => {
            this.setState({
              disableUpVoteButton: false,
              disableDownVoteButton: false
            }, () => this.errorNotification(err));
          });
      })
      .catch(err => {
        this.setState({
          disableUpVoteButton: false,
          disableDownVoteButton: false
        }, () => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.errorNotification(err);
        });
      });
  };

  /**
   * Validate the user is able to delete the comment
   */
  validateDeleteThreadComment = () => {
    userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        if (res.data.creator === this.uniqueCreatorId) {
          this.handleDeleteThreadComment();
        } else {
          this.doNoAuthorization();
        }
      });
  };

  /**
   * Delete the thread comment
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
   * 
   * @param newComment the new comment to update the current thread comment
   */
  handleUpdateThreadComment = newComment => {
    this.setState({ disableConfirmSaveEditThreadCommentButton: true });
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const event = events.updateThreadComment;
    const updatedThreadCommentPayload = { comment: newComment };
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
    userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        if (res.data.creator) {
          if (this.state.threadComment === "" || this.checkIfStringIsBlank(this.state.threadComment)) {
            this.setState({ disableSubmitCommentOnThreadButton: false },
              () => this.errorNotification(defaults.threadCommentsCannotBeBlank));
          } else {
            this.addOneCommentToThread();
          }
        } else {
          this.doNoAuthorization();
        }
      })
      .catch(err => {
        this.setState({ disableSubmitCommentOnThreadButton: false });
        this.errorNotification(err);
      });
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
        threadDescription: this.state.threadDescriptionBackup
      }, () => this.errorNotification(defaults.threadDetailsCannotBeBlank));
    } else {
      let element = document.getElementById("threadCategoryDropdown");
      let threadCategory = element.options[element.selectedIndex].value;
      userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
        .then(res => {
          if (res.data.creator === this.uniqueCreatorId) {
            this.handleUpdateThreadDetails(threadCategory);
          } else {
            this.doNoAuthorization();
          }
        });
    }
  };

  /**
   * Check if the user has voted on this comment before for up voting
   * 
   * @param commentId the commment id to check before storing
   */
  validateUserToUpvoteComment = commentId => {
    this.setState({
      disableUpVoteButton: true,
      disableDownVoteButton: true
    });
    userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        if (res.data.creator === this.uniqueCreatorId) {
          try {
            let votedComments = res.data.votedComments;
            if (votedComments.includes(commentId)) {
              this.errorNotification(defaults.alreadyVotedOnComment);
              this.setState({
                disableUpVoteButton: false,
                disableDownVoteButton: false
              });
            } else {
              this.handleUpvoteComment(commentId);
            }
          } catch (err) {
            this.doNoAuthorization();
          }
        } else {
          this.doNoAuthorization();
        }
      })
      .catch(err => {
        this.setState({
          disableUpVoteButton: false,
          disableDownVoteButton: false
        }, () => this.errorNotification(err));
      });
  };

  /**
   * Check if the user has voted on this comment before for down voting
   * 
   * @param commentId the commment id to check before storing
   */
  validateUserToDownvoteComment = commentId => {
    this.setState({
      disableUpVoteButton: true,
      disableDownVoteButton: true
    });
    userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        if (res.data.creator === this.uniqueCreatorId) {
          try {
            let votedComments = res.data.votedComments;
            if (votedComments.includes(commentId)) {
              this.errorNotification(defaults.alreadyVotedOnComment);
              this.setState({
                disableUpVoteButton: false,
                disableDownVoteButton: false
              });
            } else {
              this.handleDownvoteComment(commentId);
            }
          } catch (err) {
            this.doNoAuthorization();
          }
        } else {
          this.doNoAuthorization();
        }
      })
      .catch(err => {
        this.setState({
          disableUpVoteButton: false,
          disableDownVoteButton: false
        }, () => this.errorNotification(err));
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
    if (this.checkIfStringIsBlank(commentToUpdate)) {
      newComment = unTouchedComment;
    } else {
      newComment = commentToUpdate;
    }
    userApi.findUserInformationForOneUser(this.state.uniqueCreatorId)
      .then(res => {
        if (res.data.creator === this.uniqueCreatorId) {
          this.handleUpdateThreadComment(newComment);
        } else {
          this.doNoAuthorization();
        }
      });
  };

  /**
   * Increment the views to the thread
   */
  incrementViews = () => {
    this.incrementViewsTimeout = setTimeout(() => {
      forumApi.handleIncrementViews(this.state.threadId)
        .catch(err => this.errorNotification(err));
    }, 5000);
  };

  /**
   * Alert the user and navigate to the origin URL
   */
  doNoAuthorization = () => {
    alert(defaults.noAuthorizationToPerformAction);
    window.location = "/";
  };

  /**
   * Determine what the current theme is
   */
  determineTheme = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case defaults.carSpaceTheme:
          this.renderTheme(themes.carSpace);
          break;
        case defaults.lightTheme:
          this.renderTheme(themes.light);
          break;
        case defaults.greyTheme:
          this.renderTheme(themes.grey);
          break;
        case defaults.darkTheme:
          this.renderTheme(themes.dark);
          break;
        case defaults.transparentLightTheme:
          this.renderTheme(themes.transparentLight);
          break;
        case defaults.transparentGreyTheme:
          this.renderTheme(themes.transparentGrey);
          break;
        case defaults.transparentDarkTheme:
          this.renderTheme(themes.transparentDark);
          break;
        default:
          this.errorNotification(defaults.themeSelectionError);
      }
    } else {
      if (this.state.backgroundPicture) {
        document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
      } else {
        document.body.style.backgroundImage = "";
      }
    }
  };

  /**
  * Render the theme and background picture
  * 
  * @param theme the theme to render
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
   * 
   * @param commentId the id to identify the comment
   * @param commentsToShowInModal the commments to display in the modal
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
  showDeleteThreadCommentModal = () => {
    this.setState({
      showEditOneThreadCommentModal: false,
      showDeleteThreadCommentModal: true
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
                  threadCategory={this.state.threadCategory}
                  threadComment={this.state.threadComment}
                  allThreads={this.state.allThreads}
                  disableEditThreadDetails={this.state.disableEditThreadDetails}
                  disableEditThreadComment={this.state.disableEditThreadComment}
                  disableUpVoteButton={this.state.disableUpVoteButton}
                  disableDownVoteButton={this.state.disableDownVoteButton}
                  disableSubmitCommentOnThreadButton={this.state.disableSubmitCommentOnThreadButton}
                  showEditOneThreadCommentModal={this.showEditOneThreadCommentModal}
                  showDeleteThreadModal={this.showDeleteThreadModal}
                  validateEditedThreadDetails={this.validateEditedThreadDetails}
                  enableEditThreadDetails={this.enableEditThreadDetails}
                  handleChange={this.handleChange}
                  backToTopOfPage={this.backToTopOfPage}
                  backButton={this.backButton}
                  validateAddOneCommentToThread={this.validateAddOneCommentToThread}
                  validateUserToUpvoteComment={this.validateUserToUpvoteComment}
                  validateUserToDownvoteComment={this.validateUserToDownvoteComment}
                  disableSaveEditThreadButton={this.state.disableSaveEditThreadButton}
                  incrementViews={this.incrementViews}
                  currentTheme={this.state.currentTheme}
                />
              </Container>
            ) :
            (
              <Loading />
            )
        }
        <DeleteThreadModal
          showDeleteThreadModal={this.state.showDeleteThreadModal}
          hideDeleteThreadModal={this.hideDeleteThreadModal}
          validateDeleteThread={this.validateDeleteThread}
          currentTheme={this.state.currentTheme}
        />
        <DeleteThreadCommentModal
          showDeleteThreadCommentModal={this.state.showDeleteThreadCommentModal}
          hideDeleteThreadCommentModal={this.hideDeleteThreadCommentModal}
          validateDeleteThreadComment={this.validateDeleteThreadComment}
          currentTheme={this.state.currentTheme}
        />
        <EditOneThreadCommentModal
          commentsToShowInModal={this.state.commentsToShowInModal}
          showEditOneThreadCommentModal={this.state.showEditOneThreadCommentModal}
          showDeleteThreadCommentModal={this.showDeleteThreadCommentModal}
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
