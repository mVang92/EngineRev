import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";
import { defaults } from "../../assets/Defaults";

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
                            <div className="col-md-2 text-center">
                                <img className="warningImage" src={warningImage} alt="warning" />
                            </div>
                            <div className="col-md-8 text-center">
                                <label><strong>Warning</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>{futureDate} {defaults.updatedFutureDateServiceLog}</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="No"
                                id="cancelSubmitFutureDateButton"
                                className="cancelBtn"
                                type="button"
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
