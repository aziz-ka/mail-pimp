// module.exports = function() {
//   var express = require('express'),
//       router = express.Router(),
//       passport = require("passport");

//   router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });

//   router.get("/auth/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/gmail.readonly"]}));

//   router.get("/auth/google/callback", passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/"
//   }));

//   router.get("/email", function(req, res, next) {
//     res.render("email");
//   });

//   app.use("/", router);
// };



var express = require('express');
var router = express.Router();
var passport = require("passport");
var scopes = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/gmail.modify"];

router.get('/', function(req, res) {
  res.render('index', { title: 'Contactly Emailer' });
});

router.get("/auth/google", passport.authenticate("google", {scope: scopes}));

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/email",
  failureRedirect: "/"
}));

router.get("/email", function(req, res, next) {
  res.render("email");
});

module.exports = router;
