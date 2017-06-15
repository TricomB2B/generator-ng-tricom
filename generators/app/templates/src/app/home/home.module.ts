/**
 * Routed component for the landing page
 */

import angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

import { HomeComponent } from './home.component';

export const HomeModule = angular
  .module('home', [])
  .component('home', HomeComponent)
  .config(config)
  .name;

/**
 * Route configuration
 * @param {StateProvider} $stateProvider Injected service reference
 */
function config ($stateProvider: StateProvider) {
  $stateProvider
    .state('root.home', {
      url: '',
      views: {
        'main': 'home'
      }
    });
}
config.$inject = ['$stateProvider'];
