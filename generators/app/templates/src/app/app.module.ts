/**
 * <%= name %>
 * <%= description %>
 *
 * @repo    https://github.com/TricomB2B/<%= appName %>
 * @author  Your Name <your.name@tricomb2b.com>
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

// core component
import { <%= upPrefix %>Component } from './<%= lowPrefix %>.component';
// components module container
import { ComponentsModule } from './components/components.module';
// common module container
import { CommonModule } from './common/common.module';
// services module container
import { ServicesModule } from './services/services.module';
// generated template module utilizing $templateCache service
import { TemplateModule } from './templates.generated';
// data service definitions
import { DataService } from './services/data/data.service';

const root = angular
  .module('<%= lowPrefix %>', [
    uiRouter,
    CommonModule,
    ComponentsModule,
    ServicesModule,
    TemplateModule
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
      url: '',
      resolve: {
        loadData: ['DataService', (ds: DataService) => {
          return ds.loadData();
        }]
      }
    });
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];
