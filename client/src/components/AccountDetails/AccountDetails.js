import React from "react";
import AdvancedSettings from "../../components/AdvancedSettings";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";
import ThemeSelection from "../../components/ThemeSelection";
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
    roles,
    userId,
    userAccountCreationTime,
    userAccountLastSignIn,
    saveThemeForUser,
    showUpdateBackgroundPictureModal,
    showUpdateProfilePictureModal,
    showUpdateDisplayNameModal,
    canUserUpdateEmail,
    canUserUpdatePassword,
    newEmail,
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
              alt="Profile"
            />
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
            <div className="col-md-5">
              {
                roles.length > 1
                  ? <label><strong>Roles:</strong></label>
                  : <label><strong>Role:</strong></label>
              }
            </div>
            <div id="userRole" className="col-md-7">
              {roles.join(", ")}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5"><label><strong>Theme:</strong></label></div>
            <div id="accountPageCurrentTheme" className="col-md-7 wrapword">{currentTheme.theme}</div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5"><label><strong>Vehicles:</strong></label></div>
            <div className="col-md-7">
              {
                loadingError
                  ? <span id="accountPageVehicleCount" className="text-danger">{defaults.errorLoadingVehicleCount}</span>
                  : <span id="accountPageVehicleCount">{vehicleCount}</span>
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
              <div className="removeMobileDisplay">
                <div className="row">
                  <div className="col-md-4"><label><strong>Event Logs:</strong></label></div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 text-left">
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
                <hr className={currentTheme.hr} />
              </div>
              <ThemeSelection
                saveThemeForUser={saveThemeForUser}
                disableThemeToggleButton={disableThemeToggleButton}
              />
              <hr className={currentTheme.hr} />
              <form className="row">
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
                        onClick={event => resetInputFields(event, defaults.newBackgroundPictureInput)}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <br />
            </React.Fragment>
          )
      }
      <form className="row">
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
                onClick={event => resetInputFields(event, defaults.newProfilePictureInput)}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
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
                onClick={event => resetInputFields(event, defaults.newDisplayNameInput)}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
      <hr className={currentTheme.hr} />
      <div className="row">
        <div className="col-md-12 text-center">
          <a
            id="advancedSettingsToggle"
            href=""
            title="Advanced"
            data-toggle="collapse"
            data-target="#advancedSettingsForm"
            aria-expanded="false"
            aria-controls="collapse">
            <strong>Advanced</strong>
            <svg width="1em" height="1em" viewBox="0 1 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </a>
        </div>
      </div>
      <div id="advancedSettingsForm" className="collapse smallMarginTop">
        <AdvancedSettings
          handleChange={handleChange}
          canUserUpdateEmail={canUserUpdateEmail}
          canUserUpdatePassword={canUserUpdatePassword}
          userEmail={userEmail}
          newEmail={newEmail}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
        />
      </div>
      <hr className={currentTheme.hr} />
      <BottomActionButtons
        backToTopOfPage={backToTopOfPage}
      />
    </div>
  );
};

export default AccountDetails;
