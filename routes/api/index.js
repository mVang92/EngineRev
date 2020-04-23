const router = require("express").Router();
const usersRoutes = require("./users");
const updatesRoutes = require("./updates");
const forumRoutes = require("./forum");
const eventLog = require("./eventLog");
console.log("route api index loaded");

// Users routes
router.use("/users", usersRoutes);

// Updates routes
router.use("/updates", updatesRoutes);

// Forum routes
router.use("/forum", forumRoutes);

// Event Log routes
router.use("/eventLog", eventLog);

module.exports = router;
