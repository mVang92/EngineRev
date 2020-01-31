const router = require("express").Router();
const updatesController = require("../../controllers/updatesController");
console.log("updates route api loaded")

// Matches with "/api/updates"
router
    .route("/")
    .post(updatesController.addOneUpdate)
    .get(updatesController.getAllUpdates);

module.exports = router;
