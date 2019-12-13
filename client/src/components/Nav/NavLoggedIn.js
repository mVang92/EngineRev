import React from "react";
import carSpaceLogo from "../../images/carSpaceLogo.png";

export const NavLoggedIn = props => {
    return (
        <React.Fragment>
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
                            <a id="signOutNavButton" className="nav-item nav-link underline" onClick={(event) => props.showSignOutModal(event)}>
                                Sign Out
                         </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};