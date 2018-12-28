import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";

class Log extends Component {
  state = {
    vehicle: {},
    logs: {},
    date: "",
    mileage: "",
    service: "",
    comment: ""
  };

  // When this component mounts, grab the vehicle with the _id of this.props.match.params.id
  // e.g. localhost:3000/vehicle/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getVehicle(this.props.match.params.id)
      .then(res => this.setState({ vehicle: res.data }))
      .catch(err => console.log(err));
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log(name, value);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.refs.date.value === "" || this.refs.mileage.value === "" || this.refs.service.value === "") {
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

  handleReset = () => {
    console.log("Form Reset")
    document.getElementById("field").reset();
  };

  render() {
    return (
      <Container>
        <div className="box rounded">
          <div className="row">
            <div className="col-md-12 text-center">
              <label>Viewing logs for your {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}</label>
            </div>
          </div>
          <hr />
          <div className="row innerBox">
            <div className="col-md-3">
              <label><strong>Date</strong></label>
            </div>
            <div className="col-md-3">
              <label><strong>Mileage</strong></label>
            </div>
            <div className="col-md-3">
              <label><strong>Service</strong></label>
            </div>
            <div className="col-md-3">
              <label><strong>Comments</strong></label>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <label><strong>Enter new service log</strong></label>
            </div>
          </div>
          <div className="innerBox">
            <form id="field" onSubmit={this.handleSubmit.bind(this)}>
              <div className="row">
                <div className="col-md-4">
                  <label><span className="required">*</span><strong>Date</strong></label>
                  <input
                    type="date"
                    ref="date"
                    onChange={this.handleChange}
                    value={this.date}
                    name="date"
                    placeholder="Required"></input>
                </div>
                <div className="col-md-4">
                  <label><span className="required">*</span><strong>Mileage</strong></label>
                  <input
                    type="text"
                    ref="mileage"
                    onChange={this.handleChange}
                    value={this.mileage}
                    name="mileage"
                    placeholder="Required"></input>
                </div>
                <div className="col-md-4">
                  <label><span className="required">*</span><strong>Services</strong></label>
                  <input
                    type="text"
                    ref="service"
                    onChange={this.handleChange}
                    value={this.service}
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
                    onChange={this.handleChange}
                    value={this.comment}
                    name="comment"
                    placeholder="Optional"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-2 logResetBtn">
                  <button type="button" onClick={this.handleReset}>Reset</button>
                </div>
                <div className="col-md-2 logSubmitBtn">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    );
  };
};

export default Log;
