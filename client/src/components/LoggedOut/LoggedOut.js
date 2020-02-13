import React from "react";
import Footer from "../Footer";
import createAccountLogo from "../../images/createAccount.png"
import recordLogsLogo from "../../images/recordLogs.png"
import manageDataLogo from "../../images/manageData.png"
import notLoggedIn from "../../images/notLoggedIn.png"

const LoggedOut = () => {
  return (
    <React.Fragment>
      <div className="row section noMarginDesktopDisplay">
        <div id="heading" className="col-md-12 text-center">
          <br /><br />
          <div><label><h3>Easily record service logs for your vehicles</h3></label></div>
          <div><img id="notLoggedInMainImage" src={notLoggedIn} alt="Create Account"></img></div>
        </div>
      </div>
      <div className="section noMarginDesktopDisplay">
        <div className="col-md-12">
          <div className="mt-3">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-3">
                    <img className="notLoggedInImages" src={createAccountLogo} alt="Create Account"></img>
                  </div>
                  <div className="col-md-9">
                    <label><h6><strong>Create an account</strong> to get your car space started.</h6></label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-3">
                    <img className="notLoggedInImages" src={recordLogsLogo} alt="Record Services"></img>
                  </div>
                  <div className="col-md-9">
                    <label><h6><strong>Add multiple vehicles</strong> and keep track of service history.</h6></label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-3">
                    <img className="notLoggedInImages" src={manageDataLogo} alt="Manage Data"></img>
                  </div>
                  <div className="col-md-9">
                    <label><h6><strong>Manage data</strong> through an easy to navigate user interface.</h6></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <Footer />
    </React.Fragment>
  );
};

export default LoggedOut;
