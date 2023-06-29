import React from "react";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import PleaseWait from "../../components/PleaseWait";
import NoAuthorization from "../../components/NoAuthorization";
import AccountDetails from "../../components/AccountDetails";
import UpdateBackgroundPictureModal from "../../components/Modal/UpdateBackgroundPictureModal";
import UpdateProfilePictureModal from "../../components/Modal/UpdateProfilePictureModal";
import UpdateProfilePictureSuccessModal from "../../components/Modal/UpdateProfilePictureSuccessModal";
import UpdateDisplayNameSuccessModal from "../../components/Modal/UpdateDisplayNameSuccessModal";

const Account = props => {
  const {
    handleChange,
    loggedin,
    pageLoaded,
    pleaseWait,
    roles,
    email,
    displayName,
    profilePicture,
    newEmail,
    newPassword,
    confirmNewPassword,
    updateDisplayName,
    canUserUpdateEmail,
    canUserUpdatePassword,
    resetInputFields,
    downloadEventLogCsvFile,
    saveThemeForUser,
    updateBackgroundPicture,
    updateProfilePicture,
    backToTopOfPage,
    currentTheme,
    vehicleCount,
    errorMessage,
    userAccountCreationTime,
    userAccountLastSignIn,
    newBackgroundPicture,
    newProfilePicture,
    showUpdateBackgroundPictureModal,
    showUpdateProfilePictureModal,
    showUpdateProfilePictureSuccessModal,
    showUpdateDisplayNameSuccessModal,
    checkIfStringIsBlank,
    unableToLoadDatabase,
    disableThemeToggleButton,
    disableUpdateEmailButton,
    disableUpdateDisplayNameButton,
    disableUpdateProfilePictureButton,
    requestShowUpdateBackgroundPictureModal,
    requestHideUpdateBackgroundPictureModal,
    requestShowUpdateProfilePictureModal,
    requestHideUpdateProfilePictureModal,
    requestHideUpdateProfilePictureSuccessModal,
    requestHideUpdateDisplayNameSuccessModal
  } = props;

  return (
    <>
      {
        loggedin ?
          (
            pageLoaded ?
              (
                <>
                  <Container>
                    {
                      pleaseWait ?
                        (
                          <PleaseWait currentTheme={currentTheme} />
                        ) :
                        (
                          <AccountDetails
                            handleChange={handleChange}
                            profilePicture={profilePicture}
                            email={email}
                            displayName={displayName}
                            errorMessage={errorMessage}
                            vehicleCount={vehicleCount}
                            newBackgroundPicture={newBackgroundPicture}
                            userAccountCreationTime={userAccountCreationTime}
                            userAccountLastSignIn={userAccountLastSignIn}
                            updateDisplayName={updateDisplayName}
                            canUserUpdateEmail={canUserUpdateEmail}
                            canUserUpdatePassword={canUserUpdatePassword}
                            newEmail={newEmail}
                            newPassword={newPassword}
                            confirmNewPassword={confirmNewPassword}
                            downloadEventLogCsvFile={downloadEventLogCsvFile}
                            backToTopOfPage={backToTopOfPage}
                            requestShowUpdateBackgroundPictureModal={requestShowUpdateBackgroundPictureModal}
                            requestShowUpdateProfilePictureModal={requestShowUpdateProfilePictureModal}
                            saveThemeForUser={saveThemeForUser}
                            roles={roles}
                            disableThemeToggleButton={disableThemeToggleButton}
                            currentTheme={currentTheme}
                            unableToLoadDatabase={unableToLoadDatabase}
                            resetInputFields={resetInputFields}
                            disableUpdateEmailButton={disableUpdateEmailButton}
                            disableUpdateDisplayNameButton={disableUpdateDisplayNameButton}
                          />
                        )
                    }
                  </Container>
                  <UpdateBackgroundPictureModal
                    requestShowUpdateBackgroundPictureModal={requestShowUpdateBackgroundPictureModal}
                    requestHideUpdateBackgroundPictureModal={requestHideUpdateBackgroundPictureModal}
                    showUpdateBackgroundPictureModal={showUpdateBackgroundPictureModal}
                    updateBackgroundPicture={updateBackgroundPicture}
                    checkIfStringIsBlank={checkIfStringIsBlank}
                    newBackgroundPicture={newBackgroundPicture}
                    currentTheme={currentTheme}
                  />
                  <UpdateProfilePictureModal
                    requestShowUpdateProfilePictureModal={requestShowUpdateProfilePictureModal}
                    requestHideUpdateProfilePictureModal={requestHideUpdateProfilePictureModal}
                    showUpdateProfilePictureModal={showUpdateProfilePictureModal}
                    disableUpdateProfilePictureButton={disableUpdateProfilePictureButton}
                    updateProfilePicture={updateProfilePicture}
                    checkIfStringIsBlank={checkIfStringIsBlank}
                    newProfilePicture={newProfilePicture}
                    currentTheme={currentTheme}
                  />
                  <UpdateProfilePictureSuccessModal
                    showUpdateProfilePictureSuccessModal={showUpdateProfilePictureSuccessModal}
                    requestHideUpdateProfilePictureSuccessModal={requestHideUpdateProfilePictureSuccessModal}
                    currentTheme={currentTheme}
                  />
                  <UpdateDisplayNameSuccessModal
                    showUpdateDisplayNameSuccessModal={showUpdateDisplayNameSuccessModal}
                    requestHideUpdateDisplayNameSuccessModal={requestHideUpdateDisplayNameSuccessModal}
                    currentTheme={currentTheme}
                  />
                </>
              ) :
              (
                <Loading />
              )
          ) :
          (
            <NoAuthorization />
          )
      }
    </>
  );
};

export default Account;
