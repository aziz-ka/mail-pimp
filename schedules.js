module.exports = function(db) {
  var users = db.collection("users");

  this.newSchedule = function(user, body) {
    var scheduleModel = {
      name: body.scheduleName,
      timeZone: body.timeZone,
      timeSlots: {
        mon: body.monday,
        tue: body.tuesday,
        wed: body.wednesday,
        thu: body.thursday,
        fri: body.friday,
        sat: body.saturday,
        sun: body.sunday
      }
    };

    users.update({"googleId": user.googleId}, {$addToSet: {"schedules": scheduleModel}});
  };
};