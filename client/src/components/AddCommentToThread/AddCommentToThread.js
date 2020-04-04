import React, { Component } from "react";

class AddCommentToThread extends Component {

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.addOneCommentToThread}>
          <div className="row">
            <div className="col-md-12">
              <textarea
                id="newThreadCommentInput"
                className="commentsBox"
                type="text"
                ref="threadComment"
                onChange={this.props.handleChange}
                value={this.props.threadComment}
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
                disabled={!this.props.threadComment}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
};

export default AddCommentToThread;
