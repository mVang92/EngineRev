import React, { Component } from "react";
import API from "../../utils/API";
import { firebase } from "../../firebase"
import { themes } from "../../themes/Themes";
import LogPageErrorHeader from "../../components/LogPageErrorHeader";
import LogPageVehicleNameDisplay from "../../components/LogPageVehicleNameDisplay";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import AddLog from "../../components/AddLog";
import TopActionButtons from "../../components/TopActionButtons";
import ServiceLogBottomButtons from "../../components/ServiceLogBottomButtons";
import ServiceLogDisplay from "../../components/ServiceLogDisplay";
import DeleteOneVehicleModal from "../../components/Modal/DeleteOneVehicleModal";
import EditOneServiceLogModal from "../../components/Modal/EditOneServiceLogModal";
import DeleteOneServiceLogModal from "../../components/Modal/DeleteOneServiceLogModal";
import FutureDateConfirmationModal from "../../components/Modal/FutureDateConfirmationModal";
import UpdatedFutureDateConfirmationModal from "../../components/Modal/UpdatedFutureDateConfirmationModal";
import EditOneVehicleNameModal from "../../components/Modal/EditOneVehicleNameModal";
import AddLogErrorModal from "../../components/Modal/AddLogErrorModal";
import UpdateLogErrorModal from "../../components/Modal/UpdateLogErrorModal";
import MileageInputErrorModal from "../../components/Modal/MileageInputErrorModal";
import UpdatedMileageInputErrorModal from "../../components/Modal/UpdatedMileageInputErrorModal";
import UpdatedVehicleYearNanErrorModal from "../../components/Modal/UpdatedVehicleYearNanErrorModal";
import NoAuthorization from "../../components/NoAuthorization";
import Modal from "react-modal";
import { toast } from "react-toastify";

