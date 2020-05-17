import React from "react";
import ReactModal from "react-modal";

const EditOneVehicleNameModal = props => {
    const {
        showEditOneVehicleNameModal,
        checkUserEnteredUpdatedVehicleNameInput,
        currentTheme,
        handleChange,
        vehicleName,
        deleteVehicleName,
        year,
        make, 
        model,
        showDeleteOneVehicleModal,
        hideEditOneVehicleNameModal,
        disableConfirmSaveEditVehicleNameButton
    } = props;
    return (
        <ReactModal
            isOpen={showEditOneVehicleNameModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <form onSubmit={checkUserEnteredUpdatedVehicleNameInput}>
                <div className="accountModal modal-content">
                    <div className="modal-body modalShadow">
                        <div className={`modalBody ${currentTheme.background}`}>
                            <div className="row modal-header">
                                <div className="col-md-12 text-center">
                                    <label><strong>Edit Vehicle</strong></label>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><strong>Name</strong></label>
                                    </div>
                                    <div className="col-md-5 noPaddingRightDesktopDisplay">
                                        <input
                                            id="vehicleNameInput"
                                            type="text"
                                            onChange={handleChange}
                                            defaultValue={vehicleName}
                                            name="updatedVehicleName"
                                            maxLength="25"
                                        />
                                    </div>
                                    <div className="col-md-4 text-right textLeftMobileDisplay">
                                        <button
                                            id="removeVehicleNameButton"
                                            title="Delete Name"
                                            type="button"
                                            onClick={deleteVehicleName}>
                                            Delete Name
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Year</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="vehicleYearInput"
                                            type="text"
                                            onChange={handleChange}
                                            defaultValue={year}
                                            name="updatedYear"
                                            maxLength="4"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Make</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="vehicleMakeInput"
                                            type="text"
                                            onChange={handleChange}
                                            defaultValue={make}
                                            name="updatedMake"
                                            maxLength="25"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Model</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="vehicleModelInput"
                                            type="text"
                                            onChange={handleChange}
                                            defaultValue={model}
                                            name="updatedModel"
                                            maxLength="25"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer noFlex">
                                <div className="row">
                                    <div className="col-md-4 bottomMarginMobileDisplay">
                                        <button
                                            id="addLogDeleteVehicleButton"
                                            title="Delete Vehicle"
                                            type="button"
                                            className="deleteBtn"
                                            onClick={showDeleteOneVehicleModal}>
                                            Delete
                                        </button>
                                    </div>
                                    <div className="col-md-8 alignRightButtonsDesktopDisplay">
                                        <button
                                            title="Cancel"
                                            type="button"
                                            className="cancelBtn"
                                            onClick={hideEditOneVehicleNameModal}
                                            data-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button
                                            title="Save"
                                            id="confirmSaveEditVehicleNameButton"
                                            className="standardButton"
                                            type="submit"
                                            disabled={disableConfirmSaveEditVehicleNameButton}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default EditOneVehicleNameModal;
