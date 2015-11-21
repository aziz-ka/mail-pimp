var config = require("./config.js")();

module.exports = function(db) {
  var users = db.collection(config.users);

  this.newTemplate = function(user, template) {
    var templateModel = {
      name: template.name,
      subject: template.subject,
      body: template.body
    };

    if(template.update === "true") {
      users.update({"googleId": user.googleId, "templates.name": template.name}, {$set: {"templates.$": templateModel}});
    } else {
      users.update({"googleId": user.googleId}, {$addToSet: {"templates": templateModel}});
    }
  };

  this.getTemplates = function(user) {
    users.findOne({"googleId": user.googleId}, function(err, user) {
      if(err) return err;
      return user;
    });
  };

  this.removeTemplate = function(user, template) {
    users.update({"googleId": user.googleId}, {$pull: {"templates": {"name": template.templateName}}});
  };
};