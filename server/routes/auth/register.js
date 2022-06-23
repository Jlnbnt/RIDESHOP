const router = require("express").Router();

const registerController = require("../../controllers/auth/registerController");

router.post("/", registerController.handleRegister);

module.exports = router;
