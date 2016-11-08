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

    window.GuestCollection = Backbone.Collection.extend({
        model: Guest,
        parse: function (response) {
            return response;
        }
    });

    window.HostCollection = Backbone.Collection.extend({
        model: Host,
        parse: function (response) {
            return response;
        }
    });

    window.CarCollection = Backbone.Collection.extend({
        model: Car,
        parse: function (response) {
            return response;
        }
    });

    window.FeatureCollection = Backbone.Collection.extend({
        model: Feature,
        parse: function (response) {
            return response;
        }
    });
});