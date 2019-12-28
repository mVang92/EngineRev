import React, { Component } from "react";

class TopActionButtons extends Component {
    render() {
        return (
            <div className="row topLogActionButtons hideWhilePrinting">
                <div className="col-md-3 noWidth">
                    <a href="/">
                        <button
                            id="addLogBackButton"
                            title="Home"
                            type="button"
                            className="cancelBtn">
                            Back
                        </button>
                    </a>
                </div>
                <div className="col-md-3 noWidth printPageButton">
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
                                    title="Disabled"
                                    type="button"
                                    className="cancelBtn"
                                    disabled>
                                    Print Logs
                                </button>
                            )
                    }
                </div>
                <div className="col-md-3 noWidth">
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
                <div className="col-md-3 noWidth">
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
    }
};

export default TopActionButtons;
