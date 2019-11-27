import React from "react";

export const NavLoggedOut = props => {
    return (
        <React.Fragment>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.showSignInModal(event)}>
                Sign In
            </div>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.showSignUpModal(event)}>
                Sign Up
            </div>
        </React.Fragment>
    );
};