var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    passport = require("passport"),
    chalk = require("chalk"),
    credentials = require("./private/settings.json"),
    clientID = credentials.google.clientID,
    clientSecret = credentials.google.clientSecret,
    env = process.env.NODE_ENV || "development",
    callbackURL = env === "development" ? credentials.google.localCallbackURL : credentials.google.AWSCallbackURL,
    OAuth2 = require("googleapis").auth.OAuth2,
    oauth2Client = new OAuth2(clientID, clientSecret, callbackURL);

module.exports = function() {
  this.auth = function(app, db) {
    var users = db.collection("users");

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(user, done) {
      done(null, user);
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

      users.findOne({googleId: profile.id}, function(err, user) {
        if(user) {
          return done(null, user);
        } else {
          var newUser = {
            googleId: profile.id,
            email: profile.emails[0].value
          };
          users.insert(newUser, function(err, newUser) {
            // no idea how to avoid using ops[0]
            return done(null, newUser.ops[0]);
          });
        }
      });
    }));
  };

  this.tokens = function() {
    return oauth2Client;
  };
};

// module.exports = {
//   auth: auth,
//   tokens: tokens
// };
