<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <h1>Welcome to {{title}}</h1>
      {{#unless user}}
        <a href="{{config.googleAuth}}">Login with Google</a>
      {{/unless}}
    </div>
  </div>
</div>
