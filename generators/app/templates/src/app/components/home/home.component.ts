import { HomeController } from './home.controller';
import './home.scss';
const HomeTemplate = require('./home.html');

export const HomeComponent: angular.IComponentOptions = {
  controller: HomeController,
  template: HomeTemplate
};
