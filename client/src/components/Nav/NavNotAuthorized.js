import React from "react";
import Navbtn from "./Navbtn";
import "../../css/style.css";

const NavNotAuthorized = props => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            {console.log(props)}
            <a className="navbar-brand underline" href="/">CarSpace</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <Navbtn
                        name="Home"
                        onClick={props.goToHomePage}
                    />
                </ul>
            </div>
        </nav>
    );
};

export default NavNotAuthorized;
