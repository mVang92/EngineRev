import React from "react";
import ReactModal from "react-modal";

const AddVehicleYearNanErrorModal = props => {

    return (
        <ReactModal
            isOpen={props.showAddVehicleYearNanErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div>
                                You have entered an invalid input value for Year.
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="cancelBtn" onClick={props.hideAddVehicleYearNanErrorModal} data-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default AddVehicleYearNanErrorModal;
