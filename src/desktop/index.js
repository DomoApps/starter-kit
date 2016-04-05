require('./desktop.css');
const angular = require('angular');

const ngDependencies = [
  'ui.router',
  'ngAnimate'
  // Add additional external Angular dependencies here
];

requireAll(require.context('./routes/*', /index.js$/))
  .forEach(route => ngDependencies.push(route(angularObj).name));

const ngModule = angular.module('da.desktop', ngDependencies)
  .constant('$', require('jquery'))
  .constant('d3', require('d3'))
  .constant('_', require('lodash'));

requireAll(require.context('./components', true, /\.(component|directive)\.js$/))
.map(module => { module(ngModule); });

requireAll(require.context('./containers', true, /\.(component|directive)\.js$/))
  .map(module => { module(ngModule); });

ngModule.config(require('./desktop.config.js'))
  .run(require('./desktop.init.js'));


function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
