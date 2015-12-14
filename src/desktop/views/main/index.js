module.exports = angular => {
  const ngModule = angular
    .module('da.desktop.main', [])
    .config(require('./main.config.js'));

  return ngModule;
};
