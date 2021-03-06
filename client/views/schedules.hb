{{> navbar}}
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <h2>New schedule</h2>
      <br>
      <form action="{{config.newScheduleRoute}}" method="post" class="form-horizontal" id="schedule-form">
        <div class="form-group">
          <label for="scheduleName" class="control-label col-xs-4">Name</label>
          <div class="col-xs-8">
            <input type="text" name="scheduleName" class="form-control" required>
          </div>
        </div>
        <div class="form-group">
          <label for="timeZone" class="control-label col-xs-4">Time zone</label>
          <div class="col-xs-8">
            <select name="timeZone" id="" class="form-control">
              <option value="newYork">New York, NY</option>
              <option value="chicago">Chicago, IL</option>
              <option value="la">Los Angeles, CA</option>
            </select>
          </div>
        </div>
        <br><br>
        <div class="form-group">
          <label for="" class="col-xs-4 col-xs-offset-4">From</label>
          <label for="" class="col-xs-4">To (optional)</label>
        </div>
        <div class="form-group">
          <label for="monday" class="control-label col-xs-4">Monday</label>
          <div class="col-xs-4">
            <input type="time" name="monday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <div class="form-group">
          <label for="tuesday" class="control-label col-xs-4">Tuesday</label>
          <div class="col-xs-4">
            <input type="time" name="tuesday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <div class="form-group">
          <label for="wednesday" class="control-label col-xs-4">Wednesday</label>
          <div class="col-xs-4">
            <input type="time" name="wednesday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <div class="form-group">
          <label for="thursday" class="control-label col-xs-4">Thursday</label>
          <div class="col-xs-4">
            <input type="time" name="thursday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <div class="form-group">
          <label for="friday" class="control-label col-xs-4">Friday</label>
          <div class="col-xs-4">
            <input type="time" name="friday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <div class="form-group">
          <label for="saturday" class="control-label col-xs-4">Saturday</label>
          <div class="col-xs-4">
            <input type="time" name="saturday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <div class="form-group">
          <label for="sunday" class="control-label col-xs-4">Sunday</label>
          <div class="col-xs-4">
            <input type="time" name="sunday" class="form-control from-slot" step="3600">
          </div>
          <div class="col-xs-4">
            <input type="time" class="form-control" step="3600">
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right new-schedule">Save</button>
        <a class="btn btn-link pull-right" id="clear">Clear</a>
      </form>
    </div>

    <div class="col-xs-12 col-sm-6">
      <h2 class="text-right">All schedules</h2>
      <br>
      {{#each schedules}}
        <div class="panel panel-default schedules">
          <div class="panel-heading">
            <strong>{{this.name}}</strong>
            <span class="glyphicon glyphicon-trash pull-right"></span>
            <span class="glyphicon glyphicon-edit pull-right">&nbsp;</span>
          </div>
          <div class="panel-body">
            {{#each this.timeSlots}}
              {{#if this}}
                {{#if @key}}
                  {{#dayOfWeek @key}}&nbsp;
                    {{dayNum}}
                  {{/dayOfWeek}}
                {{/if}}
              {{/if}}
            {{/each}}
          </div>
        </div>
      {{/each}}
    </div>
  </div>
</div>

<script>
  var schedules = {{{schedulesJSON}}},
      removeScheduleRoute = "{{config.removeScheduleRoute}}",
      newScheduleRoute = "{{config.newScheduleRoute}}";
</script>
<script src="../js/schedules.js"></script>

