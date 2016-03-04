// var templates = {{{templatesJSON}}};

$(document).on("click", ".campaign .glyphicon-edit", function(e) {
  $(".modal").modal("show");
  var templateName = $(this).prev().prev().text(),
      nameField = $(".modal input[name='name']"),
      subjectField = $(".modal input[name='subject']"),
      messageField = $(".modal textarea");

  nameField.val(templateName).attr("disabled", "true");

  for (var i = 0; i < templates.length; i++) {
    if(templates[i].name === templateName) {
      subjectField.val(templates[i].subject);
      messageField.val(templates[i].body);
      break;
    }
  };
});

$(document).on("click", ".campaign .glyphicon-trash", function(e) {
  var templateName = $(this).prev().text();

  $.ajax({
    type: "POST",
    url: "{{config.removeTemplateRoute}}",
    data: {templateName: templateName}
  }).done();

  $(this).parent().parent().remove();
});

$(document).on("click", "#render-template-form", function(e) {
  $(".modal input, .modal textarea").removeAttr("disabled").val("");
});

$(document).on("submit", "#template-form", function(e) {
  var lastTemplate = $(".campaign").last(),
      newTemplate = lastTemplate.clone(),
      name = $(this.name).val(),
      subject = $(this.subject).val();

  $($(newTemplate.children()[0]).children()[0]).text(name);
  $(newTemplate.children()[1]).text(subject);
  newTemplate.insertAfter(lastTemplate);
});

$(document).on("click", "#new-touch", function(e) {
  e.preventDefault();

  var touches = $(".touches"),
      form = $(".form-horizontal"),
      lastTouch = touches.length,
      oldClass = "touch-" + lastTouch.toString(),
      newClass = "touch-" + (lastTouch + 1).toString();

  touches.last().clone().removeClass(oldClass).addClass(newClass).insertAfter(touches.last());

  var noReplyDays = $(".noReplyDays");
  noReplyDays.removeClass("hidden");
  noReplyDays.last().addClass("hidden");

  var noReplyDaysInput = $("input[name=noReplyDays]");
  noReplyDaysInput.attr("required", "true");
  noReplyDaysInput.last().removeAttr("required");

  var label = $("label[for=touch]"),
      removeTouch = '<a class="btn btn-link" id="remove-touch">&times;</a>';

  label.last().text(newClass.replace("-", " ").replace("t", "T"));
  $(removeTouch).prependTo(label.last());
});

$(document).on("click", "#remove-touch", function(e) {
  this.parentNode.parentNode.parentNode.remove();
  $(".noReplyDays").last().addClass("hidden");
});
