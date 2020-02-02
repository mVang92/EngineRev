import React from "react";
import MyVehicles from "../MyVehicles";
import AddVehicle from "../AddVehicle";

const LoggedIn = props => {

  return (
    <div className={`box ${props.currentTheme.background}`}>
      <AddVehicle
        handleResetAddVehicleFields={props.handleResetAddVehicleFields}
        handleChange={props.handleChange}
        addVehicle={props.addVehicle}
        userProfilePicture={props.userProfilePicture}
        disableAddVehicleButton={props.disableAddVehicleButton}
        currentTheme={props.currentTheme}
      />
      <hr className={props.currentTheme.hr}/>
      <MyVehicles
        vehicleData={props.vehicleData}
        vehicleCountForUser={props.vehicleCountForUser}
        currentTheme={props.currentTheme}
        errorMessage={props.errorMessage}
        backgroundColor={props.backgroundColor}
      />
    </div>
  );
};

export default LoggedIn;
