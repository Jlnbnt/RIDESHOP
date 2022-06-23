const router = require("express").Router();

const loginController = require("../../controllers/auth/loginController");

router.post("/", loginController.handleLogin);

module.exports = router;
