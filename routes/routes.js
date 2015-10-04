var multer = require("multer"),
    upload = multer({dest:'./uploads/'}),
    passport = require("passport"),
    scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"],
    auth = require("../auth.js"),
    EmailTemplates = require("../templates.js"),
    Emailer = require("../email.js"),
    Campaigns = require("../campaigns.js");

module.exports = function(app, express, db) {
  var router = express.Router(),
      templates = new EmailTemplates(db),
      email = new Emailer(),
      campaigns = new Campaigns(db);

  router.get('/', function (req, res) {
    res.render('index', { title: 'Contactly Emailer' });
  });

  router.get("/auth/google", passport.authenticate("google", {scope: scopes, accessType: "offline"}));

  router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "/email",
    failureRedirect: "/"
  }));

  router.get("/email", function (req, res, next) {
    res.render("email", {user: JSON.stringify(req.user), templates: req.user.templates});
  });

  router.get("/templates", function (req, res, next) {
    res.render("templates", {templates: req.user.templates});
  });

  router.post("/newtemplate", function (req, res, next) {
    templates.newTemplate(req.body, req.user);
    res.redirect("/templates");
  });

  router.post("/send", upload.single("attachment"), function (req, res, next) {
    var tokens = auth.tokens();
    email.encodeMessage(req.user, req.body, req.file, tokens);
    res.redirect("/");
  });

  router.post("/launchcampaign", function (req, res, next) {
    campaigns.launchCampaign(req.user, req.body);
    res.redirect("/templates");
  });

  app.use("/", router);
};


