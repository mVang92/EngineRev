import React from "react";

const AddCommentToThread = props => {
  const {
    handleChange,
    validateAddOneCommentToThread,
    threadComment,
    disableSubmitCommentOnThreadButton
  } = props;

  return (
    <React.Fragment>
      <form onSubmit={validateAddOneCommentToThread}>
        <div className="row">
          <div className="col-md-12">
            <textarea
              id="newThreadCommentInput"
              className="commentsBox"
              type="text"
              onChange={handleChange}
              value={threadComment}
              name="threadComment"
              maxLength="1250"
              placeholder="Add a Comment">
            </textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-right">
            <button
              id="submitCommentOnThreadButton"
              title="Submit Comment"
              type="submit"
              className="addBtn"
              disabled={disableSubmitCommentOnThreadButton}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddCommentToThread;
