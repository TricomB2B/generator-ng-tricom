/**
 * <%= name %>
 * <%= description %>
 *
 * @repo    https://github.com/TricomB2B/<%= appName %>
 * @author  Your Name <your.name@tricomb2b.com>
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

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
 * Root abstract route configuration
 * @param {angular.ui.IStateProvider}             $stateProvider     Injected service reference
 * @param {angular.ILocationProvider}             $locationProvider  Injected service reference
 * @param {angular.ui.IUrlRouterProvider}         $urlRouterProvider Injected service reference
 * @param {angular.ui.IUrlMatcherFactoryProvider} $urlMatcherFactoryProvider Injected service reference
 */
function config ($stateProvider: angular.ui.IStateProvider,
                 $locationProvider: angular.ILocationProvider,
                 $urlRouterProvider: angular.ui.IUrlRouterProvider,
                 $urlMatcherFactoryProvider: angular.ui.IUrlMatcherFactory) {
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
      url: '',
      resolve: {
        loadData: ['DataService', (ds: DataService) => {
          return ds.loadData();
        }]
      }
    });
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];
