import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const UpdatedFutureDateConfirmationModal = props => {
    // console.log(props)
    let checkThisServiceDate = props.state.updatedServiceLogDateToConfirm;
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
            isOpen={props.showUpdatedFutureDateConfirmationModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10 text-danger">
                                <label>
                                    <strong>You are about to submit a future service log.</strong>
                                </label>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>
                                        {serviceDateToDisplay} is a future date.
                                        This service log will appear in red text to symbolize a
                                        service has been logged for the future. Are you sure you want to submit this?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideUpdatedFutureDateConfirmationModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                title="Yes"
                                id="confirmSubmitFutureDateButton"
                                className="addBtn"
                                type="button"
                                onClick={props.handleUpdateOneServiceLog}>
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
