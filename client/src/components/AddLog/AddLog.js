import React from "react";

const AddLog = props => {
  const { handleChange } = props;

  return (
    <React.Fragment>
      {
        props.year ?
          (
            <form onSubmit={props.checkUserEnteredServiceLogInput}>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="serviceLogDateInput"><span className="required">*</span><strong>Date</strong></label>
                  <input
                    id="serviceLogDateInput"
                    type="date"
                    onChange={handleChange}
                    value={props.date}
                    name="date">
                  </input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="serviceLogMileageInput"><span className="required">*</span><strong>Mileage</strong></label>
                  <input
                    id="serviceLogMileageInput"
                    type="text"
                    onChange={handleChange}
                    value={props.mileage}
                    name="mileage"
                    maxLength="7">
                  </input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="serviceLogServiceInput"><span className="required">*</span><strong>Service</strong></label>
                  <input
                    id="serviceLogServiceInput"
                    type="text"
                    onChange={handleChange}
                    value={props.service}
                    name="service"
                    maxLength="100">
                  </input>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-2 logButtonsMobileDisplay">
                  <label htmlFor="serviceLogCommentsInput"><strong>Comments</strong></label>
                </div>
                <div className="col-md-10">
                  <textarea
                    id="serviceLogCommentsInput"
                    className="commentsBox"
                    onChange={handleChange}
                    value={props.comment}
                    name="comment"
                    maxLength="300">
                  </textarea>
                </div>
              </div>
              <div className="row smallMarginTop">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="row text-center">
                    <div className="col-md-6 centerWidthMobileDisplay">
                      <button
                        id="addServiceLogButton"
                        title="Submit Log"
                        type="submit"
                        className="addBtn"
                        disabled={props.disableAddServiceLogButton}>
                        Submit Log
                      </button>
                    </div>
                    <div className="col-md-6 centerWidthMobileDisplay">
                      <button
                        id="addLogResetInputFieldsButton"
                        title="Reset Input Fields"
                        type="reset"
                        className="resetButton"
                        onClick={props.handleResetLogVehicleForm}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) :
          (
            null
          )
      }
    </React.Fragment>
  );
};

export default AddLog;
