import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import updateApi from "../../utils/updateApi";
import vehicleApi from "../../utils/API";
import OneUpdate from "../../components/OneUpdate";
import AddUpdates from "../../components/AddUpdates";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from "react-toastify";

export default class Updates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUpdates: [],
      admin: false,
      pageLoaded: false,
      updateChanges: "",
      knownIssues: "",
      theme: "",
      currentTheme: ""
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
        this.addOneUpdateSuccessNotification();
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
        this.setState({ allUpdates: res.data });
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Checks to see if the viewer is an admin
   */
  checkIfUserIsAdmin = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res =>
            this.setState({
              admin: res.data.admin,
              theme: res.data.theme,
              pageLoaded: true,
            }, () => {
              this.getThemeAndRender();
            })
          )
          .catch(err => this.errorNotification(err));
      } else {
        this.setState({ pageLoaded: true });
      }
    });
  };

  /**
   * Get the user theme and render it
   */
  getThemeAndRender = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.setState({ currentTheme: themes.carSpace });
          break;
        case "light":
          this.setState({ currentTheme: themes.light });
          break;
        case "grey":
          this.setState({ currentTheme: themes.grey });
          document.body.style.backgroundColor = "rgb(128, 128, 128)";
          break;
        case "dark":
          this.setState({ currentTheme: themes.dark });
          document.body.style.backgroundColor = "rgb(32, 32, 32)";
          break;
        default:
          alert("Error: Unable to process theme selection.");
      }
    }
  };

  /**
   * Display the success notification when the admin user submits an update
   */
  addOneUpdateSuccessNotification = () => {
    toast.success(`Update Added Successfully.`);
  };

  /**
   * Display the error notification when an error occurs while loading data from the database
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.pageLoaded ?
            (
              <div className="container largeBottomMarginMobileDisplay">
                <div id="recentUpdatesContainer" className={this.state.currentTheme.background}>
                  <div id="field"></div>
                  <h4 className="text-center"><label>Release Notes and Updates</label></h4>
                  <hr className={this.state.currentTheme.hr} />
                  {
                    this.state.admin ?
                      (
                        <AddUpdates
                          handleChange={this.handleChange}
                          addOneUpdate={this.addOneUpdate}
                          updateChanges={this.state.updateChanges}
                          knownIssues={this.state.knownIssues}
                          currentTheme={this.state.currentTheme}
                        />
                      ) : (
                        null
                      )
                  }
                  {
                    this.state.allUpdates.map(update => {
                      return (
                        <OneUpdate
                          key={update._id}
                          _id={update._id}
                          date={update.date}
                          updateChanges={update.updateChanges}
                          knownIssues={update.knownIssues}
                          currentTheme={this.state.currentTheme}
                        />
                      )
                    })
                  }
                  <br />
                  <Link to={{ pathname: "/" }}>
                    <button className="backHomeBtn">Back</button>
                  </Link>
                  <ToastContainer />
                </div>
              </div>
            ) : (
              <Loading />
            )
        }
      </React.Fragment>

    );
  };
};
