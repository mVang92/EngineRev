import React from "react";
import Footer from "../Footer";
import createAccountLogo from "../../images/createAccount.png"
import recordLogsLogo from "../../images/recordLogs.png"
import collaborate from "../../images/collaborate.png"

const LoggedOut = () => {
  return (
    <React.Fragment>
      <div className="row section noMarginDesktopDisplay">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-4 smallMarginTopMobileDisplay">
              <div className="row">
                <div className="col-md-3">
                  <img className="notLoggedInImages" src={createAccountLogo} alt="Create Account"></img>
                </div>
                <div className="col-md-9">
                  <label><h6><strong>Create an account</strong> to track vehicle service logs.</h6></label>
                </div>
              </div>
            </div>
            <div className="col-md-4 smallMarginTopMobileDisplay">
              <div className="row">
                <div className="col-md-3">
                  <img className="notLoggedInImages" src={recordLogsLogo} alt="Record Services"></img>
                </div>
                <div className="col-md-9">
                  <label><h6><strong>Log service history</strong> for multiple vehicles.</h6></label>
                </div>
              </div>
            </div>
            <div className="col-md-4 smallMarginTopMobileDisplay">
              <div className="row">
                <div className="col-md-3">
                  <img className="notLoggedInImages" src={collaborate} alt="Collaborate"></img>
                </div>
                <div className="col-md-9">
                  <label><h6><strong>Collaborate with others</strong> through the forum.</h6></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
      <Footer />
    </React.Fragment>
  );
};

export default LoggedOut;
