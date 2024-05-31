const express = require("express");
const {
  createProduct,
  getProductsByCriteria,
  getProductByID,
  deleteProduct,
  updateProduct,
  getProductsByCategoryIds,
} = require("../controllers/product/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/product/new").post(createProduct);
router.route("/products").get(getProductsByCriteria);
router.route("/products/cat-id").get(getProductsByCategoryIds);
router.route("/product/:id").get(getProductByID).put(updateProduct);
router.route("/product/del").delete(deleteProduct);

module.exports = router;
