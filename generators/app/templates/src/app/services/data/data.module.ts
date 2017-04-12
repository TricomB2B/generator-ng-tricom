/**
 * Service to manage the loading and retrieving of data from the json.
 */

import angular from 'angular';

import { DataService } from './data.service';

export const DataModule = angular
  .module('data', [])
  .service('DataService', DataService)
  .name;
