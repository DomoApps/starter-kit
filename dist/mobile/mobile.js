(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("angular"), require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "angular", "d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash"), require("angular"), require("d3")) : factory(root["_"], root["angular"], root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(19);
	var angular = __webpack_require__(4);

	if (false) {
	  require('angular-mocks/angular-mocks');
	}
	var ngModule = angular.module('project.mobile', ['ui.router',
	// features
	__webpack_require__(8)(angular).name]).constant('d3', __webpack_require__(5)).constant('_', __webpack_require__(3)).config(["$urlRouterProvider", function ($urlRouterProvider) {
	  $urlRouterProvider.otherwise('/feature');
	}]);

	angular.element(document).ready(function () {
	  angular.bootstrap(document.body, [ngModule.name], { strictDi: true });
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (ngModule) {

	  ngModule.directive('hello', function () {
	    __webpack_require__(18);
	    return {
	      restrict: 'E',
	      scope: {},
	      template: __webpack_require__(14),
	      controllerAs: 'vm',
	      controller: function controller() {
	        var vm = this;
	        vm.greeting = 'Hello Nick';
	      }
	    };
	  });

	  if (false) {
	    require('./hello.directive.spec')(ngModule);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = __webpack_require__(9)['default'];

	exports.__esModule = true;

	exports['default'] = function (ngModule) {
	  var FeatureCtrl =
	  // @ngInject
	  function FeatureCtrl() {
	    _classCallCheck(this, FeatureCtrl);

	    this.bindMe = 'Hello world';
	  };

	  ngModule.controller('FeatureCtrl', FeatureCtrl);
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (angular) {
	  var ngModule = angular.module('project.mobile.feature', []).config(["$stateProvider", function ($stateProvider) {
	    $stateProvider.state('feature', {
	      url: '/feature',
	      views: {
	        'main': {
	          template: __webpack_require__(15),
	          controller: 'FeatureCtrl',
	          controllerAs: 'feature'
	        }
	      }
	    });
	  }]);

	  __webpack_require__(7)(ngModule);
	  __webpack_require__(6)(ngModule);
	  return ngModule;
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ".hello {\n}\n.hello span {\n    color: blue\n}", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ":root {\n\n  /* Base font size in pixels. This would result in 14px on desktop */\n\n  /* How large the line height is as a multiple of font size */\n\n  /* Rate of growth for headings\n   * I actually like this to be slightly smaller then the leading. Makes for tight headings.\n   */\n}\n\nbody {\n  color: red;\n}", ""]);

	// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hello\">\n  <span>{{vm.greeting}}</span>\n</div>"

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<h1>Mobile</h1>\n<hello></hello>"

/***/ },
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/postcss-loader/index.js!./hello.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/postcss-loader/index.js!./hello.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./mobile.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./mobile.css");
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
//# sourceMappingURL=mobile.js.map