var gulp = require('gulp');
var smushit = require('gulp-smushit');
var run = require('gulp-run');


gulp.task('default', function () {
  return gulp.src('dist/**/*.png')
    .pipe(smushit())
    .pipe(gulp.dest('dest'));
});