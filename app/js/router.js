define(['backbone', 'jquery', '../js/collection', '../js/views', '../js/model'],
    function (Backbone, $, PizzaCollection, PizzaView) {
        'use strict';
        var Router,
            View,
            $pizzaContent = $('#pizza-content'),
            $pizzaDescription = $('#pizza-description'),
            $news = $('.news'),
            pizzaCollectionView,
            shoppingCartView;

        Router = Backbone.Router.extend({
            initialize: function () {
                pizzaCollectionView = new PizzaView.PizzaCollectionView();
                Backbone.history.start();
            },
            routes: {
                '': 'homePage',
                'pizza/:query': 'description',
                'cart': 'shoppingCart'
            },
            homePage: function () {
                $news.show();
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $pizzaDescription.empty();
                $pizzaContent.append(pizzaCollectionView.render().el);
                pizzaCollectionView.delegateEvents();
            },
            description: function (name) {
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $pizzaContent.empty();
                $pizzaDescription.empty();
                $news.hide();

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
            },
            shoppingCart: function () {
                shoppingCartView = new PizzaView.ShoppingCart();
                $pizzaDescription.append(shoppingCartView.render().el);
                $('#myModal').modal('show');
                $('body').css({'padding-right': '0'});
            }
        });
        return Router;
    });
