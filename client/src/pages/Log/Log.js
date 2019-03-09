import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import AddLog from "../../components/AddLog";

class Log extends Component {
  state = {
    vehicle: [],
    vehicleId: "",
    logs: [],
    date: "",
    mileage: "",
    service: "",
    comment: "",
    logArray: []
  };

  // When this component mounts, grab the vehicle with the _id of this.props.match.params.id
  // e.g. localhost:3000/vehicle/599dcb67f0f16317844583fc
  componentDidMount = () => {
    API.getVehicle(this.props.match.params.id)
      .then(res => {
        console.log(res)
        this.setState({
          vehicle: res.data,
          // vehicleId: res.data.creator,
          // logArray: res.data.logs
        })
          // .catch(err => console.log(err))
      });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log(name, value);
  };

  handleSubmitLog = e => {
    e.preventDefault();
    if (this.state.date === "" || this.state.mileage === "" || this.state.service === "") {
      alert("Please fill in all of the neccessary fields.");
    } else {
      let log = {
        date: this.state.date,
        mileage: this.state.mileage,
        service: this.state.service,
        comment: this.state.comment
      };
      this.state.logs.push(log);
      this.setState({
        date: "",
        mileage: "",
        service: "",
        comment: ""
      }, function () {
        // console.log(this.state.logs);
      });
      // Unique vehicle ID
      var id = this.state.vehicleId;
      console.log(id)
      API.addLog(id, log)
        .then(function (res) {
          console.log(res.data.logs)
        })
        .catch(err => console.log(err));
    };
  };

  handleReset = () => {
    console.log("Form Reset")
    this.setState({
      date: "",
      mileage: "",
      service: "",
      comment: ""
    });
  };

  render() {
    return (
      <Container>
        <div className="box">
          <div className="row">
            <div className="col-md-12 text-center">
              {/* <label>Viewing logs for your {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}</label> */}
            </div>
          </div>
          <hr />
          <div className="row innerBox">
            <div className="col-md-3">
              <label><strong>Date</strong></label>
              {/* {this.state.logArray.map(({ date }) => {
                return (
                  <div>
                    <div>{date}</div>
                  </div>
                );
              })} */}
            </div>
            <div className="col-md-3">
              <label><strong>Mileage</strong></label>
              {/* {this.state.logArray.map(({ mileage }) => {
                return (
                  <div>
                    <div>{mileage}</div>
                  </div>
                );
              })} */}
            </div>
            <div className="col-md-3">
              <label><strong>Service</strong></label>
              {/* {this.state.logArray.map(({ service }) => {
                return (
                  <div>
                    <div>{service}</div>
                  </div>
                );
              })} */}
            </div>
            <div className="col-md-3">
              <label><strong>Comments</strong></label>
              {/* {this.state.logArray.map(({ comment }) => {
                return (
                  <div>
                    <div>{comment}</div>
                  </div>
                );
              })} */}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <label><strong>Enter new service log</strong></label>
            </div>
          </div>
          <div className="innerBox">
            <AddLog
              date={this.state.date}
              mileage={this.state.mileage}
              service={this.state.service}
              comment={this.state.comment}
              handleChange={this.handleChange}
              handleReset={this.handleReset}
              handleSubmit={this.handleSubmitLog}
            />
          </div>
        </div>
      </Container>
    );
  };
};

export default Log;
