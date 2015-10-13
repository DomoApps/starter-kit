export default ngModule => {
  class FeatureCtrl {
    // @ngInject
    constructor ($http) {
      this.bindMe = 'Hello world';
    }
  }

  ngModule.controller('FeatureCtrl', FeatureCtrl);
};