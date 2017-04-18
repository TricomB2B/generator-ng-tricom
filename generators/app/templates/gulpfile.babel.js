'use strict';

// paths to relevant directories
const dirs = {
  src: './src',
  dest: './dist'
};

// paths to file sources
const sources = {
  coreData: `${dirs.src}/data.json`,
  coreHtml: `${dirs.src}/index.html`,
  coreScss: `${dirs.src}/scss/app.scss`,
  coreTs: `${dirs.src}/app/<%= lowPrefix %>.module.ts`,
  font: [],
  html: `${dirs.src}/app/**/*.html`,
  icon: `${dirs.src}/img/icons/**/*.svg`,
  img: `${dirs.src}/img/**/*`,
  js: `${dirs.src}/**/*.js`,
  scss: `${dirs.src}/**/*.scss`,
  ts: `${dirs.src}/**/*.ts`
};

// paths to file destinations
const dests = {
  js: `${dirs.dest}/js`,
  css: `${dirs.dest}/css`,
  html: `${dirs.src}/app`,
  img: `${dirs.dest}/img`,
  icon: `${dirs.dest}/img/icons`,
  font: `${dirs.dest}/fonts`
};

// plugins
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import reporters from 'jasmine-reporters';
import karma from 'karma';

// constants
const $             = gulpLoadPlugins();

const TINYPNG_KEY = 'g7BmBd0TIedcR5PDn1qd8wxzvuwrob2V';
const TINYPNG_SIG = `${dirs.src}/img/.tinypng-sigs`;

/****************************************
  Gulp Tasks
*****************************************/
// compress and combine svg icons
gulp.task('svg', svg());
// Unit testing
gulp.task('test', test());
// compress png and jpg images via tinypng API
gulp.task('tinypng', tinypng());

// compresses imagery
gulp.task('images', [
  'svg',
  'tinypng'
]);

/****************************************
  Task Logic
*****************************************/
function svg () {
  return () => {
    return gulp.src(sources.icon)
      .pipe($.svgmin())
      .pipe($.svgstore())
      .pipe(gulp.dest(dests.icon));
  };
}

function test (done) {
  return () => {
    let server = new karma.Server('./karma.conf.js', done);
    server.start();
  };
}

function tinypng () {
  return () => {
    return gulp.src(sources.img)
      .pipe($.tinypngCompress({
        key: TINYPNG_KEY,
        sigFile: dests.sigFile
      }))
      .pipe(gulp.dest(dests.img));
  };
}
