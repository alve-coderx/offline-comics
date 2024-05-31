const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  pixelid: {
    type: String,
    trim: true,
  },
  number: {
    type: String,
    trim: true,
  },
  wpnumber: {
    type: String,
    trim: true,
  },
  address1: {
    type: String,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  dcid: {
    type: String,
    trim: true,
  },
  dcod: {
    type: String,
    trim: true,
  },
  fbUrl: {
    type: String,
    trim: true,
  },
  logo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  favicon: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Store", storeSchema);
