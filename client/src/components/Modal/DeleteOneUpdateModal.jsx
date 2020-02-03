import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const DeleteOneUpdateModal = props => {
    return (
        <ReactModal
            isOpen={props.showDeleteOneUpdateModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.state.currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-2">
                                <img className="removeMobileDisplay imageMobileDisplay" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-danger text-center">
                                <label><strong className={props.state.currentTheme.redText}>Delete this release note?</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label><strong>Updates:</strong></label>
                                </div>
                                <div className="col-md-9 updateChangesDeletePreview wrapword">
                                    {props.state.updateChangesToShowInModal}
                                </div>
                            </div>
                            <hr className={props.state.currentTheme.hr} />
                            <div className="row">
                                <div className="col-md-3">
                                    <label><strong>Known Issues:</strong></label>
                                </div>
                                <div className="col-md-9 knownIssuesDeletePreview wrapword">
                                    {props.state.knownIssuesToShowInModal}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="cancelDeleteReleaseNote"
                                title="Cancel"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideDeleteOneUpdateModal}
                                data-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                title="Delete Release Note"
                                id="confirmDeleteReleaseNoteButton"
                                className="deleteBtn"
                                type="button"
                                onClick={props.handleDeleteOneReleaseNote}
                                disabled={props.state.disableConfirmDeleteReleaseNoteButton}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneUpdateModal;
