const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./exposed/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./source/sass/**/*.sass', ['sass']);
});