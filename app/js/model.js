define(['backbone'],

    function (Backbone) {
        'use strict';
        var Pizza;

        Pizza = Backbone.Model.extend({
            defaults: {
                name: 'Margaritta',
                img: './assets/images/pizza.png',
                chilly: '',
                price: '10$',
                ingredients: ''
            }
        });

        return Pizza;
    });
