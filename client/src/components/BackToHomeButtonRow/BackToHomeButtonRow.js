import React from "react";
import { Link } from "react-router-dom";
import SortThreadsDropdown from "../SortThreadsDropdown";

const BackToHomeButtonRow = props => {
  return (
    <div className="row">
      <div className="col-md-4">
        <Link to={{ pathname: "/" }}>
          <button className="backHomeBtn" title="Back">Back</button>
        </Link>
      </div>
      {
        (window.location.href.indexOf("/forum") > -1) && (props.loggedin) ?
          (
            <div className="col-md-4 smallMarginTopMobileDisplay centerWidthMobileDisplay centerDesktopDisplay">
              <button
                id="composeThreadButton"
                title="New Thread"
                type="button"
                className="standardButton"
                data-toggle="collapse"
                data-target="#startThreadForm"
                aria-expanded="false"
                aria-controls="collapse">
                Compose
              </button>
            </div>
          ) :
          (
            <div className="col-md-4"></div>
          )
      }
      {
        window.location.href.indexOf("/forum") > -1 ?
          (
            <div className="col-md-4 smallMarginTopMobileDisplay ">
              <SortThreadsDropdown
                handleChange={props.handleChange}
                defaultSortOrder={props.defaultSortOrder}
                disableSortThreadsButton={props.disableSortThreadsButton}
                renderSortedThreads={props.renderSortedThreads}
              />
            </div>
          ) : (
            <div className="col-md-4"></div>
          )
      }
    </div>
  );
};

export default BackToHomeButtonRow;
