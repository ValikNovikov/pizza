define(['backbone'],

    function (Backbone) {
        'use strict';
        var Pizza,
            ingredients,
            customerData,
            key,
            errors;

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

        customerData = Backbone.Model.extend({
            urlRoot: 'http://localhost:3000/posts',
            defaults: {
                firstName: '',
                lastName: '',
                street: '',
                phone: '',
                email: '',
                pizza: []
            },
            validate: function (attrs) {
                errors = [];

                for (key in attrs) {
                    if (attrs[key] === '') {
                        errors.push({name: key, message: 'this field is required'});
                    }
                }
                return errors.length > 0 ? errors : false; // eslint-disable-line
            }
        });

        return {
            Pizza: Pizza,
            CustomerData: customerData
        };
    });
