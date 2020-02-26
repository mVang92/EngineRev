import React from "react";
import Categories from "../../components/Categories";
import ServiceLog from "../../components/ServiceLog";

const ServiceLogDisplay = props => {
  return (
    <div className="col-md-12">
      <Categories />
      {
        props.sortVehicleServiceLogsMostRecent ?
          (
            props.sortServiceLogs().map(serviceLog => {
              return (
                <ServiceLog
                  key={serviceLog._id}
                  _id={serviceLog._id}
                  date={serviceLog.date}
                  mileage={serviceLog.mileage}
                  service={serviceLog.service}
                  comment={serviceLog.comment}
                  getServiceLogActionValue={props.getServiceLogActionValue}
                  currentTheme={props.currentTheme}
                />
              )
            })
          ) : (
            props.sortServiceLogs().map(serviceLog => {
              return (
                <ServiceLog
                  key={serviceLog._id}
                  _id={serviceLog._id}
                  date={serviceLog.date}
                  mileage={serviceLog.mileage}
                  service={serviceLog.service}
                  comment={serviceLog.comment}
                  getServiceLogActionValue={props.getServiceLogActionValue}
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