export default class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: "",
      loggedin: false,
      pageLoaded: false,
      currentTheme: "",
      backgroundColor: "",
      vehicle: [],
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
      sortVehicleServiceLogsMostRecent: true,
      showEditOneLogModal: false,
      showDeleteOneVehicleModal: false,
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
      disableConfirmSaveEditVehicleNameButton: false,
      disableDeleteVehicleButtonTimer: ""
    };
  };

  findUserInformationTimeout;

  /**
   * Check if the user is logged in
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          vehicleId: this.props.match.params.id,
          uid: user.uid,
          loggedin: true
        });
        this.findUserInformationForOneUser(user.uid);
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
  findUserInformationForOneUser = userUniqueId => {
    API.findUserInformationForOneUser(userUniqueId)
      .then(res => {
        this.setState({ theme: res.data.theme }, () => {
          this.getThemeAndRender();
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
   */
  setHoursAndSetDateForServiceLogDate = serviceLogDate => {
    const date = new Date(serviceLogDate);
    date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    return date;
  };

  /**
   * Check if the user input value is blank
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
    API.getOneVehicleForUser(this.state.uid, this.state.vehicleId)
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
    API.deleteVehicleName(this.state.vehicleId, null)
      .then(() => {
        this.setState({
          showEditOneVehicleNameModal: false
        }, () => {
          this.updateOneVehicleNameSuccessNotification();
          this.getOneVehicle();
        });
      })
      .catch(err => this.errorNotification(err));
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
      if (this.state.date === "" || this.state.mileage === "" || this.state.service === "") {
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
      if (serviceLogDate === "" || serviceLogMileage === "" || serviceLogService === "") {
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
    this.setState({ disableConfirmSaveEditVehicleNameButton: true });
    API.updateVehicleInformationForOneVehicle(this.state.vehicleId, updatedVehicleName)
      .then(() => {
        this.setState({
          vehicleName: "",
          updatedYear: "",
          updatedMake: "",
          updatedModel: "",
          disableConfirmSaveEditVehicleNameButton: false
        }, () => {
          this.updateOneVehicleNameSuccessNotification();
          this.hideEditOneVehicleNameModal();
          this.getOneVehicle();
        });
      })
      .catch(err => {
        this.errorNotification(err);
        this.setState({ disableConfirmSaveEditVehicleNameButton: false });
      });
  };

  /**
   * Records a service log for the vehicle
   */
  handleSubmitOneServiceLog = () => {
    this.hideFutureDateConfirmationModal();
    let vehicleId = this.state.vehicleId;
    let creatorId = this.state.uid;
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
    API.addOneLogForOneVehicle(creatorId, vehicleId, serviceLogToStore)
      .then(() => {
        this.setState({
          date: "",
          mileage: "",
          service: "",
          comment: "",
          disableAddServiceLogButton: false
        }, () => {
          this.addOneServiceLogSuccessNotification(serviceLogDateMemory, serviceLogMileageMemory, serviceLogServiceMemory);
          this.getOneVehicle();
        });
      })
      .catch(err => {
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
    }, () => this.resetFieldsNotification());
  };

  /**
   * Deletes one vehicle from record
   */
  handleDeleteOneVehicle = () => {
    API.deleteOneVehicle(this.state.vehicleId)
      .then(() => this.deleteOneVehicleSuccessNotification())
      .catch(err => this.errorNotification(err));
  };

  /**
  * Update one service log from record
  */
  handleUpdateOneServiceLog = updatedServiceLogDateToConvert => {
    let vehicleId = this.state.vehicleId;
    let serviceLogId = this.state.serviceLogId;
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
    API.updateOneLogForOneVehicle(vehicleId, serviceLogId, serviceLogToUpdate)
      .then(() => {
        this.setState({
          serviceLogDate: "",
          serviceLogMileage: "",
          serviceLogService: "",
          serviceLogComment: "",
          disableConfirmSaveEditServiceLogButton: false
        }, () => {
          this.hideEditOneServiceLogModal();
          this.hideUpdatedFutureDateConfirmationModal();
          this.updateOneServiceLogSuccessNotification(serviceLogDateMemory, serviceLogMileageMemory, serviceLogServiceMemory);
          this.getOneVehicle();
        });
      })
      .catch(err => {
        this.errorNotification(err);
        this.setState({ disableConfirmSaveEditServiceLogButton: false });
      });
  };

  /**
   * Deletes one service log from record
   */
  handleDeleteOneServiceLog = () => {
    API.deleteOneServiceLog(this.state.vehicleId, this.state.serviceLogId)
      .then(() => {
        this.setState({ showDeleteOneLogModal: false }, () => {
          this.getOneVehicle();
          this.deleteOneServiceLogSuccessNotification();
        });
      })
      .catch(err => this.errorNotification(err));
  };

  /**
   * Show the print screen for the user to print all service logs
   */
  handlePrintPage = () => {
    if (this.state.showDeleteOneVehicleModal) {
      this.setState({ showDeleteOneVehicleModal: false });
      clearTimeout(this.state.disableDeleteVehicleButtonTimer);
      setTimeout(() => {
        window.print();
      }, 10);
    } else {
      window.print();
    }
  };

  /**
   * Execute the value from the service log action dropdown
   */
  getServiceLogActionValue = (event, serviceLogId, date, mileage, service, comment, actionValue) => {
    event.preventDefault();
    switch (actionValue) {
      case "edit":
        this.showEditOneServiceLogModal(serviceLogId, date, mileage, service, comment);
        break;
      case "delete":
        this.showDeleteOneServiceLogModal(serviceLogId, date, mileage, service, comment);
        break;
      default:
        this.errorNotification("Error Processing Request");
    };
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
   * Get the user theme and render it
   */
  getThemeAndRender = () => {
    if (this.state.theme) {
      switch (this.state.theme) {
        case "carSpace":
          this.setState({
            currentTheme: themes.carSpace,
            backgroundColor: document.body.style.backgroundColor = "rgb(220, 220, 220)"
          });
          break;
        case "light":
          this.setState({
            currentTheme: themes.light,
            backgroundColor: document.body.style.backgroundColor = "rgb(235, 235, 235)"
          });
          break;
        case "grey":
          this.setState({
            currentTheme: themes.grey,
            backgroundColor: document.body.style.backgroundColor = "rgb(112, 112, 112)"
          });
          break;
        case "dark":
          this.setState({
            currentTheme: themes.dark,
            backgroundColor: document.body.style.backgroundColor = "rgb(32, 32, 32)"
          });
          break;
        default:
          this.errorNotification("Error: Unable to process theme selection.");
      }
    }
  };

  /**
   * Display the success notification when the user updates a vehicle name
   */
  updateOneVehicleNameSuccessNotification = () => {
    toast.success(`Vehicle Name Updated Successfully.`);
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
   * Display the success notification when the user deletes a vehicle
   */
  deleteOneVehicleSuccessNotification = () => {
    toast.success(`Vehicle Deleted Successfully.`);
  };

  /**
   * Display the success notification when the user deletes a service log
   */
  deleteOneServiceLogSuccessNotification = () => {
    toast.success(`Service Log Deleted Successfully.`);
  };

  /**
   * Display the info notification when the user resets the fields to add a service log
   */
  resetFieldsNotification = () => {
    toast.info(`Input Fields Reset.`);
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
      showDeleteOneVehicleModal: true,
      disableDeleteOneVehicleButton: true,
      confirmDeleteVehicleButtonText: "Please Wait",
      disableDeleteVehicleButtonTimer: setTimeout(() => {
        this.setState({
          disableDeleteOneVehicleButton: false,
          confirmDeleteVehicleButtonText: "Delete Vehicle"
        });
      }, 4000)
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
   * 
   * @param serviceLogId the service log id to target
   * @param date         the service log date
   * @param mileage      the service log mileage
   * @param service      the service log service type
   * @param comment      the service log comment
   */
  showDeleteOneServiceLogModal = (serviceLogId, date, mileage, service, comment) => {
    this.setState({
      showDeleteOneLogModal: true,
      serviceLogId: serviceLogId,
      serviceLogDate: date,
      serviceLogMileage: mileage,
      serviceLogService: service,
      serviceLogComment: comment
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
      showDeleteOneVehicleModal: false,
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
                    <div className={`box ${this.state.currentTheme.background}`}>
                      {
                        this.state.year ?
                          (
                            <LogPageVehicleNameDisplay
                              vehicleName={this.state.vehicleName}
                              year={this.state.year}
                              make={this.state.make}
                              model={this.state.model}
                            />
                          ) : (
                            <LogPageErrorHeader
                              errorMessage={this.state.errorMessage}
                            />
                          )
                      }
                      <hr className={`hideWhilePrinting ${this.state.currentTheme.hr}`} />
                      <TopActionButtons
                        handlePrintPage={this.handlePrintPage}
                        changeSortOrder={this.changeSortOrder}
                        showDeleteOneVehicleModal={this.showDeleteOneVehicleModal}
                        showEditOneVehicleNameModal={this.showEditOneVehicleNameModal}
                        vehicleServiceLogs={this.state.vehicleServiceLogs}
                        year={this.state.year}
                      />
                      <hr className={this.state.currentTheme.hr} />
                      <div className="hideWhilePrinting">
                        <AddLog
                          year={this.state.year}
                          date={this.state.date}
                          mileage={this.state.mileage}
                          service={this.state.service}
                          comment={this.state.comment}
                          handleChange={this.handleChange}
                          handleResetLogVehicleForm={this.handleResetLogVehicleForm}
                          checkUserEnteredServiceLogInput={this.checkUserEnteredServiceLogInput}
                          disableAddServiceLogButton={this.state.disableAddServiceLogButton}
                        />
                        {
                          this.state.year ?
                            (
                              <hr className={this.state.currentTheme.hr} />
                            ) : (
                              null
                            )
                        }
                      </div>
                      <div className="row innerBox serviceLogMobileDisplay">
                        {
                          this.state.vehicleServiceLogs.length === 0 ?
                            (
                              <div className="col-md-12 text-center text-danger">
                                <label><strong>No Service Logs on Record</strong></label>
                              </div>
                            ) : (
                              <ServiceLogDisplay
                                sortVehicleServiceLogsMostRecent={this.state.sortVehicleServiceLogsMostRecent}
                                currentTheme={this.state.currentTheme}
                                sortServiceLogs={this.sortServiceLogs}
                                getServiceLogActionValue={this.getServiceLogActionValue}
                              />
                            )
                        }
                      </div>
                      <ServiceLogBottomButtons
                        vehicleServiceLogs={this.state.vehicleServiceLogs}
                        backToTopOfPage={this.backToTopOfPage}
                        currentTheme={this.state.currentTheme}
                      />
                    </div>
                    <EditOneVehicleNameModal
                      disableConfirmSaveEditVehicleNameButton={this.state.disableConfirmSaveEditVehicleNameButton}
                      showEditOneVehicleNameModal={this.state.showEditOneVehicleNameModal}
                      hideEditOneVehicleNameModal={this.hideEditOneVehicleNameModal}
                      checkUserEnteredUpdatedVehicleNameInput={this.checkUserEnteredUpdatedVehicleNameInput}
                      showDeleteOneVehicleModal={this.showDeleteOneVehicleModal}
                      handleChange={this.handleChange}
                      deleteVehicleName={this.deleteVehicleName}
                      currentTheme={this.state.currentTheme}
                      vehicleName={this.state.vehicleName}
                      year={this.state.year}
                      make={this.state.make}
                      model={this.state.model}
                    />
                    <EditOneServiceLogModal
                      disableConfirmSaveEditServiceLogButton={this.state.disableConfirmSaveEditServiceLogButton}
                      checkUserEnteredUpdatedServiceLogInput={this.checkUserEnteredUpdatedServiceLogInput}
                      showEditOneLogModal={this.state.showEditOneLogModal}
                      hideEditOneServiceLogModal={this.hideEditOneServiceLogModal}
                      handleChange={this.handleChange}
                      currentTheme={this.state.currentTheme}
                      serviceLogDate={this.state.serviceLogDate}
                      serviceLogMileage={this.state.serviceLogMileage}
                      serviceLogService={this.state.serviceLogService}
                      serviceLogComment={this.state.serviceLogComment}
                    />
                    <UpdatedVehicleYearNanErrorModal
                      showUpdatedVehicleYearNanErrorModal={this.state.showUpdatedVehicleYearNanErrorModal}
                      hideUpdatedVehicleYearNanErrorModal={this.hideUpdatedVehicleYearNanErrorModal}
                      currentTheme={this.state.currentTheme}
                    />
                    <FutureDateConfirmationModal
                      handleSubmitOneServiceLog={this.handleSubmitOneServiceLog}
                      showFutureDateConfirmationModal={this.state.showFutureDateConfirmationModal}
                      hideFutureDateConfirmationModal={this.hideFutureDateConfirmationModal}
                      date={this.state.date}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdatedFutureDateConfirmationModal
                      handleUpdateOneServiceLog={this.handleUpdateOneServiceLog}
                      showUpdatedFutureDateConfirmationModal={this.state.showUpdatedFutureDateConfirmationModal}
                      hideUpdatedFutureDateConfirmationModal={this.hideUpdatedFutureDateConfirmationModal}
                      updatedServiceLogDateToConfirm={this.state.updatedServiceLogDateToConfirm}
                      currentTheme={this.state.currentTheme}
                    />
                    <DeleteOneVehicleModal
                      handleDeleteOneVehicle={this.handleDeleteOneVehicle}
                      showDeleteOneVehicleModal={this.state.showDeleteOneVehicleModal}
                      hideDeleteOneVehicleModal={this.hideDeleteOneVehicleModal}
                      handlePrintPage={this.handlePrintPage}
                      currentTheme={this.state.currentTheme}
                      year={this.state.year}
                      make={this.state.make}
                      model={this.state.model}
                      vehicleServiceLogs={this.state.vehicleServiceLogs}
                      disableDeleteOneVehicleButton={this.state.disableDeleteOneVehicleButton}
                      confirmDeleteVehicleButtonText={this.state.confirmDeleteVehicleButtonText}
                    />
                    <DeleteOneServiceLogModal
                      handleDeleteOneServiceLog={this.handleDeleteOneServiceLog}
                      showDeleteOneLogModal={this.state.showDeleteOneLogModal}
                      hideDeleteOneServiceLogModal={this.hideDeleteOneServiceLogModal}
                      currentTheme={this.state.currentTheme}
                      serviceLogDate={this.state.serviceLogDate}
                      serviceLogMileage={this.state.serviceLogMileage}
                      serviceLogService={this.state.serviceLogService}
                      serviceLogComment={this.state.serviceLogComment}
                    />
                    <AddLogErrorModal
                      showAddLogErrorModal={this.state.showAddLogErrorModal}
                      hideAddLogErrorModal={this.hideAddLogErrorModal}
                      date={this.state.date}
                      currentTheme={this.state.currentTheme}
                      mileage={this.state.mileage}
                      service={this.state.service}
                      comment={this.state.comment}
                    />
                    <UpdateLogErrorModal
                      showUpdatedLogErrorModal={this.state.showUpdatedLogErrorModal}
                      hideUpdateLogErrorModal={this.hideUpdateLogErrorModal}
                      currentTheme={this.state.currentTheme}
                      serviceLogDate={this.state.serviceLogDate}
                      serviceLogMileage={this.state.serviceLogMileage}
                      serviceLogService={this.state.serviceLogService}
                      serviceLogComment={this.state.serviceLogComment}
                    />
                    <MileageInputErrorModal
                      showMileageInputErrorModal={this.state.showMileageInputErrorModal}
                      hideMileageInputErrorModal={this.hideMileageInputErrorModal}
                      currentTheme={this.state.currentTheme}
                      mileage={this.state.mileage}
                    />
                    <UpdatedMileageInputErrorModal
                      showUpdatedMileageInputErrorModal={this.state.showUpdatedMileageInputErrorModal}
                      hideUpdatedMileageInputErrorModal={this.hideUpdatedMileageInputErrorModal}
                      currentTheme={this.state.currentTheme}
                      serviceLogMileage={this.state.serviceLogMileage}
                    />
                  </Container>
                ) : (
                  <Loading />
                )
            ) : (
              <NoAuthorization />
            )
        }
      </React.Fragment>
    );
  };
};
