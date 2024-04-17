const userRouter = require("../routers/userRouter");
const categoryRouter = require("../routers/categoryRouter");
const productRouter = require("../routers/productRouter");
const cartRouter = require("../routers/cartRouter");
const authGoogleRouter = require("../routers/authGoogleRouter");

module.exports = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/auth/google", authGoogleRouter);
};
