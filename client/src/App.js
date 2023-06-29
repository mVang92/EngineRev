import React, { Component } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { firebase, auth } from "./firebase"
import { ToastContainer, toast } from "react-toastify";
import { NavLoggedIn, NavLoggedOut } from "./components/Nav";
import { themes } from "./themes/Themes";
import { defaults } from "./assets/Defaults";
import { events } from "./assets/Events";
import eventLogHandler from "./utils/EventLogHandler/eventLogHandler";
import userApi from "./utils/userApi";
import displayNameApi from "./utils/displayNameApi";
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
      creatorId: "",
      email: "",
      newEmail: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      confirmNewPassword: "",
      newPassword: "",
      profilePicture: "",
      errorMessage: "",
      currentTheme: "",
      backgroundPicture: "",
      vehicleCount: "",
      newBackgroundPicture: "",
      userAccountCreationTime: "",
      userAccountLastSignIn: "",
      roles: "",
      unableToLoadDatabase: "",
      pageLoaded: false,
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      showForgotPasswordModal: false,
      showUpdateDisplayNameSuccessModal: false,
      disableSignInButton: false,
      disableSignUpButton: false,
      disableForgotPasswordSubmitButton: false,
      disableDoSignOutButton: false,
      disableAddVehicleButton: false,
      disableThemeToggleButton: false,
      disableUpdateEmailButton: false,
      showAddVehicleYearNanErrorModal: false,
      disableUpdateDisplayNameButton: false,
      isUserNewUser: false,
      vehicleData: [],
      defaultProfilePicture: defaults.defaultProfilePicture,
      defaultDisplayName: defaults.defaultDisplayName
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
        console.log(user)
        this.setState({
          user: user,
          loggedin: true,
          creatorId: user._delegate.uid,
          email: user._delegate.email,
          displayName: user._delegate.displayName,
          profilePicture: user._delegate.photoURL,
          userAccountCreationTime: user._delegate.metadata.creationTime,
          userAccountLastSignIn: user._delegate.metadata.lastSignInTime,
          showSignInModal: false,
          showSignUpModal: false,
          showForgotPasswordModal: false
        }, () => {
          if (!user._delegate.photoURL) this.setState({ profilePicture: this.state.defaultProfilePicture });
          if (!user._delegate.displayName) this.setState({ displayName: this.state.defaultDisplayName });
          this.getUserInfoPartial(this.state.creatorId);
          this.getUserDataForAccountPage();
        });
      }
    });
  };

  /**
   * Creates a schema for the user during first time login
   */
  createUserSchema = displayName => {
    this.requestHideSignUpModal();
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const userInformation = {
          creator: user.uid,
          displayName: displayName
        };
        displayNameApi.addOneDisplayName(userInformation)
          .then(() => {
            user.updateProfile({ displayName: displayName })
              .then(() => {
                userApi.createUserSchema(user.uid, user.email, user.displayName)
                  .then(() => this.setState({ isUserNewUser: false }, () => this.getUserInfoPartial(this.state.user._delegate.uid)))
                  .catch(error => this.errorNotification(error));
              })
              .catch(error => this.errorNotification(error));
          })
          .catch(error => this.errorNotification(error));
      }
    });
  };

  getUserInfoPartial = creatorId => {
    if (this.state.isUserNewUser) return;
    userApi.getUserInfoPartial(creatorId)
      .then(userInfo => {
        userApi.getUserVehicles(creatorId)
          .then(vehicles => {
            this.setState({
              vehicleData: vehicles.data[0],
              currentTheme: userInfo.data.theme,
              backgroundPicture: userInfo.data.backgroundPicture,
              creatorId: userInfo.uid,
              displayName: userInfo.data.displayName,
              profilePicture: this.state.user._delegate.photoURL
            }, () => this.renderTheme(themes.determineTheme(this.state.currentTheme, this.state.backgroundPicture)))
          })
          .catch(error => {
            this.loadVehiclesFailNotification(error);
            this.setState({
              pageLoaded: true,
              disableAddVehicleButton: true,
              errorMessage: error.toString()
            })
          })
      })
      .catch(error => {
        this.loadVehiclesFailNotification(error);
        this.setState({
          pageLoaded: true,
          disableAddVehicleButton: true,
          errorMessage: error.toString()
        })
      });
  };

  /**
   * Get data for the user and load the page after data retrieval
   */
  getUserDataForAccountPage = () => {
    const creatorId = this.state.creatorId;
    const vehicleCount = userApi.getVehicleCount(creatorId);
    const email = userApi.getEmail(creatorId);
    const roles = userApi.getRoles(creatorId);
    const theme = userApi.getTheme(creatorId);
    const backgroundPicture = userApi.getBackgroundPicture(creatorId);
    return Promise.all([vehicleCount, email, roles, theme, backgroundPicture])
      .then(([vehicleCount, email, roles, theme, backgroundPicture]) => {
        try {
          this.setState({
            vehicleCount: vehicleCount.data[0].total,
            email: email.data[0].email,
            roles: roles.data[0].roles,
            theme: theme.data[0].theme,
            backgroundPicture: backgroundPicture.data[0].backgroundPicture
          });
        } catch (err) {
          this.setState({
            pageLoaded: true,
            unableToLoadDatabase: true
          }, this.errorNotification(err));
        }
      })
      .catch(err => {
        this.setState({
          loadingError: err,
          pageLoaded: true
        }, this.errorNotification(err));
      });
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
      this.setState({ pageLoaded: true });
    } else {
      document.body.style.backgroundColor = theme.backgroundColor;
      this.setState({ pageLoaded: true });
    }
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
        this.setState({
          disableSignInButton: false,
          isUserNewUser: false
        });
      })
      .catch(error => {
        this.setState({
          disableSignInButton: false,
          isUserNewUser: false
        });
        this.errorNotification(error);
      });
  };

  /**
   * Handle user authentication when a user signs up
   */
  handleSignUp = e => {
    e.preventDefault();
    const displayName = this.state.displayName;
    this.setState({ disableSignUpButton: true });
    if (this.state.password !== this.state.confirmPassword) {
      this.warningNotification(defaults.passwordsDoNotMatch);
      this.setState({ disableSignUpButton: false });
      return;
    }
    if (this.checkIfStringIsBlank(displayName)) {
      this.warningNotification(defaults.displayNameLengthNotMet);
      this.setState({ disableSignUpButton: false });
      return;
    }
    if (!this.checkIfStringIsBlank(displayName) && displayName.length < 6) {
      this.warningNotification(defaults.displayNameLengthNotMet);
      this.setState({ disableSignUpButton: false });
      return;
    }
    this.setState({ isUserNewUser: true });
    displayNameApi.getDisplayNames()
      .then(results => {
        const displayNameList = results.data.find(user => user.displayName === displayName);
        if (displayNameList) {
          this.warningNotification(defaults.displayNameAlreadyExists);
          this.setState({ disableSignUpButton: false });
        } else {
          this.createUserWithUserInformation(displayName);
        }
      })
      .catch(err => {
        this.setState({ disableSignUpButton: false });
        this.errorNotification(err)
      });
  };

  /**
   * Create the user account using email, password, and display name
   */
  createUserWithUserInformation = displayName => {
    auth
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.confirmPassword)
      .then(() => this.createUserSchema(displayName))
      .catch(error => {
        this.warningNotification(error);
        this.setState({ disableSignUpButton: false });
      });
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
 * Add the vehicle for the user
 * 
 * @param newVehicle the vehicle data to record
 */
  handleAddOneVehicle = newVehicle => {
    const creatorId = this.state.user._delegate.uid;
    const email = this.state.user._delegate.email;
    const event = events.addedNewVehicle;
    userApi.addOneVehicle(creatorId, newVehicle)
      .then(() => {
        this.getUserInfoPartial(creatorId);
        eventLogHandler.successful(creatorId, email, event);
        this.addOneVehicleSuccessNotification(newVehicle.year, newVehicle.make, newVehicle.model);
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
      this.requestShowAddVehicleYearNanErrorModal();
      this.setState({ disableAddVehicleButton: false });
    } else {
      this.handleAddOneVehicle(newVehicle);
    }
  };

  /**
 * Display the modal to notify the user the vehicle year must be a number
 */
  requestShowAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: true });
  };

  /**
   * Hide the modal to notify the user the vehicle year must be a number
   */
  requestHideAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: false });
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
        displayName: "",
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
    toast.error(`Loading Vehicles Error: ${err.toString()}`);
  };

  /**
   * Display an error notification when an error occurs
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the warning notification when a warning occurs
   * 
   * @param err the error message to display to the user
   */
  warningNotification = err => {
    toast.warn(err.toString());
  };

  /**
  * Check if the user input value is blank
  * 
  * @param string the user input to check against
  */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
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
                  profilePicture={this.state.profilePicture}
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
                        pageLoaded={this.state.pageLoaded}
                        vehicleData={this.state.vehicleData}
                        profilePicture={this.state.profilePicture}
                        onAuthStateChanged={this.onAuthStateChanged}
                        handleResetAddVehicleFields={this.handleResetAddVehicleFields}
                        displayName={this.state.displayName}
                        checkIfVehicleYearIsValid={this.checkIfVehicleYearIsValid}
                        currentTheme={this.state.currentTheme}
                        disableAddVehicleButton={this.state.disableAddVehicleButton}
                        errorMessage={this.state.errorMessage}
                        reloadPage={this.reloadPage}
                        requestShowAddVehicleYearNanErrorModal={this.requestShowAddVehicleYearNanErrorModal}
                        requestHideAddVehicleYearNanErrorModal={this.requestHideAddVehicleYearNanErrorModal}
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
            <Route
              path="/account"
              element={
                <Account
                  handleChange={this.handleChange}
                  loggedin={this.state.loggedin}
                  pageLoaded={this.state.pageLoaded}
                  pleaseWait={this.state.pleaseWait}
                  currentTheme={this.state.currentTheme}
                  profilePicture={this.state.profilePicture}
                  email={this.state.email}
                  displayName={this.state.displayName}
                  errorMessage={this.state.errorMessage}
                  vehicleCount={this.state.vehicleCount}
                  newBackgroundPicture={this.state.newBackgroundPicture}
                  userAccountCreationTime={this.userAccountCreationTime}
                  userAccountLastSignIn={this.state.userAccountLastSignIn}
                  updateDisplayName={this.updateDisplayName}
                  canUserUpdateEmail={this.canUserUpdateEmail}
                  canUserUpdatePassword={this.canUserUpdatePassword}
                  newEmail={this.state.newEmail}
                  newPassword={this.state.newPassword}
                  confirmNewPassword={this.state.confirmNewPassword}
                  downloadEventLogCsvFile={this.downloadEventLogCsvFile}
                  backToTopOfPage={this.backToTopOfPage}
                  showUpdateBackgroundPictureModal={this.showUpdateBackgroundPictureModal}
                  showUpdateProfilePictureModal={this.showUpdateProfilePictureModal}
                  saveThemeForUser={this.saveThemeForUser}
                  roles={this.state.roles}
                  disableThemeToggleButton={this.state.disableThemeToggleButton}
                  theme={this.state.theme}
                  unableToLoadDatabase={this.state.unableToLoadDatabase}
                  resetInputFields={this.resetInputFields}
                  disableUpdateEmailButton={this.state.disableUpdateEmailButton}
                  disableUpdateDisplayNameButton={this.state.disableUpdateDisplayNameButton}
                  updateBackgroundPicture={this.updateBackgroundPicture}
                  hideUpdateBackgroundPictureModal={this.hideUpdateBackgroundPictureModal}
                  checkIfStringIsBlank={this.checkIfStringIsBlank}
                  updateProfilePicture={this.updateProfilePicture}
                  showUpdateProfilePictureSuccessModal={this.showUpdateProfilePictureSuccessModal}
                  hideUpdateProfilePictureSuccessModal={this.hideUpdateProfilePictureSuccessModal}
                  hideUpdateProfilePictureModal={this.hideUpdateProfilePictureModal}
                  showUpdateDisplayNameSuccessModal={this.state.showUpdateDisplayNameSuccessModal}
                  hideUpdateDisplayNameSuccessModal={this.hideUpdateDisplayNameSuccessModal}
                />
              }
            />
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
