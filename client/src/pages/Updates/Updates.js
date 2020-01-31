import React, { Component } from "react";
import { Link } from "react-router-dom";
import updateApi from "../../utils/updateApi";

export default class Updates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUpdates: []
    };
  };

  componentDidMount = () => {
    // this.addOneUpdate();
    this.getAllUpdates();
  };

  addOneUpdate = () => {
    const data = {
      date: "01212002",
      updateChanges: "fix",
      knownIssues: "issues"
    }
    console.log(data)
    updateApi.addOneUpdate(data)
      .then(res => {
        console.log("done")
      });
  };

  getAllUpdates = () => {
    updateApi.getAllUpdates()
      .then(res => {
        this.setState({ allUpdates: res.data })
      })
      .catch(err => {
        console.log(err)
      });
  };

  render() {
    return (
      <div className="container">
        <div id="recentUpdatesContainer">
          <div id="field"></div>
          <div id="displayUpdates">
            {console.log(this.state.allUpdates)}
            {
              this.state.allUpdates.map(update => {
                return (
                  <div key={update._id}>
                    <h5>Updates:</h5>
                    {update.updateChanges}
                    <h5>Known Issues:</h5>
                    {update.knownIssues}
                    <hr />
                  </div>
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
