import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const UpdateLogErrorModal = props => {
    const {
        showUpdatedLogErrorModal,
        currentTheme,
        serviceLogDate,
        serviceLogMileage,
        serviceLogService,
        serviceLogComment,
        hideUpdateLogErrorModal,
        checkIfStringIsBlank
    } = props;
    return (
        <ReactModal
            isOpen={showUpdatedLogErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div id="addLogErrorModal" className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt="warning" />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <div className="col-md-12">
                                    <label><strong>Please fill in the missing fields:</strong></label>
                                </div>
                                <div className="col-md-12">
                                    {
                                        serviceLogDate === "" || checkIfStringIsBlank(serviceLogDate) ?
                                            (
                                                <div className="text-danger"><strong>Date:</strong></div>
                                            ) : (
                                                <div>Date: <span>{serviceLogDate}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        serviceLogMileage === "" || checkIfStringIsBlank(serviceLogMileage) ?
                                            (
                                                <div className="text-danger"><strong>Mileage:</strong></div>
                                            ) : (
                                                <div>Mileage: <span>{serviceLogMileage}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12 breakWord">
                                    {
                                        serviceLogService === "" || checkIfStringIsBlank(serviceLogService) ?
                                            (
                                                <div className="text-danger"><strong>Service:</strong></div>
                                            ) : (
                                                <div>Service: <span>{serviceLogService}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12 breakWord">
                                    <div>Comments: <span>{serviceLogComment}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeUpdateLogErrorModal"
                                title="Okay"
                                type="button"
                                className="cancelBtn"
                                onClick={hideUpdateLogErrorModal}
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

export default UpdateLogErrorModal;