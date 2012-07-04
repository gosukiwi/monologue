var Statuses = function() {};
Statuses.prototype.add = function(options) {
    $.ajax({
        url: '/statuses',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
};

var NewStatusView = function(el, statuses) {
    this.el = el;
    this.statuses = statuses;

    Simple.events.on("success", this.reset, this);

    var add = $.proxy(this.addStatus, this);
    this.el.submit(add);
};
NewStatusView.prototype.addStatus = function(e) {
    e.preventDefault();

    this.statuses.add({
        text: this.text(),
        success: function(data) {
            Simple.events.trigger("success", data.text);
        }
    });
};
NewStatusView.prototype.text = function() {
    return this.DOM('textarea').val();
};
NewStatusView.prototype.reset = function() {
    this.DOM('textarea').val("");
};
NewStatusView.prototype.DOM = function(selector) {
    return this.el.find(selector);
};

var StatusesView = function(el, statuses) {
    this.el = el;
    this.statuses = statuses;

    Simple.events.on("success", this.appendStatus, this);
};
StatusesView.prototype.appendStatus = function(text) {
    this.el.append('<li>' + text + '</li>');
};

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView($("#new-status"), statuses);
    new StatusesView($("#statuses"), statuses);
});
