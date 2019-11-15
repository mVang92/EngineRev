import React, { Component } from 'react';
import { NavLoggedIn, NavLoggedOut } from "../Nav";
import "../../css/style.css";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: true
    }
  };

  logOutHandler = (e) => {
    e.preventDefault()
    console.log("hit")
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg sticky-top">
        <a className="navbar-brand underline" href="/">CarSpace</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          {this.state.loggedin === true ? (
            <React.Fragment>
              <ul className="navbar-nav">
                <NavLoggedIn
                  state={this.state}
                  logOutHandler={this.logOutHandler}
                />
              </ul>
            </React.Fragment>
          ) : (
              <ul className="navbar-nav">
                <NavLoggedOut
                  state={this.state}
                />
              </ul>
            )
          }
        </div>
      </nav>
    )
  }
};

// const Nav = props => {
//   return (
//     <nav className="navbar navbar-expand-lg sticky-top">
//       <a className="navbar-brand underline" href="/">CarSpace</a>
//       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         {props.loggedin === true ? (
//           <ul className="navbar-nav">
//             <Navbtn
//               name="Sign-Out"
//               onClick={props.signOut}
//             />
//           </ul>
//         ) : (
//             <ul className="navbar-nav">
//               <Navbtn
//                 name="Sign-In"
//                 onClick={props.authClick}
//               />
//               <Navbtn
//                 name="Sign-Up"
//                 onClick={props.authClick}
//               />
//             </ul>
//           )
//         }
//       </div>
//     </nav>
//   );
// };

// export default Nav;
