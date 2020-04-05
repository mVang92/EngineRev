import React from "react";

const ThreadComments = props => {
  const {
    _id,
    loggedin,
    date,
    email,
    comment,
    votes,
    currentTheme,
    validateUserToUpvoteComment,
    validateUserToDownvoteComment,
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
            {formattedEmail} posted on {formattedDate}
          </div>
          <div className="col-md-2 noWidthMobileDisplay voteButtons">
            {
              loggedin ?
                (
                  <div className="row noMarginMobileDisplay">
                    <button
                      className="col-md-4 noWidthMobileDisplay upVote"
                      type="button"
                      title="Up Vote"
                      disabled={disableUpVoteButton}
                      onClick={() => validateUserToUpvoteComment(_id)}
                    >
                      +
                    </button>
                    <div className="col-md-4 noWidthMobileDisplay"></div>
                    <button
                      className="col-md-4 noWidthMobileDisplay downVote"
                      type="button"
                      title="Down Vote"
                      disabled={disableDownVoteButton}
                      onClick={() => validateUserToDownvoteComment(_id)}
                    >
                      -
                    </button>
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
