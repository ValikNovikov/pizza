define(['backbone', 'jquery', '../js/collection', '../js/views', '../js/model'],
    function (Backbone, $, PizzaCollection, PizzaView) {
        'use strict';
        var Router,
            View,
            $pizzaContent = $('#pizza-content'),
            $pizzaDescription = $('#pizza-description'),
            pizzaCollectionView;

        Router = Backbone.Router.extend({
            initialize: function () {
                pizzaCollectionView = new PizzaView.PizzaCollectionView();
                Backbone.history.start();
            },
            routes: {
                '': 'homePage',
                'pizza/:query': 'description'
            },
            homePage: function () {
                $('.news').show();
                $pizzaDescription.empty();
                $pizzaContent.append(pizzaCollectionView.render().el);
                pizzaCollectionView.delegateEvents();
            },
            description: function (name) {
                $pizzaContent.empty();
                $('.news').hide();

                pizzaCollectionView.collection.fetch({
                    success: function () {
                        pizzaCollectionView.collection.each(function (model) {
                            if (model.attributes.name === name) {
                                View = new PizzaView.PizzaDescriptionView({model: model});
                                $pizzaDescription.append(View.render().el);
                            }
                        }, this);
                    }
                });
            }
        });
        return Router;
    });
