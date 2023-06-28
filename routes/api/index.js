const router = require("express").Router();
const usersRoutes = require("./users");
const updatesRoutes = require("./updates");
const forumRoutes = require("./forum");
const eventLogRoutes = require("./eventLog");
const displayNamesRoutes = require("./displayNames");

// Users routes
router.use("/users", usersRoutes);

// Updates routes
router.use("/updates", updatesRoutes);

// Forum routes
router.use("/forum", forumRoutes);

// Event Log routes
router.use("/eventLog", eventLogRoutes);

// Display Name routes
router.use("/names", displayNamesRoutes);

module.exports = router;
