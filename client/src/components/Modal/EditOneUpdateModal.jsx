import React from "react";
import ReactModal from "react-modal";

const EditOneUpdateModal = props => {
    return (
        <ReactModal
            isOpen={props.showEditOneUpdateModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <form onSubmit={props.checkUserEnteredUpdatedReleaseNoteInput}>
                <div className="accountModal modal-content">
                    <div className="modal-body modalShadow">
                        <div className={`modalBody ${props.state.currentTheme.background}`}>
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
                                            onChange={props.handleChange}
                                            defaultValue={props.state.updateChangesToShowInModal}
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
                                            onChange={props.handleChange}
                                            defaultValue={props.state.knownIssuesToShowInModal}
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
                                    onClick={props.hideEditOneUpdateModal}
                                    data-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    id="confirmSaveEditReleaseNoteButton"
                                    title="Save Release Note"
                                    className="cancelBtn"
                                    type="submit"
                                    disabled={props.state.disableConfirmSaveEditReleaseNoteButton}>
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
