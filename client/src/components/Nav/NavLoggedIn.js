import React from "react";
import { Link } from "react-router-dom";

export const NavLoggedIn = props => {
    const userEmailForAccount = props.state.userEmailForAccount;
    const userAccountCreationTime = props.state.userAccountCreationTime;
    const userAccountLastSignIn = props.state.userAccountLastSignIn;
    const userDisplayName = props.state.userDisplayName;
    const userPhotoUrl = props.state.userPhotoUrl;
    const accountPage = {
        pathname: "/account/" + props.state.userId,
        state: [
            userEmailForAccount,
            userAccountCreationTime,
            userDisplayName,
            userPhotoUrl,
            userAccountLastSignIn
        ]
    };

    return (
        <div className="navbar row">
            <div className="col-md-2 noWidthMobileDisplay">
                <Link to={{ pathname: "/" }}>
                    <span id="applicationName" className="navbar-brand">
                        CarSpace
                    </span>
                </Link>
            </div>
            <div className="col-md-9 noWidthMobileDisplay"></div>
            <div className="col-md-1 text-right noWidthMobileDisplay">
                <div id="menuDropdownContainer" className="btn-group">
                    <button id="menuDropdownButton" type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="caret">Menu</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {
                            props.state.loggedin ? (
                                <Link to={accountPage}>
                                    <button id="accountNavButton" className="dropdown-item" type="button">
                                        <div className="nav-item" title="My Account">
                                            Account
                                        </div>
                                    </button>
                                </Link>
                            ) : (
                                    <button id="accountNavButton" className="dropdown-item" type="button" disabled>
                                        <div className="nav-item" title="My Account">
                                            Account
                                        </div>
                                    </button>
                                )
                        }
                        <Link to={{ pathname: "/about" }}>
                            <button id="accountAboutButton" className="dropdown-item" type="button">
                                <div className="nav-item" title="About">
                                    About
                                </div>
                            </button>
                        </Link>
                        <Link to={{ pathname: "/updates" }}>
                            <button id="accountReleaseNotesButton" className="dropdown-item" type="button">
                                <div className="nav-item" title="Release Notes">
                                    Release Notes
                                </div>
                            </button>
                        </Link>
                        <button id="signOutNavButton" className="dropdown-item" type="button" onClick={(event) => props.showSignOutModal(event)}>
                            <li className="nav-item">
                                <div className="nav-item" title="Sign Out" >
                                    Sign Out
                                </div>
                            </li>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // <nav className="navbar navbar-expand-lg navbar-light">
        //     <Link to={{ pathname: "/" }}>
        //         <span id="applicationName" className="navbar-brand">
        //             CarSpace
        //         </span>
        //     </Link>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarNav">
        //         <ul className="navbar-nav">


        //         </ul>
        //     </div>
        // </nav>
    );
};
