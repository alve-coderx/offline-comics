const express = require("express");
const {
  getCategoriesByCriteria,
  newCategory,
  getCategoryDetails,
  deleteCategory,
  updateCategory,
} = require("../controllers/category/CategoryController");

const router = express.Router();

router.route("/categories").get(getCategoriesByCriteria);
router.route("/category/new").post(newCategory);
router
  .route("/category/:id")
  .get(getCategoryDetails)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
