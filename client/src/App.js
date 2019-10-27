import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Log from "./pages/Log";
import NoMatch from "./pages/NoMatch";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/vehicle" component={Main} />
          <Route exact path="/vehicle/:id" component={Log} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    )
  };
};
