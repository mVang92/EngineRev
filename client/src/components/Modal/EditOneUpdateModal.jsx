import React from "react";
import ReactModal from "react-modal";

const EditOneUpdateModal = props => {
    const {
        showEditOneUpdateModal,
        checkUserEnteredUpdatedReleaseNoteInput,
        currentTheme,
        handleChange,
        updateChangesToShowInModal,
        knownIssuesToShowInModal,
        hideEditOneUpdateModal,
        disableConfirmSaveEditReleaseNoteButton
    } = props;
    return (
        <ReactModal
            isOpen={showEditOneUpdateModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <form onSubmit={checkUserEnteredUpdatedReleaseNoteInput}>
                <div className="accountModal modal-content">
                    <div className="modal-body modalShadow">
                        <div className={`modalBody ${currentTheme.background}`}>
                            <div className="row modal-header">
                                <div className="col-md-12 text-center">
                                    <label><strong>Edit Release Note</strong></label>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Updates</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <textarea
                                            id="updatedReleaseNotesTextArea"
                                            type="text"
                                            name="releaseNotesToUpdate"
                                            maxLength="500"
                                            onChange={handleChange}
                                            defaultValue={updateChangesToShowInModal}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Known Issues</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <textarea
                                            id="updatedKnownIssuesTextArea"
                                            type="text"
                                            name="knownIssuesToUpdate"
                                            maxLength="500"
                                            onChange={handleChange}
                                            defaultValue={knownIssuesToShowInModal}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    id="cancelUpdateReleaseNote"
                                    title="Cancel"
                                    type="button"
                                    className="cancelBtn"
                                    onClick={hideEditOneUpdateModal}
                                    data-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    id="confirmSaveEditReleaseNoteButton"
                                    title="Save Release Note"
                                    className="cancelBtn"
                                    type="submit"
                                    disabled={disableConfirmSaveEditReleaseNoteButton}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default EditOneUpdateModal;
