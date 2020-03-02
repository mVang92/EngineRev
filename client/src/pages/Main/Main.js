import React, { Component } from "react";
import { themes } from "../../themes/Themes";
import API from "../../utils/API";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import LoggedOut from "../../components/LoggedOut";
import LoggedIn from "../../components/LoggedIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      pageLoaded: false,
      vehicleData: [],
      theme: "",
      uid: "",
      currentTheme: "",
      backgroundColor: "",
      onAuthStateChangedCounter: 0,
      disableAddVehicleButton: false,
      showAddVehicleYearNanErrorModal: false,
    };
  };

  /**
   * Find the user information  when the page loads
   */
  componentDidMount() {
    this.findUserInformationForOneUser(this.state.props.user.uid);
  };

  findUserInformationForOneUser = userId => {
    if (userId) {
      API.findUserInformationForOneUser(userId)
        .then(res =>
          this.setState({
            vehicleData: res.data,
            theme: res.data.theme,
            uid: userId,
            pageLoaded: true,
          }, () => {
            this.getThemeAndRender();
            this.state.props.checkUserDisplayName(this.state.props.user);
          })
        )
        .catch(err => {
          if (this.state.theme === "") {
            this.setState({ onAuthStateChangedCounter: this.state.onAuthStateChangedCounter + 1 });
            if (this.state.onAuthStateChangedCounter <= 5) {
              this.state.props.onAuthStateChanged();
            } else {
              this.setState({
                pageLoaded: true,
                disableAddVehicleButton: true,
                errorMessage: err.toString()
              });
            }
          } else {
            this.loadVehiclesFailNotification(err);
            this.setState({
              pageLoaded: true,
              disableAddVehicleButton: true,
              errorMessage: err.toString()
            });
          }
        });
    }
  };

  /**
   * Get the user theme and render it
   */
  getThemeAndRender = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.setState({
            currentTheme: themes.carSpace,
            backgroundColor: document.body.style.backgroundColor = "rgb(220, 220, 220)"
          });
          break;
        case "light":
          this.setState({
            currentTheme: themes.light,
            backgroundColor: document.body.style.backgroundColor = "rgb(235, 235, 235)"
          });
          break;
        case "grey":
          this.setState({
            currentTheme: themes.grey,
            backgroundColor: document.body.style.backgroundColor = "rgb(112, 112, 112)"
          });
          break;
        case "dark":
          this.setState({
            currentTheme: themes.dark,
            backgroundColor: document.body.style.backgroundColor = "rgb(32, 32, 32)"
          });
          break;
        default:
          this.errorNotification("Error: Unable to process theme selection.");
      }
    }
  };

  /**
   * Reload the page
   */
  reloadPage = () => {
    window.location.reload();
  };

  /**
   * Add a new vehicle to the vehicle data for the user
   * 
   * @param newVehicle the new vehicle to record into data
   */
  handleAddOneVehicle = newVehicle => {
    const id = this.state.uid;
    const date = new Date();
    const futureYear = date.getFullYear() + 2;
    this.setState({ disableAddVehicleButton: true });
    if (isNaN(newVehicle.year) || (newVehicle.year < 1885) || (newVehicle.year > futureYear)) {
      this.showAddVehicleYearNanErrorModal();
      this.setState({ disableAddVehicleButton: false });
    } else {
      API.addOneVehicle(id, newVehicle)
        .then(() => {
          this.addOneVehicleSuccessNotification(newVehicle.year, newVehicle.make, newVehicle.model);
          this.findUserInformationForOneUser(this.state.uid);
          this.setState({ disableAddVehicleButton: false });
          document.getElementById("field").reset();
        })
        .catch(err => {
          this.errorNotification(err);
          this.setState({ disableAddVehicleButton: false });
        });
    };
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
   * Display the error notification when an error occurs while executing a database query
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the info notification when the user resets the fields to add a vehicle
   */
  handleResetAddVehicleFields = () => {
    toast.info(`Input Fields Reset.`);
  };

  /**
   * Display the modal to notify the user the vehicle year must be a number
   */
  showAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: true });
  };

  /**
   * Hide the modal to notify the user the vehicle year must be a number
   */
  hideAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: false });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.props.loggedin ?
            (
              this.state.pageLoaded ?
                (
                  <Container>
                    <LoggedIn
                      vehicleData={this.state.vehicleData}
                      handleResetAddVehicleFields={this.handleResetAddVehicleFields}
                      addVehicle={this.handleAddOneVehicle}
                      userProfilePicture={this.state.props.userProfilePicture}
                      disableAddVehicleButton={this.state.disableAddVehicleButton}
                      currentTheme={this.state.currentTheme}
                      errorMessage={this.state.props.errorMessage}
                      backgroundColor={this.state.backgroundColor}
                      reloadPage={this.reloadPage}
                      showAddVehicleYearNanErrorModal={this.state.showAddVehicleYearNanErrorModal}
                      hideAddVehicleYearNanErrorModal={this.hideAddVehicleYearNanErrorModal}
                    />
                  </Container>
                ) : (
                  <Loading />
                )
            ) : (
              <LoggedOut />
            )
        }
        <ToastContainer />
      </React.Fragment>
    );
  };
};
