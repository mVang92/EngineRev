import React, { Component } from "react";
import { Link } from "react-router-dom";
import engineRevLogo from "../../images/engineRevLogo.png";
import userApi from "../../utils/userApi";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase"
import { defaults } from "../../assets/Defaults";
import { themes } from "../../themes/Themes";
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
        userApi.getUserInfoPartial(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                pageLoaded: true
              }, () => this.renderTheme(themes.determineTheme(this.state.theme, this.state.backgroundPicture)));
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
                <div id="aboutEngineRevContainer" className={`text-center ${this.state.currentTheme.background}`}>
                  <br /><br />
                  <img id="engineRevLogoAboutPage" src={engineRevLogo} alt="EngineRev Logo" />
                </div>
                <div className={`box ${this.state.currentTheme.background}`}>
                  <div className={`fadeIn smallPadding ${this.state.currentTheme.accountDetails}`}>
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <label><h5>About EngineRev</h5></label>
                      </div>
                    </div>
                    <label><p>{defaults.aboutEngineRev}</p></label>
                    <hr />
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <label><h5>Who is EngineRev For?</h5></label>
                      </div>
                    </div>
                    <label><p>{defaults.whoIsEngineRevFor}</p></label>
                    <hr />
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <label><h5>A Little About the Creator</h5></label>
                      </div>
                    </div>
                    <label><p>{defaults.creatorDetails}</p></label>
                  </div>
                  <br />
                  <Link to={{ pathname: "/" }}>
                    <button className="backHomeBtn" title="Back">Back</button>
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
