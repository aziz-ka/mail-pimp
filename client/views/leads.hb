{{> navbar}}
<br><br>
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr class="active">
              <th></th>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Company</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <form action="{{config.newLeadRoute}}" method="post" id="lead-form">
                <td class="text-center"><button class="btn btn-default" type="submit" style="padding: 2px 6px; font-size: 12px;"><span class="glyphicon glyphicon-save"></span></button></td>
                <td><input type="email" name="email" placeholder="john.smith@email.com" required></td>
                <td><input type="text" name="firstName" placeholder="John"></td>
                <td><input type="text" name="lastName" placeholder="Smith"></td>
                <td><input type="text" name="company" placeholder="Company, Inc."></td>
                <td><input type="text" name="title" placeholder="CEO"></td>
              </form>
            </tr>
            {{#each leads}}
              <tr>
                <td class="text-center" id="number-column"><span>{{@index}}</span><a href="{{config.removeLeadRoute}}" class="hidden" id="remove">&times;</a></td>
                <td>{{this.email}}</td>
                <td>{{this.firstName}}</td>
                <td>{{this.lastName}}</td>
                <td>{{this.company}}</td>
                <td>{{this.title}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<script>
  var removeLeadRoute = "{{config.removeLeadRoute}}",
      newLeadRoute = "{{config.newLeadRoute}}";
</script>

<script src="../js/leads.js"></script>

