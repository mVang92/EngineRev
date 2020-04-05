import axios from "axios";

export default {
  // Upon signing up for new account, create this data for the new user
  createUserSchema: (creatorId, userEmail) => {
    return (
      axios.post("/api/vehicles", {
        creator: creatorId,
        email: userEmail,
        admin: false,
        theme: "carSpace",
        backgroundPicture: "",
        vehicleName: [{}]
      })
    );
  },
  // Get one vehicle for the signed in user
  getOneVehicleForUser: (creatorId, vehicleId) => {
    return axios.get(`/api/vehicles/findOneVehicleForUser/${creatorId}/${vehicleId}`);
  },
  // Retrieve all information for the targeted user
  findUserInformationForOneUser: id => {
    return axios.get(`/api/vehicles/${id}`);
  },
  // Add a new vehicle
  addOneVehicle: (id, data) => {
    return axios.put(`/api/vehicles/${id}`, data);
  },
  // Add a service log for one vehicle
  addOneLogForOneVehicle: (creatorId, vehicleId, log) => {
    return axios.put(`/api/vehicles/addOneServiceLog/${creatorId}/${vehicleId}`, log);
  },
  // Update the vehicle information for one vehicle
  updateVehicleInformationForOneVehicle: (vehicleId, updatedVehicleInformation) => {
    return axios.put(`/api/vehicles/updateOneVehicleInformation/${vehicleId}`, updatedVehicleInformation);
  },
  // Update a service log for one vehicle
  updateOneLogForOneVehicle: (vehicleId, serviceLogId, updatedServiceLog) => {
    return axios.put(`/api/vehicles/updateOneServiceLog/${vehicleId}/${serviceLogId}`, updatedServiceLog);
  },
  // Update the background picture for the user
  updateUserBackgroundPicture: (creatorId, backgroundPicture) => {
    return axios.put(`/api/vehicles/updateUserBackgroundPicture/${creatorId}`, backgroundPicture)
  },
  // Delete one vehicle
  deleteOneVehicle: vehicleId => {
    return axios.delete(`/api/vehicles/deleteVehicle/${vehicleId}`);
  },
  // Delete one service log
  deleteOneServiceLog: (vehicleId, serviceLogId) => {
    return axios.delete(`/api/vehicles/deleteServiceLog/${vehicleId}/${serviceLogId}`);
  },
  // Delete the vehicle name for one vehicle
  deleteVehicleName: (vehicleId, nullVehicleName) => {
    return axios.delete(`/api/vehicles/deleteVehicleName/${vehicleId}`, nullVehicleName);
  },
  // Delete one user account
  // Will have to decide where to put this function in the app
  deleteOneUserAccount: id => {
    return axios.delete(`/api/vehicles/${id}`);
  },
  // Save the theme for the user
  saveThemeForUser: (creatorId, themeType) => {
    return axios.put(`/api/vehicles/themes/${creatorId}/${themeType}`);
  },
  // Record the comment id in the user database
  recordVotedThreadComment: (creatorId, commentId) => {
    return axios.put(`/api/vehicles/recordVotedThreadComment/${creatorId}/${commentId}`);
  }
};
