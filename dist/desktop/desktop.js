(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("angular"), require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "angular", "d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash"), require("angular"), require("d3")) : factory(root["_"], root["angular"], root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(17);
	var angular = __webpack_require__(8);

	if (false) {
	  require('angular-mocks/angular-mocks');
	}

	angular.module('project.desktop', ['ui.router']).
	// features
	constant('d3', __webpack_require__(9)).constant('_', __webpack_require__(7));

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ":root {\n\n  /* Base font size in pixels. This would result in 14px on desktop */\n\n  /* How large the line height is as a multiple of font size */\n\n  /* Rate of growth for headings\n   * I actually like this to be slightly smaller then the leading. Makes for tight headings.\n   */\n}\n\nbody {\n  color: #99ccee;\n}", ""]);

	// exports


/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(4, function() {
				var newContent = __webpack_require__(4);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }
])
});
;
//# sourceMappingURL=desktop.js.map