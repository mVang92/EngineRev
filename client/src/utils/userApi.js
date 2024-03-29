import axios from "axios";
import { defaults } from "../assets/Defaults";

export default {
  // Upon signing up for new account, create this data for the new user
  createUserSchema: (creatorId, userEmail, userDisplayName) => {
    return (
      axios.post("/api/users/newUser", {
        creator: creatorId,
        email: userEmail,
        displayName: userDisplayName,
        roles: ["User"],
        theme: defaults.engineRevTheme,
        backgroundPicture: ""
      })
    );
  },
  // Get one vehicle for the signed in user
  getOneVehicleForUser: (creatorId, vehicleId) => {
    return axios.get(`/api/users/${creatorId}/${vehicleId}/vehicle`);
  },
  // Retrieve all information for the targeted user
  getUserInfoPartial: creatorId => {
    return axios.get(`/api/users/${creatorId}/user`);
  },
  // Add a new vehicle
  addOneVehicle: (creatorId, data) => {
    return axios.put(`/api/users/${creatorId}/addVehicle`, data);
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
   //Update the user display name
   updateDisplayName: (creatorId, newDisplayName) => {
    return axios.put(`/api/users/${creatorId}/${newDisplayName}/updateDisplayName`)
  },
  // Delete one vehicle
  deleteOneVehicle: vehicleId => {
    return axios.delete(`/api/users/${vehicleId}/deleteVehicle`);
  },
  // Delete one service log
  deleteOneServiceLog: (vehicleId, serviceLogId) => {
    return axios.delete(`/api/users/${vehicleId}/${serviceLogId}/deleteServiceLog`);
  },
  // Delete one user account
  // Will have to decide where to put this function in the app
  deleteOneUserAccount: creatorId => {
    return axios.delete(`/api/users/${creatorId}`);
  },
  // Save the theme for the user
  saveThemeForUser: (creatorId, themeType) => {
    return axios.put(`/api/users/${creatorId}/${themeType}`);
  },
  // Get the vehicle count from the user
  getVehicleCount: creatorId => {
    return axios.get(`/api/users/${creatorId}/count`);
  },
  // Get the email from the user
  getEmail: creatorId => {
    return axios.get(`/api/users/${creatorId}/email`);
  },
  // Get the roles from the user
  getRoles: creatorId => {
    return axios.get(`/api/users/${creatorId}/roles`);
  },
  // Get the theme from the user
  getTheme: creatorId => {
    return axios.get(`/api/users/${creatorId}/theme`);
  },
  // Get the background picture from the user
  getBackgroundPicture: creatorId => {
    return axios.get(`/api/users/${creatorId}/background`);
  },
  // Get the voted comments from the user
  getVotedComments: creatorId => {
    return axios.get(`/api/users/${creatorId}/votes`);
  },
  // Get the vehicles from the user
  getUserVehicles: creatorId => {
    return axios.get(`/api/users/${creatorId}/vehicles`);
  }
};
