$(function () {
    window.LogCollection = Backbone.Collection.extend({
        model: Log,
        initialize: function (models, options) {
            this.url = options.url;
        },
        url: function () {
            return this.url;
        },
        parse: function (response) {
            return response;
        }
    });
});