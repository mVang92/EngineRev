import React from "react";
import createAccountLogo from "../../images/createAccount.png"
import recordLogsLogo from "../../images/recordLogs.png"
import manageDataLogo from "../../images/manageData.png"

const LoggedOut = () =>
  <React.Fragment>
    <div className="row mt-4">
      <div className="col-md-6">
        <label><h2>Easily record service records to multiple vehicles through CarLog.</h2></label>
      </div>
      <div className="col-md-6">
        <div className="row mt-3">
          <div className="col-md-2">
            <img className="notLoggedInImages" src={createAccountLogo} alt="Create Account"></img>
          </div>
          <div className="col-md-10">
            <label><h6><strong>Create an account</strong> to start adding service records.</h6></label>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-2">
            <img className="notLoggedInImages" src={recordLogsLogo} alt="Record Services"></img>
          </div>
          <div className="col-md-10">
            <label><h6><strong>Record service information</strong> for your vehicles.</h6></label>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-2">
            <img className="notLoggedInImages" src={manageDataLogo} alt="Manage Data"></img>
          </div>
          <div className="col-md-10">
            <label><h6><strong>Manage data</strong> through an easy to navigate user interface.</h6></label>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>

export default LoggedOut;
