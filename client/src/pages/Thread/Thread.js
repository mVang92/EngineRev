import React, { Component } from "react";
import Container from "../../components/Container";
import vehicleApi from "../../utils/API";
import forumApi from "../../utils/forumApi";
import Loading from "../../components/Loading";
import ThreadDetails from "../../components/ThreadDetails";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import { toast } from "react-toastify";

export default class Thread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props,
      uniqueCreatorId: "",
      email: "",
      loggedin: false,
      theme: "",
      currentTheme: "",
      backgroundPicture: "",
      pageLoaded: false,
      threadId: "",
      threadTitle: "",
      threadDescription: "",
      threadComment: "",
      allThreadComments: [],
      formattedEmail: "",
      formattedDate: ""
    };
  };

  /**
   * Get the theme for the user
   */
  componentDidMount = () => {
    try {
      this.setState(
        {
          threadId: this.state.props.location.state[0],
          threadTitle: this.state.props.location.state[1],
          threadDescription: this.state.props.location.state[2],
          formattedEmail: this.state.props.location.state[3],
          formattedDate: this.state.props.location.state[4]
        }, () =>{
          this.getUserInformation();
          this.getAllThreadComments();
        });
    } catch (e) {
      window.location = "/";
    }
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
   * Simulate the back button to go to the previous page
   */
  backButton = () => {
    try {
      window.history.back();
    } catch (e) {
      window.location = "/";
    }
  };

  /**
   * Retrieve the theme for the user then load the page
   */
  getUserInformation = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        vehicleApi.findUserInformationForOneUser(user.uid)
          .then(res => {
            try {
              this.setState({
                theme: res.data.theme,
                backgroundPicture: res.data.backgroundPicture,
                uniqueCreatorId: user.uid,
                email: user.email,
                pageLoaded: true,
                loggedin: true
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

  getAllThreadComments = () => {
    forumApi.getAllThreadComments(this.state.threadId)
    .then(res => {
      this.setState({ allThreadComments: res.data[0].comments });
    })
  };

  /**
   * Add a comment to the chosen thread
   */
  addOneCommentToThread = e => {
    e.preventDefault();
    let threadCommentPayload = {
      creator: this.state.uniqueCreatorId,
      email: this.state.email,
      comment: this.state.threadComment,
      votes: 0
    }
    forumApi.addOneCommentToOneThread(this.state.threadId, threadCommentPayload)
      .then(() => {
        this.setState({ threadComment: "" }, () => this.getAllThreadComments());
      })
      .catch(err => this.errorNotification(err));
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
          this.errorNotification("Error: Unable to process theme selection.");
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

  render() {
    return (
      <React.Fragment>
        {
          this.state.pageLoaded ?
            (
              <Container>
                {console.log(this.state.allThreadComments)}
                <ThreadDetails
                  loggedin={this.state.loggedin}
                  threadTitle={this.state.threadTitle}
                  threadDescription={this.state.threadDescription}
                  threadComment={this.state.threadComment}
                  allThreadComments={this.state.allThreadComments}
                  handleChange={this.handleChange}
                  backToTopOfPage={this.backToTopOfPage}
                  backButton={this.backButton}
                  addOneCommentToThread={this.addOneCommentToThread}
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
