import React from "react";
import DeleteOneVehicleModal from "../../components/Modal/DeleteOneVehicleModal";
import EditOneServiceLogModal from "../../components/Modal/EditOneServiceLogModal";
import DeleteOneServiceLogModal from "../../components/Modal/DeleteOneServiceLogModal";
import FutureDateConfirmationModal from "../../components/Modal/FutureDateConfirmationModal";
import UpdatedFutureDateConfirmationModal from "../../components/Modal/UpdatedFutureDateConfirmationModal";
import EditOneVehicleNameModal from "../../components/Modal/EditOneVehicleNameModal";
import AddLogErrorModal from "../../components/Modal/AddLogErrorModal";
import UpdateLogErrorModal from "../../components/Modal/UpdateLogErrorModal";
import MileageInputErrorModal from "../../components/Modal/MileageInputErrorModal";
import UpdatedMileageInputErrorModal from "../../components/Modal/UpdatedMileageInputErrorModal";
import UpdatedVehicleYearNanErrorModal from "../../components/Modal/UpdatedVehicleYearNanErrorModal";

const VehicleLogModals = props => {
    const {
        currentTheme,
        handleChange,
        year,
        make,
        model,
        date,
        mileage,
        checkIfStringIsBlank,
        serviceLogDate,
        serviceLogMileage,
        serviceLogService,
        serviceLogComment
    } = props;

    return (
        <React.Fragment>
            <EditOneVehicleNameModal
                disableConfirmSaveEditVehicleNameButton={props.disableConfirmSaveEditVehicleNameButton}
                showEditOneVehicleNameModal={props.showEditOneVehicleNameModal}
                hideEditOneVehicleNameModal={props.hideEditOneVehicleNameModal}
                checkUserEnteredUpdatedVehicleNameInput={props.checkUserEnteredUpdatedVehicleNameInput}
                showDeleteOneVehicleModal={props.showDeleteOneVehicleModal}
                handleChange={handleChange}
                deleteVehicleName={props.deleteVehicleName}
                currentTheme={currentTheme}
                vehicleName={props.vehicleName}
                year={year}
                make={make}
                model={model}
            />
            <EditOneServiceLogModal
                disableConfirmSaveEditServiceLogButton={props.disableConfirmSaveEditServiceLogButton}
                checkUserEnteredUpdatedServiceLogInput={props.checkUserEnteredUpdatedServiceLogInput}
                showDeleteOneServiceLogModal={props.showDeleteOneServiceLogModal}
                showEditOneLogModal={props.showEditOneLogModal}
                hideEditOneServiceLogModal={props.hideEditOneServiceLogModal}
                handleChange={handleChange}
                currentTheme={currentTheme}
                serviceLogDate={serviceLogDate}
                serviceLogMileage={serviceLogMileage}
                serviceLogService={serviceLogService}
                serviceLogComment={serviceLogComment}
            />
            <UpdatedVehicleYearNanErrorModal
                showUpdatedVehicleYearNanErrorModal={props.showUpdatedVehicleYearNanErrorModal}
                hideUpdatedVehicleYearNanErrorModal={props.hideUpdatedVehicleYearNanErrorModal}
                currentTheme={currentTheme}
            />
            <FutureDateConfirmationModal
                handleSubmitOneServiceLog={props.handleSubmitOneServiceLog}
                showFutureDateConfirmationModal={props.showFutureDateConfirmationModal}
                hideFutureDateConfirmationModal={props.hideFutureDateConfirmationModal}
                date={date}
                currentTheme={currentTheme}
            />
            <UpdatedFutureDateConfirmationModal
                handleUpdateOneServiceLog={props.handleUpdateOneServiceLog}
                showUpdatedFutureDateConfirmationModal={props.showUpdatedFutureDateConfirmationModal}
                hideUpdatedFutureDateConfirmationModal={props.hideUpdatedFutureDateConfirmationModal}
                updatedServiceLogDateToConfirm={props.updatedServiceLogDateToConfirm}
                currentTheme={currentTheme}
            />
            <DeleteOneVehicleModal
                handleDeleteOneVehicle={props.handleDeleteOneVehicle}
                deleteOneVehicleModal={props.deleteOneVehicleModal}
                hideDeleteOneVehicleModal={props.hideDeleteOneVehicleModal}
                handlePrintPage={props.handlePrintPage}
                currentTheme={currentTheme}
                year={year}
                make={make}
                model={model}
                vehicleServiceLogs={props.vehicleServiceLogs}
                disableDeleteOneVehicleButton={props.disableDeleteOneVehicleButton}
                confirmDeleteVehicleButtonText={props.confirmDeleteVehicleButtonText}
            />
            <DeleteOneServiceLogModal
                handleDeleteOneServiceLog={props.handleDeleteOneServiceLog}
                showDeleteOneLogModal={props.showDeleteOneLogModal}
                hideDeleteOneServiceLogModal={props.hideDeleteOneServiceLogModal}
                currentTheme={currentTheme}
            />
            <AddLogErrorModal
                showAddLogErrorModal={props.showAddLogErrorModal}
                hideAddLogErrorModal={props.hideAddLogErrorModal}
                checkIfStringIsBlank={checkIfStringIsBlank}
                date={date}
                currentTheme={currentTheme}
                mileage={mileage}
                service={props.service}
                comment={props.comment}
            />
            <UpdateLogErrorModal
                showUpdatedLogErrorModal={props.showUpdatedLogErrorModal}
                hideUpdateLogErrorModal={props.hideUpdateLogErrorModal}
                checkIfStringIsBlank={checkIfStringIsBlank}
                currentTheme={currentTheme}
                serviceLogDate={serviceLogDate}
                serviceLogMileage={serviceLogMileage}
                serviceLogService={serviceLogService}
                serviceLogComment={serviceLogComment}
            />
            <MileageInputErrorModal
                showMileageInputErrorModal={props.showMileageInputErrorModal}
                hideMileageInputErrorModal={props.hideMileageInputErrorModal}
                currentTheme={currentTheme}
                mileage={mileage}
            />
            <UpdatedMileageInputErrorModal
                showUpdatedMileageInputErrorModal={props.showUpdatedMileageInputErrorModal}
                hideUpdatedMileageInputErrorModal={props.hideUpdatedMileageInputErrorModal}
                currentTheme={currentTheme}
                serviceLogMileage={serviceLogMileage}
            />
        </React.Fragment>
    );
};

export default VehicleLogModals;
