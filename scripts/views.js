$(function () {
    window.EpisodeView = Backbone.View.extend({
        template: _.template($('#episodeTemplate').html()),
        render: function () {
            this.$el.append(this.template(this.model.attributes));

            this.model.get('guests').each(function (guest) {
                var guestView = new GuestView({ model: guest });
                console.log(guestView.render().el);
                this.$el.append(guestView.render().el);
            }, this);

            this.model.get('hosts').each(function (host) {
                var hostView = new HostView({ model: host });
                this.$el.append(hostView.render().el);
            }, this);

            this.model.get('cars').each(function (car) {
                var carView = new CarView({ model: car });
                this.$el.append(carView.render().el);
            }, this);

            this.model.get('features').each(function (feature) {
                var featureView = new FeatureView({ model: feature });
                this.$el.append(featureView.render().el);
            }, this);

            return this;
        }
    });

    window.GuestView = Backbone.View.extend({
        template: _.template($('#guestTemplate').html()),
        render: function () {
            this.el = $(this.template(this.model.attributes));
            return this;
        }
    });

    window.HostView = Backbone.View.extend({
        template: _.template($('#hostTemplate').html()),
        render: function () {
            this.el = $(this.template(this.model.attributes));
            return this;
        }
    });

    window.CarView = Backbone.View.extend({
        template: _.template($('#carTemplate').html()),
        render: function () {
            this.el = $(this.template(this.model.attributes));
            return this;
        }
    });

    window.FeatureView = Backbone.View.extend({
        template: _.template($('#featureTemplate').html()),
        render: function () {
            this.el = $(this.template(this.model.attributes));
            return this;
        }
    });

    window.EpisodesView = Backbone.View.extend({
        template: _.template($('#episodesTemplate').html()),
        render: function () {
            this.$el.empty();
            this.collection.each(function (episode) {
                var episodeView = new EpisodeView({ model: episode });
                this.$el.append(episodeView.render().el);
            }, this);
            return this;
        }
    })
});