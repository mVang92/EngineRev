import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const DeleteOneUpdateModal = props => {
    const {
        showDeleteOneUpdateModal,
        currentTheme,
        hideDeleteOneUpdateModal,
        handleDeleteOneReleaseNote,
        disableConfirmDeleteReleaseNoteButton
    } = props;
    
    return (
        <ReactModal
            isOpen={showDeleteOneUpdateModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideDeleteOneUpdateModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-2">
                                <img className="removeMobileDisplay imageMobileDisplay" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-center">
                                <label><strong>Delete this release note?</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="cancelDeleteReleaseNote"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={hideDeleteOneUpdateModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                title="Yes"
                                id="confirmDeleteReleaseNoteButton"
                                className="deleteBtn"
                                type="button"
                                onClick={handleDeleteOneReleaseNote}
                                disabled={disableConfirmDeleteReleaseNoteButton}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneUpdateModal;
