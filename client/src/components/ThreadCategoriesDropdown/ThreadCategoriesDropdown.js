import React from "react";

const ThreadCategoriesDropdown = () => {

  return (
    <div className="text-left">
      <span>Category: </span>
      <select id="threadCategoryDropdown" name="threadCategory">
        <option value="Ask Car Question">Ask Car Question</option>
        <option value="Tips and Tricks">Tips and Tricks</option>
        <option value="Share a Story">Share a Story</option>
        <option value="Other">Other</option>
      </select>
    </div>
  )
};

export default ThreadCategoriesDropdown;
