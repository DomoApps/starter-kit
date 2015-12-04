require('./mobile.css');
const angular = require('angular');

var ngModule = angular
  .module('da.mobile', [
    'ui.router',
    'ngAnimate',
    // require('./feature')(angular).name
  ])
  .constant('$', require('jquery'))
  .constant('d3', require('d3'))
  .constant('_', require('lodash'))
  .config($urlRouterProvider => {
    $urlRouterProvider.otherwise('/main');
  });
