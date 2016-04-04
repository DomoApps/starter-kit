require('./mobile.css');
const angular = require('angular');

angular
  .module('da.mobile', [
    'ui.router',
    'ngAnimate',
    require('../common').name,
    // require('./feature')(angular).name,
  ])
  .constant('$', require('jquery'))
  .constant('d3', require('d3'))
  .constant('_', require('lodash'))
  .config($urlRouterProvider => {
    $urlRouterProvider.otherwise('/');
  });
