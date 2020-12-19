import React from "react";
import Container from "../../components/Container";
import { defaults } from "../../assets/Defaults";
import AddCommentToThread from "../../components/AddCommentToThread";
import ThreadComments from "../../components/ThreadComments";
import ThreadCategoriesDropdown from "../../components/ThreadCategoriesDropdown";

const ThreadDetails = props => {
  const {
    currentTheme,
    uniqueCreatorId,
    loggedin,
    email,
    handleChange,
    backButton,
    backToTopOfPage,
    threadTitle,
    threadDescription,
    threadCategory,
    threadComment,
    validateAddOneCommentToThread,
    replyToThreadComment,
    allThreads,
    enableEditThreadDetails,
    handleEditThreadDetails,
    validateEditedThreadDetails,
    showDeleteThreadModal,
    validateUserToUpvoteComment,
    validateUserToDownvoteComment,
    enableEditThreadComment,
    showEditOneThreadCommentModal,
    disableSubmitCommentOnThreadButton,
    disableUpVoteButton,
    disableDownVoteButton,
    disableSaveEditThreadButton
  } = props;
  const dateSubString = allThreads.date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");
  const formattedEmail = allThreads.email.replace(/@[^@]+$/, '');

  return (
    <div id="forumPage" className={`mt-3 box ${currentTheme.background}`}>
      <div className="row">
        <div className="col-md-4">
          <button className="backButton" title="Back" onClick={backButton}>Back</button>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
      <hr className={currentTheme.hr} />
      <Container>
        <div className={`row threadDetails ${currentTheme.oneThread}`}>
          <div className="col-md-12 breakWord">
            <div id="author">Author: {formattedEmail}</div>
            {enableEditThreadDetails ? <ThreadCategoriesDropdown threadCategory={threadCategory} /> : <div id="category">Category: {threadCategory}</div>}
            <div id="date">Date: {formattedDate}</div>
            <hr />
            {
              allThreads.creator === uniqueCreatorId ?
                (
                  <React.Fragment>
                    {
                      enableEditThreadDetails ?
                        (
                          <React.Fragment>
                            <textarea
                              className="threadTitleTextArea"
                              type="text"
                              name="threadTitle"
                              maxLength="200"
                              onChange={handleChange}
                              value={threadTitle}
                            />
                            <textarea
                              className="threadDescriptionTextArea"
                              type="text"
                              name="threadDescription"
                              maxLength="1250"
                              onChange={handleChange}
                              value={threadDescription}
                            />
                          </React.Fragment>
                        ) :
                        (
                          <React.Fragment>
                            <h4 id="threadTitle" className="breakWord">{threadTitle}</h4>
                            <div id="threadDescription" className="breakWord">{threadDescription}</div>
                            <br />
                          </React.Fragment>
                        )
                    }
                    <div className="row text-center smallMarginTop">
                      {
                        enableEditThreadDetails ?
                          (
                            <React.Fragment>
                              <div className="col-md-4">
                                <button
                                  id="cancelEditThreadTitleButton"
                                  title="Cancel"
                                  type="button"
                                  className="cancelBtn"
                                  onClick={() => handleEditThreadDetails(false)}>
                                  Cancel
                                  </button>
                              </div>
                              <div className="col-md-4">
                                <button
                                  id="deleteThreadButton"
                                  title="Delete Thread"
                                  type="button"
                                  className="addBtn"
                                  onClick={() => showDeleteThreadModal()}>
                                  Delete
                                  </button>
                              </div>
                              <div className="col-md-4">
                                <button
                                  id="saveEditedThreadTitleButton"
                                  title="Save Thread"
                                  type="button"
                                  className="addBtn"
                                  onClick={() => validateEditedThreadDetails()}
                                  disabled={disableSaveEditThreadButton}>
                                  Save
                                  </button>
                              </div>
                            </React.Fragment>
                          ) :
                          (
                            <React.Fragment>
                              <div className="col-md-4"></div>
                              <div className="col-md-4"></div>
                              <div className="col-md-4">
                                <span
                                  id="editThreadTitleButton"
                                  title="Edit"
                                  onClick={() => handleEditThreadDetails(true)}>
                                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                  </svg>
                                </span>
                              </div>
                            </React.Fragment>
                          )
                      }
                    </div>
                  </React.Fragment>
                ) :
                (
                  <React.Fragment>
                    <h4 className="breakWord">{threadTitle}</h4>
                    <div className="breakWord">{threadDescription}</div>
                  </React.Fragment>
                )
            }
          </div>
        </div>
      </Container>
      {
        loggedin ?
          (
            <React.Fragment>
              <br />
              <AddCommentToThread
                handleChange={handleChange}
                threadComment={threadComment}
                validateAddOneCommentToThread={validateAddOneCommentToThread}
                disableSubmitCommentOnThreadButton={disableSubmitCommentOnThreadButton}
                currentTheme={currentTheme}
              />
            </React.Fragment>
          ) :
          (
            null
          )
      }
      <hr className={currentTheme.hr} />
      <div id={defaults.commentsSection} className="text-center">
        {
          allThreads.comments.length > 0 ?
            (
              <React.Fragment>
                <strong><label>Comments</label></strong>
                {
                  allThreads.comments.sort((a, b) => { return new Date(b.date) - new Date(a.date) }).map(threadComment => {
                    return (
                      <ThreadComments
                        key={threadComment._id}
                        _id={threadComment._id}
                        commentCreator={threadComment.creator}
                        uniqueCreatorId={uniqueCreatorId}
                        loggedin={loggedin}
                        date={threadComment.date}
                        threadCommentEmail={threadComment.email}
                        userEmail={email}
                        comment={threadComment.comment}
                        votes={threadComment.votes}
                        edited={threadComment.edited}
                        showEditOneThreadCommentModal={showEditOneThreadCommentModal}
                        validateUserToUpvoteComment={validateUserToUpvoteComment}
                        validateUserToDownvoteComment={validateUserToDownvoteComment}
                        replyToThreadComment={replyToThreadComment}
                        enableEditThreadComment={enableEditThreadComment}
                        disableUpVoteButton={disableUpVoteButton}
                        disableDownVoteButton={disableDownVoteButton}
                        currentTheme={currentTheme}
                      />
                    )
                  })
                }
              </React.Fragment>
            ) :
            (
              <strong><label>{defaults.noCommentsOnThread}</label></strong>
            )
        }
      </div>
      <hr className={currentTheme.hr} />
      <div className="row">
        <div className="col-md-6 text-left noWidthMobileDisplay">
          <button className="backButton" title="Back" onClick={backButton}>Back</button>
        </div>
        <br />
        <div className="col-md-6 text-right noWidthMobileDisplay">
          <button className="backToTopButton" title="Back to Top" onClick={backToTopOfPage}>Top</button>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetails;
