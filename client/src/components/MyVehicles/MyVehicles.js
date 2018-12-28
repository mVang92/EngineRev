import React, { Component } from "react";
import { VehicleItem } from "../VehicleItem";
import { Link } from "react-router-dom";
import DeleteBtn from "../DeleteBtn";

class MyVehicles extends Component {
  // deleteVehicle = id => {
  //   console.log("delete" + id)
  //   API.deleteVehicle(id);
  // }

  render() {
    let vehicleOptions;
    if (this.props.vehicles.length === 0) {
      // console.log("no cars");
    } else {
      // States are passed from App.js to this component (hence this.prop.vehicles).
      // We map through the array of objects, instead of mapping through and array
      // using something like .map(callBack => {})
      vehicleOptions = this.props.vehicles.map(({ year, make, model }) => {
        // Note the syntax to how I grouped the value of the year, make, and model together.
        return (
          <div>
            {/* <div className="text-left">
              <option
                key={year + " " + make + " " + model}
                value={year + " " + make + " " + model}>
                {year} {make} {model}

              </option>
              <DeleteBtn onClick={() => this.deleteVehicle(vehicles._id)} />
            </div> */}
          </div>
        );
      });
    };

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
                  <div className="col-md-4">
                    <p>My Vehicles</p>
                  </div>
                  <div className="col-md-8">
                    {this.props.vehicles.map(vehicle => (
                      <div key={vehicle._id} className="row">
                        <div className="col-md-10">
                          {/* {console.log(vehicle)} */}
                          <VehicleItem key={vehicle._id}>
                            {/* {vehicle.year} {vehicle.make} {vehicle.model} */}
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

                  {/* <div className="col-md-8">
                  <div id="vehicleDropDown" ref="myVehicles">
                    {vehicleOptions}
                  </div>
                </div> */}
                  {/* <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <button type="submit" className="btn-success">View Logs</button>
                    </div>
                    <div className="col-md-6"> */}
                  {/* Pass this onClick function up to LoggedIn component */}
                  {/* <button type="button" onClick={this.props.deleteVehicle} className="btn-danger">Delete</button>
                    </div>
                  </div> */}
                  {/* </div> */}
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
