import React from "react";
import SignOutModal from "../../components/Modal/SignOutModal";
import { Link } from "react-router-dom";

export const NavLoggedIn = props => {
    const {
        userEmailForAccount,
        userAccountCreationTime,
        userAccountLastSignIn,
        userDisplayName,
        userProfilePicture,
        userId
    } = props;
    const accountPage = {
        pathname: "/account/" + userId,
        state: [
            userEmailForAccount,
            userAccountCreationTime,
            userDisplayName,
            userProfilePicture,
            userAccountLastSignIn
        ]
    };

    return (
        <React.Fragment>
            <div className="navbar row">
                <div className="col-md-2 noWidthMobileDisplay">
                    <Link to={{ pathname: "/" }}>
                        <span id="applicationName" className="navbar-brand">CarSpace</span>
                    </Link>
                </div>
                <div className="col-md-9 noWidthMobileDisplay"></div>
                <div className="col-md-1 text-right noWidthMobileDisplay">
                    <div id="menuDropdownContainer" className="btn-group">
                        <button
                            id="menuDropdownButton"
                            type="button"
                            className="btn dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Menu
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            {
                                props.loggedin ?
                                    (
                                        <Link to={accountPage}>
                                            <button
                                                id="accountNavButton"
                                                className="dropdown-item"
                                                type="button">
                                                <div className="nav-item" title="Account">Account</div>
                                            </button>
                                        </Link>
                                    ) :
                                    (
                                        <button
                                            id="accountNavButton"
                                            className="dropdown-item"
                                            type="button"
                                            disabled>
                                            <div className="nav-item" title="Account">Account</div>
                                        </button>
                                    )
                            }
                            <Link to={{ pathname: "/forum" }}>
                                <button
                                    id="forumNavButton"
                                    className="dropdown-item"
                                    type="button">
                                    <div className="nav-item" title="Forum">Forum</div>
                                </button>
                            </Link>
                            <Link to={{ pathname: "/updates" }}>
                                <button
                                    id="accountReleaseNotesButton"
                                    className="dropdown-item"
                                    type="button">
                                    <div className="nav-item" title="Release Notes">Release Notes</div>
                                </button>
                            </Link>
                            <Link to={{ pathname: "/about" }}>
                                <button
                                    id="accountAboutButton"
                                    className="dropdown-item"
                                    type="button">
                                    <div className="nav-item" title="About">About</div>
                                </button>
                            </Link>
                            <button
                                id="signOutNavButton"
                                className="dropdown-item"
                                type="button"
                                onClick={() => props.requestShowSignOutModal()}>
                                <div className="nav-item" title="Sign Out">Sign Out</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SignOutModal
                showSignOutModal={props.showSignOutModal}
                requestHideSignOutModal={props.requestHideSignOutModal}
                handleSignOut={props.handleSignOut}
            />
        </React.Fragment>
    );
};
