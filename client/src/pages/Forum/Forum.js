import React, { Component } from "react";
import Container from "../../components/Container";
import ForumDetails from "../../components/ForumDetails";
import userApi from "../../utils/userApi";
import forumApi from "../../utils/forumApi";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import Loading from "../../components/Loading";
import { firebase } from "../../firebase"
import { toast } from "react-toastify";
import { defaults } from "../../assets/Defaults";
import { events } from "../../assets/Events";
import { themes } from "../../themes/Themes";

export default class Forum extends Component {
  constructor() {
    super()
    this.state = {
      loggedin: false,
      pageLoaded: false,
      loadingSortedThreads: false,
      uniqueCreatorId: "",
      displayName: "",
      userPhotoUrl: "",
      email: "",
      theme: "",
      currentTheme: "",
      backgroundPicture: "",
      threadDescription: "",
      threadTitle: "",
      defaultSortOrder: "",
      noSortResults: "",
      allThreads: [],
      disableSubmitNewThreadButton: false,
      disableSortThreadsButton: false,
      refreshCounter: 0
    };
  };

  SELECTED_SORT_ORDER = "selectedSortOrder"
  uniqueCreatorId;

  /**
   * Perform these actions upon page load
   */
  componentDidMount = () => {
    this.setState({ defaultSortOrder: localStorage.getItem(this.SELECTED_SORT_ORDER) });
    if (localStorage.getItem(this.SELECTED_SORT_ORDER) === null) {
      localStorage.setItem(this.SELECTED_SORT_ORDER, defaults.mostRecentThreadsSort);
      this.getAllThreads(localStorage.getItem(this.SELECTED_SORT_ORDER));
    } else {
      this.getAllThreads(localStorage.getItem(this.SELECTED_SORT_ORDER));
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
   * Render the threads according to the sort criteria
   */
  renderSortedThreads = () => {
    let element = document.getElementById(defaults.sortThreadsDropdown);
    let selectedSortOrder = element.options[element.selectedIndex].value;
    localStorage.setItem(this.SELECTED_SORT_ORDER, selectedSortOrder);
    this.setState({
      disableSortThreadsButton: true,
      loadingSortedThreads: true,
      allThreads: []
    });
    forumApi.getAllThreads(localStorage.getItem(this.SELECTED_SORT_ORDER))
      .then(res => {
        this.setState({
          allThreads: res.data,
          noSortResults: res.data === undefined || res.data.length === 0 ? defaults.noSortResults : null,
          disableSortThreadsButton: false,
          loadingSortedThreads: false
        });
      })
      .catch(err => {
        this.setState({
          disableSortThreadsButton: false,
          loadingSortedThreads: false
        });
        this.errorNotification(err);
      });
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
   * 
   * @param string the user input to check against
   */
  checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
  };

  /**
   * Gets all of the threads from the database
   * If successful or if there is an error, then find the user information
   */
  getAllThreads = sortCriteria => {
    forumApi.getAllThreads(sortCriteria)
      .then(res => {
        this.setState({
          allThreads: res.data,
          noSortResults: res.data === undefined || res.data.length === 0 ? defaults.noSortResults : null
        }, () => this.getUserInfoPartial());
      })
      .catch(err => {
        this.errorNotification(err);
        this.getUserInfoPartial();
      });
  };

  /**
   * Retrieve the information for the user then load the page
   */
  getUserInfoPartial = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.uniqueCreatorId = user.uid;
        this.setState({
          loggedin: true,
          uniqueCreatorId: user.uid,
          email: user.email,
          displayName: user.displayName
        }, () => {
          if (!user.photoURL) this.setState({ userPhotoUrl: defaults.defaultProfilePicture });
          if (!user.displayName) this.setState({ displayName: defaults.defaultDisplayName });
        });
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
              if (this.state.refreshCounter < 10) {
                this.getUserInfoPartial();
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
   * Validate the input values for a new thread before saving it
   */
  validateThreadInputValues = e => {
    e.preventDefault();
    userApi.getUserInfoPartial(this.uniqueCreatorId)
      .then(res => {
        if (res.data.creator === this.state.uniqueCreatorId) {
          if (
            this.state.threadTitle === "" ||
            this.state.threadDescription === "" ||
            this.checkIfStringIsBlank(this.state.threadTitle) ||
            this.checkIfStringIsBlank(this.state.threadDescription)
          ) {
            this.errorNotification(defaults.threadDetailsCannotBeBlank);
          } else {
            let element = document.getElementById(defaults.threadCategoryDropdown);
            this.handleAddOneThread(element.options[element.selectedIndex].value);
          }
        } else {
          alert(defaults.noAuthorizationToPerformAction);
          window.location = "/";
        }
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Add a new thread into the database
   * 
   * @param threadCategory the category to record for the thread
   */
  handleAddOneThread = threadCategory => {
    this.setState({ disableSubmitNewThreadButton: true });
    const creatorId = this.state.uniqueCreatorId;
    const email = this.state.email;
    const displayName = this.state.displayName;
    const event = events.addOneThread;
    let newThreadPayload = {
      creator: creatorId,
      email: email,
      displayName: displayName,
      threadTitle: this.state.threadTitle,
      threadDescription: this.state.threadDescription,
      threadCategory: threadCategory,
      views: 0,
      hits: 0,
      comments: []
    };
    forumApi.addOneThread(newThreadPayload)
      .then(() => {
        this.setState({
          threadDescription: "",
          threadTitle: "",
          defaultSortOrder: defaults.mostRecentThreadsSort,
          disableSubmitNewThreadButton: false
        }, () => {
          eventLogHandler.successful(creatorId, email, event);
          localStorage.removeItem(this.SELECTED_SORT_ORDER);
          this.successNotification(defaults.addThreadSuccessfully);
          this.getAllThreads(this.state.defaultSortOrder);
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.setState({ disableSubmitNewThreadButton: false });
        this.errorNotification(err);
      });
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
                  loadingSortedThreads={this.state.loadingSortedThreads}
                  handleChange={this.handleChange}
                  validateThreadInputValues={this.validateThreadInputValues}
                  threadTitle={this.state.threadTitle}
                  threadDescription={this.state.threadDescription}
                  allThreads={this.state.allThreads}
                  disableSubmitNewThreadButton={this.state.disableSubmitNewThreadButton}
                  backToTopOfPage={this.backToTopOfPage}
                  noSortResults={this.state.noSortResults}
                  defaultSortOrder={this.state.defaultSortOrder}
                  disableSortThreadsButton={this.state.disableSortThreadsButton}
                  renderSortedThreads={this.renderSortedThreads}
                  currentTheme={this.state.currentTheme}
                  displayName={this.state.displayName}
                />
              </Container>
            ) :
            (
              <Loading />
            )
        }
      </React.Fragment>
    );
  };
};
