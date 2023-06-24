import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";
import { defaults } from "../../assets/Defaults";

const UpdatedFutureDateConfirmationModal = props => {
    const {
        updatedServiceLogDateToConfirm,
        showUpdatedFutureDateConfirmationModal,
        currentTheme,
        hideUpdatedFutureDateConfirmationModal,
        handleUpdateOneServiceLog
    } = props;
    let checkThisServiceDate = updatedServiceLogDateToConfirm;
    const newDateCheckThisServiceDate = new Date(checkThisServiceDate);
    const serviceDateToUTC = new Date(
        Date.UTC(newDateCheckThisServiceDate.getFullYear(),
            newDateCheckThisServiceDate.getMonth(),
            newDateCheckThisServiceDate.getDate(),
            newDateCheckThisServiceDate.getHours(),
            newDateCheckThisServiceDate.getMinutes(),
            newDateCheckThisServiceDate.getSeconds()
        )
    );

    serviceDateToUTC.setDate(serviceDateToUTC.getDate() + 1);
    const serviceDateToDisplay = serviceDateToUTC.toLocaleDateString("en-US");

    return (
        <ReactModal
            isOpen={showUpdatedFutureDateConfirmationModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideUpdatedFutureDateConfirmationModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="modal-header">
                            <div className="col-md-2 text-center">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-center">
                                <label><strong>Warning</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>{serviceDateToDisplay} {defaults.updatedFutureDateServiceLog}</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="No"
                                id="cancelSubmitFutureDateButton"
                                type="button"
                                className="cancelBtn"
                                onClick={hideUpdatedFutureDateConfirmationModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                title="Yes"
                                id="confirmSubmitFutureDateButton"
                                className="addBtn"
                                type="button"
                                onClick={handleUpdateOneServiceLog}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default UpdatedFutureDateConfirmationModal;
