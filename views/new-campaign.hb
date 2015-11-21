{{> navbar}}
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <h2>New campaign</h2>
      <br>
      <form action="{{config.launchCampaignRoute}}" method="post" class="form-horizontal">
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
          <div class="panel-heading">
            <strong>{{this.name}}</strong>
            <span class="glyphicon glyphicon-trash pull-right"></span>
            <span class="glyphicon glyphicon-edit pull-right">&nbsp;</span>
          </div>
          <div class="panel-body">{{this.subject}}</div>
        </div>
      {{/each}}
      <button type="button" class="btn btn-link pull-right new-template" data-toggle="modal" data-target="#new-template"><span class="glyphicon glyphicon-plus"></span>&nbsp;New Template</button>
    </div>
  </div>

  {{> new-email-template}}
</div>

<script>
  var templates = {{{templatesJSON}}};

  $(document).on("click", ".glyphicon-edit", function(e) {
    $(".modal").modal("show");
    var templateName = $(this).prev().prev().text(),
        nameField = $(".modal input[name='name']"),
        subjectField = $(".modal input[name='subject']"),
        messageField = $(".modal textarea");

    nameField.val(templateName).attr("disabled", "true");

    for (var i = 0; i < templates.length; i++) {
      if(templates[i].name === templateName) {
        subjectField.val(templates[i].subject);
        messageField.val(templates[i].body);
        break;
      }
    };
  });

  $(document).on("click", ".glyphicon-trash", function(e) {
    var templateName = $(this).prev().text();

    $.ajax({
      type: "POST",
      url: "{{config.removeTemplateRoute}}",
      data: {templateName: templateName}
    }).done();

    $(this).parent().parent().remove();
  });

  $(document).on("click", ".new-template", function(e) {
    $(".modal input, .modal textarea").removeAttr("disabled").val("");
  });

  $(document).on("click", ".new-touch", function(e) {
    e.preventDefault();

    var touches = $(".touches"),
        form = $(".form-horizontal"),
        lastTouch = touches.length,
        oldClass = "touch-" + lastTouch.toString(),
        newClass = "touch-" + (lastTouch + 1).toString();

    touches.last().clone().removeClass(oldClass).addClass(newClass).insertAfter(touches.last());

    var noReplyDays = $(".noReplyDays");
    noReplyDays.removeClass("hidden");
    noReplyDays.last().addClass("hidden");

    var noReplyDaysInput = $("input[name=noReplyDays]");
    noReplyDaysInput.attr("required", "true");
    noReplyDaysInput.last().removeAttr("required");

    var label = $("label[for=touch]"),
        removeBtn = '<a class="btn btn-link">&times;</a>';

    label.last().text(newClass.replace("-", " ").replace("t", "T"));
    $(removeBtn).prependTo(label.last());
  });

  $(document).on("click", "label a.btn", function(e) {
    this.parentNode.parentNode.parentNode.remove();
    $(".noReplyDays").last().addClass("hidden");
  });

  $(document).on("click", ".panel-body span", function(e) {
    var messageField = $("textarea"),
        insert = $(this).text();

    messageField.val(messageField.val() + insert);
  });
</script>



