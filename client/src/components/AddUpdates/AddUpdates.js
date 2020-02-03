import React, { Component } from "react";

class AddUpdates extends Component {
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.addOneUpdate}>
          <div className="row">
            <div className="col-md-6">
              <label><span className="required">*</span><strong>Updates</strong></label>
              <textarea
                id="updateChangesInput"
                className="commentsBox"
                type="text"
                ref="updateChanges"
                onChange={this.props.handleChange}
                value={this.props.updateChanges}
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
                ref="knownIssues"
                onChange={this.props.handleChange}
                value={this.props.knownIssues}
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
                disabled={!(this.props.updateChanges && this.props.knownIssues)}>
                Submit
              </button>
            </div>
          </div>
        </form>
        <hr className={this.props.currentTheme.hr}/>
      </React.Fragment>
    );
  }
};

export default AddUpdates;
