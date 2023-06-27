import React, { Component } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { firebase, auth } from "./firebase"
import { ToastContainer, toast } from "react-toastify";
import { NavLoggedIn, NavLoggedOut } from "./components/Nav";
import { defaults } from "./assets/Defaults";
import userApi from "./utils/userApi";
import Main from "./pages/Main";
import Log from "./pages/Log";
import Forum from "./pages/Forum";
import Thread from "./pages/Thread";
import Account from "./pages/Account";
import About from "./pages/About";
import Updates from "./pages/Updates";
import NoMatch from "./pages/NoMatch";
import SignUpModal from "./components/Modal/SignUpModal";
import SignInModal from "./components/Modal/SignInModal";
import SignOutModal from "./components/Modal/SignOutModal";
import ForgotPasswordModal from "./components/Modal/ForgotPasswordModal";
import LoggedOut from "./components/LoggedOut";
import "react-toastify/dist/ReactToastify.css";
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
      userEmailForAccount: "",
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      showForgotPasswordModal: false,
      disableSignInButton: false,
      disableSignUpButton: false,
      disableForgotPasswordSubmitButton: false,
      disableDoSignOutButton: false
    };
  };

  /**
   * Check if the user is logged in
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
   * Set the user information based if the user is logged in
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
          showSignUpModal: false,
          showForgotPasswordModal: false
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
        user.updateProfile({ displayName: defaults.defaultDisplayName })
          .then(() => {
            userApi.createUserSchema(user.uid, user.email, user.displayName)
              .catch(error => this.errorNotification(error));
          })
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
    this.setState({ disableDoSignOutButton: true });
    auth
      .doSignOut()
      .then(() => window.location = "/")
      .catch(error => {
        this.setState({ disableDoSignOutButton: false });
        this.errorNotification(error);
      });
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
      <Router>
        <React.Fragment>
          {
            this.state.loggedin ?
              (
                <NavLoggedIn
                  loggedin={this.state.loggedin}
                  userProfilePicture={this.state.userProfilePicture}
                  requestShowSignOutModal={this.requestShowSignOutModal}
                  showSignOutModal={this.state.showSignOutModal}
                  requestHideSignOutModal={this.requestHideSignOutModal}
                  handleSignOut={this.handleSignOut}
                />
              ) :
              (
                <NavLoggedOut
                  requestShowSignInModal={this.requestShowSignInModal}
                  requestShowSignUpModal={this.requestShowSignUpModal}
                />
              )
          }
          <Routes>
            {
              <Route
                path="/"
                element={
                  this.state.user ?
                    (
                      <Main
                        user={this.state.user}
                        email={this.state.userEmailForAccount}
                        loggedin={this.state.loggedin}
                        userProfilePicture={this.state.userProfilePicture}
                        onAuthStateChanged={this.onAuthStateChanged}
                        handleResetAddVehicleFields={this.handleResetAddVehicleFields}
                        errorNotification={this.errorNotification}
                        addOneVehicleSuccessNotification={this.addOneVehicleSuccessNotification}
                        loadVehiclesFailNotification={this.loadVehiclesFailNotification}
                      />

                    ) :
                    (
                      <LoggedOut />
                    )
                }
              />
            }
            <Route path="/vehicle/:vehicleId" element={<Log />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/thread/:threadId" element={<Thread />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<Updates />} />
            <Route element={<NoMatch />} />
          </Routes>
          <SignInModal
            showSignInModal={this.state.showSignInModal}
            requestShowSignUpModal={this.requestShowSignUpModal}
            requestHideSignInModal={this.requestHideSignInModal}
            handleSignIn={this.handleSignIn}
            requestShowForgotPasswordModal={this.requestShowForgotPasswordModal}
            disableSignInButton={this.state.disableSignInButton}
            handleChange={this.handleChange}
          />
          <SignUpModal
            showSignUpModal={this.state.showSignUpModal}
            requestShowSignInModal={this.requestShowSignInModal}
            requestHideSignUpModal={this.requestHideSignUpModal}
            handleSignUp={this.handleSignUp}
            disableSignUpButton={this.state.disableSignUpButton}
            handleChange={this.handleChange}
          />
          <SignOutModal
            showSignOutModal={this.state.showSignOutModal}
            disableDoSignOutButton={this.state.disableDoSignOutButton}
            requestHideSignOutModal={this.requestHideSignOutModal}
            handleSignOut={this.handleSignOut}
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
