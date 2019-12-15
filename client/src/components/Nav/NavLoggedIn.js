import React from "react";

export const NavLoggedIn = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a id="applicationName" className="navbar-brand underline" href="/">
                CarSpace
                </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a id="signOutNavButton" className="nav-item nav-link underline" onClick={(event) => props.showSignOutModal(event)}>
                            Sign Out
                         </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};