const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const admin = require("../middlewares/admin");
const { createCoupon, getCoupons } = require("../controllers/couponController");

router.route("/").post([authorize, admin], createCoupon).get(getCoupons);

module.exports = router;
