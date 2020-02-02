import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Log from "./pages/Log";
import Account from "./pages/Account";
import About from "./pages/About";
import Updates from "./pages/Updates";
import NoMatch from "./pages/NoMatch";
import "./css/mainStyle.css";
import "./css/themesStyle.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/account/:id/vehicle/:id" component={Log} />
            <Route exact path="/account/:id" component={Account} />
            <Route exact path="/about" component={About} />
            <Route exact path="/updates" component={Updates} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    )
  };
};
