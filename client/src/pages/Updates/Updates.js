import React, { Component } from "react";
import Modal from "react-modal";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import updateApi from "../../utils/updateApi";
import vehicleApi from "../../utils/API";
import OneUpdate from "../../components/OneUpdate";
import AddUpdates from "../../components/AddUpdates";
import Loading from "../../components/Loading";
import EditOneUpdateModal from "../../components/Modal/EditOneUpdateModal";
import DeleteOneUpdateModal from "../../components/Modal/DeleteOneUpdateModal";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";
import { toast } from "react-toastify";

export default class Updates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "",
      allUpdates: [],
      admin: false,
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
      showEditOneUpdateModal: false,
      showDeleteOneUpdateModal: false,
      disableConfirmSaveEditReleaseNoteButton: false,
      disableConfirmDeleteReleaseNoteButton: false
    };
  };

  /**
   * Fetch all updates and release notes
   * Also check if the viewer is an admin user
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    this.getAllUpdates();
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
    vehicleApi.findUserInformationForOneUser(this.state.userId)
      .then(res => {
        if (res.data.admin) {
          const updateData = {
            updateChanges: this.state.updateChanges,
            knownIssues: this.state.knownIssues,
            releaseNotesToUpdate: "",
            knownIssuesToUpdate: ""
          };
          updateApi.addOneUpdate(updateData)
            .then(() => {
              this.getAllUpdates();
              this.addOneUpdateSuccessNotification();
              this.setState({
                updateChanges: "",
                knownIssues: ""
              });
            })
            .catch(err => this.errorNotification(err));
        } else {
          alert("You are not authorized to perform this action.");
          window.location = "/";
        }
      })
      .catch(err => {
        this.errorNotification(err);
      });
  };

  /**
   * Gets all of the updates and release notes from the database
   * If successful or if there is an error, then find the user information
   */
  getAllUpdates = () => {
    updateApi.getAllUpdates()
      .then(res => {
        this.setState({ allUpdates: res.data },
          () => {
            this.findUserInformationForOneUser();
          });
      })
      .catch(err => {
        this.errorNotification(err);
        this.findUserInformationForOneUser();
      });
  };

  /**
   * Get user information for the user logged in
   */
  findUserInformationForOneUser = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                userId: user.uid,
                admin: res.data.admin,
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                pageLoaded: true,
              }, () => {
                this.determineTheme();
              });
            } catch (err) {
              this.setState({ pageLoaded: true });
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
   * Execute the value from the service log action dropdown
   */
  getActionValue = (event, updateId, updateChanges, knownIssues, actionValue) => {
    event.preventDefault();
    switch (actionValue) {
      case "edit":
        this.showEditOneUpdateModal(updateId, updateChanges, knownIssues);
        break;
      case "delete":
        this.showDeleteOneUpdateModal(updateId, updateChanges, knownIssues);
        break;
      default:
        alert("Error Processing Request");
    }
  };

  /**
   * Display the modal to edit one update
   * 
   * @param updateId      the update id to target
   * @param updateChanges the update or release notes to save
   * @param knownIssues   the known issues to save
   */
  showEditOneUpdateModal = (updateId, updateChanges, knownIssues) => {
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
   * 
   * @param updateId      the update id to target
   * @param updateChanges the update or release notes to save
   * @param knownIssues   the known issues to save
   */
  showDeleteOneUpdateModal = (updateId, updateChanges, knownIssues) => {
    this.setState({
      showDeleteOneUpdateModal: true,
      updateId: updateId,
      updateChangesToShowInModal: updateChanges,
      knownIssuesToShowInModal: knownIssues
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
   */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Update the release note
   */
  handleUpdateOneReleaseNote = (newReleaseNotes, newKnownIssues) => {
    vehicleApi.findUserInformationForOneUser(this.state.userId)
      .then(res => {
        if (res.data.admin) {
          let payload = {
            newReleaseNotes,
            newKnownIssues
          };
          this.setState({ disableConfirmSaveEditReleaseNoteButton: true });
          updateApi.updateOneReleaseNote(this.state.updateId, payload)
            .then(() => {
              this.getAllUpdates();
              this.updateOneUpdateSuccessNotification();
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
          alert("You are not authorized to perform this action.");
          window.location = "/";
        }
      })
      .catch(err => {
        this.errorNotification(err);
      });
  };

  /**
   * Delete the release note from record
   */
  handleDeleteOneReleaseNote = () => {
    vehicleApi.findUserInformationForOneUser(this.state.userId)
      .then(res => {
        if (res.data.admin) {
          this.setState({ disableConfirmDeleteReleaseNoteButton: true });
          updateApi.deleteOneReleaseNote(this.state.updateId)
            .then(() => {
              this.getAllUpdates();
              this.deleteOneUpdateSuccessNotification();
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
          alert("You are not authorized to perform this action.");
          window.location = "/";
        }
      })
      .catch(err => {
        this.errorNotification(err);
      });
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
   * Display the success notification when the admin user submits an release note
   */
  addOneUpdateSuccessNotification = () => {
    toast.success(`Release note added successfully.`);
  };

  /**
   * Display the success notification when the admin user updates a release note
   */
  updateOneUpdateSuccessNotification = () => {
    toast.success(`Release note updated successfully.`);
  };

  /**
   * Display the success notification when the admin user deletes a release note
   */
  deleteOneUpdateSuccessNotification = () => {
    toast.success(`Release note deleted successfully.`);
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
    toast.error(`Invalid input detected.`);
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.allUpdates ? (
            <React.Fragment>
              {
                this.state.pageLoaded ?
                  (
                    <div className="container largeBottomMarginMobileDisplay">
                      <div id="recentUpdatesContainer" className={this.state.currentTheme.background}>
                        <div id="field"></div>
                        <h4 className="text-center"><label>Release Notes and Updates</label></h4>
                        <BackToHomeButtonRow />
                        <hr className={this.state.currentTheme.hr} />
                        {
                          this.state.admin ?
                            (
                              <AddUpdates
                                handleChange={this.handleChange}
                                addOneUpdate={this.addOneUpdate}
                                updateChanges={this.state.updateChanges}
                                knownIssues={this.state.knownIssues}
                                currentTheme={this.state.currentTheme}
                              />
                            ) : (
                              null
                            )
                        }
                        {
                          this.state.allUpdates.map(update => {
                            return (
                              <OneUpdate
                                key={update._id}
                                _id={update._id}
                                date={update.date}
                                updateChanges={update.updateChanges}
                                knownIssues={update.knownIssues}
                                getActionValue={this.getActionValue}
                                currentTheme={this.state.currentTheme}
                                admin={this.state.admin}
                              />
                            )
                          })
                        }
                        <br />
                        <BottomActionButtons
                          backToTopOfPage={this.backToTopOfPage}
                        />
                        <EditOneUpdateModal
                          checkUserEnteredUpdatedReleaseNoteInput={this.checkUserEnteredUpdatedReleaseNoteInput}
                          showEditOneUpdateModal={this.state.showEditOneUpdateModal}
                          hideEditOneUpdateModal={this.hideEditOneUpdateModal}
                          handleChange={this.handleChange}
                          currentTheme={this.state.currentTheme}
                          updateChangesToShowInModal={this.state.updateChangesToShowInModal}
                          knownIssuesToShowInModal={this.state.knownIssuesToShowInModal}
                          disableConfirmSaveEditReleaseNoteButton={this.state.disableConfirmSaveEditReleaseNoteButton}
                        />
                        <DeleteOneUpdateModal
                          handleDeleteOneReleaseNote={this.handleDeleteOneReleaseNote}
                          showDeleteOneUpdateModal={this.state.showDeleteOneUpdateModal}
                          hideDeleteOneUpdateModal={this.hideDeleteOneUpdateModal}
                          handleChange={this.handleChange}
                          currentTheme={this.state.currentTheme}
                          updateChangesToShowInModal={this.state.updateChangesToShowInModal}
                          knownIssuesToShowInModal={this.state.knownIssuesToShowInModal}
                          disableConfirmDeleteReleaseNoteButton={this.state.disableConfirmDeleteReleaseNoteButton}
                        />
                      </div>
                    </div>
                  ) : (
                    <Loading />
                  )
              }
            </React.Fragment>
          ) : (
              <Loading />
            )
        }
      </React.Fragment>
    );
  };
};
