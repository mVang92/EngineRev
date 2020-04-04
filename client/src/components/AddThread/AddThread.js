import React, { Component } from "react";

class AddThread extends Component {

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.addOneThread}>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <label><strong>Start a New Thread</strong></label>
              </div>
              <input
                id="newThreadTitleInput"
                type="text"
                ref="threadTitle"
                onChange={this.props.handleChange}
                value={this.props.threadTitle}
                name="threadTitle"
                maxLength="200">
              </input>
              <br /><br />
              <textarea
                id="newThreadDescriptionInput"
                className="commentsBox"
                type="text"
                ref="threadDescription"
                onChange={this.props.handleChange}
                value={this.props.threadDescription}
                name="threadDescription"
                maxLength="1000">
              </textarea>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12 text-right">
              <button
                id="submitReleaseNoteUpdatesButton"
                title="Submit Updates"
                type="submit"
                className="addBtn"
                disabled={!(this.props.threadTitle && this.props.threadDescription)}>
                Submit
              </button>
            </div>
          </div>
        </form>
        <hr className={this.props.currentTheme.hr} />
      </React.Fragment>
    );
  }
};

export default AddThread;
