import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackToHomeButtonRow extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <Link to={{ pathname: "/" }}>
            <button className="backHomeBtn" title="Back">Back</button>
          </Link>
          <br />
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
    );
  };
};

export default BackToHomeButtonRow;
