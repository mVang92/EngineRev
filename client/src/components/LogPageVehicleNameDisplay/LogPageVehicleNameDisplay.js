import React from "react";

const LogPageVehicleNameDisplay = props => {
  return (
    <React.Fragment>
      {
        props.vehicleName ?
          (
            <div id="vehicleLogInformation">
              <div className="row">
                <div className="col-md-12 text-center wrapword">
                  <label><h4>{props.vehicleName}</h4></label>
                </div>
              </div>
            </div>
          ) : (
            <div id="vehicleLogInformation">
              <div className="row">
                <div className="col-md-12 text-center wrapword">
                  <label><h4>{props.year} {props.make} {props.model}</h4></label>
                </div>
              </div>
            </div>
          )
      }
    </React.Fragment>
  );
};

export default LogPageVehicleNameDisplay;
