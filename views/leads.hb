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
              <form action="{{config.newLeadRoute}}" method="post">
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
                <td class="text-center number"><span>{{@index}}</span><a href="{{config.removeLeadRoute}}" class="hidden remove">&times;</a></td>
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
  $(document).on({mouseenter: toggleButton, mouseleave: toggleButton}, "td.number");
  function toggleButton() {
    $(this).children().toggleClass("hidden");
  }

  $(document).on("click", "td .remove", function(e) {
    e.preventDefault();
    var email = {email: $(this).parent().next().text()};
    callServer("{{config.removeLeadRoute}}", email);
    $(this).parent().parent().remove();
  });

  $(document).on("submit", "tbody form", function(e) {
    e.preventDefault();
    var email = $("input[name=email]").val(),
        firstName = $("input[name=firstName]").val(),
        lastName = $("input[name=lastName]").val(),
        company = $("input[name=company]").val(),
        title = $("input[name=title]").val(),
        leadInfo = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          company: company,
          title: title
        };

    callServer("{{config.newLeadRoute}}", leadInfo);

    var newLeadNum = parseInt($("tbody .text-center").last().text()) + 1;
    var newLeadRow = "<tr><td class='text-center number'><span>" + newLeadNum + "</span><a href='{{config.removeLeadRoute}}' class='hidden remove'>&times;</a></td>";
        newLeadRow += "<td>" + email + "</td>";
        newLeadRow += "<td>" + firstName + "</td>";
        newLeadRow += "<td>" + lastName + "</td>";
        newLeadRow += "<td>" + company + "</td>";
        newLeadRow += "<td>" + title + "</td>";
    $(newLeadRow).insertAfter($("tbody tr").last());

    $("input").val("");
  });

  function callServer(route, data) {
    $.ajax({
      type: "POST",
      url: route,
      data: data,
    }).done();
  }
</script>

