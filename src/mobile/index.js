require('./mobile.css');
const angular = require('angular');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}
if (ON_DEV) {
  require('webpack/hot/dev-server');
}

var ngModule = angular
  .module('project.mobile', [
    'ui.router',
    // features
    require('./feature')(angular).name
  ])
  .constant('d3', require('d3'))
  .constant('_', require('lodash'))
  .config($urlRouterProvider => {
    $urlRouterProvider.otherwise('/feature');
  });

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [ngModule.name], {strictDi: true});
});