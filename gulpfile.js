var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    es = require('event-stream');


gulp.task('inject', function () {
    'use strict';
    var cssSteram = gulp.src(['app/assets/styles/*.css'])
    	.pipe(gulp.dest('./dist/styles'));

    var vendorStream =	gulp.src(['app/vendor/**/*.js'])
    	.pipe(concat('vendors.js'))
    	.pipe(gulp.dest('./dist/js'));


    var appStream = gulp.src(['app/js/**/*.js'])
    	.pipe(concat('app.js'))
    	.pipe(gulp.dest('./dist/js'));


    gulp.src('./index.html').pipe(gulp.dest('./dist'));

});


gulp.task('build-js', function () {
    'use strict';
    return gulp.src('app/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch('app/js/**/*.js', ['build-js']);
    gulp.watch('app/assets/styles/**/*.css', ['index']);
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('serve', ['watch'], function () {
    'use strict';
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});
