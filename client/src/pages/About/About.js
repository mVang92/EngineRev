import React, { Component } from "react";
import carSpaceLogo from "../../images/carSpaceLogo.png";
import userApi from "../../utils/userApi";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import { defaults } from "../../assets/Defaults";
import BackToHomeButtonRow from "../../components/BackToHomeButtonRow";
import { toast } from "react-toastify";

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "",
      currentTheme: "",
      backgroundPicture: "",
      refreshCounter: 0,
      pageLoaded: false
    };
  };

  /**
   * Grab user information
   */
  componentDidMount = () => {
    this.getUserInformation();
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getUserInformation = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        userApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                pageLoaded: true
              }, () => this.determineTheme());
            } catch (err) {
              this.setState({ refreshCounter: this.state.refreshCounter + 1 });
              if (this.state.refreshCounter <= 3) {
                this.getUserInformation();
              } else {
                this.errorNotification(err);
                this.setState({ pageLoaded: true });
              }
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
   * Determine what the current theme is
   */
  determineTheme = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case defaults.carSpaceTheme:
          this.renderTheme(themes.carSpace);
          break;
        case defaults.lightTheme:
          this.renderTheme(themes.light);
          break;
        case defaults.greyTheme:
          this.renderTheme(themes.grey);
          break;
        case defaults.darkTheme:
          this.renderTheme(themes.dark);
          break;
        case defaults.transparentLightTheme:
          this.renderTheme(themes.transparentLight);
          break;
        case defaults.transparentGreyTheme:
          this.renderTheme(themes.transparentGrey);
          break;
        case defaults.transparentDarkTheme:
          this.renderTheme(themes.transparentDark);
          break;
        default:
          this.errorNotification(defaults.themeSelectionError);
      }
    } else {
      if (this.state.backgroundPicture) {
        document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
      } else {
        document.body.style.backgroundImage = "";
      }
    }
  };

  /**
   * Render the theme and background picture
   * 
   * @param theme the theme to render
   */
  renderTheme = theme => {
    this.setState({ currentTheme: theme });
    if (this.state.backgroundPicture) {
      document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
    } else {
      document.body.style.backgroundColor = theme.backgroundColor;
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
                  <div className={`smallPadding ${this.state.currentTheme.accountDetails}`}>
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <label><h5>About CarSpace</h5></label>
                      </div>
                    </div>
                    <label><p>{defaults.aboutCarSpace}</p></label>
                    <hr />
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <label><h5>Who is CarSpace For?</h5></label>
                      </div>
                    </div>
                    <label><p>{defaults.whoIsCarSpaceFor}</p></label>
                    <hr />
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <label><h5>A Little About the Creator</h5></label>
                      </div>
                    </div>
                    <label><p>{defaults.creatorDetails}</p></label>
                  </div>
                  <br />
                  <BackToHomeButtonRow />
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
