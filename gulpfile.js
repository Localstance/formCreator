var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var connect = require('gulp-connect');
var babel = require('gulp-babel');

gulp.task('build', ['eslint'], function () {
  return browserify('./src/scripts/app.js', {
    debug: true
  }).transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('eslint', function () {
  return gulp.src(['./src/scripts/*.js', './src/scripts/modules/*.js'])
    .pipe(eslint({
      'globals': {
        'jQuery': false,
        '$': true
      },
      /*eslint airbnb*/
      configFile: './.eslint.json'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.results(function (results) {
      console.log('ESlint Results: \n');
      console.log('Total Warnings: ' + results.warningCount);
      console.log('Total Errors: ' + results.errorCount);
      console.log('\nSuccess');
    }));
});

gulp.task('server', ['buildApp'], function(){
  connect.server({
    root: './build',
    port: 8000
  });
});

gulp.task('buildApp', ['build', 'sass']);
gulp.task('default', ['server']);
gulp.task('start', ['server']);