import React, { Component } from "react";
import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";

class TopActionButtons extends Component {
    render() {
        return (
            <div className="row topLogActionButtons hideWhilePrinting">
                <div className="col-md-2 logButtonsMobileDisplay">
                    <a href="/">
                        <button
                            id="addLogBackButton"
                            title="Back"
                            type="button"
                            className="cancelBtn">
                            Back
                        </button>
                    </a>
                </div>
                <div className="col-md-2 printPageButton logButtonsMobileDisplay">
                    {
                        this.props.vehicleServiceLogs.length > 0 ?
                            (
                                <button
                                    id="printPageButton"
                                    title="Print Service Logs"
                                    type="button"
                                    className="cancelBtn"
                                    onClick={this.props.handlePrintPage}>
                                    Print Logs
                                </button>
                            ) : (
                                <button
                                    id="printPageButton"
                                    type="button"
                                    className="cancelBtn"
                                    disabled>
                                    Print Logs
                                </button>
                            )
                    }
                </div>
                <div className="col-md-2">
                    {
                        this.props.vehicleServiceLogs.length > 1 ?
                            (
                                <button
                                    id="addLogSortLogsButton"
                                    title="Sort Dates"
                                    type="button"
                                    className="cancelBtn"
                                    onClick={this.props.changeSortOrder}>
                                    Sort Dates
                                </button>
                            ) : (
                                <button
                                    id="addLogSortLogsButton"
                                    type="button"
                                    className="cancelBtn"
                                    disabled>
                                    Sort Dates
                                </button>
                            )
                    }
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2"></div>
                <div className="col-md-2 editVehicleNameMobileDisplay logButtonsMobileDisplay">
                    <div className="row topActionButtonsEditDeleteMobileDisplay">
                        {
                            this.props.year ?
                                (
                                    <React.Fragment>
                                        <div className="col-md-6">
                                            <button
                                                id="addLogDeleteVehicleButton"
                                                title="Delete This Vehicle"
                                                type="button"
                                                className="deleteBtn"
                                                onClick={this.props.showDeleteOneVehicleModal}>
                                                <img id="deleteIcon" src={deleteIcon} alt="delete"></img>
                                            </button>
                                        </div>
                                        <br /><br />
                                        <div className="col-md-6">
                                            <button
                                                id="editVehicleNameButton"
                                                title="Edit Vehicle Name"
                                                type="button"
                                                className="cancelBtn hideWhilePrinting"
                                                onClick={this.props.showEditOneVehicleNameModal}>
                                                <img id="editIcon" src={editIcon} alt="edit"></img>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <div className="col-md-6"></div>
                                        <div className="col-md-6"></div>
                                    </React.Fragment>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default TopActionButtons;
