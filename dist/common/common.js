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
return webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(16);

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ":root {\n\n  /* Base font size in pixels. This would result in 14px on desktop */\n\n  /* How large the line height is as a multiple of font size */\n\n  /* Rate of growth for headings\n   * I actually like this to be slightly smaller then the leading. Makes for tight headings.\n   */\n}\n\n/* Setup */\nhtml {\n\t/* Change default typefaces here */\n\tfont-family: serif;\n\tfont-size: 14px;\n\tfont-size: 87.5%;\n\t/* Make everything look a little nicer in webkit */\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-size-adjust: auto;\n\t    -ms-text-size-adjust: auto;\n\t        text-size-adjust: auto;\n}\n\n/* Copy & Lists */\np {\n\tline-height: 21px;\n\tline-height: 1.5rem;\n\tmargin-top: 21px;\n\tmargin-top: 1.5rem;\n\tmargin-bottom: 0;\n}\nul,\nol {\n\tmargin-top: 21px;\n\tmargin-top: 1.5rem;\n\tmargin-bottom: 21px;\n\tmargin-bottom: 1.5rem;\n}\nul li,\nol li {\n\tline-height: 21px;\n\tline-height: 1.5rem;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n}\nblockquote {\n\tline-height: 21px;\n\tline-height: 1.5rem;\n\tmargin-top: 21px;\n\tmargin-top: 1.5rem;\n\tmargin-bottom: 21px;\n\tmargin-bottom: 1.5rem;\n}\n\n/* Headings */\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\t/* Change heading typefaces here */\n\tfont-family: sans-serif;\n\tmargin-top: 21px;\n\tmargin-top: 1.5rem;\n\tmargin-bottom: 0;\n\tline-height: 21px;\n\tline-height: 1.5rem;\n}\nh1 {\n\tfont-size: 59px;\n\tfont-size: 4.242rem;\n\tline-height: 63px;\n\tline-height: 4.5rem;\n\tmargin-top: 42px;\n\tmargin-top: 3rem;\n}\nh2 {\n\tfont-size: 39px;\n\tfont-size: 2.828rem;\n\tline-height: 42px;\n\tline-height: 3rem;\n\tmargin-top: 42px;\n\tmargin-top: 3rem;\n}\nh3 {\n\tfont-size: 19px;\n\tfont-size: 1.414rem;\n}\nh4 {\n\tfont-size: 9px;\n\tfont-size: 0.707rem;\n}\nh5 {\n\tfont-size: 6px;\n\tfont-size: 0.47133rem;\n}\nh6 {\n\tfont-size: 4px;\n\tfont-size: 0.3535rem;\n}\n\n/* Tables */\ntable {\n\tmargin-top: 21px;\n\tmargin-top: 1.5rem;\n\tborder-spacing: 0px;\n\tborder-collapse: collapse;\n}\ntd,\nth {\n\tpadding: 0;\n\tline-height: 21px;\n}\n\n/* Code blocks */\ncode {\n\t/* Forces text to constrain to the line-height. Not ideal, but works. */\n\tvertical-align: bottom;\n}\n\n/* Leading paragraph text */\n.lead {\n\tfont-size: 19px;\n\tfont-size: 1.414rem;\n}\n\n/* Hug a the block above you */\n.hug {\n\tmargin-top: 0;\n}", ""]);

	// exports


/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(3, function() {
				var newContent = __webpack_require__(3);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

})
});
;
//# sourceMappingURL=common.js.map