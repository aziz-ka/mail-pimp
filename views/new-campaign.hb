{{> navbar}}
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <h2>New campaign</h2>
      <br>
      <form action="/launch-campaign" method="post" class="form-horizontal">
        <div class="form-group">
          <label for="capmaignName" class="control-label col-xs-4">Campaign name</label>
          <div class="col-xs-8">
            <input type="text" name="campaignName" class="form-control" required>
          </div>
        </div>
        <div class="form-group">
          <label for="schedule" class="control-label col-xs-4">Schedule</label>
          <div class="col-xs-8">
            <select name="schedule" id="" class="form-control">
            <option value="">No schedule</option>
              {{#each schedules}}
                <option value="{{this.name}}">{{this.name}}</option>
              {{/each}}
            </select>
          </div>
        </div>
        <div class="touches touch-1">
          <div class="form-group">
            <label for="touch" class="control-label col-xs-4">Touch 1</label>
            <div class="col-xs-8">
              <select name="touch" id="" class="form-control" required>
                {{#each templates}}
                  <option value="{{this.name}}">{{this.name}}</option>
                {{/each}}
              </select>
            </div>
          </div>
          <div class="form-group noReplyDays hidden">
            <div class="col-xs-offset-4 col-xs-8">
              <span>If no reply in&nbsp;</span>
              <input type="text" name="noReplyDays" class="form-control" style="width: 40px; display: inline">
              <span>&nbsp;days</span>
            </div>
          </div>
        </div>
        <br><br>
        <button class="btn btn-link new-touch"><span class="glyphicon glyphicon-plus"></span>&nbsp;Add Touch</button>
        <button type="submit" class="btn btn-primary pull-right launchCampaign">Launch</button>
      </form>
    </div>
    <div class="col-xs-12 col-sm-6">
      <h2 class="text-right">Email templates</h2>
      <br>
      {{#each templates}}
        <div class="panel panel-default">
          <div class="panel-heading"><strong>{{this.name}}</strong></div>
          <div class="panel-body">{{this.subject}}</div>
        </div>
      {{/each}}
      <button type="button" class="btn btn-link pull-right" data-toggle="modal" data-target="#new-template"><span class="glyphicon glyphicon-plus"></span>&nbsp;New Template</button>
    </div>
  </div>

  <div class="modal fade" id="new-template" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
          <form action="/new-template" method="post">
            <div class="form-group">
              <label for="name">Template name</label>
              <input type="text" name="name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" name="subject" class="form-control" required>
            </div>
            <div class="form-group col-xs-8">
              <br>
              <label for="message">Message</label>
              <textarea name="message" rows="10" class="form-control" required></textarea>
            </div>
            <div class="panel panel-default">
              <br>
              <div class="panel-body">
                <span class="text-primary">&lcub;&lcub;first_name&rcub;&rcub;</span><br>
                <span class="text-primary">&lcub;&lcub;last_name&rcub;&rcub;</span><br>
                <span class="text-primary">&lcub;&lcub;company_name&rcub;&rcub;</span><br>
                <span class="text-primary">&lcub;&lcub;email&rcub;&rcub;</span><br>
                <span class="text-primary">&lcub;&lcub;address&rcub;&rcub;</span><br>
                <span class="text-primary">&lcub;&lcub;phone&rcub;&rcub;</span><br>
                <span class="text-primary">&lcub;&lcub;website&rcub;&rcub;</span><br>
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>          
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // var schedules = {{{schedulesJSON}}}
  // console.log(schedules);
  // $("select[name='schedule']").change(function(e) {
  //   var pickedSchedule = e.target.selectedIndex;
  //   var schedule = temp1[pickedSchedule - 1];
  //   console.log(temp1[pickedSchedule - 1]);
  //   for(var keys in schedule.timeSlots) {
  //     if(schedule.timeSlots[keys]) {
  //       console.log(keys, schedule.timeSlots[keys]);
  //     }
  //   }
  // })

  $(".new-touch").click(function(e) {
    e.preventDefault();
    var touches = $(".touches");
    var form = $(".form-horizontal");
    var lastTouch = touches.length;
    var oldClass = "touch-" + lastTouch.toString();
    var newClass = "touch-" + (lastTouch + 1).toString();
    touches.last().clone().removeClass(oldClass).addClass(newClass).insertAfter(touches.last());

    var noReplyDays = $(".noReplyDays");
    noReplyDays.removeClass("hidden");
    noReplyDays.last().addClass("hidden");

    var noReplyDaysInput = $("input[name='noReplyDays']");
    noReplyDaysInput.attr("required", "true");
    noReplyDaysInput.last().removeAttr("required");

    var label = $("label[for='touch']");
    label.last().text(newClass.replace("-", " ").replace("t", "T"));
  });

  $(".panel-body span").click(function(e) {
    var messageField = $("textarea");
    var insert = $(this).text();
    messageField.val(messageField.val() + insert);
  });
</script>


