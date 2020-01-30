import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const DeleteOneServiceLogModal = props => {
    return (
        <ReactModal
            isOpen={props.showDeleteOneLogModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="row modal-header">
                            <div className="col-md-2">
                                <img className="removeMobileDisplay imageMobileDisplay" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-8 text-danger text-center">
                                <label><strong>Delete this service log?</strong></label>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label><strong>Date:</strong></label>
                                </div>
                                <div className="col-md-9">
                                    {props.state.serviceLogDate}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label><strong>Mileage:</strong></label>
                                </div>
                                <div className="col-md-9">
                                    {props.state.serviceLogMileage}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label><strong>Service:</strong></label>
                                </div>
                                <div className="col-md-9">
                                    {props.state.serviceLogService}
                                </div>
                            </div>
                            {
                                props.state.serviceLogComment ? (
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label><strong>Comments:</strong></label>
                                        </div>
                                        <div className="col-md-9">
                                            {props.state.serviceLogComment}
                                        </div>
                                    </div>
                                ) : (null)
                            }
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Cancel"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideDeleteOneServiceLogModal}
                                data-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                title="Delete Service Log"
                                id="confirmDeleteServiceLogButton"
                                className="deleteBtn"
                                type="button"
                                onClick={props.handleDeleteOneServiceLog}>
                                Delete Log
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default DeleteOneServiceLogModal;
