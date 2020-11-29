import React from "react";
import { Link } from "react-router-dom";
import SortThreadsDropdown from "../SortThreadsDropdown";

const BackToHomeButtonRow = props => {
  return (
    <div className="row">
      <div className="col-md-4 centerOnMobile">
        <Link to={{ pathname: "/" }}>
          <button className="backHomeBtn" title="Back">Back</button>
        </Link>
      </div>
      {
        (window.location.href.indexOf("/forum") > -1) && (props.loggedin) ?
          (
            <div className="col-md-4 smallMarginTopMobileDisplay text-center">
              <button
                id="startNewThreadButton"
                title="New Thread"
                type="button"
                className="standardButton"
                data-toggle="collapse"
                data-target="#startThreadForm"
                aria-expanded="false"
                aria-controls="collapse">
                New
              </button>
            </div>
          ) :
          (
            <div className="col-md-4"></div>
          )
      }
      <div className="col-md-4 text-center"><SortThreadsDropdown /></div>
    </div>
  );
};

export default BackToHomeButtonRow;
