const router = require("express").Router();

const usersController = require("../controllers/usersController");

const verifyRole = require("../middleware/verifyRole");
const verifyAuth = require("../middleware/verifyAuth");

router.route("/").get(verifyRole, usersController.getAllUsers);

router
  .route("/:id")
  .get(verifyAuth, usersController.getUser)
  .delete(verifyAuth, usersController.deleteUser)
  .put(verifyAuth, usersController.updateUser);

module.exports = router;
