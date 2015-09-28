var express = require('express');
var router = express.Router();
var chalk = require("chalk");
var util = require("util");
var formidable = require("formidable");
var passport = require("passport");
var base64url = require("base64-url");
var gmail = require("googleapis").gmail("v1");
var scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"];
var auth = require("../auth.js");
var multer = require("multer");
var upload = multer({dest:'./uploads/'});
var fs = require("fs-extra");

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

router.post("/send", upload.single("attachment"), function(req, res, next) {
  var tokens = auth.tokens();
  console.log(req.file);

  encodeMessage(JSON.parse(req.user), req.body, req.file, tokens);
  res.redirect("/");
});

module.exports = router;

function encodeMessage(user, email, file, tokens) {
  var message = "";
  message += "From: <" + user.emails[0].value + ">\r\n";
  message += "To: <" + email.address + ">\r\n";
  message += "Subject: " + email.subject + "\r\n";
  message += "MIME-Version: 1.0\r\n";

  if(!file) {
    message += "Content-Type: text/html; charset='utf-8'\r\n\r\n";
    message += email.message;
    sendEmail(message, tokens);
  } else {
    message += "Content-Type: message/rfc822; boundary='the_end'\r\n\r\n";

    message += "--the_end\r\n";
    message += "MIME-Version: 1.0\r\n";
    message += "Content-Transfer-Encoding: 7bit\r\n";
    message += "Content-Type: text/html; charset='utf-8'\r\n\r\n";
    message += email.message + "\r\n\r\n";

    message += "--the_end\r\n";
    message += "MIME-Version: 1.0\r\n";
    message += "Content-Type: " + file.mimetype + "\r\n";
    message += "Content-Transfer-Encoding: base64\r\n";
    message += "Content-Disposition: attachment; filename='" + file.filename + "'\r\n\r\n";

    fs.readFile(file.path, function(err, fileData) {
      fileData = base64url.encode(fileData);
      message += fileData + "\r\n";
      message += "--the_end--";
      sendEmail(message, tokens, file, fileData);
    });
  }
  // console.log(file);
}

function sendEmail(message, tokens, file, fileData) {
  var msgEncoded = base64url.encode(message);

  console.log(chalk.bgYellow(message));
  console.log(chalk.bgCyan(msgEncoded));

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