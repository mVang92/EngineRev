import React, { Component } from "react";
import Modal from "react-modal";
import Container from "../../components/Container";
import { firebase } from "../../firebase";
import API from "../../utils/API";
import AccountDetails from "../../components/AccountDetails";
import NoAuthorization from "../../components/NoAuthorization";
import UpdateProfilePictureModal from "../../components/Modal/UpdateProfilePictureModal";
import { ToastContainer, toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    // console.log(props)
    super(props)
    this.state = {
      loggedin: false,
      user: "",
      userEmail: "",
      userId: "",
      userDisplayName: "",
      newDisplayName: "",
      userPhotoUrl: "",
      newPassword: "",
      confirmNewPassword: "",
      vehicleData: "",
      vehicleCount: "Loading...",
      loadingError: "",
      userAccountCreationTime: "",
      newProfilePicture: "",
      showUniqueUserId: false,
      showMaskUniqueUserId: true,
      showUpdateProfilePictureModal: false
    };
  };

  /**
   * Grab the passed in states and set them to state, then get vehicle data
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loggedin: true
        })
        this.setState({
          userEmail: this.props.location.state[0],
          userAccountCreationTime: this.props.location.state[1],
          userDisplayName: this.props.location.state[2],
          userPhotoUrl: this.props.location.state[3],
          userId: this.props.match.params.id
        });
        this.getVehicleData();
      };
    })
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Get the vehicle data from the API
   */
  getVehicleData = () => {
    if (this.state.userId) {
      API.getAllVehiclesForUser(this.state.userId)
        .then(res =>
          this.setState({ vehicleCount: res.data.vehicles.length })
        )
        .catch(err =>
          this.setState({ loadingError: err },
            this.loadVehiclesFailNotification(err)));
    } else (
      setTimeout(() => {
        this.getVehicleData();
      }, 10)
    );
  };

  /**
   * UYpdate the display name for the user
   */
  updateDisplayName = e => {
    e.preventDefault();
    const user = this.state.user;
    if (this.state.loggedin) {
      user.updateProfile({
        displayName: this.state.newDisplayName
      }).then(() => {
        if (this.state.newDisplayName !== "") {
          this.updateDisplayNameWithNameSuccessNotification(this.state.newDisplayName);
        } else {
          this.updateDisplayNameWithNoNameSuccessNotification();
        }
        this.setState({ newDisplayName: "" })
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
        this.updateProfilePictureSuccessNotification();
        this.setState({ newProfilePicture: "" });
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

  /**
   * Display the modal to confirm updating the profile picture
   */
  showUpdateProfilePictureModal = e => {
    e.preventDefault();
    this.setState({ showUpdateProfilePictureModal: true })
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
   * Set the state of the unique id to false
   */
  hideUniqueUserIdToPage = () => {
    this.setState({
      showUniqueUserId: false,
      showMaskUniqueUserId: true
    });
  };

  /**
   * Display the success notification when the password is updated successfully
   */
  updatePasswordSuccessNotification = () => {
    toast.success(`Password Updated Successfully.`);
  };

  /**
   * Display the success notification when the display name is updated successfully
   */
  updateDisplayNameWithNameSuccessNotification = updateDisplayName => {
    toast.success(`Display name updated to ${updateDisplayName}. Please redirect to this page to take effect.`);
  };

  /**
   * Display the success notification when the display name is updated successfully
   */
  updateProfilePictureSuccessNotification = () => {
    toast.success(`Profile picture updated. Please redirect to this page to take effect.`);
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
   * Display the success notification when the display name is updated successfully to no value
   */
  updateDisplayNameWithNoNameSuccessNotification = () => {
    toast.success(`Display name updated. Please redirect to this page to take effect.`);
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

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedin ? (
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
                  updateDisplayName={this.updateDisplayName}
                  newDisplayName={this.state.newDisplayName}
                  updatePassword={this.updatePassword}
                  newPassword={this.state.newPassword}
                  showUpdateProfilePictureModal={this.showUpdateProfilePictureModal}
                  newProfilePicture={this.state.newProfilePicture}
                  confirmNewPassword={this.state.confirmNewPassword}
                />
              </Container>
              <UpdateProfilePictureModal
                showUpdateProfilePictureModal={this.state.showUpdateProfilePictureModal}
                updateProfilePicture={this.updateProfilePicture}
                hideUpdateProfilePictureModal={this.hideUpdateProfilePictureModal}
                newProfilePicture={this.state.newProfilePicture}
              />
            </React.Fragment>
          ) : (
              <NoAuthorization />
            )
        }
      </React.Fragment>
    );
  };
};
