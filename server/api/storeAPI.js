const express = require("express");
const {
  getSlider,
  getBanners,
  getSingleSlider,
  deleteSlider,
  updateSlider,
  createSlider,
  createBanner,
  deleteBanner,
  updateBanner,
  getStore,
  getStoreOverview,
  updateStore,
} = require("../controllers/store/StoreController");
const router = express.Router();

router.route("/store").get(getStore);
router.route("/store/:id").put(updateStore);
router.route("/store-overview").get(getStoreOverview);
router.route("/store-slider").get(getSlider);
router.route("/store-banners").get(getBanners);
router
  .route("/store-slider/:id")
  .delete(deleteSlider)
  .put(updateSlider)
  .get(getSingleSlider);

router.route("/store-banner/:id").delete(deleteBanner).put(updateBanner);

router.route("/store-slider/new").post(createSlider);
router.route("/store-banner/new").post(createBanner);

module.exports = router;
