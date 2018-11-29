import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: function() {
    return axios.get("/api/vehicles");
  },
  // Add a new vehicle
  addVehicle: function(data) {
    console.log(data)
    return axios.post("/api/vehicles", data);
  }
};
