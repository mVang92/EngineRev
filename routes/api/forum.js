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

// Matches with "/api/forum/handleUpdateThreadDetails/:threadId"
router
    .route("/handleUpdateThreadDetails/:threadId")
    .put(forumController.handleUpdateThreadDetails)

// Matches with "/api/forum/deleteThread/:threadId"
router
    .route("/deleteThread/:threadId")
    .put(forumController.deleteThread)

// Matches with "/api/forum/handleCommentUpVote/:threadId/:commentId"
router
    .route("/handleCommentUpVote/:threadId/:commentId")
    .put(forumController.handleCommentUpVote)

// Matches with "/api/forum/handleCommentDownVote/:threadId/:commentId"
router
    .route("/handleCommentDownVote/:threadId/:commentId")
    .put(forumController.handleCommentDownVote)

// Matches with "/api/forum/handleDeleteThreadComment/:threadId/:commentId"
router
    .route("/handleDeleteThreadComment/:threadId/:commentId")
    .put(forumController.handleDeleteThreadComment)

// Matches with "/api/forum/handleUpdateThreadComment/:commentId"
router
    .route("/handleUpdateThreadComment/:commentId")
    .put(forumController.handleUpdateThreadComment)

module.exports = router;
