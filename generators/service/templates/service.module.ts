/**
 * <%= description %>
 */

import angular from 'angular';

import { <%= upName %>Service } from './<%= lowName %>.service';

export const <%= upName %>Module = angular
  .module('<%= lowName %>', [])
  .service('<%= upName %>Service', <%= upName %>Service)
  .name;
