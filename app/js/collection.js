define(['jquery', 'backbone', '../js/model'],

    function ($, Backbone, PizzaModel) {
        'use strict';
        var CollectionOfPizza;

        CollectionOfPizza = Backbone.Collection.extend({
            model: PizzaModel.Pizza,
            url: './app/js/pizza.json'
        });
        return CollectionOfPizza;
    });

