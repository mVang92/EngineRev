const router = require("express").Router();
const eventLogController = require("../../controllers/eventLogController");
console.log("eventLog route api loaded")

// Matches with "/api/eventLog"
router
    .route("/")
    .post(eventLogController.addOneEvent)
    .delete(eventLogController.removeOldEvents)

// Matches with "/api/eventLog/getEventsForUser/:creatorId"
router
    .route("/getEventsForUser/:creatorId")
    .get(eventLogController.getEventsForUser)

module.exports = router;
