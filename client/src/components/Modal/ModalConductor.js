import React from "react";
import CreateAccountModal from "./CreateAccountModal.jsx";
import SignInModal from "./SignInModal.jsx";

const ModalConductor = props => {
    switch (props.currentModal) {
        case "Sign-Up":
            return <CreateAccountModal {...props} />;
        case "Sign-In":
            return <SignInModal {...props} />;
        default:
            return null;
    }
};

export default ModalConductor;
