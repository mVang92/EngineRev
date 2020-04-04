import React, { Component } from "react";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import AddThread from "../../components/AddThread";

class ForumDetails extends Component {
  render() {
    const {
      currentTheme,
      loggedin,
      handleChange,
      addOneThread,
      threadDescription,
      allThreads
    } = this.props;

    return (
      <div id="forumPage" className={`mt-3 box ${currentTheme.background}`}>
        <div className="row text-center">
          <div className="col-md-12">
            <label><h4>Forum</h4></label>
          </div>
        </div>
        <BackToHomeButtonRow />
        <hr className={currentTheme.hr} />
        {
          loggedin ?
            (
              <AddThread
                handleChange={handleChange}
                addOneThread={addOneThread}
                threadDescription={threadDescription}
                currentTheme={currentTheme}
              />
            ) : (
              <div className="text-center">Please sign in or create an account to start a thread.</div>
            )
        }
      </div>
    );
  }
};

export default ForumDetails;
