define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {
        'use strict';
        var PizzaView,
            pizzaCollectionView,
            renderView;

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
            initialize: function () {
                this.listenTo(this.collection, 'add reset', function () {
                    this.render();
                });
            },
            render: function () {
                this.$el.empty();
                this.collection.each(function (pizza) {
                    renderView = new PizzaView({model: pizza});
                    this.el.append(renderView.render().el);
                }, this);
                return this;
            }
        });

        return {
            PizzaView: PizzaView,
            PizzaCollectionView: pizzaCollectionView
        };
    });
