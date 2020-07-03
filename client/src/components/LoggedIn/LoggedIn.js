import React from "react";
import MyVehicles from "../MyVehicles";
import AddVehicle from "../AddVehicle";
import AddVehicleYearNanErrorModal from "../../components/Modal/AddVehicleYearNanErrorModal";

const LoggedIn = props => {
  return (
    <div className={`box ${props.currentTheme.background}`}>
      <AddVehicle
        handleResetAddVehicleFields={props.handleResetAddVehicleFields}
        checkIfVehicleYearIsValid={props.checkIfVehicleYearIsValid}
        userProfilePicture={props.userProfilePicture}
        disableAddVehicleButton={props.disableAddVehicleButton}
        currentTheme={props.currentTheme}
      />
      <hr className={props.currentTheme.hr} />
      <MyVehicles
        vehicleData={props.vehicleData}
        currentTheme={props.currentTheme}
        errorMessage={props.errorMessage}
        reloadPage={props.reloadPage}
      />
      <AddVehicleYearNanErrorModal
        showAddVehicleYearNanErrorModal={props.showAddVehicleYearNanErrorModal}
        hideAddVehicleYearNanErrorModal={props.hideAddVehicleYearNanErrorModal}
        currentTheme={props.currentTheme}
      />
    </div>
  );
};

export default LoggedIn;
