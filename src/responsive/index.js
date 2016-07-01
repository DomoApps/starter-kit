require('./responsive.css');

import angular from 'angular';
import { attachAll, getNgModuleNames } from '../../other/boilerplate-utils.js';

const ngDependencies = [
  'ui.router',
  'ngAnimate',
  require('../common').name,
  // Add additional external Angular dependencies here
];

ngDependencies.push.apply(ngDependencies, getNgModuleNames(require.context('./routes', true, /index\.js$/)));


const ngModule = angular.module('da.responsive', ngDependencies)
  .constant('$', require('jquery'))
  .constant('d3', require('d3'))
  .constant('_', require('lodash'));

attachAll(require.context('./components', true, /\.(component|directive)\.js$/))(ngModule);
attachAll(require.context('./containers', true, /\.(component|directive)\.js$/))(ngModule);

ngModule.config(require('./responsive.config.js'))
  .run(require('./responsive.init.js'));
