import React from "react";
import ReactModal from "react-modal";

const AddVehicleErrorModal = props => {

    return (
        <ReactModal
            isOpen={props.showAddVehicleErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            Please fill in all of the neccessary fields.
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="cancelBtn" onClick={props.hideAddVehicleErrorModal} data-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default AddVehicleErrorModal;
