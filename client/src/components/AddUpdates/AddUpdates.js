import React from "react";

const AddUpdates = props => {
  const {
    handleChange,
    addOneUpdate,
    updateChanges,
    knownIssues,
    currentTheme
  } = props;

  return (
    <React.Fragment>
      <form onSubmit={addOneUpdate}>
        <div className="row">
          <div className="col-md-6">
            <label><span className="required">*</span><strong>Updates</strong></label>
            <textarea
              id="updateChangesInput"
              className="commentsBox"
              type="text"
              onChange={handleChange}
              value={updateChanges}
              name="updateChanges"
              maxLength="500">
            </textarea>
          </div>
          <br />
          <div className="col-md-6"><label><span className="required">*</span><strong>Known Issues</strong></label>
            <textarea
              id="knownIssuesInput"
              className="commentsBox"
              type="test"
              onChange={handleChange}
              value={knownIssues}
              name="knownIssues"
              maxLength="500">
            </textarea>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <button
              id="submitReleaseNoteUpdatesButton"
              title="Submit Updates"
              type="submit"
              className="addBtn"
              disabled={!(updateChanges && knownIssues)}>
              Submit
              </button>
          </div>
        </div>
      </form>
      <hr className={currentTheme.hr} />
    </React.Fragment>
  );
};

export default AddUpdates;
