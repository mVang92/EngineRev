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
    profilePicture,
    displayName,
    email,
    vehicleCount,
    errorMessage,
    roles,
    userAccountCreationTime,
    userAccountLastSignIn,
    saveThemeForUser,
    requestShowUpdateBackgroundPictureModal,
    requestShowUpdateProfilePictureModal,
    canUserUpdateEmail,
    canUserUpdatePassword,
    newEmail,
    newPassword,
    confirmNewPassword,
    newBackgroundPicture,
    disableThemeToggleButton,
    downloadEventLogCsvFile,
    resetInputFields,
    disableUpdateEmailButton,
    disableUpdateDisplayNameButton,
    updateDisplayName
  } = props;
  
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
          <a href={profilePicture} target="_blank">
            <img
              id="profilePicture"
              title={displayName}
              src={profilePicture}
              alt={displayName}
            />
          </a>
        </div>
        <div className="col-md-8">
          <div className="row fadeIn1">
            <div className="col-md-5"><label><strong>Display Name:</strong></label></div>
            <div id="accountPageUserDisplayName" className="col-md-7 wrapword">{displayName}</div>
          </div>
          <br />
          <div className="row fadeIn2">
            <div className="col-md-5"><label><strong>Email:</strong></label></div>
            <div id="accountPageUserEmail" className="col-md-7 wrapword">{email}</div>
          </div>
          <br />
          <div className="row fadeIn3">
            <div className="col-md-5">
              <label><strong>{roles.length > 1 ? "Roles" : "Role"}:</strong></label>
            </div>
            <div id="userRole" className="col-md-7">{roles.join(", ")}</div>
          </div>
          <br />
          <div className="row fadeIn4">
            <div className="col-md-5"><label><strong>Theme:</strong></label></div>
            <div id="accountPageCurrentTheme" className="col-md-7 wrapword">{currentTheme.theme}</div>
          </div>
          <br />
          <div className="row fadeIn5">
            <div className="col-md-5"><label><strong>Vehicles:</strong></label></div>
            <div className="col-md-7">
              {
                errorMessage
                  ? <span id="accountPageVehicleCount" className="text-danger">{defaults.errorLoadingVehicleCount}</span>
                  : <span id="accountPageVehicleCount">{vehicleCount}</span>
              }
            </div>
          </div>
        </div>
      </div>
      <hr className={currentTheme.hr} />
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
            <>
              <div className="removeMobileDisplay">
                <div className="row">
                  <div className="col-md-4"><label><strong>Event Logs:</strong></label></div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-left">
                          <button
                            id="downloadEventLogsButton"
                            title="Download Event Logs"
                            type="button"
                            onClick={downloadEventLogCsvFile}>
                            Download
                          </button>
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
                currentTheme={currentTheme}
              />
              <hr className={currentTheme.hr} />
              <form className="row">
                <div className="col-md-4 bottomMarginMobileDisplay">
                  <label htmlFor={defaults.newBackgroundPictureInput}><strong>Update Background Picture:</strong></label>
                </div>
                <div className="col-md-4">
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
                <br /><br />
                <div className="col-md-4">
                  <button
                    id="submitNewBackgroundPictureButton"
                    title="Update Background Picture"
                    type="submit"
                    onClick={requestShowUpdateBackgroundPictureModal}>
                    Save
                  </button>
                  <button
                    id="resetNewBackgroundPictureButton"
                    title="Reset Input Field"
                    onClick={event => resetInputFields(event, defaults.newBackgroundPictureInput)}>
                    Reset
                  </button>
                </div>
              </form>
              <br />
            </>
          )
      }
      <form className="row">
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label htmlFor={defaults.newProfilePictureInput}><strong>Update Profile Picture:</strong></label>
        </div>
        <div className="col-md-4">
          <input
            id={defaults.newProfilePictureInput}
            type="text"
            onChange={handleChange}
            name="newProfilePicture"
            maxLength="500"
            placeholder="Insert photo URL"
          />
        </div>
        <br /><br />
        <div className="col-md-4">
          <button
            id="submitNewProfilePictureButton"
            title="Update Profile Picture"
            type="submit"
            onClick={requestShowUpdateProfilePictureModal}>
            Save
          </button>
          <button
            id="resetNewProfilePictureButton"
            title="Reset Input Field"
            onClick={event => resetInputFields(event, defaults.newProfilePictureInput)}>
            Reset
          </button>
        </div>
      </form>
      <br />
      <form className="row">
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label htmlFor={defaults.newDisplayNameInput}><strong>Update Display Name:</strong></label>
        </div>
        <div className="col-md-4">
          <input
            id={defaults.newDisplayNameInput}
            type="text"
            onChange={handleChange}
            name="newDisplayName"
            maxLength="50"
            placeholder={displayName}
          />
        </div>
        <br /><br />
        <div className="col-md-4">
          <button
            id="submitNewDisplayNameButton"
            title="Update Display Name"
            type="submit"
            disabled={disableUpdateDisplayNameButton}
            onClick={updateDisplayName}>
            Save
          </button>
          <button
            id="resetNewDisplayNameButton"
            title="Reset Input Field"
            onClick={event => resetInputFields(event, defaults.newDisplayNameInput)}>
            Reset
          </button>
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
          email={email}
          newEmail={newEmail}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          disableUpdateEmailButton={disableUpdateEmailButton}
          unableToLoadDatabase={unableToLoadDatabase}
        />
      </div>
      <hr className={currentTheme.hr} />
      <BottomActionButtons backToTopOfPage={backToTopOfPage} />
    </div>
  );
};

export default AccountDetails;
