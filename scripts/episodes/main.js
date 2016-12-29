$(function () {
    var body = $(document.body);
    var output = $('#search-output');
    var input = $('#search-input');
    var loadingTemplate = $('#loading-template').html();
    var noResultsTemplate = $('#no-results-template').html();
    var helpButton = $('#help-button');
    var helpOverlayTemplate = $('#help-overlay-template').html();
    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    helpButton.click(function () {
        body.append(helpOverlayTemplate);
        var helpOverlayCloseButton = $("#help-overlay .close-button");
        
        helpOverlayCloseButton.click(function () {
            var helpOverlay = $("#help-overlay");
            helpOverlay.remove();
        });
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

        searchTerm = searchTerm.trim();

        if (searchTerm != '' && searchTerm != 'nolog') {
            var loggingDisabled = false;
            if (searchTerm.includes('nolog')) {
                loggingDisabled = true;
                console.log('Logging disabled');
                searchTerm = searchTerm.replace('nolog', '');
                searchTerm = searchTerm.trim();
            }

            url = url + '?search=' + searchTerm;
            
            if (loggingDisabled) {
                url = url + '&logging=0';
            }

            var apiEpisodes = new EpisodeCollection(null, {
                url: url,
            });

            output.append(loadingTemplate);

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
                        output.append(noResultsTemplate);
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