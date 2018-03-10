$(function () {
    var body = $(document.body);
    var searchTermInput = $('input#search-term');
    var clearSearchTermButton = $('#clear-search-term-button');
    var clearSearchResultsButton = $('#clear-search-results-button');
    var searchButton = $('#search-button');
    var searchOutput = $('#search-output');
    var autoCompleteOutput = $('#auto-complete-output');
    var loadingTemplate = $('#loading-template').html();
    var noResultsTemplate = $('#no-results-template').html();
    var helpOverlayTemplate = $('#help-overlay-template').html();
    var autoCompleteUrl = baseUrl + 'autocomplete';
    var episodesUrl = baseUrl + 'episodes';
    var enterKeyIndex = 13;
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        }
    })();

    searchTermInput.keyup(function () {
        delay(function() {
            executeAutoCompleteFetch(getSearchTermInput());
        }, 500);
    });

    searchTermInput.focusout(function () {
        delay(function() {
            autoCompleteOutput.empty();
        }, 100);
    });

    $('body').on('click', 'ul.auto-complete-list li', function () {
        var autoCompleteTerm = $(this).text();

        setSearchTermInput(autoCompleteTerm);
        executeSearch();
    });

    clearSearchTermButton.click(function () {
        clearSearchTermInput();
        clearAutoComplete();
        searchTermInput.focus();
    });

    clearSearchResultsButton.click(function () {
        clearSearchResults();
        hideClearSearchResultsButton();
    });

    searchButton.click(function () {
        executeSearch();
    });

    $('body').keypress(function (key) {
        if (key.which == enterKeyIndex) {
            executeSearch();
        }
    });

    function executeSearch() {
        executeFetch(getSearchTermInput());
        clearAutoComplete();
    }

    function clearAll() {
        clearSearchTermInput();
        clearAutoComplete();
        clearSearchResults();
    }

    function clearSearchTermInput() {
        searchTermInput.val('');
        searchTermInput.blur();
    }

    function clearAutoComplete() {
        autoCompleteOutput.empty();
        searchTermInput.blur();
    }

    function clearSearchResults() {
        searchOutput.empty();
        hideClearSearchResultsButton();
    }

    function setSearchTermInput(input) {
        searchTermInput.val(input);
    }

    function getSearchTermInput() {
        return searchTermInput.val();
    }

    function showClearSearchResultsButton() {
        clearSearchResultsButton.show();
    }

    function hideClearSearchResultsButton () {
        clearSearchResultsButton.hide();
    }

    function executeAutoCompleteFetch(searchTerm) {
        searchTerm = searchTerm.trim();

        if (searchTerm != '') {
            var url = autoCompleteUrl + '?search=' + searchTerm;
            var apiAutoComplete = new AutoComplete({
                url: url
            });

            apiAutoComplete.fetch({
                success: function (response, xhr) {
                    autoCompleteOutput.empty();

                    if (response != null) {
                        var autoCompleteView = new AutoCompleteView({
                            model: apiAutoComplete,
                            el: autoCompleteOutput
                        });

                        autoCompleteView.render();
                    }
                    else {
                        clearAutoComplete();
                    }
                },
                error: function (error) {
                    console.log('An error occurred retrieving autocomplete data:' + error);
                }
            });
        }
    }

    function executeFetch(searchTerm) {
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

            apiEpisodes.fetch({
                success: function (response, xhr) {
                    clearSearchResults();

                    if (response != null && response.length > 0) {
                        showClearSearchResultsButton();

                        var episodesView = new EpisodesView({
                            collection: apiEpisodes,
                            el: searchOutput
                        });
                        
                        episodesView.render();
                    }
                    else {
                        hideClearSearchResultsButton();
                        clearSearchResults();
                        searchOutput.append(noResultsTemplate);
                    }
                },
                error: function (error) {
                    console.log('An error occurred retrieving episode data:' + error);
                }
            });
        }
    }
});