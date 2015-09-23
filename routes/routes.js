var express = require('express');
var router = express.Router();
var passport = require("passport");
var base64url = require("base64-url");
var gmail = require("googleapis").gmail("v1");
var scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"];

router.get('/', function(req, res) {
  res.render('index', { title: 'Contactly Emailer' });
});

router.get("/auth/google", passport.authenticate("google", {scope: scopes}));

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/email",
  failureRedirect: "/"
}));

router.get("/email", function(req, res, next) {
  res.render("email", {user: req.user});
});

router.post("/send", function(req, res, next) {
  console.log(req.body, req.user);
  sendEmail(JSON.parse(req.user), req.body);
  res.redirect("/");
});

module.exports = router;

function sendEmail(user, email) {
  var message = "From " + user.emails[0].value + "To " + email.address + "Subject " + email.subject + email.message;
  var msgEncoded = base64url.encode(message);
  var request = gmail.users.messages.send({
    "userId": user.id,
    "message": {
      "raw": msgEncoded
    }
  });
  request.execute(processEmail(err, result));
}

function processEmail(err, result) {
  console.log(result);
}