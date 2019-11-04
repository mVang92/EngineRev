import React, { Component } from "react";
import { firebase, auth } from "../../firebase"
import Modal from "react-modal";
import API from "../../utils/API";
import ModalConductor from "../../components/Modal/ModalConductor";
import AddVehicleYearNanErrorModal from "../../components/Modal/AddVehicleYearNanErrorModal";
import SignOutModal from "../../components/Modal/SignOutModal";
import Nav from "../../components/Nav";
import Container from "../../components/Container";
import LoggedOut from "../../components/LoggedOut";
import LoggedIn from "../../components/LoggedIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showSignOutModal: false,
      showAddVehicleYearNanErrorModal: false,
      loggedin: false,
      uid: "",
      currentModal: String,
      vehicleData: [],
      vehicleCount: 0,
      message: "",
      email: "",
      password: ""
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  };

  /**
   * Logs the user in if they are logged in and set vehicleData state to empty array
   */
  componentWillMount = () => {
    Modal.setAppElement("body");
    this.onAuthStateChanged();
    this.setState({
      vehicleData: []
    });
  };

  /**
   * Load all vehicles on record for the user
   */
  loadVehicles = () => {
    API.getAllVehiclesForUser()
      .then(res =>
        this.setState({
          vehicleData: res.data,
          year: "",
          make: "",
          model: ""
        })
      )
      .catch(err => console.log(err));
  };

  /**
   * Show the proper modal for signing in or signing up
   */
  authClick = e => {
    const { name } = e.target
    // console.log(name);
    this.setState({
      currentModal: name,
      showModal: true
    });
  };

  /**
   * Creates a schema for the user  during first time login
   */
  createUserSchema = () => {
    const bindThis = this;
    firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        API.createUserSchema(user.uid)
          .then(() => {
            bindThis.componentWillMount();
          });
      };
    });
  };

  /**
   * Upon page refresh, if the user is logged in, they will stay logged in
   */
  onAuthStateChanged = () => {
    const bindThis = this;
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        bindThis.setState({ loggedin: true });
        let userName = document.createTextNode(user.email);
        document.getElementById("userEmail").innerHTML = "";
        document.getElementById("userEmail").appendChild(userName);
        const id = user.uid;
        API.getAllVehiclesForUser(id)
          .then(res => this.setState({
            vehicleData: res.data,
            uid: user.uid
          }))
          .catch(err => console.log(err));
      };
    });
  };

  /**
   * Handle user authentication when a user signs up
   */
  handleSignUp = e => {
    e.preventDefault();
    auth
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          loggedin: true,
          message: ""
        });
        this.createUserSchema();
        this.handleCloseModal();
      })
      .catch(error => {
        try {
          this.setState({ message: error.message })
          const message = document.createTextNode(this.state.message);
          document.getElementById("error").innerHTML = "";
          document.getElementById("error").appendChild(message);
        } catch (e) {
          null;
        };
      });
  };

  /**
   * Handle user authentication when a user signs in
   */
  handleSignIn = e => {
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          loggedin: true,
          message: ""
        });
        this.handleCloseModal();
      })
      .catch(error => {
        try {
          this.setState({ message: error.message })
          const message = document.createTextNode(this.state.message);
          document.getElementById("error").innerHTML = "";
          document.getElementById("error").appendChild(message);
        } catch (e) {
          null;
        };
      });
  };

  /**
   * Signs the user out of the session
   */
  handleSignOut = e => {
    e.preventDefault();
    auth
      .doSignOut()
      .then(() => {
        this.setState({
          loggedin: false,
          email: "",
          password: ""
        });
      });
    window.location.reload(true);
  };

  /**
   * Handle real-time changes
   */
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  /**
   * Add a new vehicle to the vehicle data for the user
   * 
   * @param newVehicle the new vehicle to record into data
   */
  handleAddOneVehicle = newVehicle => {
    const id = this.state.uid;
    const bindThis = this;
    let vehicleData = this.state.vehicleData;
    vehicleData.vehicles.push(newVehicle);
    this.setState({
      vehicleData: vehicleData
    });
    let element = this.state.vehicleData.vehicles.length - 1;
    // Check to see if the year is a number.
    if (isNaN(this.state.vehicleData.vehicles[element].year)) {
      this.showAddVehicleYearNanErrorModal();
      // Refreshes page, simple way of preventing
      // bad user input to populate dropdown menu
      this.componentWillMount();
    } else {
      const data = {
        year: this.state.vehicleData.vehicles[element].year,
        make: this.state.vehicleData.vehicles[element].make,
        model: this.state.vehicleData.vehicles[element].model
      };
      API.addOneVehicle(id, data)
        .then(() => {
          this.addOneVehicleSuccessNotification(data.year, data.make, data.model);
          // Reloads the page after adding a vehicle.
          // Prevents the URL from having undefined route.
          bindThis.onAuthStateChanged();
        })
        .catch(err =>
          this.addOneVehicleFailNotification(err)
        );
    };
  };

  /**
   * Display the number of vehicles in the database the user has
   * 
   * @param vehicleCount the number of vehicles in the database
   */
  handleAddVehicleCountForUser = vehicleCount => {
    let vehicleCountToDisplay = document.createTextNode(vehicleCount);
    document.getElementById("vehicleCountForUser").innerHTML = "";
    document.getElementById("vehicleCountForUser").appendChild(vehicleCountToDisplay);
  };

  /**
   * Display the success notification when a vehicle is successfully added
   * 
   * @param year  the year of the vehicle
   * @param make  the make of the vehicle
   * @param model the model of the vehicle
   */
  addOneVehicleSuccessNotification = (year, make, model) => {
    toast.success(`Added a ${year} ${make} ${model}.`);
  };

  /**
   * Display the error notification when an error occurs while adding a vehicle
   * 
   * @param err the error message to display to the user
   */
  addOneVehicleFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the info notification when the user resets the fields to add a vehicle
   */
  handleResetAddVehicleFields = () => {
    toast.info(`Input Fields Reset`);
  };

  /**
   * Display the sign out modal
   */
  showSignOutModal = () => {
    this.setState({ showSignOutModal: true });
  };

  /**
   * Display the modal to notify the user the vehicle year must be a number
   */
  showAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: true });
  };

  /**
   * Hide the sign out modal
   */
  hideSignOutModal = () => {
    this.setState({ showSignOutModal: false });
  };

  /**
   * Hide the modal to notify the user the vehicle year must be a number
   */
  hideAddVehicleYearNanErrorModal = () => {
    this.setState({ showAddVehicleYearNanErrorModal: false });
  };

  /**
   * Hide the sign in and sign up modals
   */
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          loggedin={this.state.loggedin}
          authClick={this.authClick}
          signOut={this.showSignOutModal}
        />
        <Container>
          {this.state.loggedin === true ? (
            // Here we pass in vehicles to the LoggedIn component
            <LoggedIn
              vehicleData={this.state.vehicleData}
              handleChange={this.handleChange}
              handleResetAddVehicleFields={this.handleResetAddVehicleFields}
              addVehicle={this.handleAddOneVehicle.bind(this)}
              vehicleCountForUser={this.handleAddVehicleCountForUser.bind(this)}
            />
          ) : (
              <LoggedOut />
            )
          }
        </Container>
        <ModalConductor
          currentModal={this.state.currentModal}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          handleSignIn={this.handleSignIn}
          handleSignOut={this.showSignOutModal}
          handleSignUp={this.handleSignUp}
          handleChange={this.handleChange}
        />
        <AddVehicleYearNanErrorModal
          showAddVehicleYearNanErrorModal={this.state.showAddVehicleYearNanErrorModal}
          hideAddVehicleYearNanErrorModal={this.hideAddVehicleYearNanErrorModal}
        />
        <ToastContainer />
        <SignOutModal
          showSignOutModal={this.state.showSignOutModal}
          hideSignOutModal={this.hideSignOutModal}
          handleSignOut={this.handleSignOut}
        />
      </React.Fragment>
    );
  };
};
