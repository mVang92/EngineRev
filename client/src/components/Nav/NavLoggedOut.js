import React from "react";

export const NavLoggedOut = props => {
    return (
        <React.Fragment>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.handleSignInModal(event)}>
                Sign In
            </div>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.handleSignUpModal(event)}>
                Sign Up
            </div>
        </React.Fragment>
    );
};