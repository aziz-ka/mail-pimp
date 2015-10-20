var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    handlebars = require('express-handlebars'),
    session = require("express-session"),
    app = express(),
    MongoClient = require("mongodb").MongoClient,
    MongoConnect = require("connect-mongo")(session),
    moment = require("moment"),
    config = require("./config.js")(),
    Auth = require(config.authJS),
    auth = new Auth();

MongoClient.connect(config.dbUrl, function(err, db) {
  if(err) throw err;

  app.locals.ENV = config.env;
  app.locals.ENV_DEVELOPMENT = config.env == config.devEnv;

  // view engine setup
  var hbs = handlebars.create({
    extname: '.' + config.HBExtName,
    defaultLayout: config.HBDefaultLayout,
    partialsDir: [config.HBPartialsDir],
    helpers: {
      dayOfWeek: function(dayNum) {
        if(dayNum == "0") return "Sunday";
        if(dayNum == "1") return "Monday";
        if(dayNum == "2") return "Tuesday";
        if(dayNum == "3") return "Wednesday";
        if(dayNum == "4") return "Thursday";
        if(dayNum == "5") return "Friday";
        if(dayNum == "6") return "Saturday";
      },
      dateFormat: function(date) {
        return moment(date).format("MMM DD, YYYY");
      }
    }
  });
  app.engine(config.HBExtName, hbs.engine);
  app.set('views', path.join(__dirname, config.viewsDir));
  app.set('view engine', config.HBExtName);

  // app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, config.publicDir)));

  // development error handler; will print stacktrace
  if (app.get('env') === config.devEnv) {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render(config.errorView, {
        message: err.message,
        error: err,
        title: config.errorTitle
      });
    });

    app.use(session({secret: config.sessionSecret}));
  } else {
    // production error handler; no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render(config.errorView, {
        message: err.message,
        error: {},
        title: config.errorTitle
      });
    });

    app.use(session({
      secret: config.sessionSecret,
      store: new MongoConnect({db: db, stringify: true})
    }));
  }

  auth.auth(app, db);
  require(config.routesJS)(app, express, db);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
});

module.exports = app;