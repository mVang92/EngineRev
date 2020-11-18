const router = require("express").Router();
const eventLogController = require("../../controllers/eventLogController");

// Matches with "/api/eventLog"
router
    .route("/")
    .post(eventLogController.addOneEvent)
    .delete(eventLogController.removeOldEvents)

// Matches with "/api/eventLog/:creatorId/eventLogs"
router
    .route("/:creatorId/eventLogs")
    .get(eventLogController.getEventsForUser)

module.exports = router;
