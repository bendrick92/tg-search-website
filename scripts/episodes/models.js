$(function () {
    window.Episode = Backbone.RelationalModel.extend({
        defaults: {
            title: '',
            series_number: '',
            episode_number: '',
            air_date: '',
            guests: [],
            hosts: [],
            cars: [],
            features: [],
            summary: '',
            summary_link: ''
        },
        parse: function (response) {
            if (response.series_number) {
                response.summary_link = "<a href='https://en.wikipedia.org/wiki/Top_Gear_(series_" + response.series_number + ")' target='_blank'><em>wikipedia.org</em></a>";
            }
            return response;
        }
    });
});