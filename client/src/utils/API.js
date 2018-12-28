import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: function () {
    return axios.get("/api/vehicles")
  },
  getVehicle: function(id) {
    return axios.get("/api/vehicles/" + id);
  },
  // Add a new vehicle
  addVehicle: function (id, data) {
    return axios.post("/api/vehicles", data);
  },
  deleteVehicle: function (id) {
    return axios.delete("api/vehicles/" + id)
  }
};
