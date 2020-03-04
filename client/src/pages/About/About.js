import React, { Component } from "react";
import carSpaceLogo from "../../images/carSpaceLogo.png";
import vehicleApi from "../../utils/API";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase"
import { Link } from "react-router-dom";
import { themes } from "../../themes/Themes";
import { toast } from "react-toastify";

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "",
      currentTheme: "",
      pageLoaded: false
    };
  };

  /**
   * Fetch all updates and release notes
   */
  componentDidMount = () => {
    this.getUserTheme();
  };

  /**
   * Retrieve the theme for the user then load the page
   */
  getUserTheme = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                pageLoaded: true
              }, () => {
                this.getThemeAndRender();
              });
            } catch (err) {
              this.errorNotification(err);
              this.setState({ pageLoaded: true });
            }
          })
          .catch(err => {
            this.errorNotification(err);
            this.setState({ pageLoaded: true });
          });
      } else {
        this.setState({ pageLoaded: true });
      }
    });
  };

  /**
   * Display the error notification when an error occurs while loading data from the database
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Get the user theme and render it
   */
  getThemeAndRender = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.setState({ currentTheme: themes.carSpace });
          document.body.style.backgroundColor = "rgb(220, 220, 220)";
          break;
        case "light":
          this.setState({ currentTheme: themes.light });
          document.body.style.backgroundColor = "rgb(235, 235, 235)";
          break;
        case "grey":
          this.setState({ currentTheme: themes.grey });
          document.body.style.backgroundColor = "rgb(112, 112, 112)";
          break;
        case "dark":
          this.setState({ currentTheme: themes.dark });
          document.body.style.backgroundColor = "rgb(32, 32, 32)";
          break;
        default:
          this.errorNotification("Error: Unable to process theme selection.");
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.pageLoaded ?
            (
              <div className="container">
                <div id="aboutCarspaceContainer" className={`text-center ${this.state.currentTheme.background}`}>
                  <br /><br />
                  <img id="carSpaceLogo" src={carSpaceLogo} alt="CarSpace Logo"></img>
                </div>
                <div className={`box ${this.state.currentTheme.background}`}>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <label><h5>About CarSpace</h5></label>
                    </div>
                  </div>
                  <label>
                    <p>CarSpace allows you to keep track of your vehicle maintenance history.
                    Keep your vehicle running smoothly by tracking your own vehicles by recording their service logs.</p>
                  </label>
                  <hr className={this.state.currentTheme.hr} />
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <label><h5>Who is CarSpace For?</h5></label>
                    </div>
                  </div>
                  <label>
                    <p>CarSpace is for anyone, mechanically inclined or not, who want to keep track of their vehicle service maintenance history.
                    Users can create their own accounts and add vehicles they want to keep track of. They can also update their
                    account information along with updating vehicle and service log information.
                    Service logs are tracked by adding the date of service, the mileage of the vehicle, and the type of service performed on the vehicle.
                    This will allow the user to keep track of specific maintenance or repair information.</p>
                  </label>
                  <hr className={this.state.currentTheme.hr} />
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <label><h5>A Little About the Creator</h5></label>
                    </div>
                  </div>
                  <label>
                    <p>Not only do I work full-time as a Software Engineer, but I also have several years of experience in automotive repair
                    (you don’t see that combination every day). As an automotive mechanic, I need a program where I can easily pull it up on a computer
                    or my phone to access my vehicle maintenance and repair history,
                    while being able to add new vehicles and service logs as well. This is where I thought of creating CarSpace (formerly known as CarLog),
                    which allows just that without worrying about paying for monthly or annual subscriptions.
                    CarSpace is intended to be simple to use and to the point.</p>
                  </label>
                  <br />
                  <Link to={{ pathname: "/" }}>
                    <button className="backHomeBtn">Back</button>
                  </Link>
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
