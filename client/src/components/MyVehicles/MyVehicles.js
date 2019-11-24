import React, { Component } from "react";
import { VehicleItem } from "../VehicleItem";
import { Link } from "react-router-dom";

class MyVehicles extends Component {
  render() {
    const { vehicleData, vehicleCountForUser } = this.props;
    return (
      <div className="text-center">
        {/* If no vehicles are found in record, display no vehicles found, else display the vehicles */}
        {/* This prevents the app from crashing as there are no data during initial load */}
        {vehicleData ? (
          vehicleData.vehicles ? (
            // Begin ternary for vehicle records
            vehicleData.vehicles.length ? (
              <React.Fragment>
                {vehicleCountForUser(vehicleData.vehicles.length)}
                < div className="row">
                  <div className="col-md-12">
                    <label><strong>My Vehicles</strong></label>
                  </div>
                </div>
                <div className="row innerBox">
                  <div className="col-md-12">
                    {vehicleData.vehicles.map(vehicle => (
                      <div key={vehicle._id} className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <VehicleItem>
                            <Link to={"/vehicle/" + vehicle._id}>
                              <div title="View Service Logs" className="text-dark">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                            </Link>
                          </VehicleItem>
                        </div>
                        <div className="col-md-2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ) : (
                <div className="row">
                  <div className="col-md-12">
                    <label><strong>My Vehicles</strong></label>
                  </div>
                  <div className="col-md-12 text-danger">
                    <br></br>
                    <label><h5>No vehicles on record</h5></label>
                  </div>
                </div>
              )
            // End ternary for vehicle records
          ) : (<label><div>Please Wait...</div></label>)
        ) : (<label><div>Please Wait..</div></label>)
        }
      </div>
    );
  };
};

export default MyVehicles;
