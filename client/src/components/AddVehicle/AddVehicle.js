import React, { Component } from "react";
import AddVehicleErrorModal from "../Modal/AddVehicleErrorModal";

class AddVehicle extends Component {
  constructor() {
    super();
    this.state = {
      newVehicle: {},
      showAddVehicleErrorModal: false
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.refs.year.value === "" || this.refs.make.value === "" || this.refs.model.value === "") {
      this.showAddVehicleErrorModal()
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

  showAddVehicleErrorModal = () => {
    this.setState({ showAddVehicleErrorModal: true });
  };

  hideAddVehicleErrorModal = () => {
    this.setState({ showAddVehicleErrorModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <form id="field" onSubmit={this.handleSubmit.bind(this)}>
          <div className="text-center">
            <label><h5>Hello <span id="userEmail"></span>!</h5></label>
          </div>
          <hr></hr>
          <div>
            <div className="row">
              <div className="col-md-12 text-center">
                <label><strong>Add a Vehicle</strong></label>
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
        <AddVehicleErrorModal
          showAddVehicleErrorModal={this.state.showAddVehicleErrorModal}
          hideAddVehicleErrorModal={this.hideAddVehicleErrorModal}
        />
      </React.Fragment>
    );
  };
};

export default AddVehicle;
