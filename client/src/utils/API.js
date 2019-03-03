import axios from "axios";

export default {
  // Get all vehicles for the signed in user
  getVehicles: id => {
    console.log(id);
    return axios.get(`/api/vehicles/${id}`)
  },
  // Get the vehicle the user wants to view logs for
  getVehicle: id => {
    return axios.get(`/api/vehicles/${id}`);
  },
  // Upon signing up for new account, create this data for the new user
  createUserData: id => {
    return (
      axios.post("/api/vehicles", {
        creator: id,
        vehicleName: [{}]
      })
    );
  },
  // Add a new vehicle
  addVehicle: (id, data) => {
    console.log(id, data);
    return (
      axios.put(`/api/vehicles/${id}`, data)
    )
  },
  // Add a service log for one vehicle
  addLog: (id, logs) => {
    return (
      axios.put(`/api/vehicles/logs/${id}`, logs)
    )
  },
  // Delete a vehicle
  deleteVehicle: id => {
    return axios.delete(`api/vehicles/${id}`)
  }
};
