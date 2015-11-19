module.exports = ngModule => {

  ngModule.directive('hello', () => {
    require('./hello.css');
    return {
      restrict: 'E',
      scope: {},
      template: require('./hello.directive.html'),
      controllerAs: 'vm',
      controller: function() {
        const vm = this;
        vm.greeting = 'Hello Nick';
      }
    };
  });
  
  if (ON_TEST) {
    require('./hello.directive.spec')(ngModule);
  }
};