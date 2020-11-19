import React, { Component } from "react";
import { themes } from "../../themes/Themes";
import { events } from "../../assets/Events";
import userApi from "../../utils/userApi";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import LoggedOut from "../../components/LoggedOut";
import LoggedIn from "../../components/LoggedIn";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      props: props,
      pageLoaded: false,
      vehicleData: [],
      theme: "",
      uid: "",
      currentTheme: "",
      backgroundPicture: "",
      errorMessage: "",
      refreshCounter: 0,
      disableAddVehicleButton: false,
      showAddVehicleYearNanErrorModal: false
    };
  };

  /**
   * Find the user information when the page loads
   */
  componentDidMount() {
    this.findUserInformationForOneUser(this.state.props.user.uid);
  };

  /**
   * Retrieve the information for the user then load the page
   * 
   * @param userId the unique id from Firebase console
   */
  findUserInformationForOneUser = userId => {
    if (userId) {
      userApi.findUserInformationForOneUser(userId)
        .then(res =>
          this.setState({
            vehicleData: res.data,
            theme: res.data.theme,
            backgroundPicture: res.data.backgroundPicture,
            uid: userId,
            pageLoaded: true,
          }, () => {
            this.renderTheme(themes.determineTheme(this.state.theme, this.state.backgroundPicture));
            this.state.props.checkUserDisplayName(this.state.props.user);
          })
        )
        .catch(err => {
          if (this.state.theme === "") {
            this.setState({ refreshCounter: this.state.refreshCounter + 1 });
            if (this.state.refreshCounter <= 10) {
              this.findUserInformationForOneUser(userId);
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
   * Render the theme and background picture
   * 
   * @param theme the theme to render
   */
  renderTheme = theme => {
    this.setState({ currentTheme: theme });
    if (this.state.backgroundPicture) {
      document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
    } else {
      document.body.style.backgroundColor = theme.backgroundColor;
    }
  };

  /**
   * Reload the page
   */
  reloadPage = () => {
    window.location.reload();
  };

  /**
   * Check if the vehicle year is valid before adding it to the database
   * 
   * @param newVehicle the new vehicle data to check
   */
  checkIfVehicleYearIsValid = newVehicle => {
    const date = new Date();
    const futureYear = date.getFullYear() + 2;
    this.setState({ disableAddVehicleButton: true });
    if (
      isNaN(newVehicle.year) ||
      (newVehicle.year < 1885) ||
      (newVehicle.year > futureYear)
    ) {
      this.showAddVehicleYearNanErrorModal();
      this.setState({ disableAddVehicleButton: false });
    } else {
      this.handleAddOneVehicle(newVehicle);
    }
  };

  /**
   * Add the vehicle for the user
   * 
   * @param newVehicle the vehicle data to record
   */
  handleAddOneVehicle = newVehicle => {
    const creatorId = this.state.uid;
    const email = this.state.props.email;
    const event = events.addedNewVehicle;
    userApi.addOneVehicle(creatorId, newVehicle)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.state.props.addOneVehicleSuccessNotification(newVehicle.year, newVehicle.make, newVehicle.model);
        this.findUserInformationForOneUser(this.state.uid);
        this.setState({ disableAddVehicleButton: false });
        document.getElementById("addVehicleInputForm").reset();
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.state.props.errorNotification(err);
        this.setState({ disableAddVehicleButton: false });
      });
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
                      checkIfVehicleYearIsValid={this.checkIfVehicleYearIsValid}
                      userProfilePicture={this.state.props.userProfilePicture}
                      disableAddVehicleButton={this.state.disableAddVehicleButton}
                      currentTheme={this.state.currentTheme}
                      errorMessage={this.state.errorMessage}
                      reloadPage={this.reloadPage}
                      showAddVehicleYearNanErrorModal={this.state.showAddVehicleYearNanErrorModal}
                      hideAddVehicleYearNanErrorModal={this.hideAddVehicleYearNanErrorModal}
                    />
                  </Container>
                ) :
                (
                  <Loading />
                )
            ) :
            (
              <LoggedOut />
            )
        }
      </React.Fragment>
    );
  };
};
