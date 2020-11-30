import React from "react";
import { defaults } from "../../assets/Defaults";

const OneUpdate = props => {
  const {
    _id,
    date,
    roles,
    currentTheme,
    updateChanges,
    knownIssues,
    editOneUpdateModal
  } = props;
  const dateSubString = date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");

  return (
    <React.Fragment key={_id}>
      <div className={`fadeIn releaseNote ${currentTheme.oneUpdate}`}>
        <div className="row">
          <div className="col-md-3"><label><strong>Date:</strong></label></div>
          <div className="col-md-6"><label>{formattedDate}</label></div>
          <div className="col-md-3 alignRightButtonsDesktopDisplay alignLeftButtonsMobileDisplay">
            {
              roles.includes(defaults.adminRole) ?
                (
                  <button
                    className="editActionButton smallMarginTopMobileDisplay"
                    title="Edit Release Note"
                    onClick={() => editOneUpdateModal(_id, updateChanges, knownIssues)}>
                    Edit
                  </button>
                ) :
                (
                  null
                )
            }
          </div>
        </div>
        <hr className="oneUpdateHr" />
        <div className="row">
          <div className="col-md-3"><label><strong>Updates:</strong></label></div>
          <div className="col-md-9 breakWord">{updateChanges}</div>
        </div>
        <hr className="oneUpdateHr" />
        <div className="row">
          <div className="col-md-3"><label><strong>Known Issues:</strong></label></div>
          <div className="col-md-9 breakWord">{knownIssues}</div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneUpdate;
