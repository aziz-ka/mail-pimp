// var templates = {{{templatesJSON}}};
var emailSubject = $("#email-form input[name='subject']");
var emailMessage = $("#email-form textarea");

$("#select-templates").on("change", function(e) {
  var subject = e.target.value;
  for (var i = 0; i < templates.length; i++) {
    if(subject === templates[i].name) {
      var selectedSubject = templates[i].subject;
      var selectedMessage = templates[i].body;
      emailSubject.val(selectedSubject);
      emailMessage.val(selectedMessage);
    }
  };
  if(subject === "null") {
    emailSubject.val("");
    emailMessage.val("");
  }
});

$("#email-inserts span").on("click", function(e) {
  var insert = $(this).text();
  emailMessage.val(emailMessage.val() + insert);
});

$("#email-form").on("submit", function(e) {
  e.preventDefault();

  var email = {
    address: $(this.address).val(),
    subject: $(this.subject).val(),
    message: $(this.message).val()
  };

  $.ajax({
    type: "POST",
    url: "{{config.sendEmailRoute}}",
    data: email
  }).done();

  $("input, textarea").val("");
  $("select").prop("selectedIndex", 0);
});
