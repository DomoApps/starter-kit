import './responsive.css';

import * as angular from 'angular';
import 'ng-redux';
import Common from '../common/index.ts';
import ResponsiveComponents from './components/index.ts';
import ResponsiveContainers from './containers/index.ts';
import init from './responsive.init.ts';
import config from './responsive.config.ts';

const ngDependencies = [
  'ui.router',
  'ngAnimate',
  'ngRedux',
  Common.name,
  ResponsiveComponents.name,
  ResponsiveContainers.name
  // Add additional external Angular dependencies here
];


const ngModule = angular.module('da.responsive', ngDependencies);

ngModule.config(config)
  .run(init);
