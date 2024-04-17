const router = require("express").Router();
const passport = require("passport");
require("../config/authGoogleConfig");

router
  .route("/")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/redirect").get(
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    res.redirect(`http://localhost:3001?user=${JSON.stringify(req.user)}
      `);
    res.send(req.user);
  }
);

module.exports = router;
