import React from "react";

const NoMatch = () => (
  <div className="text-center text-danger mt-3">
    <label><h3>Invalid route or no permission to view content.</h3></label>
    <br />
    <a  href="/"><button className="backHomeBtn">← Back Home</button></a>
  </div>
);

export default NoMatch;
