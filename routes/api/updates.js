const router = require("express").Router();
const updatesController = require("../../controllers/updatesController");

// Matches with "/api/updates"
router
    .route("/")
    .post(updatesController.addOneUpdate)
    .get(updatesController.getUpdates);

// Matches with "/api/updates/:updateId/updateReleaseNote"
router
    .route("/:updateId/updateReleaseNote")
    .put(updatesController.updateOneReleaseNote)

// Matches with "/api/updates/:updateId/deleteReleaseNote"
router
    .route("/:updateId/deleteReleaseNote")
    .delete(updatesController.deleteOneReleaseNote)

module.exports = router;
