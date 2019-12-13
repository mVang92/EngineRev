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
            closeTimeoutMS={150}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10 text-danger">
                                <label><strong>Delete this service log?</strong></label>

                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-2">
                                    <strong>Date:</strong>
                                </div>
                                <div className="col-md-10">
                                    {props.state.serviceLogDate}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <strong>Mileage:</strong>
                                </div>
                                <div className="col-md-10">
                                    {props.state.serviceLogMileage}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <strong>Service:</strong>
                                </div>
                                <div className="col-md-10">
                                    {props.state.serviceLogService}
                                </div>
                            </div>
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
