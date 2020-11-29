const router = require("express").Router();
const forumController = require("../../controllers/forumController");

// Matches with "/api/forum"
router
    .route("/")
    .post(forumController.addOneThread)
    .get(forumController.getAllThreadsPartial);

// Matches with "/api/forum/sortByOldest"
router
    .route("/sortByOldest")
    .get(forumController.getAllThreadsPartialSortByOldest);

// Matches with "/api/forum/sortByViews"
router
    .route("/sortByViews")
    .get(forumController.getAllThreadsPartialSortByViews);

// Matches with "/api/forum/sortByComments"
router
    .route("/sortByComments")
    .get(forumController.getAllThreadsPartialSortByComments);

// Matches with "/api/forum/showAskCarQuestion"
router
    .route("/showAskCarQuestion")
    .get(forumController.getAllThreadsPartialShowAskCarQuestion);

// Matches with "/api/forum/showAskCarQuestion"
router
    .route("/showTipsAndTricks")
    .get(forumController.getAllThreadsPartialShowTipsAndTricks);

// Matches with "/api/forum/showShareStory"
router
    .route("/showShareStory")
    .get(forumController.getAllThreadsPartialShowShareStory);

// Matches with "/api/forum/showShareStory"
router
    .route("/showOther")
    .get(forumController.getAllThreadsPartialShowOther);

// Matches with "/api/forum/:threadId/addComment"
router
    .route("/:threadId/addComment")
    .put(forumController.addOneCommentToOneThread)

// Matches with "/api/forum/:threadId/thread"
router
    .route("/:threadId/thread")
    .get(forumController.getThreadData)

// Matches with "/api/forum/:threadId/updateThreadDetails"
router
    .route("/:threadId/updateThreadDetails")
    .put(forumController.handleUpdateThreadDetails)

// Matches with "/api/forum/:threadId/deleteThread"
router
    .route("/:threadId/deleteThread")
    .delete(forumController.deleteThread)

// Matches with "/api/forum/:creatorId/:threadId/:commentId/upVote"
router
    .route("/:creatorId/:threadId/:commentId/upVote")
    .put(forumController.handleCommentUpVote)

// Matches with "/api/forum/:creatorId/:threadId/:commentId/downVote"
router
    .route("/:creatorId/:threadId/:commentId/downVote")
    .put(forumController.handleCommentDownVote)

// Matches with "/api/forum/:threadId/:commentId/deleteComment"
router
    .route("/:threadId/:commentId/deleteComment")
    .put(forumController.handleDeleteThreadComment)

// Matches with "/api/forum/:commentId/updateComment"
router
    .route("/:commentId/updateComment")
    .put(forumController.handleUpdateThreadComment)

// Matches with "/api/forum/:commentId/view"
router
    .route("/:threadId/view")
    .put(forumController.handleIncrementViews)

// Matches with "/api/forum/:commentId/hit"
router
    .route("/:threadId/hit")
    .put(forumController.handleIncrementHits)

module.exports = router;
