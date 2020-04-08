import React, { Component } from "react";
import Container from "../../components/Container";
import ForumDetails from "../../components/ForumDetails";
import vehicleApi from "../../utils/API";
import forumApi from "../../utils/forumApi";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import { toast } from "react-toastify";
import { defaults } from "../../assets/Defaults";

export default class Forum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      pageLoaded: false,
      uniqueCreatorId: "",
      displayName: "",
      userPhotoUrl: "",
      email: "",
      theme: "",
      currentTheme: "",
      backgroundPicture: "",
      threadDescription: "",
      threadTitle: "",
      allThreads: [],
      disableSubmitNewThreadButton: false
    };
  };

  /**
   * Perform these actions upon page load
   */
  componentDidMount = () => {
    this.getAllThreads();
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Scroll to the top of the page
   */
  backToTopOfPage = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /**
   * Check if the user input value is blank
   */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Gets all of the threads from the database
   * If successful or if there is an error, then find the user information
   */
  getAllThreads = () => {
    forumApi.getAllThreads()
      .then(res => {
        this.setState({ allThreads: res.data }, () => this.getUserInformation());
      })
      .catch(err => {
        this.errorNotification(err);
        this.getUserInformation();
      });
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getUserInformation = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedin: true,
          uniqueCreatorId: user.uid,
          email: user.email,
          displayName: user.displayName
        }, () => {
          if (!user.photoURL) {
            this.setState({ userPhotoUrl: defaults.defaultProfilePicture });
          }
          if (!user.displayName) {
            this.setState({ displayName: defaults.defaultDisplayName });
          }
        });
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                pageLoaded: true
              }, () => {
                this.determineTheme();
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
   * Validate the input values for a new thread before saving it
   */
  validateThreadInputValues = e => {
    e.preventDefault();
    if (
      this.state.threadTitle === "" ||
      this.state.threadDescription === "" ||
      this.checkIfStringIsBlank(this.state.threadTitle) ||
      this.checkIfStringIsBlank(this.state.threadDescription)
    ) {
      this.errorNotification(defaults.threadDetailsCannotBeBlank);
    } else {
      this.handleAddOneThread();
    }
  };

  /**
   * Add a new thread into the database
   */
  handleAddOneThread = () => {
    this.setState({ disableSubmitNewThreadButton: true });
    let newThreadPayload = {
      creator: this.state.uniqueCreatorId,
      email: this.state.email,
      threadTitle: this.state.threadTitle,
      threadDescription: this.state.threadDescription,
      comments: []
    };
    forumApi.addOneThread(newThreadPayload)
      .then(() => {
        this.setState({
          threadDescription: "",
          threadTitle: "",
          disableSubmitNewThreadButton: false
        }, () => {
          this.successNotification(defaults.addThreadSuccessfully);
          this.getAllThreads();
        });
      })
      .catch(err => {
        this.setState({ disableSubmitNewThreadButton: false });
        this.errorNotification(err);
      });
  };



  /**
   * Determine what the current theme is
   */
  determineTheme = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.renderTheme(themes.carSpace);
          break;
        case "light":
          this.renderTheme(themes.light);
          break;
        case "grey":
          this.renderTheme(themes.grey);
          break;
        case "dark":
          this.renderTheme(themes.dark);
          break;
        default:
          this.errorNotification(defaults.themeSelectionError);
      }
    }
  };

  /**
   * Render the theme and background picture
   */
  renderTheme = theme => {
    this.setState({ currentTheme: theme });
    if (this.state.backgroundPicture) {
      document.body.style.backgroundImage = "url(" + this.state.backgroundPicture + ")";
    } else {
      document.body.style.backgroundColor = theme.backgroundColor;
    }
  };

  /**
   * Display the success notification when the user performs an action successfully
   * 
   * @param message the message to display to the user
   */
  successNotification = message => {
    toast.success(message);
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
              <Container>
                <ForumDetails
                  loggedin={this.state.loggedin}
                  handleChange={this.handleChange}
                  validateThreadInputValues={this.validateThreadInputValues}
                  threadTitle={this.state.threadTitle}
                  threadDescription={this.state.threadDescription}
                  allThreads={this.state.allThreads}
                  disableSubmitNewThreadButton={this.state.disableSubmitNewThreadButton}
                  backToTopOfPage={this.backToTopOfPage}
                  currentTheme={this.state.currentTheme}
                />
              </Container>
            ) : (
              <Loading />
            )
        }
      </React.Fragment>
    );
  };
};
