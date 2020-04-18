import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import warningImage from "../../images/warning.png";

const DeleteOneVehicleModal = props => {
    const {
        showDeleteOneVehicleModal,
        currentTheme,
        year,
        make,
        model,
        vehicleServiceLogs,
        hideDeleteOneVehicleModal,
        handleDeleteOneVehicle,
        disableDeleteOneVehicleButton,
        confirmDeleteVehicleButtonText,
        handlePrintPage
    } = props;
    return (
        <ReactModal
            isOpen={showDeleteOneVehicleModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-2">
                                <img className="removeMobileDisplay imageMobileDisplay" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-center">
                                <label><strong id="deleteVehicleModalTitle">Delete your {year} {make} {model}?</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-body">
                            {
                                vehicleServiceLogs.length > 1 ?
                                    (
                                        <label>
                                            Deleting this vehicle will delete all {vehicleServiceLogs.length} of its service logs.
                                            Are you sure you want to continue? Consider printing your service logs.
                                        </label>
                                    ) : (
                                        <label>
                                            You are about to delete this vehicle and any service logs associated with it.
                                            Are you sure you want to continue?
                                        </label>
                                    )
                            }
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Cancel"
                                type="button"
                                className="cancelBtn"
                                onClick={hideDeleteOneVehicleModal}
                                data-dismiss="modal">
                                Cancel
                            </button>
                            {
                                vehicleServiceLogs.length > 1 ?
                                    (
                                        <button
                                            id="printPageViaDeleteButton"
                                            title="Print Service Logs"
                                            type="button"
                                            className="addBtn"
                                            onClick={handlePrintPage}
                                            data-dismiss="modal">
                                            Print Logs
                                        </button>
                                    ) : (
                                        null
                                    )
                            }
                            <Link to={"/"}>
                                <button
                                    title="Delete This Vehicle"
                                    id="confirmDeleteVehicleButton"
                                    className="deleteBtn"
                                    type="button"
                                    onClick={handleDeleteOneVehicle}
                                    disabled={disableDeleteOneVehicleButton}>
                                    {confirmDeleteVehicleButtonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneVehicleModal;
