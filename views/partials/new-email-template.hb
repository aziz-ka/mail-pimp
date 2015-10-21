<div class="modal fade" id="new-template" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
        <form action="{{config.newTemplateRoute}}" method="post">
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