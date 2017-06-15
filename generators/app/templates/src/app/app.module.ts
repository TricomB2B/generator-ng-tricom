/**
 * <%= name %>
 * <%= description %>
 *
 * @repo    https://github.com/TricomB2B/<%= appName %>
 * @author  Your Name <your.name@tricomb2b.com>
 */

import angular from 'angular';
import uiRouter, { UIRouter, StateProvider, UrlRouterProvider, UrlMatcherFactory } from '@uirouter/angularjs';
import { Visualizer } from '@uirouter/visualizer';

// app component
import { <%= upPrefix %>Component } from './<%= lowPrefix %>.component';
// core module container
import { CoreModule } from './core/core.module';
// shared module container
import { SharedModule } from './shared/shared.module';
// data service definitions
import { DataService } from './core/data.service';
// core stylesheet
import '../scss/app.scss';

// component / feature modules
import { HomeModule } from './home/home.module';

const root = angular
  .module('<%= lowPrefix %>', [
    uiRouter,
    CoreModule,
    SharedModule,
    HomeModule
  ])
  .component('<%= lowPrefix %>', <%= upPrefix %>Component)
  .run(bootstrap)
  .config(config)
  .name;

export default root;

/**
 * Initialize any components or elements when the application starts up
 */
function bootstrap () {
  // detect touchevents capability and inject class
  if (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)) {
    document.querySelector('html').classList.add('touchevents');
  } else {
    document.querySelector('html').classList.add('no-touchevents');
  }
}

/**
 * Enable the Router Visualizer to debug states
 * Can be enabled by adding an additional run block in the root module
 * definition above. Like so.....
 * .run(bootstrap)
 * .run(stateDebug)
 * @param {UIRouter} $uiRouter Injected service reference
 */
function stateDebug ($uiRouter: UIRouter) {
  const visualizer = $uiRouter.plugin(Visualizer);
}
stateDebug.$inject = ['$uiRouter'];

/**
 * Root abstract route configuration
 * @param {StateProvider}             $stateProvider     Injected service reference
 * @param {ng.ILocationProvider}             $locationProvider  Injected service reference
 * @param {UrlRouterProvider}         $urlRouterProvider Injected service reference
 * @param {UrlMatcherFactoryProvider} $urlMatcherFactoryProvider Injected service reference
 */
function config ($stateProvider: StateProvider,
                 $locationProvider: ng.ILocationProvider,
                 $urlRouterProvider: UrlRouterProvider,
                 $urlMatcherFactoryProvider: UrlMatcherFactory) {
  // uses prettier url structure (ie. no hashbang junk)
  $locationProvider.html5Mode(true);
  // allows trailing slashes in urls
  $urlMatcherFactoryProvider.strictMode(false);
  // head home if no matching route or file is found
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      abstract: true,
      component: '<%= lowPrefix %>',
      resolve: {
        loadData: ['DataService', (ds: DataService) => {
          return ds.loadData();
        }]
      }
    });
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];
