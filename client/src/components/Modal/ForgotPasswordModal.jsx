import React from "react";
import Modal from "react-modal";

const ForgotPasswordModal = props => {
    return (
        <Modal
            isOpen={props.showForgotPasswordModal}
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
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
                                type="button"
                                className="btn btn-light"
                                onClick={props.hideForgotPasswordModal}
                                data-dismiss="modal">
                                Close
                            </button>
                            <button
                                id="forgotPasswordSubmitButton"
                                className="btn btn-light"
                                type="submit">
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
