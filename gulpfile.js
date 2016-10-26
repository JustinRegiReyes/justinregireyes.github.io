'use strict';

var gulp = require("gulp"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	maps = require('gulp-sourcemaps'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	nodemon = require('gulp-nodemon'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task("concatScripts", function() {
	return gulp.src([
		'public/js/jquery.js',
		'public/js/bootstrap.min.js',
		"public/js/jquery.easing.min.js",
		'public/js/index.js',
		"public/js/nav.js",
		"public/js/header.js"
		])
	.pipe(maps.init())
	.pipe(concat("app.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("public/js/application"));
});

gulp.task('minifyScripts', ["concatScripts"], function() {
	return gulp.src("public/js/application/app.js")
	.pipe(maps.init())
	.pipe(uglify().on('error', gutil.log))
	.pipe(rename('app.min.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("public/js/application"))
	.on('end', function() {
		setTimeout(delayedReload, 3000);
	});

	function delayedReload() {
		gulp.src('index.html')
			.pipe(livereload());
	}
});

gulp.task('compileSass', function() {
  return gulp.src("public/stylesheets/scss/application.scss")
      .pipe(sass())
      .pipe(gulp.dest('public/stylesheets/css'))
      .on('end', function() {
	  });
});

gulp.task('autoprefix', ['compileSass'], function () {
	return gulp.src('public/stylesheets/css/application.css')
		.pipe(maps.init())
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(rename('prefix-app.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('public/stylesheets/css'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	

	gulp.watch('public/stylesheets/scss/**/*.scss', ['autoprefix']);
	gulp.watch('public/stylesheets/scss/*.scss', ['autoprefix']);
	gulp.watch('public/js/**.js', ['minifyScripts']);
	gulp.watch('index.html')
	.on('change', function(event) {
		gulp.src('index.html')
			.pipe(livereload());
	});
	
});

gulp.task('nodemon', ['watch'], function() {
	livereload.listen();
});

// gulp.task('hello', function() {
// 	console.log('hello');
// });

gulp.task("default", ["hello"], function() {
	console.log("This is the default task");
});