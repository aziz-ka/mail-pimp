{{> navbar}}
<div class="container-fluid">
  <div class="row">
    <h1 class="col-xs-12">Send email
      <button type="button" class="btn btn-link pull-right" data-toggle="modal" data-target="#new-template"><span class="glyphicon glyphicon-plus"></span>&nbsp;New template</button>
    </h1>
    <div class="col-xs-12">
      <form method="post" action="{{config.sendEmailRoute}}" enctype="multipart/form-data" id="email-form">
        <div class="form-group">
          <label for="address">Email</label>
          <input type="email" name="address" class="form-control" placeholder="john.smith@example.com" multiple required>
        </div>
        <div class="form-group">
          <label for="templates">Template</label>
          <select name="templates" id="select-templates" class="form-control">
            <option value="null"></option>
            {{#each templates}}
              <option value="{{this.name}}">{{this.name}}</option>
            {{/each}}
          </select>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" name="subject" class="form-control" placeholder="Hello there" required>
        </div>
        <div class="form-group">
          <label for="attachment">Attachment</label>
          <input type="file" name="attachment" class="form-control" disabled>
        </div>
        <div class="form-group col-xs-8">
          <br>
          <label for="message">Message</label>
          <textarea name="message" id=""  class="form-control" rows="10" placeholder="Plain texr or HTML" required></textarea>
        </div>
        <div class="panel panel-default">
          <br>
          <div class="panel-body" id="email-inserts">
            <p></p>
            <span class="text-primary">&lcub;&lcub;first_name&rcub;&rcub;</span><br>
            <span class="text-primary">&lcub;&lcub;last_name&rcub;&rcub;</span><br>
            <span class="text-primary">&lcub;&lcub;company&rcub;&rcub;</span><br>
            <span class="text-primary">&lcub;&lcub;email&rcub;&rcub;</span><br>
            <span class="text-primary">&lcub;&lcub;address&rcub;&rcub;</span><br>
            <span class="text-primary">&lcub;&lcub;phone&rcub;&rcub;</span><br>
            <span class="text-primary">&lcub;&lcub;website&rcub;&rcub;</span><br>
          </div>
        </div>

        <button class="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  </div>

  {{> new-template}}
</div>

<script> var templates = {{{templatesJSON}}}; </script>
<script src="../js/email.js"></script>

