import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const UpdateLogErrorModal = props => {
    const { serviceLogDate, serviceLogMileage, serviceLogService, serviceLogComment } = props.state;
    return (
        <ReactModal
            isOpen={props.showUpdatedLogErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div id="addLogErrorModal" className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
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
                                        serviceLogDate === "" ? (
                                            <div className="text-danger"><strong>Date:</strong></div>
                                        ) : (
                                                <div>Date: <span className="text-success">{serviceLogDate}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        serviceLogMileage === "" ? (
                                            <div className="text-danger"><strong>Mileage:</strong></div>
                                        ) : (
                                                <div>Mileage: <span className="text-success">{serviceLogMileage}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        serviceLogService === "" ? (
                                            <div className="text-danger"><strong>Service:</strong></div>
                                        ) : (
                                                <div>Service: <span className="text-success">{serviceLogService}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    <div>Comments: <span className="text-success">{serviceLogComment}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeUpdateLogErrorModal"
                                title="Okay"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideUpdateLogErrorModal}
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