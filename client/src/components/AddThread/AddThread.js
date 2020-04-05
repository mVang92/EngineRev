import React, { Component } from "react";
import { defaults } from "../../assets/Defaults";

class AddThread extends Component {

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.validateThreadInputValues}>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <label><strong>{defaults.startANewThread}</strong></label>
              </div>
              <input
                id="newThreadTitleInput"
                type="text"
                ref="threadTitle"
                onChange={this.props.handleChange}
                value={this.props.threadTitle}
                name="threadTitle"
                maxLength="200"
                placeholder="Title (Required)">
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
                maxLength="1250"
                placeholder="Description (Required)">
              </textarea>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12 text-right">
              <button
                id="submitNewThreadButton"
                title="Submit Thread"
                type="submit"
                className="addBtn"
                disabled={this.props.disableSubmitNewThreadButton}>
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
