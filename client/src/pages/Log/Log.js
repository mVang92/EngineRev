import React, { Component } from "react";
import userApi from "../../utils/userApi";
import eventLogHandler from "../../utils/EventLogHandler/eventLogHandler";
import { firebase } from "../../firebase"
import { defaults } from "../../assets/Defaults";
import { themes } from "../../themes/Themes";
import { events } from "../../assets/Events";
import VehicleLogContent from "../../components/VehicleLogContent";
import VehicleLogModals from "../../components/VehicleLogModals";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import NoAuthorization from "../../components/NoAuthorization";
import Modal from "react-modal";
import { toast } from "react-toastify";

export default class Log extends Component {
  constructor() {
    super()
    this.state = {
      uid: "",
      email: "",
      loggedin: false,
      pageLoaded: false,
      currentTheme: "",
      backgroundPicture: "",
      vehicleId: "",
      year: "",
      make: "",
      model: "",
      date: "",
      mileage: "",
      service: "",
      comment: "",
      serviceLogId: "",
      serviceLogDate: "",
      serviceLogMileage: "",
      serviceLogService: "",
      serviceLogComment: "",
      vehicleName: "",
      updatedYear: "",
      updatedMake: "",
      updatedModel: "",
      updatedVehicleName: "",
      vehicleServiceLogs: [],
      updatedServiceLogDateToConfirm: "",
      confirmDeleteVehicleButtonText: "",
      errorMessage: "",
      disableDeleteVehicleButtonTimer: "",
      sortVehicleServiceLogsMostRecent: true,
      showEditOneLogModal: false,
      deleteOneVehicleModal: false,
      showAddLogErrorModal: false,
      showMileageInputErrorModal: false,
      showDeleteOneLogModal: false,
      showFutureDateConfirmationModal: false,
      showUpdatedMileageInputErrorModal: false,
      showUpdatedLogErrorModal: false,
      showUpdatedFutureDateConfirmationModal: false,
      showEditOneVehicleNameModal: false,
      showUpdatedVehicleYearNanErrorModal: false,
      disableAddServiceLogButton: false,
      disableDeleteOneVehicleButton: true,
      disableConfirmSaveEditServiceLogButton: false,
      disableConfirmSaveEditVehicleNameButton: false
    };
  };

  findUserInformationTimeout;

  /**
   * Check if the user is logged in
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    console.log(this.props)
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          //vehicleId: this.props.match.params.vehicleId,
          uid: user.uid,
          email: user.email,
          loggedin: true
        });
        this.getUserInfoPartial(user.uid);
      };
    });
  };

  /**
   * Cleanup DOM elements to prevent memory leak 
   */
  componentWillUnmount = () => {
    clearTimeout(this.state.disableDeleteVehicleButtonTimer);
    clearTimeout(this.findUserInformationTimeout);
  };

