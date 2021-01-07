import React from "react";
import { Link } from "react-router-dom";
import { defaults } from "../../assets/Defaults";

const OneThread = props => {
  const {
    _id,
    date,
    email,
    currentTheme,
    threadTitle,
    threadDescription,
    threadCategory,
    views,
    commentsCount
  } = props;
  const dateSubString = date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");
  const formattedDescription = threadDescription.substring(0, 100);
  const formattedEmail = email.replace(/@[^@]+$/, '');

  return (
    <React.Fragment key={_id}>
      <div className={`threadDetails fadeIn ${currentTheme.oneThread}`}>
        <Link to={{ pathname: "/thread/" + btoa(_id) }}>
          <div className="row threadTitleLink">
            <h4 className="col-md-12 breakWord">{threadTitle}</h4>
          </div>
        </Link>
        <div className="row">
          <div className="col-md-12 breakWord">{formattedDescription}...</div>
        </div>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12 breakWord">Author: {formattedEmail}</div>
        </div>
        <div className="row">
          <div className="col-md-12 breakWord">Category: {threadCategory ? threadCategory : defaults.defaultThreadCategory}</div>
        </div>
        <div className="row">
          <div className="col-md-12 breakWord">Date: {formattedDate}</div>
        </div>
        <div className="row">
          <div className="col-md-12 breakWord">Comments: {commentsCount.length}</div>
        </div>
        <div className="row">
          <div className="col-md-12 breakWord">Viewed: {views} {views === 1 ? "time" : "times"}</div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneThread;
