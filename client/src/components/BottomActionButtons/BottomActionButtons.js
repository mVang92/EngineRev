import React, { Component } from "react";
import { Link } from "react-router-dom";

class BottomActionButtons extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6 text-left noWidthMobileDisplay">
                    <Link to={{ pathname: "/" }}>
                        <button className="backHomeBtn ">Back</button>
                    </Link>
                </div>
                <div className="col-md-6 text-right noWidthMobileDisplay">
                    <button className="backToTopButton" onClick={this.props.backToTopOfPage}>Top</button>
                </div>
            </div>
        );
    };
};

export default BottomActionButtons;
