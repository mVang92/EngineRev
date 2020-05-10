import React from "react";
import ReactModal from "react-modal";
import { defaults } from "../../assets/Defaults";

const DeleteThreadCommentModal = props => {
    return (
        <ReactModal
            isOpen={props.showDeleteThreadCommentModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-12 text-center">
                                <label><strong>{defaults.areYouSureToDeleteThreadComment}</strong></label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeDeleteThreadCommentModalButton"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideDeleteThreadCommentModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="confirmDeleteThreadCommentButton"
                                title="Yes"
                                type="button"
                                className="deleteBtn"
                                onClick={props.handleDeleteThreadComment}
                                data-dismiss="modal">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteThreadCommentModal;