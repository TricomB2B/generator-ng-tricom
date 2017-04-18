/**
 * Routed component for the landing page
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { HomeComponent } from './home.component';

export const HomeModule = angular
  .module('home', [
    uiRouter
  ])
  .component('home', HomeComponent)
  .config(config)
  .name;

/**
 * Route configuration
 * @param {angular.ui.IStateProvider} $stateProvider Injected service reference
 */
function config ($stateProvider: angular.ui.IStateProvider) {
  $stateProvider
    .state('root.home', {
      url: '/',
      views: {
        'main@^.^': 'home'
      }
    });
}
config.$inject = ['$stateProvider'];
