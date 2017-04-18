/**
 * <%= description %>
 */

import angular from 'angular';

import { <%= upName %>Component } from './<%= lowName %>.component';

export const <%= upName %>Module = angular
  .module('<%= lowName %>', [])
  .component('<%= lowName %>', <%= upName %>Component)
  .name;

