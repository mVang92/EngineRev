const router = require("express").Router();
const controller = require("../../controllers/userController");

// Matches with "/api/users"
router
  .route("/")
  .post(controller.createUserSchema)

// Matches with "/api/users/findOneVehicleForUser/:creatorId/:vehicleId"
router
  .route("/findOneVehicleForUser/:creatorId/:vehicleId")
  .get(controller.findOneVehicleForUser)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(controller.findUserInformationForOneUser)
  .put(controller.addOneVehicle)

// Matches with "/api/users/addOneServiceLog/:creatorId/:vehicleId"
router
  .route("/addOneServiceLog/:creatorId/:vehicleId")
  .put(controller.addOneLogForOneVehicle)

// Matches with "/api/users/updateOneVehicleInformation/:vehicleId"
router
  .route("/updateOneVehicleInformation/:vehicleId")
  .put(controller.updateOneVehicleInformation)

// Matches with "/api/users/updateOneServiceLog/:vehicleId/:serviceLogId"
router
  .route("/updateOneServiceLog/:vehicleId/:serviceLogId")
  .put(controller.updateOneLogForOneVehicle)

// Matches with "/api/users/updateUserBackgroundPicture/:creatorId/:backgroundPicture"
router
  .route("/updateUserBackgroundPicture/:creatorId")
  .put(controller.updateUserBackgroundPicture)

// Matches with "/api/users/deleteServiceLog/:vehicleId/:serviceLogId"
router
  .route("/deleteServiceLog/:vehicleId/:serviceLogId")
  .delete(controller.removeOneServiceLog)

// Matches with "/api/deleteVehicle/:vehicleId"
router
  .route("/deleteVehicle/:vehicleId")
  .delete(controller.removeOneVehicle)

// Matches with "/api/deleteVehicle/:vehicleId"
router
  .route("/deleteVehicleName/:vehicleId")
  .delete(controller.removeOneVehicleName)

// Matches with "/api/users/themes/:creatorId/:themeType"
router
  .route("/themes/:creatorId/:themeType")
  .put(controller.saveThemeForUser)

// Matches with "/api/users/recordVotedThreadComment/:creatorId/:commentId"
router
  .route("/recordVotedThreadComment/:creatorId/:commentId")
  .put(controller.recordVotedThreadComment)

// Matches with "/api/users/updateEmail/:creatorId/:newEmail"
router
  .route("/updateEmail/:creatorId/:newEmail")
  .put(controller.updateEmail)

module.exports = router;
