import { <%= upName %>Controller } from './<%= lowName %>.controller';
import './<%= lowName %>.scss';
const <%= upName %>Template = require('./<%= lowName %>.html');

export const <%= upName %>Component: angular.IComponentOptions = {
  controller: <%= upName %>Controller,
  template: <%= upName %>Template
};
