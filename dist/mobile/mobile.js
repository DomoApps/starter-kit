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
return webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(19);
	var angular = __webpack_require__(8);

	if (false) {
	  require('angular-mocks/angular-mocks');
	}
	if (true) {
	  __webpack_require__(20);
	}

	var ngModule = angular.module('project.mobile', ['ui.router',
	// features
	__webpack_require__(12)(angular).name]).constant('d3', __webpack_require__(9)).constant('_', __webpack_require__(7)).config(["$urlRouterProvider", function ($urlRouterProvider) {
	  $urlRouterProvider.otherwise('/feature');
	}]);

	angular.element(document).ready(function () {
	  angular.bootstrap(document.body, [ngModule.name], { strictDi: true });
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ".hello {\n}\n.hello span {\n    color: red\n}", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ":root {\n\n  /* Base font size in pixels. This would result in 14px on desktop */\n\n  /* How large the line height is as a multiple of font size */\n\n  /* Rate of growth for headings\n   * I actually like this to be slightly smaller then the leading. Makes for tight headings.\n   */\n}\n\nbody {\n  color: #99ccee;\n}", ""]);

	// exports


/***/ },
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = __webpack_require__(13)['default'];

	exports.__esModule = true;

	exports['default'] = function (ngModule) {
	  var FeatureCtrl =
	  // @ngInject
	  ["$http", function FeatureCtrl($http) {
	    _classCallCheck(this, FeatureCtrl);

	    this.bindMe = 'Hello world';
	    $http.get('/data/v1/widgets').then(function (response) {
	      console.log(response.data);
	    });
	  }];

	  ngModule.controller('FeatureCtrl', FeatureCtrl);
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
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

	  __webpack_require__(11)(ngModule);
	  __webpack_require__(10)(ngModule);
	  return ngModule;
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

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
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(5, function() {
				var newContent = __webpack_require__(5);
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
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(6, function() {
				var newContent = __webpack_require__(6);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				__webpack_require__(21)(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			console.log('message', event);
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ }
])
});
;
//# sourceMappingURL=mobile.js.map