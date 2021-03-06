import React from "react";
import ReactModal from "react-modal";

const UpdateDisplayNameModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateDisplayNameModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={props.hideUpdateDisplayNameModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        {
                            !props.newDisplayName || props.checkIfStringIsBlank(props.newDisplayName) ?
                                (
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            <label>Reset your name to default?</label>
                                        </strong>
                                    </div>
                                ) : (
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            <label>Use "{props.newDisplayName}" as your name?</label>
                                        </strong>
                                    </div>
                                )
                        }
                        <div className="modal-footer">
                            <button
                                id="closeUpdateDisplayNameModalButton"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideUpdateDisplayNameModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="confirmUpdateDisplayNameButton"
                                title="Yes"
                                type="button"
                                className="standardButton"
                                onClick={props.updateDisplayName}
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

export default UpdateDisplayNameModal;