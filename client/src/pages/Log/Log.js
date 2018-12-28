import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Container from "../../components/Container";

class Log extends Component {
  state = {
    vehicle: {}
  };

  // When this component mounts, grab the vehicle with the _id of this.props.match.params.id
  // e.g. localhost:3000/vehicle/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getVehicle(this.props.match.params.id)
      .then(res => this.setState({ vehicle: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <div className="box rounded">
          {this.state.vehicle.year} {this.state.vehicle.make} {this.state.vehicle.model}
        </div>
      </Container>
    )
  }
}

export default Log;
