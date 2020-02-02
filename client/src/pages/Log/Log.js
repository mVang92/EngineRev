import React, { Component } from "react";
import API from "../../utils/API";
import { firebase } from "../../firebase"
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import AddLog from "../../components/AddLog";
import TopActionButtons from "../../components/TopActionButtons";
import ServiceLog from "../../components/ServiceLog";
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
import { ToastContainer, toast } from "react-toastify";

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
      vehicleServiceLogs: [],
      updatedServiceLogDateToConfirm: "",
      confirmDeleteVehicleButtonText: "",
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

  /**
   * Display the service log information for the selected vehicle
   */
  componentDidMount = () => {
    Modal.setAppElement("body");
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          vehicleId: this.props.match.params.id,
          uid: user.uid,
          loggedin: true,
          currentTheme: this.props.location.state[0],
          backgroundColor: this.props.location.state[1]
        }, () => {
          document.body.style.backgroundColor = this.state.backgroundColor;
        });
        this.getOneVehicle();
      };
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
   * Get the vehicle information for the selected vehicle
   * then show the page after loading
   */
  getOneVehicle = () => {
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
          });
        } catch (e) {
          this.setState({ pageLoaded: true });
        };
      })
      .catch(err => this.loadServiceLogsFailNotification(err));
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
        };
      };
    };
  };

  /**
   * Go through a series of conditions to validate the updated vehicle name being entered
   */
  checkUserEnteredUpdatedVehicleNameInput = e => {
    e.preventDefault();
    let updatedVehicleName = this.state.updateVehicleName;
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

      let updatedVehicleInformation = {
        vehicleName: updatedVehicleName,
        year: updatedYear,
        make: updatedMake,
        model: updatedModel
      };
      this.handleUpdateOneVehicleName(updatedVehicleInformation);
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
        };
      };
    };
  };

  /**
   * Update one vehicle name from record
   * 
   * @param updatedVehicleName the updated name for the vehicle
   */
  handleUpdateOneVehicleName = updatedVehicleName => {
    this.setState({ disableConfirmSaveEditVehicleNameButton: true });
    API.updateVehicleNameForOneVehicle(this.state.vehicleId, updatedVehicleName)
      .then(() => {
        this.updateOneVehicleNameSuccessNotification();
        this.hideEditOneVehicleNameModal();
        this.componentDidMount();
        this.setState({
          vehicleName: "",
          updatedYear: "",
          updatedMake: "",
          updatedModel: "",
          disableConfirmSaveEditVehicleNameButton: false
        });
      })
      .catch(err => {
        this.updateOneVehicleNameFailNotification(err);
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
        this.addOneServiceLogSuccessNotification(serviceLogDateMemory, serviceLogMileageMemory, serviceLogServiceMemory);
        this.setState({
          date: "",
          mileage: "",
          service: "",
          comment: "",
          disableAddServiceLogButton: false
        });
        this.componentDidMount();
      })
      .catch(err => {
        this.addOneServiceLogFailNotification(err);
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
    });
    this.resetFieldsNotification();
  };

  /**
   * Deletes one vehicle from record
   */
  handleDeleteOneVehicle = () => {
    API.deleteOneVehicle(this.state.vehicleId)
      .then(() => this.deleteOneVehicleSuccessNotification())
      .catch(err => this.deleteOneVehicleFailNotification(err));
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
        this.hideEditOneServiceLogModal();
        this.hideUpdatedFutureDateConfirmationModal();
        this.updateOneServiceLogSuccessNotification(serviceLogDateMemory, serviceLogMileageMemory, serviceLogServiceMemory);
        this.componentDidMount();
        this.setState({
          serviceLogDate: "",
          serviceLogMileage: "",
          serviceLogService: "",
          serviceLogComment: "",
          disableConfirmSaveEditServiceLogButton: false
        });
      })
      .catch(err => {
        this.updateOneServiceLogFailNotification(err);
        this.setState({ disableConfirmSaveEditServiceLogButton: false });
      });
  };

  /**
   * Deletes one service log from record
   */
  handleDeleteOneServiceLog = () => {
    API.deleteOneServiceLog(this.state.vehicleId, this.state.serviceLogId)
      .then(() => {
        this.setState({ showDeleteOneLogModal: false });
        this.componentDidMount();
        this.deleteOneServiceLogSuccessNotification();
      })
      .catch(err => this.deleteOneServiceLogFailNotification(err));
  };

  /**
   * Show the print screen for the user to print all service logs
   */
  handlePrintPage = () => {
    if (this.state.showDeleteOneVehicleModal) {
      this.setState({ showDeleteOneVehicleModal: false });
      clearInterval(this.state.disableDeleteVehicleButtonTimer);
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
        alert("Error Processing Request");
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
   * Display the error notification when an error occurs while adding a service log
   * 
   * @param err the error message to display to the user
   */
  addOneServiceLogFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when an error occurs while updating a service log
   * 
   * @param err the error message to display to the user
   */
  updateOneServiceLogFailNotification = err => {
    toast.error(err.toString());
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
   * Display the error notification when an error occurs while updating a vehicle name
   * 
   * @param err the error message to display to the user
   */
  updateOneVehicleNameFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when an error occurs while deleting a vehicle
   * 
   * @param err the error message to display to the user
   */
  deleteOneVehicleFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the error notification when an error occurs while deleting a service log
   * 
   * @param err the error message to display to the user
   */
  deleteOneServiceLogFailNotification = err => {
    toast.error(err.toString());
  };

  /**
   * Display the info notification when the user resets the fields to add a service log
   */
  resetFieldsNotification = () => {
    toast.info(`Input Fields Reset.`);
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
    this.setState({ showEditOneVehicleNameModal: true });
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
    clearInterval(this.state.disableDeleteVehicleButtonTimer);
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
                            <React.Fragment>
                              {
                                this.state.vehicleName ?
                                  (
                                    <div id="vehicleLogInformation">
                                      <div className="row">
                                        <div className="col-md-12 text-center wrapword">
                                          <label><h4>{this.state.vehicleName}</h4></label>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12 text-center wrapword">
                                          <label><h5>{this.state.year} {this.state.make} {this.state.model}</h5></label>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div id="vehicleLogInformation">
                                      <div className="row">
                                        <div className="col-md-12 text-center wrapword">
                                          <label><h4>{this.state.year} {this.state.make} {this.state.model}</h4></label>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              }
                            </React.Fragment>
                          ) : (
                            <div className="col-md-12 text-center text-danger">
                              <label><h3>You do not have permission to view this content</h3></label>
                            </div>
                          )
                      }
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
                              <div className="col-md-12">
                                <div className="row removeMobileDisplay">
                                  <div className="col-md-2 logDetailsMobileDisplay">
                                    <label><strong>Date</strong></label>
                                  </div>
                                  <div className="col-md-2 logDetailsMobileDisplay">
                                    <label><strong>Mileage</strong></label>
                                  </div>
                                  <div className="col-md-3 logDetailsMobileDisplay">
                                    <label><strong>Service</strong></label>
                                  </div>
                                  <div className="col-md-3 logDetailsMobileDisplay">
                                    <label><strong>Comments</strong></label>
                                  </div>
                                  <div className="col-md-2 logDetailsMobileDisplay hideWhilePrinting">
                                    <label><strong>Actions</strong></label>
                                  </div>
                                </div>
                                {
                                  this.state.sortVehicleServiceLogsMostRecent ?
                                    (
                                      this.sortServiceLogs().map(serviceLog => {
                                        return (
                                          <ServiceLog
                                            key={serviceLog._id}
                                            _id={serviceLog._id}
                                            date={serviceLog.date}
                                            mileage={serviceLog.mileage}
                                            service={serviceLog.service}
                                            comment={serviceLog.comment}
                                            getServiceLogActionValue={this.getServiceLogActionValue}
                                            currentTheme={this.state.currentTheme}
                                          />
                                        )
                                      })
                                    ) : (
                                      this.sortServiceLogs().map(serviceLog => {
                                        return (
                                          <ServiceLog
                                            key={serviceLog._id}
                                            _id={serviceLog._id}
                                            date={serviceLog.date}
                                            mileage={serviceLog.mileage}
                                            service={serviceLog.service}
                                            comment={serviceLog.comment}
                                            getServiceLogActionValue={this.getServiceLogActionValue}
                                            currentTheme={this.state.currentTheme}
                                          />
                                        )
                                      })
                                    )
                                }
                              </div>
                            )
                        }
                      </div>
                    </div>
                    <EditOneVehicleNameModal
                      showEditOneVehicleNameModal={this.state.showEditOneVehicleNameModal}
                      hideEditOneVehicleNameModal={this.hideEditOneVehicleNameModal}
                      checkUserEnteredUpdatedVehicleNameInput={this.checkUserEnteredUpdatedVehicleNameInput}
                      showDeleteOneVehicleModal={this.showDeleteOneVehicleModal}
                      handleChange={this.handleChange}
                      state={this.state}
                    />
                    <EditOneServiceLogModal
                      checkUserEnteredUpdatedServiceLogInput={this.checkUserEnteredUpdatedServiceLogInput}
                      showEditOneLogModal={this.state.showEditOneLogModal}
                      hideEditOneServiceLogModal={this.hideEditOneServiceLogModal}
                      handleChange={this.handleChange}
                      state={this.state}
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
                      state={this.state.date}
                      currentTheme={this.state.currentTheme}
                    />
                    <UpdatedFutureDateConfirmationModal
                      handleUpdateOneServiceLog={this.handleUpdateOneServiceLog}
                      showUpdatedFutureDateConfirmationModal={this.state.showUpdatedFutureDateConfirmationModal}
                      hideUpdatedFutureDateConfirmationModal={this.hideUpdatedFutureDateConfirmationModal}
                      state={this.state}
                    />
                    <DeleteOneVehicleModal
                      handleDeleteOneVehicle={this.handleDeleteOneVehicle}
                      showDeleteOneVehicleModal={this.state.showDeleteOneVehicleModal}
                      hideDeleteOneVehicleModal={this.hideDeleteOneVehicleModal}
                      handlePrintPage={this.handlePrintPage}
                      state={this.state}
                    />
                    <DeleteOneServiceLogModal
                      handleDeleteOneServiceLog={this.handleDeleteOneServiceLog}
                      showDeleteOneLogModal={this.state.showDeleteOneLogModal}
                      hideDeleteOneServiceLogModal={this.hideDeleteOneServiceLogModal}
                      state={this.state}
                    />
                    <AddLogErrorModal
                      showAddLogErrorModal={this.state.showAddLogErrorModal}
                      hideAddLogErrorModal={this.hideAddLogErrorModal}
                      state={this.state}
                    />
                    <UpdateLogErrorModal
                      showUpdatedLogErrorModal={this.state.showUpdatedLogErrorModal}
                      hideUpdateLogErrorModal={this.hideUpdateLogErrorModal}
                      state={this.state}
                    />
                    <MileageInputErrorModal
                      showMileageInputErrorModal={this.state.showMileageInputErrorModal}
                      hideMileageInputErrorModal={this.hideMileageInputErrorModal}
                      state={this.state}
                    />
                    <UpdatedMileageInputErrorModal
                      showUpdatedMileageInputErrorModal={this.state.showUpdatedMileageInputErrorModal}
                      hideUpdatedMileageInputErrorModal={this.hideUpdatedMileageInputErrorModal}
                      state={this.state}
                    />
                    <ToastContainer />
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
