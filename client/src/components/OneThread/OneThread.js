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
  const formattedDate = date.substring(0, 10);
  const formattedDescription = threadDescription.substring(0, 100);
  const formattedEmail = email.replace(/@[^@]+$/, '');

  return (
    <React.Fragment key={_id}>
      <div className={`threadDetails ${currentTheme.oneThread}`}>
        <div className="row">
          <h4 className="col-md-12 breakWord">{threadTitle}</h4>
        </div>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12 breakWord">{formattedDescription}...</div>
        </div>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-10">
            <label>{formattedEmail} posted on {formattedDate}.</label>
          </div>
          <div className="col-md-2 text-right">
            <Link to={{
              pathname: "/thread/" + _id,
              state: [
                _id,
                threadTitle,
                threadDescription,
                formattedEmail,
                formattedDate
              ]
            }}>
              <strong>View Thread</strong>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneThread;
