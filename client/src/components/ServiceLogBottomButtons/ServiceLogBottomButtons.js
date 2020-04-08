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
                            <hr className={`hideWhilePrinting ${currentTheme.hr}`}/>
                            <div id="serviceLogBottomButtons" className="row hideWhilePrinting">
                                <div className="col-md-3 text-left">
                                    <Link to={{ pathname: "/" }}>
                                        <button className="backHomeBtn" title="Back">Back</button>
                                    </Link>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"></div>
                                <div id="logBackToTopButton" className="col-md-3 text-right">
                                    <button className="backToTopButton" title="Back to Top"onClick={backToTopOfPage}>Top</button>
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
