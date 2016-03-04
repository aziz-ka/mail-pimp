$(document).on({mouseenter: toggleButton, mouseleave: toggleButton}, "td#number-column");

function toggleButton() {
  $(this).children().toggleClass("hidden");
}

$(document).on("click", "td #remove", function(e) {
  e.preventDefault();
  var email = {email: $(this).parent().next().text()};
  callServer("{{config.removeLeadRoute}}", email);
  $(this).parent().parent().remove();
});

$(document).on("submit", "#lead-form", function(e) {
  e.preventDefault();
  var email = $(this.email).val(),
      firstName = $(this.firstName).val(),
      lastName = $(this.lastName).val(),
      company = $(this.company).val(),
      title = $(this.title).val(),
      leadInfo = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        company: company,
        title: title
      };

  callServer("{{config.newLeadRoute}}", leadInfo);

  var newLeadNum = parseInt($("tbody .text-center").last().text()) + 1;
  var newLeadRow = "<tr><td class='text-center' id='number-column'><span>" + newLeadNum + "</span><a href='{{config.removeLeadRoute}}' class='hidden remove'>&times;</a></td>";
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
