var router = require("express").Router();
var apiRoutes = require("./api");
var viewRoutes = require("./view");
var authRoutes = require("./auth");

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;