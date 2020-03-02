import React, { Component } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { firebase } from "./firebase";
import { Nav } from "./components/Nav";
import Main from "./pages/Main";
import Log from "./pages/Log";
import Account from "./pages/Account";
import About from "./pages/About";
import Updates from "./pages/Updates";
import NoMatch from "./pages/NoMatch";
import "./css/mainStyle.css";
import "./css/themesStyle.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      user: "",
      userProfilePicture: "",
      errorMessage: "",
      defaultDisplayName: "CarSpace User"
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
          userProfilePicture: user.photoURL
        });
      };
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

  render() {
    return (
      <Router>
        <React.Fragment>
          <Nav />
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
                />
              )}
            />
            <Route exact path="/account/:id/vehicle/:id" component={Log} />
            <Route exact path="/account/:id" component={Account} />
            <Route exact path="/about" component={About} />
            <Route exact path="/updates" component={Updates} />
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  };
};
