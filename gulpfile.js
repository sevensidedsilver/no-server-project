var gulp = require('gulp')
  ,sourcemaps = require('gulp-sourcemaps')
  ,sass = require('gulp-sass')
  ,CacheBuster = require('gulp-cachebust')
  ,concat = require('gulp-concat')
  ,babel = require('gulp-babel')
  ,uglify = require('gulp-uglify')
  ,print = require('gulp-print')
var cachebust = new CacheBuster()

gulp.task('sayHi', function(){
  console.log("hi");
})


gulp.task('build-css', function(){
  return gulp.src('./css/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'))

})


gulp.task('build-js', function() {
   return gulp.src('./js/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', [ 'build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./partials/*.html', './css/*.*css', './js/*.js'], ['build']);
});
