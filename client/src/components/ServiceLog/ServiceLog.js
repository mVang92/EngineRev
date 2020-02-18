import React from "react";
import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";

const ServiceLog = props => {
  const dateToFormat = props.date;
  const mileage = props.mileage;
  const service = props.service;
  const comment = props.comment;
  const serviceLogId = props._id;
  const editValue = "edit";
  const deleteValue = "delete";

  const serviceLogDate = new Date(dateToFormat);
  const currentDate = new Date();

  serviceLogDate.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);

  serviceLogDate.setDate(serviceLogDate.getDate() + 1);
  currentDate.setDate(currentDate.getDate());

  const serviceLogDateFormatted = serviceLogDate.toLocaleDateString("en-US");
  const currentDateFormatted = currentDate.toLocaleDateString("en-US");
  let serviceLogFullDetails;

  if (currentDateFormatted === serviceLogDateFormatted) {
    serviceLogFullDetails = {
      background: "rgb(200, 255, 200)"
    };
  };

  if (currentDate.getTime() < serviceLogDate.getTime()) {
    serviceLogFullDetails = {
      background: "rgb(255, 200, 200)"
    };
  };

  return (
    <React.Fragment key={serviceLogId}>
      <div className={`row serviceLogFullDetails ${props.currentTheme.serviceLogs}`} style={serviceLogFullDetails}>
        <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Date: </strong></span>{serviceLogDateFormatted}</div>
        <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Mileage: </strong></span>{mileage} miles</div>
        <div className="col-md-3 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Service: </strong></span>{service}</div>
        {
          comment ?
            (
              <div className="col-md-3 logDetailsMobileDisplay">
                <span className="showUnderMobileDisplay">
                  <strong>Comments: </strong>
                </span>
                {comment}
              </div>
            ) : (
              <div className="col-md-3 logDetailsMobileDisplay"></div>
            )
        }
        <div className="col-md-2">
          <div className="row centerButtonMobileDisplay">
            <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
              <button
                className="deleteActionButton"
                title="Delete Log"
                onClick={event => props.getServiceLogActionValue(event, serviceLogId, serviceLogDateFormatted, mileage, service, comment, deleteValue)}>
                <img className="deleteIcon" src={deleteIcon} alt="delete"></img>
              </button>
            </div>
            <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
              <button
                className="editActionButton"
                title="Edit Log"
                onClick={event => props.getServiceLogActionValue(event, serviceLogId, serviceLogDateFormatted, mileage, service, comment, editValue)}>
                <img className="editIcon" src={editIcon} alt="edit"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ServiceLog;
