const router = require("express").Router();
const passport = require("passport");

router.route("/").get(
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.route("/redirect").get(
  passport.authenticate("facebook", {
    session: false,
  }),
  (req, res) => {
    res.redirect(`http://localhost:3001?user=${JSON.stringify(req.user)}
      `);
    res.send(req.user);
    console.log(req);
  }
);

module.exports = router;
