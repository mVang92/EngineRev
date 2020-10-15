import React, { Component } from "react";
import Modal from "react-modal";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import { defaults } from "../../assets/Defaults";
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
    userApi.findUserInformationForOneUser(this.state.userId)
      .then(res => {
        if (res.data.roles.includes(defaults.adminRole)) {
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
        this.setState({ allUpdates: res.data }, () => this.findUserInformationForOneUser());
      })
      .catch(err => {
        this.errorNotification(err);
        this.findUserInformationForOneUser();
      });
  };

  /**
   * Retrieve the information for the user then load the page
   */
  findUserInformationForOneUser = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        userApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                userId: user.uid,
                roles: res.data.roles,
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                pageLoaded: true,
              }, () => this.determineTheme());
            } catch (err) {
              this.setState({ refreshCounter: this.state.refreshCounter + 1 });
              if (this.state.refreshCounter <= 10) {
                this.findUserInformationForOneUser();
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
   * Determine what the current theme is
   */
  determineTheme = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case defaults.engineRevTheme:
          this.renderTheme(themes.engineRev);
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
    userApi.findUserInformationForOneUser(this.state.userId)
      .then(res => {
        if (res.data.roles.includes(defaults.adminRole)) {
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
    userApi.findUserInformationForOneUser(this.state.userId)
      .then(res => {
        if (res.data.roles.includes(defaults.adminRole)) {
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
