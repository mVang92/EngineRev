import React, { Component } from "react";
import { firebase, auth } from "./firebase"
import Modal from "react-modal";
import API from "./utils/API";
import ModalConductor from "./components/Modal/ModalConductor";
import Nav from "./components/Nav";
import Container from "./components/Container";
import LoggedOut from "./components/LoggedOut";
import LoggedIn from "./components/LoggedIn";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      loggedin: false,
      uid: "",
      currentModal: String,
      vehicles: [],
      // User Authentication
      message: "",
      email: "",
      password: ""
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  };

  componentWillMount = () => {
    Modal.setAppElement("body");
    this.onAuthStateChanged();
    this.setState({
      vehicles: []
    });
  };

  componentDidMount = () => {
    this.getVehicles();
  };

  getVehicles = () => {
    console.log("getVehicles")
  };

  authClick = e => {
    const { name } = e.target
    // console.log(name);
    this.setState({
      currentModal: name,
      showModal: true
    });
  };

  // Upon page refresh, if the user is logged in, they will stay logged in
  onAuthStateChanged = () => {
    const bindThis = this;
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user.uid);
        bindThis.setState({ loggedin: true });
        let userName = document.createTextNode(user.email);
        document.getElementById("userEmail").innerHTML = "";
        document.getElementById("userEmail").appendChild(userName);
        // const id = user.uid;
        //need to call API.getMenu or something like that or a function that does the same (loadMenus?) while passing in user.uid as the required param to search the db for
        // API.getMenu(id).then(res => { this.setState({ menu: res.data, uid: user.uid }) }
        // );

      } else {
        console.log("Please sign-in or sign-up.");
      };
    });
  };

  handleSignUp = e => {
    e.preventDefault();
    auth
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("signing up: " + this.state.email);
        this.setState({
          loggedin: true,
          message: ""
        });
        // Sets the submenu state to three default menus upon creation and adds default menus to each user
        this.handleCloseModal();
      })
      .catch(error => {
        this.setState({ message: error.message })
        const message = document.createTextNode(this.state.message);
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").appendChild(message);
      });
  };

  handleSignIn = e => {
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("signing in: " + this.state.email);
        this.setState({
          loggedin: true,
          message: ""
        });
        this.handleCloseModal();
      })
      .catch(error => {
        this.setState({ message: error.message });
        const message = document.createTextNode(this.state.message);
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").appendChild(message);
      });
  };

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
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log(name, value);
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  // Receives our states from MyVehicles.js to be used in this main component
  handleAddVehicle = vehicle => {
    let vehicles = this.state.vehicles;
    vehicles.push(vehicle);
    this.setState({
      vehicles: vehicles
    });
    let element = this.state.vehicles.length - 1;
    // console.log(this.state.vehicles[element].year);
    // const id = this.state.uid;
    // const bindThis = this;
    // // const data = {
    //   year: this.state.vehicles[element].year,
    //   make: this.state.vehicles[element].make,
    //   model: this.state.vehicles[element].model
    // };
    // API.addVehicle(id, data)
    // .then(function (){
    //   bindThis.onAuthStateChanged();
    // });
    API.addVehicle({
      year: this.state.vehicles[element].year,
      make: this.state.vehicles[element].make,
      model: this.state.vehicles[element].model
    })
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
    // this.componentWillMount();
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          loggedin={this.state.loggedin}
          authClick={this.authClick}
          signOut={this.handleSignOut}
          openOptions={this.openOptions}
        />
        <Container>
          {this.state.loggedin === true ? (
            // Here we pass in vehicles to the LoggedIn component
            <LoggedIn
              vehicles={this.state.vehicles}
              handleChange={this.handleChange}
              addVehicle={this.handleAddVehicle.bind(this)}
            />
          ) : (
              <LoggedOut />
            )}
        </Container>
        <ModalConductor
          currentModal={this.state.currentModal}
          handleOpenModal={this.handleOpenModal}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          handleSignIn={this.handleSignIn}
          handleSignOut={this.handleSignOut}
          handleSignUp={this.handleSignUp}
          handleChange={this.handleChange}
          view={this.state.view}
        />
      </React.Fragment>
    );
  };
};
