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
    config = require("./config.js"),
    Auth = require("./auth.js"),
    auth = new Auth();

MongoClient.connect(config.dbUrl, function(err, db) {
  if(err) throw err;

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // view engine setup
  var hbs = handlebars.create({
    extname: '.hb',
    defaultLayout: 'main',
    partialsDir: ['views/partials/'],
    helpers: {
      dayOfWeek: function(dayNum) {
        if(dayNum == "0") return "Sunday";
        if(dayNum == "1") return "Monday";
        if(dayNum == "2") return "Tuesday";
        if(dayNum == "3") return "Wednesday";
        if(dayNum == "4") return "Thursday";
        if(dayNum == "5") return "Friday";
        if(dayNum == "6") return "Saturday";
      }
    }
  });
  app.engine('hb', hbs.engine);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hb');

  // app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // development error handler; will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });

    app.use(session({secret: config.sessionSecret}));
  } else {
    // production error handler; no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
    });

    app.use(session({
      secret: config.sessionSecret,
      store: new MongoConnect({db: db, stringify: true})
    }));
  }

  auth.auth(app, db);
  require('./routes/routes')(app, express, db);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
});

module.exports = app;