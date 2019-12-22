import React, { Component } from "react";
import noMatchGif from "../../images/noMatch.gif";

class NoAuthorization extends Component {
  render() {
    return (
      <div id="noAuthorization" className="text-center text-danger mt-3">
        <label><h3>You do not have permission to view this content.</h3></label>
        <hr />
        <a href="/" title="Get me out of here!"><button className="backHomeBtn">← Back Home</button></a>
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <img id="noMatchImage" src={noMatchGif} alt="No Match"></img>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  };
};

export default NoAuthorization;
