(function () {
    'use strict';

    require.config({
        paths: {
            // specific libs and plugins
            jquery: '../vendor/jquery/jquery-3.2.0.min',
            underscore: '../vendor/underscore/underscore-min',
            backbone: '../vendor/backbone/backbone-min'
        }
    });


    require(['jquery', 'underscore', '../js/collection', '../js/views'], function ($, _, PizzaCollection, PizzaView) {
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
            //
            // window.PizzaApp = {
            //     Models: {},
            //     Collections: {},
            //     Views: {}
            // };

            collectionOfPizzas = new PizzaCollection();

            View = new PizzaView.PizzaCollectionView({collection: collectionOfPizzas});

            View.collection.fetch();

            $('#pizza-content').append(View.render().el);

        });
    });
})();
