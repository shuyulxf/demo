var gulp = require('gulp');
var webserver = require('gulp-webserver'); 
var babel = require('gulp-babel');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('es6', function() {
	gulp.src('./src/js/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./dist/js/'))
});

gulp.task('watch', function() {
var watcher = gulp.watch('./src/js/*.js', ['es6']);
watcher.on('change', function(event) {
  console.log(event);
});

});