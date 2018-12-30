import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: function () {
    return axios.get("/api/vehicles")
  },
  getVehicle: function (id) {
    return axios.get("/api/vehicles/" + id);
  },
  // Add a new vehicle
  addVehicle: function (id, data) {
    return axios.post("/api/vehicles", {
      creator: id,
      year: data.year,
      make: data.make,
      model: data.model
    });
  },
  addLog: function (id, logs) {
    console.log(logs.mileage)
    return axios.post("/api/vehicles", {
      creator: id,
      logs: [{
        date: logs.date,
        mileage: logs.mileage,
        service: logs.service,
        comment: logs.comment
      }]

    });
  },
  deleteVehicle: function (id) {
    return axios.delete("api/vehicles/" + id)
  }
};
