const router = require("express").Router();
const forumController = require("../../controllers/forumController");
console.log("forum route api loaded")

// Matches with "/api/forum"
router
    .route("/")
    .post(forumController.addOneThread)
    .get(forumController.getAllThreads);

// Matches with "/api/forum/addOneCommentToOneThread/:threadId"
router
    .route("/addOneCommentToOneThread/:threadId")
    .put(forumController.addOneCommentToOneThread)

// Matches with "/api/forum/getAllThreadComments/:threadId"
router
    .route("/getAllThreadComments/:threadId")
    .get(forumController.getAllThreadComments)

module.exports = router;
