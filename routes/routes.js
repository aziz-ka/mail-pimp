var multer = require("multer"),
    upload = multer({dest:'./uploads/'}),
    passport = require("passport"),
    scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"],
    Auth = require("../auth.js"),
    EmailTemplates = require("../templates.js"),
    Emailer = require("../email.js"),
    Campaigns = require("../campaigns.js"),
    Leads = require("../leads.js"),
    Schedules = require("../schedules.js");

module.exports = function(app, express, db) {
  var router = express.Router(),
      auth = new Auth(),
      tokens = auth.tokens(),
      templates = new EmailTemplates(db),
      email = new Emailer(),
      campaigns = new Campaigns(db),
      leads = new Leads(db),
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
    var callback = function(result) {
      res.render("email", {user: JSON.stringify(req.user), templates: result.templates});
    };
    findUser(req.user, callback);
  });

  router.post("/send", upload.single("attachment"), function (req, res, next) {
    email.encodeMessage(req.body, req.file, tokens);
    res.redirect("/email");
  });

  router.get("/campaigns", function (req, res, next) {
    var callback = function(result) {
      res.render("campaigns", {campaigns: result.campaigns});
    };
    findUser(req.user, callback);
  });

  router.get("/campaigns/new", function (req, res, next) {
    var callback = function(result) {
      res.render("new-campaign", {
        templates: result.templates,
        schedules: result.schedules,
        schedulesJSON: JSON.stringify(result.schedules)
      });
    };
    findUser(req.user, callback);
  });

  router.post("/new-template", function (req, res, next) {
    templates.newTemplate(req.body, req.user);
    res.redirect("/campaigns/new");
  });

  router.post("/launch-campaign", function (req, res, next) {
    campaigns.launchCampaign(req.user, req.body, tokens);
    res.redirect("/campaigns/new");
  });

  router.get("/leads", function (req, res, next) {
    var callback = function(result) {
      res.render("leads", {leads: result.leads});
    };
    findUser(req.user, callback);
  });

  router.post("/leads/new", function (req, res, next) {
    console.log(req.body);
    leads.newLead(req.user, req.body);
    res.end();
  });

  router.get("/schedules", function (req, res, next) {
    // var user = findUser(req.user);
    var callback = function(result) {
      res.render("schedules", {schedules: result.schedules});
    };
    findUser(req.user, callback);
  });

  router.post("/newschedule", function (req, res, next) {
    console.log(req.body);
    schedules.newSchedule(req.user, req.body);
    res.redirect("/schedules");
  });

  app.use("/", router);

  function findUser(user, callback) {
    db.collection("users").findOne({"googleId": user.googleId}, function(err, result) {
      if(err) throw err;
      // return result;
      callback(result);
    });
  }
};


