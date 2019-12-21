import React from "react";
import { Link } from "react-router-dom";

export const NavLoggedIn = props => {
    const userEmailForAccount = props.state.userEmailForAccount;
    const userAccountCreationTime = props.state.userAccountCreationTime;
    const userDisplayName = props.state.userDisplayName
    const accountPage = {
        pathname: "/account/" + props.state.userId,
        state: [
            userEmailForAccount,
            userAccountCreationTime,
            userDisplayName
        ]
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a id="applicationName" className="navbar-brand" href="/">
                CarSpace
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {
                        props.state.loggedin ? (
                            <Link to={accountPage}>
                                <li className="nav-item active">
                                    <div id="accountNavButton" className="nav-item nav-link" title="My Account">
                                        Account
                                    </div>
                                </li>
                            </Link>
                        ) : (
                                <li className="nav-item active">
                                    <div id="accountNavButton" className="nav-item nav-link" disabled>
                                        Account
                                    </div>
                                </li>
                            )
                    }
                    <li className="nav-item active">
                        <a id="signOutNavButton" className="nav-item nav-link" title="Sign Out" onClick={(event) => props.showSignOutModal(event)}>
                            Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};