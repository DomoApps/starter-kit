module.exports = angular => {
  var ngModule = angular.module('da.desktop.services', []);
  
  require('./daEvents.factory.js')(ngModule);
  
  return ngModule;
};