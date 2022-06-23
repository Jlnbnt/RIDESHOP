const router = require("express").Router();

const logoutController = require("../../controllers/auth/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
