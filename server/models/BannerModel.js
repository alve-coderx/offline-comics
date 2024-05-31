const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  productlink: {
    type: String,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
