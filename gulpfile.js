var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var appDir = "app/";
var scriptsPath = appDir + "scripts/";
var babel = require('gulp-babel');
var fs = require("fs");
var browserify = require("browserify");
var source = require('vinyl-source-stream');


gulp.task('connect', function() {
  connect.server({
    port: 9000,
    root: 'app',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch( [ 'gulpfile.js', appDir + '**/*.*'], [ 'lint', 'babelify']);
});

gulp.task('lint', function() {
  return gulp.src(scriptsPath + '**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('babelify', function() {
  return browserify(scriptsPath + 'main.js', {debug: true})
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(appDir + 'dist'))
    .pipe(connect.reload());
});

gulp.task('babel', function() {
  return gulp.src(scriptsPath + '**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(appDir + 'dist'))
    .pipe(connect.reload());
});

gulp.task('default', ['connect', 'lint', 'babelify', 'watch']);