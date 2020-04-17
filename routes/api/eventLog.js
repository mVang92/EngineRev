const router = require("express").Router();
const eventLogController = require("../../controllers/eventLogController");
console.log("eventLog route api loaded")

// Matches with "/api/eventLog"
router
    .route("/")
    .post(eventLogController.addOneEvent)

// Matches with "/api/forum/addOneCommentToOneThread/:threadId"
// router
//     .route("/addOneCommentToOneThread/:threadId")
//     .put(eventLogController.addOneCommentToOneThread)

module.exports = router;
