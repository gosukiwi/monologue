$(document).ready(function () {
    $('#new-status').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: '/status.asmx/echo',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: '{ "text": "' + $(this).find('textarea').val() + '" }',
            success: function (data) {
                $('#statuses').append('<li>' + data.d + '</li>');
                $(this).find('textarea').val('');
            }
        });
    });
});