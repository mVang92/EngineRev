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
                            <hr className={`hideWhilePrinting ${currentTheme.hr}`} />
                            <div id="serviceLogBottomButtons" className="hideWhilePrinting">
                                <Link to={{ pathname: "/" }}>
                                    <button className="backHomeBtn" title="Back">Back</button>
                                </Link>
                                <button className="backToTopButton" title="Back to Top" onClick={backToTopOfPage}>Top</button>
                            </div>
                        </React.Fragment>
                    ) :
                    (
                        null
                    )
            }
        </React.Fragment>
    );
};

export default ServiceLogBottomButtons;
