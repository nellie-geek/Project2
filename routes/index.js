var router = require("express").Router();
var api = require("./api");
var view = require("./view");
// var authRoutes = require("./auth");

router.use("/api", api);
router.use("/", view);

module.exports = router;