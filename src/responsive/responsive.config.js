import reducer from '../common/store/reducers';
module.exports = config;

function config($ngReduxProvider, $urlRouterProvider) {
  $ngReduxProvider.createStoreWith(reducer);
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$ngReduxProvider', '$urlRouterProvider'];
