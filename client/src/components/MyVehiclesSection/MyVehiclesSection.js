import React from "react";
import { Link } from "react-router-dom";

const MyVehiclesSection = props => {
  const {
    vehicleData,
    errorMessage,
    reloadPage,
    currentTheme
  } = props;

  return (
    <div className="text-center">
      {
        errorMessage ?
          (
            <div className="row">
              <div className={`col-md-12 text-danger`}>
                <label className="smallBottomMargin"><strong>{errorMessage}</strong></label>
                <br />
                <button
                  id="reloadPage"
                  title="Reload"
                  type="button"
                  className="cancelBtn"
                  onClick={reloadPage}>
                  Reload Page
                </button>
              </div>
            </div>
          ) :
          (
            <React.Fragment>
              {
                vehicleData.vehicles.length ?
                  (
                    <React.Fragment>
                      <div className="row">
                        <div className="col-md-12 smallBottomMargin">
                          <label><strong>Vehicles on Record: <span id="vehicleCountForUser">{vehicleData.vehicles.length}</span></strong></label>
                        </div>
                      </div>
                      <div className="row innerBox">
                        <div className="col-md-12">
                          {
                            vehicleData.vehicles.sort((a, b) => { return a.year - b.year }).map(vehicle => (
                              <div key={vehicle._id} className="row">
                                <div className="col-md-2"></div>
                                <div
                                  title={vehicle.vehicleName ? vehicle.vehicleName : vehicle.year + " " + vehicle.make + " " + vehicle.model}
                                  className="col-md-8">
                                  <Link to={`/vehicle/${vehicle._id}`}>
                                    {/* <Link to={{ pathname: "/vehicle/" + btoa(vehicle._id) }}> */}
                                    <div className={`fadeIn vehicleItemList ${currentTheme.vehicleItemList}`}>
                                      <div className={`text-dark wrapword ${currentTheme.vehicleItemListFont}`}>
                                        {vehicle.vehicleName ? vehicle.vehicleName : vehicle.year + " " + vehicle.make + " " + vehicle.model}
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                                <div className="col-md-2"></div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </React.Fragment>
                  ) :
                  (
                    <label><strong>No Vehicles on Record</strong></label>
                  )
              }
            </React.Fragment>
          )
      }
    </div>
  );
};

export default MyVehiclesSection;
