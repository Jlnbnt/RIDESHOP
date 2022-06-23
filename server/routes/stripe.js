const router = require("express").Router();

const stripeController = require("../controllers/stripeController");

router.route("/").post(stripeController.stripePaiment);

module.exports = router;
