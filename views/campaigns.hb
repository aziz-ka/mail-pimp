{{> navbar}}
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <div class="text-right">
        <a href="/campaigns/new" class="btn btn-primary" role="button"><span class="glyphicon glyphicon-plus"></span>&nbsp;New campaign</a>
      </div>
      <br>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr class="active">
              <th>Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {{#each campaigns}}
              <tr>
                <td><a href="#">{{this.name}}</a></td>
                <td>{{dateFormat this.created}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>