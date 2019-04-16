var router = require("express").Router();
var fmsController = require("./../../controllers/fms-controller");

// Matches with "/api/fl-men"
router.route("/fl-men")
  .post(fmsController.create);



module.exports = router;