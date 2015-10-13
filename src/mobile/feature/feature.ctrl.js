export default ngModule => {
  class FeatureCtrl {
    // @ngInject
    constructor () {
      this.bindMe = 'Hello world';
    }
  }

  ngModule.controller('FeatureCtrl', FeatureCtrl);
};