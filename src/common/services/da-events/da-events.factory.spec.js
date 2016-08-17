module.exports = ngModule => {
  const factory = require('./da-events.factory.js');

  //console.log(ngModule.name);
  factory(ngModule);

  describe('factory:daEvents', () => {
    let daEvents;
    let callbackSpy;

    beforeEach(window.module(ngModule.name));
    beforeEach(inject(_daEvents_ => {
      daEvents = _daEvents_;
    }));
    beforeEach(() => {
      callbackSpy = sinon.spy();
    });

    it('should emit registered events', () => {
      callbackSpy = sinon.spy();
      daEvents.on('app:loaded', callbackSpy);
      daEvents.trigger('app:loaded');
      expect(callbackSpy.calledOnce).to.equal(true);
    });

    it('should not allow a listener to be setup for event that is not in registry', () => {
      callbackSpy = sinon.spy();
      expect(daEvents.on('not:in:registry', callbackSpy)).to.equal(null);
      expect(daEvents.trigger('not:in:registry')).to.equal(null);
      expect(callbackSpy.calledOnce).to.equal(false);
    });
  });
};
