import React from "react";
import UpdatePageDetails from "../../components/UpdatePageDetails";
import Loading from "../../components/Loading";

const Updates = props => {
  const {
    handleChange,
    roles,
    allUpdates,
    updateChanges,
    knownIssues,
    updateChangesToShowInModal,
    knownIssuesToShowInModal,
    backToTopOfPage,
    currentTheme,
    addOneUpdate,
    showEditOneUpdateModal,
    editOneUpdateModal,
    requestShowDeleteOneUpdateModal,
    requestHideEditOneUpdateModal,
    requestHideDeleteOneUpdateModal,
    handleDeleteOneReleaseNote,
    showDeleteOneUpdateModal,
    disableConfirmSaveEditReleaseNoteButton,
    disableConfirmDeleteReleaseNoteButton,
    checkUserEnteredUpdatedReleaseNoteInput
  } = props;

  return (
    <>
      {
        allUpdates ?
          (
            <UpdatePageDetails
              currentTheme={currentTheme}
              roles={roles}
              handleChange={handleChange}
              addOneUpdate={addOneUpdate}
              updateChanges={updateChanges}
              knownIssues={knownIssues}
              allUpdates={allUpdates}
              backToTopOfPage={backToTopOfPage}
              checkUserEnteredUpdatedReleaseNoteInput={checkUserEnteredUpdatedReleaseNoteInput}
              showEditOneUpdateModal={showEditOneUpdateModal}
              editOneUpdateModal={editOneUpdateModal}
              requestShowDeleteOneUpdateModal={requestShowDeleteOneUpdateModal}
              requestHideEditOneUpdateModal={requestHideEditOneUpdateModal}
              updateChangesToShowInModal={updateChangesToShowInModal}
              knownIssuesToShowInModal={knownIssuesToShowInModal}
              disableConfirmSaveEditReleaseNoteButton={disableConfirmSaveEditReleaseNoteButton}
              handleDeleteOneReleaseNote={handleDeleteOneReleaseNote}
              showDeleteOneUpdateModal={showDeleteOneUpdateModal}
              requestHideDeleteOneUpdateModal={requestHideDeleteOneUpdateModal}
              disableConfirmDeleteReleaseNoteButton={disableConfirmDeleteReleaseNoteButton}
            />
          ) :
          (
            <Loading />
          )
      }
    </>
  );
};

export default Updates;
