import React from "react";

const ServiceLog = props => {
  const {
    _id,
    date,
    mileage,
    service,
    comment,
    showEditOneServiceLogModal,
    currentTheme
  } = props;

  const serviceLogDate = new Date(date);
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
    <React.Fragment key={_id}>
      <div className="serviceLog">
        <div className={`row serviceLogFullDetails ${currentTheme.serviceLogs}`} style={serviceLogFullDetails}>
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
          <div className="col-md-2 smallMarginTopMobileDisplay">
            <div className="row">
              <div className="col-md-12 alignRightButtonsDesktopDisplay alignLeftButtonsMobileDisplay hideWhilePrinting">
                <button
                  className="editActionButton"
                  title="Edit Service Log"
                  onClick={() => showEditOneServiceLogModal(_id, serviceLogDateFormatted, mileage, service, comment)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ServiceLog;
