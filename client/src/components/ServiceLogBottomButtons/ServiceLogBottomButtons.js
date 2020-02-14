import React from "react";
import { Link } from "react-router-dom";

const ServiceLogBottomButtons = props => {
    const {
        backToTopOfPage,
        vehicleServiceLogs,
        currentTheme
    } = props;
    return (
        <React.Fragment>
            {
                vehicleServiceLogs.length > 3 ?
                    (
                        <React.Fragment>
                            <hr className={currentTheme.hr}/>
                            <div id="serviceLogBottomButtons" className="row">
                                <div className="col-md-3 text-left">
                                    <Link to={{ pathname: "/" }}>
                                        <button className="backHomeBtn">Back</button>
                                    </Link>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"></div>
                                <div id="logBackToTopButton" className="col-md-3 text-right">
                                    <button className="backToTopButton" onClick={backToTopOfPage}>Top</button>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        null
                    )
            }

        </React.Fragment>
    )
}

export default ServiceLogBottomButtons;
