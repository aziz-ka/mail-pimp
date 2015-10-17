var Emailer = require("./email.js"),
    moment = require("moment"),
    util = require("util");

module.exports = function(db) {
  var users = db.collection("users"),
      email = new Emailer();

  this.launchCampaign = function(user, body, tokens) {
    var today = new Date(),
        that = this,
        campaignModel = {
          name: body.campaignName,
          created: today,
          active: true,
          schedule: body.schedule,
          touches: this.touchDetails(body)
        };

    // using findAndModify because update does not return updated document in the callback
    users.findAndModify({"googleId": user.googleId}, ["_id", "1"], {$addToSet: {"campaigns": campaignModel}}, {new: true}, function(err, result) {
      if(err) throw err;
      var updatedUser = result.value,
          campaignsLength = updatedUser.campaigns.length,
          lastCampaign = updatedUser.campaigns[campaignsLength - 1],
          prevDayFromNowSum = 0;

      // if has noReplyDays (more than one touch)
      if(campaignModel.touches.length > 1) {
        for (var i = 0; i < lastCampaign.touches.length; i++) {
          var templateName = lastCampaign.touches[i].templateName;

          if(i === 0) {
            // send first touch as is
            sendTouch(templateName);
          } else {
            // send other touches according to their respective noReplyDays
            var daysFromNow = lastCampaign.touches[i - 1].noReplyDays;
            sendTouch(templateName, daysFromNow + prevDayFromNowSum);
            prevDayFromNowSum += daysFromNow;
          }
        }
      } else {
        sendTouch(lastCampaign.touches[0].templateName);
      }

      function sendTouch(templateName, daysFromNow) {
        if(campaignModel.schedule) {
          // send first (or the only) touch according to schedule if there is one
          that.getSchedule(updatedUser, campaignModel.schedule, templateName, tokens, daysFromNow);
        } else {
          // else send right away
          that.addToQueue(updatedUser, templateName, daysFromNow * 1000 || 0, tokens);
        }
      }
    });
  };

  this.getSchedule = function(user, scheduleName, templateName, tokens, daysFromNow) {
    var now = moment(),
        scheduleIdx,
        that = this,
        dayOfWeek = now.day(),
        keepGoing = true,
        count1 = 0, /* counts timeSlots key-values */
        count2 = 0; /* counts dayOfWeek's for moment().day() to calculate timeDiff */

    // find the matching schedule's index
    for (var i = 0; i < user.schedules.length; i++) {
      if(user.schedules[i].name === scheduleName) {
        scheduleIdx = i;
        break;
      }
    }
    var timeSlot = user.schedules[scheduleIdx].timeSlots;

    while(keepGoing) {
      // if timeSlot is empty move on to next one
      if(timeSlot[dayOfWeek + count1]) {
        var nextTimeSlot = moment().day(dayOfWeek + count2).hour(timeSlot[dayOfWeek + count1].substr(0, 2)).minute(0);
        var timeDiff = now.diff(nextTimeSlot);
        if(timeDiff < 0 && !daysFromNow) {
          // * 6 / 8640 converts daysFromNow in ms into minutes ms
          that.addToQueue(user, templateName, Math.abs(timeDiff * 6 / 8640), tokens);
          keepGoing = false;
          break;
        }
        if(timeDiff < 0 && daysFromNow) {
          count2 += daysFromNow;
          count1 = (count2 + dayOfWeek) % 7 - dayOfWeek - 1;
          count2--;
          daysFromNow = null;
          // ToDo: account for "gaps" in schedules between noReplyDays
        }
      }
      count1 + dayOfWeek >= 6 ? count1 = dayOfWeek * (-1) : count1++;
      count2++;
    }
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

  this.addToQueue = function(user, templateName, timeFromNow, tokens) {
    setTimeout(function() {
      sendNextInQueue(user, templateName);
    }, timeFromNow);

    function sendNextInQueue(user, templateName) {
      var silentLeads = [],
          subject, body;

      // grab template's details for each particular touch
      for (var i = 0; i < user.templates.length; i++) {
        if(user.templates[i].name === templateName) {
          subject = user.templates[i].subject;
          body = user.templates[i].body;
          break;
        }
      }

      // push emails of leads who have neither replied nor opted out yet into silentLeads array
      // ToDo: add campaign field to leads
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

      // ToDo: regenerate tokens?
      email.encodeMessage(emailAgain, null, tokens);
    }
  };
};