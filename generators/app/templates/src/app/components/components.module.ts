/**
 * Components container modules
 * Components are typically stateful or routed components and are
 * sometimes capable of being easily dropped into an application,
 * representing a full feature and associated functionality.
 */

import angular from 'angular';

// component module imports
// be sure to inject them into the module dependencies array below
// import { ExModule } from './ex/ex.module';
import { HomeModule } from './home/home.module';

export const ComponentsModule = angular
  .module('<%= lowPrefix %>.components', [
    HomeModule
  ])
  .name;
