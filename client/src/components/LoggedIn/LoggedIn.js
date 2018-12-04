import React from "react";
import MyVehicles from "../MyVehicles";
import AddVehicle from "../AddVehicle";

const LoggedIn = props => {
  return (
    <div className="loggedIn rounded">
      <MyVehicles
        // Because this does not extend Component, this.props.vehicles becomes
        // only props.vehicles. Same with everything else.
        vehicles={props.vehicles}
        // Pass this deleteVehicle function to App.js
        deleteVehicle={props.deleteVehicle}
      />
      <hr></hr>
      <AddVehicle
        vehicles={props.vehicles}
        handleChange={props.handleChange}
        handleReset={props.handleReset}
        // Pass states from AddVehicle component using props to App.js
        addVehicle={props.addVehicle}
      />
    </div>
  );
};

export default LoggedIn;
