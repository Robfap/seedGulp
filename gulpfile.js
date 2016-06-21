var gulp = require('gulp');
var jshint = require('gulp-jshint');
var usemin = require('gulp-usemin');
var connect = require('gulp-connect');
var appDir = "app/";
var scriptsPath = appDir + "scripts/";

gulp.task('connect', function() {
  connect.server({
    port: 9000,
    root: 'app',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch( [ 'gulpfile.js', appDir + '**/*.*'], ['lint']);
});

gulp.task('lint', function() {
  return gulp.src(scriptsPath + '**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);