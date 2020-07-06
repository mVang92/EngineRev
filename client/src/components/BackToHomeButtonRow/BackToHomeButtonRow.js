import React from "react";
import { Link } from "react-router-dom";
import { defaults } from "../../assets/Defaults";

const BackToHomeButtonRow = props => {
  return (
    <div className="row">
      <div className="col-md-4">
        <Link to={{ pathname: "/" }}>
          <button className="backHomeBtn" title="Back">Back</button>
        </Link>
        <br />
      </div>
      <div className="col-md-4"></div>
      {
        window.location.href.indexOf("/forum") > -1 && props.loggedin ?
          (
            <div className="col-md-4">
              <div className="alignLeftButtonsMobileDisplay alignRightButtonsDesktopDisplay">
                <button
                  id="startNewThreadButton"
                  title="New Thread"
                  type="button"
                  className="standardButton"
                  data-toggle="collapse"
                  data-target="#startThreadForm"
                  aria-expanded="false"
                  aria-controls="collapse">
                  {defaults.startANewThread}
                </button>
              </div>
            </div>
          ) :
          (
            <div className="col-md-4"></div>
          )
      }
    </div>
  );
};

export default BackToHomeButtonRow;
