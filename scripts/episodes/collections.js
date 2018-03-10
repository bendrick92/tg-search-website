$(function () {
    window.EpisodeCollection = Backbone.Collection.extend({
        model: Episode,
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