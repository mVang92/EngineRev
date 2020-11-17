import { themes } from "../themes/Themes";

export const defaults = {
    applicationName: "applicationName",
    engineRevTheme: "engineRev",
    lightTheme: "light",
    greyTheme: "grey",
    darkTheme: "dark",
    threadCategoryDropdown: "threadCategoryDropdown",
    themeSelectionDropdown: "themeSelectionDropdown",
    transparentLightTheme: "transparentLight",
    transparentGreyTheme: "transparentGrey",
    transparentDarkTheme: "transparentDark",
    newBackgroundPictureInput: "newBackgroundPictureInput",
    newProfilePictureInput: "newProfilePictureInput",
    newDisplayNameInput: "newDisplayNameInput",
    defaultThreadCategory: "Other",
    uniqueUserIdMask: "*****************************************",
    defaultProfilePicture: "https://image.flaticon.com/icons/png/512/64/64572.png",
    defaultDisplayName: "EngineRev User",
    loggedOutStartThread: "Please sign in or create an account to start a thread.",
    noCommentsOnThread: "There are no comments on this thread.",
    threadDetailsCannotBeBlank: "Title and description are required.",
    areYouSureToDeleteThread: "Are you sure you want to delete this thread? All associated comments will also be deleted.",
    areYouSureToDeleteThreadComment: "Are you sure you want to delete your comment?",
    threadDetailsUpdated: "Thread successfully updated.",
    alreadyVotedOnComment: "You have already voted on this comment.",
    addThreadCommentSucess: "Comment posted successfully.",
    deleteThreadCommentSucess: "Comment deleted successfully.",
    deleteVehicleSucess: "Vehicle deleted successfully.",
    threadCommentsCannotBeBlank: "Comments cannot be blank.",
    updateThreadCommentSucess: "Comment updated successfully.",
    noAuthorizationToPerformAction: "You are not authorized to perform this action.",
    noAuthorizationToViewPage: "You do not have permission to view this content.",
    deleteOneReleaseNoteSuccess: "Release note deleted successfully.",
    updateOneReleaseNoteSuccess: "Release note updated successfully.",
    addOneReleaseNoteSuccess: "Release note added successfully.",
    invalidInputDetected: "Invalid input detected.",
    resetInputFieldError: "Error: Unable to reset input field.",
    addThreadSuccessfully: "Thread created successfully.",
    vehicleNameUpdatedSuccessfully: "Vehicle name updated successfully.",
    serviceLogDeletedSuccessfully: "Service log deleted successfully.",
    passwordUpdatedSuccessfully: "Password updated successfully.",
    passwordsDoNotMatch: "Error: Passwords do not match.",
    errorLoadingVehicleCount: "Error loading vehicle count.",
    passwordConfirmationSent: "Password confirmation sent. Please check your email.",
    inputFieldsReset: "Input fields reset.",
    inputFieldReset: "Input field reset.",
    adminRole: "Administrator",
    userRole: "User",
    testUserRole: "Test User",
    commentsSection: "commentsSection",
    deleteVehicleWarning: "You are about to delete this vehicle and any service logs associated with it. " +
        "Are you sure you want to continue?",
    aboutEngineRev: "EngineRev allows you to keep track of your vehicle maintenance history and collaborate with the community. " +
        "Keep your vehicle running smoothly and meet other passionate do-it-yourselfers in the forum. " +
        "Ask questions and share vehicle diagnostic solutions with the community.",
    whoIsEngineRevFor: "EngineRev is for anyone, mechanically inclined or not, who want to keep track of their vehicle service maintenance history. " +
        "Users can create their own accounts and add vehicles they want to keep track of. They can also update their " +
        "account information along with updating vehicle and service log information. " +
        "Service logs are tracked by adding the date of service, the mileage of the vehicle, and the type of service performed on the vehicle. " +
        "Have a car repair question or want to help someone else out? Head to the forums to see what others are talking about.",
    creatorDetails: "My name is Meng Vang. Not only do I work full-time as a Software Engineer, but I also have several years of experience in automotive repair " +
        "(you don’t see that combination every day). As an automotive mechanic, I need a program where I can easily pull it up on a computer " +
        "or my phone to access my vehicle maintenance and repair history. This is where EngineRev comes in, " +
        "which allows users to add vehicles and keep track of service logs while being able to share ideas through the forum. " +
        "EngineRev is intended to be simple to use and to the point.",
    determineTheme(theme, backgroundPicture) {
        let themeType;
        if (theme) {
            switch (theme) {
                case defaults.engineRevTheme:
                    themeType = themes.engineRev;
                    break;
                case defaults.lightTheme:
                    themeType = themes.light;
                    break;
                case defaults.greyTheme:
                    themeType = themes.grey;
                    break;
                case defaults.darkTheme:
                    themeType = themes.dark;
                    break;
                case defaults.transparentLightTheme:
                    themeType = themes.transparentLight;
                    break;
                case defaults.transparentGreyTheme:
                    themeType = themes.transparentGrey;
                    break;
                case defaults.transparentDarkTheme:
                    themeType = themes.transparentDark;
                    break;
                default:
                    themeType = themes.engineRev;
            }
        } else {
            if (backgroundPicture) {
                document.body.style.backgroundImage = "url(" + backgroundPicture + ")";
            } else {
                document.body.style.backgroundImage = "";
            }
        }
        return themeType;
    }
};
