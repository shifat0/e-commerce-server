const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../models/user");
const _ = require("lodash");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, cb) => {
    //console.log("Profile: ", profile);
    let user = await User.findOne({
      googleId: profile.id,
      email: profile._json.email,
    });
    if (user) {
      //console.log("User exists:", user);
      const token = user.generateJWT();
      const response = {
        user: _.pick(user, ["email", "name", "_id"]),
        token: token,
      };
      cb(null, response);
    } else {
      user = new User({
        googleId: profile.id,
        email: profile._json.email,
        name: profile.displayName,
      });
      await user.save();
      const token = user.generateJWT();
      const response = {
        user: _.pick(user, ["email", "name", "_id"]),
        token: token,
      };
      cb(null, response);
      //console.log("New User:", user);
    }
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/redirect",
    profileFields: ["id", "displayName", "photos", "email"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log("Profile: ", profile);
    let user = await User.findOne({
      facebookId: profile.id,
      email: profile._json.email,
    });
    if (user) {
      //console.log("User exists:", user);
      const token = user.generateJWT();
      const response = {
        user: _.pick(user, ["email", "name", "_id"]),
        token: token,
      };
      cb(null, response);
    } else {
      user = new User({
        facebookId: profile.id,
        email: profile._json.email,
        name: profile.displayName,
      });
      await user.save();
      const token = user.generateJWT();
      const response = {
        user: _.pick(user, ["email", "name", "_id"]),
        token: token,
      };
      cb(null, response);
      //console.log("New User:", user);
    }
  }
);

passport.use(googleStrategy);
passport.use(facebookStrategy);

// session based and token based
// https://sherryhsu.medium.com/session-vs-token-based-authentication-11a6c5ac45e4#:~:text=Many%20web%20applications%20use%20JSON,instead%20of%20sessions%20for%20authentication.&text=The%20biggest%20difference%20here%20is,on%20the%20client%20side%20instead.
