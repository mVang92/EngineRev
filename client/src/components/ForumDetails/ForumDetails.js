import React from "react";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import BottomActionButtons from "../../components/BottomActionButtons";
import { defaults } from "../../assets/Defaults";
import AddThread from "../../components/AddThread";
import OneThread from "../../components/OneThread";

const ForumDetails = props => {
  const {
    currentTheme,
    loggedin,
    handleChange,
    validateThreadInputValues,
    threadTitle,
    threadDescription,
    allThreads,
    backToTopOfPage,
    disableSubmitNewThreadButton,
    defaultSortOrder,
    disableSortThreadsButton,
    renderSortedThreads
  } = props;

  return (
    <div id="forumPage" className={`mt-3 box ${currentTheme.background}`}>
      <div className="row text-center">
        <div className="col-md-12">
          <label><h4>Forum</h4></label>
        </div>
      </div>
      <hr className={currentTheme.hr} />
      <BackToHomeButtonRow
        loggedin={loggedin}
        handleChange={handleChange}
        defaultSortOrder={defaultSortOrder}
        disableSortThreadsButton={disableSortThreadsButton}
        renderSortedThreads={renderSortedThreads}
      />
      <hr className={currentTheme.hr} />
      {
        loggedin ?
          (
            <React.Fragment>
              <AddThread
                handleChange={handleChange}
                validateThreadInputValues={validateThreadInputValues}
                threadTitle={threadTitle}
                threadDescription={threadDescription}
                disableSubmitNewThreadButton={disableSubmitNewThreadButton}
                currentTheme={currentTheme}
              />
              <div className="text-center">
                <strong><label>Threads</label></strong>
              </div>
            </React.Fragment>
          ) :
          (
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
              threadCategory={thread.threadCategory}
              views={thread.views}
              commentsCount={thread.comments}
              currentTheme={currentTheme}
            />
          )
        })
      }
      <hr className={currentTheme.hr} />
      <BottomActionButtons backToTopOfPage={backToTopOfPage} />
    </div>
  );
};

export default ForumDetails;
