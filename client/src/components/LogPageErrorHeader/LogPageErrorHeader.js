import React from "react";

const LogPageErrorHeader = props => {
  const errorMessage = props.errorMessage.toString();
  return (
    <div id="noPermissionToViewVehicleLogs" className="col-md-12 text-center text-danger">
      {
        errorMessage ?
          (
            <label><h3>{errorMessage}</h3></label>
          ) : (
            <label><h3>You do not have permission to view this content</h3></label>
          )
      }
    </div>
  );
};

export default LogPageErrorHeader;
