import React from "react";

export const NavLoggedIn = props => {
    return (
        <React.Fragment>
            <div className="nav-item text-light nav-link underline" onClick={(event) => props.showSignOutModal(event)}>
                Sign Out
            </div>
        </React.Fragment>
    );
};