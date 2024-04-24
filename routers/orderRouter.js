const router = require("express").Router();
const { getOrdersByUser } = require("../controllers/orderController");
const authorize = require("../middlewares/authorize");

router.route("/:id").get(authorize, getOrdersByUser);

module.exports = router;
