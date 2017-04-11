(function () {
    'use strict';

    require.config({
        paths: {
            // specific libs and plugins
            'jquery': '../vendor/jquery/jquery-3.2.0.min',
            'backbone': '../vendor/backbone/backbone-min',
            'underscore': '../vendor/underscore/underscore-min',
            'slider': '../vendor/slider/my-slider',
            'bootstrap': '../vendor/bootstrap/js/bootstrap.min'
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

    require(['jquery', 'underscore', '../js/collection', '../js/views', '../js/router', 'slider', 'bootstrap'], function ($) {
        var $mobileDropDown = $('.mobile-dropdown'),
            $sideNav = $('#sidenav'),
            arrOfProducts,
            sliderCall;

        $(function () {
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

            $('#arrOfIngredients li').each(function () {
                add($(this).text());
            });

            arrOfProducts.sort(findMostPopular);
            console.log(arrOfProducts[0]);   // eslint-disable-line
        });

        // -----the most popular product------//
        arrOfProducts = [];

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

        function findMostPopular (a, b) {
            if (a.count > b.count) {
                return -1; // eslint-disable-line
            }
            if (a.count < b.count) {
                return 1; // eslint-disable-line
            }
            return 0; // eslint-disable-line
        }
        // function findMostUnPopular(a, b) {
        // 	if (a.count < b.count)
        // 		return -1;
        // 	if (a.count > b.count)
        // 		return 1;
        // 	return 0;
        // }
    });
})();
