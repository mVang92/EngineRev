const router = require("express").Router();
const controller = require("../../controllers/controller");
console.log("route api loaded")
// Matches with "/api/vehicles"
router
  .route("/")
  .post(controller.createUserSchema)

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

// Matches with "/api/vehicles/getAllServiceLogs/:id"
router
  .route("/getAllServiceLogs/:id")
  .get(controller.findAllServiceLogsForOneVehicle)

router
  .route("/deleteVehicle/:id")
  .delete(controller.removeOneVehicle)

module.exports = router;
