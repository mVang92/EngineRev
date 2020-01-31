import React from "react";

const OneUpdate = props => {
  let defaultDate = props.date;
  var formattedDate = defaultDate.substring(0, 10);

  return (
    <React.Fragment key={props._id}>
      <div className="row">
        <div className="col-md-3"><label><strong>Date:</strong></label></div>
        <div className="col-md-9">{formattedDate}</div>
      </div>
      <div className="row">
        <div className="col-md-3"><label><strong>Updates:</strong></label></div>
        <div className="col-md-9">{props.updateChanges}</div>
      </div>
      <div className="row">
        <div className="col-md-3"><label><strong>Known Issues:</strong></label></div>
        <div className="col-md-9">{props.knownIssues}</div>
      </div>
      <hr />
    </React.Fragment>
  )
};

export default OneUpdate;
