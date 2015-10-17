{{> navbar}}
<div class="container">
  <div class="row">
    <h1 class="col-xs-12">Send email
      <a href="/campaigns/new" class="btn btn-link pull-right"><span class="glyphicon glyphicon-plus"></span>&nbsp;New template</a>
    </h1>
    <div class="col-xs-12">
      <form method="post" action="/send" enctype="multipart/form-data">
        <div class="form-group">
          <label for="address">Email</label>
          <input type="email" name="address" class="form-control" multiple required>
        </div>
        <div class="form-group">
          <label for="templates">Templates</label>
          <select name="templates" id="" class="form-control">
            <option value="null"></option>
            {{#each templates}}
              <option value="{{this.name}}">{{this.name}}</option>
            {{/each}}
          </select>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" name="subject" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="attachment">Attachment</label>
          <input type="file" name="attachment" class="form-control">
        </div>
        <div class="form-group col-xs-8">
          <br>
          <label for="message">Message</label>
          <textarea name="message" id=""  class="form-control" rows="10" required></textarea>
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

<script>
  var user = {{{user}}};
  // console.log(user);
  var subjectField = $("input[name='subject']");
  var messageField = $("textarea");

  $("select").change(function(e) {
    var subject = e.target.value;
    for (var i = 0; i < user.templates.length; i++) {
      if(subject === user.templates[i].name) {
        var selectedSubject = user.templates[i].subject;
        var selectedMessage = user.templates[i].body;
        subjectField.val(selectedSubject);
        messageField.val(selectedMessage);
      }
    };
    if(subject === "null") {
      subjectField.val("");
      messageField.val("");
    }
  });

  $(".panel-body span").click(function(e) {
    var insert = $(this).text();
    messageField.val(messageField.val() + insert);
  });
</script>
