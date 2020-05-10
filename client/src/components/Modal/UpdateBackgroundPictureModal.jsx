import React from "react";
import ReactModal from "react-modal";

const showUpdateBackgroundPictureModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateBackgroundPictureModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        {
                            !props.newBackgroundPicture || props.checkIfStringIsBlank(props.newBackgroundPicture) ?
                                (
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            <label>Reset your background picture to default?</label>
                                        </strong>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <div className="row modal-header">
                                            <strong className="col-md-12 text-center">
                                                <label>Use this image as your background picture?</label>
                                            </strong>
                                        </div>
                                        <div className="row">
                                            <div id="scrollableBackgroundPicture" className="col-md-12 text-center">
                                                <img
                                                    id="backgroundPicture"
                                                    src={props.newBackgroundPicture}
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
                                onClick={props.hideUpdateBackgroundPictureModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="confirmUpdatePictureButton"
                                title="Yes"
                                type="button"
                                className="standardButton"
                                onClick={props.updateBackgroundPicture}
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

export default showUpdateBackgroundPictureModal;