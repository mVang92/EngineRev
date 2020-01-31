import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../firebase"
import updateApi from "../../utils/updateApi";
import vehicleApi from "../../utils/API";
import OneUpdate from "../../components/OneUpdate";
import AddUpdates from "../../components/AddUpdates";

export default class Updates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUpdates: [],
      admin: false,
      updateChanges: "",
      knownIssues: ""
    };
  };

  /**
   * Fetch all updates and release notes
   * Also check if the viewer is an admin user
   */
  componentDidMount = () => {
    this.getAllUpdates();
    this.checkIfUserIsAdmin();
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Adds an update to the database
   */
  addOneUpdate = e => {
    e.preventDefault();
    const updateData = {
      updateChanges: this.state.updateChanges,
      knownIssues: this.state.knownIssues
    }
    updateApi.addOneUpdate(updateData)
      .then(() => {
        this.componentDidMount();
        this.setState({
          updateChanges: "",
          knownIssues: ""
        });
      });
  };

  /**
   * Gets all of the updates and release notes from the database
   */
  getAllUpdates = () => {
    updateApi.getAllUpdates()
      .then(res => {
        this.setState({ allUpdates: res.data })
      })
      .catch(err => {
        console.log(err)
      });
  };

  /**
   * Checks to see if the viewer is an admin
   */
  checkIfUserIsAdmin = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.getAllVehiclesForUser(user.uid)
          .then(res =>
            this.setState({
              admin: res.data.admin
            })
          )
          .catch(err => console.log(err));
      };
    });
  };

  render() {
    return (
      <div className="container largeBottomMarginMobileDisplay">
        <div id="recentUpdatesContainer">
          <div id="field"></div>
          {
            this.state.admin ?
              (
                <AddUpdates
                  handleChange={this.handleChange}
                  addOneUpdate={this.addOneUpdate}
                  updateChanges={this.state.updateChanges}
                  knownIssues={this.state.knownIssues}
                />
              ) : (
                null
              )
          }
          <div id="displayUpdates">
            {
              this.state.allUpdates.map(update => {
                return (
                  <OneUpdate
                    key={update._id}
                    _id={update._id}
                    date={update.date}
                    updateChanges={update.updateChanges}
                    knownIssues={update.knownIssues}
                  />
                )
              })
            }
          </div>
          <br />
          <Link to={{ pathname: "/" }}>
            <button className="backHomeBtn">Back</button>
          </Link>
        </div>
      </div>
    );
  };
};
