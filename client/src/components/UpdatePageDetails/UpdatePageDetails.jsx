import React from "react";
import OneUpdate from "../../components/OneUpdate";
import AddUpdates from "../../components/AddUpdates";
import { defaults } from "../../assets/Defaults";
import EditOneUpdateModal from "../../components/Modal/EditOneUpdateModal";
import DeleteOneUpdateModal from "../../components/Modal/DeleteOneUpdateModal";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";

const UpdatePageDetails = props => {
    const {
        currentTheme,
        roles,
        handleChange,
        addOneUpdate,
        updateChanges,
        knownIssues,
        allUpdates,
        backToTopOfPage,
        checkUserEnteredUpdatedReleaseNoteInput,
        showEditOneUpdateModal,
        editOneUpdateModal,
        requestShowDeleteOneUpdateModal,
        requestHideEditOneUpdateModal,
        updateChangesToShowInModal,
        knownIssuesToShowInModal,
        disableConfirmSaveEditReleaseNoteButton,
        handleDeleteOneReleaseNote,
        showDeleteOneUpdateModal,
        requestHideDeleteOneUpdateModal,
        disableConfirmDeleteReleaseNoteButton
    } = props;

    return (
        <div className="container">
            <div id="updatesContainer" className={currentTheme.background}>
                <div id="pageTitle"></div>
                <h4 className="text-center"><label>Release Notes and Updates</label></h4>
                <hr className={currentTheme.hr} />
                <BackToHomeButtonRow />
                <hr className={currentTheme.hr} />
                {
                    roles.includes(defaults.adminRole) ?
                        (
                            <AddUpdates
                                handleChange={handleChange}
                                addOneUpdate={addOneUpdate}
                                updateChanges={updateChanges}
                                knownIssues={knownIssues}
                                currentTheme={currentTheme}
                            />
                        ) :
                        (
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
                                currentTheme={currentTheme}
                                roles={roles}
                                editOneUpdateModal={editOneUpdateModal}
                            />
                        )
                    })
                }
                <hr className={currentTheme.hr} />
                <BottomActionButtons backToTopOfPage={backToTopOfPage} />
                <EditOneUpdateModal
                    checkUserEnteredUpdatedReleaseNoteInput={checkUserEnteredUpdatedReleaseNoteInput}
                    showEditOneUpdateModal={showEditOneUpdateModal}
                    requestHideEditOneUpdateModal={requestHideEditOneUpdateModal}
                    handleChange={handleChange}
                    currentTheme={currentTheme}
                    updateChangesToShowInModal={updateChangesToShowInModal}
                    knownIssuesToShowInModal={knownIssuesToShowInModal}
                    disableConfirmSaveEditReleaseNoteButton={disableConfirmSaveEditReleaseNoteButton}
                    requestShowDeleteOneUpdateModal={requestShowDeleteOneUpdateModal}
                />
                <DeleteOneUpdateModal
                    handleDeleteOneReleaseNote={handleDeleteOneReleaseNote}
                    showDeleteOneUpdateModal={showDeleteOneUpdateModal}
                    requestHideDeleteOneUpdateModal={requestHideDeleteOneUpdateModal}
                    handleChange={handleChange}
                    currentTheme={currentTheme}
                    disableConfirmDeleteReleaseNoteButton={disableConfirmDeleteReleaseNoteButton}
                />
            </div>
        </div>
    );
};

export default UpdatePageDetails;
