define(['backbone', 'jquery', 'underscore', '../js/collection'],
    function (Backbone, $, _, PizzaCollection) {
        'use strict';

        var PizzaView,
            pizzaCollectionView,
            renderView,
            pizzaDescriptionView,
            query;

        window.template = function (id) {
            return _.template($('#' + id).html());
        };

        PizzaView = Backbone.View.extend({

            template: window.template('pizzaTemplate'),

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
                this.$el.empty();
                this.collection.each(function (pizza) {
                    renderView = new PizzaView({model: pizza});
                    this.$el.append(renderView.render().el);
                }, this);
                return this;
            }
        });

        pizzaDescriptionView = Backbone.View.extend({
            render: function () {
                this.$el.empty();
                this.template = window.template('pizzaDescription');
                this.setElement(this.template(this.model.toJSON()));
                return this;
            }
        });

        return {
            PizzaView: PizzaView,
            PizzaCollectionView: pizzaCollectionView,
            PizzaDescriptionView: pizzaDescriptionView
        };
    });
