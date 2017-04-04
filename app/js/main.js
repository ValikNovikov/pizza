$(function () {
    'use strict';

    var $mobileDropDown = $('.mobile-dropdown'),
        $sideNav = $('#sidenav');

    /* Set the width of the side navigation to 250px */
    $('.open-mobile-menu').click(function () {
        $sideNav.addClass('show-sidenav');
    });

    /* Set the width of the side navigation to 0 */
    $('.menu-btn').click(function () {
        $sideNav.removeClass('show-sidenav');
    });

    $('#home-btn').click(function () {
        if ($mobileDropDown.hasClass('show-dropdown')) {
            $mobileDropDown.toggleClass('show-dropdown').slideUp();
        } else {
            $mobileDropDown.slideDown().toggleClass('show-dropdown');
        }
    });


// -----carousel------//
    $('#my-slider').slider({dots: true, autoSlide: true});
// -----/carousel------//
});
// -----creating backbone model and view------//
(function () {
    'use strict';

    var collectionOfPizzas,
        pizzaView,
        renderView;

    window.PizzaApp = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    window.PizzaApp.Models.Pizza = Backbone.Model.extend({
        defaults: {
            name: 'Margaritta',
            img: './assets/images/pizza.png',
            price: '10$'
        }
    });

    window.PizzaApp.Views.Pizza = Backbone.View.extend({
        template: window.template('pizzaTemplate'),

        render: function () {
            this.setElement(this.template(this.model.toJSON()));
            return this;
        }
    });

    window.PizzaApp.Collections.Pizza = Backbone.Collection.extend({
        model: window.PizzaApp.Models.Pizza,
        url: './app/js/pizza.json'
    });

    window.PizzaApp.Views.PizzaCollection = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'add reset', function () {
                this.render();
            });
        },
        render: function () {
            this.$el.empty();
            this.collection.each(function (pizza) {
                renderView = new window.PizzaApp.Views.Pizza({model: pizza});
                this.el.append(renderView.render().el);
            }, this);
            return this;
        }
    });

    collectionOfPizzas = new window.PizzaApp.Collections.Pizza();

    pizzaView = new window.PizzaApp.Views.PizzaCollection({collection: collectionOfPizzas});

    pizzaView.collection.fetch();

    $('#pizza-content').append(pizzaView.render().el);
})();
