import React from "react";
import Modal from "react-modal";

const ForgotPasswordModal = props => {
    return (
        <Modal
            isOpen={props.showForgotPasswordModal}
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={props.requestHideForgotPasswordModal}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <form className="modalBody" onSubmit={props.handlePasswordReset}>
                        <div className="row modal-header text-center">
                            <div className="col-md-12">
                                <label>
                                    <strong>Enter your email to send a password reset confirmation.</strong>
                                </label>
                            </div>
                        </div>
                        <div className="modal-body">
                            <input
                                id="emailInputForPasswordReset"
                                type="text"
                                value={props.email}
                                name="email"
                                onChange={props.handleChange}
                                placeholder="Email"
                                maxLength="128">
                            </input>
                            <br /><br />
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeForgotPasswordModal"
                                title="Close"
                                type="button"
                                className="btn btn-light"
                                onClick={props.requestHideForgotPasswordModal}
                                data-dismiss="modal">
                                Close
                            </button>
                            <button
                                id="forgotPasswordSubmitButton"
                                title="Send Confirmation"
                                className="btn btn-light"
                                type="submit"
                                disabled={props.disableForgotPasswordSubmitButton}>
                                Send Confirmation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
