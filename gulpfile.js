/*!
 * gulp
 * $ npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp');
    sass = require('gulp-ruby-sass');
    autoprefixer = require('gulp-autoprefixer');
    minifycss = require('gulp-minify-css');
    jshint = require('gulp-jshint');
    uglify = require('gulp-uglify');
    imagemin = require('gulp-imagemin');
    rename = require('gulp-rename');
    concat = require('gulp-concat');
    notify = require('gulp-notify');
    cache = require('gulp-cache');
    livereload = require('gulp-livereload');
    webserver = require('gulp-webserver');
    del = require('del');

var paths = {
    src: 'src',
    srcBS: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
    srcMedia: 'src/images',
    publicCSS: 'public/css',

    distMedia: 'dist/images'
};


// Bootstrap
gulp.task('framework', function () {
    return gulp.src(paths.srcBS).pipe(gulp.dest(paths.publicCSS));
});
 
// Images
gulp.task('images', function() {
  return gulp.src(paths.srcMedia)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.distMedia))
    .pipe(notify({ message: 'Images task complete' }));
});
 
// Copy
gulp.task('copy', ['framework', 'images',]);

 
gulp.task('serve', ['copy'], function () {
    return gulp.src(paths.src)
      .pipe(webserver({
        port: 3000,
              livereload: true
    }));
});
  
// Default task
gulp.task('default', ['serve'], function() {
    gulp.start('framework', 'images');
});

gulp.task('watch', ['default'], function () {
    gulp.watch(paths.src);
});