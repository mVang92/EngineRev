import React from "react";
import ReactModal from "react-modal";

const EditOneThreadCommentModal = props => {
    const {
        showEditOneThreadCommentModal,
        showDeleteThreadCommentModal,
        validateThreadCommentInput,
        currentTheme,
        handleChange,
        commentsToShowInModal,
        hideEditOneThreadCommentModal,
        disableConfirmSaveEditThreadCommentButton
    } = props;
    return (
        <ReactModal
            isOpen={showEditOneThreadCommentModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <form onSubmit={validateThreadCommentInput}>
                <div className="accountModal modal-content">
                    <div className="modal-body modalShadow">
                        <div className={`modalBody ${currentTheme.background}`}>
                            <div className="row modal-header">
                                <div className="col-md-12 text-center">
                                    <label><strong>Edit Comment</strong></label>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <textarea
                                            id="threadCommentTextArea"
                                            type="text"
                                            name="threadCommentToUpdate"
                                            maxLength="1250"
                                            onChange={handleChange}
                                            defaultValue={commentsToShowInModal}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer noFlex">
                                <div className="row">
                                    <div className="col-md-5 bottomMarginMobileDisplay">
                                        <button
                                            id="deleteThreadCommentButton"
                                            title="Delete Comment"
                                            type="button"
                                            className="deleteBtn"
                                            onClick={showDeleteThreadCommentModal}>
                                            Delete
                                        </button>
                                    </div>
                                    <div className="col-md-7">
                                        <button
                                            id="cancelUpdateThreadCommentButton"
                                            title="Cancel"
                                            type="button"
                                            className="cancelBtn"
                                            onClick={hideEditOneThreadCommentModal}
                                            data-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button
                                            id="confirmSaveEditThreadCommentButton"
                                            title="Save Comment"
                                            className="standardButton"
                                            type="submit"
                                            disabled={disableConfirmSaveEditThreadCommentButton}>
                                            Save
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default EditOneThreadCommentModal;
