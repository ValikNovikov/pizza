define(['backbone'],

    function (Backbone) {
        'use strict';
        var Pizza,
            ingredients;

        Pizza = Backbone.Model.extend({
            defaults: {
                name: 'Margaritta',
                img: './assets/images/pizza.png',
                price: '10$',
                ingredients: '',
                chilly: ''
            },
            initialize: function () {
                ingredients = this.get('ingredients');
                ingredients.forEach(function (item) {
                    if (item === 'chilly') {
                        this.set({chilly: './app/assets/images/chili.png'});
                    }
                }, this);
            }
        });
        return Pizza;
    });
