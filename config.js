module.exports = function() {
  var devEnv = "development",
      publicDir = "public",
      privateDir = "./private",
      routesDir = "./routes",
      stylesDir = "./" + publicDir + "/css",
      viewsDir = "views";
  
  var config = {
    // directories
    publicDir: publicDir,
    routesDir: routesDir,
    stylesDir: stylesDir,
    uploadsDir: "./uploads", /* / */
    viewsDir: viewsDir,
    // modules
    appJS: "./app.js",
    routesJS: routesDir + "/routes",
    authJS: "./auth.js",
    emailJS: "./email.js",
    emailTemplatesJS: "./templates.js",
    campaignsJS: "./campaigns.js",
    leadsJS: "./leads.js",
    schedulesJS: "./schedules",
    settings: privateDir + "/settings.json",
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
    HBPartialsDir: viewsDir + "/partials",
    HBDefaultLayout: "main",
    // routes.js
    googleScopes: ["https://www.googleapis.com/auth/userinfo.email", "https://mail.google.com"],
    googleAuth: "/auth/google",
    googleAuthCB: "/auth/google/callback",
    indexRoute: "/",
    emailRoute: "/email",
    newTemplateRoute: "/new-template",
    sendEmailRoute: "/send",
    campaignsRoute: "/campaigns",
    newCampaignRoute: "/campaigns/new",
    launchCampaignRoute: "/launch-campaign",
    leadsRoute: "/leads",
    newLeadRoute: "/leads/new",
    schedulesRoute: "/schedules",
    newScheduleRoute: "/schedules/new",
    // gulpfile.js
    allStyles: stylesDir + "/*.scss",
  };

  return config;
};
