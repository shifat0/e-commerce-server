const { CartItem } = require("../models/cartItem");
const { Profile } = require("../models/profile");
const PaymentSession = require("ssl-commerz-node").PaymentSession;
const { Order } = require("../models/order");
const { Payment } = require("../models/payment");
const path = require("path");

// Request a Session
// Payment Process
// Receive IPN
// Create an Order

module.exports.ipn = async (req, res) => {
  console.log(req.body);
  const payment = new Payment(req.body);
  const tran_id = payment["tran_id"];
  if (payment["status"] === "VALID") {
    const order = await Order.updateOne(
      { transaction_id: tran_id },
      { status: "Complete" }
    );
    await CartItem.deleteMany(order.cartItems);
  } else {
    await Order.deleteOne({ transaction_id: tran_id });
  }
  await payment.save();
  return res.status(200).send("IPN");
};

module.exports.initPayment = async (req, res) => {
  const userId = req.user._id;
  const cartItems = await CartItem.find({ user: userId });
  const profile = await Profile.findOne({ user: userId });

  const { address1, address2, city, state, postcode, country, phone } = profile;

  const total_amount = cartItems
    .map((item) => item.count * item.price)
    .reduce((a, b) => a + b, 0);

  const total_item = cartItems
    .map((item) => item.count)
    .reduce((a, b) => a + b, 0);

  const tran_id =
    "_" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

  const payment = new PaymentSession(
    true,
    process.env.STORE_ID,
    process.env.STORE_PASSWORD
  );

  // Set the urls
  payment.setUrls({
    success:
      "https://e-commerce-server-unig.onrender.com/api/v1/payment/success",
    // success: "http://localhost:3001/",
    fail: "yoursite.com/fail", // If payment failed
    cancel: "yoursite.com/cancel", // If user cancel payment
    ipn: "https://e-commerce-server-unig.onrender.com/api/v1/payment/ipn", // SSLCommerz will send http post request in this link
  });

  // Set order details
  payment.setOrderInfo({
    total_amount: 1200, //total_amount, // Number field
    currency: "BDT", // Must be three character string
    tran_id: tran_id, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  // Set customer info
  payment.setCusInfo({
    name: req.user.name,
    email: req.user.email,
    add1: address1,
    add2: address2,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
    phone: phone,
    fax: phone,
  });

  // Set shipping info
  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: total_item,
    name: req.user.name,
    add1: address1,
    add2: address2,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
  });

  // Set Product Profile
  payment.setProductInfo({
    product_name: "Bohubrihi E-com Products",
    product_category: "General",
    product_profile: "general",
  });

  response = await payment.paymentInit();
  const order = new Order({
    cartItems: cartItems,
    user: userId,
    transaction_id: tran_id,
    address: profile,
  });
  if (response.status === "SUCCESS") {
    order.sessionKey = response["sessionkey"];
    await order.save();
  }
  return res.status(200).send(response);
};

module.exports.paymentSuccess = async (req, res) => {
  res.sendFile(path.join(__basedir + "/public/success.html"));
};
