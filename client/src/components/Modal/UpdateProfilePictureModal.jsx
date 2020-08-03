import React from "react";
import ReactModal from "react-modal";

const UpdateProfilePictureModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateProfilePictureModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={props.hideUpdateProfilePictureModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        {
                            !props.newProfilePicture || props.checkIfStringIsBlank(props.newProfilePicture) ?
                                (
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            <label>Reset your profile picture to default?</label>
                                        </strong>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <div className="row modal-header">
                                            <strong className="col-md-12 text-center">
                                                <label>Use this image as your profile picture?</label>
                                            </strong>
                                        </div>
                                        <div className="row">
                                            <div id="scrollableBackgroundPicture" className="col-md-12 text-center">
                                                <img
                                                    id="profilePicturePreview"
                                                    src={props.newProfilePicture}
                                                    alt="Invalid Entry">
                                                </img>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                        }
                        <div className="modal-footer">
                            <button
                                id="closeUpdatePictureModalButton"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideUpdateProfilePictureModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="confirmUpdatePictureButton"
                                title="Yes"
                                type="button"
                                className="standardButton"
                                onClick={props.updateProfilePicture}
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

export default UpdateProfilePictureModal;