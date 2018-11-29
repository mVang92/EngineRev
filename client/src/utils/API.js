import axios from "axios";

export default {
  // Add a new vehicle
  addVehicle: function(data) {
    console.log(data)
    return axios.post("/api/vehicles", data);
  }
};
