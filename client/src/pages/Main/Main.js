import React, { Component } from "react";
import Modal from "react-modal";
import { firebase, auth } from "../../firebase";
import { themes } from "../../themes/Themes";
import { events } from "../../assets/Events";
import userApi from "../../utils/userApi";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import LoggedOut from "../../components/LoggedOut";
import LoggedIn from "../../components/LoggedIn";
import { defaults } from "../../assets/Defaults";
import { toast } from "react-toastify";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      // props: props,
      loggedin: false,
      pageLoaded: false,
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      userProfilePicture: "",
      userEmailForAccount: "",
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      showForgotPasswordModal: false,
      disableSignInButton: false,
      disableSignUpButton: false,
      disableForgotPasswordSubmitButton: false,
      displayName: "",
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
    Modal.setAppElement("body");
    this.onAuthStateChanged();
    // this.getUserInfoPartial(this.state.props.user.uid);
  };

  /**
   * Set the user information based if the user is logged in
   */
  onAuthStateChanged = () => {
    console.log("here")
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loggedin: true,
          uid: user.uid,
          userEmailForAccount: user.email,
          userAccountCreationTime: user.metadata.creationTime,
          userAccountLastSignIn: user.metadata.lastSignInTime,
          userDisplayName: user.displayName,
          userProfilePicture: user.photoURL,
          showSignInModal: false,
          showSignUpModal: false,
          showForgotPasswordModal: false
        }, () => {
          console.log(this.state.loggedin)
          this.getUserInfoPartial(this.state.uid)
        });
      }
    });
  };

  /**
   * Retrieve the information for the user then load the page
   * 
   * @param userId the unique id from Firebase console
   */
  getUserInfoPartial = userId => {
    if (userId) {
      const userInfo = userApi.getUserInfoPartial(userId);
      const vehicles = userApi.getUserVehicles(userId);
      return Promise.all([userInfo, vehicles])
        .then(([userInfo, vehicles]) =>
          this.setState({
            vehicleData: vehicles.data[0],
            theme: userInfo.data.theme,
            backgroundPicture: userInfo.data.backgroundPicture,
            uid: userId,
            displayName: this.state.displayName === null ? defaults.defaultDisplayName : this.state.user.displayName,
            pageLoaded: true
          }, () => this.renderTheme(themes.determineTheme(this.state.theme, this.state.backgroundPicture)))
        )
        .catch(err => {
          if (this.state.theme === "") {
            this.setState({ refreshCounter: this.state.refreshCounter + 1 });
            if (this.state.refreshCounter <= 10) {
              this.getUserInfoPartial(userId);
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
    const email = this.state.email;
    const event = events.addedNewVehicle;
    userApi.addOneVehicle(creatorId, newVehicle)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        this.addOneVehicleSuccessNotification(newVehicle.year, newVehicle.make, newVehicle.model);
        this.getUserInfoPartial(this.state.uid);
        this.setState({ disableAddVehicleButton: false });
        document.getElementById("addVehicleInputForm").reset();
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
        this.setState({ disableAddVehicleButton: false });
      });
  };

  /**
   * Creates a schema for the user during first time login
   */
  createUserSchema = () => {
    this.requestHideSignUpModal();
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        userApi.createUserSchema(user.uid, user.email)
          .catch(error => this.errorNotification(error));
      }
    });
  };

  /**
   * Handle user authentication when a user signs in
   */
  handleSignIn = e => {
    e.preventDefault();
    this.setState({ disableSignInButton: true });
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.requestHideSignInModal();
        this.setState({ disableSignInButton: false });
      })
      .catch(error => {
        this.setState({ disableSignInButton: false });
        this.errorNotification(error);
      });
  };

  /**
   * Handle user authentication when a user signs up
   */
  handleSignUp = e => {
    e.preventDefault();
    this.setState({ disableSignUpButton: true });
    if (this.state.password === this.state.confirmPassword) {
      auth
        .doCreateUserWithEmailAndPassword(this.state.email, this.state.confirmPassword)
        .then(() => this.createUserSchema())
        .catch(error => {
          this.errorNotification(error);
          this.setState({ disableSignUpButton: false });
        });
    } else {
      this.setState({ disableSignUpButton: false });
      this.errorNotification(defaults.passwordsDoNotMatch);
    }
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = () => {
    auth
      .doSignOut()
      .then(() => window.location = "/")
      .catch(error => this.errorNotification(error));
  };

  /**
   * Show the forgot password modal and close the sign in modal
   */
  handlePasswordReset = e => {
    e.preventDefault();
    this.setState({ disableForgotPasswordSubmitButton: true });
    auth
      .doPasswordReset(this.state.email)
      .then(() => {
        this.successNotification(defaults.passwordConfirmationSent);
        this.setState({
          showForgotPasswordModal: false,
          disableForgotPasswordSubmitButton: false
        });
      }).catch(error => {
        this.setState({ disableForgotPasswordSubmitButton: false });
        this.errorNotification(error);
      });
  };

  /**
   * Show the sign in modal
   */
  requestShowSignInModal = () => {
    if (window.location.href.indexOf("account") > -1) {
      window.location = "/";
    } else {
      this.setState({
        showSignInModal: true,
        showSignUpModal: false,
        email: "",
        password: ""
      });
    }
  };

  /**
   * Show the sign up modal
   */
  requestShowSignUpModal = () => {
    if (window.location.href.indexOf("account") > -1) {
      window.location = "/";
    } else {
      this.setState({
        showSignInModal: false,
        showSignUpModal: true,
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  /**
   * Show the sign out modal
   */
  requestShowSignOutModal = () => {
    this.setState({ showSignOutModal: true });
  };

  /**
   * Show the forgot password modal
   */
  requestShowForgotPasswordModal = () => {
    this.setState({
      showSignInModal: false,
      showForgotPasswordModal: true,
      email: ""
    });
  };

  /**
   * Hide the sign in modal
   */
  requestHideSignInModal = () => {
    this.setState({ showSignInModal: false });
  };

  /**
   * Hide the sign up modal
   */
  requestHideSignUpModal = () => {
    this.setState({ showSignUpModal: false });
  };

  /**
   * Hide the sign out modal
   */
  requestHideSignOutModal = () => {
    this.setState({ showSignOutModal: false });
  };

  /**
   * Hide the forgot password modal
   */
  requestHideForgotPasswordModal = () => {
    this.setState({ showForgotPasswordModal: false });
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
   * Display the success notification when the user performs an action successfully
   * 
   * @param message the message to display to the user
   */
  successNotification = message => {
    toast.success(message);
  };

  /**
   * Display the info notification when the user resets the fields to add a vehicle
   */
  handleResetAddVehicleFields = () => {
    toast.info(defaults.inputFieldsReset);
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
   * Display an error notification when an error occurs
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedin ?
            (
              this.state.pageLoaded ?
                (
                  <Container>
                    <LoggedIn
                      vehicleData={this.state.vehicleData}
                      displayName={this.state.displayName}
                      handleResetAddVehicleFields={this.handleResetAddVehicleFields}
                      checkIfVehicleYearIsValid={this.checkIfVehicleYearIsValid}
                      userProfilePicture={this.state.userProfilePicture}
                      disableAddVehicleButton={this.state.disableAddVehicleButton}
                      currentTheme={this.state.currentTheme}
                      errorMessage={this.state.errorMessage}
                      reloadPage={this.reloadPage}
                      showAddVehicleYearNanErrorModal={this.showAddVehicleYearNanErrorModal}
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
