import React from "react";
import ReactModal from "react-modal";

const UpdateProfilePictureSuccessModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateProfilePictureSuccessModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={props.hideUpdateProfilePictureSuccessModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-12 text-center">
                                <label><strong>Profile picture updated!</strong></label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeUpdateProfilePictureSuccessModalButton"
                                title="Okay"
                                type="button"
                                className="standardButton"
                                onClick={props.hideUpdateProfilePictureSuccessModal}
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

export default UpdateProfilePictureSuccessModal;
