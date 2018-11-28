import React, { Component } from "react";
import MyVehicles from "../MyVehicles";
import AddVehicle from "../AddVehicle";

class LoggedIn extends Component {
  render() {
    
    return (
      <div className="loggedIn rounded">
        <MyVehicles
          vehicles={this.props.vehicles}
        />
        <hr></hr>
        <AddVehicle
          vehicles={this.props.vehicles}
          handleChange={this.props.handleChange}
          // Pass states from AddVehicle component using props to App.js
          addVehicle={this.props.addVehicle}
        />
      </div>
    );
  };
};
export default LoggedIn;
