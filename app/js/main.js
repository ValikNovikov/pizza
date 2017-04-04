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
var Pizza = Backbone.Model.extend({
        defaults: {
            name: 'Margaritta',
            img: './assets/images/pizza.png',
            price: '10$'
        }
    }),

    template = function (id) {
        return _.template($('#' + id).html());
    },

    PizzaView = Backbone.View.extend({
        template: template('pizzaTemplate'),

        render: function () {
            this.setElement(this.template(this.model.toJSON()));
            return this;
        }
    }),

    PizzaCollection = Backbone.Collection.extend({
        model: Pizza,
        url: './app/js/pizza.json',

        initialize: function () {
        }
    }),

    PizzaCollectionView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change reset', function () {
                console.log('r');
            });
        },

        render: function () {
            this.collection.each(function (pizza) {
                var pizzaView = new PizzaView({model: pizza});
                this.el.append(pizzaView.render().el);
            }, this);
            return this;
        }
    }),

    collectionOfPizzas = new PizzaCollection();
collectionOfPizzas.fetch({
    success: function (s) {
        console.log('success');
    }, error: function () {
        console.log('error');
    }
});
console.log(collectionOfPizzas);
var pizzaCollectionView = new PizzaCollectionView({collection: collectionOfPizzas});
$('#pizza-content').append(pizzaCollectionView.render().el);
