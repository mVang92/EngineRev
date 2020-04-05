import React from "react";
import { Link } from "react-router-dom";

const OneThread = props => {
  const {
    _id,
    date,
    email,
    currentTheme,
    threadTitle,
    threadDescription
  } = props;
  const dateSubString = date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");
  const formattedDescription = threadDescription.substring(0, 100);
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
        <div className="row">
          <div className="col-md-12 breakWord">{formattedEmail} posted on {formattedDate}.</div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneThread;
