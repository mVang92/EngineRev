import React from "react";
import { defaults } from "../../assets/Defaults";

const LogPageErrorHeader = props => {
  const errorMessage = props.errorMessage.toString();
  return (
    <div id="noPermissionToViewVehicleLogs" className="col-md-12 text-center text-danger">
      {
        errorMessage ?
          (
            <label><h3>{errorMessage}</h3></label>
          ) :
          (
            <label><h3>{defaults.noAuthorizationToViewPage}</h3></label>
          )
      }
    </div>
  );
};

export default LogPageErrorHeader;
