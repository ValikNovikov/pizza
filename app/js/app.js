(function () {
    'use strict';

    require.config({
        paths: {
            // specific libs and plugins
            jquery: '../vendor/jquery/jquery-3.2.0.min',
            backbone: '../vendor/backbone/backbone-min',
            underscore: '../vendor/underscore/underscore-min',
            slider: '../vendor/slider/my-slider',
            bootstrap: '../vendor/bootstrap/js/bootstrap.min'
        },
        shim: {
            'backbone': {
                deps: ['underscore', 'jquery', 'underscore'],
                exports: 'backbone'
            },
            'jquery': {
                exports: '$'
            },
            'slider': {
                deps: ['jquery']
            },
            'bootstrap': {
                deps: ['jquery']
            },
            'underscore': {
                exports: '_'
            }
        }
    });


    require(['jquery', 'underscore', '../js/collection', '../js/views', 'slider'], function ($, _, PizzaCollection, PizzaView) {
        $(function () {
            var $mobileDropDown = $('.mobile-dropdown'),
                $sideNav = $('#sidenav'),
                collectionOfPizzas,
                View;

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


            collectionOfPizzas = new PizzaCollection();

            View = new PizzaView.PizzaCollectionView({collection: collectionOfPizzas});

            View.collection.fetch();

            $('#pizza-content').append(View.render().el);
        });
    });
})();
