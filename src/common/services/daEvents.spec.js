/**
 * Here you can write tests for you service
 * @param  {Angular Module} ngModule The module with the service
 */
module.exports = ngModule => {
  describe('factory:daEvents', () => {
    let daEvents;

    beforeEach(window.module(ngModule.name));

    beforeEach(inject(_daEvents_ => {
      daEvents = _daEvents_;
    }));

    it('should exist emit registered events', () => {
      const spy = sinon.spy();
      daEvents.on('app:loaded', spy);
      daEvents.trigger('app:loaded');
      expect(spy.calledOnce).to.equal(true);
    });

    it('should not allow a listener to be setup for event that is not in registry', () => {
      const spy = sinon.spy();
      daEvents.on('not:in:registry', spy);
      daEvents.trigger('not:in:registry');
      expect(spy.calledOnce).to.equal(false);
    });
  });
};
