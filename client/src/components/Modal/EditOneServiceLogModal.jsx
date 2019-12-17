import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const EditOneServiceLogModal = props => {
    let date = new Date(props.state.serviceLogDate),
        month = "" + (date.getMonth() + 1),
        day = "" + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;

    let serviceLogDate = [year, month, day].join("-");

    return (
        <ReactModal
            isOpen={props.showEditOneLogModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10 text-danger">
                                <label><strong>Edit service log</strong></label>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Date:</strong>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        type="date"
                                        onChange={props.handleChange}
                                        defaultValue={serviceLogDate}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Mileage:</strong>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        maxLength="7"
                                        onChange={props.handleChange}
                                        defaultValue={props.state.serviceLogMileage}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Service:</strong>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        maxLength="50"
                                        onChange={props.handleChange}
                                        defaultValue={props.state.serviceLogService}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Comments:</strong>
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        className="commentsBox"
                                        type="text"
                                        maxLength="250"
                                        onChange={props.handleChange}
                                        defaultValue={props.state.serviceLogComment}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Cancel"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideEditOneServiceLogModal}
                                data-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                title="Save Service Log"
                                id="confirmSaveEditServiceLogButton"
                                className="cancelBtn"
                                type="button"
                                onClick={props.handleEditOneServiceLog}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default EditOneServiceLogModal;
