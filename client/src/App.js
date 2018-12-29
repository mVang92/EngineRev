import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Log from "./pages/Log";
import NoMatch from "./pages/NoMatch";

class App extends Component {
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

export default App;
