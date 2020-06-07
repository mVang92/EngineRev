import React from "react";
import { defaults } from "../../assets/Defaults";
import ThreadCategoriesDropdown from "../../components/ThreadCategoriesDropdown";

const AddThread = props => {
  const {
    handleChange,
    validateThreadInputValues,
    threadTitle,
    threadDescription,
    disableSubmitNewThreadButton,
    currentTheme
  } = props;

  return (
    <React.Fragment>
      <form onSubmit={validateThreadInputValues}>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center smallBottomMargin">
              <label><strong>{defaults.startANewThread}</strong></label>
            </div>
            <ThreadCategoriesDropdown />
            <br />
            <input
              id="newThreadTitleInput"
              type="text"
              onChange={handleChange}
              value={threadTitle}
              name="threadTitle"
              maxLength="200"
              placeholder="Title (Required)"
            />
            <br /><br />
            <textarea
              id="newThreadDescriptionInput"
              className="commentsBox"
              type="text"
              onChange={handleChange}
              value={threadDescription}
              name="threadDescription"
              maxLength="1250"
              placeholder="Description (Required)"
            />
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
              disabled={disableSubmitNewThreadButton}>
              Submit
            </button>
          </div>
        </div>
      </form>
      <hr className={currentTheme.hr} />
    </React.Fragment>
  );
};

export default AddThread;
