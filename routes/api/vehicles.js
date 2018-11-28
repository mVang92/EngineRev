const router = require("express").Router();
const carLogController = require("../../controllers/carLogController");
console.log("vehicles.js")
// Matches with "/api/vehicles"
router.route("/")
  .get(carLogController.findAll)
  .post(carLogController.create);

// Matches with "/api/vehicles/:id"
router
  .route("/:id")
  .get(carLogController.findById)
  .put(carLogController.update)
  .delete(carLogController.remove);

module.exports = router;
