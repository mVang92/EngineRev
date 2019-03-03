import React, { Component } from "react";
import { VehicleItem } from "../VehicleItem";
import { Link } from "react-router-dom";
import DeleteBtn from "../DeleteBtn";

class MyVehicles extends Component {
  
  render() {
    return (
      <div className="text-center">
        {/* If no vehicles are found in record, display no vehicles found,
        else display the vehicles with a dropdown menu */}
        {/* Begin ternary */}
        {console.log(this.props.vehicles)}
        {this.props.vehicles.length === 0 ? (
          <div className="row">
            <div className="col-md-12">
              <label><strong>My Vehicles</strong></label>
            </div>
            <div className="col-md-12 text-danger">
              <br></br>
              <label><strong>No vehicles on record.</strong></label>
            </div>
          </div>
        ) : (
            <React.Fragment>
              <div className="row">
                <div className="col-md-12">
                  <label><strong>My Vehicles</strong></label>
                </div>
              </div>
              <div className="row innerBox">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                {console.log(this.props.vehicles)}
                  {this.props.vehicles[2].vehicles.map(vehicle => (
                    <div key={vehicle._id} className="row">
                      <div className="col-md-10">
                        <VehicleItem key={vehicle._id}>
                          <Link to={"/vehicle/" + vehicle._id}>
                            <div className="text-dark">
                              {vehicle.year} {vehicle.make} {vehicle.model}
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
    );
  };
};
export default MyVehicles;
