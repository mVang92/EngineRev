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

  handleSubmitAddOneVehicle = e => {
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
      }, () => {
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
        <form id="field" onSubmit={this.handleSubmitAddOneVehicle.bind(this)}>
          <div className="text-center row">
            <div className="col-md-6">
              <label><strong><span id="userEmail"></span></strong></label>
            </div>
            <div className="col-md-6">
              <label><strong>Vehicles on record: <span id="vehicleCountForUser">0</span></strong></label>
            </div>
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
                    id="vehicleYearInput"
                    type="text"
                    ref="year"
                    onChange={this.props.handleChange}
                    value={this.props.year}
                    name="year"
                    maxLength="4"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <label><span className="required">*</span>Make</label>
                </div>
                <div>
                  <input
                    id="vehicleMakeInput"
                    type="text"
                    ref="make"
                    onChange={this.props.handleChange}
                    value={this.props.make}
                    name="make"
                    maxLength="25"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <label><span className="required">*</span>Model</label>
                </div>
                <div>
                  <input
                    id="vehicleModelInput"
                    type="text"
                    ref="model"
                    onChange={this.props.handleChange}
                    value={this.props.model}
                    name="model"
                    maxLength="25"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="col-md-12 text-center">
                  <button
                    id="addVehicleButton"
                    title="Add This Vehicle"
                    type="submit"
                    className="addBtn">
                    Add Vehicle
                    </button>
                </div>
                <br />
                <div className="col-md-12 text-center">
                  <button
                    id="resetVehicleInputFieldsButton"
                    title="Reset Input Fields"
                    type="reset"
                    className="resetBtn"
                    onClick={this.props.handleResetAddVehicleFields}>
                    Reset Fields
                    </button>
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
