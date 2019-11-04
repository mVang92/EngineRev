import axios from "axios";

export default {
  // Get all vehicles for the signed in user
  getAllVehiclesForUser: id => {
    return axios.get(`/api/vehicles/${id}`)
  },
  // Get the vehicle the user wants to view logs for
  getOneVehicleForUser: id => {
    return axios.get(`/api/vehicles/user/${id}`);
  },
  // Get the service logs for the selected vehicle
  getAllServiceLogsForOneVehicle: id => {
    return axios.get(`/api/vehicles/getAllServiceLogs/${id}`);
  },
  // Upon signing up for new account, create this data for the new user
  createUserSchema: id => {
    return (
      axios.post("/api/vehicles", {
        creator: id,
        vehicleName: [{}]
      })
    );
  },
  // Add a new vehicle
  addOneVehicle: (id, data) => {
    // console.log(id, data);
    return axios.put(`/api/vehicles/${id}`, data);
  },
  // Add a service log for one vehicle
  addOneLogForOneVehicle: (id, log) => {
    return axios.put(`/api/vehicles/addOneServiceLog/${id}`, log);
  },
  // Delete one vehicle
  deleteOneVehicle: id => {
    console.log("deleteOneVehicle: " + id)
    return axios.delete(`/api/vehicles/deleteVehicle/${id}`);
  },
  // Delete one user account
  // Will have to decide where to put this function in the app
  deleteOneUserAccount: id => {
    console.log("deleteOneUserAccount: " + id)
    return axios.delete(`/api/vehicles/${id}`);
  }
};
