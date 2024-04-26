const ObjectId = require("mongoose").Types.ObjectId;
const { Review } = require("../models/review");
const _ = require("lodash");

module.exports.createReview = async (req, res) => {
  try {
    let { product_id, review } = _.pick(req.body, ["product_id", "review"]);

    const existReview = await Review.findOne({
      product_id: product_id,
      user: req.user._id,
    });

    if (existReview)
      return res.status(400).send("Review already exist for this product!");

    let newReview = new Review({
      product_id: product_id,
      user: req.user._id,
      review: review,
    });
    const createdReview = await newReview.save();
    return res.status(201).send({
      message: "Review given successfully!",
      data: createdReview,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getReviewByProduct = async (req, res) => {
  const productId = req.params.id;

  if (!ObjectId.isValid(productId))
    return res.status(400).send("invalid product id");

  const review = await Review.find({ product_id: productId });
  return res.status(200).send({
    message: "Request resolved successfully",
    data: review,
  });
};
