import React, { Component } from 'react';
import { NavLoggedIn, NavLoggedOut } from "../Nav";
import SignInModal from "../Modal/SignInModal";
import SignUpModal from "../Modal/SignUpModal";
import SignOutModal from "../Modal/SignOutModal";
import { firebase, auth } from "../../firebase"
import API from "../../utils/API";
import "../../css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      email: "",
      password: "",
      confirmPassword: ""
    };
  };

  /**
   * Checks to see if the user is logged in
   */
  componentWillMount = () => {
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
    const bindThis = this;
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        API.createUserSchema(user.uid)
          .then(() => bindThis.componentWillMount());
      };
    });
  };

  /**
   * Handle user authentication when a user signs in
   */
  handleSignIn = e => {
    console.log("password " + this.state.password)
    console.log("email: " + this.state.email)
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          loggedin: true,
          email: "",
          password: "",
          confirmPassword: ""
        });
        this.hideSignInModal();
        this.setState({ loggedin: true });
      })
      .catch(error => {
        try {
          this.loginFailNotification(error);
        } catch (e) {
          return null;
        };
      });
  };

  /**
   * Handle user authentication when a user signs up
   */
  handleSignUp = e => {
    e.preventDefault();
    console.log("password " + this.state.password)
    console.log("email: " + this.state.email)
    if (this.state.password === this.state.confirmPassword) {
      auth
        .doCreateUserWithEmailAndPassword(this.state.email, this.state.confirmPassword)
        .then(() => {
          this.setState({
            loggedin: true,
            email: "",
            password: "",
            confirmPassword: ""
          });
          this.createUserSchema();
          this.hideSignUpModal();
        })
        .catch(error => {
          try {
            this.loginFailNotification(error);
          } catch (e) {
            return null;
          };
        });
    } else {
      this.setState({
        email: "",
        password: "",
        confirmPassword: ""
      });
      const error = "Error: Passwords do not match."
      this.loginFailNotification(error);
    };
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = e => {
    e.preventDefault();
    const originUrl = window.location.origin;
    auth
      .doSignOut()
      .then(() => {
        window.location.assign(originUrl);
        this.setState({
          loggedin: false,
          email: "",
          password: "",
          confirmPassword: ""
        });
      });
  };

  /**
   * Show the sign in modal
   */
  handleSignInModal = () => {
    this.setState({ showSignInModal: true });
  };

  /**
   * Hide the sign in modal
   */
  hideSignInModal = () => {
    this.setState({
      showSignInModal: false,
      email: "",
      password: ""
    });
  };

  /**
   * Show the sign up modal
   */
  handleSignUpModal = () => {
    this.setState({ showSignUpModal: true });
  };

  /**
   * Hide the sign up modal
   */
  hideSignUpModal = () => {
    this.setState({
      showSignUpModal: false,
      email: "",
      password: ""
    });
  };

  /**
   * Show the sign out modal
   */
  handleSignOutModal = () => {
    this.setState({ showSignOutModal: true });
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
        <a className="navbar-brand underline" href="/">CarSpace</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          {this.state.loggedin === true ? (
            <React.Fragment>
              <ul className="navbar-nav">
                <NavLoggedIn
                  state={this.state}
                  handleSignOutModal={this.handleSignOutModal}
                />
              </ul>
            </React.Fragment>
          ) : (
              <ul className="navbar-nav">
                <NavLoggedOut
                  state={this.state}
                  handleSignUpModal={this.handleSignUpModal}
                  handleSignInModal={this.handleSignInModal}
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
    )
  }
};
