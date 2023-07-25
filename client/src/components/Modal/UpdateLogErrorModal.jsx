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
            onRequestClose={hideUpdateLogErrorModal}
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
                                    {
                                        serviceLogDate === "" || checkIfStringIsBlank(serviceLogDate) ?
                                            (
                                                <div><strong>Date is required.</strong></div>
                                            ) : (
                                                null
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        serviceLogMileage === "" || checkIfStringIsBlank(serviceLogMileage) ?
                                            (
                                                <div><strong>Mileage is required.</strong></div>
                                            ) : (
                                                null
                                            )
                                    }
                                </div>
                                <div className="col-md-12 breakWord">
                                    {
                                        serviceLogService === "" || checkIfStringIsBlank(serviceLogService) ?
                                            (
                                                <div><strong>Service is required.</strong></div>
                                            ) : (
                                                null
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeUpdateLogErrorModal"
                                title="Okay"
                                type="button"
                                className="standardButton"
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