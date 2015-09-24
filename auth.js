var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var passport = require("passport");
var chalk = require("chalk");
var clientID = "758966440539-bupfrt3rha6k9n07v1a4n3l3ta8ksg09.apps.googleusercontent.com";
var clientSecret = "6Sn1sivSt3Ob13VKOEoyjZmO";
var callbackURL = "http://localhost:3000/auth/google/callback";
var OAuth2 = require("googleapis").auth.OAuth2;
var oauth2Client = new OAuth2(clientID, clientSecret, callbackURL);

exports.auth = function() {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  }, function(accessToken, refreshToken, profile, done) {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    return done(null, JSON.stringify(profile._json));
  }));
};

exports.tokens = function() {
  console.log(oauth2Client);
  return oauth2Client;
};

// module.exports = auth;
// module.exports = hello;