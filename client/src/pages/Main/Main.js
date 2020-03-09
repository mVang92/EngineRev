import React, { Component } from "react";
import { themes } from "../../themes/Themes";
import API from "../../utils/API";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import LoggedOut from "../../components/LoggedOut";
import LoggedIn from "../../components/LoggedIn";
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
      errorMessage: "",
      refreshCounter: 0,
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

  /**
   * Find user information and set them to state
   */
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
            this.setState({ refreshCounter: this.state.refreshCounter + 1 });
            if (this.state.refreshCounter <= 3) {
              this.findUserInformationForOneUser(userId)
            } else {
              this.setState({
                pageLoaded: true,
                disableAddVehicleButton: true,
                errorMessage: err.toString()
              });
            }
          } else {
            this.state.props.loadVehiclesFailNotification(err);
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
          this.setState({ currentTheme: themes.carSpace });
          document.body.style.backgroundColor = themes.carSpace.backgroundColor;
          break;
        case "light":
          this.setState({ currentTheme: themes.light });
          document.body.style.backgroundColor = themes.light.backgroundColor;
          break;
        case "grey":
          this.setState({ currentTheme: themes.grey });
          document.body.style.backgroundColor = themes.grey.backgroundColor;
          break;
        case "dark":
          this.setState({ currentTheme: themes.dark });
          document.body.style.backgroundColor = themes.dark.backgroundColor;
          break;
        default:
          this.state.props.errorNotification("Error: Unable to process theme selection.");
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
          this.state.props.addOneVehicleSuccessNotification(newVehicle.year, newVehicle.make, newVehicle.model);
          this.findUserInformationForOneUser(this.state.uid);
          this.setState({ disableAddVehicleButton: false });
          document.getElementById("field").reset();
        })
        .catch(err => {
          this.state.props.errorNotification(err);
          this.setState({ disableAddVehicleButton: false });
        });
    };
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
                      handleResetAddVehicleFields={this.state.props.handleResetAddVehicleFields}
                      addVehicle={this.handleAddOneVehicle}
                      userProfilePicture={this.state.props.userProfilePicture}
                      disableAddVehicleButton={this.state.disableAddVehicleButton}
                      currentTheme={this.state.currentTheme}
                      errorMessage={this.state.errorMessage}
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
      </React.Fragment>
    );
  };
};
