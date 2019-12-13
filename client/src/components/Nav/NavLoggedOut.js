import React from "react";
import carSpaceLogo from "../../images/carSpaceLogo.png";

export const NavLoggedOut = props => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand underline" href="/">
                <img id="applicationLogo" src={carSpaceLogo} alt="applicationLogo"></img>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a id="signInNavButton" className="text-light nav-link" onClick={(event) => props.showSignInModal(event)}>
                            Sign In
                         </a>
                    </li>
                    <li class="nav-item">
                        <a id="signUpNavButton" className="text-light nav-link" onClick={(event) => props.showSignUpModal(event)}>
                            Sign Up
                         </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};