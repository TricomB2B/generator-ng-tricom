/**
 * Core App module for wiring up app-wide services and components.
 */

import angular from 'angular';

// service imports
import { DataService } from './data.service';

export const CoreModule = angular
  .module('core', [])
  .service('DataService', DataService)
  .name;
