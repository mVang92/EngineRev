const router = require("express").Router();
const forumController = require("../../controllers/forumController");
console.log("forum route api loaded")

// Matches with "/api/forum"
router
    .route("/")
    .post(forumController.addOneThread)
    .get(forumController.getAllThreads);

// Matches with "/api/forum/forumController/:updateId"
// router
//     .route("/updateOneReleaseNote/:updateId")
//     .put(forumController.updateOneReleaseNote)

// Matches with "/api/forum/forumController/:updateId"
// router
//     .route("/deleteOneReleaseNote/:updateId")
//     .delete(forumController.deleteOneReleaseNote)

module.exports = router;
