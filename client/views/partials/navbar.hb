<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-body" style="padding: 6px 8px;">
        <span class="sr-only">Toggle navigation menu</span>
        <span class="glyphicon glyphicon-menu-hamburger"></span>
      </button>
      <a href="/" class="navbar-brand">MailPimp</a>
    </div>

    <div class="collapse navbar-collapse" id="navbar-body">
      <ul class="nav navbar-nav">
        <li><a href="{{config.campaignsRoute}}">Campaigns</a></li>
        <li><a href="{{config.leadsRoute}}">Leads</a></li>
        <li><a href="{{config.schedulesRoute}}">Schedules</a></li>
        <li><a href="{{config.emailRoute}}">Email</a></li>
      </ul>
    </div>
  </div>
</nav>