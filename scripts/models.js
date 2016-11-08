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
            features: []
        },
        parse: function (response) {
            /*if (response.air_date) {
                response.air_date = moment(response.air_date).format('MMMM D, YYYY');
            }*/
            return response;
        },
        relations: [{
            type: Backbone.HasMany,
            key: 'guests',
            relatedModel: 'Guest',
            collectionType: 'GuestCollection'
        },
        {
            type: Backbone.HasMany,
            key: 'hosts',
            relatedModel: 'Host',
            collectionType: 'HostCollection'
        },
        {
            type: Backbone.HasMany,
            key: 'cars',
            relatedModel: 'Car',
            collectionType: 'CarCollection'
        },
        {
            type: Backbone.HasMany,
            key: 'features',
            relatedModel: 'Feature',
            collectionType: 'FeatureCollection'
        }]
    });

    window.Guest = Backbone.RelationalModel.extend({
        defaults: {
            name: ''
        }
    });

    window.Host = Backbone.RelationalModel.extend({
        defaults: {
            name: ''
        }
    });

    window.Car = Backbone.RelationalModel.extend({
        defaults: {
            name: ''
        }
    });

    window.Feature = Backbone.RelationalModel.extend({
        defaults: {
            description: ''
        }
    });
});