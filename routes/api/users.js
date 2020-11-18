const router = require("express").Router();
const controller = require("../../controllers/userController");

// Matches with "/api/users/newUser"
router
  .route("/newUser")
  .post(controller.createUserSchema)

// Matches with "/api/users/:creatorId/:vehicleId/vehicle"
router
  .route("/:creatorId/:vehicleId/vehicle")
  .get(controller.findOneVehicleForUser)

// Matches with "/api/users/:id/user"
router
  .route("/:id/user")
  .get(controller.findUserInfoForOneUser)

// Matches with "/api/users/:id/addVehicle"
router
  .route("/:id/addVehicle")
  .put(controller.addOneVehicle)

// Matches with "/api/users/:creatorId/:vehicleIdaddOneServiceLog/"
router
  .route("/:creatorId/:vehicleId/addServiceLog")
  .put(controller.addOneLogForOneVehicle)

// Matches with "/api/users/:vehicleId/updateOneVehicleInfo"
router
  .route("/:vehicleId/updateVehicleInfo")
  .put(controller.updateVehicleInfo)

// Matches with "/api/users/:vehicleId/:serviceLogId/updateServiceLog"
router
  .route("/:vehicleId/:serviceLogId/updateServiceLog")
  .put(controller.updateOneLogForOneVehicle)

// Matches with "/api/users/:creatorId/:backgroundPicture/backgroundPicture"
router
  .route("/:creatorId/backgroundPicture")
  .put(controller.updateUserBackgroundPicture)

// Matches with "/api/users/:vehicleId/:serviceLogId/deleteServiceLog"
router
  .route("/:vehicleId/:serviceLogId/deleteServiceLog")
  .delete(controller.removeOneServiceLog)

// Matches with "/api/:vehicleId/deleteVehicle"
router
  .route("/:vehicleId/deleteVehicle")
  .delete(controller.removeOneVehicle)

// Matches with "/api/:vehicleId/deleteVehicleName"
router
  .route("/:vehicleId/deleteVehicleName")
  .delete(controller.removeOneVehicleName)

// Matches with "/api/users/themes/:creatorId/:themeType"
router
  .route("/:creatorId/:themeType")
  .put(controller.saveThemeForUser)

// Matches with "/api/users/:creatorId/:commentId/vote"
router
  .route("/:creatorId/:commentId/vote")
  .put(controller.recordVotedThreadComment)

// Matches with "/api/users/:creatorId/:newEmail/updateEmail"
router
  .route("/:creatorId/:newEmail/updateEmail")
  .put(controller.updateEmail)

// Matches with "/api/users/:creatorId/count"
router
  .route("/:creatorId/count")
  .get(controller.getVehicleCount)

module.exports = router;
