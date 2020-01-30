import React, { Component } from "react";
import carSpaceLogo from "../../images/carSpaceLogo.png";
import { Link } from "react-router-dom";

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props
    };
  };

  render() {
    return (
      <div className="container">
        <div id="aboutCarspaceContainer" className="text-center ">
          <div id="field"></div>
          <br />
          <img id="carSpaceLogo" src={carSpaceLogo}></img>
        </div>
        <div className="box">
          <div className="row">
            <div className="col-md-12 text-center">
              <label><h5>About CarSpace</h5></label>
            </div>
          </div>
          <label>
            <p>CarSpace allows you to keep track of your vehicle maintenance history.
            Keep your vehicle running smoothly by adding your own vehicles and recording their service logs.
            Organize records and keep track of your services with CarSpace.</p>
          </label>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <label><h5>Who is CarSpace For?</h5></label>
            </div>
          </div>
          <label>
            <p>CarSpace is for anyone, mechanically inclined or not, who want to keep track of their vehicle service maintenance history.
            Users can create their own accounts and add vehicles they want to keep track of. They can also update their
            account information along with updating vehicle and service log information.
            Service logs are tracked by adding the date of service, the mileage of the vehicle, and the type of service performed on the vehicle.
            This will allow the user to keep track of specific maintenance or repair information.</p>
          </label>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <label><h5>A Little About the Creator</h5></label>
            </div>
          </div>
          <label>
            <p>Not only do I work full-time as a Software Engineer, but I also have several years of experience in automotive repair
            (you don’t see that combination every day). As an automotive mechanic, I need a program where I can easily pull it up on a computer
            or my phone to access my vehicle maintenance and repair history,
            while being able to add new vehicles and service logs as well. This is where I thought of creating CarSpace (formerly known as CarLog),
            which allows just that without worrying about paying for monthly or annual subscriptions.
            CarSpace is intended to be simple to use and to the point.</p>
          </label>
          <br />
          <Link to={{ pathname: "/" }}>
            <button className="backHomeBtn">Back</button>
          </Link>
        </div>
      </div>
    );
  };
};
