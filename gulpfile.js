var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    sourcemaps = require("gulp-sourcemaps"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    $ = require('gulp-load-plugins')(),
    connect = require('gulp-connect');//livereload

var dist = './dist/',
    base = './**/*';

// gulp.task('webserver', function() {
//   gulp.src('./')
//       .pipe(webserver({
//         livereload: true,
//         directoryListing: true,
//         open: true
//       })); 
// });

gulp.task('sass', function() {
    gulp.src('./*/*/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(dist))
});
gulp.task('es6', function() {
  gulp.src(base + '.es6')
      .pipe(babel({
        presets: ['es2015','stage-3']
        //plugins: ["transform-es2015-modules-amd"]
      }))
      .pipe(gulp.dest(dist));
});

gulp.task('browserify', ['es6'], function() {
  var b = browserify({
      entries: "./dist/elements/main.js",
      debug: true
  });
  return b.bundle()
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(dist));
});

 //定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true,
        port: 8000,
        root: "./"
    });
});
gulp.task('html', function(){
    gulp.src(base+'.html')
        .pipe(connect.reload());
});
gulp.task('css', function(){
    gulp.src(base+'.css')
        .pipe(connect.reload());
});
gulp.task('js', function(){
    gulp.src(base+'.js')
        .pipe(connect.reload());
});

gulp.task('watch', ['sass','es6'], function() {
    gulp.watch(base + '.scss', ['sass']);
    gulp.watch(base + '.es6', ['es6']);
    gulp.watch(base + '.html', ['html'])
});

gulp.task('default', ['sass', 'es6', 'connect','watch']);