import React from "react";
import { Link } from "react-router-dom";

const BottomActionButtons = props => {
    return (
        <div className="row">
            <div className="col-md-6 text-left noWidthMobileDisplay">
                <Link to={{ pathname: "/" }}>
                    <button className="backHomeBtn" title="Back">Back</button>
                </Link>
            </div>
            <div className="col-md-6 text-right noWidthMobileDisplay">
                <button className="backToTopButton" title="Back to Top" onClick={props.backToTopOfPage}>Top</button>
            </div>
        </div>
    );
};

export default BottomActionButtons;
