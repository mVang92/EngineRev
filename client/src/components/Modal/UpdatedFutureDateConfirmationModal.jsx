import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const UpdatedFutureDateConfirmationModal = props => {
    console.log(props)
    let serviceLogDate = "";
    let futureDate = ""
    try {
        serviceLogDate = new Date(props.state);
        console.log(serviceLogDate)
        const loggedServiceDateToUTC = new Date(
            Date.UTC(serviceLogDate.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            )
        );
        loggedServiceDateToUTC.setDate(loggedServiceDateToUTC.getDate() + 1);
        const loggedServiceDateToEnUs = loggedServiceDateToUTC.toLocaleDateString("en-US");

        let date = new Date(loggedServiceDateToEnUs),
            month = "" + (date.getMonth() + 1),
            day = "" + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) {
            month = "0" + month;
        }

        if (day.length < 2) {
            day = "0" + day;
        }

        futureDate = [year, month, day].join("-");
    } catch (e) {
        null;
    }

    // serviceLogDate.setDate(serviceLogDate.getDate() + 1);
    // const futureDate = serviceLogDate.toLocaleDateString("en-US");
    console.log(futureDate)
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
                                        {futureDate} is a future date.
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
