import React from "react";
import { Link } from "react-router-dom";
import engineRevLogo from "../../images/engineRevLogo.png";
import { defaults } from "../../assets/Defaults";

const About = props => {
  const { currentTheme } = props;

  return (
    <div className="container">
      <div id="aboutEngineRevContainer" className={`text-center ${currentTheme.background}`}>
        <br /><br />
        <img id="engineRevLogoAboutPage" src={engineRevLogo} alt="EngineRev Logo" />
      </div>
      <div className={`box ${currentTheme.background}`}>
        <div className={`fadeIn smallPadding ${currentTheme.accountDetails}`}>
          <div className="row">
            <div className="col-md-12 text-center">
              <label><h5>About EngineRev</h5></label>
            </div>
          </div>
          <label><p>{defaults.aboutEngineRev}</p></label>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <label><h5>Who is EngineRev For?</h5></label>
            </div>
          </div>
          <label><p>{defaults.whoIsEngineRevFor}</p></label>
        </div>
        <br />
        <Link to={{ pathname: "/" }}>
          <button className="backHomeBtn" title="Back">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default About;
