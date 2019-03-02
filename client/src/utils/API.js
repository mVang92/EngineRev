import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: () => {
    return axios.get(`/api/vehicles`)
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
  // addVehicle: function (id, data) {
  //   // console.log(id, data);
  //   return axios.post("/api/vehicles", {
  //     creator: id,
  //     vehicles: [{
  //       year: data.year,
  //       make: data.make,
  //       model: data.model
  //     }]
  //   });
  // },
  addVehicle: (id, data) => {
    console.log(id, data);
    return (
      axios.put(`/api/vehicles/${id}`, data)
    )
  },
  addLog: (id, logs) => {
    return (
      axios.put(`/api/vehicles/logs/${id}`, logs)
    )
  },
  deleteVehicle: id => {
    return axios.delete(`api/vehicles/${id}`)
  }
};
