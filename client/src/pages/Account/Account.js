import React, { Component } from "react";
import Modal from "react-modal";
import Container from "../../components/Container";
import { firebase } from "../../firebase";
import API from "../../utils/API";
import AccountDetails from "../../components/AccountDetails";
import NoAuthorization from "../../components/NoAuthorization";
import { ToastContainer, toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      user: "",
      userEmail: "",
      userId: "",
      userDisplayName: "",
      newDisplayName: "",
      newPassword: "",
      confirmNewPassword: "",
      vehicleData: "",
      vehicleCount: "Loading...",
      loadingError: "",
      userAccountCreationTime: "",
      showUniqueUserId: false,
      showMaskUniqueUserId: true
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
    if (this.state.loggedin) {
      this.state.user.updateProfile({
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
   * Set the state of the unique id to true
   */
  showUniqueUserIdToPage = () => {
    this.setState({
      showUniqueUserId: true,
      showMaskUniqueUserId: false
    });
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

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedin ? (
            <Container>
              <AccountDetails
                handleChange={this.handleChange}
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
                confirmNewPassword={this.state.confirmNewPassword}
              />
            </Container>
          ) : (
              <NoAuthorization />
            )
        }
        <ToastContainer />
      </React.Fragment>
    );
  };
};
