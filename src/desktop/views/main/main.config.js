function mainConfig($stateProvider) {
  require('./main.css');

  $stateProvider.state('main', {
    url: '/',
    template: require('./main.template.html'),
    controller: require('./Main.ctrl.js'),
    controllerAs: 'main',
  });
}

mainConfig.$inject = ['$stateProvider'];

module.exports = mainConfig;
