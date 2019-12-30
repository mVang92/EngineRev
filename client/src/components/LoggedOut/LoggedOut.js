import React from "react";
import createAccountLogo from "../../images/createAccount.png"
import recordLogsLogo from "../../images/recordLogs.png"
import manageDataLogo from "../../images/manageData.png"
import notLoggedInCarGif from "../../images/notLoggedInCarGif.gif"

const LoggedOut = () => {
  return (
    <div id="loggedOut" className="container">
      <div className="row">
        <div className="col-md-6">
          <label><h2>Easily record service records for your vehicles.</h2></label>
          <div className="row">
            <div className="col-md-12 centerOnMobile">
              <img id="notLoggedInCarGif" src={notLoggedInCarGif} alt="Create Account"></img>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row mt-3">
            <div className="col-md-2">
              <img className="notLoggedInImages" src={createAccountLogo} alt="Create Account"></img>
            </div>
            <div className="col-md-10">
              <label><h6><strong>Create an account</strong> to get your car space started.</h6></label>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-2">
              <img className="notLoggedInImages" src={recordLogsLogo} alt="Record Services"></img>
            </div>
            <div className="col-md-10">
              <label><h6><strong>Add multiple vehicles</strong> and keep track of service history.</h6></label>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-2">
              <img className="notLoggedInImages" src={manageDataLogo} alt="Manage Data"></img>
            </div>
            <div className="col-md-10">
              <label><h6><strong>Manage data</strong> through an easy to navigate user interface.</h6></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedOut;
