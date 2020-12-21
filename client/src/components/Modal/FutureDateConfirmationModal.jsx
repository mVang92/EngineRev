import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const FutureDateConfirmationModal = props => {
    const {
        date,
        showFutureDateConfirmationModal,
        currentTheme,
        hideFutureDateConfirmationModal,
        handleSubmitOneServiceLog
    } = props;
    const serviceLogDate = new Date(date);
    serviceLogDate.setDate(serviceLogDate.getDate() + 1);
    const futureDate = serviceLogDate.toLocaleDateString("en-US");

    return (
        <ReactModal
            isOpen={showFutureDateConfirmationModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideFutureDateConfirmationModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt="warning" />
                            </div>
                            <div className="col-md-10">
                                <label><strong>You are about to submit a future service log.</strong></label>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>
                                        {futureDate} is a future date.
                                        This service log will appear in red to symbolize a
                                        service has been logged for the future.
                                        Are you sure you want to submit this?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={hideFutureDateConfirmationModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                title="Yes"
                                id="confirmSubmitFutureDateButton"
                                className="addBtn"
                                type="button"
                                onClick={handleSubmitOneServiceLog}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default FutureDateConfirmationModal;
