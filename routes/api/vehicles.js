const router = require("express").Router();
const controller = require("../../controllers/controller");
console.log("route api loaded")
// Matches with "/api/vehicles"
router
  .route("/")
  .get(controller.findAll)
  .post(controller.create);

// Matches with "/api/vehicles/:id"
router
  .route("/:id")
  .get(controller.findAllForUser)
  .put(controller.update)
  .delete(controller.remove);

// Matches with "/api/vehicles/logs/:id"
router
  .route("/logs/:id")
  .get(controller.findAllForUser)
  .put(controller.updateOneLog)
  .delete(controller.remove);

// Matches with "/api/vehicles/logs/:id"
router
  .route("/user/:id")
  .get(controller.findOneVehicle)
  .put(controller.updateOneLog)
  .delete(controller.remove);

module.exports = router;
