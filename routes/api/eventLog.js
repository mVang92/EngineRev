const router = require("express").Router();
const eventLogController = require("../../controllers/eventLogController");
console.log("eventLog route api loaded")

// Matches with "/api/eventLog"
router
    .route("/")
    .post(eventLogController.addOneEvent)

module.exports = router;
