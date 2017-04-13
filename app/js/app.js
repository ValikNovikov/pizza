(function () {
    'use strict';

    require.config({
        paths: {
            'text': '/pizza/node_modules/text/text',
            'jquery': '../vendor/jquery/jquery-3.2.0.min',
            'backbone': '../vendor/backbone/backbone-min',
            'underscore': '../vendor/underscore/underscore-min',
            'slider': '../vendor/slider/my-slider',
            'bootstrap': '../vendor/bootstrap/js/bootstrap.min',
            'templates': '../templates'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'backbone': {
                deps: ['underscore', 'jquery', 'underscore'],
                exports: 'Backbone'
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


    require(['jquery', 'underscore', '../js/router', 'slider', 'bootstrap'], function ($, _, Router) {
        var $mobileDropDown = $('.mobile-dropdown'),
            $sideNav = $('#sidenav'),
            arrOfProducts = [],
            sliderCall,
            theMostPopularProduct,
            router;// eslint-disable-line

        $(function () {
            router = new Router();
            // ----- Set the width of the side navigation to 250px ------//

            $('.open-mobile-menu').click(function () {
                $sideNav.addClass('show-sidenav');
            });

            // ----- Set the width of the side navigation to 0 --------//
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
            sliderCall = $('#my-slider').slider({dots: true, autoSlide: true, delay: 4000});

            $('#start-stop').click(function () {
                sliderCall.stopSlider();
            });
            // -----/carousel------//


            $('#arrOfIngredients li').ready(function () {
                $('#arrOfIngredients li').each(function () {
                    add($(this).text());
                });

                theMostPopularProduct = arrOfProducts.reduce(function (prev, current) {
                    return (prev.count > current.count) ? prev : current;
                });
                console.log(theMostPopularProduct); // eslint-disable-line
            });


            // -----the most popular product------//

            function add (str) {
                if (!findProduct(str)) {
                    arrOfProducts.push({name: str, count: 1});
                }
            }

            function findProduct (prod) {
                var val = false;  // eslint-disable-line
                arrOfProducts.forEach(function (item, index) {
                    if (item.name === prod) {
                        arrOfProducts[index].count += 1;
                        val = true;
                    }
                });
                return val;
            }
        });
    });
})();
