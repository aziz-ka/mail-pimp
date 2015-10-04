module.exports = function(db) {
  var users = db.collection("users");

  this.launchCampaign = function(user, body) {
    var today = new Date();

    var campaignModel = {
      name: body.campaignName,
      created: today,
      active: true,
      touches: touchDetails()
    };

    function touchDetails() {
      var touches = [];
      if(Array.isArray(body.touch)) {
        for (var i = 0; i < body.touch.length; i++) {
          var touch = {
            templateName: body.touch[i],
            noReplyDays: body.noReplyDays[i] !== "" ? body.noReplyDays[i] : null,
            results: {
              sent: 0,
              reached: 0,
              opened: 0,
              unopened: 0,
              replied: 0,
              bounced: 0,
              optedOut: 0
            }
          };
          touches.push(touch);
        }
      } else {
        var touch = {
          templateName: body.touch,
          noReplyDays: null,
          results: {
            sent: 0,
            reached: 0,
            opened: 0,
            unopened: 0,
            replied: 0,
            bounced: 0,
            optedOut: 0
          }
        };
        touches.push(touch);
      }
      return touches;
    }

    users.update({"googleId": user.googleId}, {$addToSet: {"campaigns": campaignModel}});
  };
};