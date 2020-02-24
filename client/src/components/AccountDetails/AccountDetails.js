import React, { Component } from "react";
import { Link } from "react-router-dom";

class AccountDetails extends Component {
  render() {
    const { currentTheme, unableToLoadDatabase } = this.props;
    let uniqueUserId = this.props.showUniqueUserId ? "showUniqueUserId" : "hideUniqueUserId";
    let uniqueUserIdMask = this.props.showMaskUniqueUserId ? "showMaskUniqueUserId" : "hideMaskUniqueUserId";

    return (
      <div id="accountPage" className={`mt-3 box ${currentTheme.background}`}>
        <div className="row text-center">
          <div className="col-md-12">
            <label><h4>Account</h4></label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Link to={{ pathname: "/" }}>
              <button className="backHomeBtn">Back</button>
            </Link>
            <br />
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>
        <hr className={currentTheme.hr} />
        <div className={`row paddingDesktopDisplay ${currentTheme.accountDetails}`}>
          <div id="scrollableProfilePictureAccountDetails" className="col-md-4 text-center">
            <a href={this.props.userPhotoUrl} target="_blank">
              <img
                id="profilePicture"
                src={this.props.userPhotoUrl}
                alt="Invalid URL or Not Avaliable">
              </img>
            </a>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-5"><label><strong>Display Name:</strong></label></div>
              <div id="accountPageUserDisplayName" className="col-md-7 wrapword">{this.props.userDisplayName}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-5"><label><strong>Email:</strong></label></div>
              <div id="accountPageUserEmail" className="col-md-7 wrapword">{this.props.userEmail}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-5"><label><strong>Vehicles:</strong></label></div>
              <div className="col-md-7">
                {
                  this.props.loadingError ?
                    (
                      <span id="accountPageVehicleCount" className="text-danger">Error Loading Vehicle Count</span>
                    ) : (
                      <span id="accountPageVehicleCount">{this.props.vehicleCount}</span>
                    )
                }
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-5"><label><strong>Role:</strong></label></div>
              <div className="col-md-7">
                {
                  this.props.admin ?
                    (
                      <span id="userRole">Administrator</span>
                    ) : (
                      <span id="userRole">User</span>
                    )
                }
              </div>
            </div>
          </div>
        </div>
        <hr className={currentTheme.hr} />
        <div className="row">
          <div className="col-md-4"><label><strong>Unique User Id:</strong></label></div>
          <div className="col-md-4">
            <span id={uniqueUserIdMask}>*****************************************</span>
            <span id={uniqueUserId}>{this.props.userId}</span>
          </div>
          <div className="col-md-4">
            {
              this.props.showUniqueUserId ?
                (
                  <button
                    id="hideUniqueIdButton"
                    title="Hide Unique Id"
                    type="button"
                    className="cancelBtn"
                    onClick={this.props.hideUniqueUserIdToPage}>
                    Hide
                  </button>
                ) : (
                  <button
                    id="showUniqueIdButton"
                    title="Show Unique Id"
                    type="button"
                    className="cancelBtn"
                    onClick={this.props.showUniqueUserIdToPage}>
                    Show
                  </button>
                )
            }
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Account Creation Date:</strong></label></div>
          <div className="col-md-4">{this.props.userAccountCreationTime}</div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Last SignIn:</strong></label></div>
          <div className="col-md-4">{this.props.userAccountLastSignIn}</div>
          <div className="col-md-4"></div>
        </div>
        {
          unableToLoadDatabase ?
            (
              null
            ) : (
              <React.Fragment>
                <hr className={currentTheme.hr} />
                <div className="row">
                  <div className="col-md-4"><label><strong>Themes</strong></label></div>
                  <div className="col-md-4 text-center">
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          id="carSpaceThemeToggleButton"
                          title="CarSpace Theme"
                          type="button"
                          onClick={event => this.props.saveThemeForUser(event, "carSpace")}>
                          CarSpace
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          id="lightThemeToggleButton"
                          title="Light Theme"
                          type="button"
                          onClick={event => this.props.saveThemeForUser(event, "light")}>
                          Light
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          id="greyThemeToggleButton"
                          title="Grey Theme"
                          type="button"
                          onClick={event => this.props.saveThemeForUser(event, "grey")}>
                          Grey
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          id="darkThemeToggleButton"
                          title="Dark Theme"
                          type="button"
                          onClick={event => this.props.saveThemeForUser(event, "dark")}>
                          Dark
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </React.Fragment>
            )
        }
        <hr className={currentTheme.hr} />
        <form onSubmit={this.props.showUpdateProfilePictureModal}>
          <div className="row">
            <div className="col-md-4"><label><strong>Update Profile Picture:</strong></label></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <input
                    id="newProfilePictureInput"
                    type="text"
                    ref="newProfilePicture"
                    onChange={this.props.handleChange}
                    value={this.props.newProfilePicture}
                    name="newProfilePicture"
                    maxLength="500"
                    placeholder="Insert photo URL"
                  />
                </div>
              </div>
            </div>
            <br /><br />
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <button
                    id="submitNewProfilePictureButton"
                    title="Update Picture"
                    type="submit"
                    onClick={this.props.showUpdateProfilePictureModal}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <br />
        <form onSubmit={this.props.updateDisplayName}>
          <div className="row">
            <div className="col-md-4"><label><strong>Update Display Name:</strong></label></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <input
                    id="newDisplayNameInput"
                    type="text"
                    ref="newDisplayName"
                    onChange={this.props.handleChange}
                    value={this.props.newDisplayName}
                    name="newDisplayName"
                    maxLength="50"
                  />
                </div>
              </div>
            </div>
            <br /><br />
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <button
                    id="submitNewDisplayNameButton"
                    title="Update Name"
                    type="submit"
                    onClick={this.props.showUpdateDisplayNameModal}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <br />
        <form onSubmit={this.props.updatePassword}>
          <div className="row">
            <div className="col-md-4"><label><strong>Update Password:</strong></label></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <input
                    id="newPasswordInput"
                    type="password"
                    ref="newPassword"
                    onChange={this.props.handleChange}
                    value={this.props.newPassword}
                    name="newPassword"
                    maxLength="50"
                    placeholder="New Password"
                  />
                </div>
                <br /><br />
                <div className="col-md-12">
                  <input
                    id="confirmNewPasswordInput"
                    type="password"
                    ref="confirmNewPassword"
                    onChange={this.props.handleChange}
                    value={this.props.confirmNewPassword}
                    name="confirmNewPassword"
                    maxLength="50"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12"></div>
                <br />
                <div className="col-md-12">
                  <button
                    id="submitNewPasswordButton"
                    title="Update Password"
                    type="submit"
                    onClick={this.props.updatePassword}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr className={currentTheme.hr} />
        <Link to={{ pathname: "/" }}>
          <button className="backHomeBtn">Back</button>
        </Link>
      </div>
    );
  }
};

export default AccountDetails;
