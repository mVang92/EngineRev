import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const MileageInputErrorModal = props => {
    const { mileage } = props.state;
    return (
        <ReactModal
            isOpen={props.showMileageInputErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className="modalBody">
                        <div className="modal-header">
                            <div className="col-md-2 imageMobileDisplay">
                                <img className="warningImage" src={warningImage} alt='warning' />
                            </div>
                            <div className="col-md-10 userInputErrorMessage">
                                <div className="col-md-12">
                                    <span className="text-danger">{mileage}</span> is not a valid input for Mileage.
                                </div>
                                <div className="col-md-12">
                                    Please enter numerical values. Exclude special characters.
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                title="Understood"
                                type="button"
                                className="cancelBtn"
                                onClick={props.hideMileageInputErrorModal}
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

export default MileageInputErrorModal;