$(function () {
    var output = $('#search-output');
    var input = $('#search-input');
    var loading = $('#loading-template').html();
    var noResults = $('#no-results-template').html();
    var helpButton = $('#help-button');
    var help = $('#help-template').html();
    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    helpButton.click(function () {
        output.empty();
        output.append(help);
    });

    input.keyup(function () {
        var searchTerm = $(this).val();

        delay(function() {
            executeFetch(searchTerm);
        }, 1000);
    });

    function executeFetch(searchTerm) {
        //var url = 'http://localhost:3000/v1/episodes';
        var url = 'https://tg-api.herokuapp.com/v1/episodes';

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

                    if (response.length > 0) {
                        var episodesView = new EpisodesView({
                            collection: apiEpisodes,
                            el: output
                        });
                    }
                    else {
                        output.empty();
                        output.append(noResults);
                    }

                    episodesView.render();
                },
                error: function (error) {
                    console.log('An error occurred:' + error);
                }
            });
        }
    }
});