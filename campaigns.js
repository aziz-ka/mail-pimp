var Emailer = require("./email.js");

module.exports = function(db) {
  var users = db.collection("users");
  var email = new Emailer();

  this.launchCampaign = function(user, body, tokens) {
    var today = new Date();
    var that = this;

    var campaignModel = {
      name: body.campaignName,
      created: today,
      active: true,
      schedule: body.schedule,
      touches: this.touchDetails(body)
    };

    users.findAndModify({"googleId": user.googleId}, ["_id", "1"], {$addToSet: {"campaigns": campaignModel}}, {new: true}, function(err, result) {
      if(err) throw err;
      var updatedUser = result.value;

      // if has noReplyDays
      if(campaignModel.touches.length > 1) {
        var campaignsLength = updatedUser.campaigns.length;
        var lastCampaign = updatedUser.campaigns[campaignsLength - 1];
        var prevDayFromNowSum = 0;

        for (var i = 0; i < lastCampaign.touches.length; i++) {
          if(i === 0) {
            // send first touch according to schedule if there is one
            // else send right away
          } else {
            // send other touches according to their respective noReplyDays
            var templateName = lastCampaign.touches[i].templateName;
            var daysFromNow = lastCampaign.touches[i - 1].noReplyDays;

            // execute this.sendNextInQueue(updatedUser, templateName); in daysFromNow
            that.addToQueue(updatedUser, templateName, daysFromNow + prevDayFromNowSum, tokens);
            prevDayFromNowSum += daysFromNow;
          }
        }
      } else {
        // send the only touch according to schedule if there is one
        // else send right away
      }
    });
  };

  this.touchDetails = function(body) {
    var touches = [],
        results = {
          sent: 0,
          reached: 0,
          opened: 0,
          unopened: 0,
          replied: 0,
          bounced: 0,
          optedOut: 0
        };

    if(Array.isArray(body.touch)) {
      for (var i = 0; i < body.touch.length; i++) {
        var touch = {
          templateName: body.touch[i],
          noReplyDays: body.noReplyDays[i] !== "" ? parseInt(body.noReplyDays[i]) : null,
          results: results
        };
        touches.push(touch);
      }
    } else {
      var touch = {
        templateName: body.touch,
        noReplyDays: null,
        results: results
      };
      touches.push(touch);
    }

    return touches;
  };

  this.addToQueue = function(user, templateName, daysFromNow, tokens) {
    setTimeout(function() {
      sendNextInQueue(user, templateName);
    }, daysFromNow * 1000);

    function sendNextInQueue(user, templateName) {
      var silentLeads = [];
      var subject, body;

      // grab template's details for each particular touch
      for (var i = 0; i < user.templates.length; i++) {
        if(user.templates[i].name === templateName) {
          subject = user.templates[i].subject;
          body = user.templates[i].body;
        }
      }

      // push emails of leads who have neither replied nor opted out yet into silentLeads array
      for (var j = 0; j < user.leads.length; j++) {
        if(!user.leads[j].results.replied && !user.leads[j].results.optedOut) {
          silentLeads.push(user.leads[j].email);
        }
      }

      var emailAgain = {
        address: silentLeads,
        subject: subject,
        message: body
      };

      // ToDo: how to regenerate tokens?
      email.encodeMessage(emailAgain, null, tokens);
    }
  };
};