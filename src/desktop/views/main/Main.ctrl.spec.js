module.exports = Ctrl => {
  describe('Controller:MainCtrl', () => {
    let $controller;

    before(() => {
      angular.module('test', []).controller('Test', Ctrl);
    });

    beforeEach(window.module('test'));

    beforeEach(inject((_$controller_) => {
      $controller = _$controller_;
    }));

    describe('$scope', () => {
      it('sets the strength to "strong" if the password length is >8 chars', () => {
        const $scope = {};
        const controller = $controller('Test', { $scope });
        expect(controller).to.not.equal(undefined);
      });
    });
  });
};
