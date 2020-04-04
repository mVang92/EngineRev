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

// Matches with "/api/forum/updateThreadTitle/:threadId"
router
    .route("/updateThreadTitle/:threadId")
    .put(forumController.updateThreadTitle)

// Matches with "/api/forum/deleteThread/:threadId"
router
    .route("/deleteThread/:threadId")
    .put(forumController.deleteThread)

module.exports = router;
