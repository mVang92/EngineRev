import React, { Component } from "react";
import Modal from "react-modal";
import { firebase } from "../../firebase"
import { defaults } from "../../assets/Defaults";
import { themes } from "../../themes/Themes";
import updateApi from "../../utils/updateApi";
import userApi from "../../utils/userApi";
import UpdatePageDetails from "../../components/UpdatePageDetails";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default class Updates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "",
      roles: [],
      allUpdates: [],
      pageLoaded: false,
      updateChanges: "",
      knownIssues: "",
      updateChangesToShowInModal: "",
      knownIssuesToShowInModal: "",
      theme: "",
      currentTheme: "",
      backgroundPicture: "",
      updateId: "",
      releaseNotesToUpdate: "",
      knownIssuesToUpdate: "",
      refreshCounter: 0,
      showEditOneUpdateModal: false,
      showDeleteOneUpdateModal: false,
      disableConfirmSaveEditReleaseNoteButton: false,
      disableConfirmDeleteReleaseNoteButton: false
    };
  };

  uniqueCreatorId;

  /**
   * Fetch all updates and release notes
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    this.getUpdates();
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
   * Adds an update to the database
   */
  addOneUpdate = e => {
    e.preventDefault();
    userApi.getRoles(this.uniqueCreatorId)
      .then(res => {
        if (res.data[0].roles.includes(defaults.adminRole)) {
          const payload = {
            updateChanges: this.state.updateChanges,
            knownIssues: this.state.knownIssues,
            releaseNotesToUpdate: "",
            knownIssuesToUpdate: ""
          };
          updateApi.addOneUpdate(payload)
            .then(() => {
              this.getUpdates();
              this.successNotification(defaults.addOneReleaseNoteSuccess);
              this.setState({
                updateChanges: "",
                knownIssues: ""
              });
            })
            .catch(err => this.errorNotification(err));
        } else {
          this.doNoAuthorization();
        }
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Gets all of the updates and release notes from the database
   * If successful or if there is an error, then find the user information
   */
  getUpdates = () => {
    updateApi.getUpdates()
      .then(res => {
        this.setState({ allUpdates: res.data }, () => this.getUserPartialInfo());
      })
      .catch(err => {
        this.errorNotification(err);
        this.getUserPartialInfo();
      });
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getUserPartialInfo = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const roles = userApi.getRoles(user.uid)
        const partialInfo = userApi.getUserPartialInfo(user.uid)
        return Promise.all([roles, partialInfo])
          .then(([roles, partialInfo]) => {
            try {
              this.setState({
                userId: user.uid,
                roles: roles.data[0].roles,
                theme: partialInfo.data.theme,
                backgroundPicture: partialInfo.data.backgroundPicture,
                pageLoaded: true,
              }, () => {
                this.uniqueCreatorId = this.state.uniqueCreatorId;
                this.renderTheme(themes.determineTheme(this.state.theme, this.state.backgroundPicture))
              });
            } catch (err) {
              this.setState({ refreshCounter: this.state.refreshCounter + 1 });
              if (this.state.refreshCounter <= 10) {
                this.getUserPartialInfo();
              } else {
                this.errorNotification(err);
                this.setState({ pageLoaded: true });
              }
            }
          })
          .catch(err => this.errorNotification(err));
      } else {
        this.setState({ pageLoaded: true });
      }
    });
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
   * Display the modal to edit one update
   * 
   * @param updateId      the update id to target
   * @param updateChanges the update or release notes to save
   * @param knownIssues   the known issues to save
   */
  editOneUpdateModal = (updateId, updateChanges, knownIssues) => {
    this.setState({
      showEditOneUpdateModal: true,
      updateId: updateId,
      updateChangesToShowInModal: updateChanges,
      knownIssuesToShowInModal: knownIssues,
      releaseNotesToUpdate: "",
      knownIssuesToUpdate: ""
    });
  };

  /**
   * Display the modal to delete one update
   */
  deleteOneUpdateModal = () => {
    this.setState({
      showDeleteOneUpdateModal: true,
      showEditOneUpdateModal: false
    });
  };

  /**
   * Validate the new data for editing a release note
   */
  checkUserEnteredUpdatedReleaseNoteInput = e => {
    e.preventDefault();
    let untouchedReleaseNote = this.state.updateChangesToShowInModal;
    let untouchedKnownIssues = this.state.knownIssuesToShowInModal;
    let releaseNotesToUpdate = this.state.releaseNotesToUpdate;
    let knownIssuesToUpdate = this.state.knownIssuesToUpdate;
    let newReleaseNotes = "";
    let newKnownIssues = "";
    if (releaseNotesToUpdate) {
      newReleaseNotes = releaseNotesToUpdate;
    } else {
      newReleaseNotes = untouchedReleaseNote;
    }
    if (knownIssuesToUpdate) {
      newKnownIssues = knownIssuesToUpdate;
    } else {
      newKnownIssues = untouchedKnownIssues;
    }
    if (this.checkIfStringIsBlank(newReleaseNotes) || this.checkIfStringIsBlank(newKnownIssues)) {
      this.releaseNoteInvalidInputErrorNotification();
    } else {
      this.handleUpdateOneReleaseNote(newReleaseNotes, newKnownIssues);
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
   * Update the release note
   * 
   * @param newReleaseNotes The new release note to update the old one
   * @param newKnownIssues The known issues to update the old one
   */
  handleUpdateOneReleaseNote = (newReleaseNotes, newKnownIssues) => {
    userApi.getRoles(this.uniqueCreatorId)
      .then(res => {
        if (res.data[0].roles.includes(defaults.adminRole)) {
          let payload = {
            newReleaseNotes,
            newKnownIssues
          };
          this.setState({ disableConfirmSaveEditReleaseNoteButton: true });
          updateApi.updateOneReleaseNote(this.state.updateId, payload)
            .then(() => {
              this.getUpdates();
              this.successNotification(defaults.updateOneReleaseNoteSuccess);
              this.setState({
                showEditOneUpdateModal: false,
                disableConfirmSaveEditReleaseNoteButton: false
              });
            })
            .catch(err => {
              this.errorNotification(err);
              this.setState({ disableConfirmSaveEditReleaseNoteButton: false });
            });
        } else {
          this.doNoAuthorization();
        }
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Delete the release note from record
   */
  handleDeleteOneReleaseNote = () => {
    userApi.getRoles(this.uniqueCreatorId)
      .then(res => {
        if (res.data[0].roles.includes(defaults.adminRole)) {
          this.setState({ disableConfirmDeleteReleaseNoteButton: true });
          updateApi.deleteOneReleaseNote(this.state.updateId)
            .then(() => {
              this.getUpdates();
              this.successNotification(defaults.deleteOneReleaseNoteSuccess);
              this.setState({
                showDeleteOneUpdateModal: false,
                disableConfirmDeleteReleaseNoteButton: false
              });
            })
            .catch(err => {
              this.errorNotification(err);
              this.setState({ disableConfirmDeleteReleaseNoteButton: false });
            });
        } else {
          this.doNoAuthorization();
        }
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Alert the user and navigate to the origin URL
   */
  doNoAuthorization = () => {
    alert(defaults.noAuthorizationToPerformAction);
    window.location = "/";
  };

  /**
   * Hide the edit one update modal
   */
  hideEditOneUpdateModal = () => {
    this.setState({ showEditOneUpdateModal: false });
  };

  /**
   * Hide the delete one update modal
   */
  hideDeleteOneUpdateModal = () => {
    this.setState({ showDeleteOneUpdateModal: false });
  };

  /**
   * Display the success notification when the admin user performs an action successfully
   * 
   * @param message the message to display to the user
   */
  successNotification = message => {
    toast.success(message);
  };

  /**
   * Display the error notification when an error occurs while executing a database query
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when there is invalid input while updating a release note
   */
  releaseNoteInvalidInputErrorNotification = () => {
    toast.error(defaults.invalidInputDetected);
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.allUpdates ?
            (
              <React.Fragment>
                {
                  this.state.pageLoaded ?
                    (
                      <UpdatePageDetails
                        currentTheme={this.state.currentTheme}
                        roles={this.state.roles}
                        handleChange={this.handleChange}
                        addOneUpdate={this.addOneUpdate}
                        updateChanges={this.state.updateChanges}
                        knownIssues={this.state.knownIssues}
                        allUpdates={this.state.allUpdates}
                        getActionValue={this.getActionValue}
                        backToTopOfPage={this.backToTopOfPage}
                        checkUserEnteredUpdatedReleaseNoteInput={this.checkUserEnteredUpdatedReleaseNoteInput}
                        showEditOneUpdateModal={this.state.showEditOneUpdateModal}
                        editOneUpdateModal={this.editOneUpdateModal}
                        deleteOneUpdateModal={this.deleteOneUpdateModal}
                        hideEditOneUpdateModal={this.hideEditOneUpdateModal}
                        updateChangesToShowInModal={this.state.updateChangesToShowInModal}
                        knownIssuesToShowInModal={this.state.knownIssuesToShowInModal}
                        disableConfirmSaveEditReleaseNoteButton={this.state.disableConfirmSaveEditReleaseNoteButton}
                        handleDeleteOneReleaseNote={this.handleDeleteOneReleaseNote}
                        showDeleteOneUpdateModal={this.state.showDeleteOneUpdateModal}
                        hideDeleteOneUpdateModal={this.hideDeleteOneUpdateModal}
                        disableConfirmDeleteReleaseNoteButton={this.state.disableConfirmDeleteReleaseNoteButton}
                      />
                    ) :
                    (
                      <Loading />
                    )
                }
              </React.Fragment>
            ) :
            (
              <Loading />
            )
        }
      </React.Fragment>
    );
  };
};
