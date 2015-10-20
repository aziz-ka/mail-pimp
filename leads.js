var config = require("./config.js")();

module.exports = function(db) {
  var users = db.collection(config.users);

  this.newLead = function(user, body) {
    var leadModel = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      company: body.company,
      title: body.title,
      results: {
        opened: false,
        replied: false,
        bounced: false,
        optOut: false
      }
    };

    users.update({"googleId": user.googleId}, {$addToSet: {"leads": leadModel}});
  };
};