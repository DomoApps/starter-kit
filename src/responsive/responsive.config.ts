import reducer from '../common/store/reducers';

export default function config($ngReduxProvider, $urlRouterProvider) {
  $ngReduxProvider.createStoreWith(reducer);
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$ngReduxProvider', '$urlRouterProvider'];
