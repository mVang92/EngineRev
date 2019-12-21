import React, { Component } from "react";
import Modal from "react-modal";
import Container from "../../components/Container";
import { firebase } from "../../firebase";
import API from "../../utils/API";
import { ToastContainer, toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: "",
      userId: "",
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
    this.setState({
      userEmail: this.props.location.state[0],
      userAccountCreationTime: this.props.location.state[1],
      userId: this.props.match.params.id
    });
    this.getVehicleData();
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

  updatePassword = e => {
    e.preventDefault();
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        if (this.state.newPassword === this.state.confirmNewPassword) {
          user.updatePassword(this.state.confirmNewPassword)
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
              })
            });
        } else {
          this.setState({
            newPassword: "",
            confirmNewPassword: ""
          })
          this.passwordsDoNotMatchErrorNotification();
        };
      } else {
        this.unauthorizedNotification();
      }
    });
  };

  /**
   * Set the state of the unique id to true
   */
  showUniqueUserId = () => {
    this.setState({
      showUniqueUserId: true,
      showMaskUniqueUserId: false
    });
  };

  /**
   * Set the state of the unique id to false
   */
  hideUniqueUserId = () => {
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
   * Display the error notification when there are no users logged in
   */
  unauthorizedNotification = () => {
    toast.error(`You do not have authorization to perform this action.`);
  };

  render() {
    let uniqueUserId = this.state.showUniqueUserId ? "showUniqueUserId" : "hideUniqueUserId";
    let uniqueUserIdMask = this.state.showMaskUniqueUserId ? "showMaskUniqueUserId" : "hideMaskUniqueUserId";
    return (
      <Container>
        <div id="accountPage" className="mt-3 box">
          <div className="row">
            <div className="col-md-12 text-center"><strong>My Account</strong></div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4"><strong>Email:</strong></div>
            <div className="col-md-4">{this.state.userEmail}</div>
            <div className="col-md-4"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4"><strong>Unique User Id:</strong></div>
            <div className="col-md-4">
              <span id={uniqueUserIdMask}>*****************************************</span>
              <span id={uniqueUserId}>{this.state.userId}</span>
            </div>
            <div className="col-md-4">
              {
                this.state.showUniqueUserId ? (
                  <button
                    id="hideUniqueIdButton"
                    title="Hide Unique Id"
                    type="button"
                    className="cancelBtn"
                    onClick={this.hideUniqueUserId}
                  >
                    Hide
                  </button>
                ) : (
                    <button
                      id="showUniqueIdButton"
                      title="Show Unique Id"
                      type="button"
                      className="cancelBtn"
                      onClick={this.showUniqueUserId}
                    >
                      Show
                    </button>
                  )
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4"><strong>Vehicles On Record:</strong></div>
            <div className="col-md-4">
              {
                this.state.loadingError ? (
                  <span className="text-danger">Error Loading Vehicle Count</span>
                ) : (
                    <span>{this.state.vehicleCount}</span>
                  )
              }
            </div>
            <div className="col-md-4"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4"><strong>Account Creation Date:</strong></div>
            <div className="col-md-4">{this.state.userAccountCreationTime}</div>
            <div className="col-md-4"></div>
          </div>
          <br />
          <form onSubmit={this.updatePassword}>
            <div className="row">
              <div className="col-md-4"><strong>Update Password:</strong></div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="password"
                      ref="newPassword"
                      onChange={this.handleChange}
                      value={this.state.newPassword}
                      name="newPassword"
                      maxLength="50"
                      placeholder="New Password"
                    />
                  </div>
                  <br /><br />
                  <div className="col-md-12">
                    <input
                      type="password"
                      ref="confirmNewPassword"
                      onChange={this.handleChange}
                      value={this.state.confirmNewPassword}
                      name="confirmNewPassword"
                      maxLength="50"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12"></div>
                  <br /><br />
                  <div className="col-md-12">
                    <button
                      id="submitNewPasswordButton"
                      type="submit"
                      onClick={this.updatePassword}
                    >
                      Submit
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr />
          <a href="/"><button className="backHomeBtn">Back Home</button></a>
          <br />
        </div>
        <ToastContainer />
      </Container>
    );
  };
};
