import React from "react";

const ServiceLog = props => {
  const {
    serviceLogId,
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
    <React.Fragment key={serviceLogId}>
      <div className="serviceLog fadeIn">
        <div className={`row serviceLogFullDetails ${currentTheme.serviceLogs}`} style={serviceLogFullDetails}>
          <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Date: </strong></span>{serviceLogDateFormatted}</div>
          <div className="col-md-2 logDetailsMobileDisplay"><span className="showUnderMobileDisplay"><strong>Mileage: </strong></span>{mileage} miles</div>
          <div className="col-md-3 breakWord"><span className="showUnderMobileDisplay"><strong>Service: </strong></span>{service}</div>
          {
            comment ?
              (
                <div className="col-md-4 breakWord">
                  <span className="showUnderMobileDisplay">
                    <strong>Comments: </strong>
                  </span>
                  {comment}
                </div>
              ) :
              (
                <div className="col-md-4 logDetailsMobileDisplay"></div>
              )
          }
          <div className="col-md-1 smallMarginTopMobileDisplay">
            <div className="row">
              <div className="col-md-12 alignRightButtonsDesktopDisplay alignLeftButtonsMobileDisplay hideWhilePrinting">
                <span
                  className="editComment"
                  title="Edit Service Log"
                  onClick={() => showEditOneServiceLogModal(serviceLogId, serviceLogDateFormatted, mileage, service, comment)}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ServiceLog;
