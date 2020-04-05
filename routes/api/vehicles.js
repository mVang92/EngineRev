const router = require("express").Router();
const controller = require("../../controllers/controller");
console.log("route api loaded")

// Matches with "/api/vehicles"
router
  .route("/")
  .post(controller.createUserSchema)

// Matches with "/api/vehicles/findOneVehicleForUser/:creatorId/:vehicleId"
router
  .route("/findOneVehicleForUser/:creatorId/:vehicleId")
  .get(controller.findOneVehicleForUser)

// Matches with "/api/vehicles/:id"
router
  .route("/:id")
  .get(controller.findUserInformationForOneUser)
  .put(controller.addOneVehicle)

// Matches with "/api/vehicles/addOneServiceLog/:creatorId/:vehicleId"
router
  .route("/addOneServiceLog/:creatorId/:vehicleId")
  .put(controller.addOneLogForOneVehicle)

// Matches with "/api/vehicles/updateOneVehicleInformation/:vehicleId"
router
  .route("/updateOneVehicleInformation/:vehicleId")
  .put(controller.updateOneVehicleInformation)

// Matches with "/api/vehicles/updateOneServiceLog/:vehicleId/:serviceLogId"
router
  .route("/updateOneServiceLog/:vehicleId/:serviceLogId")
  .put(controller.updateOneLogForOneVehicle)

// Matches with "/api/vehicles/updateUserBackgroundPicture/:creatorId/:backgroundPicture"
router
  .route("/updateUserBackgroundPicture/:creatorId")
  .put(controller.updateUserBackgroundPicture)

// Matches with "/api/vehicles/deleteServiceLog/:vehicleId/:serviceLogId"
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

// Matches with "/api/vehicles/themes/:creatorId/:themeType"
router
  .route("/themes/:creatorId/:themeType")
  .put(controller.saveThemeForUser)

// Matches with "/api/vehicles/recordVotedThreadComment/:creatorId/:commentId"
router
  .route("/recordVotedThreadComment/:creatorId/:commentId")
  .put(controller.recordVotedThreadComment)

module.exports = router;
