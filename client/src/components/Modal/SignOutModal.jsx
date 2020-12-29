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
            onRequestClose={props.requestHideSignOutModal}
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
                            <div className="col-md-10 text-center"><label>Are you sure you want to sign out?</label></div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="doNotSignOutButton"
                                title="No"
                                type="button"
                                className="cancelBtn"
                                onClick={props.requestHideSignOutModal}
                                data-dismiss="modal">
                                No
                            </button>
                            <button
                                id="doSignOutButton"
                                title="Yes"
                                type="button"
                                className="standardButton"
                                onClick={props.handleSignOut}
                                data-dismiss="modal"
                                disabled={props.disableDoSignOutButton}>
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