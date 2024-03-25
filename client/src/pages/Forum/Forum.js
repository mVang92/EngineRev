import React from "react";
import Container from "../../components/Container";
import ForumDetails from "../../components/ForumDetails";

const Forum = props => {
  const {
    handleChange,
    loggedin,
    loadingSortedThreads,
    validateThreadInputValues,
    threadTitle,
    threadDescription,
    allThreads,
    disableSubmitNewThreadButton,
    backToTopOfPage,
    noSortResults,
    defaultSortOrder,
    disableSortThreadsButton,
    renderSortedThreads,
    currentTheme,
    displayName
  } = props;

  return (
    <Container>
      <ForumDetails
        loggedin={loggedin}
        loadingSortedThreads={loadingSortedThreads}
        handleChange={handleChange}
        validateThreadInputValues={validateThreadInputValues}
        threadTitle={threadTitle}
        threadDescription={threadDescription}
        allThreads={allThreads}
        disableSubmitNewThreadButton={disableSubmitNewThreadButton}
        backToTopOfPage={backToTopOfPage}
        noSortResults={noSortResults}
        defaultSortOrder={defaultSortOrder}
        disableSortThreadsButton={disableSortThreadsButton}
        renderSortedThreads={renderSortedThreads}
        currentTheme={currentTheme}
        displayName={displayName}
      />
    </Container>
  )
}

export default Forum;