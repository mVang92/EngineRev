const router = require("express").Router();
const displayNameController = require("../../controllers/displayNameController");

// Matches with "/api/names"
router
    .route("/")
    .get(displayNameController.getDisplayNames)
    .put(displayNameController.addOneDisplayName)    

module.exports = router;