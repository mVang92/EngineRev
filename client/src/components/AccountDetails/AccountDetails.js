import React from "react";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";
import { defaults } from "../../assets/Defaults";

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
    confirmNewPassword,
    newBackgroundPicture,
    disableThemeToggleButton,
    downloadEventLogCsvFile,
    resetInputFields
  } = props;
  let uniqueUserId = showUniqueUserId ? "showUniqueUserId" : "hideUniqueUserId";
  let uniqueUserIdMask = showMaskUniqueUserId ? "showMaskUniqueUserId" : "hideMaskUniqueUserId";

  return (
    <div id="accountPage" className={`mt-3 box ${currentTheme.background}`}>
      <div className="row text-center">
        <div className="col-md-12"><label><h4>Account</h4></label></div>
      </div>
      <hr className={currentTheme.hr} />
      <BackToHomeButtonRow />
      <hr className={currentTheme.hr} />
      <div className={`row paddingDesktopDisplay ${currentTheme.accountDetails}`}>
        <div id="scrollableProfilePictureAccountDetails" className="col-md-4 text-center">
          <a href={userPhotoUrl} target="_blank">
            <img
              id="profilePicture"
              title={userDisplayName}
              src={userPhotoUrl}
              alt="Profile">
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
                    <span id="accountPageVehicleCount" className="text-danger">{defaults.errorLoadingVehicleCount}</span>
                  ) :
                  (
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
                  ) :
                  (
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
          <span id={uniqueUserIdMask}>{defaults.uniqueUserIdMask}</span>
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
              ) :
              (
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
          ) :
          (
            <React.Fragment>
              <div className="row">
                <div className="col-md-4 bottomMarginMobileDisplay">
                  <label><strong>Themes:</strong></label>
                </div>
                <div className="col-md-4 text-center">
                  <div className="row">
                    <div className="col-md-6 smallBottomMargin noWidthMobileDisplay">
                      <button
                        id="carSpaceThemeToggleButton"
                        title="CarSpace Theme"
                        type="button"
                        onClick={() => saveThemeForUser(defaults.carSpaceTheme)}
                        disabled={disableThemeToggleButton}>
                        CarSpace
                      </button>
                    </div>
                    <div className="col-md-6 smallBottomMargin noWidthMobileDisplay">
                      <button
                        id="lightThemeToggleButton"
                        title="Light Theme"
                        type="button"
                        onClick={() => saveThemeForUser(defaults.lightTheme)}
                        disabled={disableThemeToggleButton}>
                        Light
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 bottomMarginMobileDisplay noWidthMobileDisplay">
                      <button
                        id="greyThemeToggleButton"
                        title="Grey Theme"
                        type="button"
                        onClick={() => saveThemeForUser(defaults.greyTheme)}
                        disabled={disableThemeToggleButton}>
                        Grey
                      </button>
                    </div>
                    <div className="col-md-6 noWidthMobileDisplay">
                      <button
                        id="darkThemeToggleButton"
                        title="Dark Theme"
                        type="button"
                        onClick={() => saveThemeForUser(defaults.darkTheme)}
                        disabled={disableThemeToggleButton}>
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="removeMobileDisplay">
                <hr className={currentTheme.hr} />
                <div className="row">
                  <div className="col-md-4"><label><strong>Event Logs:</strong></label></div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 text-center">
                            <button
                              id="downloadEventLogsButton"
                              title="Download Event Logs"
                              type="button"
                              onClick={downloadEventLogCsvFile}>
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6"></div>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
              <hr className={currentTheme.hr} />
              <div className="row">
                <div className="col-md-4 bottomMarginMobileDisplay">
                  <label><strong>Update Background Picture:</strong></label>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        id={defaults.newBackgroundPictureInput}
                        type="text"
                        onChange={handleChange}
                        value={newBackgroundPicture}
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
                    <div className="col-md-6 noWidthMobileDisplay">
                      <button
                        id="submitNewBackgroundPictureButton"
                        title="Update Background Picture"
                        type="submit"
                        onClick={showUpdateBackgroundPictureModal}>
                        Submit
                      </button>
                    </div>
                    <div className="col-md-6 noWidthMobileDisplay">
                      <button
                        id="resetNewBackgroundPictureButton"
                        title="Reset Input Field"
                        onClick={event => resetInputFields(event, "newBackgroundPictureInput")}>
                        Reset
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
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label><strong>Update Profile Picture:</strong></label>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <input
                id={defaults.newProfilePictureInput}
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
            <div className="col-md-6 noWidthMobileDisplay">
              <button
                id="submitNewProfilePictureButton"
                title="Update Profile Picture"
                type="submit"
                onClick={showUpdateProfilePictureModal}>
                Submit
              </button>
            </div>
            <div className="col-md-6 noWidthMobileDisplay">
              <button
                id="resetNewProfilePictureButton"
                title="Reset Input Field"
                onClick={event => resetInputFields(event, "newProfilePictureInput")}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <form className="row">
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label><strong>Update Display Name:</strong></label>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <input
                id={defaults.newDisplayNameInput}
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
            <div className="col-md-6 noWidthMobileDisplay">
              <button
                id="submitNewDisplayNameButton"
                title="Update Display Name"
                type="submit"
                onClick={showUpdateDisplayNameModal}>
                Submit
              </button>
            </div>
            <div className="col-md-6 noWidthMobileDisplay">
              <button
                id="resetNewDisplayNameButton"
                title="Reset Input Field"
                onClick={event => resetInputFields(event, "newDisplayNameInput")}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
      <br />
      <form className="row">
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label><strong>Update Password:</strong></label>
        </div>
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
      </form>
      <hr className={currentTheme.hr} />
      <BottomActionButtons
        backToTopOfPage={backToTopOfPage}
      />
    </div>
  );
};

export default AccountDetails;
