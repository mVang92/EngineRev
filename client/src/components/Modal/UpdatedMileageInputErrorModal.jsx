import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const UpdatedMileageInputErrorModal = props => {
    const {
        showUpdatedMileageInputErrorModal,
        serviceLogMileage,
        currentTheme,
        hideUpdatedMileageInputErrorModal
    } = props;
    return (
        <ReactModal
            isOpen={showUpdatedMileageInputErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideUpdatedMileageInputErrorModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <div className="col-md-12">
                                    <strong><span className="text-danger">{serviceLogMileage}</span></strong> is not a valid input for Mileage.
                                </div>
                                <div className="col-md-12">
                                    Please enter numerical values. Exclude special characters.
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Okay"
                                type="button"
                                className="standardButton"
                                onClick={hideUpdatedMileageInputErrorModal}
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

export default UpdatedMileageInputErrorModal;