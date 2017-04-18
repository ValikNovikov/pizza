define(['backbone', 'jquery', 'underscore', '../js/collection', 'text!templates/description.html', 'text!templates/list.html', 'text!templates/shopping-cart.html', 'text!templates/message.html'],
    function (Backbone, $, _, PizzaCollection, descriptionTemplate, listTemplate, shoppingCartTemplate, messageTemplate) {
        'use strict';

        var PizzaView,
            pizzaCollectionView,
            renderView,
            pizzaDescriptionView,
            query,
            shoppingCart,
            history,
            $counter = $('#cart-counter'),
            itemsInCart = {item: []},
            priceArr = [],
            sum,
            messageTpl = _.template($(messageTemplate).html());


        PizzaView = Backbone.View.extend({

            template: _.template($(listTemplate).html()),

            render: function () {
                this.setElement(this.template(this.model.toJSON()));
                return this;
            }
        });

        pizzaCollectionView = Backbone.View.extend({
            events: {
                'click .pizza': 'navigate'
            },
            initialize: function () {
                this.collection.fetch();
                this.listenTo(this.collection, 'add reset', function () {
                    this.render();
                });
            },
            collection: new PizzaCollection(),
            navigate: function (ev) {
                query = ev.currentTarget.children[2].firstElementChild.innerText; // eslint-disable-line
                Backbone.history.navigate('pizza/' + query, true);
            },
            render: function () {
                history = Backbone.history.getFragment();
                this.$el.empty();
                this.collection.each(function (pizza) {
                    renderView = new PizzaView({model: pizza});
                    this.$el.append(renderView.render().el);
                }, this);
                return this;
            }
        });

        pizzaDescriptionView = Backbone.View.extend({
            events: {
                'click .buy': 'addToCart'
            },

            template: _.template($(descriptionTemplate).html()),

            render: function () {
                history = Backbone.history.getFragment();
                this.$el.empty();
                this.setElement(this.template(this.model.toJSON()));
                return this;
            },
            addToCart: function () {
                itemsInCart.item.push(this.model);
                itemsInCart.item.map(function (model) {
                    priceArr.push(model.attributes.price);
                });
                sum = eval(priceArr.join('+')); // eslint-disable-line
                itemsInCart.totalSum = sum;
                priceArr = [];
                $counter.html(itemsInCart.item.length);
                $counter.show();
            }
        });

        shoppingCart = Backbone.View.extend({
            events: {
                'click #modal-close': 'navigate',
                'click #buy': 'showSuccessMsg',
                'click .shopping-cart': 'showErrorMsg'
            },
            template: _.template($(shoppingCartTemplate).html()),

            render: function () {
                this.$el.empty();
                if (itemsInCart.item.length === 0) {  // eslint-disable-line
                    this.navigate('#');
                    this.showErrorMsg();
                } else {
                    this.$el.html(this.template({collection: itemsInCart}));
                }
                return this;
            },
            navigate: function (route) {
                Backbone.history.navigate(history || route, true);
            },
            showSuccessMsg: function () {
                itemsInCart.item = [];
                $counter.hide();
                $('body').append(messageTpl({model: 'Thank you for you order!'}));
                this.navigate();
                window.setTimeout(function () {
                    $('.alert-success').fadeOut();
                }, 4000); // eslint-disable-line
            },
            showErrorMsg: function () {
                $('body').append(messageTpl({model: 'You dont have any items in shop-cart'}));
                window.setTimeout(function () {
                    $('.alert-success').fadeOut();
                }, 4000); // eslint-disable-line
            }
        });

        return {
            PizzaView: PizzaView,
            PizzaCollectionView: pizzaCollectionView,
            PizzaDescriptionView: pizzaDescriptionView,
            ShoppingCart: shoppingCart
        };
    });
