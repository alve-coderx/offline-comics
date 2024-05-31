const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  active : {
    type : Boolean,
    default : false,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Slider", sliderSchema);
