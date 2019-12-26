import React from "react";

export const NavLoggedOut = props => {
    return (
        <nav id="navBarLoggedOut" className="navbar navbar-expand-lg navbar-light">
            <a id="applicationName" className="navbar-brand" href="/">
                    CarSpace
                </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a id="signInNavButton" className="text-light nav-link" onClick={(event) => props.showSignInModal(event)}>
                            Sign In
                         </a>
                    </li>
                    <li className="nav-item">
                        <a id="signUpNavButton" className="nav-link" onClick={(event) => props.showSignUpModal(event)}>
                            Sign Up
                         </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};