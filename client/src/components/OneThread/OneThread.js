import React from "react";

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
      <div className={`releaseNote ${currentTheme.oneThread}`}>
        <div className="row">
          <h4 className="col-md-12 breakWord">{threadTitle}</h4>
        </div>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12 breakWord">{formattedDescription}...</div>
        </div>
        <hr className="oneThreadHr" />
        <div className="row">
          <div className="col-md-12">
            <label>{formattedEmail} posted on {formattedDate}.</label>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneThread;
