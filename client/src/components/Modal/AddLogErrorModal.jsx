import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const AddLogErrorModal = props => {

    return (
        <ReactModal
            isOpen={props.showAddLogErrorModal}
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
                            <div className="col-md-10 userInputErrorMessage">
                                <div className="col-md-12 text-center">
                                    You have missing fields:
                                </div>
                                <div className="col-md-12">
                                    {props.state.date === "" ? (
                                        <div className="text-danger"><strong>Date:</strong></div>
                                    ) : (
                                            <div>Date: {props.state.date}</div>
                                        )}
                                </div>
                                <div className="col-md-12">
                                    {props.state.mileage === "" ? (
                                        <div className="text-danger"><strong>Mileage:</strong></div>
                                    ) : (
                                            <div>Mileage: {props.state.mileage}</div>
                                        )}
                                </div>
                                <div className="col-md-12">
                                    {props.state.service === "" ? (
                                        <div className="text-danger"><strong>Service:</strong></div>
                                    ) : (
                                            <div>Service: {props.state.service}</div>
                                        )}
                                </div>
                                <div className="col-md-12">
                                    <div>Comments: {props.state.comment}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideAddLogErrorModal}
                                data-dismiss="modal">
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default AddLogErrorModal;