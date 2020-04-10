import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopActionButtons extends Component {
    render() {
        return (
            <div className="row topLogActionButtons hideWhilePrinting">
                <div className="col-md-3 noWidthMobileDisplay">
                    <Link to={{ pathname: "/" }}>
                        <button
                            id="addLogBackButton"
                            title="Back"
                            type="button"
                            className="cancelBtn">
                            Back
                        </button>
                    </Link>
                </div>
                <div className="col-md-3 noWidthMobileDisplay printPageButton">
                    {
                        this.props.vehicleServiceLogs.length > 0 ?
                            (
                                <button
                                    id="printPageButton"
                                    title="Print Logs"
                                    type="button"
                                    className="cancelBtn"
                                    onClick={this.props.handlePrintPage}>
                                    Print Logs
                                </button>
                            ) : (
                                <button
                                    id="printPageButton"
                                    title="Disabled"
                                    type="button"
                                    className="cancelBtn"
                                    disabled>
                                    Print Logs
                                </button>
                            )
                    }
                </div>
                <div className="col-md-3 noWidthMobileDisplay">
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
                                    title="Disabled"
                                    type="button"
                                    className="cancelBtn"
                                    disabled>
                                    Sort Dates
                                </button>
                            )
                    }
                </div>
                <div className="col-md-3 noWidthMobileDisplay">
                    {
                        this.props.year ?
                            (
                                <button
                                    id="editVehicleNameButton"
                                    title="Edit Vehicle"
                                    type="button"
                                    className="cancelBtn hideWhilePrinting"
                                    onClick={this.props.showEditOneVehicleNameModal}>
                                    Edit Vehicle
                                </button>
                            ) : (
                                null
                            )
                    }
                </div>
            </div>
        );
    };
};

export default TopActionButtons;
