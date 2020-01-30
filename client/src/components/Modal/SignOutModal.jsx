import React from "react";
import ReactModal from "react-modal";
import signOutImage from "../../images/signOut.png";

const SignOutModal = props => {

    return (
        <ReactModal
            isOpen={props.showSignOutModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img
                                    className="signOutImage"
                                    src={signOutImage}
                                    alt="warning"
                                />
                            </div>
                            <div className="col-md-10 text-center">
                                Are you sure you want to sign out?
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="doNotSignOutButton"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideSignOutModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="doSignOutButton"
                                title="Sign Out"
                                type="button"
                                className="cancelBtn"
                                onClick={props.handleSignOut}
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

export default SignOutModal;