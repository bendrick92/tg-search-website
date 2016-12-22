$(function () {
    var output = $('#output');

    executeFetch();

    function executeFetch() {
        //var url = 'http://localhost:3000/v1/logs';
        var url = 'https://tg-api.herokuapp.com/v1/logs';

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