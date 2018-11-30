import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: function () {
    return axios.get("/api/vehicles");
  },
  // Add a new vehicle
  addVehicle: function (id) {
    console.log(id)
    return axios.post("/api/vehicles", id);
  },
  deleteVehicle: function (id) {
    console.log(id)
    return axios.delete("api/vehicles/" + id)
  }
};
