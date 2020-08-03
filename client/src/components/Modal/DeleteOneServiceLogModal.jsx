import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const DeleteOneServiceLogModal = props => {
    const {
        showDeleteOneLogModal,
        currentTheme,
        hideDeleteOneServiceLogModal,
        handleDeleteOneServiceLog
    } = props;
    return (
        <ReactModal
            isOpen={showDeleteOneLogModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideDeleteOneServiceLogModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-2">
                                <img className="removeMobileDisplay imageMobileDisplay" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-center">
                                <label><strong>Delete this service log from the vehicle?</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={hideDeleteOneServiceLogModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                title="Delete Service Log"
                                id="confirmDeleteServiceLogButton"
                                className="deleteBtn"
                                type="button"
                                onClick={handleDeleteOneServiceLog}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneServiceLogModal;
