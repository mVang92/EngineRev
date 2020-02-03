import React from "react";
import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";

const OneUpdate = props => {
  const updateId = props._id;
  const defaultDate = props.date;
  const updateChanges = props.updateChanges;
  const knownIssues = props.knownIssues;
  const editValue = "edit";
  const deleteValue = "delete";
  const formattedDate = defaultDate.substring(0, 10);

  return (
    <React.Fragment key={updateId}>
      <div className={`releaseNote ${props.currentTheme.oneUpdate}`}>
        <div className="row">
          <div className="col-md-3"><label><strong>Date:</strong></label></div>
          <div className="col-md-7"><label>{formattedDate}</label></div>
          <div className="col-md-2 bottomMarginMobileDisplay">
            {
              props.admin ?
                (
                  <div className="row centerButtonMobileDisplay">
                    <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
                      <button
                        id="deleteActionButton"
                        title="Delete Log"
                        onClick={(event) => props.getActionValue(event, updateId, updateChanges, knownIssues, deleteValue)}>
                        <img id="deleteIcon" src={deleteIcon} alt="delete"></img>
                      </button>
                    </div>
                    <div className="col-md-6 hideWhilePrinting actionButtonsMobileDisplay">
                      <button
                        id="editActionButton"
                        title="Edit Log"
                        onClick={(event) => props.getActionValue(event, updateId, updateChanges, knownIssues, editValue)}>
                        <img id="editIcon" src={editIcon} alt="edit"></img>
                      </button>
                    </div>
                  </div>
                ) : (
                  null
                )
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"><label><strong>Updates:</strong></label></div>
          <div className="col-md-9 wrapword"><label>{props.updateChanges}</label></div>
        </div>
        <div className="row">
          <div className="col-md-3"><label><strong>Known Issues:</strong></label></div>
          <div className="col-md-9 wrapword"><label>{props.knownIssues}</label></div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OneUpdate;
