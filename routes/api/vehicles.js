const router = require("express").Router();
const controller = require("../../controllers/controller");
console.log("route api loaded")
// Matches with "/api/vehicles"
router
  .route("/")
  .post(controller.createUserSchema);

// Matches with "/api/vehicles/:id"
router
  .route("/:id")
  .get(controller.findAllVehiclesForUser)
  .put(controller.addOneVehicle)
  .delete(controller.remove);
  
// Matches with "/api/vehicles/logs/:id"
router
  .route("/logs/:id")
  .put(controller.updateOneLogForOneVehicle)
  .delete(controller.remove);

// Matches with "/api/vehicles/user/:id"
router
  .route("/user/:id")
  .get(controller.findOneVehicle)
  .delete(controller.remove);

module.exports = router;
