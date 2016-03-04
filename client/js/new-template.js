$("#template-inserts span").on("click", function(e) {
  var templateMessage = $("#template-form textarea");
  var insert = $(this).text();
  templateMessage.val(templateMessage.val() + insert);
});

$(document).on("submit", "#template-form", function(e) {
  e.preventDefault();

  var template = {
    name: $(this.name).val(),
    subject: $(this.subject).val(),
    body: $(this.message).val(),
    update: $(this.name).attr("disabled") === "disabled"
  };

  $.ajax({
    type: "POST",
    url: newTemplateRoute,
    data: template
  }).done();

  $(".modal").modal("hide");
});