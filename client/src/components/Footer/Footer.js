import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="hideWhilePrinting">
      <div className="row">
        <div className="col-md-4">
          <Link to={{ pathname: "/forum" }}>
            <span className="footerUpdatesLink underline">Forum</span>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to={{ pathname: "/updates" }}>
            <span className="footerUpdatesLink underline">Release Notes</span>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to={{ pathname: "/about" }}>
            <span className="footerAboutLink underline">About</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
