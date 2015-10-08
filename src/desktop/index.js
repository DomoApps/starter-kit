require('./desktop.css');
const angular = require('angular');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

angular
  .module('project.desktop', [
    'ui.router',
    // features
  ])
  .constant('d3', require('d3'))
  .constant('_', require('lodash'));