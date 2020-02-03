import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import updateApi from "../../utils/updateApi";
import vehicleApi from "../../utils/API";
import OneUpdate from "../../components/OneUpdate";
import AddUpdates from "../../components/AddUpdates";
import Loading from "../../components/Loading";
import EditOneUpdateModal from "../../components/Modal/EditOneUpdateModal";
import { ToastContainer, toast } from "react-toastify";

export default class Updates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUpdates: [],
      admin: false,
      pageLoaded: false,
      updateChanges: "",
      knownIssues: "",
      updatedChangesForEditing: "",
      knownIssuesForEditing: "",
      theme: "",
      currentTheme: "",
      updateId: "",
      showEditOneUpdateModal: false,
      showDeleteOneUpdateModal: false,
      disableConfirmSaveEditReleaseNoteButton: false
    };
  };

  /**
   * Fetch all updates and release notes
   * Also check if the viewer is an admin user
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    this.getAllUpdates();
    this.checkIfUserIsAdmin();
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(name)
    // console.log(value)
  };

  /**
   * Adds an update to the database
   */
  addOneUpdate = e => {
    e.preventDefault();
    const updateData = {
      updateChanges: this.state.updateChanges,
      knownIssues: this.state.knownIssues
    }
    updateApi.addOneUpdate(updateData)
      .then(() => {
        this.addOneUpdateSuccessNotification();
        this.componentDidMount();
        this.setState({
          updateChanges: "",
          knownIssues: ""
        });
      });
  };

  /**
   * Gets all of the updates and release notes from the database
   */
  getAllUpdates = () => {
    updateApi.getAllUpdates()
      .then(res => {
        this.setState({ allUpdates: res.data });
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Checks to see if the viewer is an admin
   */
  checkIfUserIsAdmin = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res =>
            this.setState({
              admin: res.data.admin,
              theme: res.data.theme,
              pageLoaded: true,
            }, () => {
              this.getThemeAndRender();
            })
          )
          .catch(err => this.errorNotification(err));
      } else {
        this.setState({ pageLoaded: true });
      }
    });
  };

  /**
   * Get the user theme and render it
   */
  getThemeAndRender = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.setState({ currentTheme: themes.carSpace });
          document.body.style.backgroundColor = "rgb(220, 220, 220)";
          break;
        case "light":
          this.setState({ currentTheme: themes.light });
          document.body.style.backgroundColor = "rgb(235, 235, 235)";
          break;
        case "grey":
          this.setState({ currentTheme: themes.grey });
          document.body.style.backgroundColor = "rgb(112, 112, 112)";
          break;
        case "dark":
          this.setState({ currentTheme: themes.dark });
          document.body.style.backgroundColor = "rgb(32, 32, 32)";
          break;
        default:
          alert("Error: Unable to process theme selection.");
      }
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
    };
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
      updatedChangesForEditing: updateChanges,
      knownIssuesForEditing: knownIssues
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
      updatedChangesForEditing: updateChanges,
      knownIssuesForEditing: knownIssues
    });
  };

  /**
   * Validate the new data for editing a release note
   */
  checkUserEnteredUpdatedReleaseNoteInput = e => {
    e.preventDefault();
    let untouchedReleaseNote = this.state.updatedChangesForEditing;
    let untouchedKnownIssues = this.state.knownIssuesForEditing;
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
    if (this.checkIfStringIsEmpty(newReleaseNotes) || this.checkIfStringIsEmpty(newKnownIssues)) {
      this.releaseNoteInvalidInputErrorNotification();
    } else {
      this.handleUpdateOneReleaseNote(newReleaseNotes, newKnownIssues);
    }
  };

  /**
   * Check if the user input value is empty
   */
  checkIfStringIsEmpty = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Update the release note
   */
  handleUpdateOneReleaseNote = (newReleaseNotes, newKnownIssues) => {
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
  };

  /**
   * Hide the edit one update modal
   */
  hideEditOneUpdateModal = () => {
    this.setState({
      showEditOneUpdateModal: false,
      releaseNotesToUpdate: "",
      knownIssuesToUpdate: ""
    });
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
   * Display the error notification when an error occurs while loading data from the database
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
                        <Link to={{ pathname: "/" }}>
                          <button className="backHomeBtn">Back</button>
                        </Link>
                        <ToastContainer />
                        <EditOneUpdateModal
                          checkUserEnteredUpdatedReleaseNoteInput={this.checkUserEnteredUpdatedReleaseNoteInput}
                          showEditOneUpdateModal={this.state.showEditOneUpdateModal}
                          hideEditOneUpdateModal={this.hideEditOneUpdateModal}
                          handleChange={this.handleChange}
                          state={this.state}
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
