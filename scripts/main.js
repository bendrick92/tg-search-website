$(function () {
    var output = $('#output');
    var txtSearch = $('#txtSearch');
    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    txtSearch.keyup(function () {
        var searchTerm = $(this).val();

        delay(function() {
            executeFetch(searchTerm);
        }, 1000);
    });

    function executeFetch(searchTerm) {
        // var url = 'http://localhost:3000/v1/episodes';
        var url = 'https://tg-api.herokuapp.com/v1/episodes';
        if (searchTerm != '') {
            url = url + '?search=' + searchTerm;

            var apiEpisodes = new EpisodeCollection(null, {
                url: url,
            });

            console.log('Searching for ' + searchTerm);

            apiEpisodes.fetch({
                success: function (response, xhr) {
                    console.log('Data retrieved successfully');

                    var episodesView = new EpisodesView({
                        collection: apiEpisodes
                    });

                    output.append(episodesView.render().el);
                },
                error: function (error) {
                    console.log('An error occurred:' + error);
                }
            });
        }
    }
});