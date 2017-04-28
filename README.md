# generator-ng-tricom [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> TriComB2B's opinionated yeoman generator for TypeScript/AngularJS based hybrid applications.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ng-tricom using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```sh
$ npm install -g yo generator-ng-tricom
```

Then generate your new project, create a new empty directory and fire away:

```sh
$ mkdir my-fun-project
$ cd my-fun-project
$ yo ng-tricom
```

This will prompt you for some initial configuration, then generate your project.

## Basic Features

The app's basic feature set includes

- A webpack and related configuration for packaging the app's assets.
  - This includes the webpack dev server for on-the-fly development, watching for file changes, plus it's just cool af.
- TypeScript/AngularJS 1.6, TypeScript Linter, Babel transpiling for ES2015 support, Angular UI Router 1.0, a really smart developer (you), Sass support, Git.
- A lot of our opinionation has been developed using the following style guides
  - [Official Angular style guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
  - Todd Motto's T[ypeScript/AngularJS style guide](https://github.com/toddmotto/angularjs-styleguide/tree/master/typescript)
- We have also included a number of subgenerators for generating services, components, filters, etc.
  - At this time, we have not completed initial work on most of these subgenerators, so they are still in the planning stages.

## NPM Tasks

The workflow is handled largely through NPM tasks defined in `package.json`. We have provided a few basic tasks to get things rolling. They are executed with

```sh
$ npm run [task]
```

- `serve` launches webpack dev server and starts watching for file changes
- `clean` removes `./dist/` so you get a fresh start
- `build:prod` builds the production ready package and drops it into `./dist/`
- `build` runs `clean` and then `build:prod`

For the most part you'll be using `serve` and `build` tasks.

## Core App Structure

The intial generator will generate the basic project, providing you with a bunch of development configuration, the core app modules, a freebie home module, and a core Sass codebase. It automatically installs project dependencies with [Yarn](), and initializes a Git repo and makes the initial commit. It then launches a webpack dev server and you can just start coding from there.

#### Root

The root project folder contains pretty much just development related files and configurations:

```
.
├── .awcache
├── .git
├── node_modules
├── src
├── .babelrc
├── .editorconfig
├── .gitignore
├── .yo-rc.json
├── README.md
├── gulpfile.babel.js
├── package.json
├── postcss.config.js
├── tsconfig.json
├── tslint.json
├── webpack.config.js
└── yarn.lock
```

- `webpack.config.js` the core webpack configuration.
- `tsconfig.json` the TypeScript compiler options.
- `tslint.json` the TypeScript linter rules.
- `postcss.config.js` the PostCSS configuration.
- `.babelrc` babel configuration. not used by webpack.
- `.editorconfig` a sensible editor config for team development. 2 spaces for tabs.
- `.awcache/` this is our webpack typescript loader's cache. it is ignored by git and will have no lasting impact on the project other than speeding up compile times.

We've tried to provide sensible configurations for all of these to get things rolling. But if you don't like something or need additional project-specific functionality it's all open for modification.

The others should be fairly obvious. Once a production build is created, you'll also see the `dist/` directory. Note that we do still have a gulpfile to handle a few Gulp tasks. We hope get those working through webpack soon.

#### Source Code

The `./src` directory is where you'll be doing most, if not all, of your work. It starts out like

```
.
├── app
│   ├── core
│   │   ├── core.module.ts
│   │   └── data.service.ts
│   ├── home
│   │   ├── home.component.ts
│   │   ├── home.controller.ts
│   │   ├── home.html
│   │   ├── home.module.ts
│   │   └── home.scss
│   ├── shared
│   │   └── shared.module.ts
│   ├── app.component.ts
│   ├── app.html
│   ├── app.module.ts
│   └── vendor.ts
├── img
│   ├── favicons
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-256x256.png
│   │   ├── apple-touch-icon.png
│   │   ├── browserconfig.xml
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   ├── mstile-150x150.png
│   │   └── safari-pinned-tab.svg
│   └── background.jpg
├── scss
│   ├── styling
│   │   ├── _animations.scss
│   │   ├── _global.scss
│   │   └── _typography.scss
│   ├── util
│   │   ├── _functions.scss
│   │   └── _mixins.scss
│   ├── _sanitize.scss
│   ├── _settings.scss
│   └── app.scss
├── .htaccess
├── data.json
└── index.ejs
```

- `./core/` should contain single-use components or app-wide services. Think a data service or an app-wide nav component. These are then referenced in the core container module.
- `./shared/` should contain components, filters, directives that will be re-used and referenced throughout the app. These are then referenced in the shared container module.
- `./home/` for instance, is a "feature" component. Think one feature per folder, and these features can have children components, their own services, sass styling, markup, etc. Just keep things organized and follow the style guide for when to break a component into parent-child components and you'll be fine.
- `./img/` and `./scss/` should be fairly obvious. We have a default favicon and markup generated from [RealFaviconGenerator](http://realfavicongenerator.net/).
- `./data.json` is the app data file. Think of it as a light CMS for easy content changes.
- `./index.ejs` is the index.html template file. Though our template is currently fairly complete, ideally we could expand our webpack configuration to generate more of this file and slim down this template significantly.
- `./.htaccess` will be copied over to the dist directory during the build process. It is here for completeness, ideally we could generate this on the fly at some point.

## Service Subgenerator

Generates a service. Can generate for both the core app or a specific component.

```sh
$ yo ng-tricom:service
```

## License

See LICENSE

[npm-image]: https://badge.fury.io/js/generator-tricom.svg
[npm-url]: https://npmjs.org/package/generator-tricom
[travis-image]: https://travis-ci.org/TricomB2B/generator-tricom.svg?branch=master
[travis-url]: https://travis-ci.org/TricomB2B/generator-tricom
[daviddm-image]: https://david-dm.org/TricomB2B/generator-tricom.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TricomB2B/generator-tricom
[coveralls-image]: https://coveralls.io/repos/TricomB2B/generator-tricom/badge.svg
[coveralls-url]: https://coveralls.io/r/TricomB2B/generator-tricom
