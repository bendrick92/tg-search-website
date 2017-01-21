$(function () {
    window.AutoComplete = Backbone.RelationalModel.extend({
        initialize: function (options) {
            this.url = options.url;
        },
        url: function () {
            return this.url;
        },
        defaults: {
            results: []
        }
    });
});