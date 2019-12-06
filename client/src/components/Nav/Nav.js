import React, { Component } from 'react';
import { NavLoggedIn, NavLoggedOut } from "../Nav";
import SignInModal from "../Modal/SignInModal";
import SignUpModal from "../Modal/SignUpModal";
import SignOutModal from "../Modal/SignOutModal";
import { firebase, auth } from "../../firebase"
import { toast } from "react-toastify";
import carSpaceLogo from "../../images/carSpaceLogo.png";
import API from "../../utils/API";


export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      originUrl: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  };

  /**
   * Checks to see if the user is logged in
   */
  componentWillMount = () => {
    const originUrl = window.location.origin;
    this.setState({ originUrl: originUrl })
    this.isUserLoggedIn();
  };

  /**
   * Checks to see if the user is logged in and authenticated
   */
  isUserLoggedIn = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedin: true });
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
   * Creates a schema for the user  during first time login
   */
  createUserSchema = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        API.createUserSchema(user.uid)
          .then(() => this.isUserLoggedIn());
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
      .catch(error => this.loginFailNotification(error));
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
        .catch(error => this.loginFailNotification(error));
    } else {
      const error = "Error: Passwords do not match."
      this.loginFailNotification(error);
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
        window.location.assign(this.state.originUrl);
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
   * Display an error notification when there is an error during login
   * 
   * @param err the error message to display to the user
   */
  loginFailNotification = err => {
    toast.error(err.toString());
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg sticky-top">
        <a className="navbar-brand underline" href="/">
          <img id="applicationLogo" src={carSpaceLogo}></img>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          {this.state.loggedin === true ? (
            <React.Fragment>
              <ul className="navbar-nav">
                <NavLoggedIn
                  state={this.state}
                  showSignOutModal={this.showSignOutModal}
                />
              </ul>
            </React.Fragment>
          ) : (
              <ul className="navbar-nav">
                <NavLoggedOut
                  state={this.state}
                  showSignUpModal={this.showSignUpModal}
                  showSignInModal={this.showSignInModal}
                />
              </ul>
            )
          }
        </div>
        <SignInModal
          showSignInModal={this.state.showSignInModal}
          hideSignInModal={this.hideSignInModal}
          handleSignIn={this.handleSignIn}
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
      </nav>
    );
  };
};
