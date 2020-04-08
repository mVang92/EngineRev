import React from "react";
import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";

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
    showDeleteThreadCommentModal,
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
          <div className="col-md-9 text-left breakWord">
            <strong>{formattedEmail} posted on {formattedDate}</strong>
          </div>
          <div className="col-md-2 noWidthMobileDisplay voteButtons">
            {
              loggedin ?
                (
                  <div className="row text-center">
                    {
                      uniqueCreatorId === commentCreator ?
                        (
                          <React.Fragment>
                            <div className="col-md-6 noWidthMobileDisplay">
                              <button
                                className="deleteActionButton"
                                type="button"
                                title="Delete Comment"
                                onClick={() => showDeleteThreadCommentModal(_id)}
                              >
                                <img className="deleteIcon" src={deleteIcon} alt="delete"></img>
                              </button>
                            </div>
                            <div className="col-md-6 noWidthMobileDisplay">
                              <button
                                className="editActionButton"
                                type="button"
                                title="Edit Comment"
                                onClick={() => showEditOneThreadCommentModal(_id, comment)}
                              >
                                <img className="editIcon" src={editIcon} alt="edit"></img>
                              </button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <div className="col-md-6 noWidthMobileDisplay">
                              <button
                                className="downVote"
                                type="button"
                                title="Down Vote"
                                disabled={disableDownVoteButton}
                                onClick={() => validateUserToDownvoteComment(_id)}
                              >
                                <strong>-</strong>
                              </button>
                            </div>
                            <div className="col-md-6 noWidthMobileDisplay">
                              <button
                                className="upVote"
                                type="button"
                                title="Up Vote"
                                disabled={disableUpVoteButton}
                                onClick={() => validateUserToUpvoteComment(_id)}
                              >
                                <strong>+</strong>
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
          <div className="col-md-1 votes noWidthMobileDisplay voteButtons">
            {
              votes > 0 ?
                (
                  <React.Fragment>
                    <span className="text-success"><strong>+{votes}</strong></span>
                  </React.Fragment>
                ) : (
                  null
                )
            }
            {
              votes < 0 ?
                (
                  <React.Fragment>
                    <span className="text-danger"><strong>{votes}</strong></span>
                  </React.Fragment>
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
    </React.Fragment>
  )
};

export default ThreadComments;
