import React from "react";
import ReactModal from "react-modal";
import { defaults } from "../../assets/Defaults";

const UpdateThreadDetailsSuccessModal = props => {
    return (
        <ReactModal
            isOpen={props.showUpdateThreadDetailsSuccessModal}
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
                                <label><strong>{defaults.threadDetailsUpdated}</strong></label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeUpdateThreadDetailsSuccessModalButton"
                                title="Okay"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideUpdateThreadDetailsSuccessModal}
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

export default UpdateThreadDetailsSuccessModal;
