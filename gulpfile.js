const gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	browserify = require('gulp-browserify'),
	rename = require("gulp-rename"),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');


//sass
gulp.task('sass', function () {
	gulp.src('public/style/**/*.scss')
		.pipe(connect.reload());
});

//css
gulp.task('css', function () {
	gulp.src('public/style/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/style'))
		.pipe(connect.reload());
});


/* connect */
gulp.task('connect', function () {
	connect.server({
		root: 'dist',
		livereload: true,
		port: 3001
	});
});

/*html*/
// gulp.task('html', function () {
//   gulp.src('./dist/quiz.html')
//     .pipe(connect.reload());
// });

/*browserify*/
// gulp.task('browserify', function () {
// 	return gulp.src('./public/js/index.js')
// 		.pipe(browserify({ debug: true }))
// 		.pipe(gulp.dest('dist/js'))
// 		.pipe(connect.reload());
// });


gulp.task('js', () => {
	    gulp.src('./public/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
})


gulp.task('watch', function () {
	gulp.watch('./public/js/**/*.js', ['js']);
	gulp.watch(['./public/style/**/*.scss'], ['css', 'sass']);
});
gulp.task('build', ['connect', /*'html',*/ 'sass', 'css', /*'browserify',*/ 'watch','js']);
