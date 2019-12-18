import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const FutureDateConfirmationModal = props => {
    const serviceLogDate = new Date(props.state);
    serviceLogDate.setDate(serviceLogDate.getDate() + 1);
    const futureDate = serviceLogDate.toLocaleDateString("en-US");

    return (
        <ReactModal
            isOpen={props.showFutureDateConfirmationModal}
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
                                    <strong>Confirm future date submission?</strong>
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
                                onClick={props.hideFutureDateConfirmationModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                title="Yes"
                                id="confirmSubmitFutureDateButton"
                                className="addBtn"
                                type="button"
                                onClick={props.handleSubmitOneServiceLog}>
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