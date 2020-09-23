import axios from "axios";

export default {
  // Upon signing up for new account, create this data for the new user
  createUserSchema: (creatorId, userEmail) => {
    return (
      axios.post("/api/users", {
        creator: creatorId,
        email: userEmail,
        roles: ["User"],
        theme: "carSpace",
        backgroundPicture: ""
      })
    );
  },
  // Get one vehicle for the signed in user
  getOneVehicleForUser: (creatorId, vehicleId) => {
    return axios.get(`/api/users/findOneVehicleForUser/${creatorId}/${vehicleId}`);
  },
  // Retrieve all information for the targeted user
  findUserInformationForOneUser: id => {
    return axios.get(`/api/users/${id}`);
  },
  // Add a new vehicle
  addOneVehicle: (id, data) => {
    return axios.put(`/api/users/${id}`, data);
  },
  // Add a service log for one vehicle
  addOneLogForOneVehicle: (creatorId, vehicleId, log) => {
    return axios.put(`/api/users/addOneServiceLog/${creatorId}/${vehicleId}`, log);
  },
  // Update the vehicle information for one vehicle
  updateVehicleInformationForOneVehicle: (vehicleId, updatedVehicleInformation) => {
    return axios.put(`/api/users/updateOneVehicleInformation/${vehicleId}`, updatedVehicleInformation);
  },
  // Update a service log for one vehicle
  updateOneLogForOneVehicle: (vehicleId, serviceLogId, updatedServiceLog) => {
    return axios.put(`/api/users/updateOneServiceLog/${vehicleId}/${serviceLogId}`, updatedServiceLog);
  },
  // Update the background picture for the user
  updateUserBackgroundPicture: (creatorId, backgroundPicture) => {
    return axios.put(`/api/users/updateUserBackgroundPicture/${creatorId}`, backgroundPicture)
  },
  //Update the user email address
  updateEmail: (creatorId, newEmail) => {
    return axios.put(`/api/users/updateEmail/${creatorId}/${newEmail}`)
  },
  // Delete one vehicle
  deleteOneVehicle: vehicleId => {
    return axios.delete(`/api/users/deleteVehicle/${vehicleId}`);
  },
  // Delete one service log
  deleteOneServiceLog: (vehicleId, serviceLogId) => {
    return axios.delete(`/api/users/deleteServiceLog/${vehicleId}/${serviceLogId}`);
  },
  // Delete the vehicle name for one vehicle
  deleteVehicleName: (vehicleId, nullVehicleName) => {
    return axios.delete(`/api/users/deleteVehicleName/${vehicleId}`, nullVehicleName);
  },
  // Delete one user account
  // Will have to decide where to put this function in the app
  deleteOneUserAccount: id => {
    return axios.delete(`/api/users/${id}`);
  },
  // Save the theme for the user
  saveThemeForUser: (creatorId, themeType) => {
    return axios.put(`/api/users/themes/${creatorId}/${themeType}`);
  },
  // Record the comment id in the user database
  recordVotedThreadComment: (creatorId, commentId) => {
    return axios.put(`/api/users/recordVotedThreadComment/${creatorId}/${commentId}`);
  }
};
