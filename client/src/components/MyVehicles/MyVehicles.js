import React, { Component } from "react";
import { VehicleItem } from "../VehicleItem";
import { Link } from "react-router-dom";
import DeleteBtn from "../DeleteBtn";

class MyVehicles extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          {/* If no vehicles are found in record, display no vehicles found,
        else display the vehicles with a dropdown menu */}
          {/* Begin ternary */}
          {this.props.vehicles.length === 0 ? (
            <div className="row">
              <div className="col-md-12 text-danger">
                <strong>No Vehicles on record.</strong>
              </div>
            </div>
          ) : (
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12">
                    <strong>My Vehicles</strong>
                  </div>
                </div>
                <div className="row innerBox">
                <div className="col-md-2"></div>
                  <div className="col-md-10">
                    {this.props.vehicles.map(vehicle => (
                      <div key={vehicle._id} className="row">
                        <div className="col-md-10">
                          {/* {console.log(vehicle.vehicle[0].year)} */}
                          <VehicleItem key={vehicle._id}>
                            <Link to={"/vehicle/" + vehicle._id}>
                              <div className="text-dark">
                                {vehicle.vehicle[0].year} {vehicle.vehicle[0].make} {vehicle.vehicle[0].model}
                              </div>
                            </Link>
                          </VehicleItem>
                        </div>
                        <div id="deleteBtn" className="col-md-2">
                          <DeleteBtn onClick={() => this.props.deleteVehicle(vehicle._id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            )}
          {/* End ternary */}
        </div>
      </React.Fragment>
    );
  };
};
export default MyVehicles;
