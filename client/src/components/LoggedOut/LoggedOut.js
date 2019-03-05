import React from "react";
import createAccountLogo from "../../images/createAccount.png"
import recordLogsLogo from "../../images/recordLogs.png"
import manageDataLogo from "../../images/manageData.png"

const LoggedOut = () =>
  <div className="box">
    <div className="row">
      <div className="col-md-6">
        <label><h2>Easily record service records to your vehicle through CarLog.</h2></label>
        <br></br><br></br>
        <div className="row">
          <div className="col-md-2">
            <img class="notLoggedInImages" src={createAccountLogo} alt="Create Account"></img>
          </div>
          <div className="col-md-10">
            <label><h6><strong>Create an account</strong> to start adding service records.</h6></label>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-2">
            <img class="notLoggedInImages" src={recordLogsLogo} alt="Record Services"></img>
          </div>
          <div className="col-md-10">
            <label><h6><strong>Record service information</strong> for your vehicles.</h6></label>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-2">
            <img class="notLoggedInImages" src={manageDataLogo} alt="Manage Data"></img>
          </div>
          <div className="col-md-10">
            <label><h6><strong>Manage data</strong> through an easy to navigate user interface.</h6></label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        null
      </div>
    </div>
  </div>

export default LoggedOut;
