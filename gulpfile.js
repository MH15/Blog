const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass:lib', function () {
  return gulp.src('./source/sass/lib.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./exposed/css'))
})
gulp.task('sass:home', function () {
  return gulp.src('./source/sass/home.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./exposed/css'))
})
gulp.task('sass:article', function () {
  return gulp.src('./source/sass/article.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./exposed/css'))
})
 
gulp.task('sass:watch', function () {
  gulp.watch('./source/sass/**/*.sass', [
  	'sass:lib',
  	'sass:home',
  	'sass:article'
  ]);
});