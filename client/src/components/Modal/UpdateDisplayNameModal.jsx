import React from "react";
import ReactModal from "react-modal";

const UpdateDisplayNameModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateDisplayNameModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        {
                            props.newDisplayName ? (
                                <div className="row modal-header">
                                    <strong className="col-md-12 text-center">
                                        Use "{props.newDisplayName}" as your name?
                                        </strong>
                                </div>
                            ) : (
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            Reset your name to default?
                                        </strong>
                                    </div>
                                )
                        }
                        <div className="modal-footer">
                            <button
                                id="closeMyAccountModalButton"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideUpdateDisplayNameModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="closeMyAccountModalButton"
                                title="Yes"
                                type="button"
                                className="cancelBtn"
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