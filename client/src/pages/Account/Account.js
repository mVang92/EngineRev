import React, { Component } from "react";
import Modal from "react-modal";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase";
import { themes } from "../../themes/Themes";
import NoAuthorization from "../../components/NoAuthorization";
import API from "../../utils/API";
import AccountDetails from "../../components/AccountDetails";
import UpdateProfilePictureModal from "../../components/Modal/UpdateProfilePictureModal";
import UpdateDisplayNameModal from "../../components/Modal/UpdateDisplayNameModal";
import UpdateProfilePictureSuccessModal from "../../components/Modal/UpdateProfilePictureSuccessModal";
import UpdateDisplayNameSuccessModal from "../../components/Modal/UpdateDisplayNameSuccessModal";
import { ToastContainer, toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      pageLoaded: false,
      admin: false,
      originUrl: window.location.origin,
      user: "",
      userEmail: "",
      userId: "",
      userDisplayName: "",
      newDisplayName: "",
      userPhotoUrl: "",
      newPassword: "",
      confirmNewPassword: "",
      theme: "",
      currentTheme: "",
      vehicleData: "",
      vehicleCount: "Loading...",
      loadingError: "",
      userAccountCreationTime: "",
      userAccountLastSignIn: "",
      newProfilePicture: "",
      showUniqueUserId: false,
      showMaskUniqueUserId: true,
      showUpdateProfilePictureModal: false,
      showUpdateDisplayNameModal: false,
      showUpdateProfilePictureSuccessModal: false,
      showUpdateDisplayNameSuccessModal: false
    };
  };

  /**
   * Firebase onAuthStateChanged
   */
  componentWillMount = () => {
    Modal.setAppElement("body");
    this.onAuthStateChanged();
  };

  /**
   * Firebase onAuthStateChanged
   */
  onAuthStateChanged = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loggedin: true,
          userEmail: this.props.location.state[0],
          userAccountCreationTime: this.props.location.state[1],
          userDisplayName: this.props.location.state[2],
          userPhotoUrl: this.props.location.state[3],
          userAccountLastSignIn: this.props.location.state[4],
          userId: this.props.match.params.id
        });
        this.getVehicleData()
      };
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
   * Handle theme selection
   */
  handleThemeSelection = (event, themeType) => {
    event.preventDefault();
    switch (themeType) {
      case "carSpace":
        this.saveThemeForUser(themeType);
        this.getVehicleData();
        break;
      case "light":
        this.saveThemeForUser(themeType);
        this.getVehicleData();
        break;
      case "grey":
        this.saveThemeForUser(themeType);
        this.getVehicleData();
        break;
      case "dark":
        this.saveThemeForUser(themeType);
        this.getVehicleData();
        break;
      default:
        alert("Error: Unable to save theme selection.");
    }
  };

  /**
   * Save the selected theme to the database for the targeted user
   * 
   * @param themeType the theme to pass to the API
   */
  saveThemeForUser = themeType => {
    API.saveThemeForUser(this.state.userId, themeType)
      .catch(err => console.log(err));
  };

  /**
   * Get the vehicle data from the API
   */
  getVehicleData = () => {
    if (this.state.userId) {
      API.findUserInformationForOneUser(this.state.userId)
        .then(res =>
          this.setState({
            vehicleCount: res.data.vehicles.length,
            admin: res.data.admin,
            theme: res.data.theme,
            pageLoaded: true
          }, () => {
            this.getThemeAndRender();
          })
        )
        .catch(err =>
          this.setState({ loadingError: err },
            this.loadVehiclesFailNotification(err)
          )
        );
    } else (
      setTimeout(() => {
        this.getVehicleData();
      }, 10)
    );
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
          document.body.style.backgroundColor = "rgb(128, 128, 128)";
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
   * Update the display name for the user
   */
  updateDisplayName = e => {
    e.preventDefault();
    this.setState({ showUpdateDisplayNameModal: false });
    const user = this.state.user;
    if (this.state.loggedin) {
      user.updateProfile({
        displayName: this.state.newDisplayName
      }).then(() => {
        this.setState({
          showUpdateDisplayNameModal: false,
          newDisplayName: ""
        });
        this.showUpdateDisplayNameSuccessModal();
      }).catch(error => {
        this.updateDisplayNameErrorNotification(error);
      });
    };
  };

  /**
   * Update the display name for the user
   */
  updateProfilePicture = e => {
    e.preventDefault();
    this.setState({ showUpdateProfilePictureModal: false });
    const user = this.state.user;
    if (this.state.loggedin) {
      user.updateProfile({
        photoURL: this.state.newProfilePicture
      }).then(() => {
        this.showUpdateProfilePictureSuccessModal();
      }).catch(error => {
        this.updateProfilePictureErrorNotification(error);
      });
    };
  };

  /**
   * Update the password to the user
   */
  updatePassword = e => {
    e.preventDefault();
    if (this.state.loggedin) {
      let isDomainCarspace = (this.state.userEmail).includes("carspace.com");
      if (isDomainCarspace) {
        this.unableToUpdatePasswordProductionTestUsers();
        this.setState({
          newPassword: "",
          confirmNewPassword: ""
        });
      } else {
        if (this.state.newPassword === this.state.confirmNewPassword) {
          this.state.user.updatePassword(this.state.confirmNewPassword)
            .then(() => {
              this.updatePasswordSuccessNotification();
              this.setState({
                newPassword: "",
                confirmNewPassword: ""
              })
            }).catch(error => {
              this.updatePasswordErrorNotification(error);
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
          this.passwordsDoNotMatchErrorNotification();
        };
      };
    };
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
    this.setState({ showUpdateProfilePictureSuccessModal: false });
    window.location.assign(this.state.originUrl);
  };

  /**
   * Hide the update display name success modal
   */
  hideUpdateDisplayNameSuccessModal = () => {
    this.setState({ showUpdateDisplayNameSuccessModal: false });
    window.location.assign(this.state.originUrl);
  };

  /**
   * Display the success notification when the password is updated successfully
   */
  updatePasswordSuccessNotification = () => {
    toast.success(`Password Updated Successfully.`);
  };

  /**
   * Display the error notification when the new password and confirm passwords do not match
   */
  passwordsDoNotMatchErrorNotification = () => {
    toast.warn(`Passwords do not match. Try again.`);
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
   * Display the error notification when an error occurs while updating password
   * 
   * @param err the error message to display to the user
   */
  updatePasswordErrorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when an error occurs while updating password
   * 
   * @param err the error message to display to the user
   */
  updateDisplayNameErrorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when an error occurs while updating password
   * 
   * @param err the error message to display to the user
   */
  updateProfilePictureErrorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when updating the password to a production test user
   */
  unableToUpdatePasswordProductionTestUsers = () => {
    toast.error(`You are not authorized to perform this action.`);
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
                    <ToastContainer />
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
                        userAccountCreationTime={this.state.userAccountCreationTime}
                        userAccountLastSignIn={this.state.userAccountLastSignIn}
                        updateDisplayName={this.updateDisplayName}
                        newDisplayName={this.state.newDisplayName}
                        updatePassword={this.updatePassword}
                        newPassword={this.state.newPassword}
                        newProfilePicture={this.state.newProfilePicture}
                        confirmNewPassword={this.state.confirmNewPassword}
                        showUpdateProfilePictureModal={this.showUpdateProfilePictureModal}
                        showUpdateDisplayNameModal={this.showUpdateDisplayNameModal}
                        handleThemeSelection={this.handleThemeSelection}
                        admin={this.state.admin}
                        theme={this.state.theme}
                        currentTheme={this.state.currentTheme}
                      />
                    </Container>
                    <UpdateProfilePictureModal
                      showUpdateProfilePictureModal={this.state.showUpdateProfilePictureModal}
                      updateProfilePicture={this.updateProfilePicture}
                      hideUpdateProfilePictureModal={this.hideUpdateProfilePictureModal}
                      newProfilePicture={this.state.newProfilePicture}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdateDisplayNameModal
                      showUpdateDisplayNameModal={this.state.showUpdateDisplayNameModal}
                      updateDisplayName={this.updateDisplayName}
                      hideUpdateDisplayNameModal={this.hideUpdateDisplayNameModal}
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
