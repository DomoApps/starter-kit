require('./mobile.css');
const angular = require('angular');

const ngDependencies = [
  'ui.router',
  'ngAnimate',
  require('../common').name,
  // Add additional external Angular dependencies here
];

requireAll(require.context('./routes', true, /\.route\.js$/))
  .forEach(route => ngDependencies.push(route(angular).name));

const ngModule = angular.module('da.mobile', ngDependencies)
  .constant('$', require('jquery'))
  .constant('d3', require('d3'))
  .constant('_', require('lodash'));

requireAll(require.context('./components', true, /\.(component|directive)\.js$/))
  .forEach(module => module(ngModule));

requireAll(require.context('./containers', true, /\.(component|directive)\.js$/))
  .forEach(module => module(ngModule));


ngModule.config(require('./mobile.config.js'))
  .run(require('./mobile.init.js'));


function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
