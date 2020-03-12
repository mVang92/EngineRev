import React from "react";
import ReactModal from "react-modal";

const UpdateBackgroundPictureModal = props => {
    console.log(props)
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
                            props.newBackgroundPicture ? (
                                <React.Fragment>
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            Use this image as your background picture?
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
                            ) : (
                                    <div className="row modal-header">
                                        <strong className="col-md-12 text-center">
                                            Reset your background picture to default?
                                        </strong>
                                    </div>
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
                                className="cancelBtn"
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

export default UpdateBackgroundPictureModal;