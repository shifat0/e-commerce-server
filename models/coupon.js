const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the review schema
const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.Coupon = mongoose.model("Coupon", couponSchema);
