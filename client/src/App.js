import React, { Component } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { firebase, auth } from "./firebase"
import { ToastContainer, toast } from "react-toastify";
import { NavLoggedIn, NavLoggedOut } from "./components/Nav";
import API from "./utils/API";
import Main from "./pages/Main";
import Log from "./pages/Log";
import Account from "./pages/Account";
import About from "./pages/About";
import Updates from "./pages/Updates";
import NoMatch from "./pages/NoMatch";
import SignUpModal from "./components/Modal/SignUpModal";
import SignInModal from "./components/Modal/SignInModal";
import ForgotPasswordModal from "./components/Modal/ForgotPasswordModal";
import "./css/mainStyle.css";
import "./css/themesStyle.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      userProfilePicture: "",
      errorMessage: "",
      userEmailForAccount: "",
      userAccountCreationTime: "",
      userAccountLastSignIn: "",
      userDisplayName: "",
      defaultDisplayName: "CarSpace User",
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      showForgotPasswordModal: false,
      disableSignInButton: false,
      disableSignUpButton: false,
      disableForgotPasswordSubmitButton: false
    };
  };

  /**
   * Logs the user in if they are logged in
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    this.onAuthStateChanged();
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Upon page refresh, if the user is logged in, they will stay logged in
   */
  onAuthStateChanged = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loggedin: true,
          userId: user.uid,
          userEmailForAccount: user.email,
          userAccountCreationTime: user.metadata.creationTime,
          userAccountLastSignIn: user.metadata.lastSignInTime,
          userDisplayName: user.displayName,
          userProfilePicture: user.photoURL,
          showSignInModal: false,
          showSignUpModal: false
        });
      }
    });
  };

  /**
   * Creates a schema for the user during first time login
   */
  createUserSchema = () => {
    this.requestHideSignUpModal();
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        API.createUserSchema(user.uid, user.email)
          .catch(error => this.errorNotification(error));
      }
    });
  };

  /**
   * Check if user display name exists
   * 
   * @param user The current user information
   */
  checkUserDisplayName = user => {
    let displayName = user.displayName;
    if (displayName) {
      this.showDisplayName(displayName);
    } else {
      this.showDisplayName(this.state.defaultDisplayName);
    }
  };

  /**
   * Show the display name to the main page
   */
  showDisplayName = displayName => {
    let displayNameToShow = document.createTextNode(displayName);
    document.getElementById("displayName").innerHTML = "";
    document.getElementById("displayName").appendChild(displayNameToShow);
  };

  /**
   * Show the forgot password modal
   */
  showForgotPasswordModal = () => {
    this.setState({
      showSignInModal: false,
      showForgotPasswordModal: true,
      email: ""
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
      const error = "Error: Passwords do not match."
      this.setState({ disableSignUpButton: false });
      this.errorNotification(error);
    }
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = e => {
    e.preventDefault();
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
        this.sendPasswordResetEmailConfirmationSuccessNotification();
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
  showSignInModal = () => {
    this.setState({
      showSignInModal: true,
      showSignUpModal: false,
      email: "",
      password: ""
    });
    if (window.location.href.indexOf("account") > -1) {
      window.location = "/";
    }
  };

  /**
   * Show the sign up modal
   */
  showSignUpModal = () => {
    this.setState({
      showSignUpModal: true,
      showSignInModal: false,
      email: "",
      password: "",
      confirmPassword: ""
    });
    if (window.location.href.indexOf("account") > -1) {
      window.location.assign(this.state.originUrl);
    }
  };

  /**
   * Show the sign out modal
   */
  requestShowSignOutModal = () => {
    this.setState({ showSignOutModal: true });
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
   * Display the success notification when the password confirmation email sends
   */
  sendPasswordResetEmailConfirmationSuccessNotification = () => {
    toast.success(`Password confirmation sent. Please check your email.`);
  };

  /**
   * Display the info notification when the user resets the fields to add a vehicle
   */
  handleResetAddVehicleFields = () => {
    toast.info(`Input Fields Reset.`);
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
      <Router>
        <React.Fragment>
          {
            this.state.loggedin ?
              (
                <NavLoggedIn
                  loggedin={this.state.loggedin}
                  userEmailForAccount={this.state.userEmailForAccount}
                  userAccountCreationTime={this.state.userAccountCreationTime}
                  userAccountLastSignIn={this.state.userAccountLastSignIn}
                  userDisplayName={this.state.userDisplayName}
                  userProfilePicture={this.state.userProfilePicture}
                  userId={this.state.userId}
                  requestShowSignOutModal={this.requestShowSignOutModal}
                  showSignOutModal={this.state.showSignOutModal}
                  requestHideSignOutModal={this.requestHideSignOutModal}
                  handleSignOut={this.handleSignOut}
                />
              ) : (
                <NavLoggedOut
                  showSignInModal={this.showSignInModal}
                  showSignUpModal={this.showSignUpModal}
                />
              )
          }
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Main
                  user={this.state.user}
                  loggedin={this.state.loggedin}
                  userProfilePicture={this.state.userProfilePicture}
                  errorMessage={this.state.errorMessage}
                  checkUserDisplayName={this.checkUserDisplayName}
                  onAuthStateChanged={this.onAuthStateChanged}
                  handleResetAddVehicleFields={this.handleResetAddVehicleFields}
                  errorNotification={this.errorNotification}
                  addOneVehicleSuccessNotification={this.addOneVehicleSuccessNotification}
                  loadVehiclesFailNotification={this.loadVehiclesFailNotification}
                />
              )}
            />
            <Route exact path="/account/:id/vehicle/:id" component={Log} />
            <Route exact path="/account/:id" component={Account} />
            <Route exact path="/about" component={About} />
            <Route exact path="/updates" component={Updates} />
            <Route component={NoMatch} />
          </Switch>
          <SignInModal
            showSignInModal={this.state.showSignInModal}
            requestHideSignInModal={this.requestHideSignInModal}
            handleSignIn={this.handleSignIn}
            showForgotPasswordModal={this.showForgotPasswordModal}
            disableSignInButton={this.state.disableSignInButton}
            handleChange={this.handleChange}
          />
          <SignUpModal
            showSignUpModal={this.state.showSignUpModal}
            requestHideSignUpModal={this.requestHideSignUpModal}
            handleSignUp={this.handleSignUp}
            disableSignUpButton={this.state.disableSignUpButton}
            handleChange={this.handleChange}
          />
          <ForgotPasswordModal
            showForgotPasswordModal={this.state.showForgotPasswordModal}
            requestHideForgotPasswordModal={this.requestHideForgotPasswordModal}
            handlePasswordReset={this.handlePasswordReset}
            disableForgotPasswordSubmitButton={this.state.disableForgotPasswordSubmitButton}
            handleChange={this.handleChange}
          />
          <ToastContainer />
        </React.Fragment>
      </Router>
    );
  };
};
