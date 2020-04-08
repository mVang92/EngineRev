import React, { Component } from "react";
import Modal from "react-modal";
import { defaults } from "../../assets/Defaults";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase";
import { themes } from "../../themes/Themes";
import NoAuthorization from "../../components/NoAuthorization";
import API from "../../utils/API";
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
      defaultDisplayName: defaults.defaultDisplayName
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
   * Scroll to the top of the page
   */
  backToTopOfPage = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /**
   * Save the selected theme to the database for the targeted user
   * 
   * @param themeType the theme to pass to the API
   */
  saveThemeForUser = (event, themeType) => {
    event.preventDefault();
    API.saveThemeForUser(this.state.userId, themeType)
      .then(() => this.getVehicleData())
      .catch(err => this.errorNotification(err));
  };

  /**
   * Get the vehicle data from the API
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
            }, () => {
              this.determineTheme();
            })
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
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = theme.backgroundColor;
    }
  };

  /**
   * Update the display name for the user
   */
  updateDisplayName = e => {
    e.preventDefault();
    const user = this.state.user;
    if (this.state.loggedin) {
      user.updateProfile({ displayName: this.state.newDisplayName })
        .then(() => {
          this.setState({
            showUpdateDisplayNameModal: false,
            newDisplayName: ""
          });
          this.showUpdateDisplayNameSuccessModal();
        })
        .catch(error => {
          this.setState({ showUpdateDisplayNameModal: false });
          this.errorNotification(error);
        });
    };
  };

  /**
   * Update the background picture for the user
   */
  updateBackgroundPicture = () => {
    API.updateUserBackgroundPicture(this.state.userId, this.state.newBackgroundPicture)
      .then(() => {
        this.getVehicleData();
        this.setState({
          showUpdateBackgroundPictureModal: false,
          newBackgroundPicture: ""
        });
      })
      .catch(error => {
        this.setState({ showUpdateBackgroundPictureModal: false });
        this.errorNotification(error);
      });
  };

  /**
   * Update the profile picture for the user
   */
  updateProfilePicture = e => {
    e.preventDefault();
    const user = this.state.user;
    if (this.state.loggedin) {
      user.updateProfile({ photoURL: this.state.newProfilePicture })
        .then(() => {
          this.setState({ showUpdateProfilePictureModal: false });
          this.showUpdateProfilePictureSuccessModal();
        })
        .catch(error => {
          this.setState({ showUpdateProfilePictureModal: false });
          this.errorNotification(error);
        });
    }
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
              this.errorNotification(error);
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
        }
      }
    }
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
   * Display the error notification when an error occurs
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
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
                        newBackgroundPicture={this.state.newBackgroundPicture}
                        newProfilePicture={this.state.newProfilePicture}
                        confirmNewPassword={this.state.confirmNewPassword}
                        backToTopOfPage={this.backToTopOfPage}
                        showUpdateBackgroundPictureModal={this.showUpdateBackgroundPictureModal}
                        showUpdateProfilePictureModal={this.showUpdateProfilePictureModal}
                        showUpdateDisplayNameModal={this.showUpdateDisplayNameModal}
                        saveThemeForUser={this.saveThemeForUser}
                        admin={this.state.admin}
                        theme={this.state.theme}
                        currentTheme={this.state.currentTheme}
                        unableToLoadDatabase={this.state.unableToLoadDatabase}
                      />
                    </Container>
                    <UpdateBackgroundPictureModal
                      showUpdateBackgroundPictureModal={this.state.showUpdateBackgroundPictureModal}
                      updateBackgroundPicture={this.updateBackgroundPicture}
                      hideUpdateBackgroundPictureModal={this.hideUpdateBackgroundPictureModal}
                      newBackgroundPicture={this.state.newBackgroundPicture}
                      currentTheme={this.state.currentTheme}
                    />
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
