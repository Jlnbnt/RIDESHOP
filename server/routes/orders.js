const router = require("express").Router();

const ordersController = require("../controllers/ordersController");

const verifyJWT = require("../middleware/verifyJWT");
const verifyRole = require("../middleware/verifyRole");
const verifyAuth = require("../middleware/verifyAuth");

router
  .route("/")
  .post(ordersController.createOrder)
  .get(verifyRole, ordersController.getAllOrders);

router
  .route("/:id")
  .get(verifyAuth, ordersController.getOrder)
  .delete(verifyRole, ordersController.deleteOrder)
  .put(verifyRole, ordersController.updateOrder);

module.exports = router;
