'use strict';
const gulp =  require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

// Gulp function for gulp task styles-libs
function stylesLibs() {
  var cssPaths = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/normalize.css/normalize.css',
    './node_modules/simplebar/dist/simplebar.css',
    './node_modules/hamburgers/dist/hamburgers.css'
  ]
  return gulp.src(cssPaths)
    .pipe(concat('libs.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./build/css'))
}

// Gulp function for gulp task scriptLibs
function scriptsLibs(){
  const scriptsLibs = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/simplebar/dist/simplebar.js'
  ];
  return gulp.src(scriptsLibs)
    .pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
    .pipe(uglify({
        toplevel:true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'));
}

// Gulp function for gulp task pug
function pugTask(){
  return gulp.src('./src/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

// Gulp function for gulp task Custom styles
function styles(){
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

// Gulp function for gulp task Customs script
function scripts(){
  const jsPaths = [
    './src/js/main.js',
    './src/js/map.js'
  ]
  return gulp.src(jsPaths)
    .pipe(sourcemaps.init())
    .pipe(concat('custom.js'))
    .pipe(uglify({
        toplevel:true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

// Img,Fonts move to build
function staticMoveImg(){
  const staticPaths = [
    './src/img/**/*.*'
  ];
  return gulp.src(staticPaths)
    .pipe(gulp.dest('./build/img'));
}

function staticMoveFonts(){
  const staticPaths = [
    './src/fonts/**/*.*'
  ];
  return gulp.src(staticPaths)
    .pipe(gulp.dest('./build/fonts'));
}

//Gulp Watch
function watch(){
  browserSync.init({
    server: {
        baseDir: "./build"
    }
  });
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/pug/**/*.pug', pugTask);
  gulp.watch('./src/img/**/*.*',staticMoveImg);
  gulp.watch('./src/fonts/**/*.*',staticMoveFonts);
}

//Gulp Remove all in ./build
function clean(){
  return del(['build/*'])
}

//Gulp Tasks
gulp.task('styles-libs', stylesLibs);
gulp.task('scripts-libs', scriptsLibs);

gulp.task('pug', pugTask);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('move:img',staticMoveImg);
gulp.task('move:fonts',staticMoveFonts);
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('libs', gulp.parallel(stylesLibs, scriptsLibs));
gulp.task('build', gulp.series(clean, gulp.parallel(stylesLibs, scriptsLibs, styles, scripts, pugTask, staticMoveImg, staticMoveFonts)));
gulp.task('dev', gulp.series('build','watch'));