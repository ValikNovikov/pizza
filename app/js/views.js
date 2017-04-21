define(['backbone', 'jquery', 'underscore', '../js/collection', 'text!templates/description.html', 'text!templates/list.html', 'text!templates/shopping-cart.html', 'text!templates/message.html', '../js/model'],
    function (Backbone, $, _, PizzaCollection, descriptionTemplate, listTemplate, shoppingCartTemplate, messageTemplate, customerModel) {
        'use strict';

        var PizzaView,
            pizzaCollectionView,
            renderView,
            pizzaDescriptionView,
            query,
            shoppingCart,
            history,
            $counter = $('#cart-counter'),
            priceArr = [],
            sum,
            errorID,
            $inputs,
            pizzaNames = [],
            messageTpl = _.template($(messageTemplate).html()),
            localStorageCollection = JSON.parse(localStorage.getItem('shoppingCartList')),
            shopCartCollection = {item: [], totalSum: ''};

        if (localStorageCollection !== null) {
            shopCartCollection = localStorageCollection;
        }

        /* ---------Main Page View------- */

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

                if (shopCartCollection.item.length > 0) {  // eslint-disable-line
                    $counter.html(shopCartCollection.item.length);
                }

                return this;
            }
        });

        /* /---------Main Page View------- */


        /* ---------Pizza Description Page View------- */
        pizzaDescriptionView = Backbone.View.extend({
            events: {
                'click .buy': 'addToCart'
            },

            template: _.template($(descriptionTemplate).html()),

            render: function () {
                history = Backbone.history.getFragment();
                this.$el.empty();
                this.setElement(this.template(this.model.toJSON()));
                if (shopCartCollection.item.length > 0) {  // eslint-disable-line
                    $counter.html(shopCartCollection.item.length);
                }
                return this;
            },
            addToCart: function () {
                shopCartCollection.item.push(this.model.toJSON());
                shopCartCollection.totalSum = this.totalSum();
                localStorage.setItem('shoppingCartList', JSON.stringify(shopCartCollection));
                priceArr = [];
                $counter.html(shopCartCollection.item.length);
                $counter.show();
            },

            totalSum: function () {
                shopCartCollection.item.map(function (model) {
                    priceArr.push(model.price);
                });
                sum = eval(priceArr.join('+')); // eslint-disable-line
                return sum;
            }
        });

        /* /---------Pizza Description Page View------- */


        /* ---------Shopping Cart Pop-Up View------- */
        shoppingCart = Backbone.View.extend({
            events: {
                'click #modal-close': 'navigate',
                'click .modal-backdrop': 'navigate',
                'click #takeOrder': 'takeOrder',
                'click #buy': 'buy',
                'click #back-btn': 'backToShopList'
            },
            template: _.template($(shoppingCartTemplate).html()),
            render: function () {
                this.$el.empty();
                if (shopCartCollection.item.length === 0) {  // eslint-disable-line
                    this.navigate('#');
                    this.showMsg('You don"t have any items in shop-cart');
                } else {
                    shopCartCollection.customerDataModel = new customerModel.CustomerData();
                    this.$el.html(this.template({collection: shopCartCollection}));
                }
                return this;
            },

            navigate: function (route) {
                if (history === '' || history === 'cart') { // eslint-disable-line
                    history = '#';
                }
                Backbone.history.navigate(history || route, true);
            },

            takeOrder: function () {
                $('.cart-info').hide();
                $('.form-container').show();
            },

            backToShopList: function () {
                $('.form-container').hide();
                $('.cart-info').show();
            },

            buy: function () {
                $inputs = $('.pizza-counter');

                shopCartCollection.item.forEach(function (item) {
                    pizzaNames.push({name: item.name, count: ''});
                });

                $inputs.each(function (index) {
                    pizzaNames[index].count = $(this).val();
                }, this);

                shopCartCollection.customerDataModel.set({
                    'firstName': $('#firstName').val(),
                    'lastName': $('#lastName').val(),
                    'street': $('#street').val(),
                    'phone': $('#phone').val(),
                    'email': $('#email').val(),
                    'pizza': pizzaNames
                });

                if (shopCartCollection.customerDataModel.isValid()) {
                    this.hideErrors();
                } else {
                    this.showErrors(shopCartCollection.customerDataModel.validationError);
                }
            },

            showErrors: function (errors) {
                $('.error').remove();
                _.each(errors, function (error) {
                    errorID = this.$('#' + error.name);
                    errorID.after('<span class="error">' + error.message + '</span>');
                }, this);
            },

            hideErrors: function () {
                $('.error').remove();
                this.postToDb();
            },
            postToDb: function () {
                shopCartCollection.customerDataModel.save(null, {type: 'POST'});
                this.showMsg('Thank you for your order!');
                shopCartCollection.item = [];
                localStorage.removeItem('shoppingCartList');
            },
            showMsg: function (text) {
                $counter.hide();
                $('body').append(messageTpl({msgText: text}));
                this.navigate();
                setTimeout(function () {
                    $('.alert-success').fadeOut();
                }, 2000); // eslint-disable-line
            }
        });

        /* /---------Shopping Cart Pop-Up View------- */


        return {
            PizzaView: PizzaView,
            PizzaCollectionView: pizzaCollectionView,
            PizzaDescriptionView: pizzaDescriptionView,
            ShoppingCart: shoppingCart
        };
    });
