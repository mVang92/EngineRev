import React from "react";

export const NavLoggedOut = props => {
    return (
        <React.Fragment>
            <div id="signInNavButton" className="nav-item text-light nav-link underline" onClick={(event) => props.showSignInModal(event)}>
                Sign In
            </div>
            <div id="signUpNavButton" className="nav-item text-light nav-link underline" onClick={(event) => props.showSignUpModal(event)}>
                Sign Up
            </div>
        </React.Fragment>
    );
};