  /**
   * Make an API call to find the user information
   * 
   * @param userUniqueId the unique id from Firebase console
   */
  getUserInfoPartial = userUniqueId => {
    userApi.getUserInfoPartial(userUniqueId)
      .then(res => {
        this.setState({
          theme: res.data.theme,
          backgroundPicture: res.data.backgroundPicture
        }, () => {
          this.renderTheme(themes.determineTheme(this.state.theme, this.state.backgroundPicture));
          this.getOneVehicle();
        });
      })
      .catch(err => {
        this.setState({
          pageLoaded: true,
          errorMessage: err
        });
      });
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
   * Format the date to yyyy-mm-dd
   * 
   * @param dateToConvert The date to convert
   */
  formatDateYyyyMmDd = dateToConvert => {
    let date = new Date(dateToConvert),
      month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  /**
   * Convert date to UTC
   *
   * @param date The date to convert
   */
  createDateAsUTC = date => {
    return new Date(
      Date.UTC(date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  };

  /**
   * Format the current date for comparison with service log date
   */
  setHoursAndSetDateForCurrentDate = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
    date.setDate(date.getDate());
    return date;
  };

  /**
   * Format the service log date for comparison with the current date
   * 
   * @param serviceLogDate The service log date to format
   */
  setHoursAndSetDateForServiceLogDate = serviceLogDate => {
    const date = new Date(serviceLogDate);
    date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    return date;
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
   * Get the vehicle information for the selected vehicle
   * then show the page after loading
   */
  getOneVehicle = () => {
    clearTimeout(this.findUserInformationTimeout);
    userApi.getOneVehicleForUser(this.state.uid, this.state.vehicleId)
      .then(res => {
        try {
          this.setState({
            pageLoaded: true,
            vehicleName: res.data[0].vehicles[0].vehicleName,
            year: res.data[0].vehicles[0].year,
            make: res.data[0].vehicles[0].make,
            model: res.data[0].vehicles[0].model,
            vehicleServiceLogs: res.data[0].vehicles[0].logs
          }, () => this.findUserInformationTimeout = setTimeout(this.getOneVehicle.bind(this), 5000));
        } catch (e) {
          this.setState({ pageLoaded: true });
        };
      })
      .catch(err => this.loadServiceLogsFailNotification(err));
  };

  /**
   * Delete the vehicle name to one vehicle
   */
  deleteVehicleName = () => {
    const creatorId = this.state.uid;
    const email = this.state.email;
    const event = events.deleteVehicleName;
    userApi.deleteVehicleName(this.state.vehicleId, null)
      .then(() => {
        this.setState({ showEditOneVehicleNameModal: false }, () => {
          eventLogHandler.successful(creatorId, email, event);
          this.successNotification(defaults.vehicleNameUpdatedSuccessfully);
          this.getOneVehicle();
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
      });
  };

  /**
   * Go through a series of conditions to validate the updated service log being entered
   */
  checkUserEnteredServiceLogInput = e => {
    e.preventDefault();
    const currentDate = this.setHoursAndSetDateForCurrentDate();
    const loggedServiceDate = this.setHoursAndSetDateForServiceLogDate(this.state.date);
    if (isNaN(this.state.mileage)) {
      this.showMileageInputErrorModal();
    } else {
      if (
        this.state.date === "" ||
        this.state.mileage === "" ||
        this.state.service === "" ||
        this.checkIfStringIsBlank(this.state.date) ||
        this.checkIfStringIsBlank(this.state.mileage) ||
        this.checkIfStringIsBlank(this.state.service)
      ) {
        this.showAddLogErrorModal();
      } else {
        if (currentDate < loggedServiceDate) {
          this.showFutureDateConfirmationModal();
        } else {
          this.handleSubmitOneServiceLog();
        }
      }
    }
  };

  /**
   * Go through a series of conditions to validate the updated vehicle name being entered
   */
  checkUserEnteredUpdatedVehicleNameInput = e => {
    e.preventDefault();
    let updatedVehicleName = "";
    let updatedYear = "";
    let updatedMake = "";
    let updatedModel = "";
    const date = new Date();
    const futureYear = date.getFullYear() + 2;
    if (isNaN(this.state.updatedYear)) {
      this.showUpdatedVehicleYearNanErrorModal();
    } else {
      if (this.state.updatedYear) {
        if ((this.state.updatedYear < 1885) || (this.state.updatedYear > futureYear)) {
          updatedYear = this.state.year;
        } else {
          updatedYear = this.state.updatedYear;
        }
      } else {
        updatedYear = this.state.year;
      }

      if (this.state.updatedMake) {
        updatedMake = this.state.updatedMake;
      } else {
        updatedMake = this.state.make;
      }

      if (this.state.updatedModel) {
        updatedModel = this.state.updatedModel;
      } else {
        updatedModel = this.state.model;
      }

      if (this.state.updatedVehicleName) {
        updatedVehicleName = this.state.updatedVehicleName;
      } else {
        updatedVehicleName = this.state.vehicleName;
      }

      if (this.checkIfStringIsBlank(updatedVehicleName)) {
        updatedVehicleName = "";
      }

      if (this.checkIfStringIsBlank(updatedMake)) {
        updatedMake = this.state.make;
      }

      if (this.checkIfStringIsBlank(updatedModel)) {
        updatedModel = this.state.model;
      }

      let updatedVehicleInformation = {
        vehicleName: updatedVehicleName,
        year: updatedYear,
        make: updatedMake,
        model: updatedModel
      };
      this.handleUpdateVehicleInformation(updatedVehicleInformation);
    }
  };

  /**
   * Go through a series of conditions to validate the service log being entered
   */
  checkUserEnteredUpdatedServiceLogInput = e => {
    e.preventDefault();
    const serviceLogDate = this.state.serviceLogDate;
    const serviceLogMileage = this.state.serviceLogMileage;
    const serviceLogService = this.state.serviceLogService;
    const currentDate = this.setHoursAndSetDateForCurrentDate();
    const loggedServiceDate = new Date(serviceLogDate);
    const loggedServiceDateToUTC = this.createDateAsUTC(loggedServiceDate);
    loggedServiceDateToUTC.setDate(loggedServiceDateToUTC.getDate() + 1);
    const loggedServiceDateToEnUs = loggedServiceDateToUTC.toLocaleDateString("en-US");
    this.formatDateYyyyMmDd(loggedServiceDateToEnUs);
    this.setState({ serviceLogDate: serviceLogDate });
    const updatedServiceLogDate = new Date(loggedServiceDateToEnUs);
    if (isNaN(serviceLogMileage)) {
      this.showUpdatedMileageInputErrorModal();
    } else {
      if (
        this.checkIfStringIsBlank(serviceLogDate) ||
        this.checkIfStringIsBlank(serviceLogMileage) ||
        this.checkIfStringIsBlank(serviceLogService)
      ) {
        this.showUpdateLogErrorModal();
      } else {
        if (currentDate < updatedServiceLogDate) {
          this.setState({ updatedServiceLogDateToConfirm: updatedServiceLogDate });
          this.showUpdateFutureDateConfirmationModal();
        } else {
          this.handleUpdateOneServiceLog(updatedServiceLogDate);
        }
      }
    }
  };

  /**
   * Update one vehicle name from record
   * 
   * @param updatedVehicleName the updated name for the vehicle
   */
  handleUpdateVehicleInformation = updatedVehicleName => {
    const creatorId = this.state.uid;
    const email = this.state.email;
    const event = events.updateVehicleInformation;
    this.setState({ disableConfirmSaveEditVehicleNameButton: true });
    userApi.updateVehicleInformationForOneVehicle(this.state.vehicleId, updatedVehicleName)
      .then(() => {
        this.setState({
          vehicleName: "",
          updatedYear: "",
          updatedMake: "",
          updatedModel: "",
          disableConfirmSaveEditVehicleNameButton: false
        }, () => {
          eventLogHandler.successful(creatorId, email, event);
          this.successNotification(defaults.vehicleNameUpdatedSuccessfully);
          this.hideEditOneVehicleNameModal();
          this.getOneVehicle();
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
        this.setState({ disableConfirmSaveEditVehicleNameButton: false });
      });
  };

  /**
   * Records a service log for the vehicle
   */
  handleSubmitOneServiceLog = () => {
    this.hideFutureDateConfirmationModal();
    const creatorId = this.state.uid;
    const email = this.state.email;
    const event = events.addOneServiceLog;
    const serviceLogDate = new Date(this.state.date);
    serviceLogDate.setDate(serviceLogDate.getDate() + 1);
    let serviceLogToStore = {
      date: this.state.date,
      mileage: this.state.mileage,
      service: this.state.service,
      comment: this.state.comment
    };
    let serviceLogDateMemory = serviceLogDate.toLocaleDateString("en-US");
    let serviceLogMileageMemory = this.state.mileage;
    let serviceLogServiceMemory = this.state.service;
    this.setState({ disableAddServiceLogButton: true });
    userApi.addOneLogForOneVehicle(creatorId, this.state.vehicleId, serviceLogToStore)
      .then(() => {
        this.setState({
          date: "",
          mileage: "",
          service: "",
          comment: "",
          disableAddServiceLogButton: false
        }, () => {
          eventLogHandler.successful(creatorId, email, event);
          this.addOneServiceLogSuccessNotification(serviceLogDateMemory, serviceLogMileageMemory, serviceLogServiceMemory);
          this.getOneVehicle();
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
        this.setState({ disableAddServiceLogButton: false });
      });
  };

  /**
   * Reset the date, mileage, service, and comment input boxes to empty
   */
  handleResetLogVehicleForm = () => {
    this.setState({
      date: "",
      mileage: "",
      service: "",
      comment: ""
    }, () => toast.info(defaults.inputFieldsReset));
  };

  /**
   * Deletes one vehicle from record
   */
  handleDeleteOneVehicle = () => {
    const creatorId = this.state.uid;
    const email = this.state.email;
    const event = events.deletedVehicle;
    userApi.deleteOneVehicle(this.state.vehicleId)
      .then(() => {
        eventLogHandler.successful(creatorId, email, event);
        document.getElementById(defaults.applicationName).click();
        this.successNotification(defaults.deleteVehicleSucess);
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
      });
  };

  /**
   * Update one service log from record
   * 
   * @param updatedServiceLogDateToConvert the date of the updated service log to convert
   */
  handleUpdateOneServiceLog = updatedServiceLogDateToConvert => {
    const creatorId = this.state.uid;
    const email = this.state.email;
    const event = events.updateOneServiceLog;
    let updatedServiceLogDateToRecord = "";
    const updatedServiceLogDate = this.formatDateYyyyMmDd(updatedServiceLogDateToConvert);
    if (updatedServiceLogDate === "NaN-NaN-NaN") {
      const updatedServiceLogDateToConfirm = this.state.updatedServiceLogDateToConfirm;
      const updatedServiceLogDateToNewDate = new Date(updatedServiceLogDateToConfirm);
      const updatedServiceDateToUTC = this.createDateAsUTC(updatedServiceLogDateToNewDate);
      const updatedServiceLogDate = this.formatDateYyyyMmDd(updatedServiceDateToUTC.setDate(updatedServiceDateToUTC.getDate() + 1));
      updatedServiceLogDateToRecord = updatedServiceLogDate;
    } else {
      updatedServiceLogDateToRecord = updatedServiceLogDate;
    }
    let serviceLogToUpdate = {
      date: updatedServiceLogDateToRecord,
      mileage: this.state.serviceLogMileage,
      service: this.state.serviceLogService,
      comment: this.state.serviceLogComment
    };
    const serviceLogDateMemoryToNewDate = new Date(updatedServiceLogDateToRecord);
    serviceLogDateMemoryToNewDate.setDate(serviceLogDateMemoryToNewDate.getDate() + 1);
    let serviceLogDateMemory = serviceLogDateMemoryToNewDate.toLocaleDateString("en-US");
    let serviceLogMileageMemory = this.state.serviceLogMileage;
    let serviceLogServiceMemory = this.state.serviceLogService;
    this.setState({ disableConfirmSaveEditServiceLogButton: true });
    userApi.updateOneLogForOneVehicle(this.state.vehicleId, this.state.serviceLogId, serviceLogToUpdate)
      .then(() => {
        this.setState({
          serviceLogDate: "",
          serviceLogMileage: "",
          serviceLogService: "",
          serviceLogComment: "",
          disableConfirmSaveEditServiceLogButton: false
        }, () => {
          eventLogHandler.successful(creatorId, email, event);
          this.hideEditOneServiceLogModal();
          this.hideUpdatedFutureDateConfirmationModal();
          this.updateOneServiceLogSuccessNotification(serviceLogDateMemory, serviceLogMileageMemory, serviceLogServiceMemory);
          this.getOneVehicle();
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
        this.setState({ disableConfirmSaveEditServiceLogButton: false });
      });
  };

  /**
   * Deletes one service log from record
   */
  handleDeleteOneServiceLog = () => {
    const creatorId = this.state.uid;
    const email = this.state.email;
    const event = events.deleteOneServiceLog;
    userApi.deleteOneServiceLog(this.state.vehicleId, this.state.serviceLogId)
      .then(() => {
        this.setState({ showDeleteOneLogModal: false }, () => {
          eventLogHandler.successful(creatorId, email, event);
          this.getOneVehicle();
          this.successNotification(defaults.serviceLogDeletedSuccessfully);
        });
      })
      .catch(err => {
        eventLogHandler.failure(creatorId, email, event, err);
        this.errorNotification(err);
      });
  };

  /**
   * Show the print screen for the user to print all service logs
   */
  handlePrintPage = () => {
    if (this.state.deleteOneVehicleModal) {
      this.setState({ deleteOneVehicleModal: false });
      clearTimeout(this.state.disableDeleteVehicleButtonTimer);
      setTimeout(() => {
        window.print();
      }, 10);
    } else {
      window.print();
    }
  };

  /**
   * Check the state of the sort and sort the vehicle logs depending on the state of the sort
   */
  sortServiceLogs = () => {
    if (this.state.sortVehicleServiceLogsMostRecent) {
      return this.state.vehicleServiceLogs.sort((a, b) => new Date(...b.date.split('/').reverse()) - new Date(...a.date.split('/').reverse()));
    } else {
      return this.state.vehicleServiceLogs.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));
    }
  };

  /**
   * Change the state of the sort from true to false and vice versa
   */
  changeSortOrder = () => {
    if (this.state.sortVehicleServiceLogsMostRecent) {
      this.setState({ sortVehicleServiceLogsMostRecent: false });
    } else {
      this.setState({ sortVehicleServiceLogsMostRecent: true });
    };
  };

  /**
   * Render the theme and background picture
   * 
   * @param theme The type of theme to render
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
   * Display the success notification when the user adds a service log
   * 
   * @param date    the date when the service is logged
   * @param mileage the current mileage of the vehicle
   * @param service the service done to the vehicle
   */
  addOneServiceLogSuccessNotification = (date, mileage, service) => {
    toast.success(`Service Logged: ${service} at ${mileage} miles on ${date}.`);
  };

  /**
   * Display the success notification when the user updates a service log
   * 
   * @param date    the date when the service is logged
   * @param mileage the current mileage of the vehicle
   * @param service the service done to the vehicle
   */
  updateOneServiceLogSuccessNotification = (date, mileage, service) => {
    toast.success(`Service Updated: ${service} at ${mileage} miles on ${date}.`);
  };

  /**
   * Display the error notification when an error occurs while executing a database query
   * 
   * @param err the error message to display to the user
   */
  errorNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when an error occurs while loading service logs
   * 
   * @param err the error message to display to the user
   */
  loadServiceLogsFailNotification = err => {
    toast.error(`Loading Service Log ${err.toString()}.`);
  };

  /**
   * Display the modal to notify the user the updated vehicle year must be a number
   */
  showUpdatedVehicleYearNanErrorModal = () => {
    this.setState({ showUpdatedVehicleYearNanErrorModal: true });
  };

  /**
   * Display the modal to edit the name of the vehicle
   */
  showEditOneVehicleNameModal = () => {
    this.setState({
      showEditOneVehicleNameModal: true,
      updatedVehicleName: null
    });
  };

  /**
   * Display the modal to confirm the future date submission of the service log
   */
  showFutureDateConfirmationModal = () => {
    this.setState({ showFutureDateConfirmationModal: true });
  };

  /**
   * Display the modal to confirm the updated future date submission of the service log
   */
  showUpdateFutureDateConfirmationModal = () => {
    this.setState({ showUpdatedFutureDateConfirmationModal: true });
  };

  /**
   * Display the modal to confirm the deletion of one vehicle
   */
  showDeleteOneVehicleModal = () => {
    this.setState({
      showEditOneVehicleNameModal: false,
      deleteOneVehicleModal: true,
      disableDeleteOneVehicleButton: true,
      confirmDeleteVehicleButtonText: "Waiting...",
      disableDeleteVehicleButtonTimer: setTimeout(() => {
        this.setState({
          disableDeleteOneVehicleButton: false,
          confirmDeleteVehicleButtonText: "Delete"
        });
      }, 5000)
    });
  };

  /**
   * Display the modal to notify the user about bad input while adding a service log
   */
  showAddLogErrorModal = () => {
    this.setState({ showAddLogErrorModal: true });
  };

  /**
   * Display the modal to notify the user about bad input while updating a service log
   */
  showUpdateLogErrorModal = () => {
    this.setState({ showUpdatedLogErrorModal: true });
  };

  /**
   * Display the modal to notify the user about bad input to the mileage input field
   */
  showMileageInputErrorModal = () => {
    this.setState({ showMileageInputErrorModal: true });
  };

  /**
   * Display the modal to notify the user about bad input to updating the mileage input field
   */
  showUpdatedMileageInputErrorModal = () => {
    this.setState({ showUpdatedMileageInputErrorModal: true });
  };

  /**
   * Display the modal to notify the user about editing the service log
   * 
   * @param serviceLogId the service log id to target
   * @param date         the service log date
   * @param mileage      the service log mileage
   * @param service      the service log service type
   * @param comment      the service log comment
   */
  showEditOneServiceLogModal = (serviceLogId, date, mileage, service, comment) => {
    this.setState({
      showEditOneLogModal: true,
      serviceLogId: serviceLogId,
      serviceLogDate: date,
      serviceLogMileage: mileage,
      serviceLogService: service,
      serviceLogComment: comment
    });
  };

  /**
   * Display the modal to notify the user about deleting the service log
   */
  showDeleteOneServiceLogModal = () => {
    this.setState({
      showDeleteOneLogModal: true,
      showEditOneLogModal: false
    });
  };

  /**
   * Hide the modal to notify the user the updated vehicle year must be a number
   */
  hideUpdatedVehicleYearNanErrorModal = () => {
    this.setState({ showUpdatedVehicleYearNanErrorModal: false });
  };

  /**
   * Hide the edit one vehicle name modal
   */
  hideEditOneVehicleNameModal = () => {
    this.setState({ showEditOneVehicleNameModal: false });
  };

  /**
   * Hide the future date confirmation modal
   */
  hideFutureDateConfirmationModal = () => {
    this.setState({ showFutureDateConfirmationModal: false });
  };

  /**
   * Hide the future updated date confirmation modal
   */
  hideUpdatedFutureDateConfirmationModal = () => {
    this.setState({ showUpdatedFutureDateConfirmationModal: false });
  };

  /**
   * Hide the deleted one service log modal
   */
  hideEditOneServiceLogModal = () => {
    this.setState({ showEditOneLogModal: false });
  };

  /**
   * Hide the deleted one service log modal
   */
  hideDeleteOneServiceLogModal = () => {
    this.setState({ showDeleteOneLogModal: false });
  };

  /**
   * Hide the successfully deleted one vehicle modal
   */
  hideDeleteOneVehicleModal = () => {
    this.setState({
      deleteOneVehicleModal: false,
      disableDeleteOneVehicleButton: true
    });
    clearTimeout(this.state.disableDeleteVehicleButtonTimer);
  };

  /**
   * Hide the successfully added one service log modal
   */
  hideAddLogErrorModal = () => {
    this.setState({ showAddLogErrorModal: false });
  };

  /**
   * Hide the successfully updated one service log modal
   */
  hideUpdateLogErrorModal = () => {
    this.setState({ showUpdatedLogErrorModal: false });
  };

  /**
   * Hide the bad mileage input modal
   */
  hideMileageInputErrorModal = () => {
    this.setState({ showMileageInputErrorModal: false });
  };

  /**
   * Hide the bad mileage input modal while updating mileage
   */
  hideUpdatedMileageInputErrorModal = () => {
    this.setState({ showUpdatedMileageInputErrorModal: false });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedin ?
            (
              this.state.pageLoaded ?
                (
                  <Container>
                    <VehicleLogContent
                      handleChange={this.handleChange}
                      currentTheme={this.state.currentTheme}
                      vehicleName={this.state.vehicleName}
                      year={this.state.year}
                      make={this.state.make}
                      model={this.state.model}
                      errorMessage={this.state.errorMessage}
                      handlePrintPage={this.handlePrintPage}
                      changeSortOrder={this.changeSortOrder}
                      showDeleteOneVehicleModal={this.showDeleteOneVehicleModal}
                      showEditOneVehicleNameModal={this.showEditOneVehicleNameModal}
                      vehicleServiceLogs={this.state.vehicleServiceLogs}
                      date={this.state.date}
                      mileage={this.state.mileage}
                      service={this.state.service}
                      comment={this.state.comment}
                      handleResetLogVehicleForm={this.handleResetLogVehicleForm}
                      checkUserEnteredServiceLogInput={this.checkUserEnteredServiceLogInput}
                      disableAddServiceLogButton={this.state.disableAddServiceLogButton}
                      sortVehicleServiceLogsMostRecent={this.state.sortVehicleServiceLogsMostRecent}
                      sortServiceLogs={this.sortServiceLogs}
                      showEditOneServiceLogModal={this.showEditOneServiceLogModal}
                      backToTopOfPage={this.backToTopOfPage}
                    />
                    <VehicleLogModals
                      currentTheme={this.state.currentTheme}
                      handleChange={this.handleChange}
                      handleSubmitOneServiceLog={this.handleSubmitOneServiceLog}
                      handleUpdateOneServiceLog={this.handleUpdateOneServiceLog}
                      handleDeleteOneVehicle={this.handleDeleteOneVehicle}
                      handlePrintPage={this.handlePrintPage}
                      handleDeleteOneServiceLog={this.handleDeleteOneServiceLog}
                      disableConfirmSaveEditVehicleNameButton={this.state.disableConfirmSaveEditVehicleNameButton}
                      disableConfirmSaveEditServiceLogButton={this.state.disableConfirmSaveEditServiceLogButton}
                      disableDeleteOneVehicleButton={this.state.disableDeleteOneVehicleButton}
                      showEditOneVehicleNameModal={this.state.showEditOneVehicleNameModal}
                      showDeleteOneServiceLogModal={this.showDeleteOneServiceLogModal}
                      showEditOneLogModal={this.state.showEditOneLogModal}
                      showUpdatedVehicleYearNanErrorModal={this.state.showUpdatedVehicleYearNanErrorModal}
                      showFutureDateConfirmationModal={this.state.showFutureDateConfirmationModal}
                      showUpdatedFutureDateConfirmationModal={this.state.showUpdatedFutureDateConfirmationModal}
                      showDeleteOneVehicleModal={this.showDeleteOneVehicleModal}
                      showDeleteOneLogModal={this.state.showDeleteOneLogModal}
                      showAddLogErrorModal={this.state.showAddLogErrorModal}
                      showUpdatedLogErrorModal={this.state.showUpdatedLogErrorModal}
                      showMileageInputErrorModal={this.state.showMileageInputErrorModal}
                      showUpdatedMileageInputErrorModal={this.state.showUpdatedMileageInputErrorModal}
                      hideEditOneVehicleNameModal={this.hideEditOneVehicleNameModal}
                      hideEditOneServiceLogModal={this.hideEditOneServiceLogModal}
                      hideUpdatedVehicleYearNanErrorModal={this.hideUpdatedVehicleYearNanErrorModal}
                      hideFutureDateConfirmationModal={this.hideFutureDateConfirmationModal}
                      hideUpdatedFutureDateConfirmationModal={this.hideUpdatedFutureDateConfirmationModal}
                      hideDeleteOneVehicleModal={this.hideDeleteOneVehicleModal}
                      hideDeleteOneServiceLogModal={this.hideDeleteOneServiceLogModal}
                      hideAddLogErrorModal={this.hideAddLogErrorModal}
                      hideUpdateLogErrorModal={this.hideUpdateLogErrorModal}
                      hideMileageInputErrorModal={this.hideMileageInputErrorModal}
                      hideUpdatedMileageInputErrorModal={this.hideUpdatedMileageInputErrorModal}
                      checkUserEnteredUpdatedVehicleNameInput={this.checkUserEnteredUpdatedVehicleNameInput}
                      checkUserEnteredUpdatedServiceLogInput={this.checkUserEnteredUpdatedServiceLogInput}
                      checkIfStringIsBlank={this.checkIfStringIsBlank}
                      deleteVehicleName={this.deleteVehicleName}
                      deleteOneVehicleModal={this.state.deleteOneVehicleModal}
                      confirmDeleteVehicleButtonText={this.state.confirmDeleteVehicleButtonText}
                      vehicleName={this.state.vehicleName}
                      year={this.state.year}
                      make={this.state.make}
                      model={this.state.model}
                      serviceLogDate={this.state.serviceLogDate}
                      serviceLogMileage={this.state.serviceLogMileage}
                      serviceLogService={this.state.serviceLogService}
                      serviceLogComment={this.state.serviceLogComment}
                      date={this.state.date}
                      updatedServiceLogDateToConfirm={this.state.updatedServiceLogDateToConfirm}
                      vehicleServiceLogs={this.state.vehicleServiceLogs}
                      mileage={this.state.mileage}
                      service={this.state.service}
                      comment={this.state.comment}
                    />
                  </Container>
                ) :
                (
                  <Loading />
                )
            ) :
            (
              <NoAuthorization />
            )
        }
      </React.Fragment>
    );
  };
};
