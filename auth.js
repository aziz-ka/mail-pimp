module.exports = function() {
  var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  var passport = require("passport");

  passport.use(new GoogleStrategy({
    clientID: "758966440539-bupfrt3rha6k9n07v1a4n3l3ta8ksg09.apps.googleusercontent.com",
    clientSecret: "6Sn1sivSt3Ob13VKOEoyjZmO",
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }));
};