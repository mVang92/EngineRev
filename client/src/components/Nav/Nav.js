import React, { Component } from 'react';
import { NavLoggedIn, NavLoggedOut } from "../Nav";
import SignInModal from "../Modal/SignInModal";
import SignUpModal from "../Modal/SignUpModal";
import SignOutModal from "../Modal/SignOutModal";
import { firebase, auth } from "../../firebase"
import API from "../../utils/API";
import "../../css/style.css";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      showSignInModal: false,
      showSignUpModal: false,
      showSignOutModal: false,
      message: "",
      email: "",
      password: ""
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
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          loggedin: true,
          message: ""
        });
        this.hideSignInModal();
        this.setState({ loggedin: true });
      })
      .catch(error => {
        try {
          this.setState({ message: error.message })
          const message = document.createTextNode(this.state.message);
          document.getElementById("error").innerHTML = "";
          document.getElementById("error").appendChild(message);
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
    auth
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          loggedin: true,
          message: ""
        });
        this.createUserSchema();
        this.hideSignUpModal();
        this.setState({ loggedin: false });
      })
      .catch(error => {
        try {
          this.setState({ message: error.message })
          const message = document.createTextNode(this.state.message);
          document.getElementById("error").innerHTML = "";
          document.getElementById("error").appendChild(message);
        } catch (e) {
          return null;
        };
      });
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = e => {
    e.preventDefault();
    const originUrl = window.location.origin;
    window.location.assign(originUrl);
    auth
      .doSignOut()
      .then(() => {
        this.setState({
          loggedin: false,
          email: "",
          password: ""
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
    this.setState({ showSignInModal: false });
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
    this.setState({ showSignUpModal: false });
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
