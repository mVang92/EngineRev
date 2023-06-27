import React from "react";
import { Link } from "react-router-dom";
import { defaults } from "../../assets/Defaults";

const OneThread = props => {
  const {
    _id,
    date,
    email,
    displayName,
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
      <Link to={`/thread/${_id}`}>
        <div className={`threadDetails fadeIn threadLink ${currentTheme.oneThread}`}>
          <div className="row">
            <h4 className="col-md-12 breakWord">{threadTitle}</h4>
          </div>
          <div className="row">
            <div className="col-md-12 breakWord">{formattedDescription}...</div>
          </div>
          <hr className="oneThreadHr" />
          <div className="threadCredentials">
            <div className="row">
              <div className="col-md-12 breakWord">Author: {displayName}</div>
            </div>
            <div className="row">
              <div className="col-md-12 breakWord">Category: {threadCategory ? threadCategory : defaults.defaultThreadCategory}</div>
            </div>
            <div className="row">
              <div className="col-md-12 breakWord">Posted on: {formattedDate}</div>
            </div>
            <div className="row">
              <div className="col-md-12 breakWord">Comments: {commentsCount.length}</div>
            </div>
            <div className="row">
              <div className="col-md-12 breakWord">Viewed: {views} {views === 1 ? "time" : "times"}</div>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  )
};

export default OneThread;
