var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  nodemon = require('gulp-nodemon'),
  less = require('gulp-less'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  assets = {};
  bower = {};

bower.folder = './bower_components/';
bower.js = [
  bower.folder + 'angular/angular.min.js',
  bower.folder + 'angular-route/angular-route.min.js'
];
assets.folder = './public/'
assets.less = [
  assets.folder + 'less/style.less'
];
assets.js = [
  assets.folder + 'js/dev/app.js',
  assets.folder + 'js/dev/**/*.js'
];

gulp.task('jsConcat', function () {
  gulp.src( (bower.js).concat(assets.js) )
    .pipe( sourcemaps.init() )
      .pipe( concat('all.js') )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./public/js/') )
});

gulp.task('less', function () {
  gulp.src( assets.less )
    .pipe( sourcemaps.init() )
      .pipe( less() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./public/css/') )
    .pipe( reload({stream:true}) );
});

gulp.task('nodemon', [ 'less', 'jsConcat' ], function( cb ) {
  var called = false;
  nodemon({
    script: './bin/www',
    ext: 'jade,js',
    ignore: [ './public/*', './node_modules/**/*', 'gulpfile.js' ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });

  gulp.watch(assets.less, ['less']);
  gulp.watch(assets.js, ['jsConcat']);
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 5000,
    notify: true
  });
});

gulp.task('browser-sync-firefox', ['nodemon'], function () {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 5000,
    notify: true,
    browser: 'firefox'
  });
});


gulp.task('dev', ['browser-sync']);
gulp.task('dev-firefox', ['browser-sync-firefox']);