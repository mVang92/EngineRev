import React, { Component } from "react";
import { defaults } from "../../assets/Defaults";
import { Link } from "react-router-dom";
import AddVehicleErrorModal from "../Modal/AddVehicleErrorModal";

class AddVehicleSection extends Component {
  constructor() {
    super();
    this.state = {
      showAddVehicleErrorModal: false,
      defaultProfilePicture: defaults.defaultProfilePicture
    };
  };

  /**
   * Check if the vehicle inputs are blank
   */
  checkIfVehicleInputsAreBlank = e => {
    e.preventDefault();
    if (
      this.props.checkIfStringIsBlank(this.refs.year.value) ||
      this.props.checkIfStringIsBlank(this.refs.make.value) ||
      this.props.checkIfStringIsBlank(this.refs.model.value)
    ) {
      this.showAddVehicleErrorModal();
    } else {
      const vehiclePayload = {
        vehicleName: null,
        year: this.refs.year.value,
        make: this.refs.make.value,
        model: this.refs.model.value
      }
      this.props.checkIfVehicleYearIsValid(vehiclePayload);
    }
  };

  /**
   * Show the error modal while adding a vehicle
   */
  showAddVehicleErrorModal = () => {
    this.setState({ showAddVehicleErrorModal: true });
  };

  /**
   * Hide the error modal while adding a vehicle
   */
  hideAddVehicleErrorModal = () => {
    this.setState({ showAddVehicleErrorModal: false });
  };

  render() {
    return (
      <>
        <form id="addVehicleInputForm" onSubmit={this.checkIfVehicleInputsAreBlank.bind(this)}>
          <div className="text-center row">
            <div className="col-md-6 wrapword">
              <Link to={{ pathname: "/account" }}>
                <img
                  id="mainPageProfilePicture"
                  src={this.props.profilePicture}
                  alt={this.props.displayName}
                  title={this.props.displayName}
                />
              </Link>
              <label><strong><span id="displayName">{this.props.displayName}</span></strong></label>
            </div>
            <div className="col-md-6"></div>
          </div>
          <hr className={this.props.currentTheme.hr}></hr>
          <div>
            <div className="row">
              <div className="col-md-12 smallBottomMargin text-center">
                <label><strong>Add a Vehicle</strong></label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div>
                  <label htmlFor="vehicleYearInput"><span className="required">*</span>Year</label>
                </div>
                <div>
                  <input
                    id="vehicleYearInput"
                    type="text"
                    ref="year"
                    value={this.props.year}
                    name="year"
                    maxLength="4"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <label htmlFor="vehicleMakeInput"><span className="required">*</span>Make</label>
                </div>
                <div>
                  <input
                    id="vehicleMakeInput"
                    type="text"
                    ref="make"
                    value={this.props.make}
                    name="make"
                    maxLength="25"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <label htmlFor="vehicleModelInput"><span className="required">*</span>Model</label>
                </div>
                <div>
                  <input
                    id="vehicleModelInput"
                    type="text"
                    ref="model"
                    value={this.props.model}
                    name="model"
                    maxLength="25"
                  />
                </div>
              </div>
            </div>
            <div className="row smallMarginTop">
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="row text-center">
                  <div className="col-md-6 centerWidthMobileDisplay">
                    <button
                      id="addVehicleButton"
                      title="Add Vehicle"
                      type="submit"
                      className="addBtn"
                      disabled={this.props.disableAddVehicleButton}>
                      Add Vehicle
                    </button>
                  </div>
                  <div className="col-md-6 centerWidthMobileDisplay">
                    <button
                      id="resetVehicleInputFieldsButton"
                      title="Reset Input Fields"
                      type="reset"
                      className="resetButton"
                      onClick={this.props.handleResetAddVehicleFields}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <AddVehicleErrorModal
          showAddVehicleErrorModal={this.state.showAddVehicleErrorModal}
          hideAddVehicleErrorModal={this.hideAddVehicleErrorModal}
          currentTheme={this.props.currentTheme}
        />
      </>
    );
  };
};

export default AddVehicleSection;
