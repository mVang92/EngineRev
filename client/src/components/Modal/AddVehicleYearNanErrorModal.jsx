import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

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
                            <div className="col-md-2">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <label>Please enter a valid input for Year.</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Okay"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideAddVehicleYearNanErrorModal}
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

export default AddVehicleYearNanErrorModal;
