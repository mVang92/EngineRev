const router = require("express").Router();
const updatesController = require("../../controllers/updatesController");

// Matches with "/api/updates"
router
    .route("/")
    .post(updatesController.addOneUpdate)
    .get(updatesController.getUpdates);

// Matches with "/api/updates/updateOneReleaseNote/:updateId"
router
    .route("/updateOneReleaseNote/:updateId")
    .put(updatesController.updateOneReleaseNote)

// Matches with "/api/updates/updateOneReleaseNote/:updateId"
router
    .route("/deleteOneReleaseNote/:updateId")
    .delete(updatesController.deleteOneReleaseNote)

module.exports = router;
