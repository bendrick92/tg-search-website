$(function () {
    var output = $('#output');    
    var logsUrl = baseUrl + 'logs';

    executeFetch();

    function executeFetch() {
        var url = logsUrl;

        output.empty();

        var apiLogs = new LogCollection(null, {
            url: url,
        });

        apiLogs.fetch({
            success: function (response, xhr) {
                console.log('Data retrieved successfully');

                var logsView = new LogsView({
                    collection: apiLogs,
                    el: output
                });

                logsView.render();
            },
            error: function (error) {
                console.log('An error occurred:' + error);
            }
        });
    }
});