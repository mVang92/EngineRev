import React, { Component } from "react";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";
import { defaults } from "../../assets/Defaults";
import AddThread from "../../components/AddThread";
import OneThread from "../../components/OneThread";

class ForumDetails extends Component {
  render() {
    const {
      currentTheme,
      loggedin,
      handleChange,
      addOneThread,
      threadTitle,
      threadDescription,
      allThreads,
      backToTopOfPage
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
                threadTitle={threadTitle}
                threadDescription={threadDescription}
                currentTheme={currentTheme}
              />
            ) : (
              <div className="text-center">
                <label><strong>{defaults.loggedOutStartThread}</strong></label>
              </div>
            )
        }
        {
          allThreads.map(thread => {
            return (
              <OneThread
                key={thread._id}
                _id={thread._id}
                date={thread.date}
                email={thread.email}
                threadTitle={thread.threadTitle}
                threadDescription={thread.threadDescription}
                currentTheme={currentTheme}
              />
            )
          })
        }
        <br />
        <BottomActionButtons
          backToTopOfPage={backToTopOfPage}
        />
      </div>
    );
  }
};

export default ForumDetails;
