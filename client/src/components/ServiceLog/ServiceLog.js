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

  const serviceLogdate = new Date(dateToFormat);
  const currentDate = new Date();

  serviceLogdate.setDate(serviceLogdate.getDate() + 1);
  currentDate.setDate(currentDate.getDate());
  const serviceLogDateFormatted = serviceLogdate.toLocaleDateString("en-US");
  const currentDateFormatted = currentDate.toLocaleDateString("en-US");
  let serviceLogFullDetails;

  if (currentDateFormatted === serviceLogDateFormatted) {
    serviceLogFullDetails = {
      color: "rgb(0, 150, 0)"
    };
  };

  if (currentDate.getTime() < serviceLogdate.getTime()) {
    serviceLogFullDetails = {
      color: "rgb(200, 32, 0)",
      fontWeight: "bold"
    };
  };

  return (
    <React.Fragment key={serviceLogId}>
      <hr />
      <div className="row serviceLogFullDetails" style={serviceLogFullDetails}>
        <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Date: </strong></span>{serviceLogDateFormatted}</div>
        <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Mileage: </strong></span>{mileage} miles</div>
        <div className="col-md-3 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Service: </strong></span>{service}</div>
        {
          comment ? (
            <div className="col-md-3 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Comments: </strong></span>{comment}</div>
          ) : (
              <div className="col-md-3 logDetailsMobileDisplay"></div>
            )
        }
        <div className="col-md-2">
          <div className="row centerButtonMobileDisplay">
            <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
              <button
                id="editActionButton"
                title="Coming Soon"
                onClick={(event) => props.getServiceLogActionValue(event, serviceLogId, serviceLogDateFormatted, mileage, service, comment, editValue)}
                disabled
              >
                <img id="editIcon" src={editIcon} alt="edit"></img>
              </button>
            </div>
            <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
              <button
                id="deleteActionButton"
                title="Delete Log"
                onClick={(event) => props.getServiceLogActionValue(event, serviceLogId, serviceLogDateFormatted, mileage, service, comment, deleteValue)}
              >
                <img id="deleteIcon" src={deleteIcon} alt="edit"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ServiceLog;
