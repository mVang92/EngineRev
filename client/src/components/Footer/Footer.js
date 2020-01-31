import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="hideWhilePrinting">
      <div className="row">
        <div className="col-md-2"></div>
        <div id="footerAboutLink" className="col-md-2">
          <Link to={{ pathname: "/about" }}>
            <span className="pointer footerAboutLink">About</span>
          </Link>
        </div>
        <div id="footerUpdatesLink" className="col-md-2">
          <Link to={{ pathname: "/updates" }}>
            <span className="pointer footerUpdatesLink">Release Notes</span>
          </Link>
        </div>
        <div id="footerSuggestionsLink" className="col-md-2">
          {/* <span className="pointer">Submit Suggestions</span> */}
        </div>
        <div id="footerHelpLink" className="col-md-2">
          {/* <span className="pointer">Help</span> */}
        </div>
        <div className="col-md-2"></div>
      </div>
    </footer>
  );
};

export default Footer;
