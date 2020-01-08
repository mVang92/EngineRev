import React from "react";
import MyVehicles from "../MyVehicles";
import AddVehicle from "../AddVehicle";

const LoggedIn = props => {
  return (
    <div className="box">
      <AddVehicle
        handleResetAddVehicleFields={props.handleResetAddVehicleFields}
        handleChange={props.handleChange}
        addVehicle={props.addVehicle}
        userProfilePicture={props.userProfilePicture}
      />
      <hr />
      <MyVehicles
        vehicleData={props.vehicleData}
        vehicleCountForUser={props.vehicleCountForUser}
        actualEmailFromFirebase={props.actualEmailFromFirebase}
      />
    </div>
  );
};

export default LoggedIn;
