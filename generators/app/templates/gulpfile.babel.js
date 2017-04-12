'use strict';

// Proxy URL (optional)
const proxyUrl = '';

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

const staticFiles = [
  sources.coreHtml,
  sources.coreData,
  `${dirs.src}/.htaccess`
];

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
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import history from 'connect-history-api-fallback';
import del from 'del';
import reporters from 'jasmine-reporters';
import karma from 'karma';
import webpack from 'webpack';

// constants
const $             = gulpLoadPlugins();
const tsProject     = $.typescript.createProject('tsconfig.json');
const webpackConfig = require('./webpack.config.js');

const TINYPNG_KEY = 'g7BmBd0TIedcR5PDn1qd8wxzvuwrob2V';
const TINYPNG_SIG = `${dirs.src}/img/.tinypng-sigs`;

const TMPL_CACHE_HEADER = `// generated file. do not modify
import angular from 'angular';

export const TemplateModule = angular
  .module('<%%= module %>'<%%= standalone %>)
  .run(['$templateCache', ($templateCache: any) => {
`;
const TMPL_CACHE_BODY = `    $templateCache.put('<%%= url %>', '<%%= contents %>');`;
const TMPL_CACHE_FOOTER =`
  }])
  .name;
`;

/****************************************
  Gulp Tasks
*****************************************/

// launch browser sync as a standalone local server
gulp.task('browser-sync-local', ['watch'], browserSyncLocal());
// browser-sync task for starting the server by proxying a local url
gulp.task('browser-sync-proxy', ['watch'], browserSyncProxy());
// clean up the dist package
gulp.task('clean', clean());
// copy static assets to dist package
gulp.task('copy-img', copyImg());
// copy the core data file to dist
gulp.task('copy-static', copyStatic());
// copy vendor CSS
gulp.task('css-vendors', cssVendors());
// copy fonts
gulp.task('fonts', fonts());
// Lint Javascript Task
gulp.task('ts-lint', typescriptLint());
// Concatenate and Minify Vendor JS
gulp.task('js-vendors', javascriptVendors());
// lint sass task
gulp.task('sass-lint', sassLint());
// Concatenate JS
gulp.task('scripts', scripts());
// Concatenate & Minify JS
gulp.task('scripts-prod', scriptsProd());
// compile, prefix, and minify the sass
gulp.task('styles', styles());
// compress and combine svg icons
gulp.task('svg', svg());
// minify and concatenate views into angular template cache
gulp.task('templates', templates());
// Unit testing
gulp.task('test', test());
// compress png and jpg images via tinypng API
gulp.task('tinypng', tinypng());
// Watch Files For Changes
gulp.task('watch', ['clean', 'copy-img', 'copy-static', 'svg', 'templates', 'styles', 'scripts'], watch());

// local task builds everything, opens up a standalone server, and watches for changes
gulp.task('default', [
  'browser-sync-local',
]);

// default task builds everything, opens up a proxy server, and watches for changes
gulp.task('proxy', [
  'browser-sync-proxy'
]);

// builds everything
gulp.task('build', [
  'clean',
  'copy-img',
  'copy-static',
  'svg',
  'templates',
  'styles',
  'scripts-prod'
]);

// builds the vendor files
gulp.task('vendors', [
  'css-vendors',
  'js-vendors'
]);

// compresses imagery
gulp.task('images', [
  'svg',
  'tinypng'
]);

/****************************************
  Task Logic
*****************************************/

function browserSyncLocal () {
  return () => {
    browserSync.init({
      server: {
        baseDir: './dist/',
        middleware: [ history() ]
      }
    });
  };
}

function browserSyncProxy () {
  return () => {
    browserSync.init({
      proxy: proxyUrl,
      middleware: [ history() ]
    });
  };
}

function clean () {
  return () => {
    return del.sync(`${dirs.dest}/**/{*,.*}`);
  };
}

function copyImg () {
  return () => {
    return gulp.src(sources.img)
      .pipe(gulp.dest(dests.img));
  };
}

function copyStatic () {
  return () => {
    return gulp.src(staticFiles, { base: 'src' })
      .pipe(gulp.dest(dirs.dest))
      .pipe(browserSync.stream());
  };
}

function cssVendors () {
  return () => {
    return gulp.src(sources.cssVendor)
      .pipe(gulp.dest(dests.vendor));
  };
}

function fonts () {
  return () => {
    gulp.src(sources.font)
      .pipe(gulp.dest(dests.font));
  };
}

function javascriptLint () {
  return () => {
    return gulp.src(sources.js)
      .pipe($.jshint({esversion: 6}))
      .pipe($.jshint.reporter('jshint-stylish'));
  };
}

function javascriptVendors () {
  return () => {
    return gulp.src(sources.jsVendor)
      .pipe($.plumber())
      .pipe($.concat('vendors.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(dests.vendor));
  };
}

function sassLint () {
  return () => {
    return gulp.src(sources.scss)
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe($.sassLint.failOnError());
  };
}

function scripts (done) {
  return (done) => {
    const compiler = webpack(webpackConfig({
      entryPoints: {
        'bundle': sources.coreTs
      },
      outputDir: dests.js
    }));

    compiler.run((err, stats) => {
      if (err) throw new $.util.PluginError('tsPipeline', err);

      $.util.log('[tsPipeline]', stats.toString({
          colors: true,
          chunks: false
        }));

      if (!stats.hasErrors())
        browserSync.reload();

      done();
    })
  };
}

function scriptsProd (done) {
  return (done) => {
    const compiler = webpack(webpackConfig({
      entryPoints: {
        'bundle': sources.coreTs
      },
      outputDir: dests.js,
      uglify: true
    }));

    compiler.run((err, stats) => {
      if (err) throw new $.util.PluginError('tsPipeline', err);

      $.util.log('[tsPipeline]', stats.toString({
          colors: true,
          chunks: false
        }));

      if (!stats.hasErrors())
        browserSync.reload();

      done();
    })
  };
}

function styles () {
  return () => {
    return gulp.src(sources.coreScss)
      .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(["> 1%", "last 2 versions"], { cascade: true }))
        .pipe(gulp.dest(dests.css))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cleanCss())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dests.css))
      .pipe(browserSync.stream({match: '**/*.css'}));
  };
}

function svg () {
  return () => {
    return gulp.src(sources.icon)
      .pipe($.svgmin())
      .pipe($.svgstore())
      .pipe(gulp.dest(dests.icon));
  };
}

function templates (done) {
  return (done) => {
    gulp.src(sources.html)
      .pipe($.htmlmin({collapseWhitespace: true}))
      .pipe($.rename({dirname: '/'}))
      .pipe($.angularTemplatecache({
        filename: 'templates.generated.ts',
        module: 'app.templates',
        standalone: true,
        templateHeader: TMPL_CACHE_HEADER,
        templateBody: TMPL_CACHE_BODY,
        templateFooter: TMPL_CACHE_FOOTER
      }))
      .pipe(gulp.dest(dests.html));

      done();
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

function typescriptLint () {
  return () => {
    return gulp.src(sources.ts)
      .pipe($.tslint({
        configuration: './tslint.json',
        formatter: 'stylish'
      }))
      .pipe($.tslint.report({
        summarizeFailureOutput: true
      }));
  };
}

function watch () {
  return () => {
    gulp.watch(sources.ts, ['scripts']);
    gulp.watch(sources.scss, ['styles']);
    gulp.watch(sources.html, ['templates']);
    gulp.watch(staticFiles, ['copy-static']);
  };
}
