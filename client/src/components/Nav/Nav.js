import React from "react";
import Navbtn from "./Navbtn";
import "../../css/style.css";

const Nav = props => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <a className="navbar-brand underline" href="/">CarLog</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {props.loggedin === true ? (
          <ul className="navbar-nav">
            <Navbtn
              name="Sign-Out"
              onClick={props.signOut}
            />
          </ul>
        ) : ( //If not logged in, these buttons will appear
            <ul className="navbar-nav">
              <Navbtn
                name="Sign-In"
                onClick={props.authClick}
              />
              <Navbtn
                name="Sign-Up"
                onClick={props.authClick}
              />
            </ul>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;
