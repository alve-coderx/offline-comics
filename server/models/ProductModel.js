// product.js
const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  optionValues: [
    {
      type: String,
      required: true,
    },
  ],
});
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    shortdescription: { type: String },
    price: { type: Number, required: true },
    runrate: { type: Number },
    runprice: { type: Number },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    category: { type: mongoose.Schema.ObjectId, ref: "Category" },
    inventory: {
      sku: { type: String, unique: true },
      stock: [stockSchema],
      option: {
        type: [],
        default: [],
      },
    },
    tags: {
      type: String,
      enum: ["top", "new"],
      default: "new",
    },
    shipping: {
      isShipping: { type: Boolean, default: false },
      condition: { type: Number },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
