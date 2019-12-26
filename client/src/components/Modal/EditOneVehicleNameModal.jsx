import React from "react";
import ReactModal from "react-modal";

const EditOneVehicleNameModal = props => {
    return (
        <ReactModal
            isOpen={props.showEditOneVehicleNameModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <form onSubmit={props.checkUserEnteredUpdatedVehicleNameInput}>
                <div className="accountModal modal-content">
                    <div className="modal-body modalShadow">
                        <div className="modalBody">
                            <div className="modal-header text-danger">
                                <label><strong>Edit Vehicle</strong></label>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Year</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="vehicleYearInput"
                                            type="text"
                                            onChange={props.handleChange}
                                            defaultValue={props.state.year}
                                            name="updatedYear"
                                            maxLength="4"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Make</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="vehicleMakeInput"
                                            type="text"
                                            onChange={props.handleChange}
                                            defaultValue={props.state.make}
                                            name="updatedMake"
                                            maxLength="25"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Model</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="vehicleModelInput"
                                            type="text"
                                            onChange={props.handleChange}
                                            defaultValue={props.state.model}
                                            name="updatedModel"
                                            maxLength="25"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer noFlex">
                                <div className="row">
                                    <div className="col-md-8 bottomMarginMobileDisplay">
                                        <button
                                            id="addLogDeleteVehicleButton"
                                            title="Delete This Vehicle"
                                            type="button"
                                            className="deleteBtn"
                                            onClick={props.showDeleteOneVehicleModal}>
                                            Delete Vehicle
                                        </button>
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            title="Cancel"
                                            type="button"
                                            className="cancelBtn"
                                            onClick={props.hideEditOneVehicleNameModal}
                                            data-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button
                                            title="Save Vehicle Name"
                                            id="confirmSaveEditVehicleNameButton"
                                            className="cancelBtn"
                                            type="submit">
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
