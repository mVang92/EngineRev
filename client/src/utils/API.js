import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: function () {
    return axios.get("/api/vehicles")
  },
  getVehicle: function (id) {
    return axios.get("/api/vehicles/" + id);
  },
  createUserData: function (id) {
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
  addVehicle: function (id, data) {
    console.log(id, data);
    return (
      axios.put("/api/vehicles/" + id, data )
    )
  },
  addLog: function (id, logs) {
    return (
      axios.put("/api/vehicles/" + id, logs)
    )
  },
  deleteVehicle: function (id) {
    return axios.delete("api/vehicles/" + id)
  }
};
