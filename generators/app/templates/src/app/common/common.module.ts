/**
 * Common module container.
 * Common modules are stateless, typically encapsulating re-usable
 * or layout/presentational components.
 */

import angular from 'angular';

// common module imports
// be sure to inject them into the module dependencies array below
// import { ExModule } from './ex/ex.module';

export const CommonModule = angular
  .module('<%= lowPrefix %>.common', [])
  .name;
