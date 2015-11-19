require('./desktop.css');
const angular = require('angular');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}
if (ON_DEV) {
  require('webpack/hot/dev-server');
}

angular
  .module('project.desktop', [
    'ui.router',
    // features
  ])
  .constant('d3', require('d3'))
  .constant('_', require('lodash'));