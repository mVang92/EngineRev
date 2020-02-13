import React, { Component } from 'react';
import { NavLoggedIn, NavLoggedOut } from "../Nav";
import SignInModal from "../Modal/SignInModal";
import SignUpModal from "../Modal/SignUpModal";
import SignOutModal from "../Modal/SignOutModal";
import ForgotPasswordModal from "../Modal/ForgotPasswordModal";
import { firebase, auth } from "../../firebase"
import { toast } from "react-toastify";
import API from "../../utils/API";


export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      defaultProfilePicture: "https://image.flaticon.com/icons/png/512/64/64572.png",
      defaultDisplayName: "CarSpace User",
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      showForgotPasswordModal: false,
      originUrl: "",
      userId: "",
      email: "",
      password: "",
      confirmPassword: "",
      userEmailForAccount: "",
      userAccountCreationTime: "",
      userAccountLastSignIn: "",
      userDisplayName: "",
      userPhotoUrl: ""
    };
  };

  /**
   * Checks to see if the user is logged in
   */
  componentDidMount = () => {
    const originUrl = window.location.origin;
    this.setState({ originUrl: originUrl });
    this.isUserLoggedIn();
  };

  /**
   * Checks to see if the user is logged in and authenticated
   */
  isUserLoggedIn = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedin: true,
          userId: user.uid,
          userEmailForAccount: user.email,
          userAccountCreationTime: user.metadata.creationTime,
          userAccountLastSignIn: user.metadata.lastSignInTime,
          userDisplayName: user.displayName,
          userPhotoUrl: user.photoURL
        });
        if (!user.photoURL) {
          this.setState({ userPhotoUrl: this.state.defaultProfilePicture });
        };
        if (!user.displayName) {
          this.setState({ userDisplayName: this.state.defaultDisplayName });
        };
      };
    });
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Creates a schema for the user during first time login
   */
  createUserSchema = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        API.createUserSchema(user.uid, user.email)
          .then(() => this.isUserLoggedIn())
          .catch(error => this.errorNotification(error));
      };
    });
  };

  /**
   * Handle user authentication when a user signs in
   */
  handleSignIn = e => {
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.isUserLoggedIn();
        this.hideSignInModal();
      })
      .catch(error => this.errorNotification(error));
  };

  /**
   * Handle user authentication when a user signs up
   */
  handleSignUp = e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      auth
        .doCreateUserWithEmailAndPassword(this.state.email, this.state.confirmPassword)
        .then(() => {
          this.createUserSchema();
          setTimeout(() => {
            this.hideSignUpModal();
          }, 10);
        })
        .catch(error => this.errorNotification(error));
    } else {
      const error = "Error: Passwords do not match."
      this.errorNotification(error);
    };
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = e => {
    e.preventDefault();
    auth
      .doSignOut()
      .then(() => {
        this.setState({ userEmailForAccount: "" });
        window.location.assign(this.state.originUrl);
      });
  };

  /**
   * Show the forgot password modal and close the sign in modal
   */
  handlePasswordReset = e => {
    e.preventDefault();
    auth
      .doPasswordReset(this.state.email)
      .then(() => {
        this.sendPasswordResetEmailConfirmationSuccessNotification();
        this.setState({ showForgotPasswordModal: false });
      }).catch(error => {
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
    if (window.location.href !== (this.state.originUrl + "/")) {
      window.location.assign(this.state.originUrl);
    };
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
    if (window.location.href !== (this.state.originUrl + "/")) {
      window.location.assign(this.state.originUrl);
    };
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
   * Show the sign out modal
   */
  showSignOutModal = () => {
    this.setState({ showSignOutModal: true });
  };

  /**
   * Hide the sign in modal
   */
  hideSignInModal = () => {
    this.setState({ showSignInModal: false });
  };

  /**
   * Hide the sign up modal
   */
  hideSignUpModal = () => {
    this.setState({ showSignUpModal: false });
  };

  /**
   * Hide the sign out modal
   */
  hideSignOutModal = () => {
    this.setState({ showSignOutModal: false });
  };

  /**
   * Hide the forgot password modal
   */
  hideForgotPasswordModal = () => {
    this.setState({ showForgotPasswordModal: false });
  };

  /**
   * Display the success notification when the password confirmation email sends
   */
  sendPasswordResetEmailConfirmationSuccessNotification = () => {
    toast.success(`Password confirmation sent. Please check your email.`);
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
              <NavLoggedIn
                state={this.state}
                showSignOutModal={this.showSignOutModal}
              />
            ) : (
              <NavLoggedOut
                state={this.state}
                showSignUpModal={this.showSignUpModal}
                showSignInModal={this.showSignInModal}
              />
            )
        }
        <SignInModal
          showSignInModal={this.state.showSignInModal}
          hideSignInModal={this.hideSignInModal}
          handleSignIn={this.handleSignIn}
          showForgotPasswordModal={this.showForgotPasswordModal}
          handleChange={this.handleChange}
        />
        <SignUpModal
          showSignUpModal={this.state.showSignUpModal}
          hideSignUpModal={this.hideSignUpModal}
          handleSignUp={this.handleSignUp}
          handleChange={this.handleChange}
        />
        <SignOutModal
          showSignOutModal={this.state.showSignOutModal}
          hideSignOutModal={this.hideSignOutModal}
          handleSignOut={this.handleSignOut}
        />
        <ForgotPasswordModal
          showForgotPasswordModal={this.state.showForgotPasswordModal}
          hideForgotPasswordModal={this.hideForgotPasswordModal}
          handlePasswordReset={this.handlePasswordReset}
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  };
};
