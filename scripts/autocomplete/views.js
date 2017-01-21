$(function () {
    window.AutoCompleteView = Backbone.View.extend({
        template: _.template($('#auto-complete-template').html()),
        initialize: function () {
            this.setElement(this.el);
            this.render();
        },
        render: function () {
            var html = this.template(this.model.attributes);
            this.$el.html(html);
        }
    });
});