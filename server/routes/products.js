const router = require("express").Router();

const productController = require("../controllers/productsController");

const verifyRole = require("../middleware/verifyRole");

router.route("/").post(verifyRole, productController.addProduct);
router.route("/").get(productController.getAllProducts);

router
  .route("/:id")
  .put(verifyRole, productController.updateProduct)
  .get(productController.getProduct)
  .delete(verifyRole, productController.deleteProduct);

module.exports = router;
