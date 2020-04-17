const router = require("express").Router();
const vehicleRoutes = require("./vehicles");
const updatesRoutes = require("./updates");
const forumRoutes = require("./forum");
const eventLog = require("./eventLog");
console.log("route api index loaded");

// Vehicle routes
router.use("/vehicles", vehicleRoutes);

// Updates routes
router.use("/updates", updatesRoutes);

// Forum routes
router.use("/forum", forumRoutes);

// Event Log routes
router.use("/eventLog", eventLog);

module.exports = router;
