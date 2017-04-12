/**
 * Services container module.
 * Services are application-wide injectable singletons that manage
 * data or provide utility-style functionality.
 */

import angular from 'angular';

// service module imports
// be sure to inject them into the module dependencies array below
// import { ExModule } from './ex/ex.module';
import { DataModule } from './data/data.module';

export const ServicesModule = angular
  .module('<%= lowPrefix %>.services', [
    DataModule
  ])
  .name;
