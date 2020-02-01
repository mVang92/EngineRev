import React from "react";

const OneUpdate = props => {
  let defaultDate = props.date;
  var formattedDate = defaultDate.substring(0, 10);

  return (
    <React.Fragment key={props._id}>
      <div className={`releaseNote ${props.currentTheme.oneUpdate}`}>
        <div className="row">
          <div className="col-md-3"><label><strong>Date:</strong></label></div>
          <div className="col-md-7"><label>{formattedDate}</label></div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-3"><label><strong>Updates:</strong></label></div>
          <div className="col-md-9"><label>{props.updateChanges}</label></div>
        </div>
        <div className="row">
          <div className="col-md-3"><label><strong>Known Issues:</strong></label></div>
          <div className="col-md-9"><label>{props.knownIssues}</label></div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneUpdate;
