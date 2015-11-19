module.exports = angular => {
  var ngModule = angular.module('project.mobile.feature', [])
    .config($stateProvider => {
      $stateProvider
        .state('feature', {
          url: '/feature',
          views: {
            'main': {
              template: require('./feature.template.html'),
              controller: 'FeatureCtrl',
              controllerAs: 'feature'
            }
          }
        });
    });

  require('./feature.ctrl')(ngModule);
  require('./directive/hello.directive')(ngModule);
  return ngModule;
};