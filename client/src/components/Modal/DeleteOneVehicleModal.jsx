import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

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
                            <strong>Vehicle ID = {props.state.vehicleId}</strong>
                        </div>
                        <div className="modal-body text-danger">
                            Deleting this vehicle will also delete all of its service logs.
                            Are you sure you want to continue?
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="cancelBtn" onClick={props.hideDeleteOneVehicleModal} data-dismiss="modal">Cancel</button>
                            <Link to={"/vehicle/"}>
                                <button className="deleteBtn" type="button" onClick={props.handleDeleteOneVehicle}>Delete Vehicle</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneVehicleModal;
