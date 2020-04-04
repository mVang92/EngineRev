import React, { Component } from "react";
import { defaults } from "../../assets/Defaults";
import AddCommentToThread from "../../components/AddCommentToThread";
import ThreadComments from "../../components/ThreadComments";

class ThreadDetails extends Component {
  render() {
    const {
      currentTheme,
      loggedin,
      handleChange,
      backButton,
      backToTopOfPage,
      threadTitle,
      threadDescription,
      threadComment,
      addOneCommentToThread,
      allThreadComments
    } = this.props;

    return (
      <div id="forumPage" className={`mt-3 box ${currentTheme.background}`}>
        <div>
          <div className="row">
            <div className="col-md-4">
              <button className="backButton" onClick={backButton}>Back</button>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
          <div className={`row threadDetails ${currentTheme.oneThread}`}>
            <div className="col-md-2"></div>
            <div className="col-md-8"><h4 className="breakWord">{threadTitle}</h4></div>
            <div className="col-md-2"></div>
          </div>
          <div className={`row threadDetails ${currentTheme.oneThread}`}>
            <div className="col-md-12">
              <label>{threadDescription}</label>
            </div>
          </div>
          <br />
          {
            loggedin ?
              (
                <AddCommentToThread
                  handleChange={handleChange}
                  threadComment={threadComment}
                  addOneCommentToThread={addOneCommentToThread}
                  currentTheme={currentTheme}
                />
              ) : (
                <div className="text-center">
                  <label><strong>{defaults.loggedOutCommentOnThread}</strong></label>
                </div>
              )
          }
          {
            allThreadComments.map(threadComment => {
              return (
                <ThreadComments
                  key={threadComment._id}
                  _id={threadComment._id}
                  date={threadComment.date}
                  email={threadComment.email}
                  comment={threadComment.comment}
                  votes={threadComment.votes}
                  currentTheme={currentTheme}
                />
              )
            })
          }
          <hr className="oneThreadHr" />
          <div className="row">
            <div className="col-md-6 text-left noWidthMobileDisplay">
              <button className="backButton" onClick={backButton}>Back</button>
            </div>
            <br />
            <div className="col-md-6 text-right noWidthMobileDisplay">
              <button className="backToTopButton" onClick={backToTopOfPage}>Top</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ThreadDetails;
