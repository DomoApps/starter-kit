module.exports = config;

function config($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$urlRouterProvider'];
