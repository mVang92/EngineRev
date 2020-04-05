import React from "react";
import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";

const OneUpdate = props => {
  const {
    _id,
    date,
    currentTheme,
    updateChanges,
    knownIssues
  } = props;
  const editValue = "edit";
  const deleteValue = "delete";
  const dateSubString = date.substring(0, 10);
  const newDate = new Date(dateSubString);
  newDate.setDate(newDate.getDate() + 1);
  const formattedDate = newDate.toLocaleDateString("en-US");

  return (
    <React.Fragment key={_id}>
      <div className={`releaseNote ${currentTheme.oneUpdate}`}>
        <div className="row">
          <div className="col-md-3"><label><strong>Date:</strong></label></div>
          <div className="col-md-9"><label>{formattedDate}</label></div>
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
        {
          props.admin ?
            (
              <React.Fragment>
                <hr className="oneUpdateHr" />
                <div className="row">
                  <div className="col-md-9"></div>
                  <div className="col-md-3 smallNegativeTopMargin">
                    <div className="row centerButtonMobileDisplay">
                      <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
                        <button
                          className="deleteReleaseNoteActionButton"
                          title="Delete Release Note"
                          onClick={event => props.getActionValue(event, _id, updateChanges, knownIssues, deleteValue)}>
                          <img className="deleteIcon" src={deleteIcon} alt="delete"></img>
                        </button>
                      </div>
                      <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
                        <button
                          className="editReleaseNoteActionButton"
                          title="Edit Release Note"
                          onClick={event => props.getActionValue(event, _id, updateChanges, knownIssues, editValue)}>
                          <img className="editIcon" src={editIcon} alt="edit"></img>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              null
            )
        }
      </div>
    </React.Fragment>
  )
};

export default OneUpdate;
