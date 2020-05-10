import React from "react";
import ReactModal from "react-modal";
import warningImage from "../../images/warning.png";

const AddLogErrorModal = props => {
    const {
        date,
        showAddLogErrorModal,
        currentTheme,
        mileage,
        service,
        comment,
        hideAddLogErrorModal,
        checkIfStringIsBlank
    } = props;
    let dateToShowFormatted = "";
    if (date) {
        const dateToShow = new Date(date);
        dateToShow.setDate(dateToShow.getDate() + 1);
        dateToShowFormatted = dateToShow.toLocaleDateString("en-US");
    }
    return (
        <ReactModal
            isOpen={showAddLogErrorModal}
            contentLabel="Minimal Modal Example"
            className="Modal__Bootstrap modal-dialog"
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={0}
        >
            <div id="addLogErrorModal" className="accountModal modal-content">
                <div className="modal-body modalShadow">
                    <div className={`modalBody ${currentTheme.background}`}>
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
                                        date === "" || checkIfStringIsBlank(date) ?
                                            (
                                                <div className="text-danger"><strong>Date:</strong></div>
                                            ) : (
                                                <div>Date: <span>{dateToShowFormatted}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        mileage === "" || checkIfStringIsBlank(mileage) ?
                                            (
                                                <div className="text-danger"><strong>Mileage:</strong></div>
                                            ) : (
                                                <div>Mileage: <span>{mileage}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12 breakWord">
                                    {
                                        service === "" || checkIfStringIsBlank(service) ?
                                            (
                                                <div className="text-danger"><strong>Service:</strong></div>
                                            ) : (
                                                <div>Service: <span>{service}</span></div>
                                            )
                                    }
                                </div>
                                <div className="col-md-12 breakWord">
                                    <div>Comments: <span>{comment}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="closeAddLogErrorModal"
                                title="Okay"
                                type="button"
                                className="standardButton"
                                onClick={hideAddLogErrorModal}
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