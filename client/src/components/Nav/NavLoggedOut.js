import React from "react";

export const NavLoggedOut = (props) => {
    return (
        <React.Fragment>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.logOutHandler(event)}>
                Sign In
            </div>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.logOutHandler(event)}>
                Sign Up
            </div>
        </React.Fragment>
    );
};