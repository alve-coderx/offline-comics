const express = require("express");
const {
  createOrder,
  getOrdersByCriteria,
  getOrderById,
  updateBulkOrderStatus,
  updateOrder,
  deleteOrdersByIds,
} = require("../controllers/order/OrderController");

const router = express.Router();

router.route("/order/new").post(createOrder);
router.route("/orders").get(getOrdersByCriteria);
router.route("/order/:id").get(getOrderById).put(updateOrder);

router.route("/orders").put(updateBulkOrderStatus);
router.route("/orders").delete(deleteOrdersByIds);

module.exports = router;
