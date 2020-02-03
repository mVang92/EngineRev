const router = require("express").Router();
const updatesController = require("../../controllers/updatesController");
console.log("updates route api loaded")

// Matches with "/api/updates"
router
    .route("/")
    .post(updatesController.addOneUpdate)
    .get(updatesController.getAllUpdates);

// Matches with "/api/updates/updateOneReleaseNote/:updateId"
router
.route("/updateOneReleaseNote/:updateId")
.put(updatesController.updateOneReleaseNote)

module.exports = router;
