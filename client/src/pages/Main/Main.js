import React from "react";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import LoggedIn from "../../components/LoggedIn";

const Main = props => {
  const {
    pageLoaded,
    reloadPage,
    vehicleData,
    profilePicture,
    handleResetAddVehicleFields,
    checkIfVehicleYearIsValid,
    displayName,
    currentTheme,
    errorMessage,
    disableAddVehicleButton,
    checkIfStringIsBlank,
    showAddVehicleYearNanErrorModal,
    requestShowAddVehicleYearNanErrorModal,
    requestHideAddVehicleYearNanErrorModal
  } = props;

  return (
    <>
      {
        pageLoaded ?
          (
            <Container>
              <LoggedIn
                vehicleData={vehicleData}
                displayName={displayName}
                handleResetAddVehicleFields={handleResetAddVehicleFields}
                checkIfVehicleYearIsValid={checkIfVehicleYearIsValid}
                profilePicture={profilePicture}
                disableAddVehicleButton={disableAddVehicleButton}
                currentTheme={currentTheme}
                errorMessage={errorMessage}
                reloadPage={reloadPage}
                checkIfStringIsBlank={checkIfStringIsBlank}
                showAddVehicleYearNanErrorModal={showAddVehicleYearNanErrorModal}
                requestShowAddVehicleYearNanErrorModal={requestShowAddVehicleYearNanErrorModal}
                requestHideAddVehicleYearNanErrorModal={requestHideAddVehicleYearNanErrorModal}
              />
            </Container>
          ) :
          (
            <Loading />
          )
      }
    </>
  );
};

export default Main;