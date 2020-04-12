import React from "react";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";

const AccountDetails = props => {
  const {
    handleChange,
    currentTheme,
    unableToLoadDatabase,
    backToTopOfPage,
    showUniqueUserId,
    showMaskUniqueUserId,
    showUniqueUserIdToPage,
    hideUniqueUserIdToPage,
    userPhotoUrl,
    userDisplayName,
    userEmail,
    vehicleCount,
    loadingError,
    admin,
    userId,
    userAccountCreationTime,
    userAccountLastSignIn,
    saveThemeForUser,
    showUpdateBackgroundPictureModal,
    showUpdateProfilePictureModal,
    showUpdateDisplayNameModal,
    updatePassword,
    newPassword,
    confirmNewPassword
  } = props;
  let uniqueUserId = showUniqueUserId ? "showUniqueUserId" : "hideUniqueUserId";
  let uniqueUserIdMask = showMaskUniqueUserId ? "showMaskUniqueUserId" : "hideMaskUniqueUserId";

  return (
    <div id="accountPage" className={`mt-3 box ${currentTheme.background}`}>
      <div className="row text-center">
        <div className="col-md-12">
          <label><h4>Account</h4></label>
        </div>
      </div>
      <BackToHomeButtonRow />
      <hr className={currentTheme.hr} />
      <div className={`row paddingDesktopDisplay ${currentTheme.accountDetails}`}>
        <div id="scrollableProfilePictureAccountDetails" className="col-md-4 text-center">
          <a href={userPhotoUrl} target="_blank">
            <img
              id="profilePicture"
              src={userPhotoUrl}
              alt="Invalid URL or Not Avaliable">
            </img>
          </a>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-5"><label><strong>Display Name:</strong></label></div>
            <div id="accountPageUserDisplayName" className="col-md-7 wrapword">{userDisplayName}</div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5"><label><strong>Email:</strong></label></div>
            <div id="accountPageUserEmail" className="col-md-7 wrapword">{userEmail}</div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5"><label><strong>Vehicles:</strong></label></div>
            <div className="col-md-7">
              {
                loadingError ?
                  (
                    <span id="accountPageVehicleCount" className="text-danger">Error Loading Vehicle Count</span>
                  ) : (
                    <span id="accountPageVehicleCount">{vehicleCount}</span>
                  )
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5"><label><strong>Role:</strong></label></div>
            <div className="col-md-7">
              {
                admin ?
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
          <label><span id={uniqueUserIdMask}>*****************************************</span></label>
          <span id={uniqueUserId}>{userId}</span>
        </div>
        <div className="col-md-4">
          {
            showUniqueUserId ?
              (
                <button
                  id="hideUniqueIdButton"
                  title="Hide Unique Id"
                  type="button"
                  className="cancelBtn"
                  onClick={hideUniqueUserIdToPage}>
                  Hide
                </button>
              ) : (
                <button
                  id="showUniqueIdButton"
                  title="Show Unique Id"
                  type="button"
                  className="cancelBtn"
                  onClick={showUniqueUserIdToPage}>
                  Show
                </button>
              )
          }
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"><label><strong>Account Creation Date:</strong></label></div>
        <div className="col-md-4">{userAccountCreationTime}</div>
        <div className="col-md-4"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"><label><strong>Last SignIn:</strong></label></div>
        <div className="col-md-4">{userAccountLastSignIn}</div>
        <div className="col-md-4"></div>
      </div>
      <hr className={currentTheme.hr} />
      {
        unableToLoadDatabase ?
          (
            null
          ) : (
            <React.Fragment>
              <div className="row">
                <div className="col-md-4"><label><strong>Themes:</strong></label></div>
                <div className="col-md-4 text-center">
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        id="carSpaceThemeToggleButton"
                        title="CarSpace Theme"
                        type="button"
                        onClick={event => saveThemeForUser(event, "carSpace")}>
                        CarSpace
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        id="lightThemeToggleButton"
                        title="Light Theme"
                        type="button"
                        onClick={event => saveThemeForUser(event, "light")}>
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
                        onClick={event => saveThemeForUser(event, "grey")}>
                        Grey
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        id="darkThemeToggleButton"
                        title="Dark Theme"
                        type="button"
                        onClick={event => saveThemeForUser(event, "dark")}>
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
              <hr className={currentTheme.hr} />
              <div className="row">
                <div className="col-md-4"><label><strong>Update Background Picture:</strong></label></div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        id="newBackgroundPicture"
                        type="text"
                        onChange={handleChange}
                        name="newBackgroundPicture"
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
                        id="submitNewBackgroundPictureButton"
                        title="Update Background Picture"
                        type="submit"
                        onClick={showUpdateBackgroundPictureModal}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
      }
      <br />
      <div className="row">
        <div className="col-md-4"><label><strong>Update Profile Picture:</strong></label></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <input
                id="newProfilePictureInput"
                type="text"
                onChange={handleChange}
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
                title="Update Profile Picture"
                type="submit"
                onClick={showUpdateProfilePictureModal}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"><label><strong>Update Display Name:</strong></label></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <input
                id="newDisplayNameInput"
                type="text"
                onChange={handleChange}
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
                onClick={showUpdateDisplayNameModal}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"><label><strong>Update Password:</strong></label></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <input
                id="newPasswordInput"
                type="password"
                onChange={handleChange}
                value={newPassword}
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
                onChange={handleChange}
                value={confirmNewPassword}
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
                onClick={updatePassword}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className={currentTheme.hr} />
      <BottomActionButtons
        backToTopOfPage={backToTopOfPage}
      />
    </div>
  );
};

export default AccountDetails;
