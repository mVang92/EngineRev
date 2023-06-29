import React from "react";
import { Link } from "react-router-dom";

const BottomActionButtons = props => {
    return (
        <>
            <Link to={{ pathname: "/" }}>
                <button className="backHomeBtn" title="Back">Back</button>
            </Link>
            <button className="backToTopButton" title="Back to Top" onClick={props.backToTopOfPage}>Top</button>
        </>
    );
};

export default BottomActionButtons;
