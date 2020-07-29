import React, { Component } from "react";
import Modal from "react-modal";
import { defaults } from "../../assets/Defaults";
import { events } from "../../assets/Events";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase";
import { themes } from "../../themes/Themes";
import NoAuthorization from "../../components/NoAuthorization";
import API from "../../utils/API";
import eventLogApi from "../../utils/eventLogApi";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import AccountDetails from "../../components/AccountDetails";
import UpdateBackgroundPictureModal from "../../components/Modal/UpdateBackgroundPictureModal";
import UpdateProfilePictureModal from "../../components/Modal/UpdateProfilePictureModal";
import UpdateDisplayNameModal from "../../components/Modal/UpdateDisplayNameModal";
import UpdateProfilePictureSuccessModal from "../../components/Modal/UpdateProfilePictureSuccessModal";
import UpdateDisplayNameSuccessModal from "../../components/Modal/UpdateDisplayNameSuccessModal";
import { toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      pageLoaded: false,
      admin: false,
      user: "",
      backgroundPicture: "",
      userEmail: "",
      userId: "",
      userDisplayName: "",
      newDisplayName: "",
      userPhotoUrl: "",
      newPassword: "",
      confirmNewPassword: "",
      theme: "",
      currentTheme: "",
      vehicleCount: "",
      loadingError: "",
      userAccountCreationTime: "",
      userAccountLastSignIn: "",
      newBackgroundPicture: "",
      newProfilePicture: "",
      showUniqueUserId: false,
      showMaskUniqueUserId: true,
      showUpdateBackgroundPictureModal: false,
      showUpdateProfilePictureModal: false,
      showUpdateDisplayNameModal: false,
      showUpdateProfilePictureSuccessModal: false,
      showUpdateDisplayNameSuccessModal: false,
      unableToLoadDatabase: false,
      defaultProfilePicture: defaults.defaultProfilePicture,
      defaultDisplayName: defaults.defaultDisplayName,
      disableThemeToggleButton: false
    };
  };

  /**
   * Firebase onAuthStateChanged
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    this.onAuthStateChanged();
  };

  /**
   * Firebase onAuthStateChanged
   */
  onAuthStateChanged = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        try {
          this.setState({
            user: user,
            loggedin: true,
            userEmail: this.props.location.state[0],
            userAccountCreationTime: this.props.location.state[1],
            userDisplayName: this.props.location.state[2],
            userPhotoUrl: this.props.location.state[3],
            userAccountLastSignIn: this.props.location.state[4],
            userId: this.props.match.params.id
          }, () => {
            if (!user.photoURL) {
              this.setState({ userPhotoUrl: this.state.defaultProfilePicture });
            }
            if (!user.displayName) {
              this.setState({ userDisplayName: this.state.defaultDisplayName });
            }
            this.getVehicleData();
          });
        } catch (err) {
          this.setState({ loggedin: false });
        }
      }
    });
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Check if the user input value is blank
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

  /**
   * Save the selected theme to the database for the targeted user
   */
  saveThemeForUser = () => {
    const creatorId = this.state.userId;
    const email = this.state.userEmail;
    const event = events.saveTheme;
    let element = document.getElementById("themeSelectionDropdown");
    let selectedTheme = element.options[element.selectedIndex].value;
    if (selectedTheme !== defaults.noThemeSelection) {
      this.setState({ disableThemeToggleButton: true });
      API.saveThemeForUser(creatorId, selectedTheme)
        .then(() => {
          this.setState({ disableThemeToggleButton: false }, () => {
            eventLogHandler.successful(creatorId, email, event);
            this.getVehicleData()
          });
        })
        .catch(err => {
          this.setState({ disableThemeToggleButton: false }, () => {
            eventLogHandler.failure(creatorId, email, event, err);
            this.errorNotification(err);
          });
        });
    }
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getVehicleData = () => {
    if (this.state.userId) {
      API.findUserInformationForOneUser(this.state.userId)
        .then(res => {
          try {
            this.setState({
              vehicleCount: res.data.vehicles.length,
              backgroundPicture: res.data.backgroundPicture,
              admin: res.data.admin,
              theme: res.data.theme,
              pageLoaded: true
            }, () => this.determineTheme())
          } catch (err) {
            this.setState({
              vehicleCount: <div className="text-danger">{err.toString()}</div>,
              pageLoaded: true,
              unableToLoadDatabase: true
            });
          }
        })
        .catch(err =>
          this.setState({ loadingError: err },
            this.loadVehiclesFailNotification(err)
          )
        );
    } else {
      this.getVehicleData();
    }
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
   */
  renderTheme = theme => {
    this.setState({ currentTheme: theme });
    if (this.state.backgroundPicture) {
      document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
    } else {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = theme.backgroundColor;
    }
  };

  /**
   * Update the display name for the user
   */
  updateDisplayName = () => {
    const user = this.state.user;
    const creatorId = this.state.userId;
    const email = this.state.userEmail;
    const event = events.updateDisplayName;
    let newDisplayName = this.state.newDisplayName;
    if (this.checkIfStringIsBlank(newDisplayName)) {
      newDisplayName = defaults.defaultDisplayName;
    }
    if (this.state.loggedin) {
      user.updateProfile({ displayName: newDisplayName })
        .then(() => {
          this.setState({
            showUpdateDisplayNameModal: false,
            newDisplayName: ""
          }, () => {
            eventLogHandler.successful(creatorId, email, event);
            this.showUpdateDisplayNameSuccessModal();
          });
        })
        .catch(err => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.setState({ showUpdateDisplayNameModal: false });
          this.errorNotification(err);
        });
    };
  };

  /**
   * Update the background picture for the user
   */
  updateBackgroundPicture = () => {
    const creatorId = this.state.userId;
    const email = this.state.userEmail;
    const event = events.updateBackgroundPicture;
    let newBackgroundPicture = this.state.newBackgroundPicture;
    if (this.checkIfStringIsBlank(newBackgroundPicture)) {
      newBackgroundPicture = "";
    }
    API.updateUserBackgroundPicture(this.state.userId, newBackgroundPicture)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.getVehicleData();
        this.setState({
          showUpdateBackgroundPictureModal: false,
          newBackgroundPicture: ""
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.setState({ showUpdateBackgroundPictureModal: false });
        this.errorNotification(err);
      });
  };

  /**
   * Update the profile picture for the user
   */
  updateProfilePicture = () => {
    const user = this.state.user;
    const creatorId = this.state.userId;
    const email = this.state.userEmail;
    const event = events.updateProfilePicture;
    let newProfilePicture = this.state.newProfilePicture;
    if (this.checkIfStringIsBlank(newProfilePicture)) {
      newProfilePicture = defaults.defaultProfilePicture;
    }
    if (this.state.loggedin) {
      user.updateProfile({ photoURL: newProfilePicture })
        .then(() => {
          eventLogHandler.successful(creatorId, email, event);
          this.setState({ showUpdateProfilePictureModal: false });
          this.showUpdateProfilePictureSuccessModal();
        })
        .catch(err => {
          eventLogHandler.failure(creatorId, email, event, err);
          this.setState({ showUpdateProfilePictureModal: false });
          this.errorNotification(err);
        });
    }
  };

  /**
   * Update the password to the user
   */
  updatePassword = e => {
    e.preventDefault();
    const creatorId = this.state.userId;
    const email = this.state.userEmail;
    const event = events.updatePassword;
    if (this.state.loggedin) {
      let isDomainCarspace = (this.state.userEmail).includes("carspace.com");
      if (isDomainCarspace) {
        this.errorNotification(defaults.noAuthorizationToPerformAction);
        this.setState({
          newPassword: "",
          confirmNewPassword: ""
        });
      } else {
        if (this.state.newPassword === this.state.confirmNewPassword) {
          this.state.user.updatePassword(this.state.confirmNewPassword)
            .then(() => {
              eventLogHandler.successful(creatorId, email, event);
              this.successNotification(defaults.passwordUpdatedSuccessfully);
              this.setState({
                newPassword: "",
                confirmNewPassword: ""
              })
            }).catch(err => {
              eventLogHandler.failure(creatorId, email, event, err);
              this.errorNotification(err);
              this.setState({
                newPassword: "",
                confirmNewPassword: ""
              });
            });
        } else {
          this.setState({
            newPassword: "",
            confirmNewPassword: ""
          });
          this.warningNotification(defaults.passwordsDoNotMatch);
        }
      }
    }
  };

  /**
   * Download the event logs in a CSV file
   */
  downloadEventLogCsvFile = () => {
    eventLogApi.getEventsForUser(this.state.userId)
      .then(res => {
        const eventLogsObject = JSON.stringify(res.data);
        const eventLogToCSV = this.convertToCSV(eventLogsObject);
        const exportedFilename = "CarSpace Event Logs.csv" || "export.csv";
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
      .catch(err => this.errorNotification(err));
  };

  /**
   * Convert the event logs into a string separated appropriately by line and comma
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

  /**
   * Display the modal to confirm updating the profile picture
   */
  showUpdateBackgroundPictureModal = e => {
    e.preventDefault();
    this.setState({ showUpdateBackgroundPictureModal: true });
  };

  /**
   * Display the modal to confirm updating the profile picture
   */
  showUpdateProfilePictureModal = e => {
    e.preventDefault();
    this.setState({ showUpdateProfilePictureModal: true });
  };

  /**
   * Display the modal to confirm updating the display name
   */
  showUpdateDisplayNameModal = e => {
    e.preventDefault();
    this.setState({ showUpdateDisplayNameModal: true });
  };

  /**
   * Set the state of the unique id to true
   */
  showUniqueUserIdToPage = () => {
    this.setState({
      showUniqueUserId: true,
      showMaskUniqueUserId: false
    });
  };

  /**
   * Hide the modal to confirm updating the background picture
   */
  hideUpdateBackgroundPictureModal = () => {
    this.setState({ showUpdateBackgroundPictureModal: false });
  };

  /**
   * Hide the modal to confirm updating the profile picture
   */
  hideUpdateProfilePictureModal = () => {
    this.setState({ showUpdateProfilePictureModal: false });
  };

  /**
   * Hide the modal to confirm updating the display name
   */
  hideUpdateDisplayNameModal = () => {
    this.setState({ showUpdateDisplayNameModal: false });
  };

  /**
   * Set the state of the unique id to false
   */
  hideUniqueUserIdToPage = () => {
    this.setState({
      showUniqueUserId: false,
      showMaskUniqueUserId: true
    });
  };

  /**
   * Display the success modal after updating profile picture
   */
  showUpdateProfilePictureSuccessModal = () => {
    this.setState({
      showUpdateProfilePictureSuccessModal: true,
      newProfilePicture: ""
    });
  };

  /**
   * Display the success modal after updating display name
   */
  showUpdateDisplayNameSuccessModal = () => {
    this.setState({ showUpdateDisplayNameSuccessModal: true });
  };

  /**
   * Hide the update profile picture success modal
   */
  hideUpdateProfilePictureSuccessModal = () => {
    window.location = "/";
  };

  /**
   * Hide the update display name success modal
   */
  hideUpdateDisplayNameSuccessModal = () => {
    window.location = "/";
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
   * Display the info notification when the user resets the input field
   */
  resetFieldNotification = () => {
    toast.info(defaults.inputFieldReset);
  };

  /**
   * Display the error notification when an error occurs while loading vehicles
   * 
   * @param err the error message to display to the user
   */
  loadVehiclesFailNotification = err => {
    toast.error(`Loading Vehicles ${err.toString()}`);
  };

  /**
   * Display the error notification when an error occurs
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the warning notification when a warning occurs
   * 
   * @param err the error message to display to the user
   */
  warningNotification = err => {
    toast.warn(err.toString());
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedin ?
            (
              this.state.pageLoaded ?
                (
                  <React.Fragment>
                    <Container>
                      <AccountDetails
                        handleChange={this.handleChange}
                        userPhotoUrl={this.state.userPhotoUrl}
                        userEmail={this.state.userEmail}
                        userId={this.state.userId}
                        userDisplayName={this.state.userDisplayName}
                        showUniqueUserId={this.state.showUniqueUserId}
                        showUniqueUserIdToPage={this.showUniqueUserIdToPage}
                        showMaskUniqueUserId={this.state.showMaskUniqueUserId}
                        hideUniqueUserIdToPage={this.hideUniqueUserIdToPage}
                        loadingError={this.state.loadingError}
                        vehicleCount={this.state.vehicleCount}
                        newBackgroundPicture={this.state.newBackgroundPicture}
                        userAccountCreationTime={this.state.userAccountCreationTime}
                        userAccountLastSignIn={this.state.userAccountLastSignIn}
                        updateDisplayName={this.updateDisplayName}
                        updatePassword={this.updatePassword}
                        newPassword={this.state.newPassword}
                        confirmNewPassword={this.state.confirmNewPassword}
                        downloadEventLogCsvFile={this.downloadEventLogCsvFile}
                        backToTopOfPage={this.backToTopOfPage}
                        showUpdateBackgroundPictureModal={this.showUpdateBackgroundPictureModal}
                        showUpdateProfilePictureModal={this.showUpdateProfilePictureModal}
                        showUpdateDisplayNameModal={this.showUpdateDisplayNameModal}
                        saveThemeForUser={this.saveThemeForUser}
                        admin={this.state.admin}
                        disableThemeToggleButton={this.state.disableThemeToggleButton}
                        currentTheme={this.state.currentTheme}
                        unableToLoadDatabase={this.state.unableToLoadDatabase}
                        resetInputFields={this.resetInputFields}
                      />
                    </Container>
                    <UpdateBackgroundPictureModal
                      showUpdateBackgroundPictureModal={this.state.showUpdateBackgroundPictureModal}
                      updateBackgroundPicture={this.updateBackgroundPicture}
                      hideUpdateBackgroundPictureModal={this.hideUpdateBackgroundPictureModal}
                      checkIfStringIsBlank={this.checkIfStringIsBlank}
                      newBackgroundPicture={this.state.newBackgroundPicture}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdateProfilePictureModal
                      showUpdateProfilePictureModal={this.state.showUpdateProfilePictureModal}
                      updateProfilePicture={this.updateProfilePicture}
                      hideUpdateProfilePictureModal={this.hideUpdateProfilePictureModal}
                      checkIfStringIsBlank={this.checkIfStringIsBlank}
                      newProfilePicture={this.state.newProfilePicture}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdateDisplayNameModal
                      showUpdateDisplayNameModal={this.state.showUpdateDisplayNameModal}
                      updateDisplayName={this.updateDisplayName}
                      hideUpdateDisplayNameModal={this.hideUpdateDisplayNameModal}
                      checkIfStringIsBlank={this.checkIfStringIsBlank}
                      newDisplayName={this.state.newDisplayName}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdateProfilePictureSuccessModal
                      showUpdateProfilePictureSuccessModal={this.state.showUpdateProfilePictureSuccessModal}
                      hideUpdateProfilePictureSuccessModal={this.hideUpdateProfilePictureSuccessModal}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdateDisplayNameSuccessModal
                      showUpdateDisplayNameSuccessModal={this.state.showUpdateDisplayNameSuccessModal}
                      hideUpdateDisplayNameSuccessModal={this.hideUpdateDisplayNameSuccessModal}
                      currentTheme={this.state.currentTheme}
                    />
                  </React.Fragment>
                ) : (
                  <Loading />
                )
            ) : (
              <NoAuthorization />
            )
        }
      </React.Fragment>
    );
  };
};
