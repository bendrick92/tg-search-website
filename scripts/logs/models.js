$(function () {
    window.Log = Backbone.RelationalModel.extend({
        defaults: {
            search_term: '',
            search_time: ''
        },
        parse: function (response) {
            if (response.search_time) {
                response.search_time = moment(response.search_time).utcOffset(-6).format('MMMM D, YYYY HH:mm:ss');
            }
            return response;
        }
    });
});