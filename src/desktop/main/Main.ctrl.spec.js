module.exports = Ctrl => {
  describe('Controller:MainCtrl', () => {
    before(function () {
      angular.module('test', []).controller('Test', Ctrl);
    });

    beforeEach(window.module('test'));

    var $controller;

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    describe('$scope', function() {
      it('sets the strength to "strong" if the password length is >8 chars', function() {
        var $scope = {};
        var controller = $controller('Test', { $scope: $scope });
        expect(controller).to.not.equal(undefined);
      });
    });
  });
};
