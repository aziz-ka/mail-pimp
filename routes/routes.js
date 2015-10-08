var multer = require("multer"),
    upload = multer({dest:'./uploads/'}),
    passport = require("passport"),
    scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"],
    auth = require("../auth.js"),
    EmailTemplates = require("../templates.js"),
    Emailer = require("../email.js"),
    Campaigns = require("../campaigns.js"),
    Schedules = require("../schedules.js");

module.exports = function(app, express, db) {
  var router = express.Router(),
      tokens = auth.tokens(),
      templates = new EmailTemplates(db),
      email = new Emailer(),
      campaigns = new Campaigns(db),
      schedules = new Schedules(db);

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

  router.post("/send", upload.single("attachment"), function (req, res, next) {
    email.encodeMessage(req.body, req.file, tokens);
    res.redirect("/");
  });

  router.get("/templates", function (req, res, next) {
    res.render("templates", {templates: req.user.templates, schedules: req.user.schedules});
  });

  router.post("/newtemplate", function (req, res, next) {
    templates.newTemplate(req.body, req.user);
    res.redirect("/templates");
  });

  router.post("/launchcampaign", function (req, res, next) {
    campaigns.launchCampaign(req.user, req.body, tokens);
    res.redirect("/templates");
  });

  router.get("/schedules", function (req, res, next) {
    res.render("schedules", {schedules: req.user.schedules});
  });

  router.post("/newschedule", function (req, res, next) {
    console.log(req.body);
    schedules.newSchedule(req.user, req.body);
    res.redirect("/schedules");
  });

  app.use("/", router);
};


