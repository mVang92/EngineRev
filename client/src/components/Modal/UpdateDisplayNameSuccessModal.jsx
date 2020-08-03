import React from "react";
import ReactModal from "react-modal";

const UpdateDisplayNameSuccessModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateDisplayNameSuccessModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={props.hideUpdateDisplayNameSuccessModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-12 text-center">
                                <label><strong>Display name updated!</strong></label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeUpdateDisplayNameSuccessModalButton"
                                title="Okay"
                                type="button"
                                className="standardButton"
                                onClick={props.hideUpdateDisplayNameSuccessModal}
                                data-dismiss="modal">
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default UpdateDisplayNameSuccessModal;
