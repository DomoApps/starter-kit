require('./desktop.css');

import angular from 'angular';
import { attachAll, injectAll } from '../../other/boilerplate-utils.js';

const ngDependencies = [
  'ui.router',
  'ngAnimate',
  require('../common').name,
  // Add additional external Angular dependencies here
];

ngDependencies.push.apply(ngDependencies, injectAll(require.context('./routes', true, /\.route\.js$/)));

const ngModule = angular.module('da.desktop', ngDependencies)
  .constant('$', require('jquery'))
  .constant('d3', require('d3'))
  .constant('_', require('lodash'));

attachAll(require.context('./components', true, /\.(component|directive)\.js$/))(ngModule);
attachAll(require.context('./containers', true, /\.(component|directive)\.js$/))(ngModule);

ngModule.config(require('./desktop.config.js'))
  .run(require('./desktop.init.js'));
