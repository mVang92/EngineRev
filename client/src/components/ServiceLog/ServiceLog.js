import React from "react";

const ServiceLog = props => {
  const date = props.date;
  const mileage = props.mileage;
  const service = props.service;
  const comment = props.comment;
  const serviceLogId = props._id;
  const editValue = "edit";
  const deleteValue = "delete";

  return (
    <React.Fragment key={serviceLogId}>
      <hr />
      <div className="row">
        <div className="col-md-2 scrollable">{date}</div>
        <div className="col-md-2 scrollable">{mileage} miles</div>
        <div className="col-md-3 scrollable">{service}</div>
        <div className="col-md-3 scrollable">{comment}</div>
        <div className="col-md-2 scrollable">
          <div className="row">
            <div className="col-md-6 hideWhilePrinting">
              <button
                id="editActionButton"
                onClick={(event) => props.getServiceLogActionValue(event, serviceLogId, date, mileage, service, comment, editValue)}
                disabled>
                Edit
              </button>
            </div>
            <div className="col-md-6 hideWhilePrinting">
              <button
                id="deleteActionButton"
                onClick={(event) => props.getServiceLogActionValue(event, serviceLogId, date, mileage, service, comment, deleteValue)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ServiceLog;
