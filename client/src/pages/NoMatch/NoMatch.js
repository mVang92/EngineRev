import React from "react";
import noMatchGif from "../../images/noMatch.gif";

const NoMatch = () => (
  <div className="text-center text-danger mt-3">
    <label><h3>Invalid route or no permission to view content.</h3></label>
    <br />
    <a href="/"><button className="backHomeBtn">← Back Home</button></a>
    <br />
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <img className="notLoggedInImages" src={noMatchGif} alt="No Match"></img>
      </div>
      <div className="col-md-4"></div>
    </div>
  </div>
);

export default NoMatch;
