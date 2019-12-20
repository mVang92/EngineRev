import React from "react";
import ReactModal from "react-modal";

const MyAccountModal = props => {

    return (
        <ReactModal
            isOpen={props.showMyAccountModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="row modal-header">
                            <div className="col-md-4">
                                Email:
                                </div>
                            <div className="col-md-8">
                                {props.email}
                            </div>
                        </div>
                        <div className="row modal-header">
                            <div className="col-md-4">
                                Vehicles on Record:
                                </div>
                            <div className="col-md-8">
                                {props.email}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeMyAccountModalButton"
                                title="Close"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideMyAccountModal}
                                data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default MyAccountModal;