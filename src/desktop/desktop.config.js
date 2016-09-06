module.exports = config;

function config($ngReduxProvider, $urlRouterProvider) {
  $ngReduxProvider.createStoreWith(require('../common/store/reducers'));
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$ngReduxProvider', '$urlRouterProvider'];
