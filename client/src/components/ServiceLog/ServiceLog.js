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
  const today  = new Date(dateToFormat);
  today.setDate(today.getDate() + 1);
  const date = today.toLocaleDateString("en-US");
  
  return (
    <React.Fragment key={serviceLogId}>
      <hr />
      <div className="row">
        <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Date: </strong></span>{date}</div>
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
                onClick={(event) => props.getServiceLogActionValue(event, serviceLogId, date, mileage, service, comment, editValue)}
                disabled
              >
                <img id="editIcon" src={editIcon} alt="edit"></img>
              </button>
            </div>
            <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
              <button
                id="deleteActionButton"
                onClick={(event) => props.getServiceLogActionValue(event, serviceLogId, date, mileage, service, comment, deleteValue)}
              >
                <img id="editIcon" src={deleteIcon} alt="edit"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ServiceLog;
