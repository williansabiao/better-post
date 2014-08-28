var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  nodemon = require('gulp-nodemon'),
  less = require('gulp-less'),
  plumber = require('gulp-plumber'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  assets = {},
  bower = {},
  jade = './views/**/*.jade';


// Files and folder paths
bower.folder = './bower_components/';
bower.js = [
  bower.folder + 'angular/angular.min.js',
  bower.folder + 'angular-route/angular-route.min.js',
  bower.folder + 'bootstrap/js/bootstrap.min.js'
];
bower.css = [
  bower.folder + 'bootstrap/dist/css/bootstrap.min.css',
  bower.folder + 'bootstrap/dist/css/bootstrap-theme.min.css',
  bower.folder + 'components-font-awesome/css/font-awesome.min.css'
];
bower.fonts = [
  bower.folder + 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
  bower.folder + 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
  bower.folder + 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
  bower.folder + 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
  bower.folder + 'components-font-awesome/fonts/fontawesome-webfont.eot',
  bower.folder + 'components-font-awesome/fonts/fontawesome-webfont.svg',
  bower.folder + 'components-font-awesome/fonts/fontawesome-webfont.ttf',
  bower.folder + 'components-font-awesome/fonts/fontawesome-webfont.woff',
  bower.folder + 'components-font-awesome/fonts/FontAwesome.otf'
];
assets.folder = './public/'
assets.less = [
  assets.folder + 'less/custom.less'
];
assets.css = [
  assets.folder + 'css/custom.css'
];
assets.js = [
  assets.folder + 'js/dev/app.js',
  assets.folder + 'js/dev/**/*.js'
];

// Partials tasks
gulp.task('jsConcat', function () {
  gulp.src( (bower.js).concat(assets.js) )
    .pipe(plumber())
    .pipe( sourcemaps.init() )
      .pipe( concat('all.js') )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./public/js/') )
});

gulp.task('fonts', function () {
  gulp.src( bower.fonts )
    .pipe( gulp.dest('./public/fonts/') )
});

gulp.task('less', function () {
  gulp.src( assets.less )
    .pipe(plumber())
    .pipe( sourcemaps.init() )
      .pipe( less() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./public/css/') )
    .pipe( reload({stream:true}) );
});

gulp.task('css', ['less', 'fonts'], function () {
  gulp.src( ( bower.css ).concat( assets.css ) )
    .pipe(plumber())
    .pipe( sourcemaps.init() )
      .pipe( concat('style.css') )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('./public/css/') )
    .pipe( reload({stream:true}) );
});

// Final Tasks and run server
gulp.task('nodemon', [ 'css', 'jsConcat' ], function( cb ) {
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

  gulp.watch(assets.less, ['css']);
  gulp.watch(assets.js, ['jsConcat']);
  gulp.watch(jade);
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