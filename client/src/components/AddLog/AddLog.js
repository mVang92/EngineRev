import React, { Component } from "react";

class AddLog extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmitOneServiceLog}>
        <div className="row">
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Date</strong></label>
            <input
              type="date"
              ref="date"
              onChange={this.props.handleChange}
              value={this.props.date}
              name="date"
              placeholder="Required">
            </input>
          </div>
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Mileage</strong></label>
            <input
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
          <div className="col-md-2">
            <label><strong>Comments</strong></label>
          </div>
          <div className="col-md-10">
            <textarea
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
          <div className="col-md-2">
            <a href="/">
              <button
                title="Back"
                type="button"
                className="cancelBtn">
                Back
              </button>
            </a>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-2 logDeleteBtn">
            <button
              title="Delete This Vehicle"
              type="button"
              className="deleteBtn"
              onClick={this.props.showDeleteOneVehicleModal}>
              Delete Vehicle
            </button>
          </div>
          <div className="col-md-2 logResetBtn">
            <button
              title="Reset Input Fields"
              type="reset"
              className="resetBtn"
              onClick={this.props.handleResetLogVehicleForm}>
              Reset Fields
            </button>
          </div>
          <div className="col-md-2 logSubmitBtn">
            <button
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
