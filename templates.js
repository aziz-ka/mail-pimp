module.exports = function(db) {
  var users = db.collection("users");

  this.newTemplate = function(template, user) {
    var templateModel = {
      name: template.name,
      subject: template.subject,
      body: template.message
    };

    users.update({"googleId": user.googleId}, {$addToSet: {"templates": templateModel}});
  };

  this.getTemplates = function(user) {
    users.findOne({"googleId": user.googleId}, function(err, user) {
      if(err) return err;
      // callback(err, user);
      return user;
    });
  };
};