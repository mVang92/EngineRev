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
                            <span><img id="createAccountLogo" src={createAccountLogo} alt="Create Account"></img>
                                <label><strong>Sign-Up for a New Account</strong></label>
                            </span>
                        </div>
                        <hr />
                        <div className="modal-body text-center">
                            <input id="emailInput" type="text" value={props.email} name="email" onChange={props.handleChange} placeholder="Email"></input>
                            <br /><br />
                            <input id="passwordInput" type="password" value={props.password} name="password" onChange={props.handleChange} placeholder="Password"></input>
                            <br /><br />
                            <input id="confirmPasswordInput" type="password" value={props.confirmPassword} name="confirmPassword" onChange={props.handleChange} placeholder="Confirm Password"></input>
                        </div>
                        <div className="modal-footer">
                            <button id="closeSignUpModal" type="button" className="btn btn-light" onClick={props.hideSignUpModal} data-dismiss="modal">Close</button>
                            <button id="signUpButton" className="btn btn-light" type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default SignUp;
