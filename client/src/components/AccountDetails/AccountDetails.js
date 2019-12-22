import React, { Component } from "react";

class AccountDetails extends Component {
  render() {
    let uniqueUserId = this.props.showUniqueUserId ? "showUniqueUserId" : "hideUniqueUserId";
    let uniqueUserIdMask = this.props.showMaskUniqueUserId ? "showMaskUniqueUserId" : "hideMaskUniqueUserId";

    return (
      <div id="accountPage" className="mt-3 box">
        <div className="row">
          <div className="col-md-12 text-center"><label><strong>My Account</strong></label></div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4"><label><strong>Profile Picture:</strong></label></div>
          <div className="col-md-4 text-center">
            <img
              id="profilePicture"
              src={this.props.userPhotoUrl}
              alt="Invalid URL or Not Avaliable">
            </img>
          </div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Email:</strong></label></div>
          <div className="col-md-4">{this.props.userEmail}</div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Display Name:</strong></label></div>
          <div className="col-md-4">{this.props.userDisplayName}</div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Unique User Id:</strong></label></div>
          <div className="col-md-4">
            <span id={uniqueUserIdMask}>*****************************************</span>
            <span id={uniqueUserId}>{this.props.userId}</span>
          </div>
          <div className="col-md-4">
            {
              this.props.showUniqueUserId ? (
                <button
                  id="hideUniqueIdButton"
                  title="Hide Unique Id"
                  type="button"
                  className="cancelBtn"
                  onClick={this.props.hideUniqueUserIdToPage}
                >
                  Hide
                  </button>
              ) : (
                  <button
                    id="showUniqueIdButton"
                    title="Show Unique Id"
                    type="button"
                    className="cancelBtn"
                    onClick={this.props.showUniqueUserIdToPage}
                  >
                    Show
                    </button>
                )
            }
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Vehicles On Record:</strong></label></div>
          <div className="col-md-4">
            {
              this.props.loadingError ? (
                <span className="text-danger">Error Loading Vehicle Count</span>
              ) : (
                  <span>{this.props.vehicleCount}</span>
                )
            }
          </div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4"><label><strong>Account Creation Date:</strong></label></div>
          <div className="col-md-4">{this.props.userAccountCreationTime}</div>
          <div className="col-md-4"></div>
        </div>
        <hr />
        <form onSubmit={this.props.showUpdateProfilePictureModal}>
          <div className="row">
            <div className="col-md-4"><label><strong>Update Profile Picture:</strong></label></div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <input
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
                    type="submit"
                    onClick={this.props.showUpdateProfilePictureModal}
                  >
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
                    type="submit"
                    onClick={this.props.updateDisplayName}
                  >
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
                <br /><br />
                <div className="col-md-12">
                  <button
                    id="submitNewPasswordButton"
                    type="submit"
                    onClick={this.props.updatePassword}
                  >
                    Submit
                        </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
        <a href="/"><button className="backHomeBtn">Back Home</button></a>
        <br />
      </div>
    );
  }
};

export default AccountDetails;
