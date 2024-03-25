import React, { Component } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { firebase, auth } from "./firebase"
import { ToastContainer, toast } from "react-toastify";
import { NavLoggedIn, NavLoggedOut } from "./components/Nav";
import { themes } from "./themes/Themes";
import { defaults } from "./assets/Defaults";
import { events } from "./assets/Events";
import eventLogHandler from "./utils/EventLogHandler/eventLogHandler";
import userApi from "./utils/userApi";
import displayNameApi from "./utils/displayNameApi";
import updateApi from "./utils/updateApi";
import forumApi from "./utils/forumApi";
import eventLogApi from "./utils/eventLogApi";
import Main from "./pages/Main";
import Log from "./pages/Log";
import Forum from "./pages/Forum";
import Thread from "./pages/Thread";
import Account from "./pages/Account";
import About from "./pages/About";
import Updates from "./pages/Updates";
import NoMatch from "./pages/NoMatch";
import SignUpModal from "./components/Modal/SignUpModal";
import SignInModal from "./components/Modal/SignInModal";
import SignOutModal from "./components/Modal/SignOutModal";
import ForgotPasswordModal from "./components/Modal/ForgotPasswordModal";
import LoggedOut from "./components/LoggedOut";
import "react-toastify/dist/ReactToastify.css";
import "./css/mainStyle.css";
import "./css/themesStyle.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      user: "",
      creatorId: "",
      uniqueCreatorId: "",
      email: "",
      newEmail: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      confirmNewPassword: "",
      newPassword: "",
      profilePicture: "",
      errorMessage: "",
      themeToDetermine: "",
      currentTheme: "",
      backgroundPicture: "",
      vehicleCount: "",
      newDisplayName: "",
      newProfilePicture: "",
      newBackgroundPicture: "",
      userAccountCreationTime: "",
      userAccountLastSignIn: "",
      roles: "",
      updateChanges: "",
      knownIssues: "",
      updateChangesToShowInModal: "",
      knownIssuesToShowInModal: "",
      releaseNotesToUpdate: "",
      knownIssuesToUpdate: "",
      updateId: "",
      updateChangesToShowInModal: "",
      pageLoaded: false,
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      showForgotPasswordModal: false,
      showUpdateBackgroundPictureModal: false,
      showUpdateProfilePictureModal: false,
      showUpdateProfilePictureSuccessModal: false,
      disableSignInButton: false,
      disableSignUpButton: false,
      disableForgotPasswordSubmitButton: false,
      disableDoSignOutButton: false,
      disableAddVehicleButton: false,
      disableThemeToggleButton: false,
      disableUpdateEmailButton: false,
      showAddVehicleYearNanErrorModal: false,
      disableUpdateDisplayNameButton: false,
      disableUpdateProfilePictureButton: false,
      disableConfirmSaveEditReleaseNoteButton: false,
      disableConfirmDeleteReleaseNoteButton: false,
      showDeleteOneUpdateModal: false,
      showEditOneUpdateModal: false,
      isUserNewUser: false,
      vehicleData: [],
      allUpdates: [],
      defaultProfilePicture: defaults.defaultProfilePicture,
      defaultDisplayName: defaults.defaultDisplayName,
      loadingSortedThreads: false,
      threadTitle: "",
      threadDescription: "",
      allThreads: [],
      disableSubmitNewThreadButton: false,
      noSortResults: "",
      defaultSortOrder: "",
      disableSortThreadsButton: false
    };
  };

  SELECTED_SORT_ORDER = "selectedSortOrder"
  uniqueCreatorId;

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Check if the user is logged in
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    this.onAuthStateChanged();
  };

  /**
   * Set the user information based if the user is logged in
   */
  onAuthStateChanged = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.uniqueCreatorId = user.uid;
        this.setState({
          user: user,
          loggedin: true,
          creatorId: user._delegate.uid,
          uniqueCreatorId: user._delegate.uid,
          email: user._delegate.email,
          userAccountCreationTime: user._delegate.metadata.creationTime,
          userAccountLastSignIn: user._delegate.metadata.lastSignInTime,
          showSignInModal: false,
          showSignUpModal: false,
          showForgotPasswordModal: false
        }, () => {
          this.getUserInfoPartial(this.state.creatorId);
          this.getUserDataForAccountPage();
        });
      }
    });
    this.getUpdates();
    this.getForumThreads();
  };

  /**
   * Creates a schema for the user during first time login
   */
  createUserSchema = displayName => {
    this.requestHideSignUpModal();
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const userInformation = {
          creator: user.uid,
          displayName: displayName
        };
        displayNameApi.addOneDisplayName(userInformation)
          .then(() => {
            user.updateProfile({ displayName: displayName })
              .then(() => {
                user.updateProfile({ photoURL: this.state.defaultProfilePicture })
                  .then(() => {
                    userApi.createUserSchema(user.uid, user.email, user.displayName)
                      .then(() => this.setState({ isUserNewUser: false }, () => {
                        this.getUserInfoPartial(this.state.user._delegate.uid);
                        this.getUserRoles(this.state.creatorId);
                        this.getVehicleCount(this.state.creatorId);
                      }
                      ))
                      .catch(error => this.errorNotification(error));
                  })
                  .catch(error => this.errorNotification(error));
              })
              .catch(error => this.errorNotification(error));
          })
          .catch(error => this.errorNotification(error));
      }
    });
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getUserInfoPartial = creatorId => {
    if (this.state.isUserNewUser) return;
    userApi.getUserInfoPartial(creatorId)
      .then(user => {
        userApi.getUserVehicles(creatorId)
          .then(vehicles => {
            this.setState({
              vehicleData: vehicles.data[0],
              themeToDetermine: user.data.theme,
              backgroundPicture: user.data.backgroundPicture,
              displayName: user.data.displayName,
              profilePicture: this.state.user._delegate.photoURL
            }, () => this.renderThemeAndBackgroundPicture(themes.determineTheme(this.state.themeToDetermine)))
          })
          .catch(error => {
            this.loadVehiclesFailNotification(error);
            this.setState({
              pageLoaded: true,
              disableAddVehicleButton: true,
              errorMessage: error.toString()
            })
          })
      })
      .catch(error => {
        this.loadVehiclesFailNotification(error);
        this.setState({
          pageLoaded: true,
          disableAddVehicleButton: true,
          errorMessage: error.toString()
        })
      });
  };

  /**
   * Add the vehicle for the user
   * 
   * @param newVehicle the vehicle data to record
   */
  handleAddOneVehicle = newVehicle => {
    const creatorId = this.state.user._delegate.uid;
    const email = this.state.user._delegate.email;
    const event = events.addedNewVehicle;
    userApi.addOneVehicle(creatorId, newVehicle)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.getUserInfoPartial(creatorId);
        this.getVehicleCount(creatorId);
        this.addOneVehicleSuccessNotification(newVehicle.year, newVehicle.make, newVehicle.model);
        this.setState({ disableAddVehicleButton: false });
        document.getElementById("addVehicleInputForm").reset();
      })
      .catch(error => {
        eventLogHandler.failure(creatorId, email, event, error);
        this.errorNotification(error);
        this.setState({ disableAddVehicleButton: false });
      });
  };

  /**
   * Check if the vehicle year is valid before adding it to the database
   * 
   * @param newVehicle the new vehicle data to check
   */
  checkIfVehicleYearIsValid = newVehicle => {
    const date = new Date();
    const futureYear = date.getFullYear() + 2;
    this.setState({ disableAddVehicleButton: true });
    if (
      isNaN(newVehicle.year) ||
      (newVehicle.year < 1885) ||
      (newVehicle.year > futureYear)
    ) {
      this.requestShowAddVehicleYearNanErrorModal();
      this.setState({ disableAddVehicleButton: false });
    } else {
      this.handleAddOneVehicle(newVehicle);
    }
  };

  /**
   * Download the event logs in a CSV file
   */
  downloadEventLogCsvFile = () => {
    eventLogApi.getEventsForUser(this.state.creatorId)
      .then(res => {
        const eventLogsObject = JSON.stringify(res.data);
        const eventLogToCSV = this.convertToCSV(eventLogsObject);
        const exportedFilename = "EngineRev Event Logs.csv" || "export.csv";
        const blob = new Blob([eventLogToCSV], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, exportedFilename);
        } else {
          const link = document.createElement("a");
          if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      })
      .catch(error => this.errorNotification(error));
  };

  /**
   * Convert the event logs into a string separated appropriately by line and comma
   * 
   * @param eventLogsObject the event logs to convert to CSV
   */
  convertToCSV = eventLogsObject => {
    const array = JSON.parse(eventLogsObject);
    let string = "";
    for (let index = 0; index < array.length; index++) {
      let line = "";
      for (let element in array[index]) {
        if (line !== "") {
          line += ","
        }
        line += array[index][element];
      }
      string += line + "\r\n";
    }
    return string;
  };

  /**
   * Render the theme and background picture
   * 
   * @param theme the theme to render
   */
  renderThemeAndBackgroundPicture = theme => {
    if (this.state.backgroundPicture) {
      document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
    } else {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = theme.backgroundColor;
    }
    this.setState({
      currentTheme: theme,
      pageLoaded: true
    });
  };

  // ********************BEGIN LOGIN FUNCTIONALITY********************

  /**
   * Handle user authentication when a user signs in
   */
  handleSignIn = e => {
    e.preventDefault();
    this.setState({ disableSignInButton: true });
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.requestHideSignInModal();
        this.setState({
          disableSignInButton: false,
          isUserNewUser: false
        });
      })
      .catch(error => {
        this.setState({
          disableSignInButton: false,
          isUserNewUser: false
        });
        this.errorNotification(error.message);
      });
  };

  /**
   * Handle user authentication when a user signs up
   */
  handleSignUp = e => {
    e.preventDefault();
    const displayName = this.state.displayName;
    this.setState({ disableSignUpButton: true });
    if (this.state.password !== this.state.confirmPassword) {
      this.warningNotification(defaults.passwordsDoNotMatch);
      this.setState({ disableSignUpButton: false });
      return;
    }
    if (this.checkIfStringIsBlank(displayName)) {
      this.warningNotification(defaults.displayNameLengthNotMet);
      this.setState({ disableSignUpButton: false });
      return;
    }
    if (!this.checkIfStringIsBlank(displayName) && displayName.length < 6) {
      this.warningNotification(defaults.displayNameLengthNotMet);
      this.setState({ disableSignUpButton: false });
      return;
    }
    this.setState({ isUserNewUser: true });
    displayNameApi.getDisplayNames()
      .then(results => {
        const displayNameList = results.data.find(user => user.displayName === displayName);
        if (displayNameList) {
          this.warningNotification(defaults.displayNameAlreadyExists);
          this.setState({ disableSignUpButton: false });
        } else {
          this.createUserWithUserInformation(displayName);
        }
      })
      .catch(err => {
        this.setState({ disableSignUpButton: false });
        this.errorNotification(err)
      });
  };

  /**
   * Create the user account using email, password, and display name
   */
  createUserWithUserInformation = displayName => {
    auth
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.confirmPassword)
      .then(() => this.createUserSchema(displayName))
      .catch(error => {
        this.warningNotification(error.message);
        this.setState({ disableSignUpButton: false });
      });
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = () => {
    this.setState({ disableDoSignOutButton: true });
    auth
      .doSignOut()
      .then(() => window.location = "/")
      .catch(error => {
        this.setState({ disableDoSignOutButton: false });
        this.errorNotification(error.message);
      });
  };

  /**
   * Show the forgot password modal and close the sign in modal
   */
  handlePasswordReset = e => {
    e.preventDefault();
    this.setState({ disableForgotPasswordSubmitButton: true });
    auth
      .doPasswordReset(this.state.email)
      .then(() => {
        this.successNotification(defaults.passwordConfirmationSent);
        this.setState({
          showForgotPasswordModal: false,
          disableForgotPasswordSubmitButton: false
        });
      }).catch(error => {
        this.setState({ disableForgotPasswordSubmitButton: false });
        this.warningNotification(error.message);
      });
  };

  // ********************END LOGIN FUNCTIONALITY********************

  // ********************BEGIN ACCOUNT PAGE FUNCTIONALITY********************

  /**
   * Get the vehicle count
   * 
   * @param creatorId the creator id
   */
  getVehicleCount = creatorId => {
    userApi.getVehicleCount(creatorId)
      .then(vehicleCount => this.setState({ vehicleCount: vehicleCount.data[0].total }))
      .catch(error => this.errorNotification(error));
  };

  /**
   * Get the roles for the user
   * 
   * @param creatorId the creator id
   */
  getUserRoles = creatorId => {
    userApi.getRoles(creatorId)
      .then(roles => this.setState({ roles: roles.data[0].roles }))
      .catch(error => this.errorNotification(error));
  };

  /**
   * Get data for the user and load the page after data retrieval
   */
  getUserDataForAccountPage = () => {
    if (this.state.isUserNewUser) return;
    const creatorId = this.state.creatorId;
    const vehicleCount = userApi.getVehicleCount(creatorId);
    const email = userApi.getEmail(creatorId);
    const roles = userApi.getRoles(creatorId);
    return Promise.all([vehicleCount, email, roles])
      .then(([vehicleCount, email, roles]) => {
        this.setState({
          vehicleCount: vehicleCount.data[0].total,
          email: email.data[0].email,
          roles: roles.data[0].roles
        });
      })
      .catch(err => {
        this.setState({
          loadingError: err,
          pageLoaded: true
        }, this.errorNotification(err));
      });
  };

  /**
   * Save the selected theme to the database for the targeted user
   */
  saveThemeForUser = () => {
    const creatorId = this.state.creatorId;
    const email = this.state.email;
    const event = events.saveTheme;
    let element = document.getElementById(defaults.themeSelectionDropdown);
    let selectedTheme = element.options[element.selectedIndex].value;
    if (selectedTheme !== this.state.theme) {
      this.setState({ disableThemeToggleButton: true });
      userApi.saveThemeForUser(creatorId, selectedTheme)
        .then(() => {
          eventLogHandler.successful(creatorId, email, event);
          this.setState({ disableThemeToggleButton: false });
          this.getUserInfoPartial(creatorId);
        })
        .catch(err => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.setState({ disableThemeToggleButton: false });
          this.errorNotification(err);
        });
    }
  };

  /**
   * Update the background picture for the user
   */
  updateBackgroundPicture = () => {
    const creatorId = this.state.creatorId;
    const email = this.state.email;
    const event = events.updateBackgroundPicture;
    let newBackgroundPicture = this.state.newBackgroundPicture;
    if (this.checkIfStringIsBlank(newBackgroundPicture)) {
      newBackgroundPicture = "";
    }
    userApi.updateUserBackgroundPicture(creatorId, newBackgroundPicture)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.getUserInfoPartial(this.state.creatorId);
        this.setState({
          showUpdateBackgroundPictureModal: false,
          newBackgroundPicture: ""
        });
        document.getElementById(defaults.newBackgroundPictureInput).value = "";
      })
      .catch(error => {
        eventLogHandler.failure(creatorId, email, event, error);
        this.setState({ showUpdateBackgroundPictureModal: false });
        this.errorNotification(error);
      });
  };

  /**
   * Update the profile picture for the user
   */
  updateProfilePicture = () => {
    const user = this.state.user;
    const creatorId = this.state.creatorId;
    const email = this.state.email;
    const event = events.updateProfilePicture;
    let newProfilePicture = this.state.newProfilePicture;
    if (this.checkIfStringIsBlank(newProfilePicture)) {
      newProfilePicture = defaults.defaultProfilePicture;
    }
    if (this.state.loggedin) {
      this.setState({ disableUpdateProfilePictureButton: true });
      user.updateProfile({ photoURL: newProfilePicture })
        .then(() => {
          eventLogHandler.successful(creatorId, email, event);
          this.getUserInfoPartial(this.state.creatorId);
          this.setState({
            showUpdateProfilePictureModal: false,
            disableUpdateProfilePictureButton: false,
            newProfilePicture: ""
          });
          document.getElementById(defaults.newProfilePictureInput).value = "";
        })
        .catch(error => {
          eventLogHandler.failure(creatorId, email, event, error);
          this.setState({
            showUpdateProfilePictureModal: false,
            disableUpdateProfilePictureButton: false
          });
          this.errorNotification(error);
        });
    }
  };

  /**
   * Update the display name for the user
   */
  updateDisplayName = e => {
    e.preventDefault();
    const user = this.state.user;
    const creatorId = this.state.creatorId;
    const email = this.state.email;
    const event = events.updateDisplayName;
    let newDisplayName = this.state.newDisplayName;
    if (!this.state.loggedin) return;
    if (this.checkIfStringIsBlank(newDisplayName) && newDisplayName.length < 6) {
      this.warningNotification(defaults.displayNameLengthNotMet);
      return;
    }
    this.setState({ disableUpdateDisplayNameButton: true });
    displayNameApi.getDisplayNames()
      .then(results => {
        const displayNameList = results.data.find(user => user.displayName === newDisplayName);
        if (!displayNameList) {
          userApi.updateDisplayName(creatorId, newDisplayName)
            .then(() => {
              user.updateProfile({ displayName: newDisplayName })
                .then(() => {
                  eventLogHandler.successful(creatorId, email, event);
                  this.successNotification(defaults.displayNameUpdatedSuccessfully);
                  this.getUserInfoPartial(this.state.creatorId);
                  this.setState({
                    disableUpdateDisplayNameButton: false,
                    newDisplayName: ""
                  });
                  document.getElementById(defaults.newDisplayNameInput).value = "";
                })
                .catch(error => {
                  eventLogHandler.failure(creatorId, email, event, error);
                  this.setState({ disableUpdateDisplayNameButton: false });
                  this.errorNotification(error);
                });
            })
            .catch(error => {
              eventLogHandler.failure(creatorId, email, event, error);
              this.setState({ disableUpdateDisplayNameButton: false });
              this.errorNotification(error);
            });
        } else {
          this.setState({ disableUpdateDisplayNameButton: false });
          this.warningNotification(defaults.displayNameAlreadyExists);
        }
      })
      .catch(error => {
        this.setState({ disableUpdateDisplayNameButton: false });
        this.errorNotification(error);
      });
    // 
  };

  /**
   * Verify if the user has permission to update their email
   */
  canUserUpdateEmail = e => {
    e.preventDefault();
    const creatorId = this.state.creatorId;
    userApi.getRoles(creatorId)
      .then(roles => {
        const newEmail = this.state.newEmail;
        const initialEmail = this.state.email;
        const updateEmailEvent = events.updateEmail;
        const isUserTestUser = roles.data[0].roles.includes(defaults.testUserRole)
        if (
          this.state.loggedin &&
          newEmail &&
          !isUserTestUser
        ) {
          this.updateEmail(creatorId, initialEmail, newEmail, updateEmailEvent);
        } else {
          if (!newEmail) {
            eventLogHandler.failure(creatorId, initialEmail, updateEmailEvent, defaults.emailBlankError);
            this.warningNotification(defaults.emailBlankError);
          } else if (isUserTestUser) {
            this.errorNotification(defaults.noAuthorizationToPerformAction);
            this.setState({ newEmail: "" });
          }
        }
      })
      .catch(error => this.errorNotification(error));
  };

  /**
   * Verify if the user has permission to update their password
   */
  canUserUpdatePassword = e => {
    e.preventDefault();
    const creatorId = this.state.creatorId;
    const email = this.state.email;
    const newPassword = this.state.newPassword;
    const confirmNewPassword = this.state.confirmNewPassword;
    const updatePasswordEvent = events.updatePassword;
    userApi.getRoles(creatorId)
      .then(roles => {
        const isUserTestUser = roles.data[0].roles.includes(defaults.testUserRole)
        if (
          this.state.loggedin &&
          newPassword &&
          confirmNewPassword &&
          newPassword === confirmNewPassword &&
          !isUserTestUser
        ) {
          this.updatePassword(creatorId, email, confirmNewPassword, updatePasswordEvent);
        } else {
          if (!newPassword || !confirmNewPassword) {
            eventLogHandler.failure(creatorId, email, updatePasswordEvent, defaults.passwordBlankError);
            this.warningNotification(defaults.passwordBlankError);
            this.setState({
              newPassword: "",
              confirmNewPassword: ""
            });
          } else if (newPassword != confirmNewPassword) {
            eventLogHandler.failure(creatorId, email, updatePasswordEvent, defaults.passwordsDoNotMatch);
            this.warningNotification(defaults.passwordsDoNotMatch);
            this.setState({
              newPassword: "",
              confirmNewPassword: ""
            });
          } else if (isUserTestUser) {
            eventLogHandler.failure(creatorId, email, updatePasswordEvent, defaults.noAuthorizationToPerformAction);
            this.errorNotification(defaults.noAuthorizationToPerformAction);
            this.setState({
              newPassword: "",
              confirmNewPassword: ""
            });
          }
        }
      })
      .catch(error => this.errorNotification(error));
  };

  /**
   * Update the email to the user
   */
  updateEmail = (creatorId, initialEmail, newEmail, updateEmailEvent) => {
    this.setState({ disableUpdateEmailButton: true });
    this.state.user.updateEmail(newEmail)
      .then(() => {
        userApi.updateEmail(creatorId, newEmail)
          .then(() => {
            eventLogHandler.successful(creatorId, initialEmail, updateEmailEvent);
            this.successNotification(defaults.emailUpdatedSuccessfully);
            this.setState({
              newEmail: "",
              disableUpdateEmailButton: false
            })
            this.onAuthStateChanged();
          })
          .catch(error => {
            eventLogHandler.failure(creatorId, initialEmail, updateEmailEvent, error);
            this.errorNotification(error);
            this.setState({
              newEmail: "",
              disableUpdateEmailButton: false
            });
          });
      })
      .catch(error => {
        eventLogHandler.failure(creatorId, initialEmail, updateEmailEvent, error);
        this.warningNotification(error);
        this.setState({
          newEmail: "",
          disableUpdateEmailButton: false
        });
      });
  };

  /**
   * Update the password to the user
   */
  updatePassword = (creatorId, userEmail, confirmNewPassword, updatePasswordEvent) => {
    this.state.user.updatePassword(confirmNewPassword)
      .then(() => {
        eventLogHandler.successful(creatorId, userEmail, updatePasswordEvent);
        this.successNotification(defaults.passwordUpdatedSuccessfully);
        this.setState({
          newPassword: "",
          confirmNewPassword: ""
        })
      }).catch(error => {
        eventLogHandler.failure(creatorId, userEmail, updatePasswordEvent, error);
        this.errorNotification(error);
        this.setState({
          newPassword: "",
          confirmNewPassword: ""
        });
      });
  };

  /**
   * Reset the specified input field
   * 
   * @param fieldToReset The input field to reset
   */
  resetInputFields = (e, fieldToReset) => {
    e.preventDefault();
    switch (fieldToReset) {
      case defaults.newBackgroundPictureInput:
        this.setState({ newBackgroundPicture: "" }, () => this.resetFieldNotification());
        break;
      case defaults.newProfilePictureInput:
        this.setState({ newProfilePicture: "" }, () => this.resetFieldNotification());
        break;
      case defaults.newDisplayNameInput:
        this.setState({ newDisplayName: "" }, () => this.resetFieldNotification());
        break;
      default:
        this.errorNotification(defaults.resetInputFieldError);
    }
    document.getElementById(fieldToReset).value = "";
  };

  // ********************END ACCOUNT PAGE FUNCTIONALITY********************

  // ********************BEGIN RELEASE NOTES PAGE FUNCTIONALITY********************

  /**
   * Gets all of the updates and release notes from the database
   * If successful or if there is an error, then find the user information
   */
  getUpdates = () => {
    updateApi.getUpdates()
      .then(updates => this.setState({ allUpdates: updates.data }))
      .catch(error => this.errorNotification(error));
  };

  /**
   * Adds an update to the database
   */
  addOneUpdate = e => {
    e.preventDefault();
    userApi.getRoles(this.state.creatorId)
      .then(roles => {
        if (roles.data[0].roles.includes(defaults.adminRole)) {
          const payload = {
            updateChanges: this.state.updateChanges,
            knownIssues: this.state.knownIssues,
            releaseNotesToUpdate: "",
            knownIssuesToUpdate: ""
          };
          updateApi.addOneUpdate(payload)
            .then(() => {
              this.successNotification(defaults.addOneReleaseNoteSuccess);
              this.getUpdates();
              this.setState({
                updateChanges: "",
                knownIssues: ""
              });
            })
            .catch(error => this.errorNotification(error));
        } else this.doNoAuthorization()
      })
      .catch(error => this.errorNotification(error));
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
   * Delete the release note from record
   */
  handleDeleteOneReleaseNote = () => {
    userApi.getRoles(this.state.creatorId)
      .then(roles => {
        if (roles.data[0].roles.includes(defaults.adminRole)) {
          this.setState({ disableConfirmDeleteReleaseNoteButton: true });
          updateApi.deleteOneReleaseNote(this.state.updateId)
            .then(() => {
              this.successNotification(defaults.deleteOneReleaseNoteSuccess);
              this.getUpdates();
              this.setState({
                showDeleteOneUpdateModal: false,
                disableConfirmDeleteReleaseNoteButton: false
              });
            })
            .catch(error => {
              this.errorNotification(error);
              this.setState({ disableConfirmDeleteReleaseNoteButton: false });
            });
        } else this.doNoAuthorization();
      })
      .catch(error => this.errorNotification(error));
  };

  /**
   * Update the release note
   * 
   * @param newReleaseNotes The new release note to update the old one
   * @param newKnownIssues The known issues to update the old one
   */
  handleUpdateOneReleaseNote = (newReleaseNotes, newKnownIssues) => {
    userApi.getRoles(this.state.creatorId)
      .then(roles => {
        if (roles.data[0].roles.includes(defaults.adminRole)) {
          let payload = {
            newReleaseNotes,
            newKnownIssues
          };
          this.setState({ disableConfirmSaveEditReleaseNoteButton: true });
          updateApi.updateOneReleaseNote(this.state.updateId, payload)
            .then(() => {
              this.successNotification(defaults.updateOneReleaseNoteSuccess);
              this.getUpdates();
              this.setState({
                showEditOneUpdateModal: false,
                disableConfirmSaveEditReleaseNoteButton: false
              });
            })
            .catch(error => {
              this.errorNotification(error);
              this.setState({ disableConfirmSaveEditReleaseNoteButton: false });
            });
        } else this.doNoAuthorization()
      })
      .catch(error => this.errorNotification(error));
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

  // ********************END RELEASE NOTES PAGE FUNCTIONALITY********************

  // ********************BEGIN FORUM PAGE FUNCTIONALITY********************

  /**
   * Render the threads according to the sort criteria
   */
  renderSortedThreads = () => {
    let element = document.getElementById(defaults.sortThreadsDropdown);
    let selectedSortOrder = element.options[element.selectedIndex].value;
    localStorage.setItem(this.SELECTED_SORT_ORDER, selectedSortOrder);
    this.setState({
      defaultSortOrder: selectedSortOrder,
      disableSortThreadsButton: true,
      loadingSortedThreads: true,
      allThreads: []
    });
    forumApi.getAllThreads(localStorage.getItem(this.SELECTED_SORT_ORDER))
      .then(res => {
        this.setState({
          allThreads: res.data,
          noSortResults: res.data === undefined || res.data.length === 0 ? defaults.noSortResults : null,
          disableSortThreadsButton: false,
          loadingSortedThreads: false
        });
      })
      .catch(err => {
        this.setState({
          disableSortThreadsButton: false,
          loadingSortedThreads: false
        });
        this.errorNotification(err);
      });
  };

  /**
   * Validate the input values for a new thread before saving it
   */
  validateThreadInputValues = e => {
    e.preventDefault();
    userApi.getUserInfoPartial(this.state.creatorId)
      .then(res => {
        if (res.data.creator === this.state.uniqueCreatorId) {
          if (
            this.state.threadTitle === "" ||
            this.state.threadDescription === "" ||
            this.checkIfStringIsBlank(this.state.threadTitle) ||
            this.checkIfStringIsBlank(this.state.threadDescription)
          ) {
            this.warningNotification(defaults.threadDetailsCannotBeBlank);
          } else {
            let element = document.getElementById(defaults.threadCategoryDropdown);
            this.handleAddOneThread(element.options[element.selectedIndex].value);
          }
        } else {
          alert(defaults.noAuthorizationToPerformAction);
          window.location = "/";
        }
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Gets all of the forum threads from the database
   */
  getForumThreads = () => {
    this.setState({ defaultSortOrder: localStorage.getItem(this.SELECTED_SORT_ORDER) });
    if (localStorage.getItem(this.SELECTED_SORT_ORDER) === null) {
      localStorage.setItem(this.SELECTED_SORT_ORDER, defaults.mostRecentThreadsSort);
      forumApi.getAllThreads(this.SELECTED_SORT_ORDER)
        .then(res => {
          this.setState({
            allThreads: res.data,
            noSortResults: res.data === undefined || res.data.length === 0 ? defaults.noSortResults : null
          });
        })
        .catch(err => {
          this.errorNotification(err);
          this.getUserInfoPartial();
        });
    } else {
      forumApi.getAllThreads(localStorage.getItem(this.SELECTED_SORT_ORDER))
        .then(res => {
          this.setState({
            allThreads: res.data,
            noSortResults: res.data === undefined || res.data.length === 0 ? defaults.noSortResults : null
          });
        })
        .catch(err => {
          this.errorNotification(err);
          this.getUserInfoPartial();
        });
    }
  };

  /**
   * Add a new thread into the database
   * 
   * @param threadCategory the category to record for the thread
   */
  handleAddOneThread = threadCategory => {
    this.setState({ disableSubmitNewThreadButton: true });
    const creatorId = this.state.creatorId;
    const email = this.state.email;
    const displayName = this.state.displayName;
    const event = events.addOneThread;
    let newThreadPayload = {
      creator: creatorId,
      email: email,
      displayName: displayName,
      threadTitle: this.state.threadTitle,
      threadDescription: this.state.threadDescription,
      threadCategory: threadCategory,
      views: 0,
      hits: 0,
      comments: []
    };
    forumApi.addOneThread(newThreadPayload)
      .then(() => {
        this.setState({
          threadDescription: "",
          threadTitle: "",
          defaultSortOrder: defaults.mostRecentThreadsSort,
          disableSubmitNewThreadButton: false
        }, () => {
          eventLogHandler.successful(creatorId, email, event);
          localStorage.removeItem(this.SELECTED_SORT_ORDER);
          this.successNotification(defaults.addThreadSuccessfully);
          this.getForumThreads(this.state.defaultSortOrder);
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.setState({ disableSubmitNewThreadButton: false });
        this.errorNotification(err);
      });
  };

  // ********************END FORUM PAGE FUNCTIONALITY********************

  /**
   * Reload the page
   */
  reloadPage = () => {
    window.location.reload();
  };

  /**
   * Alert the user and navigate to the origin URL
   */
  doNoAuthorization = () => {
    alert(defaults.noAuthorizationToPerformAction);
    window.location = "/";
  };

  /**
   * Display the modal to confirm updating the background picture
   */
  requestShowUpdateBackgroundPictureModal = e => {
    e.preventDefault();
    this.setState({ showUpdateBackgroundPictureModal: true });
  };

  /**
   * Display the success modal after updating profile picture
   */
  requestShowUpdateProfilePictureSuccessModal = () => {
    this.setState({
      showUpdateProfilePictureSuccessModal: true,
      newProfilePicture: ""
    });
  };

  /**
   * Hide the modal to confirm updating the background picture
   */
  requestHideUpdateBackgroundPictureModal = () => {
    this.setState({ showUpdateBackgroundPictureModal: false });
  };

  /**
   * Display the modal to confirm updating the profile picture
   */
  requestShowUpdateProfilePictureModal = e => {
    e.preventDefault();
    this.setState({ showUpdateProfilePictureModal: true });
  };

  /**
   * Hide the modal to confirm updating the profile picture
   */
  requestHideUpdateProfilePictureModal = () => {
    this.setState({ showUpdateProfilePictureModal: false });
  };

  /**
   * Hide the update profile picture success modal
   */
  requestHideUpdateProfilePictureSuccessModal = () => {
    window.location = "/";
  };

  /**
   * Display the modal to notify the user the vehicle year must be a number
   */
  requestShowAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: true });
  };

  /**
   * Hide the modal to notify the user the vehicle year must be a number
   */
  requestHideAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: false });
  };

  /**
   * Show the sign in modal
   */
  requestShowSignInModal = () => {
    if (window.location.href.indexOf("account") > -1) {
      window.location = "/";
    } else {
      this.setState({
        showSignInModal: true,
        showSignUpModal: false,
        email: "",
        password: ""
      });
    }
  };

  /**
   * Show the sign up modal
   */
  requestShowSignUpModal = () => {
    if (window.location.href.indexOf("account") > -1) {
      window.location = "/";
    } else {
      this.setState({
        showSignInModal: false,
        showSignUpModal: true,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  /**
   * Show the sign out modal
   */
  requestShowSignOutModal = () => {
    this.setState({ showSignOutModal: true });
  };

  /**
   * Show the forgot password modal
   */
  requestShowForgotPasswordModal = () => {
    this.setState({
      showSignInModal: false,
      showForgotPasswordModal: true,
      email: ""
    });
  };

  /**
   * Hide the sign in modal
   */
  requestHideSignInModal = () => {
    this.setState({ showSignInModal: false });
  };

  /**
   * Hide the sign up modal
   */
  requestHideSignUpModal = () => {
    this.setState({ showSignUpModal: false });
  };

  /**
   * Hide the sign out modal
   */
  requestHideSignOutModal = () => {
    this.setState({ showSignOutModal: false });
  };

  /**
   * Hide the forgot password modal
   */
  requestHideForgotPasswordModal = () => {
    this.setState({ showForgotPasswordModal: false });
  };

  /**
   * Hide the edit one update modal
   */
  requestHideEditOneUpdateModal = () => {
    this.setState({ showEditOneUpdateModal: false });
  };

  /**
   * Display the modal to delete one update
   */
  requestShowDeleteOneUpdateModal = () => {
    this.setState({
      showDeleteOneUpdateModal: true,
      showEditOneUpdateModal: false
    });
  };

  /**
   * Hide the delete one update modal
   */
  requestHideDeleteOneUpdateModal = () => {
    this.setState({ showDeleteOneUpdateModal: false });
  };

  /**
   * Display the success notification when a vehicle is successfully added
   * 
   * @param year  the year of the vehicle
   * @param make  the make of the vehicle
   * @param model the model of the vehicle
   */
  addOneVehicleSuccessNotification = (year, make, model) => {
    toast.success(`Added a ${year} ${make} ${model}.`);
  };

  /**
   * Display the info notification when the user resets the fields to add a vehicle
   */
  handleResetAddVehicleFields = () => {
    toast.info(defaults.inputFieldsReset);
  };

  /**
   * Display the error notification when an error occurs while loading vehicles
   * 
   * @param error the error message to display to the user
   */
  loadVehiclesFailNotification = error => {
    toast.error(`Loading Vehicles Error: ${error.toString()}`);
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
   * Display an error notification when an error occurs
   * 
   * @param err the error message to display to the user
   */
  errorNotification = error => {
    toast.error(error.toString());
  };

  /**
   * Display the warning notification when a warning occurs
   * 
   * @param error the error message to display to the user
   */
  warningNotification = error => {
    toast.warn(error.toString());
  };

  /**
   * Display the error notification when there is invalid input while updating a release note
   */
  releaseNoteInvalidInputErrorNotification = () => {
    toast.error(defaults.invalidInputDetected);
  };

  /**
   * Display the info notification when the user resets the input field
   */
  resetFieldNotification = () => {
    toast.info(defaults.inputFieldReset);
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
   * Scroll to the top of the page
   */
  backToTopOfPage = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  render() {
    return (
      <Router>
        {
          this.state.loggedin ?
            (
              <NavLoggedIn
                loggedin={this.state.loggedin}
                profilePicture={this.state.profilePicture}
                requestShowSignOutModal={this.requestShowSignOutModal}
                showSignOutModal={this.state.showSignOutModal}
                requestHideSignOutModal={this.requestHideSignOutModal}
                handleSignOut={this.handleSignOut}
              />
            ) :
            (
              <NavLoggedOut
                requestShowSignInModal={this.requestShowSignInModal}
                requestShowSignUpModal={this.requestShowSignUpModal}
              />
            )
        }
        <Routes>
          {
            <Route
              path="/"
              element={
                this.state.user ?
                  (
                    <Main
                      pageLoaded={this.state.pageLoaded}
                      vehicleData={this.state.vehicleData}
                      profilePicture={this.state.profilePicture}
                      onAuthStateChanged={this.onAuthStateChanged}
                      handleResetAddVehicleFields={this.handleResetAddVehicleFields}
                      displayName={this.state.displayName}
                      checkIfVehicleYearIsValid={this.checkIfVehicleYearIsValid}
                      currentTheme={this.state.currentTheme}
                      disableAddVehicleButton={this.state.disableAddVehicleButton}
                      errorMessage={this.state.errorMessage}
                      reloadPage={this.reloadPage}
                      checkIfStringIsBlank={this.checkIfStringIsBlank}
                      showAddVehicleYearNanErrorModal={this.state.showAddVehicleYearNanErrorModal}
                      requestShowAddVehicleYearNanErrorModal={this.requestShowAddVehicleYearNanErrorModal}
                      requestHideAddVehicleYearNanErrorModal={this.requestHideAddVehicleYearNanErrorModal}
                    />
                  ) :
                  (
                    <LoggedOut />
                  )
              }
            />
          }
          <Route
            path="/vehicle/:vehicleId"
            element={
              <Log
                getUserInfoPartial={this.getUserInfoPartial}
                getVehicleCount={this.getVehicleCount}
                checkIfStringIsBlank={this.checkIfStringIsBlank}
                successNotification={this.successNotification}
                errorNotification={this.errorNotification}
                backToTopOfPage={this.backToTopOfPage}
              />
            }
          />
          <Route
            path="/forum"
            element={
              <Forum
                loggedin={this.state.loggedin}
                currentTheme={this.state.currentTheme}
                displayName={this.state.displayName}
                loadingSortedThreads={this.state.loadingSortedThreads}
                threadTitle={this.state.threadTitle}
                threadDescription={this.state.threadDescription}
                allThreads={this.state.allThreads}
                disableSubmitNewThreadButton={this.state.disableSubmitNewThreadButton}
                noSortResults={this.state.noSortResults}
                defaultSortOrder={this.state.defaultSortOrder}
                disableSortThreadsButton={this.state.disableSortThreadsButton}
                handleChange={this.handleChange}
                validateThreadInputValues={this.validateThreadInputValues}
                renderSortedThreads={this.renderSortedThreads}
                checkIfStringIsBlank={this.checkIfStringIsBlank}
                successNotification={this.successNotification}
                warningNotification={this.warningNotification}
                errorNotification={this.errorNotification}
                backToTopOfPage={this.backToTopOfPage}
              />
            }
          />
          <Route
            path="/thread/:threadId"
            element={
              <Thread
                successNotification={this.successNotification}
                warningNotification={this.warningNotification}
                errorNotification={this.errorNotification}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                loggedin={this.state.loggedin}
                pageLoaded={this.state.pageLoaded}
                currentTheme={this.state.currentTheme}
                profilePicture={this.state.profilePicture}
                email={this.state.email}
                displayName={this.state.displayName}
                errorMessage={this.state.errorMessage}
                vehicleCount={this.state.vehicleCount}
                newBackgroundPicture={this.state.newBackgroundPicture}
                newProfilePicture={this.state.newProfilePicture}
                userAccountCreationTime={this.state.userAccountCreationTime}
                userAccountLastSignIn={this.state.userAccountLastSignIn}
                newEmail={this.state.newEmail}
                newPassword={this.state.newPassword}
                confirmNewPassword={this.state.confirmNewPassword}
                showUpdateBackgroundPictureModal={this.state.showUpdateBackgroundPictureModal}
                showUpdateProfilePictureModal={this.state.showUpdateProfilePictureModal}
                roles={this.state.roles}
                disableThemeToggleButton={this.state.disableThemeToggleButton}
                disableUpdateProfilePictureButton={this.state.disableUpdateProfilePictureButton}
                disableUpdateEmailButton={this.state.disableUpdateEmailButton}
                disableUpdateDisplayNameButton={this.state.disableUpdateDisplayNameButton}
                showUpdateProfilePictureSuccessModal={this.state.showUpdateProfilePictureSuccessModal}
                handleChange={this.handleChange}
                updateDisplayName={this.updateDisplayName}
                canUserUpdateEmail={this.canUserUpdateEmail}
                canUserUpdatePassword={this.canUserUpdatePassword}
                downloadEventLogCsvFile={this.downloadEventLogCsvFile}
                backToTopOfPage={this.backToTopOfPage}
                saveThemeForUser={this.saveThemeForUser}
                resetInputFields={this.resetInputFields}
                updateBackgroundPicture={this.updateBackgroundPicture}
                checkIfStringIsBlank={this.checkIfStringIsBlank}
                updateProfilePicture={this.updateProfilePicture}
                requestHideUpdateBackgroundPictureModal={this.requestHideUpdateBackgroundPictureModal}
                requestShowUpdateProfilePictureModal={this.requestShowUpdateProfilePictureModal}
                requestHideUpdateProfilePictureModal={this.requestHideUpdateProfilePictureModal}
                requestShowUpdateBackgroundPictureModal={this.requestShowUpdateBackgroundPictureModal}
                requestHideUpdateProfilePictureSuccessModal={this.requestHideUpdateProfilePictureSuccessModal}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                currentTheme={this.state.currentTheme}
              />
            }
          />
          <Route
            path="/updates"
            element={
              <Updates
                roles={this.state.roles}
                allUpdates={this.state.allUpdates}
                updateChanges={this.state.updateChanges}
                knownIssues={this.state.knownIssues}
                updateChangesToShowInModal={this.state.updateChangesToShowInModal}
                knownIssuesToShowInModal={this.state.knownIssuesToShowInModal}
                currentTheme={this.state.currentTheme}
                showEditOneUpdateModal={this.state.showEditOneUpdateModal}
                showDeleteOneUpdateModal={this.state.showDeleteOneUpdateModal}
                disableConfirmSaveEditReleaseNoteButton={this.state.disableConfirmSaveEditReleaseNoteButton}
                disableConfirmDeleteReleaseNoteButton={this.state.disableConfirmDeleteReleaseNoteButton}
                handleChange={this.handleChange}
                backToTopOfPage={this.backToTopOfPage}
                addOneUpdate={this.addOneUpdate}
                editOneUpdateModal={this.editOneUpdateModal}
                requestShowDeleteOneUpdateModal={this.requestShowDeleteOneUpdateModal}
                requestHideEditOneUpdateModal={this.requestHideEditOneUpdateModal}
                requestHideDeleteOneUpdateModal={this.requestHideDeleteOneUpdateModal}
                handleDeleteOneReleaseNote={this.handleDeleteOneReleaseNote}
                checkUserEnteredUpdatedReleaseNoteInput={this.checkUserEnteredUpdatedReleaseNoteInput}
              />
            }
          />
          <Route element={<NoMatch />} />
        </Routes>
        <SignInModal
          showSignInModal={this.state.showSignInModal}
          disableSignInButton={this.state.disableSignInButton}
          handleChange={this.handleChange}
          requestShowSignUpModal={this.requestShowSignUpModal}
          requestHideSignInModal={this.requestHideSignInModal}
          handleSignIn={this.handleSignIn}
          requestShowForgotPasswordModal={this.requestShowForgotPasswordModal}
        />
        <SignUpModal
          showSignUpModal={this.state.showSignUpModal}
          disableSignUpButton={this.state.disableSignUpButton}
          handleChange={this.handleChange}
          requestShowSignInModal={this.requestShowSignInModal}
          requestHideSignUpModal={this.requestHideSignUpModal}
          handleSignUp={this.handleSignUp}
        />
        <SignOutModal
          currentTheme={this.state.currentTheme}
          showSignOutModal={this.state.showSignOutModal}
          disableDoSignOutButton={this.state.disableDoSignOutButton}
          handleSignOut={this.handleSignOut}
          requestHideSignOutModal={this.requestHideSignOutModal}
        />
        <ForgotPasswordModal
          showForgotPasswordModal={this.state.showForgotPasswordModal}
          disableForgotPasswordSubmitButton={this.state.disableForgotPasswordSubmitButton}
          handleChange={this.handleChange}
          requestHideForgotPasswordModal={this.requestHideForgotPasswordModal}
          handlePasswordReset={this.handlePasswordReset}
        />
        <ToastContainer />
      </Router>
    );
  };
};
