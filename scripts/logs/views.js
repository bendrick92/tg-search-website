$(function () {
    window.LogsView = Backbone.View.extend({
        initialize: function () {
            this.collection.each(function (log) {
                var logView = new LogView({ model: log });
                this.$el.append(logView.render().el);
            }, this);
        },
        render: function () {
            return this;
        }
    });

    window.LogView = Backbone.View.extend({
        template: _.template($('#log-template').html()),
        initialize: function () {
            var html = this.template(this.model.attributes);
            this.setElement(html);
        },
        render: function () {
            return this;
        }
    });
});