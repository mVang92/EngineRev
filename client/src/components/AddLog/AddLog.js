import React, { Component } from "react";

class AddLog extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmitOneServiceLog}>
        <div className="row">
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Date</strong></label>
            <input
              id="serviceLogDateInput"
              type="date"
              ref="date"
              onChange={this.props.handleChange}
              value={this.props.date}
              name="date">
            </input>
          </div>
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Mileage</strong></label>
            <input
              id="serviceLogMileageInput"
              type="text"
              ref="mileage"
              onChange={this.props.handleChange}
              value={this.props.mileage}
              name="mileage"
              maxLength="7">
            </input>
          </div>
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Service</strong></label>
            <input
              id="serviceLogServiceInput"
              type="text"
              ref="service"
              onChange={this.props.handleChange}
              value={this.props.service}
              name="service"
              maxLength="50">
            </input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-2 logButtonsMobileDisplay">
            <label><strong>Comments</strong></label>
          </div>
          <div className="col-md-10">
            <textarea
              id="serviceLogCommentsInput"
              className="commentsBox"
              ref="comment"
              onChange={this.props.handleChange}
              value={this.props.comment}
              name="comment"
              maxLength="250">
            </textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 logButtonsMobileDisplay">
            <a href="/">
              <button
                id="addLogBackButton"
                title="Back"
                type="button"
                className="cancelBtn">
                Back
              </button>
            </a>
          </div>
          <div className="col-md-2 sortServiceLogsByDateButton logButtonsMobileDisplay">
            {
              this.props.vehicleServiceLogs.length > 1 ? (
                <button
                  id="addLogDeleteVehicleButton"
                  title="Delete This Vehicle"
                  type="button"
                  className="cancelBtn"
                  onClick={this.props.changeSortOrder}>
                  Sort Dates
                </button>
              ) : (
                  <button
                    id="addLogDeleteVehicleButton"
                    title="Delete This Vehicle"
                    type="button"
                    className="cancelBtn"
                    disabled>
                    Sort Dates
                </button>
                )
            }
          </div>
          <div className="col-md-2 printPageButton logButtonsMobileDisplay">
            {
              this.props.vehicleServiceLogs.length > 0 ? (
                <button
                  id="printPageButton"
                  title="Print Service Logs"
                  type="button"
                  className="cancelBtn"
                  onClick={this.props.handlePrintPage}>
                  Print Logs
              </button>
              ) : (
                  <button
                    id="printPageButton"
                    title="Print Service Logs"
                    type="button"
                    className="cancelBtn"
                    disabled>
                    Print Logs
                  </button>
                )
            }
          </div>
          <div className="col-md-2 logDeleteBtn logButtonsMobileDisplay">
            <button
              id="addLogDeleteVehicleButton"
              title="Delete This Vehicle"
              type="button"
              className="deleteBtn"
              onClick={this.props.showDeleteOneVehicleModal}>
              Delete Vehicle
            </button>
          </div>
          <div className="col-md-2 logButtonsMobileDisplay">
            <button
              id="addLogResetInputFieldsButton"
              title="Reset Input Fields"
              type="reset"
              className="resetButton"
              onClick={this.props.handleResetLogVehicleForm}>
              Reset Fields
            </button>
          </div>
          <div className="col-md-2 logSubmitBtn logButtonsMobileDisplay">
            <button
              id="addServiceLogButton"
              title="Submit Service Log"
              type="submit"
              className="addBtn">
              Submit Log
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default AddLog;
