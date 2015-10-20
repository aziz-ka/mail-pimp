var multer = require("multer"),
    config = require("../config.js")(),
    upload = multer({dest: config.uploadsDir}),
    passport = require("passport"),
    scopes = config.googleScopes,
    Auth = require("." + config.authJS),
    EmailTemplates = require("." + config.emailTemplatesJS),
    Emailer = require("." + config.emailJS),
    Campaigns = require("." + config.campaignsJS),
    Leads = require("." + config.leadsJS),
    Schedules = require("." + config.schedulesJS);

module.exports = function(app, express, db) {
  var router = express.Router(),
      auth = new Auth(),
      tokens = auth.tokens(),
      templates = new EmailTemplates(db),
      email = new Emailer(),
      campaigns = new Campaigns(db),
      leads = new Leads(db),
      schedules = new Schedules(db);

  router.get(config.indexRoute, function (req, res) {
    res.render('index', { title: "Contactly MailPimp", user: req.user});
  });

  router.get(config.googleAuth, passport.authenticate("google", {scope: scopes, accessType: "offline"}));

  router.get(config.googleAuthCB, passport.authenticate("google", {
    successRedirect: config.campaignsRoute,
    failureRedirect: config.indexRoute
  }));

  router.get(config.emailRoute, function (req, res, next) {
    var callback = function(result) {
      res.render("email", {userJSON: JSON.stringify(req.user), templates: result.templates});
    };
    findUser(req.user, callback);
  });

  router.post(config.sendEmailRoute, upload.single("attachment"), function (req, res, next) {
    email.encodeMessage(req.body, req.file, tokens);
    res.redirect(config.emailRoute);
  });

  router.get(config.campaignsRoute, function (req, res, next) {
    var callback = function(result) {
      res.render("campaigns", {campaigns: result.campaigns});
    };
    findUser(req.user, callback);
  });

  router.get(config.newCampaignRoute, function (req, res, next) {
    var callback = function(result) {
      res.render("new-campaign", {
        templates: result.templates,
        schedules: result.schedules,
        schedulesJSON: JSON.stringify(result.schedules)
      });
    };
    findUser(req.user, callback);
  });

  router.post(config.newTemplateRoute, function (req, res, next) {
    templates.newTemplate(req.body, req.user);
    res.redirect(config.newCampaignRoute);
  });

  router.post(config.launchCampaignRoute, function (req, res, next) {
    campaigns.launchCampaign(req.user, req.body, tokens);
    res.redirect(config.campaignsRoute);
  });

  router.get(config.leadsRoute, function (req, res, next) {
    var callback = function(result) {
      res.render("leads", {leads: result.leads});
    };
    findUser(req.user, callback);
  });

  router.post(config.newLeadRoute, function (req, res, next) {
    console.log(req.body);
    leads.newLead(req.user, req.body);
    res.end();
  });

  router.get(config.schedulesRoute, function (req, res, next) {
    var callback = function(result) {
      res.render("schedules", {schedules: result.schedules});
    };
    findUser(req.user, callback);
  });

  router.post(config.newScheduleRoute, function (req, res, next) {
    schedules.newSchedule(req.user, req.body);
    res.redirect(config.schedulesRoute);
  });

  app.use(config.indexRoute, router);

  function findUser(user, callback) {
    db.collection(config.users).findOne({"googleId": user.googleId}, function(err, result) {
      if(err) throw err;
      callback(result);
    });
  }
};


