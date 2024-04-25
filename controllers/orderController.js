const { Order } = require("../models/order");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) throw new Error("invalid user id");

    const orders = await Order.find({ user: userId }).populate({
      path: "cartItems",
      populate: { path: "product", model: "Product", select: "name" },
    });

    if (!orders.length) res.send("There is no order for this user");

    res.status(200).send(orders);
  } catch (error) {
    res.send("something went wrong", error);
  }
};
