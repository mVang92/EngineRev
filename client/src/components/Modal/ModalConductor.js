import React from "react";
import CreateAccountModal from "./CreateAccountModal.jsx";
import SignInModal from "./SignInModal.jsx";
import SignOutModal from "./SignOutModal.jsx";

const ModalConductor = props => {
    switch (props.currentModal) {
        case "Sign-Up":
            return <CreateAccountModal {...props} />;
        case "Sign-In":
            return <SignInModal {...props} />;
        case "Sign-Out":
            return <SignOutModal {...props} />;
        default:
            return null;
    }
};

export default ModalConductor;
