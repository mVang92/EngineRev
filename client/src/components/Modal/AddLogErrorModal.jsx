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
            onRequestClose={hideAddLogErrorModal}
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
                                    {
                                        date === "" || checkIfStringIsBlank(date) ?
                                            (
                                                <div><strong>Date is required.</strong></div>
                                            ) : (
                                                null
                                            )
                                    }
                                </div>
                                <div className="col-md-12">
                                    {
                                        mileage === "" || checkIfStringIsBlank(mileage) ?
                                            (
                                                <div><strong>Mileage is required.</strong></div>
                                            ) : (
                                                null
                                            )
                                    }
                                </div>
                                <div className="col-md-12 breakWord">
                                    {
                                        service === "" || checkIfStringIsBlank(service) ?
                                            (
                                                <div><strong>Service is required.</strong></div>
                                            ) : (
                                                null
                                            )
                                    }
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