import React from "react";
import Categories from "../../components/Categories";
import ServiceLog from "../../components/ServiceLog";

const ServiceLogDisplay = props => {
  const {
    sortVehicleServiceLogsMostRecent,
    sortServiceLogs
  } = props;
  
  return (
    <div className="col-md-12">
      <Categories />
      {
        sortVehicleServiceLogsMostRecent ?
          (
            sortServiceLogs().map(serviceLog => {
              return (
                <ServiceLog
                  key={serviceLog._id}
                  serviceLogId={serviceLog._id}
                  date={serviceLog.date}
                  mileage={serviceLog.mileage}
                  service={serviceLog.service}
                  comment={serviceLog.comment}
                  showEditOneServiceLogModal={props.showEditOneServiceLogModal}
                  currentTheme={props.currentTheme}
                />
              )
            })
          ) :
          (
            sortServiceLogs().map(serviceLog => {
              return (
                <ServiceLog
                  key={serviceLog._id}
                  serviceLogId={serviceLog._id}
                  date={serviceLog.date}
                  mileage={serviceLog.mileage}
                  service={serviceLog.service}
                  comment={serviceLog.comment}
                  showEditOneServiceLogModal={props.showEditOneServiceLogModal}
                  currentTheme={props.currentTheme}
                />
              )
            })
          )
      }
    </div>
  );
};

export default ServiceLogDisplay;
