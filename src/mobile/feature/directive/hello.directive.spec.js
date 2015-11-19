module.exports = ngModule => {
  describe('hello', () => {
    beforeEach(window.module(ngModule.name));

    it('should test properly', () => {
      expect(true).to.be.true;
    });
  });
};