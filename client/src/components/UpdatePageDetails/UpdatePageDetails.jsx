import React from "react";
import OneUpdate from "../../components/OneUpdate";
import AddUpdates from "../../components/AddUpdates";
import EditOneUpdateModal from "../../components/Modal/EditOneUpdateModal";
import DeleteOneUpdateModal from "../../components/Modal/DeleteOneUpdateModal";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";

const UpdatePageDetails = props => {
    const {
        currentTheme,
        admin,
        handleChange,
        addOneUpdate,
        updateChanges,
        knownIssues,
        allUpdates,
        getActionValue,
        backToTopOfPage,
        checkUserEnteredUpdatedReleaseNoteInput,
        showEditOneUpdateModal,
        editOneUpdateModal,
        deleteOneUpdateModal,
        hideEditOneUpdateModal,
        updateChangesToShowInModal,
        knownIssuesToShowInModal,
        disableConfirmSaveEditReleaseNoteButton,
        handleDeleteOneReleaseNote,
        showDeleteOneUpdateModal,
        hideDeleteOneUpdateModal,
        disableConfirmDeleteReleaseNoteButton
    } = props;

    return (
        <div className="container largeBottomMarginMobileDisplay">
            <div id="updatesContainer" className={currentTheme.background}>
                <div id="pageTitle"></div>
                <h4 className="text-center"><label>Release Notes and Updates</label></h4>
                <hr className={currentTheme.hr} />
                <BackToHomeButtonRow />
                <hr className={currentTheme.hr} />
                {
                    admin ?
                        (
                            <AddUpdates
                                handleChange={handleChange}
                                addOneUpdate={addOneUpdate}
                                updateChanges={updateChanges}
                                knownIssues={knownIssues}
                                currentTheme={currentTheme}
                            />
                        ) : (
                            null
                        )
                }
                {
                    allUpdates.map(update => {
                        return (
                            <OneUpdate
                                key={update._id}
                                _id={update._id}
                                date={update.date}
                                updateChanges={update.updateChanges}
                                knownIssues={update.knownIssues}
                                getActionValue={getActionValue}
                                currentTheme={currentTheme}
                                admin={admin}
                                editOneUpdateModal={editOneUpdateModal}
                            />
                        )
                    })
                }
                <br />
                <BottomActionButtons backToTopOfPage={backToTopOfPage} />
                <EditOneUpdateModal
                    checkUserEnteredUpdatedReleaseNoteInput={checkUserEnteredUpdatedReleaseNoteInput}
                    showEditOneUpdateModal={showEditOneUpdateModal}
                    hideEditOneUpdateModal={hideEditOneUpdateModal}
                    handleChange={handleChange}
                    currentTheme={currentTheme}
                    updateChangesToShowInModal={updateChangesToShowInModal}
                    knownIssuesToShowInModal={knownIssuesToShowInModal}
                    disableConfirmSaveEditReleaseNoteButton={disableConfirmSaveEditReleaseNoteButton}
                    deleteOneUpdateModal={deleteOneUpdateModal}
                />
                <DeleteOneUpdateModal
                    handleDeleteOneReleaseNote={handleDeleteOneReleaseNote}
                    showDeleteOneUpdateModal={showDeleteOneUpdateModal}
                    hideDeleteOneUpdateModal={hideDeleteOneUpdateModal}
                    handleChange={handleChange}
                    currentTheme={currentTheme}
                    disableConfirmDeleteReleaseNoteButton={disableConfirmDeleteReleaseNoteButton}
                />
            </div>
        </div>
    );
};

export default UpdatePageDetails;
