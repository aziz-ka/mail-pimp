var express = require('express');
var router = express.Router();
var chalk = require("chalk");
var passport = require("passport");
var base64url = require("base64-url");
var gmail = require("googleapis").gmail("v1");
var scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"];
var auth = require("../auth.js");

router.get('/', function(req, res) {
  res.render('index', { title: 'Contactly Emailer' });
});

router.get("/auth/google", passport.authenticate("google", {scope: scopes, accessType: "offline"}));

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/email",
  failureRedirect: "/"
}));

router.get("/email", function(req, res, next) {
  res.render("email", {user: req.user});
});

router.post("/send", function(req, res, next) {
  var tokens = auth.tokens();

  sendEmail(JSON.parse(req.user), req.body, tokens);
  res.redirect("/");
});

module.exports = router;

function sendEmail(user, email, tokens) {
  var message = "From: <" + user.emails[0].value + ">\r\nTo: <" + email.address + ">\r\nSubject: " + email.subject + "\r\n\r\n" + email.message;
  var msgEncoded = base64url.encode(message);
  // console.log(chalk.bgYellow(message));
  // console.log(chalk.bgYellow(msgEncoded));
  gmail.users.messages.send({
    "auth": tokens,
    "userId": "me",
    "resource": {
      "raw": msgEncoded
    }
  }, processEmail);
}

function processEmail(err, result) {
  if(err) return err;
  console.log(result);
}