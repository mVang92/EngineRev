import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const UpdatedVehicleYearNanErrorModal = props => {
    const {
        showUpdatedVehicleYearNanErrorModal,
        currentTheme,
        hideUpdatedVehicleYearNanErrorModal
    } = props;
    return (
        <ReactModal
            isOpen={showUpdatedVehicleYearNanErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideUpdatedVehicleYearNanErrorModal}
        >
            <div id="addVehicleYearNanErrorModal" className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt="warning" />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <label>Please enter a valid input for Year.</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeAddVehicleYearNanErrorModal"
                                title="Okay"
                                type="button"
                                className="standardButton"
                                onClick={hideUpdatedVehicleYearNanErrorModal}
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

export default UpdatedVehicleYearNanErrorModal;
