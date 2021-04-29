const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");

const keys = require("../../database/config/accessKeys");
const opts = {};

/**
 * Options I'm passing to JwtStrategy
 * This is an object literal containing options to control how the token is extracted from the request or verified.
 */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

/**
 * @description I'm using passport because I decided to use JSON Web Tokens (JWT) when working with Database
 * Passport is authentication middleware. And I am using it to authenticate JWT(s).
 * @params passport 
 */
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          /**
           * Done takes (err, "secret")
           */
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(e => console.log(`Error when authenticating JWT!\n${e}`));
    })
  );
};