import React from "react";
import ReactModal from "react-modal";
import { defaults } from "../../assets/Defaults";
import warningImage from "../../images/warning.png";

const DeleteThreadModal = props => {
    return (
        <ReactModal
            isOpen={props.showDeleteThreadModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={props.hideDeleteThreadModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.currentTheme.background}`}>
                        <div className="row modal-header">
                            <div className="col-md-2">
                                <img className="removeMobileDisplay imageMobileDisplay" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-center">
                                <label><strong>{defaults.areYouSureToDeleteThread}</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeDeleteThreadModalButton"
                                title="No"
                                type="button"
                                className="standardButton"
                                onClick={props.hideDeleteThreadModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="confirmDeleteThreadButton"
                                title="Yes"
                                type="button"
                                className="deleteBtn"
                                onClick={props.handleDeleteThread}
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

export default DeleteThreadModal;