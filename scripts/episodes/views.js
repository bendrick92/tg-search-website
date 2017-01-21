$(function () {
    window.EpisodesView = Backbone.View.extend({
        initialize: function () {
            this.$el.empty();
            this.collection.each(function (episode) {
                var episodeView = new EpisodeView({ model: episode });
                this.$el.append(episodeView.render().el);
            }, this);
        },
        render: function () {
            return this;
        }
    });

    window.EpisodeView = Backbone.View.extend({
        template: _.template($('#episode-template').html()),
        attributes: function () {
            return {
                class: 'episode'
            };
        },
        render: function () {
            this.$el.append(this.template(this.model.attributes));

            return this;
        }
    });
});