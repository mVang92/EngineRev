import React from "react";

const AdvancedSettings = props => {
  const {
    handleChange,
    canUserUpdateEmail,
    canUserUpdatePassword,
    userEmail,
    newEmail,
    newPassword,
    confirmNewPassword,
    disableUpdateEmailButton
  } = props;

  return (
    <React.Fragment>
      <form className="row">
        <div className="col-md-4 bottomMarginMobileDisplay">
          <label><strong>Update Email:</strong></label>
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
            placeholder={userEmail}
          />
        </div>
        <br /><br />
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <button
                id="submitNewEmailButton"
                title="Update Email"
                type="submit"
                onClick={canUserUpdateEmail}
                disabled={disableUpdateEmailButton}>
                Submit
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
                onClick={canUserUpdatePassword}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AdvancedSettings;
