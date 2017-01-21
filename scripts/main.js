$(function () {
    var body = $(document.body);
    
    var searchTermInput = $('input#search-term');
    var clearButton = $('#clear-button');
    var helpButton = $('#help-button');
    var searchButton = $('#search-button');

    var searchOutput = $('#search-output');
    var autoCompleteOutput = $('#auto-complete-output');

    var loadingTemplate = $('#loading-template').html();
    var noResultsTemplate = $('#no-results-template').html();
    var helpOverlayTemplate = $('#help-overlay-template').html();

    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        }
    })();
    var autoCompleteUrl = baseUrl + 'autocomplete';
    var episodesUrl = baseUrl + 'episodes';

    searchTermInput.keyup(function () {
        var searchTerm = $(this).val();
        
        delay(function() {
            executeAutoCompleteFetch(searchTerm);
        }, 500);
    });

    searchTermInput.focusout(function () {
        delay(function() {
            autoCompleteOutput.empty();
        }, 100);
    });

    $('body').on('click', 'ul.auto-complete-list li', function () {
        var autoCompleteTerm = $(this).text();
        searchTermInput.val(autoCompleteTerm + ' ');
        searchButton.trigger('click');
    });

    helpButton.click(function () {
        body.append(helpOverlayTemplate);
        var helpOverlayCloseButton = $('#help-overlay .close-button');
        
        helpOverlayCloseButton.click(function () {
            var helpOverlay = $('#help-overlay');
            helpOverlay.remove();
        });
    });

    clearButton.click(function () {
        searchTermInput.val('');
    });

    searchButton.click(function () {
        var searchTerm = searchTermInput.val();
        executeFetch(searchTerm);
    });

    function executeAutoCompleteFetch(searchTerm) {
        autoCompleteOutput.empty();

        searchTerm = searchTerm.trim();

        if (searchTerm != '') {
            var url = autoCompleteUrl + '?search=' + searchTerm;
            var apiAutoComplete = new AutoComplete({
                url: url
            });

            apiAutoComplete.fetch({
                success: function (response, xhr) {
                    console.log('Autocomplete data retrieved successfully');

                    if (response != null) {
                        var autoCompleteView = new AutoCompleteView({
                            model: apiAutoComplete,
                            el: autoCompleteOutput
                        });

                        autoCompleteView.render();
                    }
                    else {
                        autoCompleteOutput.empty();
                    }
                },
                error: function (error) {
                    console.log('An error occurred retrieving autocomplete data:' + error);
                }
            });
        }
    }

    function executeFetch(searchTerm) {
        searchOutput.empty();

        searchTerm = searchTerm.trim();

        if (searchTerm != '' && searchTerm != 'nolog') {
            var loggingDisabled = false;
            if (searchTerm.includes('nolog')) {
                loggingDisabled = true;
                console.log('Logging disabled');
                searchTerm = searchTerm.replace('nolog', '');
                searchTerm = searchTerm.trim();
            }

            var url = episodesUrl + '?search=' + searchTerm;
            
            if (loggingDisabled) {
                url = url + '&logging=0';
            }

            var apiEpisodes = new EpisodeCollection(null, {
                url: url,
            });

            searchOutput.append(loadingTemplate);

            console.log('Searching for ' + searchTerm);

            apiEpisodes.fetch({
                success: function (response, xhr) {
                    console.log('Episode data retrieved successfully');

                    if (response != null) {
                        var episodesView = new EpisodesView({
                            collection: apiEpisodes,
                            el: searchOutput
                        });
                    }
                    else {
                        searchOutput.empty();
                        searchOutput.append(noResultsTemplate);
                    }

                    episodesView.render();
                },
                error: function (error) {
                    console.log('An error occurred retrieving episode data:' + error);
                }
            });
        }
    }
});