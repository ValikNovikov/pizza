define(['backbone', 'jquery', '../js/collection', '../js/views'],
    function (Backbone, $, PizzaCollection, PizzaView) {
        'use strict';
        var Router,
            View,
            collectionOfPizzas;

        Router = Backbone.Router.extend({
            initialize: function () {
                Backbone.history.start();
            },
            routes: {
                '': 'homePage',
                'pizza': 'homePage',
                'description/:query': 'description',
                '*otherwise': 'otherwise'
            },
            homePage: function () {
                $('#pizza-description').hide();
                $('#pizza-news-block').show();
            },

            description: function (name) {
                $('#pizza-news-block').hide();
                $('#pizza-description').show();
                collectionOfPizzas = new PizzaCollection();
                View = new PizzaView.PizzaDescriptionView({collection: collectionOfPizzas, pizzaName: name});
                View.collection.fetch();
                $('#pizza-description').append(View.render().el);
            },
            otherwise: function () {

            }
        });
        return Router;
    });
