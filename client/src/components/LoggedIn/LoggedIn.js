import React from "react";
import MyVehicles from "../MyVehicles";
import AddVehicle from "../AddVehicle";

const LoggedIn = props => {
  return (
    <div className="box">
      <AddVehicle
        vehicles={props.vehicles}
        handleChange={props.handleChange}
        // Pass states from AddVehicle component using props to Main.js
        addVehicle={props.addVehicle}
      />
      <hr />
      <MyVehicles
        // Because this does not extend Component, this.props.vehicles becomes
        // only props.vehicles. Same with everything else.
        vehicles={props.vehicles}
        // Pass this deleteVehicle function to Main.js
        deleteVehicle={props.deleteVehicle}
      />
    </div>
  );
};

export default LoggedIn;
