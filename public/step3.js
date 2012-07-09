var Statuses = function() {};
Statuses.prototype.add = function(options) {
  $.ajax({
    url: '/status',
    type: 'POST',
    dataType: 'json',
    data: { text: options.text },
    success: options.success
  });
}

jQuery(function() {
    var statuses = new Statuses();

    $("#new-status").submit(function(e) {
        e.preventDefault();

        statuses.add({
          text: $(this).find('textarea').val(),
          success: function(data) {
            $("#statuses").append('<li>' + data.text + '</li>');
            $("#new-status textarea").val("");
          }
        });
    });
});
