import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const AddLogErrorModal = props => {
    let dateToShowFormatted = "";
    if (props.state.date) {
        const dateToShow = new Date(props.state.date);
        dateToShow.setDate(dateToShow.getDate() + 1);
        dateToShowFormatted = dateToShow.toLocaleDateString("en-US");
    }
    return (
        <ReactModal
            isOpen={props.showAddLogErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div id="addLogErrorModal" className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${props.state.currentTheme.background}`}>
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt="warning" />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <div className="col-md-12">
                                    <label><strong>Please fill in the missing fields:</strong></label>
                                </div>
                                <div className="col-md-12">
                                    {
                                        props.state.date === "" ?
                                            (
                                                <div className="text-danger"><strong>Date:</strong></div>
                                            ) : (
                                                <div>Date: <span className="text-success">{dateToShowFormatted}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        props.state.mileage === "" ?
                                            (
                                                <div className="text-danger"><strong>Mileage:</strong></div>
                                            ) : (
                                                <div>Mileage: <span className="text-success">{props.state.mileage}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        props.state.service === "" ?
                                            (
                                                <div className="text-danger"><strong>Service:</strong></div>
                                            ) : (
                                                <div>Service: <span className="text-success">{props.state.service}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    <div>Comments: <span className="text-success">{props.state.comment}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeAddLogErrorModal"
                                title="Okay"
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