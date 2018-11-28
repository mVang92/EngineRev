import React, { Component } from "react";

class MyVehicles extends Component {
  handleViewLog = e => {
    e.preventDefault();
    // This captures the selected value from the dropdown menu
    var element = document.getElementById("vehicleDropDown");
    var strUser = element.options[element.selectedIndex].value;
    console.log(strUser);
  }

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
          <option
            key={year + " " + make + " " + model}
            value={year + " " + make + " " + model}>
            {year} {make} {model}
          </option>
        );
      });
    };
    return (
      <form onSubmit={this.handleViewLog.bind(this)}>
        <div className="text-center">
          <p>Hello <span id="userEmail"></span>!</p>
          <hr></hr>
        </div>
        <div className="text-center">
          {/* If no vehicles are found in record, display no vehicles found,
        else display the vehicles with a dropdown menu */}
          {/* Begin ternary */}
          {this.props.vehicles.length === 0 ? (
            <div className="row">
              <div className="col-md-12">
                <strong>No Vehicles on record.</strong>
              </div>
            </div>
          ) : (
              <div className="row">
                <div className="col-md-4">
                  <p>My Vehicles</p>
                </div>
                <div className="col-md-4 noVehicles">
                  <select id="vehicleDropDown" ref="myVehicles">
                    {vehicleOptions}
                  </select>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn-success">View Logs</button>
                </div>
              </div>
            )}
          {/* End ternary */}
        </div>
      </form>
    );
  };
};
export default MyVehicles;
