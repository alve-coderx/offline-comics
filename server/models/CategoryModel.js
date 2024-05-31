const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter sub category name"],
    trim: true,
  },
  details: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  banner: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  icon: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  }
});

module.exports = mongoose.model("Category", categorySchema);
