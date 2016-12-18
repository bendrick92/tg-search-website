$(function () {
    var output = $('#search-output');
    var input = $('#search-input');
    var loading = $('#loading-template').html();
    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    input.keyup(function () {
        var searchTerm = $(this).val();

        delay(function() {
            executeFetch(searchTerm);
        }, 1000);
    });

    function executeFetch(searchTerm) {
        var url = 'http://localhost:3000/v1/episodes';
        //var url = 'https://tg-api.herokuapp.com/v1/episodes';

        output.empty();

        if (searchTerm != '') {
            url = url + '?search=' + searchTerm;

            var apiEpisodes = new EpisodeCollection(null, {
                url: url,
            });

            output.append(loading);

            console.log('Searching for ' + searchTerm);

            apiEpisodes.fetch({
                success: function (response, xhr) {
                    console.log('Data retrieved successfully');

                    var episodesView = new EpisodesView({
                        collection: apiEpisodes,
                        el: output
                    });

                    episodesView.render();
                },
                error: function (error) {
                    console.log('An error occurred:' + error);
                }
            });
        }
    }
});