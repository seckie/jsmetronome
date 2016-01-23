'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');

var stylus = require('gulp-stylus');
var nib = require('nib');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');

var karma = require('karma').server;
var notify = require('gulp-notify');
var changed = require('gulp-changed');
var data = require('gulp-data');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var spritesmith = require('gulp.spritesmith');

var browserSync = require('browser-sync').create();

var PUBLIC_PATH = 'public/';

var PATHS = {
  html: [ PUBLIC_PATH + '**/*.html' ],
  htmlDir: PUBLIC_PATH,

  jsx: [ 'src/jsx/**/*.jsx' ],
  jsxMain: './src/jsx/main.jsx',
  js: [ PUBLIC_PATH + 'js/**/*.js' ],
  jsDir: PUBLIC_PATH + 'js',
  jsMain: PUBLIC_PATH + 'js/main.js',

  stylus: [ 'src/stylus/**/*.styl' ],
  stylusEntry: [ 'src/stylus/**/!(_)*.styl' ],
  css: [ PUBLIC_PATH + 'css/**/*.css' ],
  cssDir: PUBLIC_PATH + 'css',

  spriteImg: [ 'src/sprite/*' ],
  spriteImgName: [ 'main.png' ],
  spriteCSSName: [ 'sprite-main.styl' ],
  spriteImgDest: PUBLIC_PATH + 'img/sprite',
  spriteCSSDest: 'src/stylus/sprite'
};

// utilities
var errorHandler = function (e) {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>',
    sound: false
  }).apply(this, args);
  this.emit('end');
};

// build CSS
var stylusData = { use: [ nib() ] };
gulp.task('stylus', function () {
  return gulp.src(PATHS.stylusEntry)
    .pipe(changed(PATHS.cssDir), { extension: '.css' })
    .pipe(stylus(stylusData).on('error', errorHandler))
    .pipe(gulp.dest(PATHS.cssDir))
    .pipe(browserSync.stream());
});

// build JavaScript
gulp.task('jshint', function () {
  return gulp.src(PATHS.js)
    .pipe(jshint().on('error', errorHandler))
    .pipe(jshint.reporter('default'));
});
  // webpack
gulp.task('build', function () {
  return gulp.src(PATHS.jsxMain)
    .pipe(webpack({
      output: { filename: '[name].js' },
      module: {
        loaders: [
          { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
        ],
        resolve: {
          extensions: [ '', '.js', '.jsx' ]
        }
      },
      externals: { 'react': 'React' }
    }))
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});

// minify
gulp.task('compress', function () {
  return gulp.src(PATHS.jsMain)
    .pipe(uglify({
      mangle: false,
      preserveComments: 'license'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATHS.jsDir));
});

// sprite
gulp.task('sprite', function (cb) {
  var path = (PATHS.spriteImgDest).replace(PUBLIC_PATH, '/');
  PATHS.spriteImg.forEach(function (src, i) {
    var stream = spritesmith({
      imgName: PATHS.spriteImgName[i],
      cssName: PATHS.spriteCSSName[i],
      imgPath: path + '/' + PATHS.spriteImgName[i],
      algorithm: 'binary-tree',
      engine: 'gmsmith',
      imgOpts: { exportOpts: { quality: 100 } },
      padding: 2
    }).on('error', errorHandler);
    var spriteData = gulp.src(src).pipe(stream);
    spriteData.img.pipe(gulp.dest(PATHS.spriteImgDest));
    spriteData.css.pipe(gulp.dest(PATHS.spriteCSSDest));
  });
  return cb();
});

// test
gulp.task('test', function (cb) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, cb);
});

// server
gulp.task('browser-sync', function () {
  browserSync.init({
    open: false,
    //files: [ PATHS.css, PATHS.js ],
    server: {
      baseDir: './public',
      middleware: [
        function (req, res, next) {
          var msg = req.method;
          msg += ' ';
          msg += req.url;
          msg += '  ';
          msg += req.statusCode;
          msg += ' ';
          msg += req.statusMessage;
          console.log(msg);
          next();
        }
      ]
    }
  });
});

// watch
gulp.task('watch', function () {
  gutil.log('start watching');
  gulp.watch(PATHS.html).on('change', browserSync.reload);
  gulp.watch(PATHS.stylus, [ 'stylus' ]);
  gulp.watch(PATHS.jsx, [ 'build' ]);
});


// commands
gulp.task('default', [ 'browser-sync', 'stylus', 'watch' ]);