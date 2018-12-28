import React, { Component } from "react";

class AddLog extends Component {
  state = {

  };
  
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Date</strong></label>
            <input
              type="date"
              ref="date"
              onChange={this.props.handleChange}
              value={this.props.date}
              name="date"
              placeholder="Required"></input>
          </div>
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Mileage</strong></label>
            <input
              type="text"
              ref="mileage"
              onChange={this.props.handleChange}
              value={this.props.mileage}
              name="mileage"
              placeholder="Required"></input>
          </div>
          <div className="col-md-4">
            <label><span className="required">*</span><strong>Services</strong></label>
            <input
              type="text"
              ref="service"
              onChange={this.props.handleChange}
              value={this.props.service}
              name="service"
              placeholder="Required"></input>
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
              placeholder="Optional"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-2 logResetBtn">
            <button type="button" onClick={this.props.handleReset}>Reset</button>
          </div>
          <div className="col-md-2 logSubmitBtn">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
};

export default AddLog;