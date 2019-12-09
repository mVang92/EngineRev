import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const AddVehicleErrorModal = props => {

    return (
        <ReactModal
            isOpen={props.showAddVehicleErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div id="addVehicleErrorModal" className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2">
                                <img className="warningImage" src={warningImage} alt="warning" />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <label>Please fill in all of the required input fields.</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeAddVehicleErrorModal"
                                title="Okay"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideAddVehicleErrorModal}
                                data-dismiss="modal">
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default AddVehicleErrorModal;
