const router = require("express").Router();
const vehicleRoutes = require("./vehicles");
console.log("index routes")
// Book routes
router.use("/vehicles", vehicleRoutes);

module.exports = router;
