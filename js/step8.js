var events = _.clone(Backbone.Events);

var Statuses = function () { }

Statuses.prototype.add = function (text) {
    $.ajax({
        url: '/status.asmx/echo',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: '{ "text": "' + text + '" }',
        success: function (data) {
            events.trigger('status:add', data.d);
        }
    });
}

var NewStatusView = function (options) {
    this.statuses = options.statuses;

    events.on('status:add', this.appendStatus, this);
    events.on('status:add', this.clearInput, this);

    var add = $.proxy(this.addStatus, this);
    $('#new-status').submit(add);
}

NewStatusView.prototype.addStatus = function (e) {
    e.preventDefault();
    this.statuses.add($('#new-status textarea').val());
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