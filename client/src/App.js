import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";
import Main from "./pages/Main";
import Log from "./pages/Log";
import Account from "./pages/Account";
import NoMatch from "./pages/NoMatch";
import "./css/style.css";

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
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  };
};
