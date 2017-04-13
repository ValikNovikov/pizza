define(['backbone', 'jquery', 'underscore', '../js/collection', 'text!templates/description.html', 'text!templates/list.html'],
    function (Backbone, $, _, PizzaCollection, descriptionTemplate, listTemplate) {
        'use strict';

        var PizzaView,
            pizzaCollectionView,
            renderView,
            pizzaDescriptionView,
            query;


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
                this.$el.empty();
                this.collection.each(function (pizza) {
                    renderView = new PizzaView({model: pizza});
                    this.$el.append(renderView.render().el);
                }, this);
                return this;
            }
        });

        pizzaDescriptionView = Backbone.View.extend({
            template: _.template($(descriptionTemplate).html()),

            render: function () {
                this.$el.empty();
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
