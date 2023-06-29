import React from "react";

const AdvancedSettings = props => {
  const {
    handleChange,
    canUserUpdateEmail,
    canUserUpdatePassword,
    email,
    newEmail,
    newPassword,
    confirmNewPassword,
    disableUpdateEmailButton,
    unableToLoadDatabase
  } = props;

  return (
    <React.Fragment>
      {
        unableToLoadDatabase ?
          (
            null
          ) : (
            <React.Fragment>
              <form className="row">
                <div className="col-md-4 bottomMarginMobileDisplay">
                  <label htmlFor="newEmailInput"><strong>Update Email:</strong></label>
                </div>
                <div className="col-md-4">
                  <input
                    id="newEmailInput"
                    type="text"
                    onChange={handleChange}
                    value={newEmail}
                    name="newEmail"
                    maxLength="50"
                    autoComplete="newEmailInput"
                    placeholder={email}
                  />
                </div>
                <br /><br />
                <div className="col-md-4">
                  <button
                    id="submitNewEmailButton"
                    title="Update Email"
                    type="submit"
                    onClick={canUserUpdateEmail}
                    disabled={disableUpdateEmailButton}>
                    Save
                  </button>
                </div>
              </form>
              <br />
            </React.Fragment>
          )
      }
      <form className="row">
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label><strong>Update Password:</strong></label>
        </div>
        <div className="col-md-4">
          <input
            id="newPasswordInput"
            type="password"
            onChange={handleChange}
            value={newPassword}
            name="newPassword"
            maxLength="50"
            placeholder="New Password"
          />
          <br /><br />
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
        <div className="col-md-4">
          <br />
          <button
            id="submitNewPasswordButton"
            title="Update Password"
            type="submit"
            onClick={canUserUpdatePassword}>
            Save
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AdvancedSettings;
