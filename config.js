module.exports = function() {
  var devEnv = "development",
      clientDir = "./client",
      privateDir = "./private",
      routesDir = "./routes",
      serverDir = "./server",
      uploadsDir = "./uploads",
      viewsDir = "/views",
      buildDir = "./build";
  
  var config = {
    // directories
    clientDir: clientDir,
    privateDir: privateDir,
    routesDir: routesDir,
    serverDir: serverDir,
    stylesDir: clientDir + "/css",
    viewsDir: clientDir + viewsDir,
    // modules
    appJS: "." + serverDir + "/app",
    routesJS: "." + routesDir + "/routes",
    authJS: "." + serverDir + "/auth",
    emailJS: "." + serverDir + "/email",
    emailTemplatesJS: "." + serverDir + "/templates",
    campaignsJS: "." + serverDir + "/campaigns",
    leadsJS: "." + serverDir + "/leads",
    schedulesJS: "." + serverDir + "/schedules",
    settings: "." + privateDir + "/settings",
    // collections
    users: "users",
    // app.js
    dbUrl: "mongodb://localhost:27017/contactly",
    sessionSecret: "secret",
    devEnv: devEnv,
    env: process.env.NODE_ENV || devEnv,
    port: process.env.PORT || 3000,
    HBExtName: "hb",
    errorView: "error",
    errorTitle: "error",
    HBLayoutsDir: clientDir + viewsDir + "/layouts",
    HBPartialsDir: clientDir + viewsDir + "/partials",
    HBDefaultLayout: "main",
    // routes.js
    googleScopes: ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"],
    googleAuth: "/auth/google",
    googleAuthCB: "/auth/google/callback",
    indexRoute: "/",
    emailRoute: "/email",
    newTemplateRoute: "/new-template",
    removeTemplateRoute: "/remove-template",
    sendEmailRoute: "/send",
    campaignsRoute: "/campaigns",
    newCampaignRoute: "/campaigns/new",
    launchCampaignRoute: "/campaigns/launch",
    leadsRoute: "/leads",
    newLeadRoute: "/leads/new",
    removeLeadRoute: "/leads/remove",
    schedulesRoute: "/schedules",
    newScheduleRoute: "/schedules/new",
    removeScheduleRoute: "/schedules/remove",
    // gulpfile.js
    startServer: "bin/www",
    buildDir: buildDir,
    buildJS: buildDir + "/js/**/*.js",
    serverJS: serverDir + "/**/*.js",
    srcJS: clientDir + "/js/**/*.js",
    srcSCSS: clientDir + "/css/**/*.scss",
    srcImg: clientDir + "/img/*.*",
    srcViews: clientDir + "/views/**/*.hb"
  };

  return config;
};
