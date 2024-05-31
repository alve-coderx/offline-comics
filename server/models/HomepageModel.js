const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema({
  categories: {
    type: [String], // specifying array of strings
    default: [],
  },
  keywords: {
    type: [String], // specifying array of strings
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Home", homePageSchema);
