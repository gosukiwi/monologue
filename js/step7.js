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

var NewStatusView = function (options) {
    this.statuses = options.statuses;
    var add = $.proxy(this.addStatus, this);
    $('#new-status').submit(add);
}

NewStatusView.prototype.addStatus = function (e) {
    e.preventDefault();

    var that = this;

    this.statuses.add({
        text: $('#new-status textarea').val(),
        success: function (data) {
            that.appendStatus(data.d);
            that.clearInput();
        }
    });
}

NewStatusView.prototype.appendStatus = function (text) {
    $('#statuses').append('<li>' + text + '</li>');
}

NewStatusView.prototype.clearInput = function () {
    $(this).find('textarea').val('');
}

$(document).ready(function () {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
});