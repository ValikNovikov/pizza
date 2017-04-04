(function () {
    'use strict';

    require.config({
        paths: {
            // specific libs and plugins
            jquery: './app/vendor/jquery/jquery-3.2.0.min.js',
            underscore: './app/vendor/underscore/underscore-min.js',
            backbone: './app/vendor/backbone/backbone-min.js'
        }
    });


    require(['./app/js/main.js'], function () {
         console.log('require');
        });


})();