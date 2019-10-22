import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import warningImage from "../../images/warning.png";

const DeleteOneVehicleModal = props => {
    return (
        <ReactModal
            isOpen={props.showDeleteOneVehicleModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10">
                                <strong>Vehicle ID = {props.state.vehicleId}</strong>
                            </div>
                        </div>
                        <div className="modal-body text-danger">
                            You are about to delete this vehicle.
                            Doing so will also delete all of its service logs.
                            Are you sure you want to continue?
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Cancel"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideDeleteOneVehicleModal}
                                data-dismiss="modal">
                                Cancel
                            </button>
                            <Link to={"/vehicle/"}>
                                <button
                                    title="Delete This Vehicle"
                                    id="confirmDeleteVehicleButton"
                                    className="deleteBtn"
                                    type="button"
                                    onClick={props.handleDeleteOneVehicle}>
                                    Delete Vehicle
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
