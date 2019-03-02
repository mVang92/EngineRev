import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: () => {
    return axios.get(`/api/vehicles`)
  },
  getVehicle: (id) => {
    return axios.get(`/api/vehicles/${id}`);
  },
  createUserData: (id) => {
    console.log(id);
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
  deleteVehicle: (id) => {
    return axios.delete(`api/vehicles/${id}`)
  }
};
