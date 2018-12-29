import React, { Component } from "react";

class AddVehicle extends Component {
  constructor() {
    super();
    this.state = {
      newVehicle: {}
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.refs.year.value === "" || this.refs.make.value === "" || this.refs.model.value === "") {
      alert("Please fill in all of the neccessary fields.");
    } else {
      this.setState({
        newVehicle: {
          year: this.refs.year.value,
          make: this.refs.make.value,
          model: this.refs.model.value
        }
      }, function () {
        console.log(this.state);
        // IMPORTANT: This allows this component to pass states up to App.js
        // States pass through LoggedIn component first, then to App.js
        this.props.addVehicle(this.state.newVehicle);
      });
      document.getElementById("field").reset();
    };
  };

  render() {
    return (
      <form id="field" onSubmit={this.handleSubmit.bind(this)}>
        <div className="text-center">
          <p>Hello <span id="userEmail"></span>!</p>
        </div>
        <hr></hr>
        <div>
          <div className="row">
            <div className="col-md-12 text-center">
              <strong>Add a Vehicle</strong>
            </div>
          </div>
          <div className="row innerBox">
            <div className="col-md-3">
              <div>
                <label><span className="required">*</span>Year</label>
              </div>
              <div>
                <input
                  type="text"
                  ref="year"
                  onChange={this.props.handleChange}
                  value={this.props.year}
                  name="year"
                  placeholder="2010" />
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <label><span className="required">*</span>Make</label>
              </div>
              <div>
                <input
                  type="text"
                  ref="make"
                  onChange={this.props.handleChange}
                  value={this.props.make}
                  name="make"
                  placeholder="Lexus" />
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <label><span className="required">*</span>Model</label>
              </div>
              <div>
                <input
                  type="text"
                  ref="model"
                  onChange={this.props.handleChange}
                  value={this.props.model}
                  name="model"
                  placeholder="RX 350" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="col-md-12 text-center">
                <button type="submit" className="addBtn">Add Vehicle</button>
              </div>
              <br />
              <div className="col-md-12 text-center">
                <button type="reset" className="resetBtn">Reset Fields</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };
};

export default AddVehicle;
