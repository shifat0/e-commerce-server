const { Coupon } = require("../models/coupon");
const _ = require("lodash");

module.exports.createCoupon = async (req, res) => {
  try {
    let { name, discount } = _.pick(req.body, ["name", "discount"]);

    const existCoupon = await Coupon.findOne({
      name: name,
    });

    if (existCoupon) return res.status(400).send("Coupon already exists!");

    let newCoupon = new Coupon({
      name: name,
      discount: discount,
    });

    const createdCoupon = await newCoupon.save();
    return res.status(201).send({
      message: "Coupon given successfully!",
      data: createdCoupon,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  if (!coupons) return res.status(400).send("Cound not get find coupons");
  return res.status(200).send(coupons);
};
