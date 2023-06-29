import React from "react";
import Modal from "react-modal";
import { defaults } from "../../assets/Defaults";
import { themes } from "../../themes/Themes";
import { events } from "../../assets/Events";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import PleaseWait from "../../components/PleaseWait";
import { firebase } from "../../firebase";
import NoAuthorization from "../../components/NoAuthorization";
import userApi from "../../utils/userApi";
import displayNameApi from "../../utils/displayNameApi";
import eventLogApi from "../../utils/eventLogApi";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import AccountDetails from "../../components/AccountDetails";
import UpdateBackgroundPictureModal from "../../components/Modal/UpdateBackgroundPictureModal";
import UpdateProfilePictureModal from "../../components/Modal/UpdateProfilePictureModal";
import UpdateProfilePictureSuccessModal from "../../components/Modal/UpdateProfilePictureSuccessModal";
import UpdateDisplayNameSuccessModal from "../../components/Modal/UpdateDisplayNameSuccessModal";
import { toast } from "react-toastify";

const Account = props => {
  const {
    handleChange,
    loggedin,
    pageLoaded,
    pleaseWait,
    user,
    roles,
    backgroundPicture,
    email,
    userId,
    displayName,
    profilePicture,
    newEmail,
    newPassword,
    confirmNewPassword,
    theme,
    updateDisplayName,
    canUserUpdateEmail,
    canUserUpdatePassword,
    resetInputFields,
    downloadEventLogCsvFile,
    saveThemeForUser,
    updateBackgroundPicture,
    updateProfilePicture,
    backToTopOfPage,
    currentTheme,
    vehicleCount,
    errorMessage,
    userAccountCreationTime,
    userAccountLastSignIn,
    newBackgroundPicture,
    newProfilePicture,
    showUpdateBackgroundPictureModal,
    showUpdateProfilePictureModal,
    showUpdateProfilePictureSuccessModal,
    showUpdateDisplayNameSuccessModal,
    hideUpdateProfilePictureSuccessModal,
    hideUpdateBackgroundPictureModal,
    hideUpdateDisplayNameSuccessModal,
    hideUpdateProfilePictureModal,
    checkIfStringIsBlank,
    unableToLoadDatabase,
    defaultProfilePicture,
    defaultDisplayName,
    disableThemeToggleButton,
    disableUpdateEmailButton,
    disableUpdateDisplayNameButton,
  } = props;

  userId;

  // /**
  //  * Firebase onAuthStateChanged
  //  */
  // componentDidMount = () => {
  //   Modal.setAppElement("body");
  //   this.onAuthStateChanged();
  // };

  // /**
  //  * Firebase onAuthStateChanged
  //  */
  // onAuthStateChanged = () => {
  //   firebase.auth.onAuthStateChanged(user => {
  //     if (user) {
  //       try {
  //         this.setState({
  //           user: user,
  //           loggedin: true,
            // userAccountCreationTime: user.metadata.creationTime,
            // userDisplayName: user.displayName,
  //           userPhotoUrl: user.photoURL,
  //           userAccountLastSignIn: user.metadata.lastSignInTime,
  //           userId: user.uid
  //         }, () => {
            // if (!user.photoURL) this.setState({ userPhotoUrl: this.state.defaultProfilePicture });
            // if (!user.displayName) this.setState({ userDisplayName: this.state.defaultDisplayName });
  //           this.getUserData();
  //         });
  //       } catch (err) {
  //         this.setState({ loggedin: false });
  //       }
  //     }
  //   });
  // };

  // /**
  //  * Handle real-time changes
  //  */
  // handleChange = e => {
  //   let { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  

  // /**
  //  * Check if the user input value is blank
  //  * 
  //  * @param string the user input to check against
  //  */
  // checkIfStringIsBlank = string => {
  //   return (!string || /^\s*$/.test(string));
  // };

  // /**
  //  * Scroll to the top of the page
  //  */
  // backToTopOfPage = () => {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // };

  // /**
  //  * Save the selected theme to the database for the targeted user
  //  */
  // saveThemeForUser = () => {
  //   const creatorId = this.state.userId;
  //   const email = this.state.userEmail;
  //   const event = events.saveTheme;
  //   let element = document.getElementById(defaults.themeSelectionDropdown);
  //   let selectedTheme = element.options[element.selectedIndex].value;
  //   if (selectedTheme !== this.state.theme) {
  //     this.setState({ disableThemeToggleButton: true });
  //     userApi.saveThemeForUser(creatorId, selectedTheme)
  //       .then(() => {
  //         this.setState({ disableThemeToggleButton: false }, () => {
  //           eventLogHandler.successful(creatorId, email, event);
  //           this.getUserData();
  //         });
  //       })
  //       .catch(err => {
  //         this.setState({ disableThemeToggleButton: false }, () => {
  //           eventLogHandler.failure(creatorId, email, event, err);
  //           this.errorNotification(err);
  //         });
  //       });
  //   }
  // };

  // /**
  //  * Render the theme and background picture
  //  * 
  //  * @param theme the theme to render
  //  */
  // renderTheme = theme => {
  //   this.setState({ currentTheme: theme });
  //   if (this.state.backgroundPicture) {
  //     document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
  //   } else {
  //     document.body.style.backgroundImage = "";
  //     document.body.style.backgroundColor = theme.backgroundColor;
  //   }
  // };

  // /**
  //  * Update the display name for the user
  //  */
  // updateDisplayName = e => {
  //   e.preventDefault();
  //   const user = this.state.user;
  //   const creatorId = this.state.userId;
  //   const email = this.state.userEmail;
  //   const event = events.updateDisplayName;
  //   let newDisplayName = this.state.newDisplayName;
  //   if (!this.state.loggedin) return;
  //   if (this.checkIfStringIsBlank(newDisplayName) && newDisplayName.length < 6) {
  //     this.warningNotification(defaults.displayNameLengthNotMet);
  //     return;
  //   }
  //   displayNameApi.getDisplayNames()
  //     .then(results => {
  //       this.setState({ disableUpdateDisplayNameButton: true });
  //       const displayNameList = results.data.find(user => user.displayName === newDisplayName);
  //       if (!displayNameList) {
  //         userApi.updateDisplayName(creatorId, newDisplayName)
  //           .then(() => {
  //             user.updateProfile({ displayName: newDisplayName })
  //               .then(() => {
  //                 this.setState({ newDisplayName: "" }, () => {
  //                   eventLogHandler.successful(creatorId, email, event);
  //                   this.showUpdateDisplayNameSuccessModal();
  //                 });
  //               })
  //               .catch(err => {
  //                 eventLogHandler.failure(creatorId, email, event, err);
  //                 this.setState({ disableUpdateDisplayNameButton: false });
  //                 this.errorNotification(err);
  //               });
  //           })
  //           .catch(err => {
  //             eventLogHandler.failure(creatorId, email, event, err);
  //             this.setState({ disableUpdateDisplayNameButton: false });
  //             this.errorNotification(err);
  //           });
  //       } else {
  //         this.setState({ disableUpdateDisplayNameButton: false });
  //         this.warningNotification(defaults.displayNameAlreadyExists);
  //       }
  //     })
  //     .catch(err => {
  //       this.setState({ disableUpdateDisplayNameButton: false });
  //       this.errorNotification(err);
  //     });
  //   // 
  // };

  // /**
  //  * Update the background picture for the user
  //  */
  // updateBackgroundPicture = () => {
  //   const creatorId = this.state.userId;
  //   const email = this.state.userEmail;
  //   const event = events.updateBackgroundPicture;
  //   let newBackgroundPicture = this.state.newBackgroundPicture;
  //   if (this.checkIfStringIsBlank(newBackgroundPicture)) {
  //     newBackgroundPicture = "";
  //   }
  //   userApi.updateUserBackgroundPicture(this.state.userId, newBackgroundPicture)
  //     .then(() => {
  //       eventLogHandler.successful(creatorId, email, event);
  //       this.getUserData();
  //       this.setState({
  //         showUpdateBackgroundPictureModal: false,
  //         newBackgroundPicture: ""
  //       });
  //     })
  //     .catch(err => {
  //       eventLogHandler.failure(creatorId, email, event, err);
  //       this.setState({ showUpdateBackgroundPictureModal: false });
  //       this.errorNotification(err);
  //     });
  // };

  // /**
  //  * Update the profile picture for the user
  //  */
  // updateProfilePicture = () => {
  //   const user = this.state.user;
  //   const creatorId = this.state.userId;
  //   const email = this.state.userEmail;
  //   const event = events.updateProfilePicture;
  //   let newProfilePicture = this.state.newProfilePicture;
  //   if (this.checkIfStringIsBlank(newProfilePicture)) {
  //     newProfilePicture = defaults.defaultProfilePicture;
  //   }
  //   if (this.state.loggedin) {
  //     user.updateProfile({ photoURL: newProfilePicture })
  //       .then(() => {
  //         eventLogHandler.successful(creatorId, email, event);
  //         this.setState({ showUpdateProfilePictureModal: false });
  //         this.showUpdateProfilePictureSuccessModal();
  //       })
  //       .catch(err => {
  //         eventLogHandler.failure(creatorId, email, event, err);
  //         this.setState({ showUpdateProfilePictureModal: false });
  //         this.errorNotification(err);
  //       });
  //   }
  // };

  // /**
  //  * Update the password to the user
  //  */
  // updatePassword = (creatorId, userEmail, confirmNewPassword, updatePasswordEvent) => {
  //   this.state.user.updatePassword(confirmNewPassword)
  //     .then(() => {
  //       eventLogHandler.successful(creatorId, userEmail, updatePasswordEvent);
  //       this.successNotification(defaults.passwordUpdatedSuccessfully);
  //       this.setState({
  //         newPassword: "",
  //         confirmNewPassword: ""
  //       })
  //     }).catch(err => {
  //       eventLogHandler.failure(creatorId, userEmail, updatePasswordEvent, err);
  //       this.errorNotification(err);
  //       this.setState({
  //         newPassword: "",
  //         confirmNewPassword: ""
  //       });
  //     });
  // };

  // /**
  //  * Update the email to the user
  //  */
  // updateEmail = (creatorId, userEmail, newEmail, updateEmailEvent) => {
  //   this.setState({ disableUpdateEmailButton: true });
  //   this.state.user.updateEmail(newEmail)
  //     .then(() => {
  //       this.setState({ pleaseWait: true });
  //       userApi.updateEmail(creatorId, newEmail)
  //         .then(() => {
  //           eventLogHandler.successful(creatorId, userEmail, updateEmailEvent);
  //           document.getElementById(defaults.applicationName).click();
  //           window.location.reload();
  //         })
  //         .catch(err => {
  //           eventLogHandler.failure(creatorId, userEmail, updateEmailEvent, err);
  //           this.errorNotification(err);
  //           this.setState({
  //             newEmail: "",
  //             disableUpdateEmailButton: false,
  //             pleaseWait: false
  //           });
  //         });
  //     })
  //     .catch(err => {
  //       eventLogHandler.failure(creatorId, userEmail, updateEmailEvent, err);
  //       this.errorNotification(err);
  //       this.setState({
  //         newEmail: "",
  //         disableUpdateEmailButton: false,
  //         pleaseWait: false
  //       });
  //     });
  // };

  // /**
  //  * Verify if the user has permission to update their password
  //  */
  // canUserUpdatePassword = e => {
  //   e.preventDefault();
  //   userApi.getRoles(this.userId)
  //     .then(res => {
  //       const creatorId = this.state.userId;
  //       const userEmail = this.state.userEmail;
  //       const newPassword = this.state.newPassword;
  //       const confirmNewPassword = this.state.confirmNewPassword;
  //       const updatePasswordEvent = events.updatePassword;
  //       const isUserTestUser = res.data[0].roles.includes(defaults.testUserRole)
  //       if (
  //         this.state.loggedin &&
  //         newPassword &&
  //         confirmNewPassword &&
  //         newPassword === confirmNewPassword &&
  //         !isUserTestUser
  //       ) {
  //         this.updatePassword(creatorId, userEmail, confirmNewPassword, updatePasswordEvent);
  //       } else {
  //         if (!newPassword || !confirmNewPassword) {
  //           eventLogHandler.failure(creatorId, userEmail, updatePasswordEvent, defaults.passwordBlankError);
  //           this.warningNotification(defaults.passwordBlankError);
  //           this.setState({
  //             newPassword: "",
  //             confirmNewPassword: ""
  //           });
  //         } else if (newPassword != confirmNewPassword) {
  //           eventLogHandler.failure(creatorId, userEmail, updatePasswordEvent, defaults.passwordsDoNotMatch);
  //           this.warningNotification(defaults.passwordsDoNotMatch);
  //           this.setState({
  //             newPassword: "",
  //             confirmNewPassword: ""
  //           });
  //         } else if (isUserTestUser) {
  //           eventLogHandler.failure(creatorId, userEmail, updatePasswordEvent, defaults.noAuthorizationToPerformAction);
  //           this.errorNotification(defaults.noAuthorizationToPerformAction);
  //           this.setState({
  //             newPassword: "",
  //             confirmNewPassword: ""
  //           });
  //         }
  //       }
  //     })
  //     .catch(err => this.errorNotification(err));
  // };

  // /**
  //  * Verify if the user has permission to update their email
  //  */
  // canUserUpdateEmail = e => {
  //   e.preventDefault();
  //   userApi.getRoles(this.state.userId)
  //     .then(res => {
  //       const creatorId = this.state.userId;
  //       const newEmail = this.state.newEmail;
  //       const userEmail = this.state.userEmail;
  //       const updateEmailEvent = events.updateEmail;
  //       const isUserTestUser = res.data[0].roles.includes(defaults.testUserRole)
  //       if (
  //         this.state.loggedin &&
  //         newEmail &&
  //         !isUserTestUser
  //       ) {
  //         this.updateEmail(creatorId, userEmail, newEmail, updateEmailEvent);
  //       } else {
  //         if (!newEmail) {
  //           eventLogHandler.failure(creatorId, userEmail, updateEmailEvent, defaults.emailBlankError);
  //           this.warningNotification(defaults.emailBlankError);
  //         } else if (isUserTestUser) {
  //           this.errorNotification(defaults.noAuthorizationToPerformAction);
  //           this.setState({ newEmail: "" });
  //         }
  //       }
  //     })
  //     .catch(err => this.errorNotification(err));
  // };

  // /**
  //  * Download the event logs in a CSV file
  //  */
  // downloadEventLogCsvFile = () => {
  //   eventLogApi.getEventsForUser(this.state.userId)
  //     .then(res => {
  //       const eventLogsObject = JSON.stringify(res.data);
  //       const eventLogToCSV = this.convertToCSV(eventLogsObject);
  //       const exportedFilename = "EngineRev Event Logs.csv" || "export.csv";
  //       const blob = new Blob([eventLogToCSV], { type: "text/csv;charset=utf-8;" });
  //       if (navigator.msSaveBlob) {
  //         navigator.msSaveBlob(blob, exportedFilename);
  //       } else {
  //         const link = document.createElement("a");
  //         if (link.download !== undefined) {
  //           const url = URL.createObjectURL(blob);
  //           link.setAttribute("href", url);
  //           link.setAttribute("download", exportedFilename);
  //           link.style.visibility = "hidden";
  //           document.body.appendChild(link);
  //           link.click();
  //           document.body.removeChild(link);
  //         }
  //       }
  //     })
  //     .catch(err => this.errorNotification(err));
  // };

  // /**
  //  * Convert the event logs into a string separated appropriately by line and comma
  //  * 
  //  * @param eventLogsObject the event logs to convert to CSV
  //  */
  // convertToCSV = eventLogsObject => {
  //   const array = JSON.parse(eventLogsObject);
  //   let string = "";
  //   for (let index = 0; index < array.length; index++) {
  //     let line = "";
  //     for (let element in array[index]) {
  //       if (line !== "") {
  //         line += ","
  //       }
  //       line += array[index][element];
  //     }
  //     string += line + "\r\n";
  //   }
  //   return string;
  // };

  // /**
  //  * Reset the specified input field
  //  * 
  //  * @param fieldToReset The input field to reset
  //  */
  // resetInputFields = (e, fieldToReset) => {
  //   e.preventDefault();
  //   switch (fieldToReset) {
  //     case defaults.newBackgroundPictureInput:
  //       this.setState({ newBackgroundPicture: "" }, () => this.resetFieldNotification());
  //       break;
  //     case defaults.newProfilePictureInput:
  //       this.setState({ newProfilePicture: "" }, () => this.resetFieldNotification());
  //       break;
  //     case defaults.newDisplayNameInput:
  //       this.setState({ newDisplayName: "" }, () => this.resetFieldNotification());
  //       break;
  //     default:
  //       this.errorNotification(defaults.resetInputFieldError);
  //   }
  //   document.getElementById(fieldToReset).value = "";
  // };

  // /**
  //  * Get the current user display names
  //  */
  // getCurrentDisplayName = () => {
  //   let displayNameArray = [];
  //   displayNameApi.getDisplayNames()
  //     .then(results => {
  //       displayNameArray.push(results.data)
  //     })
  //     .catch(err => this.errorNotification(err));
  //   return displayNameArray;
  // }

  // /**
  //  * Display the modal to confirm updating the profile picture
  //  */
  // showUpdateBackgroundPictureModal = e => {
  //   e.preventDefault();
  //   this.setState({ showUpdateBackgroundPictureModal: true });
  // };

  // /**
  //  * Display the modal to confirm updating the profile picture
  //  */
  // showUpdateProfilePictureModal = e => {
  //   e.preventDefault();
  //   this.setState({ showUpdateProfilePictureModal: true });
  // };

  // /**
  //  * Hide the modal to confirm updating the background picture
  //  */
  // hideUpdateBackgroundPictureModal = () => {
  //   this.setState({ showUpdateBackgroundPictureModal: false });
  // };

  // /**
  //  * Hide the modal to confirm updating the profile picture
  //  */
  // hideUpdateProfilePictureModal = () => {
  //   this.setState({ showUpdateProfilePictureModal: false });
  // };

  // /**
  //  * Display the success modal after updating profile picture
  //  */
  // showUpdateProfilePictureSuccessModal = () => {
  //   this.setState({
  //     showUpdateProfilePictureSuccessModal: true,
  //     newProfilePicture: ""
  //   });
  // };

  // /**
  //  * Display the success modal after updating display name
  //  */
  // showUpdateDisplayNameSuccessModal = () => {
  //   this.setState({ showUpdateDisplayNameSuccessModal: true });
  // };

  // /**
  //  * Hide the update profile picture success modal
  //  */
  // hideUpdateProfilePictureSuccessModal = () => {
  //   window.location = "/";
  // };

  // /**
  //  * Hide the update display name success modal
  //  */
  // hideUpdateDisplayNameSuccessModal = () => {
  //   window.location = "/";
  // };

  // /**
  //  * Display the success notification when the user performs an action successfully
  //  * 
  //  * @param message the message to display to the user
  //  */
  // successNotification = message => {
  //   toast.success(message);
  // };

  // /**
  //  * Display the info notification when the user resets the input field
  //  */
  // resetFieldNotification = () => {
  //   toast.info(defaults.inputFieldReset);
  // };

  // /**
  //  * Display the error notification when an error occurs
  //  * 
  //  * @param err the error message to display to the user
  //  */
  // errorNotification = err => {
  //   toast.error(err.toString());
  // };

  // /**
  //  * Display the warning notification when a warning occurs
  //  * 
  //  * @param err the error message to display to the user
  //  */
  // warningNotification = err => {
  //   toast.warn(err.toString());
  // };

  return (
    <>
      {
        loggedin ?
          (
            pageLoaded ?
              (
                <>
                  <Container>
                    {
                      pleaseWait ?
                        (
                          <PleaseWait currentTheme={currentTheme} />
                        ) :
                        (
                          <AccountDetails
                            handleChange={handleChange}
                            profilePicture={profilePicture}
                            email={email}
                            displayName={displayName}
                            errorMessage={errorMessage}
                            vehicleCount={vehicleCount}
                            newBackgroundPicture={newBackgroundPicture}
                            userAccountCreationTime={userAccountCreationTime}
                            userAccountLastSignIn={userAccountLastSignIn}
                            updateDisplayName={updateDisplayName}
                            canUserUpdateEmail={canUserUpdateEmail}
                            canUserUpdatePassword={canUserUpdatePassword}
                            newEmail={newEmail}
                            newPassword={newPassword}
                            confirmNewPassword={confirmNewPassword}
                            downloadEventLogCsvFile={downloadEventLogCsvFile}
                            backToTopOfPage={backToTopOfPage}
                            showUpdateBackgroundPictureModal={showUpdateBackgroundPictureModal}
                            showUpdateProfilePictureModal={showUpdateProfilePictureModal}
                            saveThemeForUser={saveThemeForUser}
                            roles={roles}
                            disableThemeToggleButton={disableThemeToggleButton}
                            theme={theme}
                            currentTheme={currentTheme}
                            unableToLoadDatabase={unableToLoadDatabase}
                            resetInputFields={resetInputFields}
                            disableUpdateEmailButton={disableUpdateEmailButton}
                            disableUpdateDisplayNameButton={disableUpdateDisplayNameButton}
                          />
                        )
                    }
                  </Container>
                  <UpdateBackgroundPictureModal
                    showUpdateBackgroundPictureModal={showUpdateBackgroundPictureModal}
                    updateBackgroundPicture={updateBackgroundPicture}
                    hideUpdateBackgroundPictureModal={hideUpdateBackgroundPictureModal}
                    checkIfStringIsBlank={checkIfStringIsBlank}
                    newBackgroundPicture={newBackgroundPicture}
                    currentTheme={currentTheme}
                  />
                  <UpdateProfilePictureModal
                    showUpdateProfilePictureModal={showUpdateProfilePictureModal}
                    updateProfilePicture={updateProfilePicture}
                    hideUpdateProfilePictureModal={hideUpdateProfilePictureModal}
                    checkIfStringIsBlank={checkIfStringIsBlank}
                    newProfilePicture={newProfilePicture}
                    currentTheme={currentTheme}
                  />
                  <UpdateProfilePictureSuccessModal
                    showUpdateProfilePictureSuccessModal={showUpdateProfilePictureSuccessModal}
                    hideUpdateProfilePictureSuccessModal={hideUpdateProfilePictureSuccessModal}
                    currentTheme={currentTheme}
                  />
                  <UpdateDisplayNameSuccessModal
                    showUpdateDisplayNameSuccessModal={showUpdateDisplayNameSuccessModal}
                    hideUpdateDisplayNameSuccessModal={hideUpdateDisplayNameSuccessModal}
                    currentTheme={currentTheme}
                  />
                </>
              ) :
              (
                <Loading />
              )
          ) :
          (
            <NoAuthorization />
          )
      }
    </>
  );
};

export default Account;
