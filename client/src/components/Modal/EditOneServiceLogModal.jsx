import React from "react";
import ReactModal from "react-modal";

const EditOneServiceLogModal = props => {
    const {
        serviceLogDate,
        showEditOneLogModal,
        checkUserEnteredUpdatedServiceLogInput,
        currentTheme,
        handleChange,
        serviceLogMileage,
        serviceLogService,
        serviceLogComment,
        hideEditOneServiceLogModal,
        disableConfirmSaveEditServiceLogButton,
        showDeleteOneServiceLogModal
    } = props;
    let date = new Date(serviceLogDate),
        month = "" + (date.getMonth() + 1),
        day = "" + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }

    if (day.length < 2) {
        day = "0" + day;
    }

    let serviceLogDateToDisplay = [year, month, day].join("-");

    return (
        <ReactModal
            isOpen={showEditOneLogModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
            onRequestClose={hideEditOneServiceLogModal}
        >
            <form onSubmit={checkUserEnteredUpdatedServiceLogInput}>
                <div className="accountModal modal-content">
                    <div className="modal-body modalShadow">
                        <div className={`modalBody ${currentTheme.background}`}>
                            <div className="row modal-header">
                                <div className="col-md-12 text-center">
                                    <label><strong>Edit Service Log</strong></label>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Date</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="updatedServiceLogDate"
                                            type="date"
                                            name="serviceLogDate"
                                            onChange={handleChange}
                                            defaultValue={serviceLogDateToDisplay}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Mileage</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="updatedServiceLogMileage"
                                            type="text"
                                            name="serviceLogMileage"
                                            maxLength="7"
                                            onChange={handleChange}
                                            defaultValue={serviceLogMileage}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><span className="required">*</span><strong>Service</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            id="updatedServiceLogService"
                                            type="text"
                                            name="serviceLogService"
                                            maxLength="50"
                                            onChange={handleChange}
                                            defaultValue={serviceLogService}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label><strong>Comments</strong></label>
                                    </div>
                                    <div className="col-md-9">
                                        <textarea
                                            id="updatedServiceLogComments"
                                            className="commentsBox"
                                            type="text"
                                            name="serviceLogComment"
                                            maxLength="250"
                                            onChange={handleChange}
                                            defaultValue={serviceLogComment}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer noFlex">
                                <div className="row">
                                    <div className="col-md-4 bottomMarginMobileDisplay">
                                        <button
                                            id="deleteServiceLogButton"
                                            title="Delete Service Log"
                                            type="button"
                                            className="deleteBtn"
                                            onClick={showDeleteOneServiceLogModal}>
                                            Delete
                                        </button>
                                    </div>
                                    <div className="col-md-8 alignRightButtonsDesktopDisplay">
                                        <button
                                            id="cancelUpdateServiceLog"
                                            title="Cancel"
                                            type="button"
                                            className="cancelBtn"
                                            onClick={hideEditOneServiceLogModal}
                                            data-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button
                                            id="confirmSaveEditServiceLogButton"
                                            title="Save"
                                            className="standardButton"
                                            type="submit"
                                            disabled={disableConfirmSaveEditServiceLogButton}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default EditOneServiceLogModal;
