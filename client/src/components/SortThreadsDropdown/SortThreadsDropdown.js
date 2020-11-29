import React from "react";
import { defaults } from "../../assets/Defaults";

const SortThreadsDropdown = props => {

  return (
    <div id="category" className="text-center">
      <span>Sort By: </span>
      <select
        id={defaults.sortThreadsDropdown}
        name={defaults.sortThreadsDropdown}
        defaultValue={props.defaultSortOrder}>
        <option value={defaults.mostRecentThreadsSort}>Most Recent</option>
        <option value={defaults.oldestThreadsSort}>Oldest</option>
        <option value={defaults.mostViewsThreadsSort}>Views</option>
        <option value={defaults.mostCommentsThreadsSort}>Comments</option>
        <option value={defaults.askCarQuestionsSort}>Ask Car Question</option>
        <option value={defaults.tipsAndTricksThreadsSort}>Tips and Tricks</option>
        <option value={defaults.shareStoryThreadsSort}>Share a Story</option>
        <option value={defaults.otherCategoryThreadSort}>Other Category</option>
      </select>
    </div>
  )
};

export default SortThreadsDropdown;
