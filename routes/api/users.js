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
  .get(controller.getUserInfoPartial)

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

// Matches with "/api/users/themes/:creatorId/:themeType"
router
  .route("/:creatorId/:themeType")
  .put(controller.saveThemeForUser)

// Matches with "/api/users/:creatorId/:newEmail/updateEmail"
router
  .route("/:creatorId/:newEmail/updateEmail")
  .put(controller.updateEmail)

// Matches with "/api/users/:creatorId/count"
router
  .route("/:creatorId/count")
  .get(controller.getVehicleCount)

// Matches with "/api/users/:creatorId/email"
router
  .route("/:creatorId/email")
  .get(controller.getEmail)

// Matches with "/api/users/:creatorId/roles"
router
  .route("/:creatorId/roles")
  .get(controller.getRoles)

// Matches with "/api/users/:creatorId/theme"
router
  .route("/:creatorId/theme")
  .get(controller.getTheme)

// Matches with "/api/users/:creatorId/background"
router
  .route("/:creatorId/background")
  .get(controller.getBackgroundPicture)

// Matches with "/api/users/:creatorId/votes"
router
  .route("/:creatorId/votes")
  .get(controller.getVotedComments)

// Matches with "/api/users/:creatorId/vehicles"
router
  .route("/:creatorId/vehicles")
  .get(controller.getUserVehicles)

module.exports = router;
