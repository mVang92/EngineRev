import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="hideWhilePrinting">
      <div className="row">
        {/* <div className="col-md-2"></div> */}
        <div className="col-md-6">
          <Link to={{ pathname: "/about" }}>
            <span className="footerAboutLink underline">About</span>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to={{ pathname: "/updates" }}>
            <span className="footerUpdatesLink underline">Release Notes</span>
          </Link>
        </div>
        {/* <div id="footerSuggestionsLink" className="col-md-2">
          <span className="pointer">Submit Suggestions</span>
        </div>
        <div id="footerHelpLink" className="col-md-2">
          <span className="pointer">Help</span>
        </div>
        <div className="col-md-2"></div> */}
      </div>
    </footer>
  );
};

export default Footer;
