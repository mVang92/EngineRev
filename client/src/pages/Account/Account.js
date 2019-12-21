import React, { Component } from "react";
import Container from "../../components/Container";
import API from "../../utils/API";
import { ToastContainer, toast } from "react-toastify";

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: "",
      userId: "",
      vehicleData: "",
      vehicleCount: "Loading...",
      loadingError: "",
      showUniqueUserId: false,
      showMaskUniqueUserId: true
    };
  };

  /**
   * Grab the passed in states and set them to state, then get vehicle data
   */
  componentDidMount = () => {
    this.setState({
      userEmail: this.props.location.state,
      userId: this.props.match.params.id
    });
    this.getVehicleData();
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
   * Display the error notification when an error occurs while loading vehicles
   * 
   * @param err the error message to display to the user
   */
  loadVehiclesFailNotification = err => {
    toast.error(`Loading Vehicles ${err.toString()}`);
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
              <span id={uniqueUserIdMask}>XXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
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
          <hr />
          <a href="/"><button className="backHomeBtn">← Back Home</button></a>
          <br />
        </div>
        <ToastContainer />
      </Container>
    );
  };
};
