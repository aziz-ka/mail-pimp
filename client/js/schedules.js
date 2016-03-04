var scheduleName = "input[name=scheduleName]",
    update = false;

$(".schedules .glyphicon-edit").on("click", function(e) {
  var index = $(".schedules .glyphicon-edit").index(this),
      slots = schedules[index].timeSlots,
      name = schedules[index].name,
      count = 6;

  update = true;
  $(scheduleName).val(name).attr("disabled", true);

  for(var key in slots) {
    var nextSlot = $(".from-slot")[count];
    $(nextSlot).val(slots[key]);
    count >= 6 ? count = 0 : count++;
  }
});

$(".schedules .glyphicon-trash").on("click", function(e) {
  if(window.confirm("Delete this schedule?")) {
    var name = this.parentNode.innerText.trim();

    callServer(removeScheduleRoute, {name: name});
    
    this.parentNode.parentNode.remove();
  }
});

$("#clear").on("click", function(e) {
  $("#schedule-form input").val("");
  $(scheduleName).removeAttr("disabled");
  update = false;
});

$("#schedule-form").on("submit", function(e) {
  e.preventDefault();
  var scheduleData = {
    scheduleName: $(this.scheduleName).val(),
    timeZone: $(this.timeZone).val(),
    monday: $(this.monday).val(),
    tuesday: $(this.tuesday).val(),
    wednesday: $(this.wednesday).val(),
    thursday: $(this.thursday).val(),
    friday: $(this.friday).val(),
    saturday: $(this.saturday).val(),
    sunday: $(this.sunday).val(),
    update: update
  };

  callServer(newScheduleRoute, scheduleData);

  if(!update) {
    $(".schedules").last().clone().insertAfter($(".panel").last());
    $(".schedules .panel-heading strong").last().text($(scheduleName).val());
    var scheduledDays = "";
    for(var key in scheduleData) {
      if(/day/.test(key) && scheduleData[key]) {
        scheduledDays += capitalizeFirstLetter(key + " ");
      }
    }
    $(".schedules .panel-body").last().text(scheduledDays);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $("input").val("");
});

function callServer(route, data) {
  $.ajax({
    type: "POST",
    url: route,
    data: data,
  }).done();
}
