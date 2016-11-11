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

            var guestsView = new GuestsView({ el: this.$('.guests'), collection: this.model.get('guests') });
            this.$('.guests').append(guestsView.render().el);

            var hostsView = new HostsView({ el: this.$('.hosts'), collection: this.model.get('hosts') });
            this.$('.hosts').append(hostsView.render().el);

            var carsView = new CarsView({ el: this.$('.cars'), collection: this.model.get('cars') });
            this.$('.cars').append(carsView.render().el);

            var featuresView = new FeaturesView({ el: this.$('.features'), collection: this.model.get('features') });
            this.$('.features').append(featuresView.render().el);

            return this;
        }
    });

    window.GuestsView = Backbone.View.extend({
        initialize: function () {
            this.collection.each(function (guest) {
                var guestView = new GuestView({ model: guest });
                this.$el.append(guestView.render().el);
            }, this);
        },
        render: function () {
            return this;
        }
    });

    window.GuestView = Backbone.View.extend({
        template: _.template($('#guest-template').html()),
        initialize: function () {
            var html = this.template(this.model.attributes);
            this.setElement(html);
        },
        render: function () {
            return this;
        }
    });
    
    window.HostsView = Backbone.View.extend({
        initialize: function () {
            this.collection.each(function (host) {
                var hostView = new HostView({ model: host });
                this.$el.append(hostView.render().el);
            }, this);
        },
        render: function () {
            return this;
        }
    });

    window.HostView = Backbone.View.extend({
        template: _.template($('#host-template').html()),
        initialize: function () {
            var html = this.template(this.model.attributes);
            this.setElement(html);
        },
        render: function () {
            return this;
        }
    });

    window.CarsView = Backbone.View.extend({
        initialize: function () {
            this.collection.each(function (car) {
                var carView = new CarView({ model: car });
                this.$el.append(carView.render().el);
            }, this);
        },
        render: function () {
            return this;
        }
    });

    window.CarView = Backbone.View.extend({
        template: _.template($('#car-template').html()),
        initialize: function () {
            var html = this.template(this.model.attributes);
            this.setElement(html);
        },
        render: function () {
            return this;
        }
    });

    window.FeaturesView = Backbone.View.extend({
        initialize: function () {
            this.collection.each(function (feature) {
                var featureView = new FeatureView({ model: feature });
                this.$el.append(featureView.render().el);
            }, this);
        },
        render: function () {
            return this;
        }
    });

    window.FeatureView = Backbone.View.extend({
        template: _.template($('#feature-template').html()),
        initialize: function () {
            var html = this.template(this.model.attributes);
            this.setElement(html);
        },
        render: function () {
            return this;
        }
    });
});