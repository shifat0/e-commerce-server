const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the review schema
const reviewSchema = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.Review = mongoose.model("Review", reviewSchema);
