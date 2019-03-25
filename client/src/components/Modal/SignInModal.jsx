import React from "react";
import ReactModal from "react-modal";
import createAccountLogo from "../../images/createAccount.png"

const SignIn = props => {

    return (
        <ReactModal
            isOpen={props.showModal}
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <form className="modalBody" onSubmit={props.handleSignIn}>
                        <div className="modal-header">
                            <span><img id="createAccountLogo" src={createAccountLogo} alt="Create Account"></img>
                                <strong>Sign-In to Your Account</strong></span>
                        </div>
                        <hr />
                        <div className="modal-body text-center">
                            <input type="text" value={props.email} name="email" onChange={props.handleChange} placeholder="Email"></input>
                            <br /><br />
                            <input type="password" value={props.password} name="password" onChange={props.handleChange} placeholder="Password"></input>
                            <div className="row">
                                <div id="error" className="col-12 text-danger"></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={props.handleCloseModal} data-dismiss="modal">Close</button>
                            <button className="btn btn-light" type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    );
};

export default SignIn;
