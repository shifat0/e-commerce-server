const {
  createReview,
  getReviewByProduct,
} = require("../controllers/reviewController");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.route("/").post(authorize, createReview);
router.route("/:id").get(getReviewByProduct);

module.exports = router;
