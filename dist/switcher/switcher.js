(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/*
	 * DO NOT EDIT ME!
	 */
	'use strict';

	var re = /platform=(\w+)\W*/ig;
	var match = re.exec(location.search);

	if (match) {
	  var platform = match[1];
	  var params = location.search || '';
	  var url = '/' + platform + '/index.html' + params;

	  var request = new XMLHttpRequest();
	  request.open('GET', url, true);
	  request.onload = function () {
	    if (request.status >= 200 && request.status < 400) {
	      window.location.replace(url);
	    } else {
	      window.location.replace('/desktop/index.html' + params);
	    }
	  };
	  request.onerror = function () {
	    window.location.replace('/desktop/index.html' + params);
	  };
	  request.send();
	} else if (location.hostname === 'localhost') {
	  window.location.replace('/lab.html');
	} else {
	  window.location.replace('/desktop/index.html');
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=switcher.js.map