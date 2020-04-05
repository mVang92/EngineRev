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
import DeleteThreadModal from "../../components/Modal/DeleteThreadModal";
import UpdateThreadDetailsSuccessModal from "../../components/Modal/UpdateThreadDetailsSuccessModal";

export default class Thread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props,
      uniqueCreatorId: "",
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
      allThreads: [],
      formattedEmail: "",
      formattedDate: "",
      disableEditThreadDetails: true,
      showUpdateThreadDetailsSuccessModal: false,
      showDeleteThreadModal: false,
      disableUpVoteButton: false,
      disableDownVoteButton: false
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
              }, () => {
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

  getAllThreadComments = () => {
    forumApi.getAllThreadComments(this.state.threadId)
      .then(res => {
        this.setState({
          allThreads: res.data[0]
        }, () => this.getUserInformation());
      })
      .catch(err => {
        this.errorNotification(err);
        this.setState({ pageLoaded: true });
      });
  };

  /**
   * Add a comment to the chosen thread
   */
  addOneCommentToThread = e => {
    e.preventDefault();
    let threadCommentPayload = {
      creator: this.state.uniqueCreatorId,
      email: this.state.email,
      comment: this.state.threadComment,
      votes: 0
    }
    forumApi.addOneCommentToOneThread(this.state.threadId, threadCommentPayload)
      .then(() => {
        this.setState({ threadComment: "" }, () => {
          this.addCommentSuccessNotification();
          this.getAllThreadComments();
        });
      })
      .catch(err => this.errorNotification(err));
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
      this.handleUpdateThreadTitle();
    }
  };

  /**
   * Update the title to the thread
   */
  handleUpdateThreadTitle = () => {
    let threadPayload = {
      threadTitle: this.state.threadTitle,
      threadDescription: this.state.threadDescription
    }
    forumApi.updateThreadTitle(this.state.threadId, threadPayload)
      .then(() => {
        this.showUpdateThreadDetailsSuccessModal();
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Delete a thread
   */
  handleDeleteThread = () => {
    forumApi.deleteThread(this.state.threadId)
      .then(() => {
        window.location.assign(window.location.origin + "/forum");
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Handle up vote on a comment
   */
  handleUpvoteComment = commentId => {
    forumApi.handleCommentUpVote(this.state.threadId, commentId)
      .then(() => {
        vehicleApi.recordVotedThreadComment(this.state.uniqueCreatorId, commentId)
          .then(() => {
            this.setState(
              { disableUpVoteButton: false },
              () => this.getAllThreadComments()
            );
          })
          .catch(err => {
            this.setState(
              { disableUpVoteButton: false },
              () => this.errorNotification(err)
            );
          });
      })
      .catch(err => {
        this.setState(
          { disableUpVoteButton: false },
          () => this.errorNotification(err)
        );
      });
  };

  /**
   * Handle down vote on a comment
   */
  handleDownvoteComment = commentId => {
    forumApi.handleCommentDownVote(this.state.threadId, commentId)
      .then(() => {
        vehicleApi.recordVotedThreadComment(this.state.uniqueCreatorId, commentId)
          .then(() => {
            this.setState(
              { disableDownVoteButton: false },
              () => this.getAllThreadComments()
            );
          })
          .catch(err => {
            this.setState(
              { disableDownVoteButton: false },
              () => this.errorNotification(err)
            );
          });
      })
      .catch(err => {
        this.setState(
          { disableDownVoteButton: false },
          () => this.errorNotification(err)
        );
      });
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
          this.errorNotification("Error: Unable to process theme selection.");
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
   * Enable editing for the thread title
   */
  enableEditThreadDetails = () => {
    if (this.state.disableEditThreadDetails) {
      this.setState({ disableEditThreadDetails: false });
    } else {
      this.setState({ disableEditThreadDetails: true });
    }
  };

  /**
   * 
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
   * Display the success notification when the user deletes a service log
   */
  addCommentSuccessNotification = () => {
    toast.success(`Comment posted successfully.`);
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
                  showDeleteThreadModal={this.showDeleteThreadModal}
                  validateEditedThreadDetails={this.validateEditedThreadDetails}
                  enableEditThreadDetails={this.enableEditThreadDetails}
                  handleChange={this.handleChange}
                  backToTopOfPage={this.backToTopOfPage}
                  backButton={this.backButton}
                  addOneCommentToThread={this.addOneCommentToThread}
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
        <UpdateThreadDetailsSuccessModal
          showUpdateThreadDetailsSuccessModal={this.state.showUpdateThreadDetailsSuccessModal}
          hideUpdateThreadDetailsSuccessModal={this.hideUpdateThreadDetailsSuccessModal}
          currentTheme={this.state.currentTheme}
        />
      </React.Fragment>
    );
  };
};
