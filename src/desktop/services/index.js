module.exports = angular => {
  const ngModule = angular.module('da.desktop.services', []);

  require('./daEvents.factory.js')(ngModule);

  return ngModule;
};
