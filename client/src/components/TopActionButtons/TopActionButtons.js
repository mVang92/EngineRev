import React from "react";
import { Link } from "react-router-dom";

const TopActionButtons = props => {
    return (
        <div className="row topLogActionButtons hideWhilePrinting">
            <div className="col-md-3 centerWidthMobileDisplay">
                <Link to={{ pathname: "/" }}>
                    <button
                        id="addLogBackButton"
                        title="Back"
                        type="button"
                        className="standardButton">
                        Back
                    </button>
                </Link>
            </div>
            <div className="col-md-3 centerWidthMobileDisplay printPageButton">
                {
                    props.vehicleServiceLogs.length > 0 ?
                        (
                            <button
                                id="printPageButton"
                                title="Print Logs"
                                type="button"
                                className="standardButton"
                                onClick={props.handlePrintPage}>
                                Print Logs
                            </button>
                        ) :
                        (
                            <button
                                id="printPageButton"
                                title="Disabled"
                                type="button"
                                className="standardButton"
                                disabled>
                                Print Logs
                            </button>
                        )
                }
            </div>
            <div className="col-md-3 centerWidthMobileDisplay">
                {
                    props.vehicleServiceLogs.length > 1 ?
                        (
                            <button
                                id="addLogSortLogsButton"
                                title="Sort Dates"
                                type="button"
                                className="standardButton"
                                onClick={props.changeSortOrder}>
                                Sort Dates
                            </button>
                        ) :
                        (
                            <button
                                id="addLogSortLogsButton"
                                title="Disabled"
                                type="button"
                                className="standardButton"
                                disabled>
                                Sort Dates
                            </button>
                        )
                }
            </div>
            <div className="col-md-3 centerWidthMobileDisplay">
                {
                    props.year ?
                        (
                            <button
                                id="editVehicleNameButton"
                                title="Edit Vehicle"
                                type="button"
                                className="standardButton hideWhilePrinting"
                                onClick={props.showEditOneVehicleNameModal}>
                                Edit Vehicle
                            </button>
                        ) :
                        (
                            null
                        )
                }
            </div>
        </div>
    );
};

export default TopActionButtons;
