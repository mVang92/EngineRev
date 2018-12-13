import axios from "axios";

export default {
  // Get all vehicles
  getVehicles: function () {
    return axios.get("/api/vehicles")
  },
  // Add a new vehicle
  addVehicle: function (id, data) {
    console.log("id: " + id)
    console.log("data: " + data)
    return axios.post("/api/vehicles", data);
  },
  deleteVehicle: function (id) {
    console.log(id)
    return axios.delete("api/vehicles/" + id)
  }
};
