import React from "react";
import Modal from "react-modal";
import createAccountLogo from "../../images/createAccount.png"

const SignIn = props => {
    return (
        <Modal
            isOpen={props.showSignInModal}
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <form className="modalBody" onSubmit={props.handleSignIn}>
                        <div className="modal-header">
                            <span><img id="createAccountLogo" src={createAccountLogo} alt="Create Account"></img>
                                <label><strong>Sign-In to Your Account</strong></label>
                            </span>
                        </div>
                        <hr />
                        <div className="modal-body text-center">
                            <input type="text" value={props.email} name="email" onChange={props.handleChange} placeholder="Email"></input>
                            <br /><br />
                            <input type="password" value={props.password} name="password" onChange={props.handleChange} placeholder="Password"></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={props.hideSignInModal} data-dismiss="modal">Close</button>
                            <button className="btn btn-light" type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default SignIn;
