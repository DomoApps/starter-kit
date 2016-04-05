require('babel-polyfill');
require('./styles/typebase.css');

const ngModule = angular.module('da.common', []);

requireAll(require.context('./services', true, /\.factory\.js$/))
	.forEach(module => module(ngModule));

requireAll(require.context('./filters', true, /\.filter\.js$/))
	.forEach(module => module(ngModule));

requireAll(require.context('./components', true, /\.(component|directive)\.js$/))
	.forEach(module => module(ngModule));


export default ngModule;


function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
