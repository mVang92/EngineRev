import React from "react";
import noMatchGif from "../../images/noMatch.gif";
import { defaults } from "../../assets/Defaults";

const NoAuthorization = () => {
  return (
    <React.Fragment>
      <div id="noAuthorization" className="text-center text-danger mt-3 section">
        <label><h3>{defaults.noAuthorizationToViewPage}</h3></label>
        <hr />
        <a href="/" title="Get me out of here!"><button className="backHomeBtn">← Home</button></a>
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <img id="noMatchImage" src={noMatchGif} alt="No Match"></img>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoAuthorization;
