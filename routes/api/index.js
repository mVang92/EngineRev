const router = require("express").Router();
const vehicleRoutes = require("./vehicles");
const updatesRoutes = require("./updates");
console.log("route api index loaded");

// Vehicle routes
router.use("/vehicles", vehicleRoutes);

// Updates routes
router.use("/updates", updatesRoutes);

module.exports = router;
