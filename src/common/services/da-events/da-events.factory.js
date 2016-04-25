module.exports = ngModule => {
  function daEvents($rootScope, $q, $log) {
    // central place for documenting app events
    const _eventRegistry = {
      'app:loaded': 'This event is fired when the appFrame as finished loading.',
    };

    // Create promise to reolve when appFrame has finished animating
    const _diferred = $q.defer();
    const offFn = $rootScope.$on('app:loaded', () => {
      _diferred.resolve('The app has loaded!');
      // This will un-register the event listener once its happend.
      offFn();
    });

    // Public API here
    const api = {
      /**
       * Registers an event listener if it is defined in `_eventRegistry` object.
       * @param  {string} name     Name of event. Must match key in `_eventRegistry` object.
       * @param  {func}   listener The function to be called when event is triggered. First param is $event obj.
       * @return {unbind}          Returns the unbind function for use of destroying event.
       */
      on(name, listener) {
        if (_eventRegistry.hasOwnProperty(name)) {
          return $rootScope.$on(name, listener);
        }
        $log.error('No event registered with name: ' + name);
        return null;
      },
      /**
       * Triggers an event that has been defined in `eventRegistry` object.
       * @param  {string} name Name of event to trigger. Must be defined first.
       * @param  {[.]}    args Args to pass to callback.
       * @return {[type]}      [description]
       */
      trigger(name, args) {
        if (_eventRegistry.hasOwnProperty(name)) {
          return $rootScope.$emit(name, args);
        }
        $log.error('No event registered with name: ' + name);
        return null;
      },
    };

    // promise that is resolved when 'app:loaded' event is fired.
    api.appLoadPromise = _diferred.promise;

    return api;
  }

  daEvents.$inject = ['$rootScope', '$q', '$log'];

  ngModule.factory('daEvents', daEvents);

  if (ON_TEST) {
    require('./da-events.factory.spec.js')(ngModule);
  }

  return ngModule;
};
