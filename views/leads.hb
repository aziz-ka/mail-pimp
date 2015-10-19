{{> navbar}}
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
              <form action="/leads/new" method="post">
                <td><button class="btn btn-default" type="submit" style="padding: 2px 6px; font-size: 12px;"><span class="glyphicon glyphicon-save"></span></button></td>
                <td><input type="email" name="email" placeholder="john.smith@email.com" required></td>
                <td><input type="text" name="firstName" placeholder="John"></td>
                <td><input type="text" name="lastName" placeholder="Smith"></td>
                <td><input type="text" name="company" placeholder="Company, Inc."></td>
                <td><input type="text" name="title" placeholder="CEO"></td>
              </form>
            </tr>
            {{#each leads}}
              <tr>
                <td class="text-center">{{@index}}</td>
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
  $("tbody form").submit(function(e) {
    e.preventDefault();
    var email = $("input[name=email]").val(),
        firstName = $("input[name=firstName]").val(),
        lastName = $("input[name=lastName]").val(),
        company = $("input[name=company]").val(),
        title = $("input[name=title]").val();

    var leadInfo = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      company: company,
      title: title
    };

    $.ajax({
      type: "POST",
      url: "/leads/new",
      data: leadInfo,
    }).done(function(data) {
      console.log(data);
    });

    var newLeadNum = parseInt($("tbody .text-center").last().text()) + 1;
    var newLeadRow = "<tr><td class='text-center'>" + newLeadNum + "</td>";
        newLeadRow += "<td>" + email + "</td>";
        newLeadRow += "<td>" + firstName + "</td>";
        newLeadRow += "<td>" + lastName + "</td>";
        newLeadRow += "<td>" + company + "</td>";
        newLeadRow += "<td>" + title + "</td>";
    $(newLeadRow).insertAfter($("tbody tr").last());

    $("input").val("");
  });
</script>

