const mongoose = require("mongoose");
const shortid = require("shortid");

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  customer: {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  orderItems: [{ type: Object }],
  uid: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  note: {
    type: String,
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "COD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
