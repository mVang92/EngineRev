import React from "react";
import ReactModal from "react-modal";

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
                    <form className="modalBody" onSubmit={props.handleDeleteOneVehicle}>
                        <div className="modal-header">
                            Deleting this vehicle will also delete all of its service logs. Are you sure you want to continue?
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={props.hideDeleteOneVehicleModal} data-dismiss="modal">Cancel</button>
                            <button className="btn btn-light" type="submit">Okay</button>
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneVehicleModal;
