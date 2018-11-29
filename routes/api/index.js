const router = require("express").Router();
const vehicleRoutes = require("./vehicles");
console.log("route api index loaded");
// Vehicle routes
router.use("/vehicles", vehicleRoutes);

module.exports = router;
