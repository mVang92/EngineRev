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
    threadCategory
  } = props;
  const dateSubString = date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");
  const formattedDescription = threadDescription.substring(0, 110);
  const formattedEmail = email.replace(/@[^@]+$/, '');

  return (
    <React.Fragment key={_id}>
      <div className={`threadDetails ${currentTheme.oneThread}`}>
        <Link to={{
          pathname: "/forum/thread/" + _id,
          state: [
            _id,
            threadTitle,
            threadDescription,
            threadCategory,
            formattedEmail,
            formattedDate
          ]
        }}>
          <div className="row threadTitleLink">
            <h4 className="col-md-12 breakWord">{threadTitle}</h4>
          </div>
        </Link>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12 breakWord">{formattedDescription}...</div>
        </div>
        <hr className="oneThreadHr" />
        {
          threadCategory ?
            (
              <div className="row">
                <div className="col-md-12 breakWord">Category: {threadCategory}</div>
              </div>
            ) :
            (
              <div className="row">
                <div className="col-md-12 breakWord">Category: {defaults.defaultThreadCategory}</div>
              </div>
            )
        }
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12 breakWord">{formattedEmail} posted on {formattedDate}</div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneThread;
