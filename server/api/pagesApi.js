const express = require("express");
const { createHomePageCategorie, getHomePageCategories, deleteHomePageCategorie } = require("../controllers/pages/PageController");
const router = express.Router();

router.route("/home-categories").get(getHomePageCategories);
router.route("/home-categorie/:name").delete(deleteHomePageCategorie);
router.route("/home-categories/create").post(createHomePageCategorie);

module.exports = router;
