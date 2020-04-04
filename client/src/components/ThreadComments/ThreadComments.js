import React from "react";

const ThreadComments = props => {
  const {
    _id,
    date,
    email,
    comment,
    votes,
    currentTheme
  } = props;
  const formattedDate = date.substring(0, 10);
  const formattedEmail = email.replace(/@[^@]+$/, '');

  return (
    <React.Fragment key={_id}>
      <div className={`threadDetails ${currentTheme.oneThread}`}>
        <div className="row">
          <div className="col-md-10 text-left"><label>{formattedEmail}</label></div>
          <div className="col-md-2 text-right"><label>{votes}</label></div>
        </div>
        <div className="row">
          <div className="col-md-12 text-left breakWord">{formattedDate}</div>
        </div>
        <div className="row">
          <div className="col-md-12 text-left breakWord">{comment}</div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ThreadComments;
