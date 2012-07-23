var Statuses = function () { }

Statuses.prototype.add = function (options) {
    $.ajax({
        url: '/status.asmx/echo',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: '{ "text": "' + options.text + '" }',
        success: options.success
    });
}

$(document).ready(function () {
    var statuses = new Statuses();

    $('#new-status').submit(function (e) {
        e.preventDefault();
        statuses.add({
            text: $(this).find('textarea').val(),
            success: function (data) {
                $('#statuses').append('<li>' + data.d + '</li>');
                $(this).find('textarea').val('');
            }
        });
    });
});