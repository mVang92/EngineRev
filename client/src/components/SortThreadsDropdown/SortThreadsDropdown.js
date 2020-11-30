import React from "react";
import { defaults } from "../../assets/Defaults";

const SortThreadsDropdown = props => {

  return (
    <div className="row text-center">
      <div className="col-md-12">
        <select
          id={defaults.sortThreadsDropdown}
          name={defaults.sortThreadsDropdown}
          defaultValue={props.defaultSortOrder}>
          <option value={defaults.mostRecentThreadsSort}>Most Recent</option>
          <option value={defaults.oldestThreadsSort}>Oldest</option>
          <option value={defaults.mostViewsThreadsSort}>Views</option>
          <option value={defaults.askCarQuestionsThreadsSort}>Ask Car Question</option>
          <option value={defaults.tipsAndTricksThreadsSort}>Tips and Tricks</option>
          <option value={defaults.shareStoryThreadsSort}>Share a Story</option>
          <option value={defaults.otherCategoryThreadsSort}>Other Category</option>
        </select>
        <button
          id="applySortToThreads"
          title="Go"
          type="button"
          onClick={() => props.renderSortedThreads()}
          disabled={props.disableSortThreadsButton}>
          Go
        </button>
      </div>
    </div>
  )
};

export default SortThreadsDropdown;
