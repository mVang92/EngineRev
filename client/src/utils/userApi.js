import axios from "axios";

export default {
  // Upon signing up for new account, create this data for the new user
  createUserSchema: (creatorId, userEmail) => {
    return (
      axios.post("/api/users/newUser", {
        creator: creatorId,
        email: userEmail,
        roles: ["User"],
        theme: "engineRev",
        backgroundPicture: ""
      })
    );
  },
  // Get one vehicle for the signed in user
  getOneVehicleForUser: (creatorId, vehicleId) => {
    return axios.get(`/api/users/${creatorId}/${vehicleId}/vehicle`);
  },
  // Retrieve all information for the targeted user
  getUserPartialInfo: id => {
    return axios.get(`/api/users/${id}/user`);
  },
  // Add a new vehicle
  addOneVehicle: (id, data) => {
    return axios.put(`/api/users/${id}/addVehicle`, data);
  },
  // Add a service log for one vehicle
  addOneLogForOneVehicle: (creatorId, vehicleId, log) => {
    return axios.put(`/api/users/${creatorId}/${vehicleId}/addServiceLog`, log);
  },
  // Update the vehicle information for one vehicle
  updateVehicleInformationForOneVehicle: (vehicleId, updatedVehicleInformation) => {
    return axios.put(`/api/users/${vehicleId}/updateVehicleInfo`, updatedVehicleInformation);
  },
  // Update a service log for one vehicle
  updateOneLogForOneVehicle: (vehicleId, serviceLogId, updatedServiceLog) => {
    return axios.put(`/api/users/${vehicleId}/${serviceLogId}/updateServiceLog`, updatedServiceLog);
  },
  // Update the background picture for the user
  updateUserBackgroundPicture: (creatorId, backgroundPicture) => {
    return axios.put(`/api/users/${creatorId}/backgroundPicture`, backgroundPicture)
  },
  //Update the user email address
  updateEmail: (creatorId, newEmail) => {
    return axios.put(`/api/users/${creatorId}/${newEmail}/updateEmail`)
  },
  // Delete one vehicle
  deleteOneVehicle: vehicleId => {
    return axios.delete(`/api/users/${vehicleId}/deleteVehicle`);
  },
  // Delete one service log
  deleteOneServiceLog: (vehicleId, serviceLogId) => {
    return axios.delete(`/api/users/${vehicleId}/${serviceLogId}/deleteServiceLog`);
  },
  // Delete the vehicle name for one vehicle
  deleteVehicleName: (vehicleId, nullVehicleName) => {
    return axios.delete(`/api/users/${vehicleId}/deleteVehicleName`, nullVehicleName);
  },
  // Delete one user account
  // Will have to decide where to put this function in the app
  deleteOneUserAccount: id => {
    return axios.delete(`/api/users/${id}`);
  },
  // Save the theme for the user
  saveThemeForUser: (creatorId, themeType) => {
    return axios.put(`/api/users/${creatorId}/${themeType}`);
  },
  // Record the comment id in the user database
  recordVotedThreadComment: (creatorId, commentId) => {
    return axios.put(`/api/users/${creatorId}/${commentId}/vote`);
  },
  // Get the vehicle count for the user
  getVehicleCount: creatorId => {
    return axios.get(`/api/users/${creatorId}/count`);
  },
  // Get the vehicle count for the user
  getEmail: creatorId => {
    return axios.get(`/api/users/${creatorId}/email`);
  },
  // Get the roles for the user
  getRoles: creatorId => {
    return axios.get(`/api/users/${creatorId}/roles`);
  },
  // Get the theme for the user
  getTheme: creatorId => {
    return axios.get(`/api/users/${creatorId}/theme`);
  },
  // Get the background picture for the user
  getBackgroundPicture: creatorId => {
    return axios.get(`/api/users/${creatorId}/background`);
  }
};
