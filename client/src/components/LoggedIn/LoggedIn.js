import React from "react";
import MyVehiclesSection from "../MyVehiclesSection";
import AddVehicleSection from "../AddVehicleSection";
import AddVehicleYearNanErrorModal from "../../components/Modal/AddVehicleYearNanErrorModal";

const LoggedIn = props => {
  const { currentTheme } = props;
  return (
    <div className={`box ${currentTheme.background}`}>
      <AddVehicleSection
        displayName={props.displayName}
        handleResetAddVehicleFields={props.handleResetAddVehicleFields}
        checkIfVehicleYearIsValid={props.checkIfVehicleYearIsValid}
        profilePicture={props.profilePicture}
        disableAddVehicleButton={props.disableAddVehicleButton}
        currentTheme={currentTheme}
      />
      <hr className={currentTheme.hr} />
      <MyVehiclesSection
        vehicleData={props.vehicleData}
        currentTheme={currentTheme}
        errorMessage={props.errorMessage}
        reloadPage={props.reloadPage}
      />
      <AddVehicleYearNanErrorModal
        showAddVehicleYearNanErrorModal={props.showAddVehicleYearNanErrorModal}
        hideAddVehicleYearNanErrorModal={props.hideAddVehicleYearNanErrorModal}
        currentTheme={currentTheme}
      />
    </div>
  );
};

export default LoggedIn;
