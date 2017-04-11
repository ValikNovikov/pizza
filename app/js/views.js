define(['backbone', 'jquery', 'underscore', '../js/collection'],
    function (Backbone, $, _, PizzaCollection) {
        'use strict';

        var PizzaView,
            pizzaCollectionView,
            renderView,
            pizzaDescriptionView,
            name,
            self, // eslint-disable-line
            query,
            PizzaDescTemplate,
            collectionOfPizzas;

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

        PizzaDescTemplate = Backbone.View.extend({
            template: window.template('pizzaDescription'),
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
                self = this;
                collectionOfPizzas = new PizzaCollection();
                collectionOfPizzas.fetch({
                    success: function () {
                        self.render();
                    }
                });
            },

            navigate: function (ev) {
                query = ev.currentTarget.children[2].firstElementChild.innerText; // eslint-disable-line
                Backbone.history.navigate('pizza/description/' + query, true);
            },
            render: function () {
                this.$el.empty();
                collectionOfPizzas.models.forEach(function (pizza) {
                    renderView = new PizzaView({model: pizza});
                    this.$el.append(renderView.render().el);
                }, this);
                return this;
            }
        });

        pizzaDescriptionView = Backbone.View.extend({
            initialize: function (options) {
                self = this;
                name = options.pizzaName;
                collectionOfPizzas.fetch({
                    success: function () {
                        self.render();
                    }
                });
            },
            render: function () {
                this.$el.empty();
                collectionOfPizzas.forEach(function (pizza) {
                    if (pizza.attributes.name === name) {
                        renderView = new PizzaDescTemplate({model: pizza});
                        this.$el.append(renderView.render().el);
                    }
                }, this);
                return this;
            }
        });

        return {
            PizzaView: PizzaView,
            PizzaCollectionView: pizzaCollectionView,
            PizzaDescriptionView: pizzaDescriptionView
        };
    });
