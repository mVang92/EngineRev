import React from "react";

const AddLog = props => {
  return (
    <React.Fragment>
      {
        props.year ?
          (
            <form onSubmit={props.checkUserEnteredServiceLogInput}>
              <div className="row">
                <div className="col-md-4">
                  <label><span className="required">*</span><strong>Date</strong></label>
                  <input
                    id="serviceLogDateInput"
                    type="date"
                    onChange={props.handleChange}
                    value={props.date}
                    name="date">
                  </input>
                </div>
                <div className="col-md-4">
                  <label><span className="required">*</span><strong>Mileage</strong></label>
                  <input
                    id="serviceLogMileageInput"
                    type="text"
                    onChange={props.handleChange}
                    value={props.mileage}
                    name="mileage"
                    maxLength="7">
                  </input>
                </div>
                <div className="col-md-4">
                  <label><span className="required">*</span><strong>Service</strong></label>
                  <input
                    id="serviceLogServiceInput"
                    type="text"
                    onChange={props.handleChange}
                    value={props.service}
                    name="service"
                    maxLength="50">
                  </input>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-2 logButtonsMobileDisplay">
                  <label><strong>Comments</strong></label>
                </div>
                <div className="col-md-10">
                  <textarea
                    id="serviceLogCommentsInput"
                    className="commentsBox"
                    onChange={props.handleChange}
                    value={props.comment}
                    name="comment"
                    maxLength="250">
                  </textarea>
                </div>
              </div>
              <div className="row smallMarginTop">
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3 text-center addLogButtonsMobileDisplay" >
                  <button
                    id="addLogResetInputFieldsButton"
                    title="Reset Input Fields"
                    type="reset"
                    className="resetButton"
                    onClick={props.handleResetLogVehicleForm}>
                    Reset
                  </button>
                </div>
                <div className="col-md-3 logSubmitBtn text-center addLogButtonsMobileDisplay">
                  <button
                    id="addServiceLogButton"
                    title="Submit Log"
                    type="submit"
                    className="addBtn"
                    disabled={props.disableAddServiceLogButton}>
                    Submit Log
                  </button>
                </div>
              </div>
            </form>
          ) : (
            null
          )
      }
    </React.Fragment>
  );
};

export default AddLog;
