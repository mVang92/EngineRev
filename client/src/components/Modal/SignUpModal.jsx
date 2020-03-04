import React from "react";
import Modal from "react-modal";
import createAccountLogo from "../../images/createAccount.png"

const SignUp = props => {
    return (
        <Modal
            isOpen={props.showSignUpModal}
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <form className="modalBody" onSubmit={props.handleSignUp}>
                        <div className="modal-header">
                            <span>
                                <img
                                    id="createAccountLogo"
                                    src={createAccountLogo}
                                    alt="account"
                                />
                                <label>
                                    <strong>Sign-Up for a New Account</strong>
                                </label>
                            </span>
                        </div>
                        <div className="modal-body text-center">
                            <input
                                id="emailInput"
                                type="text"
                                value={props.email}
                                name="email"
                                onChange={props.handleChange}
                                placeholder="Email"
                                maxLength="128">
                            </input>
                            <br /><br />
                            <input
                                id="passwordInput"
                                type="password"
                                value={props.password}
                                name="password"
                                onChange={props.handleChange}
                                placeholder="Password"
                                maxLength="128">
                            </input>
                            <br /><br />
                            <input
                                id="confirmPasswordInput"
                                type="password"
                                value={props.confirmPassword}
                                name="confirmPassword"
                                onChange={props.handleChange}
                                placeholder="Confirm Password"
                                maxLength="128">
                            </input>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeSignUpModal"
                                type="button"
                                className="btn btn-light"
                                onClick={props.requestHideSignUpModal}
                                data-dismiss="modal">
                                Close
                            </button>
                            <button
                                id="signUpButton"
                                className="btn btn-light"
                                type="submit"
                                disabled={props.disableSignUpButton}>
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default SignUp;
