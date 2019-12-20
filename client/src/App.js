import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";
import Main from "./pages/Main";
import Log from "./pages/Log";
import MyAccount from "./pages/MyAccount";
import NoMatch from "./pages/NoMatch";
import "./css/style.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/vehicle/:id" component={Log} />
            {/* <Route exact path="/vehicle/MyAccount/:id" component={MyAccount} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  };
};
