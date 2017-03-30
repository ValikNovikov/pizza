var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	es = require('event-stream');




gulp.task('inject', function () {
	var cssSteram = gulp.src(['app/assets/styles/*.css'])
		.pipe(gulp.dest('./dist/styles'));

	var vendorStream =	gulp.src(['app/vendor/**/*.js'])
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('./dist/js'));


	var appStream = gulp.src(['app/js/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist/js'));


	gulp.src('./index.html')
		.pipe(inject(es.merge(vendorStream, appStream,cssSteram),{ignorePath: 'dist'}))
		.pipe(gulp.dest('./dist'));

});







gulp.task("build-js", function () {
	return gulp.src("app/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat("all.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./dist/js"))
		.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js',['build-js']);
	gulp.watch('app/assets/styles/**/*.css',['index']);
	gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('serve',['inject','watch'], function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
});