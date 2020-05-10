import React from "react";

const ThreadComments = props => {
  const {
    _id,
    uniqueCreatorId,
    commentCreator,
    loggedin,
    date,
    email,
    comment,
    votes,
    currentTheme,
    validateUserToUpvoteComment,
    validateUserToDownvoteComment,
    showEditOneThreadCommentModal,
    disableUpVoteButton,
    disableDownVoteButton
  } = props;
  const dateSubString = date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");
  const formattedEmail = email.replace(/@[^@]+$/, '');

  return (
    <React.Fragment key={_id}>
      <div className={`threadDetails ${currentTheme.oneThread}`}>
        <div className="row">
          {
            uniqueCreatorId === commentCreator ?
              (
                <div className="col-md-10 text-left bottomMarginMobileDisplay breakWord">
                  <strong>{formattedEmail} posted on {formattedDate}</strong>
                </div>
              ) : (
                <React.Fragment>
                  <div className="col-md-8 text-left commentPoster breakWord">
                    <strong>{formattedEmail} posted on {formattedDate}</strong>
                  </div>
                  <div className="col-md-2 alignRightButtonsDesktopDisplay breakWord">
                    {
                      loggedin ?
                        (
                          <label>Helpful?</label>
                        ) : (
                          null
                        )
                    }
                  </div>
                </React.Fragment>
              )
          }
          <div className="col-md-1 noWidthMobileDisplay">
            {
              loggedin ?
                (
                  <div className="row text-center">
                    {
                      uniqueCreatorId === commentCreator ?
                        (
                          <React.Fragment>
                            <div className="col-md-12 noWidthMobileDisplay">
                              <button
                                className="editActionButton"
                                type="button"
                                title="Edit Comment"
                                onClick={() => showEditOneThreadCommentModal(_id, comment)}>
                                Edit
                              </button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <div className="col-md-6 noWidthMobileDisplay">
                              <button
                                className="votingButton"
                                title="Not Helpful"
                                disabled={disableDownVoteButton}
                                onClick={() => validateUserToDownvoteComment(_id)}>
                                No
                              </button>
                            </div>
                            <div className="col-md-6 noWidthMobileDisplay">
                              <button
                                className="votingButton"
                                title="Helpful"
                                disabled={disableUpVoteButton}
                                onClick={() => validateUserToUpvoteComment(_id)}>
                                Yes
                              </button>
                            </div>
                          </React.Fragment>
                        )
                    }
                  </div>
                ) : (
                  null
                )
            }
          </div>
          <div className="col-md-1 votes noWidthMobileDisplay">
            {
              votes > 0 ?
                (
                  <label>
                    <span className="text-success"><strong>+{votes}</strong></span>
                  </label>
                ) : (
                  null
                )
            }
            {
              votes < 0 ?
                (
                  <label>
                    <span className="text-danger"><strong>{votes}</strong></span>
                  </label>
                ) : (
                  null
                )
            }
          </div>
        </div>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12 text-left breakWord">{comment}</div>
        </div>
      </div>
    </React.Fragment >
  )
};

export default ThreadComments;
