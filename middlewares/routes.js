const userRouter = require("../routers/userRouter");
const categoryRouter = require("../routers/categoryRouter");
const productRouter = require("../routers/productRouter");
const cartRouter = require("../routers/cartRouter");
const authGoogleRouter = require("../routers/authGoogleRouter");
const authFacebookRouter = require("../routers/authFacebookRouter");
const paymentRouter = require("../routers/paymentRouter");
const profileRouter = require("../routers/profileRouter");

module.exports = (app) => {
  app.get("/", (_, res) => res.send("server is running").sendStatus(200));
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/auth/google", authGoogleRouter);
  app.use("/auth/facebook", authFacebookRouter);
  app.use("/api/v1/payment", paymentRouter);
  app.use("/api/v1/profile", profileRouter);
};
