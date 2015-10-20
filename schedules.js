var config = require("./config.js")();

module.exports = function(db) {
  var users = db.collection(config.users);

  this.newSchedule = function(user, body) {
    var scheduleModel = {
      name: body.scheduleName,
      timeZone: body.timeZone,
      timeSlots: {
        1: body.monday,
        2: body.tuesday,
        3: body.wednesday,
        4: body.thursday,
        5: body.friday,
        6: body.saturday,
        0: body.sunday
      }
    };

    users.update({"googleId": user.googleId}, {$addToSet: {"schedules": scheduleModel}});
  };
};