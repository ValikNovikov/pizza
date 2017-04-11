define(['backbone', 'jquery', '../js/collection', '../js/views', '../js/model'],
    function (Backbone, $, PizzaCollection, PizzaView) {
        'use strict';
        var Router,
            View,
            $pizzaContent = $('#pizza-content'),
            pizzaCollectionView;

        Router = Backbone.Router.extend({
            initialize: function () {
                pizzaCollectionView = new PizzaView.PizzaCollectionView();
                Backbone.history.start();
            },
            routes: {
                '': 'homePage',
                'pizza/description/:query': 'description'
            },
            homePage: function () {
                $('.news').show();
                $pizzaContent.empty();
                $pizzaContent.append(pizzaCollectionView.render().el);
                pizzaCollectionView.delegateEvents();
            },
            description: function (name) {
                $pizzaContent.empty();
                $('.news').hide();
                View = new PizzaView.PizzaDescriptionView({pizzaName: name});
                $pizzaContent.append(View.render().el);
            }
        });
        return Router;
    });
