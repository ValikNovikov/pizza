var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	inject = require('gulp-inject');


gulp.task('inject', function () {
	var target = gulp.src('index.html'),
		sources = gulp.src(['app/js/**/*.js', 'app/assets/styles/styles/**/*.css'], {read: false});

	return target.pipe(inject(sources,{ relative: true }))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
});