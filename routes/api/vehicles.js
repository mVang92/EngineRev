const router = require("express").Router();
const controller = require("../../controllers/controller");
console.log("route api loaded")
// Matches with "/api/vehicles"
router
  .route("/")
  .post(controller.createUserSchema)

// Matches with "/api/vehicles/findOneVehicleForUser:id"
router
  .route("/findOneVehicleForUser/:id")
  .get(controller.findOneVehicleForUser)

// Matches with "/api/vehicles/:id"
router
  .route("/:id")
  .get(controller.findAllVehiclesForUser)
  .put(controller.addOneVehicle)

// Matches with "/api/vehicles/addOneServiceLog/:id"
router
  .route("/addOneServiceLog/:id")
  .put(controller.addOneLogForOneVehicle)

// Matches with "/api/vehicles/updateOneServiceLog/:id"
router
  .route("/updateOneVehicleName/:vehicleId")
  .put(controller.updateOneVehicleName)

// Matches with "/api/vehicles/updateOneServiceLog/:id"
router
  .route("/updateOneServiceLog/:vehicleId/:serviceLogId")
  .put(controller.updateOneLogForOneVehicle)

// Matches with "/api/vehicles/deleteServiceLog/:serviceLogId"
router
  .route("/deleteServiceLog/:id")
  .delete(controller.removeOneServiceLog)

// Matches with "/api/deleteVehicle/:id"
router
  .route("/deleteVehicle/:id")
  .delete(controller.removeOneVehicle)

module.exports = router;
