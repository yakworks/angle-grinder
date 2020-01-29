(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["wJ4t","jquery-libs","vendor-libs"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+5hd":
/*!*********************************************************!*\
  !*** ./examples/ag-demo-ui/src/org/orgSelectOptions.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrgSelectOptions; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* @ngInject */
var OrgSelectOptions = function OrgSelectOptions(Select2Options, pathWithContext) {
  _classCallCheck(this, OrgSelectOptions);

  return function () {
    return Select2Options({
      width: 190,
      ajax: {
        url: pathWithContext("/org/pickList")
      },
      // formatters for result and selection
      formatResult: function formatResult(org) {
        return org.name;
      },
      formatSelection: function formatSelection(org) {
        return org.name;
      }
    });
  };
};

OrgSelectOptions.$inject = ["Select2Options", "pathWithContext"];
OrgSelectOptions.$inject = ["Select2Options", "pathWithContext"];


/***/ }),

/***/ "+MsD":
/*!********************************************!*\
  !*** ./src/scripts/common/commonModule.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "ijCd");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/filter */ "k4Da");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-route */ "STM2");
/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular_route__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-ui-bootstrap */ "+pEV");
/* harmony import */ var angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var angular_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-scroll */ "nhnV");
/* harmony import */ var angular_scroll__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular_scroll__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_ConfirmationDialogServ__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/ConfirmationDialogServ */ "Aced");







var MOD_NAME = 'ag.common';
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);
var common = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(MOD_NAME, [angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_4___default.a, angular_route__WEBPACK_IMPORTED_MODULE_3___default.a, angular_scroll__WEBPACK_IMPORTED_MODULE_5___default.a // Scroll
]).service('ConfirmationDialogServ', _services_ConfirmationDialogServ__WEBPACK_IMPORTED_MODULE_6__["default"]); // change default locale to use `-` symbol for negative currencies

common.config(["$localeProvider", "$provide", function ($localeProvider, $provide) {
  var defaultLocale = $localeProvider.$get();
  angular__WEBPACK_IMPORTED_MODULE_2___default.a.extend(defaultLocale.NUMBER_FORMATS.PATTERNS[1], {
    negPre: '-',
    negSuf: ''
  });
  return $provide.value('$locale', defaultLocale);
}]); // Decorates `$http.pendingRequests` with some useful features

common.factory('pendingRequests', ["$http", function ($http) {
  var pendingRequests = function pendingRequests() {
    return pendingRequests.any();
  }; // Returns true if any http request is in progress


  pendingRequests.any = function () {
    return pendingRequests.for('GET', 'POST', 'PUT', 'PATCH', 'DELETE');
  }; // Returns true if a http request with the given method is in progress


  pendingRequests.for = function () {
    for (var _len = arguments.length, httpMethods = new Array(_len), _key = 0; _key < _len; _key++) {
      httpMethods[_key] = arguments[_key];
    }

    var requests = lodash_filter__WEBPACK_IMPORTED_MODULE_1___default()($http.pendingRequests, function (request) {
      return lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(httpMethods, request.method);
    });

    return requests.length > 0;
  };

  return pendingRequests;
}]); // Camelizes the given string

common.value('camelize', function (str) {
  return str.replace(/(\-|\.|_|\s)+(.)?/g, function (match, p1, p2) {
    if (p2) {
      return p2.toUpperCase();
    } else {
      return '';
    }
  });
}); // Due to changes in angular 1.6 see https://docs.angularjs.org/guide/migration#commit-aa077e8

common.config(['$locationProvider', function ($locationProvider) {
  return $locationProvider.hashPrefix('');
}]); //FIX the bad location on popover

common.config(["$uibTooltipProvider", function ($uibTooltipProvider) {
  $uibTooltipProvider.options({
    appendToBody: true
  });
}]);

/***/ }),

/***/ "+eM2":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "/0Q1":
/*!*************************************************************!*\
  !*** ./node_modules/free-jqgrid/plugins/ui.multiselect.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "/BjM":
/*!***********************************************************!*\
  !*** ./src/scripts/gridz/directives/agGrid/agGridCtrl.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/pick */ "JZM8");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/find */ "J2m7");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/keys */ "7GkX");
/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/difference */ "zqxM");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/bind */ "JpaV");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../gridzModule */ "LyZ+");
/* harmony import */ var _utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/BaseCtrl */ "MhVr");








function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var gridz = angular__WEBPACK_IMPORTED_MODULE_7___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_8__["default"]); // Wrapper for jqGrid public API
// Controller instance could be published to the parent scope
// with `ag-grid-name` directive, for example:
// `<div ag-grid="gridOptions" ag-grid-name="usersGrid"></div>`

var AgGridCtrl = function () {
  var highlightClass = undefined;

  AgGridCtrl =
  /*#__PURE__*/
  function (_BaseCtrl) {
    _inherits(AgGridCtrl, _BaseCtrl);

    function AgGridCtrl() {
      _classCallCheck(this, AgGridCtrl);

      return _possibleConstructorReturn(this, _getPrototypeOf(AgGridCtrl).apply(this, arguments));
    }

    _createClass(AgGridCtrl, [{
      key: "getGridEl",
      value: function getGridEl() {
        return this.gridEl || (this.gridEl = this.$element.find("table.gridz"));
      }
    }, {
      key: "getGridId",
      value: function getGridId() {
        return this.getGridEl().attr("id");
      } // Gives the currently selected rows when multiselect is set to true.
      // This is a one-dimensional array and the values in the array correspond
      // to the selected id's in the grid.

    }, {
      key: "getSelectedRowIds",
      value: function getSelectedRowIds() {
        return this.getParam("selarrrow");
      } //Gives selected row objects, [{id:1..}, {id:2..}]

    }, {
      key: "getSelectedRows",
      value: function getSelectedRows() {
        var getRowData = lodash_bind__WEBPACK_IMPORTED_MODULE_6___default()(this.getRowData, this);

        var ids = this.getSelectedRowIds();
        return lodash_map__WEBPACK_IMPORTED_MODULE_5___default()(ids, function (id) {
          return getRowData(id);
        });
      }
    }, {
      key: "clearSelection",
      value: function clearSelection() {
        return this.getGridEl().jqGrid('resetSelection');
      } // Returns an array with data of the requested id = rowid.
      // The returned array is of type name:value, where the name is
      // a name from colModel and the value from the associated column in that row.
      // It returns an empty array if the rowid can not be found.

    }, {
      key: "getRowData",
      value: function getRowData() {
        var rowId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this.getGridEl().getRowData(rowId);
      } //Return all rows

    }, {
      key: "getAllRows",
      value: function getAllRows() {
        return this.getGridEl().getRowData();
      } // Populates the grid with the given data.

    }, {
      key: "addJSONData",
      value: function addJSONData(data) {
        // The addJSONData is very old method which uses still expandos
        // to the DOM element of the grid (<table> element).
        this.getGridEl().get(0).addJSONData(data); // broadcasts the AngularJS event

        return this.$rootScope.$broadcast("gridz:loadComplete", data);
      } // Reloads the grid with the current settings

    }, {
      key: "reload",
      value: function reload(options) {
        if (options == null) {
          options = [];
        }

        var deferred = this.$q.defer();
        var unregister = this.$rootScope.$on("gridz:loadComplete", function (_, data) {
          deferred.resolve(data);
          return unregister();
        });
        this.getGridEl().trigger("reloadGrid", options);
        return deferred.promise;
      } // Gets a particular grid parameter

    }, {
      key: "getParam",
      value: function getParam(name) {
        return this.getGridEl().getGridParam(name);
      } // Sets the given grid parameter

    }, {
      key: "setParam",
      value: function setParam(params) {
        return this.getGridEl().setGridParam(params);
      } // Updates the values (using the data array) in the row with rowid.
      // The syntax of data array is: {name1:value1,name2: value2...}
      // where the name is the name of the column as described in the colModel
      // and the value is the new value.

    }, {
      key: "updateRow",
      value: function updateRow(id, data, emptyMissingCells) {
        if (emptyMissingCells == null) {
          emptyMissingCells = true;
        }

        var flatData = this.FlattenServ(data);
        var prevData = this.getRowData(id);

        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_4___default()(prevData)) {
          // retrieve a list of removed keys
          var diff = lodash_difference__WEBPACK_IMPORTED_MODULE_3___default()(lodash_keys__WEBPACK_IMPORTED_MODULE_2___default()(prevData), lodash_keys__WEBPACK_IMPORTED_MODULE_2___default()(flatData)); // filter out restricted (private) columns like `-row_action_col`


          var restrictedColumns = function restrictedColumns(key) {
            return !key.match(/^-/);
          };

          diff = diff.filter(restrictedColumns); // set empty values

          if (emptyMissingCells) {
            for (var _i = 0, _Array$from = Array.from(diff); _i < _Array$from.length; _i++) {
              var key = _Array$from[_i];
              flatData[key] = null;
            }
          }
        }

        this.getGridEl().setRowData(id, flatData);
        this.flashOnSuccess(id);
        return this.$rootScope.$broadcast("gridz:rowUpdated", this.$attrs.agGrid, id, data);
      } // Inserts a new row with id = rowid containing the data in data (an object) at
      // the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
      // The syntax of the data object is: {name1:value1,name2: value2...}
      // where name is the name of the column as described in the colModel and the value is the value.

    }, {
      key: "addRow",
      value: function addRow(id, data, position) {
        if (position == null) {
          position = "first";
        }

        this.getGridEl().addRowData(id, this.FlattenServ(data), position);
        this.$rootScope.$broadcast("gridz:rowAdded", this.$attrs.agGrid, id, data);
        return this.flashOnSuccess(id);
      } // Returns `true` if the grid contains a row with the given id

    }, {
      key: "hasRow",
      value: function hasRow(id) {
        return !!this.getGridEl().getInd(id);
      } // Returns an array of the id's in the current grid view.
      // It returns an empty array if no data is available.

    }, {
      key: "getIds",
      value: function getIds() {
        return this.getGridEl().getDataIDs();
      } // Returns the current page

    }, {
      key: "getCurrentPage",
      value: function getCurrentPage() {
        return this.getParam("page");
      } // Returns the total number of records

    }, {
      key: "getTotalRecords",
      value: function getTotalRecords() {
        return this.getParam("records");
      } // Returns the number of rows per page

    }, {
      key: "getPageSize",
      value: function getPageSize() {
        return this.getParam("rowNum");
      } // Returns the total number of pages

    }, {
      key: "getTotalPages",
      value: function getTotalPages() {
        return Math.ceil(this.getTotalRecords() / this.getPageSize());
      } // return true if the current grid view displays the first page

    }, {
      key: "isFirstPage",
      value: function isFirstPage() {
        var page = this.getCurrentPage();
        return page === 1;
      } // return true if the current grid view displays the last page

    }, {
      key: "isLastPage",
      value: function isLastPage() {
        var page = this.getCurrentPage();
        return page === this.getTotalPages();
      } // Loads the previous page

    }, {
      key: "prevPage",
      value: function prevPage() {
        if (this.isFirstPage()) {
          return this.lastPage();
        }

        var page = this.getCurrentPage();
        return this.loadPage(page - 1);
      } // Loads the next page

    }, {
      key: "nextPage",
      value: function nextPage() {
        if (this.isLastPage()) {
          return this.firstPage();
        }

        var page = this.getCurrentPage();
        return this.loadPage(page + 1);
      } // Loads the first page

    }, {
      key: "firstPage",
      value: function firstPage() {
        return this.loadPage(1);
      } // Loads the last page

    }, {
      key: "lastPage",
      value: function lastPage() {
        return this.loadPage(this.getTotalPages());
      } // Load the specific page

    }, {
      key: "loadPage",
      value: function loadPage(page) {
        this.setParam({
          page: page
        });
        return this.reload();
      }
    }, {
      key: "saveRow",
      value: function saveRow(id, data) {
        if (this.hasRow(id)) {
          return this.updateRow(id, data);
        } else {
          return this.addRow(id, data);
        }
      } // Deletes the row with the id = rowid.
      // This operation does not delete data from the server.

    }, {
      key: "removeRow",
      value: function removeRow(id) {
        var _this = this;

        return this.flashOnSuccess(id, function () {
          return _this.getGridEl().delRowData(id);
        });
      } // Sets the grid search filters and triggers a reload

    }, {
      key: "search",
      value: function search(filters) {
        var deferred = this.$q.defer();
        var params = {
          page: 1,
          search: this.hasSearchFilters(filters),
          postData: {
            filters: JSON.stringify(filters)
          }
        };
        this.setParam(params);
        var promise = this.reload();
        promise.then(function () {
          return deferred.resolve(filters);
        });
        return deferred.promise;
      } // Returns `true` if a columnt with the given id is hidden

    }, {
      key: "isColumnHidden",
      value: function isColumnHidden(columnId) {
        var column = lodash_find__WEBPACK_IMPORTED_MODULE_1___default()(this.getParam("colModel"), {
          name: columnId
        });

        return column === null || column === void 0 ? void 0 : column.hidden;
      } // Toggle visibility of a column with the given id

    }, {
      key: "toggleColumn",
      value: function toggleColumn(columnId) {
        var showOrHide = this.isColumnHidden(columnId) ? "showCol" : "hideCol";
        this.getGridEl().jqGrid(showOrHide, columnId);
        return this._triggerResize();
      } // Invokes a dialog for choosing and reordering grid's columns
      // see: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3ajquery_ui_methods#column_chooser

    }, {
      key: "columnChooser",
      value: function columnChooser(options) {
        var _this2 = this;

        // Function which will be called when the user press Ok button
        // inside the column chooser dialog.
        if (options == null) {
          options = {};
        }

        options.done = function (perm) {
          // call `remapColumns` method in order to reorder the columns
          if (perm) {
            _this2.getGridEl().jqGrid("remapColumns", perm, true);
          } // TODO wrap it into service
          // Store chosen column in the local storage


          var chosenColumns = lodash_map__WEBPACK_IMPORTED_MODULE_5___default()(_this2._getColModel(), function (column) {
            return lodash_pick__WEBPACK_IMPORTED_MODULE_0___default()(column, "name", "hidden");
          });

          return window.localStorage.setItem("gridz.".concat(_this2.getGridId(), ".chosenColumns"), angular__WEBPACK_IMPORTED_MODULE_7___default.a.toJson(chosenColumns));
        };

        return this.getGridEl().jqGrid("columnChooser", options);
      } // Returns data uri with xls file content for rows from the current grid view.

    }, {
      key: "getXlsDataUri",
      value: function getXlsDataUri() {
        return this.xlsData(this.getGridId(), this.getSelectedRowIds());
      }
    }, {
      key: "getCsvData",
      value: function getCsvData() {
        return this.csvData(this.getGridId(), this.getSelectedRowIds());
      } // Triggers grid's resize event
      // @private
      // TODO fix grid resizing issues
      // TODO resize after column chooser dialog

    }, {
      key: "_triggerResize",
      value: function _triggerResize() {
        return this.getGridEl().trigger("resize");
      } // Flash the given row

    }, {
      key: "flashOnSuccess",
      value: function flashOnSuccess(id, complete) {
        if (complete == null) {
          complete = angular__WEBPACK_IMPORTED_MODULE_7___default.a.noop;
        }

        return this._flashRow(id, "#DFF0D8", complete);
      } // Flash the row with red background

    }, {
      key: "flashOnError",
      value: function flashOnError(id, complete) {
        if (complete == null) {
          complete = angular__WEBPACK_IMPORTED_MODULE_7___default.a.noop;
        }

        return this._flashRow(id, "#FF0000", complete);
      }
    }, {
      key: "_flashRow",
      value: function _flashRow(id, color, complete) {
        if (color == null) {
          color = "#DFF0D8";
        }

        if (complete == null) {
          complete = angular__WEBPACK_IMPORTED_MODULE_7___default.a.noop;
        }

        var rowEl = $(this.getGridEl()[0].rows.namedItem(id));
        rowEl.css("background-color", color);
        rowEl.delay(250).fadeOut("medium", function () {
          return rowEl.css("background-color", "");
        });
        return rowEl.fadeIn("fast", function () {
          return complete();
        });
      }
    }, {
      key: "addClass",
      value: function addClass(id, clazz, animation) {
        if (animation == null) {
          animation = true;
        }

        var rowEl = $(this.getGridEl()[0].rows.namedItem(id));

        if (!rowEl.hasClass(clazz)) {
          if (animation) {
            rowEl.delay(250).fadeOut("medium", function () {
              return rowEl.addClass(clazz);
            });
            return rowEl.fadeIn("fast", function () {
              return angular__WEBPACK_IMPORTED_MODULE_7___default.a.noop();
            });
          } else {
            return rowEl.addClass(clazz);
          }
        }
      }
    }, {
      key: "removeClass",
      value: function removeClass(id, clazz, animation) {
        if (animation == null) {
          animation = true;
        }

        var rowEl = $(this.getGridEl()[0].rows.namedItem(id));

        if (rowEl.hasClass(clazz)) {
          if (animation) {
            rowEl.delay(250).fadeOut("medium", function () {
              return rowEl.removeClass(clazz);
            });
            return rowEl.fadeIn("fast", function () {
              return angular__WEBPACK_IMPORTED_MODULE_7___default.a.noop();
            });
          } else {
            return rowEl.removeClass(clazz);
          }
        }
      }
    }, {
      key: "highlightRow",
      value: function highlightRow(id) {
        var rowEl = $(this.getGridEl()[0].rows.namedItem(id));

        if (!rowEl.hasClass(highlightClass)) {
          return rowEl.addClass(highlightClass);
        }
      }
    }, {
      key: "unHighlightRow",
      value: function unHighlightRow(id) {
        var rowEl = $(this.getGridEl()[0].rows.namedItem(id));

        if (rowEl.hasClass(highlightClass)) {
          return rowEl.removeClass(highlightClass);
        }
      }
    }, {
      key: "addAdditionalFooter",
      value: function addAdditionalFooter(data) {
        var footerRow = this.$element.find('tr.footrow');
        var newFooterRow = undefined;
        newFooterRow = this.$element.find('tr.myfootrow');

        if (newFooterRow.length === 0) {
          // add second row of the footer if it's not exist
          newFooterRow = footerRow.clone();
          newFooterRow.addClass('myfootrow ui-widget-content');
          newFooterRow.insertAfter(footerRow);
        } // calculate the value for the second footer row


        return function () {
          var result = [];

          for (var k in data) {
            var v = data[k];
            var td = newFooterRow.find("[aria-describedby=\"arTranGrid_" + k + '"' + ']');

            if (td.length > 0) {
              if (!isNaN(v)) {
                result.push(td[0].innerHTML = "<div class='pull-right currency-content'>".concat(v, "</div>"));
              } else {
                result.push(td[0].innerHTML = "<div class=''>".concat(v, "</div>"));
              }
            } else {
              result.push(undefined);
            }
          }

          return result;
        }();
      }
    }], [{
      key: "initClass",
      value: function initClass() {
        this.register(gridz, "AgGridCtrl");
        this.inject("$rootScope", "$element", "$attrs", "$q", "hasSearchFilters", "FlattenServ", "xlsData", "csvData");
        highlightClass = 'ui-state-highlight';
      }
    }]);

    return AgGridCtrl;
  }(_utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_9__["default"]);

  AgGridCtrl.initClass();
  return AgGridCtrl;
}();

/***/ }),

/***/ "/s6T":
/*!*******************************!*\
  !*** ./src/styles/all.css.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_css_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor.css.js */ "euIg");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "PGGC");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editable_panels_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editable-panels.css */ "LvVy");
/* harmony import */ var _editable_panels_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editable_panels_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _animations_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animations.scss */ "f+SA");
/* harmony import */ var _animations_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_animations_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var free_jqgrid_css_ui_jqgrid_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! free-jqgrid/css/ui.jqgrid.css */ "UH7L");
/* harmony import */ var free_jqgrid_css_ui_jqgrid_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(free_jqgrid_css_ui_jqgrid_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var free_jqgrid_plugins_ui_multiselect_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! free-jqgrid/plugins/ui.multiselect.css */ "/0Q1");
/* harmony import */ var free_jqgrid_plugins_ui_multiselect_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(free_jqgrid_plugins_ui_multiselect_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gridz_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gridz.scss */ "cgDM");
/* harmony import */ var _gridz_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_gridz_scss__WEBPACK_IMPORTED_MODULE_6__);








/***/ }),

/***/ "0JJ2":
/*!******************************************************!*\
  !*** ./src/scripts/forms/services/PanelFormMixin.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../formsModule */ "O9c1");

var app = angular.module(_formsModule__WEBPACK_IMPORTED_MODULE_0__["default"]); // mixin for forms inside info panels

app.factory('PanelFormMixin', ['$log', function ($log) {
  return function ($scope, args) {
    if (args == null) {
      args = {};
    }

    var _args = args,
        formName = _args.formName; // the form initially is hidden

    $scope.showForm = false; // toggles form visibility

    $scope.toggle = function () {
      $log.debug('[ag] toggle form visibility', $scope);
      return $scope.showForm = !$scope.showForm;
    }; // Dummy action for updating the record.
    // It should be overridden in the controller.


    return $scope.update = function (record) {
      var form = $scope[formName];

      if (form.$invalid) {
        return;
      }

      $log.info('updating the form', form, record);
      return $scope.showForm = false;
    };
  };
}]);

/***/ }),

/***/ "0wR0":
/*!**********************************************!*\
  !*** ./node_modules/toastr/build/toastr.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1PDj":
/*!**************************************!*\
  !*** ./src/scripts/alerts/Alerts.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Alerts; });
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/merge */ "QkVN");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_1__);



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.toastr = __webpack_require__(/*! toastr */ "hUol");

var Alerts =
/*#__PURE__*/
function () {
  function Alerts(alertTimeout) {
    _classCallCheck(this, Alerts);

    // this.$timeout = $timeout
    this.alertTimeout = alertTimeout;
    this.alertsOptions = {
      error: {},
      info: {},
      success: {},
      defaultOptions: {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        onclick: null,
        showDuration: '100',
        hideDuration: '1000',
        timeOut: this.alertTimeout,
        extendedTimeOut: 0,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
        tapToDismiss: false
      }
    };
  }

  _createClass(Alerts, [{
    key: "wrapMessage",
    value: function wrapMessage(text, type) {
      // toastr.options = _.merge(angular.copy(this.alertsOptions.defaultOptions), this.alertsOptions[type])
      toastr.options = lodash_merge__WEBPACK_IMPORTED_MODULE_1___default()({}, this.alertsOptions.defaultOptions, this.alertsOptions[type]);
      var title = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase();
      return toastr[type](text, title);
    } // Helper methods for various alerts types

  }, {
    key: "success",
    value: function success(text) {
      return this.wrapMessage(text, 'success');
    }
  }, {
    key: "info",
    value: function info(text) {
      return this.wrapMessage(text, 'info');
    }
  }, {
    key: "error",
    value: function error(text) {
      return this.wrapMessage(text, 'error');
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(delay, type) {
      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(type)) {
        return this.alertsOptions[type].timeOut = delay;
      } else {
        return this.alertsOptions.defaultOptions.timeOut = delay;
      }
    }
  }, {
    key: "setErrorTimeout",
    value: function setErrorTimeout(delay) {
      return this.setTimeout(delay, 'error');
    }
  }]);

  return Alerts;
}();


Alerts.$inject = ['alertTimeout'];

/***/ }),

/***/ "21rE":
/*!*******************************************************!*\
  !*** ./src/scripts/common/directives/agBackButton.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commonModule */ "+MsD");

 // Button which acts as browser's history back button

angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).directive('agBackButton', ['$window', function ($window) {
  return {
    restrict: 'A',
    link: function link(scope, element) {
      return element.on('click', function (event) {
        event.preventDefault();
        return $window.history.back();
      });
    }
  };
}]);

/***/ }),

/***/ "2IQQ":
/*!******************************************************!*\
  !*** ./src/scripts/common/directives/ieSelectFix.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commonModule */ "+MsD");


angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).directive('ieSelectFix', ['$window', function ($window) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs) {
      return elem.bind('change', function (event) {
        if ($window.navigator.userAgent.indexOf('MSIE 9') > 0) {
          return Array.from(elem).map(function (option) {
            return option.parentNode.insertBefore(option, option);
          });
        }
      });
    }
  };
}]);

/***/ }),

/***/ "2Taq":
/*!***************************************************!*\
  !*** ./src/scripts/resourceSupport/RoutesServ.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resourceModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resourceModule */ "Nf61");


var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_resourceModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.provider('RoutesServ', ['$routeProvider', 'ResourceTemplateServ', function ($routeProvider, ResourceTemplateServ) {
  return {
    'setRoutes': function setRoutes(path) {
      this.setOtherwise(path.otherwise);
      var self = this;
      return _.forEach(path, function (v, k) {
        return _.forEach(v, function (data, url) {
          return $routeProvider.when(url, {
            templateUrl: ResourceTemplateServ('/' + k, data.page),
            controller: self.getControllerName(data)
          });
        });
      });
    },
    getControllerName: function getControllerName(data) {
      if (data.controller !== undefined) {
        return data.controller;
      } else {
        return data.page.charAt(0).toUpperCase() + data.page.slice(1) + 'Ctrl';
      }
    },
    'setOtherwise': function setOtherwise(url) {
      if (url == null) {
        url = '/';
      }

      return $routeProvider.otherwise({
        redirectTo: url
      });
    },
    '$get': function $get() {}
  };
}]);

/***/ }),

/***/ "3160":
/*!*******************************************!*\
  !*** ./src/scripts/select2/ui.select2.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEqual */ "Y+p1");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);



__webpack_require__(/*! Select2/select2.js */ "W7Vc");
/**
 * Copied from https://github.com/angular-ui/ui-select2 and modifed for es6 modules.
 * TODO still need to fix failing tests
 */

/**
 * Enhanced Select2 Dropmenus
 *
 * @AJAX Mode - When in this mode, your value will be an object (or array of objects) of the data used by Select2
 *     This change is so that you do not have to do an additional query yourself on top of Select2's own query
 * @params [options] {object} The configuration options passed to $.fn.select2(). Refer to the documentation
 */


/* harmony default export */ __webpack_exports__["default"] = ('ui.select2');
angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('ui.select2', []).value('uiSelect2Config', {}).directive('uiSelect2', ["uiSelect2Config", "$timeout", function (uiSelect2Config, $timeout) {
  var options = {};

  if (uiSelect2Config) {
    angular__WEBPACK_IMPORTED_MODULE_1___default.a.extend(options, uiSelect2Config);
  }

  return {
    require: 'ngModel',
    priority: 1,
    compile: function compile(tElm, tAttrs) {
      var watch;
      var repeatOption;
      var repeatAttr;
      var isSelect = tElm.is('select');
      var isMultiple = angular__WEBPACK_IMPORTED_MODULE_1___default.a.isDefined(tAttrs.multiple); // Enable watching of the options dataset if in use

      if (tElm.is('select')) {
        repeatOption = tElm.find('optgroup[ng-repeat], optgroup[data-ng-repeat], option[ng-repeat], option[data-ng-repeat]');

        if (repeatOption.length) {
          repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
          watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop();
        }
      }

      return {
        pre: function pre(scope, elm, attrs, controller) {
          // instance-specific options
          var opts = angular__WEBPACK_IMPORTED_MODULE_1___default.a.extend({}, options, scope.$eval(attrs.uiSelect2));
          /*
          Convert from Select2 view-model to Angular view-model.
          */

          var convertToAngularModel = function convertToAngularModel(select2_data) {
            var model;

            if (opts.simple_tags) {
              model = [];
              angular__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(select2_data, function (value, index) {
                model.push(value.id);
              });
            } else {
              model = select2_data;
            }

            return model;
          };
          /*
          Convert from Angular view-model to Select2 view-model.
          */


          var convertToSelect2Model = function convertToSelect2Model(angular_data) {
            var model = [];

            if (!angular_data) {
              return model;
            }

            if (opts.simple_tags) {
              model = [];
              angular__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(angular_data, function (value, index) {
                model.push({
                  id: value,
                  text: value
                });
              });
            } else {
              model = angular_data;
            }

            return model;
          };

          if (isSelect) {
            // Use <select multiple> instead
            delete opts.multiple;
            delete opts.initSelection;
          } else if (isMultiple) {
            opts.multiple = true;
          }

          if (controller) {
            var renFunc = function renFunc() {
              if (isSelect) {
                elm.select2('val', controller.$viewValue);
              } else {
                if (opts.multiple) {
                  controller.$isEmpty = function (value) {
                    return !value || value.length === 0;
                  };

                  var viewValue = controller.$viewValue;

                  if (angular__WEBPACK_IMPORTED_MODULE_1___default.a.isString(viewValue)) {
                    viewValue = viewValue.split(',');
                  }

                  elm.select2('data', convertToSelect2Model(viewValue));

                  if (opts.sortable) {
                    elm.select2('container').find('ul.select2-choices').sortable({
                      containment: 'parent',
                      start: function start() {
                        elm.select2('onSortStart');
                      },
                      update: function update() {
                        elm.select2('onSortEnd');
                        elm.trigger('change');
                      }
                    });
                  }
                } else {
                  if (angular__WEBPACK_IMPORTED_MODULE_1___default.a.isObject(controller.$viewValue)) {
                    elm.select2('data', controller.$viewValue);
                  } else if (!controller.$viewValue) {
                    elm.select2('data', null);
                  } else {
                    elm.select2('val', controller.$viewValue);
                  }
                }
              }
            };

            controller.$render = renFunc; // Watch the model for programmatic changes

            scope.$watch(tAttrs.ngModel, function (current, old) {
              /* if (!current) {
                 return
               }*/
              if (lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default()(current, old)) {
                return;
              }

              renFunc();
            }, true); // Watch the options dataset for changes

            if (watch) {
              scope.$watch(watch, function (newVal, oldVal, scope) {
                /*if (angular.equals(newVal, oldVal)) {
                  return
                }*/
                // Delayed so that the options have time to be rendered
                $timeout(function () {
                  elm.select2('val', controller.$viewValue); // Refresh angular to remove the superfluous option

                  renFunc();

                  if (newVal && !oldVal && controller.$setPristine) {
                    controller.$setPristine(true);
                  }
                });
              });
            }

            if (!isSelect) {
              // Set the view and model value and update the angular template manually for the ajax/multiple select2.
              elm.bind('change', function (e) {
                e.stopImmediatePropagation();

                if (scope.$$phase || scope.$root.$$phase) {
                  return;
                }

                scope.$apply(function () {
                  controller.$setViewValue(convertToAngularModel(elm.select2('data')));
                });
              });

              if (opts.initSelection) {
                var initSelection = opts.initSelection;

                opts.initSelection = function (element, callback) {
                  initSelection(element, function (value) {
                    var isPristine = controller.$pristine;
                    controller.$setViewValue(convertToAngularModel(value));
                    callback(value);

                    if (isPristine) {
                      controller.$setPristine();
                    }

                    elm.prev().toggleClass('ng-pristine', controller.$pristine);
                  });
                };
              }
            }
          }

          elm.bind('$destroy', function () {
            elm.select2('destroy');
          });
          attrs.$observe('disabled', function (value) {
            elm.select2('enable', !value);
          });
          attrs.$observe('readonly', function (value) {
            elm.select2('readonly', !!value);
          });

          if (attrs.ngMultiple) {
            scope.$watch(attrs.ngMultiple, function (newVal) {
              attrs.$set('multiple', !!newVal);
              elm.select2(opts);
            });
          } // Initialize the plugin late so that the injected DOM does not disrupt the template compiler


          $timeout(function () {
            elm.select2(opts); // Set initial value - I'm not sure about this but it seems to need to be there

            elm.select2('data', controller.$modelValue); // important!

            controller.$render(); // Not sure if I should just check for !isSelect OR if I should check for 'tags' key

            if (!opts.initSelection && !isSelect) {
              var isPristine = controller.$pristine;
              controller.$pristine = false;
              controller.$setViewValue(convertToAngularModel(elm.select2('data')));

              if (isPristine) {
                controller.$setPristine();
              }

              elm.prev().toggleClass('ng-pristine', controller.$pristine);
            }
          });
        },
        post: function post(scope, elm, attrs, controller) {
          // Update valid and dirty statuses
          controller.$parsers.push(function (value) {
            var div = elm.prev();
            div.toggleClass('ng-invalid', !controller.$valid).toggleClass('ng-valid', controller.$valid).toggleClass('ng-invalid-required', !controller.$valid).toggleClass('ng-valid-required', controller.$valid).toggleClass('ng-dirty', controller.$dirty).toggleClass('ng-pristine', controller.$pristine);
            return value;
          });
        }
      };
    }
  };
}]);

/***/ }),

/***/ "4CKJ":
/*!********************************************************!*\
  !*** ./src/scripts/gridz/directives/agGrid/agGridz.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/pick */ "JZM8");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ "zdiy");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isFunction */ "lSCD");
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/each */ "xkGU");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../gridzModule */ "LyZ+");







var gridz = angular__WEBPACK_IMPORTED_MODULE_5___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_6__["default"]);
gridz.directive('agGrid', ['$timeout', '$log', '$parse', 'agGridDataLoader', 'ActionPopupHandler', 'pathWithContext', 'camelize', function ($timeout, $log, $parse, agGridDataLoader, ActionPopupHandler, pathWithContext, camelize) {
  var link = function link(scope, element, attrs, gridCtrl) {
    // find grid placeholder
    var gridEl = element.find('table.gridz'); // publish agGrid controller to the parent scope

    var alias = attrs.agGridName;

    if (alias) {
      $parse(alias).assign(scope, gridCtrl);
    }

    $parse('$grid').assign(scope, gridCtrl); // Make the grid available to controllers as $scope.$grid
    // read grid options

    var options = $parse(attrs.agGrid)(scope);

    if (!options) {
      throw new Error('undefined grid options');
    } // read colModel from the `ag-grid-col-model` attribute


    if (attrs.agGridColModel) {
      options.colModel = angular__WEBPACK_IMPORTED_MODULE_5___default.a.fromJson(attrs.agGridColModel);
    } // kill the grid when the related scope is destroyed


    scope.$on('$destroy', function () {
      $log.debug('[agGrid] destroying the grid', gridEl);
      return gridEl.jqGrid('GridDestroy');
    }); // Initializes a grid with the given options

    var initializeGrid = function initializeGrid() {
      $log.debug("[agGrid] initializing '".concat(alias, "' with"), options); // assign the url

      if (!!lodash_isNil__WEBPACK_IMPORTED_MODULE_4___default()(options.url) && !lodash_isNil__WEBPACK_IMPORTED_MODULE_4___default()(options.path)) {
        options.url = pathWithContext(options.path);
      } // use `$http` service to load the grid data


      if (options.datatype === undefined || options.datatype === null) {
        options.datatype = agGridDataLoader(options.url, gridCtrl);
      }

      if (options.dropGrouping) {
        var groupingView = options.groupingView;
        groupingView.groupText = groupingView.groupText.map(function (value) {
          return '<input type="checkbox" class="cbox"/>' + value;
        });
        gridEl.jqGrid('setGridParam', 'groupingView', groupingView);
      }

      gridEl.on('jqGridAfterGridComplete', function () {
        if (options.dropGrouping) {
          var gridId = alias;
          $('tr.ui-jqgrid-labels th div').draggable({
            appendTo: 'body',
            helper: 'clone'
          });
          $("#".concat(alias, "GroupDropDown div.tagged-input")).droppable({
            activeClass: 'ui-state-default',
            hoverClass: 'ui-state-hover',
            accept: ':not(.ui-sortable-helper)',
            drop: function drop(event, ui) {
              var $this = $(this);
              $this.find('.placeholder').remove();
              var groupingColumn = $("<div class='tag'></div>").attr('data-column', ui.draggable.attr('id').replace('jqgh_' + gridId + '_', ''));
              $('<i class="fa fa-times" aria-hidden="true"> </i>').click(function () {
                $(this).parent().remove();
                $('#' + gridId).jqGrid('groupingRemove');
                $('#' + gridId).jqGrid('groupingGroupBy', $("#".concat(alias, "GroupDropDown div.tag:not(.placeholder)")).map(function () {
                  return $(this).attr('data-column');
                }).get());

                if ($("#".concat(alias, "GroupDropDown div.tag:not(.placeholder)")).length === 0) {
                  $('<div class="placeholder"></div>').appendTo($this);
                }
              }).appendTo(groupingColumn);
              groupingColumn.append(ui.draggable.text());
              groupingColumn.appendTo($this);
              $('#' + gridId).jqGrid('groupingRemove');
              $('#' + gridId).jqGrid('groupingGroupBy', $("#".concat(alias, "GroupDropDown div.tag:not(.placeholder)")).map(function () {
                return $(this).attr('data-column');
              }).get());
            }
          }).sortable({
            items: 'div.tag:not(.placeholder)',
            sort: function sort() {
              $(this).removeClass('ui-state-default');
            },
            stop: function stop() {
              $('#' + gridId).jqGrid('groupingRemove');
              $('#' + gridId).jqGrid('groupingGroupBy', $("#".concat(alias, "GroupDropDown div.tag:not(.placeholder)")).map(function () {
                return $(this).attr('data-column');
              }).get());
            }
          });
        } // Add `min` class to remove pading to minimize row height


        if (options.minRowHeight) {
          return lodash_each__WEBPACK_IMPORTED_MODULE_3___default()(gridEl[0].rows, function (it) {
            return angular__WEBPACK_IMPORTED_MODULE_5___default.a.element(it).addClass('min');
          });
        }
      });
      var groupCheckBox = '.jqgroup > td > .cbox';
      gridEl.on('jqGridSelectAll', function () {
        if (options.dropGrouping) {
          var isChecked = $('#cb_' + alias).is(':checked');
          var selectedIds = gridEl.jqGrid('getGridParam', 'selarrrow');
          return $(groupCheckBox).each(function () {
            var row = $(this).closest('tr');

            if (isChecked) {
              selectedIds.push(row.attr('id'));
              row.addClass('ui-state-highlight');
              return $(this).prop('checked', true);
            } else {
              row.removeClass('ui-state-highlight');
              return $(this).prop('checked', false);
            }
          });
        }
      });
      initGroupCheckboxes(alias, groupCheckBox); // jqGrid sucks at this point it expects `pager` to be an id

      if (options.pager !== false) {
        options.pager = element.find('.gridz-pager').attr('id') || 'gridz-pager';
      }

      if (options.selectFirstRow === true) {
        var _gridComplete = options.gridComplete;

        var onGridComplete = function onGridComplete() {
          var dataIds = gridEl.getDataIDs();

          if (dataIds.length > 0) {
            gridEl.setSelection(dataIds[0], true);
          }

          if (lodash_isFunction__WEBPACK_IMPORTED_MODULE_2___default()(_gridComplete)) {
            return _gridComplete.apply(this, arguments);
          }
        };

        options.gridComplete = onGridComplete;
      } // initialize jqGrid on the given element


      gridEl.gridz(options);

      if (options.filterToolbar) {
        gridEl.jqGrid('filterToolbar', {
          beforeSearch: function beforeSearch() {
            var postData = gridEl.jqGrid('getGridParam', 'postData');
            var defaultFilters = postData.defaultFilters || postData.filters;

            var filters = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(JSON.parse(defaultFilters), lodash_pick__WEBPACK_IMPORTED_MODULE_0___default()(postData, function (value, key) {
              return !['page', 'filters', 'max', 'sort', 'order', 'nd', '_search'].includes(key);
            }));

            filters.firstLoad = false;
            postData.defaultFilters = defaultFilters;
            postData.filters = JSON.stringify(filters);
            return console.log('Toolbar Search');
          }
        });
      } // initialize actionPopup handler


      ActionPopupHandler(gridEl, scope, attrs);
      return angular__WEBPACK_IMPORTED_MODULE_5___default.a.element(element.find('select').wrap('<span class="select-wrapper"></span>'));
    }; // Initiates group checkbox action.
    // When a group checkbox is checked
    // walks through records and selects them
    // until next group checkbox is found.


    var initGroupCheckboxes = function initGroupCheckboxes(gridId, checkboxSelector) {
      var headerSelector = ".".concat(alias, "ghead_0");
      return $('#' + gridId).on('change', checkboxSelector, function (e) {
        var currentCB = $(this);
        gridEl.setSelection($(this).closest('tr').attr('id'));
        var headers = currentCB.closest('tr').nextUntil(headerSelector);
        var checkboxes = headers.find('.cbox[type="checkbox"]');
        return checkboxes.each(function () {
          return gridEl.setSelection($(this).closest('tr').attr('id'));
        });
      });
    };

    if (options.dropGrouping) {
      var dropDownsection = angular__WEBPACK_IMPORTED_MODULE_5___default.a.element("<div >\n<div class='tagged-input' style=\"min-height: 35px; margin-bottom: -4px\">Drop headers here</div>\n </div>");
      dropDownsection.attr('id', "".concat(alias, "GroupDropDown"));
      element.prepend(dropDownsection);
    }

    if (element.is(':visible')) {
      // Element is visible, initialize the grid now
      return initializeGrid();
    } else {
      var unregister;
      $log.info('grid is not visible:', alias); // Initialize the grid when the element will be visible

      var timeoutPromise = null;
      return unregister = scope.$watch(function () {
        $timeout.cancel(timeoutPromise); // Cancel previous timeout
        // We have to do timeout because of this issue with uib-tab https://github.com/angular-ui/bootstrap/issues/3796
        // Otherwise when tab is clicked and digest cycle ($watch) runs, the element.is(":visible") is still false, and hence grid is never initialized.

        timeoutPromise = $timeout(function () {
          if (!element.is(':visible')) {
            return;
          } // initialize the grid on the visible element


          initializeGrid(); // unregister the watcher to free resources

          return unregister();
        }, 100, false); // Here false means don't fire new digest cycle, otherwise $watch will be called infinitely.

        return false;
      });
    }
  };

  return {
    restrict: 'A',
    require: 'agGrid',
    controller: 'AgGridCtrl',
    template: "<table class=\"gridz\"></table>\n<div class=\"gridz-pager\"></div>",
    compile: function compile(element, attrs) {
      // modify grid html element, generate grid id from the name or assign default value
      var id = !lodash_isNil__WEBPACK_IMPORTED_MODULE_4___default()(attrs.agGridName) ? camelize(attrs.agGridName) : 'gridz';
      element.find('table.gridz').attr('id', id);
      element.find('div.gridz-pager').attr('id', "".concat(id, "-pager")); // return linking function which will be called at a later time

      return {
        post: link
      };
    }
  };
}]);

/***/ }),

/***/ "4tdo":
/*!**************************************************!*\
  !*** ./src/scripts/forms/directives/agSubmit.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/flatten */ "TYy9");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/values */ "P/G1");
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/filter */ "k4Da");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../formsModule */ "O9c1");




function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var forms = angular__WEBPACK_IMPORTED_MODULE_3___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_4__["default"]);
forms.directive('agSubmit', ['$parse', '$log', 'serverValidationErrorsHandler', function ($parse, $log, serverValidationErrorsHandler) {
  return {
    restrict: 'A',
    require: 'form',
    compile: function compile(element, attrs) {
      var onSubmit = $parse(attrs.agSubmit);
      forms = [];

      var markAsSubmitted = function markAsSubmitted(form) {
        form.$submitted = true; // to avoid situation with too much recursion, check if the form is already processed, see below

        forms.push(form); // iterate through  all nested forms and mark them as submitted

        var nestedForms = lodash_filter__WEBPACK_IMPORTED_MODULE_2___default()(lodash_values__WEBPACK_IMPORTED_MODULE_1___default()(form), function (input) {
          return __guard__(__guard__(input != null ? input.$$element : undefined, function (x1) {
            return x1[0];
          }), function (x) {
            return x.tagName;
          }) === 'FORM' && !Array.from(forms).includes(input);
        });

        return Array.from(nestedForms).map(function (nestedForm) {
          return markAsSubmitted(nestedForm);
        });
      };

      return function (scope, element, attrs, formCtrl) {
        return element.on('submit', function (event) {
          $log.debug('[forms] submitting form', formCtrl.$name, element, formCtrl); // mark the form as submitted

          scope.$apply(function () {
            return markAsSubmitted(formCtrl);
          }); // do nothing when the form is invalid

          if (formCtrl.$invalid) {
            return;
          } // submit the form and handle a promise along with resource


          var result = lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default()([onSubmit(scope, {
            $event: event
          })]);

          var _Array$from = Array.from(result),
              _Array$from2 = _slicedToArray(_Array$from, 2),
              promise = _Array$from2[0],
              resource = _Array$from2[1]; // TODO use `$q.when`


          if (promise && angular__WEBPACK_IMPORTED_MODULE_3___default.a.isObject(promise)) {
            // disable/enable form controls
            formCtrl.$saving = true;
            var finallyProm = promise.finally(function () {
              return formCtrl.$saving = false;
            });
            finallyProm.then(angular__WEBPACK_IMPORTED_MODULE_3___default.a.noop, angular__WEBPACK_IMPORTED_MODULE_3___default.a.noop); // on success: reset the form

            promise.then(function () {
              formCtrl.$setPristine();
              return formCtrl.$submitted = false;
            }, function () {
              return false;
            }); // on error: handle server side errors

            return promise.catch(function (response) {
              if (!angular__WEBPACK_IMPORTED_MODULE_3___default.a.isFunction(resource != null ? resource.resourceName : undefined)) {
                return;
              }

              return serverValidationErrorsHandler(formCtrl, response, resource.resourceName());
            });
          }
        });
      };
    }
  };
}]);

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ }),

/***/ "5WPV":
/*!*********************************************************!*\
  !*** ./src/scripts/gridz/directives/agColumnsConfig.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]);

var ManageGridColumnsCtrl =
/*#__PURE__*/
function () {
  ManageGridColumnsCtrl.$inject = ["$scope"];

  _createClass(ManageGridColumnsCtrl, null, [{
    key: "initClass",
    value: function initClass() {
      this.$inject = ['$scope'];
    }
  }]);

  function ManageGridColumnsCtrl($scope) {
    _classCallCheck(this, ManageGridColumnsCtrl);

    // Names of columns which are not displayed at the "Manage Columns" modal.
    // These columns are placed at first positions of a grid.
    var systemColumns = ['cb', '-row_action_col'];
    var gridEl = $scope.grid.getGridEl();

    var _gridEl$jqGrid = gridEl.jqGrid('getGridParam'),
        colModel = _gridEl$jqGrid.colModel;

    $scope.gridColumns = {
      available: [],
      displayed: []
    };
    var element = null;
    colModel.forEach(function (gridColumn, index) {
      if (!systemColumns.includes(gridColumn.name)) {
        element = {
          originalId: index,
          label: gridColumn.label,
          name: gridColumn.name
        };

        if (gridColumn.hidden) {
          return $scope.gridColumns.available.push(element);
        } else {
          return $scope.gridColumns.displayed.push(element);
        }
      }
    });

    $scope.save = function () {
      gridEl = $scope.grid.getGridEl();
      var newColumnsOrder = [];
      var displayedColumns = [];
      var hiddenColumns = [];
      colModel.forEach(function (column, index) {
        if (systemColumns.includes(column.name)) {
          return newColumnsOrder.push(index);
        }
      });
      $scope.gridColumns.displayed.forEach(function (column, index) {
        displayedColumns.push(column.name);
        return newColumnsOrder.push(column.originalId);
      });
      $scope.gridColumns.available.forEach(function (column, index) {
        hiddenColumns.push(column.name);
        return newColumnsOrder.push(column.originalId);
      });
      gridEl.remapColumns(newColumnsOrder, true);
      gridEl.jqGrid('showCol', displayedColumns);
      gridEl.jqGrid('hideCol', hiddenColumns);
      return $scope.manageColumnsModal.close();
    };

    $scope.cancel = function () {
      return $scope.manageColumnsModal.close();
    };
  }

  return ManageGridColumnsCtrl;
}();

ManageGridColumnsCtrl.initClass();
gridz.controller('ManageGridColumnsCtrl', ManageGridColumnsCtrl);
gridz.directive('agManageGridColumns', ['$uibModal', 'pathWithContext', function ($uibModal, pathWithContext) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      grid: '='
    },
    link: function link(scope) {
      return scope.renderManageColumnsModal = function () {
        return scope.manageColumnsModal = $uibModal.open({
          controller: 'ManageGridColumnsCtrl',
          keyboard: true,
          backdrop: 'static',
          scope: scope,
          template: "<div class=\"manage-columns-modal\">\n  <div class=\"modal-header\">\n      <button type=\"button\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n      <h3>Manage Columns</h3>\n  </div>\n\n  <div class=\"modal-body\">\n      <div ng-repeat=\"(listName, list) in gridColumns\" class=\"col-md-6\">\n          <div class=\"panel panel-info\">\n              <div class=\"panel-heading\">\n                  <h3 class=\"panel-title\">{{listName}} columns</h3>\n              </div>\n              <div class=\"panel-body simpleDemo\">\n\n                  <ul dnd-list=\"list\">\n                      <li ng-repeat=\"item in list\"\n                          dnd-draggable=\"item\"\n                          dnd-moved=\"list.splice($index, 1)\"\n                          dnd-effect-allowed=\"move\">\n                          {{item.label}}\n                      </li>\n                  </ul>\n              </div>\n          </div>\n      </div>\n  </div>\n\n  <div class=\"modal-footer\">\n      <ag-cancel-button ng-click=\"cancel()\"></ag-cancel-button>\n      <div class=\"btn btn-default btn-primary\" ng-click=\"save()\"><i class=\"fa fa-check fa-inverse\"></i> Save</div>\n  </div>\n</div>"
        });
      };
    },
    template: "<a ng-click=\"renderManageColumnsModal()\">\n  <i class=\"fa fa-exchange\" aria-hidden=\"true\" uib-tooltip='Show, hide or reorder columns'></i>\n</a>"
  };
}]);

/***/ }),

/***/ "5Yix":
/*!************************************************!*\
  !*** ./src/scripts/gridz/directives/search.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]); // Retunrs true if `filters` contain at least one non-empty search field

gridz.value('hasSearchFilters', function (filters) {
  for (var k in filters) {
    var value = filters[k];

    if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(value)) {
      continue;
    }

    if (typeof value === 'string') {
      if ($.trim(value) !== '') {
        return true;
      }
    } else {
      return true;
    }
  }

  return false;
});
gridz.directive('agSearchButton', function () {
  return {
    restrict: 'E',
    replace: true,
    template: "<button type=\"submit\" ng-click=\"advancedSearch(filters)\" ng-disabled=\"searching\" class=\"btn btn-info\">\n  <i class=\"fa fa-search fa-inverse\"></i> Search<span ng-show=\"searching\">...</span>\n</button>"
  };
});
gridz.directive('agResetSearchButton', function () {
  return {
    restrict: 'E',
    replace: true,
    template: "<button type=\"button\" ng-click=\"resetSearch(filters)\" ng-disabled=\"searching\" class=\"btn\">\n  <i class=\"fa fa-times\"></i> Reset<span ng-show=\"searching\">...</span>\n</button>"
  };
});
gridz.directive('agSearchForm', ['$log', function ($log) {
  return {
    restrict: 'A',
    scope: true,
    require: '^form',
    link: function link(scope, element, attrs, form) {
      // assign form instance to the scope
      return scope.searchForm = form;
    },
    controller: ['$scope', '$parse', '$attrs', function ($scope, $parse, $attrs) {
      $scope.searching = false; // Perform server side grid filtering

      var gridSearch = function gridSearch(filters) {
        if (filters == null) {
          filters = {};
        }

        var grid = $parse($attrs.agSearchForm)($scope);

        if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(grid)) {
          $log.warn('[gridz] grid is not defined');
          return;
        }

        var promise = grid.search(filters); // enable buttons when the search is complete

        $scope.searching = true;
        promise.finally(function () {
          return $scope.searching = false;
        });
        return promise;
      }; // Trigger search action for the grid


      $scope.advancedSearch = function (filters) {
        if (filters == null) {
          filters = {};
        }

        var form = $scope.searchForm;

        if (form && form.$invalid) {
          return $log.info('[gridz] advanced search form is invalid', form);
        }

        return gridSearch(filters);
      }; // Reset the search form and trigger grid reload


      return $scope.resetSearch = function (filters) {
        if (filters == null) {
          filters = {};
        }

        var defaultFilters = $scope.defaultFilters || {};
        angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy(defaultFilters, filters);
        return gridSearch(filters);
      };
    }]
  };
}]);

/***/ }),

/***/ "5fZH":
/*!*******************************************************!*\
  !*** ./examples/ag-demo-ui/src/org/adminOrgModule.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_angle_grinder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/angle-grinder */ "hOyn");


var MOD_NAME = 'admin.org';
var org = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(MOD_NAME, [_src_angle_grinder__WEBPACK_IMPORTED_MODULE_1__["default"]]);
org.config(["$routeProvider", function ($routeProvider) {
  return $routeProvider.when("/", {
    templateUrl: "../templates/org/list.html",
    controller: "org.ListCtrl"
  }).when("/create", {
    templateUrl: "../templates/org/form.html",
    controller: "org.FormCtrl",
    resolve: {
      org: ["Resource", function (Resource) {
        return new Resource();
      }]
    }
  }).when("/:id", {
    templateUrl: "../templates/org/show.html",
    controller: "org.ShowCtrl",
    resolve: {
      org: ["$route", "resourceResolver", function ($route, resourceResolver) {
        return resourceResolver($route.current.params.id);
      }]
    }
  }).when("/:id/edit", {
    templateUrl: "../templates/org/form.html",
    controller: "org.FormCtrl",
    resolve: {
      org: ["$route", "resourceResolver", function ($route, resourceResolver) {
        return resourceResolver($route.current.params.id);
      }]
    }
  }).otherwise({
    redirectTo: "/"
  });
}]);
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);

/***/ }),

/***/ "5gNK":
/*!*********************************************************!*\
  !*** ./node_modules/ladda/dist/ladda-themeless.min.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6ku9":
/*!************************************************!*\
  !*** ./src/scripts/forms/directives/agTabs.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/find */ "J2m7");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../formsModule */ "O9c1");




var forms = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_3__["default"]);
forms.directive('agTabset', ['$parse', '$q', function ($parse, $q) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: true,
    require: 'agTabset',
    controller: ['$log', '$scope', '$location', function ($log, $scope, $location) {
      // stack of the tabs
      $scope.tabs = []; // show or hide the tab content loading indicator

      $scope.contentLoading = false; // return the current tab

      $scope.currentTab = function () {
        return lodash_find__WEBPACK_IMPORTED_MODULE_1___default()($scope.tabs, {
          selected: true
        });
      }; // return the current template url


      $scope.currentTemplateUrl = function () {
        var currentTab = $scope.currentTab();

        if (currentTab) {
          return currentTab.tplSrc;
        }
      }; // evaluates when a new tab content is loaded


      $scope.contentLoaded = function () {
        // hide content loading indication
        $scope.contentLoading = false; // hide tab loading spinner

        var tab = $scope.currentTab();
        tab.loading = false; // update the url

        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(tab.name)) {
          $location.search('tab', tab.name);
        }

        return $log.debug('[tabs] content loaded', tab);
      }; // Open a tab with the given name


      this.openTab = function (name) {
        var deferred = $q.defer(); // find the tab by name

        var tab = lodash_find__WEBPACK_IMPORTED_MODULE_1___default()($scope.tabs, {
          name: name
        }); // do nothing when the tab cannot be found


        if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(tab)) {
          return deferred.promise;
        } // select the tab unless is not already selected


        if (!tab.selected) {
          this._selectTab(tab);
        }

        var unregister = tab.$watch('loading', function (loading) {
          if (loading) {
            return;
          } // tab is still loading, do nothing
          // requested tab was loaded, handle the promise


          deferred.resolve(tab); // ..and unregister the watcher

          return unregister();
        });
        return deferred.promise;
      }; // activate the given tab
      // @private


      this._selectTab = function (tab) {
        // de-select all tabs
        angular__WEBPACK_IMPORTED_MODULE_2___default.a.forEach($scope.tabs, function (tab) {
          return tab.selected = tab.loading = false;
        }); // mark the current tab as selected

        tab.selected = true; // show the loading spinners

        tab.loading = true;
        return $scope.contentLoading = true;
      }; // add new tab to the stack
      // @private


      this._addTab = function (tab, select) {
        // add a tab to the stack
        if (select == null) {
          select = false;
        }

        $scope.tabs.push(tab); // if the tab is the first one mark it as selected

        if (select || $scope.tabs.length === 1) {
          return this._selectTab(tab);
        }
      };
    }],
    link: function link(scope, element, attrs, ctrl) {
      // publish agTabset controller to the parent scope
      var alias = attrs.name;

      if (alias) {
        return $parse(alias).assign(scope.$parent, ctrl);
      }
    },
    template: "<div class=\"no-padding\">\n  <div class=\"nav nav-tabs\" ng-transclude style=\"margin-bottom: 15px\"></div>\n  <div class=\"tab\">\n    <span ng-if=\"contentLoading\">loading the content</span>\n    <ng-include src=\"currentTemplateUrl()\"\n                onload=\"contentLoaded()\"\n                ng-hide=\"contentLoading\"></ng-include>\n  </div>\n</div>"
  };
}]);
forms.directive('agTab', ['$log', '$location', 'pathWithContext', function ($log, $location, pathWithContext) {
  return {
    restrict: 'E',
    replace: true,
    require: '^agTabset',
    transclude: true,
    scope: {
      // text binding
      templateUrl: '@',
      name: '@'
    },
    link: function link(scope, element, attrs, tabsetCtrl) {
      // append the application context to the template url
      scope.tplSrc = pathWithContext(scope.templateUrl); // by default all new tabs are unselected

      scope.selected = false;
      scope.loading = false;

      var getTab = function getTab() {
        return $location.search().tab;
      }; // add the current tab to the stack


      var active = function active() {
        return !lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(scope.name) && getTab() === scope.name;
      };

      tabsetCtrl._addTab(scope, active()); // handles mouse click on the tab


      scope.select = function () {
        if (scope.selected) {
          return;
        }

        return tabsetCtrl._selectTab(scope);
      };

      return scope.$watch(getTab, function () {
        if (angular__WEBPACK_IMPORTED_MODULE_2___default.a.isDefined(scope.name) && getTab() === scope.name && !scope.selected) {
          return scope.select();
        }
      }, true);
    },
    template: "<li ng-click=\"select()\" ng-class=\"{active: selected, loading: loading}\">\n  <a href=\"\" ng-transclude>{{heading}}</a>\n</li>"
  };
}]);

/***/ }),

/***/ "6stN":
/*!***********************************************!*\
  !*** ./src/scripts/forms/directives/focus.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var forms = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Sets focus on the element with the given name
// Works in conjunction with `agFocus` directive

forms.factory('focus', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
  return function (name) {
    return $timeout(function () {
      return $rootScope.$broadcast('focusOn', name);
    });
  };
}]); // Sets the focus on the element
// TODO change it to `focus-if`
// TODO see http://ruoyusun.com/2013/08/24/a-glimpse-of-angularjs-scope-via-example.html

forms.directive('agFocus', function () {
  return {
    restrict: 'A',
    link: function link(scope, element, attributes) {
      var currentName = attributes.agFocus;
      return scope.$on('focusOn', function (event, name) {
        if (currentName === name) {
          element.addClass('ag-focused');
          return element[0].focus();
        }
      });
    }
  };
});

/***/ }),

/***/ "86lq":
/*!******************************************************!*\
  !*** ./src/scripts/gridz/directives/agGrid/gridz.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "xkGU");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_1__);



var _$$fn$fmatter, _$$fn$fmatter2;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gridz =
/*#__PURE__*/
function () {
  function Gridz(element, options) {
    _classCallCheck(this, Gridz);

    this.init(element, options);
  }

  _createClass(Gridz, [{
    key: "init",
    value: function init(element, opts) {
      this.gridEl = $(element);
      this.gridId = this.gridEl.attr("id"); // the containing div for the grid, will be built after jqGrid is called

      this.gboxId = "gbox_".concat(this.gridId);
      this.options = this.getOptions(opts);

      if (this.options.actionPopup) {
        this.addRowActionColumn();
      }

      if (this.options.editOndblClick) {
        this.editOndblClick();
      } // call the jqgrid


      this.gridEl.jqGrid(this.options);

      if ($.isFunction(this.options.jqGridAfterGridComplete)) {
        this.gridEl.on('jqGridAfterGridComplete', this.options.jqGridAfterGridComplete);
      }

      if ($.isFunction(this.options.jqGridAfterInsertRow)) {
        this.gridEl.on('jqGridAfterInsertRow', this.options.jqGridAfterInsertRow);
      }

      if (this.options.multiSetSelection) {
        this.selectedRowIds = [];
      }

      return this.responsiveResize();
    }
  }, {
    key: "getOptions",
    value: function getOptions(options) {
      var _this = this;

      options = $.extend({}, $.fn.gridz.defaults, options); // Events .. beforeSelectRow

      var optBeforeSelectRow = options.beforeSelectRow;

      options.beforeSelectRow = function (rowid, e) {
        var resp;
        this.beforeSelectRow.apply(this, arguments);

        if ($.isFunction(optBeforeSelectRow)) {
          resp = optBeforeSelectRow.apply(this, arguments);
        }

        if (resp === true || lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default()(resp)) {
          return true;
        } else {
          return false;
        }
      }.bind(this); // Events .. onSelectRow


      var optOnSelectRow = options.onSelectRow;

      options.onSelectRow = function (rowid, isChecked, event) {
        this.onSelectRow.apply(this, arguments);

        if ($.isFunction(optOnSelectRow)) {
          optOnSelectRow.apply(this, arguments);
        }

        return true;
      }.bind(this);

      var optOnSelectAll = options.onSelectAll;

      options.onSelectAll = function (rowIds, status) {
        this.onSelectAll.apply(this, arguments);

        if ($.isFunction(optOnSelectAll)) {
          optOnSelectAll.apply(this, arguments);
        }

        return true;
      }.bind(this); // Events .. gridComplete


      var _gridComplete = options.gridComplete;

      options.gridComplete = function () {
        this.gridComplete.apply(this);

        if ($.isFunction(_gridComplete)) {
          _gridComplete.apply(this, arguments);
        }

        this.gridEl.trigger("gridComplete");

        if (this.options.multiSetSelection) {
          return this.memoizeSelectedRows();
        }
      }.bind(this); // By default free-jqrid prepared sorting properties with next pattern
      // sortName = columnName(id, name, etc) order(asc|desc), next column order of the last column name is in `order` parametr
      // Example: if user first sorted by name and then by id sort params will be look like {sortName: 'name asc, id', order: 'asc'}
      // Due to the fact that if id(or other unique) field is on the first place, the other sorting wont have any sense
      // `sortLast` option is added to move unique column to the last place
      //   Example: if user first sorted by id and then by name sort params will be look like {sortName: 'name asc, id', order: 'asc'}


      options.onSortCol = function (sortname, x, order) {
        if (options.multiSort) {
          var id = options.sortLast || "id";

          if (sortname.indexOf(id) > -1) {
            sortname = sortname + " ".concat(order);
            var sortArray = sortname.split(',');
            var res = [];
            var sort = null;
            var idRegex = new RegExp("(".concat(id, "[ ]+(asc|desc))"));

            lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(sortArray, function (it) {
              it = it.trim();

              if (lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default()(idRegex.exec(it))) {
                return res.push(it);
              } else {
                return sort = it.split(" ");
              }
            });

            if (sort) {
              res.push(sort[0]);
            }

            sortname = res.join(",");

            _this.gridEl.jqGrid("setGridParam", {
              sortname: sortname
            });

            if (sort) {
              return _this.gridEl.jqGrid("setGridParam", {
                order: sort[1]
              });
            }
          }
        }
      }; // If true - provides a possibility to select multiple sets of records with "shift" key.
      // Previously selected group(s) will not be unselected.


      options.multiSetSelection = options.multiselect && options.multiSetSelection; // if sortable is true then add exclusion for the action column

      if (options.actionPopup && options.sortable) {
        options.sortable = {
          exclude: "#".concat(this.gridId, "_-row_action_col")
        };
      }

      return options;
    }
    /*
    stuff to do after the grid is completed loading and rendering
    */

  }, {
    key: "gridComplete",
    value: function gridComplete() {
      if (this.options.actionPopup) {
        this.actionPopupSetup();
      }

      if (this.options.popups) {
        return lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.options.popups, function (popupOptions) {
          return this.popupSetup(popupOptions.columnName, popupOptions.innerHTML);
        });
      }
    }
    /*
    Handles proper multi selection of rows
    */

  }, {
    key: "beforeSelectRow",
    value: function beforeSelectRow(rowid, e) {
      var rows = this.gridEl[0].rows; // get id of the previous selected row

      var startId = this.gridEl.jqGrid("getGridParam", "selrow");
      var isCheckBox = $(e.target).hasClass("cbox");

      if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !isCheckBox) {
        // Reset selection if multiboxonly is set to true read http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
        // default multiboxonly doesn't work with ctrl/shift keys.
        if (this.gridEl.jqGrid("getGridParam", "agMultiboxonly")) {
          this.gridEl.jqGrid("resetSelection");
        }
      }

      if (startId && e.shiftKey) {
        this.gridEl.jqGrid("resetSelection"); // get DOM elements of the previous selected and
        // the selected rows

        var startRow = rows.namedItem(startId);
        var endRow = rows.namedItem(rowid);

        if (startRow && endRow) {
          // get min and max from the indexes of the previous selected
          // and the selected rows
          var iStart = Math.min(startRow.rowIndex, endRow.rowIndex);
          var rowIdIndex = endRow.rowIndex;
          var iEnd = Math.max(startRow.rowIndex, rowIdIndex);
          var i = iStart;

          while (i <= iEnd) {
            // the row with rowid will be selected by
            // jqGrid. So we don't need select it
            if (i !== rowIdIndex) {
              this.gridEl.jqGrid("setSelection", rows[i].id, false);
            }

            i++;
          }
        } // clear text selection


        if (document.selection && document.selection.empty) {
          document.selection.empty();
        } else if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
      }

      if (this.options.multiSetSelection) {
        this.memoizeSelectedRows();
      }

      return true;
    }
  }, {
    key: "memoizeSelectedRows",
    value: function memoizeSelectedRows() {
      var selectedRows = this.selectedRowIds;
      return lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.gridEl.jqGrid("getGridParam", "selarrrow"), function (id) {
        if (!Array.from(selectedRows).includes(id)) {
          return selectedRows.push(id);
        }
      });
    }
  }, {
    key: "onSelectAll",
    value: function onSelectAll() {
      if (this.options.multiSetSelection) {
        return this.selectedRowIds = [];
      }
    }
  }, {
    key: "onSelectRow",
    value: function onSelectRow(rowid, isChecked, e) {
      if (this.gridEl.jqGrid("getGridParam", "agRowNumber")) {
        //Add number of selected row in grid(nmber for all pages)
        var ids = this.gridEl.getDataIDs();
        var text = ""; //check if only one row is selected

        if (this.gridEl.jqGrid("getGridParam", "selarrrow").length === 1) {
          //add to the grid footer number of the row in total for all pages
          var rowNum = (this.gridEl.jqGrid("getGridParam", "page") - 1) * this.gridEl.jqGrid("getGridParam", "rowNum") + ids.indexOf(rowid) + 1;
          text = "Current row # ".concat(rowNum, " | ");
        }

        var pager = this.gridEl.parent().parent().parent().parent().find("#paymentGrid-pager_right");
        var span = pager.find('#rowNum');

        if (span.length === 0) {
          pager.prepend("<span id='rowNum'>".concat(text, " </span>"));
        } else {
          span.text(text);
        }
      }

      if (this.options.multiSetSelection) {
        if (!isChecked) {
          this.selectedRowIds.splice(this.selectedRowIds.indexOf(rowid), 1);
        }

        if (e === null || e === void 0 ? void 0 : e.shiftKey) {
          var grid = this.gridEl;
          grid.jqGrid("resetSelection");
          grid.jqGrid("setSelection", rowid);
          var selectedRows = this.selectedRowIds;
          var selected = grid.jqGrid("getGridParam", "selarrrow");

          lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(selectedRows, function (id) {
            if (!Array.from(selected).includes(id)) {
              return grid.jqGrid("setSelection", id);
            }
          });
        }
      }

      return true;
    }
    /*
    adds listener to resize grid to parent container when window is resized.
    This will work for reponsive and fluid layouts
    */

  }, {
    key: "responsiveResize",
    value: function responsiveResize() {
      var _this2 = this;

      var gboxId = "#gbox_".concat(this.gridEl.attr("id"));
      return $(window).on("resize", function (event, ui) {
        // Get width of parent container which is assumed to be expanded to span
        var parWidth;

        if ($(gboxId).parent().width() > 0) {
          parWidth = $(gboxId).parent().width();
        } else {
          parWidth = $("#page").width();
        }

        var curWidth = $(gboxId).width();
        var w = parWidth - 1; // add -1 Fudge factor to prevent horizontal scrollbars

        if (Math.abs(w - curWidth) > 2) {
          return _this2.gridEl.setGridWidth(w);
        }
      });
    } //*************Action popup methods*************

    /*
    adds the action column and formatter.
    */

  }, {
    key: "addRowActionColumn",
    value: function addRowActionColumn() {
      var _this3 = this;

      var containerId = "gbox_".concat(this.gridEl.attr("id"));
      var actionCol = {
        name: "-row_action_col",
        // can't resize
        label: " ",
        width: 20,
        sortable: false,
        search: false,
        hidedlg: true,
        resizable: false,
        fixed: true,
        // don't auto calc size
        formatter: function formatter(cellValue, colOptions, rowObject) {
          var formatter = _this3.options.actionPopup.cellFormatter || _this3.actionPopupFormatter;
          return formatter(containerId, cellValue, colOptions, rowObject);
        }
      };
      return this.options.colModel.unshift(actionCol);
    }
  }, {
    key: "popupFormatter",
    value: function popupFormatter(containerId, rowClass, icon) {
      return "<a class=\"".concat(rowClass, "\" data-toggle=\"popover\" href=\"#\"\n   data-container=\"#").concat(containerId, "\"><i class=\"").concat(icon, "\"></i></a>");
    }
    /*
    default rowActionFormatter. containerId is the dom el to add the drop down to
    */

  }, {
    key: "actionPopupFormatter",
    value: function actionPopupFormatter(containerId) {
      return "<a class=\"jqg-row-action\" data-toggle=\"popover\" href=\"#\"\n   data-container=\"#".concat(containerId, "\"><i class=\"fa fa-cog\"></i></a>");
    }
  }, {
    key: "popupSetup",
    value: function popupSetup(columnName, innerHTML) {
      return $(".".concat(columnName)).clickover({
        global_close: true,
        html: true,
        content: "<div></div>",
        template: "<div class=\"popover row-action-popover\">\n  <div class=\"arrow\"></div>\n  <div class=\"popover-content dropdown clearfix\" style=\"padding: 0;\"></div>\n</div>",
        onShown: function onShown() {
          var self;
          var content = innerHTML;

          if (typeof innerHTML === 'function') {
            self = this;
            var params = JSON.parse(this.$element[0].attributes.popUpParams.value);
            content = innerHTML(this, params);
          }

          return self.$tip[0].innerHTML = content;
        }
      });
    } // called after grid complete to setup the menu

  }, {
    key: "actionPopupSetup",
    value: function actionPopupSetup() {
      var self = this;
      var options = this.options;
      var actionMenu = "";

      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default()(options.actionPopup.resetSelection) && options.actionPopup.resetSelection !== false) {
        options.actionPopup.resetSelection = true;
      }

      if (options.actionPopup.menuList) {
        actionMenu = options.actionPopup.menuList;
      } else {
        actionMenu = "<ul class=\"dropdown-menu\" role=\"menu\">\n  <li><a href=\"#\" class=\"row_action_show\" data-dismiss=\"clickover\">\n    <i class=\"fa fa-eye\"></i>show</a>\n  </li>\n  <li><a href=\"#\" class=\"row_action_edit\" data-dismiss=\"clickover\">\n    <i class=\"fa fa-pencil-square-o\"></i>edit</a>\n  </li>\n  <li><a href=\"#\" class=\"row_action_delete\" data-dismiss=\"clickover\">\n    <i class=\"fa fa-trash-o\"></i>delete</a>\n  </li>\n</ul>";
      }

      return $(".jqg-row-action").clickover({
        global_close: true,
        html: true,
        content: actionMenu,
        template: "<div class=\"popover row-action-popover\">\n  <div class=\"arrow\"></div>\n  <div class=\"popover-content dropdown clearfix\" style=\"padding: 0;\"></div>\n</div>",
        onShown: function onShown() {
          return self.actionPopupOnShow.call(self, this);
        }
      });
    } // fired when the clickover is shown

  }, {
    key: "actionPopupOnShow",
    value: function actionPopupOnShow(clickoverEl) {
      var _this4 = this;

      var self = this;
      var id = $(clickoverEl.$element, this.gridEl.rows).parents("tr:first").attr("id");
      this.gridEl.data("actionRowId", id);

      if (this.options.actionPopup.resetSelection) {
        this.gridEl.jqGrid("resetSelection");
        this.gridEl.jqGrid("setSelection", id);
      }

      var menuEl = $("#".concat(self.gboxId, " .dropdown-menu"));
      menuEl.on("click", "li a.row_action_show", function (e) {
        e.preventDefault();
        return _this4.gridEl.trigger("showAction", [id, self]);
      });
      menuEl.on("click", "li a.row_action_edit", function (e) {
        e.preventDefault();
        return _this4.gridEl.trigger("editAction", [id, self]);
      });
      menuEl.on("click", "li a.row_action_delete", function (e) {
        e.preventDefault();
        return _this4.gridEl.trigger("deleteAction", [id, self]);
      });
      return menuEl.on("click", "li a.row_action_mass_update", function (e) {
        e.preventDefault();
        return _this4.gridEl.trigger("massUpdateAction", []);
      });
    }
  }, {
    key: "editOndblClick",
    value: function editOndblClick() {
      var self = this;
      var grid = this.gridEl;
      return this.options.ondblClickRow = function (id) {
        return grid.trigger("editAction", [id, self]);
      };
    }
  }]);

  return Gridz;
}(); // register namespace


$.extend(true, window, {
  grinder: {
    Grid: Gridz
  }
}); // Jquery Plugin definition

$.fn.gridz = function (option) {
  var instance;

  if (typeof option === "string") {
    var otherArgs = Array.prototype.slice.call(arguments, 1);
    instance = $(this).data("gridz");

    if (instance && instance[option]) {
      instance[option].apply(this, otherArgs);
    } else {} // try passing through to jqgrid


    return $(this).jqGrid(arguments);
  }

  return this.each(function () {
    var el = $(this);
    instance = el.data("gridz");
    var options = _typeof(option) === "object" ? option : {};

    if (!instance) {
      return el.data("gridz", instance = new Gridz(this, options));
    }
  });
};

$.fn.gridz.Constructor = Gridz;
$.fn.gridz.defaults = {
  prmNames: {
    page: "page",
    rows: "max",
    sort: "sort",
    order: "order"
  },
  jsonReader: {
    repeatitems: false
  },
  // Defines in what format to expect the data that fills the grid.
  //   json  - use internal jqgrid function to load the data via ajax
  //   local - use local data
  datatype: "json",
  mtype: "GET",
  // for the ajax json read
  rowNum: 20,
  // num rows to show by default
  rowList: [10, 20, 50, 100],
  altRows: true,
  shrinkToFit: false,
  autowidth: true,
  height: "100%",
  sortable: true,
  multiselect: true,
  // one or more row selections
  viewrecords: true,
  // shows beginning and ending record number in the grid, out of the total number of records in the query.
  // Specify records info format
  // {0} - the start position of the records depending on page number and number of requested records
  // {1} - the end position
  // {2} - total records returned from the server.
  recordtext: "Records {0} - {1} of {2}",
  beforeSelectRow: null,
  gridComplete: null,
  actionPopup: {
    formatter: null,
    menuList: null
  }
}; // Extra formatters for jqGrid

$.extend($.fn.fmatter, {
  // use `agDateFilter` for format dates
  date: function date(cellVal, options) {
    return window.columnAligner("date", window.agDateFilter(cellVal), options);
  },
  // use `agCurrencyFilter` for format currencies
  currency: function currency(cellVal, options) {
    return window.columnAligner("currency", window.agCurrencyFilter(cellVal), options);
  },
  // use `agCurrencyFilter` for format currencies, use 0 for empty/null/undefined value
  currencyOrZero: function currencyOrZero(cellVal, options) {
    if (typeof cellVal === 'undefined' || cellVal === null || cellVal === 'null' || cellVal === '') {
      cellVal = 0;
    }

    return window.columnAligner("currency", window.agCurrencyFilter(cellVal), options);
  },
  okIcon: function okIcon(cellVal, options, rowdata) {
    if (cellVal) {
      return "<i class='fa fa-check'></i>";
    } else {
      return "";
    }
  },
  editActionLink: function editActionLink(cellVal, options, rowdata) {
    return "<a class=\"editActionLink\" href=\"#\">".concat(cellVal, "</a>");
  }
});

var currencyUnformatter = function currencyUnformatter(cellVal) {
  if (typeof cellVal === 'undefined' || cellVal === null || cellVal === 'null' || cellVal === '') {
    return 0;
  } else {
    return parseFloat(cellVal.replace(/[^0-9\.-]+/g, ""));
  }
};

$.extend((_$$fn$fmatter = $.fn.fmatter) === null || _$$fn$fmatter === void 0 ? void 0 : _$$fn$fmatter.currency, {
  unformat: currencyUnformatter
});
$.extend((_$$fn$fmatter2 = $.fn.fmatter) === null || _$$fn$fmatter2 === void 0 ? void 0 : _$$fn$fmatter2.currencyOrZero, {
  unformat: currencyUnformatter
}); // Returns the template for data column alignment.
// type    - type of a columns (e.g. currency, date, link)
// content - content of a grid cell

window.columnAligner = function (type, content, options) {
  var _options$colModel;

  if (options === null || options === void 0 ? void 0 : (_options$colModel = options.colModel) === null || _options$colModel === void 0 ? void 0 : _options$colModel.align) {
    return content;
  } else {
    return "<div class=\"".concat(type, "-content\">").concat(content, "</div>");
  }
};

/***/ }),

/***/ "8Mtx":
/*!******************************************************!*\
  !*** ./src/scripts/forms/directives/agSelectBind.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formsModule */ "O9c1");



// Enhanced bind directive with default value
// For editable select fields
angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_2__["default"]).directive('agSelectBind', ['$filter', '$parse', function ($filter, $parse) {
  return {
    restrict: 'A',
    controller: function controller() {
      this.showValue = function (value) {
        return angular__WEBPACK_IMPORTED_MODULE_1___default.a.isNumber(value) || !!value;
      };

      this.getField = function (objects, id, field, scope) {
        objects = $parse(objects)(scope);

        if (id % 1 === 0) {
          id = angular__WEBPACK_IMPORTED_MODULE_1___default.a.fromJson(id);
        }

        var element = $filter('filter')(objects, {
          id: id
        }, true);

        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(element) && element.length > 0) {
          return element[0][field];
        } else {
          return '';
        }
      };

      return this;
    },
    compile: function compile(element) {
      // grab the default value from the initial content
      var defaultValue = element.html() || '&nbsp;';
      return function (scope, element, attrs, ctrl) {
        var field = attrs.agSelectBindField;
        return scope.$watch(attrs.agSelectBind, function (value) {
          var txt = ctrl.showValue(value) ? ctrl.getField(attrs.agSelectBindFor, value, field, scope) : defaultValue;
          return element.html(txt);
        });
      };
    }
  };
}]);

/***/ }),

/***/ "97wk":
/*!*************************************!*\
  !*** ./src/scripts/alerts/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Alerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Alerts */ "1PDj");


var MOD_NAME = 'angleGrinder.alerts';
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);
angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(MOD_NAME, []).value('alertTimeout', 3000).service('alerts', _Alerts__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "9IHm":
/*!*********************************************************!*\
  !*** ./src/scripts/gridz/directives/agResetSortGrid.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
gridz.directive('agResetSortGrid', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      grid: '=for'
    },
    link: function link($scope, element, attrs) {
      return $scope.resetSort = function () {
        var columnName = attrs.defaultColumn ? attrs.defaultColumn : 'id';
        var order = attrs.defaultOrder ? attrs.defaultOrder : 'asc';
        var colModel = $scope.grid.getGridEl().getGridParam('colModel');
        angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(colModel, function (column) {
          return column.lso = column.name === columnName || column.name === 'id' ? order : '';
        });
        angular__WEBPACK_IMPORTED_MODULE_0___default.a.element("[ag-grid-name='".concat(attrs.for, "']")).find('span.s-ico').hide();
        $scope.grid.getGridEl().setGridParam({
          sortname: columnName,
          order: order
        }).trigger('reloadGrid');
        var column = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element("[id$='_".concat(columnName, "']"));
        column.find('span.s-ico').show();
        var disabledClassName = 'ui-state-disabled';

        if (order === 'asc') {
          column.find('.ui-icon-asc').removeClass(disabledClassName);
          column.find('.ui-icon-desc').addClass(disabledClassName);
        } else {
          column.find('.ui-icon-asc').addClass(disabledClassName);
          column.find('.ui-icon-desc').removeClass(disabledClassName);
        }
      };
    },
    template: '\
<a class="list" uib-tooltip="Reset Sorting" ng-click="resetSort()"><i class="fa fa-sort"></i></a>\
'
  };
}]);

/***/ }),

/***/ "ANE9":
/*!***************************************************!*\
  !*** ./src/scripts/common/directives/sideMenu.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../commonModule */ "+MsD");



angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_2__["default"]).directive('agSideMenu', ['$window', '$timeout', function ($window, $timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attr) {
      var headerHeight = 0;
      var elScrollTopOriginal = 0;
      $timeout(function () {
        var header = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(document.getElementById(attr.header));
        elScrollTopOriginal = element.offset().top;

        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(header)[0])) {
          return headerHeight = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(header)[0].offsetHeight;
        }
      });
      var window = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element($window);
      return window.bind('scroll', function () {
        if (window[0].pageYOffset > headerHeight) {
          element.css('position', 'fixed').css('top', "".concat(attr.offset, "px"));
        }

        if (window[0].pageYOffset <= headerHeight) {
          return element.css('position', 'relative');
        }
      });
    }
  };
}]);

/***/ }),

/***/ "Aced":
/*!***************************************************************!*\
  !*** ./src/scripts/common/services/ConfirmationDialogServ.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConfirmationDialogServ; });
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "tcy3");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


window.sweetAlert = window.swal = sweetalert__WEBPACK_IMPORTED_MODULE_0___default.a;
/* @ngInject */

var ConfirmationDialogServ =
/*#__PURE__*/
function () {
  function ConfirmationDialogServ($log, $q) {
    _classCallCheck(this, ConfirmationDialogServ);

    this.$log = $log;
    this.$q = $q;
  }

  _createClass(ConfirmationDialogServ, [{
    key: "open",
    value: function open(options) {
      if (options == null) {
        options = {};
      }

      if (angular.isString(options)) {
        options = {
          message: options
        };
      } // assign default confirmation message


      if (options.message == null) {
        options.message = 'Are you sure?';
      } // assign button labels


      if (options.cancelLabel == null) {
        options.cancelLabel = 'Cancel';
      }

      if (options.okLabel == null) {
        options.okLabel = 'Ok';
      }

      if (options.closeOnConfirm == null) {
        options.closeOnConfirm = true;
      }

      this.$log.info('[ag] opening confirmation dialog', options);
      var defer = this.$q.defer();
      swal({
        title: options.message,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: options.okLabel,
        cancelButtonText: options.cancelLabel,
        closeOnConfirm: options.closeOnConfirm
      }, function (isConfirmed) {
        return defer.resolve(isConfirmed);
      });
      return defer.promise;
    }
  }]);

  return ConfirmationDialogServ;
}();

ConfirmationDialogServ.$inject = ["$log", "$q"];


/***/ }),

/***/ "BWxR":
/*!************************************************************!*\
  !*** ./src/scripts/forms/directives/editableDatepicker.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var forms = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // x-editable wrapper for date picker with calendar button

forms.directive('editableDatepicker', ['editableDirectiveFactory', '$filter', function (editableDirectiveFactory, $filter) {
  return editableDirectiveFactory({
    directiveName: 'editableDatepicker',
    inputTpl: '\
<ag-datepicker ng-model="$data" datepicker-options="{{options}}"></ag-datepicker>\
',
    render: function render() {
      return this.parent.render.call(this);
    }
  });
}]);

/***/ }),

/***/ "CJbm":
/*!************************************************!*\
  !*** ./src/scripts/common/agCurrencyFilter.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/template */ "7wO+");
/* harmony import */ var lodash_template__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_template__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commonModule */ "+MsD");
/* harmony import */ var _utils_isFalsy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/isFalsy */ "X8nh");




var app = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
app.provider('agCurrencyFilter', function () {
  var defaultSymbol = '$';
  var defaultFormat = '<%= symbol %><%= amount %>'; // Set the default currency symbol
  // which will be used across the whole application.

  return {
    setDefaultSymbol: function setDefaultSymbol(symbol) {
      return defaultSymbol = symbol;
    },
    // Set the default currency format
    setDefaultFormat: function setDefaultFormat(format) {
      return defaultFormat = format;
    },
    $get: ['$filter', function ($filter) {
      return function (amount, symbol) {
        if (symbol == null) {
          symbol = defaultSymbol;
        }

        if (Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_3__["isFalsy"])(amount)) {
          return '';
        }

        var formattedAmount = $filter('currency')(amount, '');
        return lodash_template__WEBPACK_IMPORTED_MODULE_0___default()(defaultFormat)({
          amount: formattedAmount,
          symbol: symbol
        });
      };
    }]
  };
});
app.filter('agCurrencyOrZero', ['agCurrencyFilter', function (agCurrencyFilter) {
  return function (val) {
    if (typeof val === 'undefined' || val === null || val === 'null' || val === '') {
      val = 0;
    }

    return agCurrencyFilter(val);
  };
}]);

/***/ }),

/***/ "DLYI":
/*!*************************************************************!*\
  !*** ./src/scripts/forms/directives/editableFormButtons.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.directive('editableFormButtons', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    scope: {
      form: '=editableFormButtons',
      cancelCallBack: '&oncancel'
    },
    link: function link(scope, element, attrs) {
      return scope.cancel = function () {
        scope.form.$cancel();

        if (!_.isNil(scope.cancelCallBack)) {
          return scope.cancelCallBack();
        }
      };
    },
    template: "<div class=\"buttons\">\n<!--\n<button type=\"button\" class=\"btn btn-default\"\n        ng-click=\"form.$show()\"\n        ng-if=\"!form.$visible\">\n  Edit\n</button>\n-->\n<span ng-if=\"form.$visible\">\n  <button type=\"button\" class=\"btn\" ng-disabled=\"form.$waiting\" ng-click=\"cancel()\"><i class=\"fa fa-times\"></i> Cancel </button>\n  <button type=\"submit\" class=\"btn btn-default btn-primary\" ng-disabled=\"form.$invalid || form.$waiting\"><i class=\"fa fa-check fa-inverse\"></i> Save </button>\n</span>\n</div>"
  };
}]);

/***/ }),

/***/ "EHjO":
/*!**********************************************!*\
  !*** ./src/scripts/common/newLinesFilter.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonModule */ "+MsD");


var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Convert line braks to html

app.filter('newLines', function () {
  return function (text) {
    if (!angular__WEBPACK_IMPORTED_MODULE_0___default.a.isString(text)) {
      return text;
    }

    return text.replace(/\n/g, '<br />');
  };
});

/***/ }),

/***/ "Euip":
/*!**************************************!*\
  !*** ./src/scripts/select2/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _agSelect2Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agSelect2Module */ "v3nq");
/* harmony import */ var _Select2Options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Select2Options */ "Xau7");
/* harmony import */ var _agSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agSelect */ "JbUV");



/* harmony default export */ __webpack_exports__["default"] = (_agSelect2Module__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "G//I":
/*!**************************************************!*\
  !*** ./src/scripts/forms/directives/agNumber.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // treat text inputs as numbers without having input type as number
// It will parse the input values using parseFloat so angular controllers can treat the model value as numhers without having to convert it to number each time.

app.directive('agNumber', function () {
  var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/; // borrowed from angularjs

  return {
    require: 'ngModel',
    restrict: 'A',
    link: function link(scope, elem, attrs, ctrl) {
      // borrowed logic from angularjs number directive
      ctrl.$parsers.push(function (value) {
        var empty = ctrl.$isEmpty(value);

        if (empty || NUMBER_REGEXP.test(value)) {
          if (value === '') {
            return null;
          } else if (empty) {
            return value;
          } else {
            return parseFloat(value);
          }
        } else {
          return undefined;
        }
      });
      return ctrl.$formatters.push(function (value) {
        if (ctrl.$isEmpty(value)) {
          return '';
        } else {
          return parseFloat(value).toFixed(attrs.fractionSize || 2);
        }
      });
    }
  };
});

/***/ }),

/***/ "H3ms":
/*!********************************************************!*\
  !*** ./src/scripts/forms/directives/agSubmitButton.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formsModule */ "O9c1");



var forms = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
forms.directive('agSubmitButton', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    require: '^form',
    link: function link(scope, element, attrs, formCtrl) {
      // Check if submit button is in the modal window
      // used to disable submit button while modal closing
      var isModalWindow;

      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(element[0].offsetParent)) {
        isModalWindow = element[0].offsetParent.hasAttribute('modal-window');
      }

      var isSaving = function isSaving() {
        return formCtrl.$saving;
      };

      scope.$watch(isSaving, function (saving) {
        if (!(isModalWindow && scope.saving)) {
          return scope.saving = saving;
        }
      });
      return scope.text = attrs.text || 'Save';
    },
    template: "<button type=\"submit\" class=\"btn btn-default btn-primary\"\n        ng-disabled=\"saving\">\n  <i class=\"fa fa-check fa-inverse\"></i> {{text}}<span ng-show=\"saving\">...</span>\n</button>"
  };
});

/***/ }),

/***/ "I3Mq":
/*!****************************************************!*\
  !*** ./src/scripts/forms/directives/datepicker.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formsModule */ "O9c1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_src_js_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker */ "eR9f");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_src_js_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_src_js_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_4__);





var forms = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
forms.provider('agDate', function () {
  var viewFormat = 'MM/DD/YYYY';
  var date = 'YYYY-MM-DDTHH:mmZ';
  var localDateTime = 'YYYY-MM-DDTHH:mm';
  var localDate = 'YYYY-MM-DD';
  return {
    setViewFormat: function setViewFormat(format) {
      return viewFormat = format;
    },
    setLocalDateFormat: function setLocalDateFormat(format) {
      return localDate = format;
    },
    setLocalDateTimeFormat: function setLocalDateTimeFormat(format) {
      return localDateTime = format;
    },
    setDateFormat: function setDateFormat(format) {
      return date = format;
    },
    $get: [function () {
      return {
        getViewFormat: function getViewFormat() {
          return viewFormat;
        },
        getIsoFormat: function getIsoFormat(name) {
          switch (name) {
            case 'date':
              return date;

            case 'localDateTime':
              return localDateTime;

            default:
              return localDate;
          }
        },
        isValid: function isValid(value, format) {
          return moment__WEBPACK_IMPORTED_MODULE_3___default()(value, format, true).isValid();
        }
      };
    }]
  };
}); // uses http://eonasdan.github.io/bootstrap-datetimepicker/

forms.directive('agDatepicker', ['$timeout', 'agDate', function ($timeout, agDate) {
  return {
    require: 'ngModel',
    restrict: 'AE',
    scope: {
      datepickerOptions: '@'
    },
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      var defaultOptions = {
        format: agDate.getViewFormat(),
        isoFormat: agDate.getIsoFormat($attrs.dateType)
      };
      var options = angular__WEBPACK_IMPORTED_MODULE_1___default.a.extend(defaultOptions, $scope.$eval($attrs.datepickerOptions));
      var isoFormat = options.isoFormat;
      delete options.isoFormat; // Decorate datepicker with button and some usefull stuff if directive is element, not attribute

      if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()($attrs.agDatepicker)) {
        $element.addClass('input-group').addClass('date').addClass('ag-datepicker');
        var input = "<input name='".concat($attrs.id || '', "' class='form-control' placeholder='").concat($attrs.placeholder || '', "' ").concat(!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()($attrs.disabled) ? 'disabled' : undefined, ">\n<span class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i></span>");
        $element.append(input);
      }

      $element.on('dp.change', function (event) {
        if (ngModelCtrl) {
          return $timeout(function () {
            if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(event.date) && event.date._d !== undefined) {
              ngModelCtrl.$setViewValue(moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(event.date._d).format(isoFormat));
              return ngModelCtrl.$setValidity('dateFormat', agDate.isValid(ngModelCtrl.$modelValue, isoFormat));
            } else {
              return ngModelCtrl.$setViewValue('');
            }
          });
        }
      }).datetimepicker(options);

      var setPickerValue = function setPickerValue() {
        var date = null;

        if (ngModelCtrl && ngModelCtrl.$viewValue) {
          date = moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(ngModelCtrl.$viewValue, isoFormat);
        }

        var datepicker = $element.data('DateTimePicker');

        if (datepicker) {
          return datepicker.date(date);
        }
      };

      if (ngModelCtrl) {
        ngModelCtrl.$render = function () {
          return setPickerValue();
        };
      }

      return setPickerValue();
    }
  };
}]);
forms.directive('agDate', ['agDate', function (agDate) {
  return {
    restrict: 'AE',
    require: '?ngModel',
    link: function link(scope, element, attrs, ngModelCtrl) {
      var modelFormat = agDate.getIsoFormat(attrs.dateType);
      var dateFormat = attrs.dateFormat || agDate.getViewFormat();
      ngModelCtrl.$parsers.shift();
      ngModelCtrl.$parsers.push(function (viewValue) {
        var isValid = agDate.isValid(viewValue, dateFormat);
        ngModelCtrl.$setValidity('dateFormat', isValid);

        if (isValid) {
          return moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(viewValue, dateFormat).format(modelFormat);
        } else {
          return '';
        }
      });
      return ngModelCtrl.$formatters.push(function (modelValue) {
        var isValid = agDate.isValid(modelValue, modelFormat);
        ngModelCtrl.$setValidity('dateFormat', isValid);
        return moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc(modelValue, modelFormat).format(dateFormat);
      });
    }
  };
}]);

/***/ }),

/***/ "JbUV":
/*!*****************************************!*\
  !*** ./src/scripts/select2/agSelect.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/template */ "7wO+");
/* harmony import */ var lodash_template__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_template__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _agSelect2Module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./agSelect2Module */ "v3nq");





var smod = angular__WEBPACK_IMPORTED_MODULE_3___default.a.module(_agSelect2Module__WEBPACK_IMPORTED_MODULE_4__["default"]); // Creates select2 component along with the "show" button
// Options:
//   `select-options` takes select2 options from the controller
//   `ng-model` takes a model

smod.directive('agSelect2', ['$rootScope', '$compile', '$log', 'pathWithContext', function ($rootScope, $compile, $log, pathWithContext) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      selectOptions: '=',
      ngModel: '='
    },
    compile: function compile(element, attrs, transclude) {
      // find a template for the result item
      var resultTemplate = null;
      var scope = $rootScope.$new();
      transclude(scope, function (clone) {
        return function () {
          var result = [];

          for (var _i = 0, _Array$from = Array.from(clone); _i < _Array$from.length; _i++) {
            element = _Array$from[_i];

            if (element instanceof HTMLElement && !lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(element.getAttribute('ag-select2-result'))) {
              resultTemplate = element.outerHTML;
              break;
            } else {
              result.push(undefined);
            }
          }

          return result;
        }();
      }); // pre linking function

      return {
        pre: function pre(scope, element, attrs) {
          var options = angular__WEBPACK_IMPORTED_MODULE_3___default.a.copy(scope.selectOptions || {
            multiple: true
          });

          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(attrs.selectMultiple)) {
            options.multiple = attrs.selectMultiple === 'true';
          }

          scope.options = options; // read `minimumInputLength` option from the attribute

          if (options.minimumInputLength == null) {
            options.minimumInputLength = 1;
          }

          scope.showFill = attrs.fillAll && attrs.fillAll === 'true';

          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(attrs.selectMinimumInputLength)) {
            options.minimumInputLength = parseInt(attrs.selectMinimumInputLength);
          }

          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(attrs.selectAll)) {
            options.minimumInputLength = 0;
          } // set the default `width`


          if (options.width == null) {
            options.width = 'resolve';
          } // create `ajax`


          if (lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(options.ajax) && !lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(attrs.selectAjaxUrl)) {
            options.ajax = {
              url: pathWithContext(attrs.selectAjaxUrl),
              data: function data(term, page) {
                return {
                  q: term,
                  // search term (query params)
                  max: 20,
                  page: page,
                  sort: 'name',
                  order: 'asc'
                };
              },
              results: function results(data, page) {
                var more = page < data.total;
                return {
                  results: data.rows,
                  more: more
                };
              }
            }; // read `quietMillis` option from the attribute
            // Number of milliseconds to wait for the user to
            // stop typing before issuing the ajax request

            options.ajax.quietMillis = 500;

            if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(attrs.selectAjaxQuietMillis)) {
              options.ajax.quietMillis = parseInt(attrs.selectAjaxQuietMillis);
            }
          } // create `formatResult` function from the given template


          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(resultTemplate)) {
            if (options.formatResult == null) {
              options.formatResult = function (item) {
                options = {
                  interpolate: /\{\{(.+?)\}\}/g
                };
                return angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(lodash_template__WEBPACK_IMPORTED_MODULE_1___default()(resultTemplate, options)({
                  item: item
                }));
              };
            }
          } // create default `formatSelection` method


          if (options.formatSelection == null) {
            options.formatSelection = function (item) {
              return item.name;
            };
          }

          return $log.debug('[forms] initializing AgSelect2 component', scope.options);
        }
      };
    },
    template: "<div class=\"input-group\">\n  <input ui-select2=\"options\" ng-model=\"ngModel\" class=\"form-control\" type=\"hidden\"/>\n  <select-fill ng-if=\"showFill\"></select-fill>\n</div>\n"
  };
}]);
smod.directive('agSelect2Open', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    controller: ['$scope', '$element', function ($scope, $element) {
      return $scope.openSelect2 = function () {
        var selectEl = $element.parent().find('.select2-container');
        selectEl.select2('open');
      };
    }],
    template: "<span class=\"input-group-btn\">\n  <button class=\"btn open-select2 btn-default \" type=\"button\" ng-click=\"openSelect2()\"><i class=\"fa fa-search\"></i></button>\n</span>"
  };
});
smod.directive('selectFill', ['$http', 'pathWithContext', '$parse', function ($http, pathWithContext, $parse) {
  return {
    restrict: 'E',
    replace: true,
    priority: 2000,
    link: function link(scope, $element, attrs) {
      return scope.fill = function () {
        var selectEl = $element.parent().parent().find('div[select-ajax-url]')[0];
        var model = $parse(selectEl.attributes['ng-model'].value);
        return $http.get(pathWithContext(selectEl.attributes['select-ajax-url'].value)).then(function (resp) {
          var result = [];

          if (model(scope.$parent.$parent).length < resp.data.rows.length) {
            result = resp.data.rows;
          }

          return model.assign(scope.$parent.$parent, result);
        });
      };
    },
    template: "<span class=\"input-group-btn\">\n  <button class=\"btn open-select2 btn-default \" type=\"button\" ng-click=\"fill()\"><i class=\"fa fa-truck\"></i></button>\n</span>"
  };
}]);
smod.directive('agSelect2Fill', ['$http', 'pathWithContext', '$parse', function ($http, pathWithContext, $parse) {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    controller: ['$scope', '$element', function ($scope, $element) {
      return $scope.fill = function () {
        var selectEl = $element.parent().find('.select2-container');
        var select = document.getElementById(selectEl[0].attributes.id.value.replace('s2id_', ''));
        var model = $parse(angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(select)[0].attributes['ng-model'].value);

        var result = lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(select.options, 'value');

        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_2___default()(model($scope.$parent)) && model($scope.$parent).length === result.length) {
          result = [];
        }

        model.assign($scope.$parent, result);
      };
    }],
    link: function link(scope, $element, attrs) {
      return $element.parent().css('display', 'table');
    },
    template: "<span class=\"input-group-btn\">\n  <button class=\"btn open-select2 btn-default \" type=\"button\" ng-click=\"fill()\"><i class=\"fa fa-truck\"></i></button>\n</span>"
  };
}]);

/***/ }),

/***/ "L6m9":
/*!***********************************************************************************************!*\
  !*** ./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "L8aa":
/*!*******************************************************!*\
  !*** ./src/scripts/forms/services/MassUpdateMixin.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formsModule */ "O9c1");



var mixin = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
mixin.factory('MassUpdateMixin', ['$log', '$parse', '$uibModal', 'pathWithContext', 'NotificationDialogServ', function ($log, $parse, $modal, pathWithContext, NotificationDialogServ) {
  return function ($scope, args) {
    if (args == null) {
      args = {};
    }

    var _args = args,
        gridName = _args.gridName,
        templateUrl = _args.templateUrl,
        controller = _args.controller,
        _extraParams = _args.extraParams;

    if (controller == null) {
      controller = 'MassUpdateFormCtrl';
    }

    return $scope.massUpdate = function () {
      var _grid = $parse(gridName)($scope);

      if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(_grid)) {
        throw new Error('the grid is not defined');
      } // ..grab selected row ids


      var _selectedIds = _grid.getSelectedRowIds();

      if (_selectedIds.length === 0) {
        NotificationDialogServ.open('Please select at least one row.');
        return;
      }

      return $modal.open({
        templateUrl: pathWithContext(templateUrl),
        controller: controller,
        keyboard: false,
        // do not close the dialog with ESC key
        backdrop: 'static',
        // do not close on click outside of the dialog
        resolve: {
          selectedIds: function selectedIds() {
            return _selectedIds;
          },
          grid: function grid() {
            return _grid;
          },
          extraParams: function extraParams() {
            return _extraParams;
          }
        }
      });
    };
  };
}]); // Decorates the $scope with mass update magic

mixin.factory('massUpdateFormCtrlMixin', ['$log', 'MassUpdateHandler', function ($log, MassUpdateHandler) {
  return function ($scope, args) {
    if (args == null) {
      args = {};
    }

    var _args2 = args,
        dialog = _args2.dialog,
        Resource = _args2.Resource,
        selectedIds = _args2.selectedIds,
        grid = _args2.grid,
        beforeSave = _args2.beforeSave; // Generic method for mass updating selected rows

    $scope.massUpdate = function (records) {
      var data = angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy(records);
      $log.info('[forms] mass update', data); // `beforeSave` callback is given

      if (angular__WEBPACK_IMPORTED_MODULE_1___default.a.isFunction(beforeSave)) {
        // transform the data
        data = beforeSave(data);
      }

      var params = {
        ids: selectedIds,
        data: data
      };
      var promise = Resource.massUpdate(params).$promise;
      return promise.then(function (result) {
        MassUpdateHandler(grid, result);
        grid.clearSelection();
        $scope.closeDialog();
        return result;
      });
    }; // Generic method for closing the mass update dialog


    return $scope.closeDialog = function () {
      $log.info('[forms] closing the mass update dialog');
      return dialog.close();
    };
  };
}]);

/***/ }),

/***/ "LBM1":
/*!**************************************************!*\
  !*** ./src/scripts/gridz/directives/gridCrud.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Uses to show edit panel for grid row. Supports dbl click on grid cell.

app.directive("gridCrud", ["$controller", "$timeout", function ($controller, $timeout) {
  return {
    restrict: "A",
    replace: true,
    scope: true,
    template: '<div  ng-show="showForm"><ng-include ng-if="!isModal" src="template | withContext"></ng-include></div>',
    link: function link(scope, element, attrs) {
      var gridEl = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.querySelectorAll("[ag-grid-name=".concat(attrs.gridName, "]"))).find("table.gridz");

      var clicks = function clicks() {
        gridEl.jqGrid('setGridParam', {
          ondblClickRow: scope.dblClick
        });

        if (attrs.keyboardnav === true || attrs.keyboardnav === 'true') {
          var colNames = gridEl.jqGrid('getGridParam', 'colNames');
          return gridEl.bind("keydown", function (event) {
            if (scope.lastSelectedRow) {
              if (event.which !== 13) {
                scope.unHighlightCell(scope.lastSelectedRow, scope.lastSelectedCell);
              }

              var ids = gridEl.jqGrid('getDataIDs');
              var firstId = ids[0];
              var lastId = ids[ids.length - 1];

              switch (event.which) {
                case 13:
                  //enter
                  scope.dblClick(scope.lastSelectedRow, null, scope.lastSelectedCell, event);
                  break;

                case 40:
                  //down
                  if (scope.lastSelectedRow !== lastId) {
                    scope.lastSelectedRow = ids[ids.indexOf(scope.lastSelectedRow) + 1];
                  }

                  break;

                case 38:
                  //up
                  if (scope.lastSelectedRow !== firstId) {
                    scope.lastSelectedRow = ids[ids.indexOf(scope.lastSelectedRow) - 1];
                  }

                  break;

                case 39:
                  //right
                  if (scope.lastSelectedCell !== colNames.length) {
                    scope.lastSelectedCell++;
                  }

                  break;

                case 37:
                  //left
                  if (scope.lastSelectedCell !== 0) {
                    scope.lastSelectedCell--;
                  }

                  break;
              }
            }

            return scope.highlightCell(scope.lastSelectedRow, scope.lastSelectedCell);
          });
        }
      };

      attrs.$observe("gridCrud", clicks);
      scope.isModal = attrs.isModal === true || attrs.isModal === 'true';
      var ctrlLocals = {
        $scope: scope,
        $element: element,
        $attrs: attrs
      };
      var controllerName = attrs.controller ? attrs.controller : "GridCrudCtrl";
      $controller(controllerName, ctrlLocals);
      return scope.$watch(function () {
        return scope.showForm || false;
      }, function (newVal) {
        if (newVal) {
          return $timeout(function () {
            return scope.setFocus(element);
          });
        }
      });
    }
  };
}]);

var GridCrudCtrl = function GridCrudCtrl($scope, $element, $attrs, $parse, $log, resourceBuilder, $window, restrictResource, $uibModal, pathWithContext, $timeout) {
  _classCallCheck(this, GridCrudCtrl);

  var Resource = null;
  var beforeSave = null;
  var afterSave = null;
  $scope.lastSelectedRow = null;
  $scope.lastSelectedCell = null;

  if ($attrs.beforeSave) {
    beforeSave = $scope[$attrs.beforeSave];
  }

  if ($attrs.afterSave) {
    afterSave = $scope[$attrs.afterSave];
  }

  var resourceName = $attrs.resource;
  Resource = resourceBuilder("/".concat(resourceName), resourceName);
  var actionSuffix = resourceName.charAt(0).toUpperCase() + resourceName.substring(1);
  $scope.template = $attrs.template;

  var grid = function grid() {
    return $parse($attrs.gridName)($scope);
  };

  var allowedFields = $parse($attrs.allowedFields)($scope);

  var hideForm = function hideForm() {
    if ($scope.isModal) {
      $scope.modal.close();
    } else {
      $scope.showForm = false;
    }

    return $scope.highlightCell($scope.lastSelectedRow, $scope.lastSelectedCell);
  };

  var showForm = function showForm() {
    if ($scope.isModal) {
      var defaultModalOptions = {
        templateUrl: pathWithContext($scope.template),
        keyboard: false,
        // do not close the dialog with ESC key
        backdrop: "static",
        // do not close on click outside of the dialog
        scope: $scope,
        windowClass: ""
      };
      var modalOptions = angular__WEBPACK_IMPORTED_MODULE_0___default.a.fromJson($attrs.modalOptions);
      modalOptions = angular__WEBPACK_IMPORTED_MODULE_0___default.a.extend(defaultModalOptions, modalOptions);
      modalOptions.windowClass = modalOptions.windowClass + " grid-crud-modal ";
      $scope.modal = $uibModal.open(modalOptions);
      return $scope.modal.rendered.then(function () {
        return $timeout(function () {
          return $scope.setFocus(angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(".grid-crud-modal")[0]));
        }, 500);
      });
    } else {
      return $scope.showForm = true;
    }
  };

  var editAction = function editAction(id) {
    var record;
    $scope.unHighlightCell($scope.lastSelectedRow, $scope.lastSelectedCell);
    $log.info("[gridCrud] Edit ".concat(resourceName, " : ").concat(id));
    $scope.lastSelectedRow = id;
    return record = Resource.get({
      id: id
    }, function (r) {
      $scope[resourceName] = restrictResource(r, allowedFields);
      return showForm();
    });
  };

  var createAction = function createAction() {
    $log.info("[gridCrud] Create ".concat(resourceName));
    var record = new Resource();
    $scope[resourceName] = record;
    return showForm();
  };

  $scope.save = function (record) {
    $log.info("[gridCrud] Saving record");

    if (beforeSave) {
      $log.info("[gridCrud] Calling beforeSave: ".concat(resourceName));
      beforeSave(record);
    }

    var promise = record.save().$promise;
    promise.then(function (record) {
      $log.info("[gridCrud] record has been updated/created", record);
      grid().saveRow(record.id, record);
      hideForm();

      if (afterSave) {
        $log.info("[gridCrud] Calling afterSave: ".concat(resourceName));
        afterSave(record);
      }

      return $scope.highlightCell($scope.lastSelectedRow, $scope.lastSelectedCell);
    });
    return [promise, record];
  };

  $scope.highlightCell = function (rowid, colname) {
    var q = grid().getGridEl(); //console.log(q)

    q.jqGrid("setCell", rowid, colname, "", {
      "border-color": "green",
      "border-width": "thin",
      "border-style": "double"
    });
    return null;
  };

  $scope.unHighlightCell = function (rowid, colname) {
    var q = grid().getGridEl(); //console.log(q)

    q.jqGrid("setCell", rowid, colname, "", {
      "border-width": "0px"
    });
    return null;
  };

  $scope.cancel = function () {
    return hideForm();
  };

  $scope.dblClick = function (rowid, iRow, iCol, e) {
    var _e$currentTarget, _colModel$iCol;

    var _$scope$$getGridEl$ge = $scope["".concat(e === null || e === void 0 ? void 0 : (_e$currentTarget = e.currentTarget) === null || _e$currentTarget === void 0 ? void 0 : _e$currentTarget.id)].getGridEl().getGridParam(),
        colModel = _$scope$$getGridEl$ge.colModel;

    $scope.columnNameForFocus = (_colModel$iCol = colModel[iCol]) === null || _colModel$iCol === void 0 ? void 0 : _colModel$iCol["name"];
    editAction(rowid);
    return $scope.lastSelectedCell = iCol;
  };

  $scope.setFocus = function (element) {
    if ($scope.columnNameForFocus) {
      // check if variable exists
      var inputs = element.find("input");

      for (var _i = 0, _Array$from = Array.from(inputs); _i < _Array$from.length; _i++) {
        var input = _Array$from[_i];

        if (input.name.toUpperCase() === $scope.columnNameForFocus.toUpperCase()) {
          input.focus();
          input.select();
        }
      }

      element.find("[id='s2id_".concat($scope.columnNameForFocus, "']")).select2("open");
      return $scope.columnNameForFocus = null;
    }
  };

  $parse("edit".concat(actionSuffix)).assign($scope.$parent, editAction);
  $parse("create".concat(actionSuffix)).assign($scope.$parent, createAction);
};

GridCrudCtrl.$inject = ["$scope", "$element", "$attrs", "$parse", "$log", "resourceBuilder", "$window", "restrictResource", "$uibModal", "pathWithContext", "$timeout"];
GridCrudCtrl.$inject = ["$scope", "$element", "$attrs", "$parse", "$log", "resourceBuilder", "$window", "restrictResource", "$uibModal", "pathWithContext", "$timeout"];
angular__WEBPACK_IMPORTED_MODULE_0___default.a.module("angleGrinder.gridz").controller("GridCrudCtrl", GridCrudCtrl);

/***/ }),

/***/ "LSq8":
/*!************************************!*\
  !*** ./src/scripts/forms/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formsModule */ "O9c1");
/* harmony import */ var _directives_agBind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directives/agBind */ "aGkd");
/* harmony import */ var _directives_agDeleteButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./directives/agDeleteButton */ "RNd7");
/* harmony import */ var _directives_agMaxLines__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/agMaxLines */ "TLok");
/* harmony import */ var _directives_agNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/agNumber */ "G//I");
/* harmony import */ var _directives_agPanels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives/agPanels */ "bXk/");
/* harmony import */ var _directives_agSelectBind__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/agSelectBind */ "8Mtx");
/* harmony import */ var _directives_agSubmit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./directives/agSubmit */ "4tdo");
/* harmony import */ var _directives_agSubmitButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directives/agSubmitButton */ "H3ms");
/* harmony import */ var _directives_agTabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directives/agTabs */ "6ku9");
/* harmony import */ var _directives_autofillPrevent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/autofillPrevent */ "oqhd");
/* harmony import */ var _directives_buttons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/buttons */ "ysVj");
/* harmony import */ var _directives_datepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directives/datepicker */ "I3Mq");
/* harmony import */ var _directives_editableCustom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/editableCustom */ "lIzJ");
/* harmony import */ var _directives_editableDatepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directives/editableDatepicker */ "BWxR");
/* harmony import */ var _directives_editableDirectiveFactory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directives/editableDirectiveFactory */ "xp58");
/* harmony import */ var _directives_editableFormButtons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/editableFormButtons */ "DLYI");
/* harmony import */ var _directives_editablePanelHeading__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directives/editablePanelHeading */ "n+WL");
/* harmony import */ var _directives_editableSelect2__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./directives/editableSelect2 */ "wwXr");
/* harmony import */ var _directives_focus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./directives/focus */ "6stN");
/* harmony import */ var _directives_validations__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./directives/validations */ "NHs9");
/* harmony import */ var _services_DialogCrudCtrlMixin__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/DialogCrudCtrlMixin */ "ekUz");
/* harmony import */ var _services_FormDialogServ__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/FormDialogServ */ "gKM7");
/* harmony import */ var _services_MassUpdateHandler__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./services/MassUpdateHandler */ "NUOw");
/* harmony import */ var _services_MassUpdateMixin__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./services/MassUpdateMixin */ "L8aa");
/* harmony import */ var _services_PanelFormMixin__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./services/PanelFormMixin */ "0JJ2");
/* harmony import */ var _services_SinglePageCrudMixin__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./services/SinglePageCrudMixin */ "kQpr");



























/* harmony default export */ __webpack_exports__["default"] = (_formsModule__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "LvVy":
/*!****************************************!*\
  !*** ./src/styles/editable-panels.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "LyZ+":
/*!******************************************!*\
  !*** ./src/scripts/gridz/gridzModule.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "QMGv");
/* harmony import */ var _resourceSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resourceSupport */ "hh/Y");
/* harmony import */ var _select2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../select2 */ "Euip");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-sanitize */ "wmx0");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var angular_drag_and_drop_lists__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-drag-and-drop-lists */ "4LZA");
/* harmony import */ var angular_drag_and_drop_lists__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular_drag_and_drop_lists__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var free_jqgrid_js_jquery_jqgrid_src_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! free-jqgrid/js/jquery.jqgrid.src.js */ "eHjR");
/* harmony import */ var free_jqgrid_js_jquery_jqgrid_src_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(free_jqgrid_js_jquery_jqgrid_src_js__WEBPACK_IMPORTED_MODULE_6__);







var MOD_NAME = 'angleGrinder.gridz';
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);
var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('angleGrinder.gridz', [_common__WEBPACK_IMPORTED_MODULE_1__["default"], _resourceSupport__WEBPACK_IMPORTED_MODULE_2__["default"], _select2__WEBPACK_IMPORTED_MODULE_3__["default"], angular_sanitize__WEBPACK_IMPORTED_MODULE_4___default.a, 'dndLists']); // Globally expose custom formatters for dates and currencies.
// Used by jgGrid for formatting cell values.

gridz.run(['$window', 'agDateFilter', 'agCurrencyFilter', function ($window, agDateFilter, agCurrencyFilter) {
  $window.agDateFilter = agDateFilter;
  return $window.agCurrencyFilter = agCurrencyFilter;
}]);

/***/ }),

/***/ "MhVr":
/*!***************************************!*\
  !*** ./src/scripts/utils/BaseCtrl.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseCtrl; });
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/bind */ "JpaV");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/each */ "xkGU");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);




function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseCtrl =
/*#__PURE__*/
function () {
  _createClass(BaseCtrl, [{
    key: "expose",
    // Expose the given fields to the `$scope`
    value: function expose($scope) {
      var _this = this;

      for (var _len = arguments.length, members = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        members[_key - 1] = arguments[_key];
      }

      // see https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba
      var fmap = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(members, function (field) {
        return [field, _this[field]];
      });

      return lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(fmap, function () {
        var _Array$from = Array.from(arguments.length <= 0 ? undefined : arguments[0]),
            _Array$from2 = _slicedToArray(_Array$from, 2),
            field = _Array$from2[0],
            entity = _Array$from2[1];

        return $scope[field] = typeof entity === 'function' ? lodash_bind__WEBPACK_IMPORTED_MODULE_0___default()(entity, _this) : entity;
      }); // return _.chain(members)
      //   .map((field) => [field, this[field]])
      //   .each((...args) => {
      //     const [field, entity] = Array.from(args[0])
      //     return $scope[field] = typeof entity === 'function' ? _.bind(entity, this) : entity
      //   })
      //   .value()
    }
  }], [{
    key: "register",
    value: function register(app, name) {
      if (name == null) {
        name = this.name || __guard__(this.toString().match(/function\s*(.*?)\(/), function (x) {
          return x[1];
        });
      }

      if (typeof app === 'string') {
        app = angular.module(app);
      }

      return app.controller(name, this);
    }
  }, {
    key: "inject",
    value: function inject() {
      var ANNOTATION_REG = /^(\S+)(\s+as\s+(\w+))?$/;

      for (var _len2 = arguments.length, annotations = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        annotations[_key2] = arguments[_key2];
      }

      this.annotations = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(annotations, function (annotation) {
        var match = annotation.match(ANNOTATION_REG);
        return {
          name: match[1],
          identifier: match[3] || match[1]
        };
      });
      return this.$inject = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.annotations, function (annotation) {
        return annotation.name;
      });
    }
  }]);

  function BaseCtrl() {
    _classCallCheck(this, BaseCtrl);

    for (var index = 0; index < this.constructor.annotations.length; index++) {
      var annotation = this.constructor.annotations[index];
      this[annotation.identifier] = index < 0 || arguments.length <= index ? undefined : arguments[index];
    }

    if (typeof this.initialize === 'function') {
      this.initialize();
    }
  }

  return BaseCtrl;
}();



/***/ }),

/***/ "NHs9":
/*!*****************************************************!*\
  !*** ./src/scripts/forms/directives/validations.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_some__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/some */ "MJIl");
/* harmony import */ var lodash_some__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_some__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_every__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/every */ "Jlc5");
/* harmony import */ var lodash_every__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_every__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../formsModule */ "O9c1");
/* harmony import */ var _utils_isFalsy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/isFalsy */ "X8nh");





function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var forms = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_5__["default"]);
forms.value("validationMessages", {
  required: "This field is required",
  number: "This field must be a number",
  mismatch: "Does not match the confirmation",
  minlength: "This field is too short",
  maxlength: "This field is too long",
  email: "Invalid email address",
  pattern: "Invalid pattern"
}); // Custom validation directive for fields match.
// Might be used for password confirmation validation.

forms.directive("match", function () {
  return {
    require: "ngModel",
    link: function link(scope, elem, attrs, modelCtrl) {
      var validateEqual = function validateEqual(value, otherValue) {
        var allEmpty = lodash_every__WEBPACK_IMPORTED_MODULE_3___default()([Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(value), Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(otherValue)]);

        var valid = allEmpty || value === otherValue;
        modelCtrl.$setValidity("mismatch", valid);
        return value;
      }; // watch the other value and re-validate on change


      scope.$watch(attrs.match, function (otherValue) {
        return validateEqual(modelCtrl.$viewValue, otherValue);
      });

      var validator = function validator(value) {
        var otherValue = scope.$eval(attrs.match);
        return validateEqual(value, otherValue);
      }; // validate DOM -> model


      modelCtrl.$parsers.unshift(validator); // validate model -> DOM

      return modelCtrl.$formatters.unshift(validator);
    }
  };
});
forms.directive("agLength", ["$parse", function ($parse) {
  return {
    require: "ngModel",
    restrict: "A",
    link: function link(scope, elem, attrs, ngModelCtrl) {
      var lengthValidator = function lengthValidator(value) {
        var valid;
        var length = $parse(attrs.agLength)(scope); //If length is not provided, or value is not entered, its valid
        //This validator does not check for required values, so if value must be entered, add ng-required

        if (Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_6__["isFalsy"])(length) || ngModelCtrl.$isEmpty(value)) {
          valid = true;
        } else {
          valid = value.length === length;
        }

        ngModelCtrl.$setValidity("length", valid);

        if (valid) {
          return value;
        } else {
          return undefined;
        }
      };

      ngModelCtrl.$parsers.unshift(lengthValidator);
      ngModelCtrl.$formatters.push(lengthValidator);
      return scope.$watch(attrs.agLength, function () {
        return lengthValidator(ngModelCtrl.$viewValue);
      });
    }
  };
}]);
forms.directive("agFieldGroup", ["$timeout", "$log", "$interpolate", function ($timeout, $log, $interpolate) {
  return {
    restrict: "A",
    require: "^form",
    replace: true,
    transclude: true,
    template: "<div class=\"form-group\" ng-transclude></div>",
    link: function link(scope, element, attrs, formCtrl) {
      var fields = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()((attrs["for"] || "").split(","), function (fieldExpr) {
        return $interpolate(fieldExpr)(scope);
      });

      var toggleErrors = function toggleErrors() {
        return $timeout(function () {
          // true if the field is invalid or it has server side errors
          var invalid = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(fields, function (field) {
            var _formCtrl$field, _formCtrl$$serverErro;

            return ((_formCtrl$field = formCtrl[field]) === null || _formCtrl$field === void 0 ? void 0 : _formCtrl$field.$invalid) || ((_formCtrl$$serverErro = formCtrl.$serverErrors) === null || _formCtrl$$serverErro === void 0 ? void 0 : _formCtrl$$serverErro[field]);
          });

          if (lodash_some__WEBPACK_IMPORTED_MODULE_1___default()(invalid)) {
            return element.addClass("has-error");
          } else {
            return element.removeClass("has-error");
          }
        });
      }; // Watch for validity state change and display errors if necessary


      angular__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(fields, function (field) {
        var getViewValue = function getViewValue() {
          var _formCtrl$field2;

          return (_formCtrl$field2 = formCtrl[field]) === null || _formCtrl$field2 === void 0 ? void 0 : _formCtrl$field2.$viewValue;
        };

        return scope.$watch(getViewValue, function () {
          var _formCtrl$field3;

          if (!((_formCtrl$field3 = formCtrl[field]) === null || _formCtrl$field3 === void 0 ? void 0 : _formCtrl$field3.$dirty)) {
            return;
          }

          return toggleErrors();
        });
      }); // Display server side validation errors (only once)

      angular__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(fields, function (field) {
        var initial = true;

        var getServerErrors = function getServerErrors() {
          var _formCtrl$$serverErro2;

          return (_formCtrl$$serverErro2 = formCtrl.$serverErrors) === null || _formCtrl$$serverErro2 === void 0 ? void 0 : _formCtrl$$serverErro2[field];
        };

        return scope.$watch(getServerErrors, function () {
          if (!initial) {
            toggleErrors();
          }

          return initial = false;
        });
      }); // Display validation errors when the form is submitted

      var isSubmitted = function isSubmitted() {
        return formCtrl.$submitted;
      };

      return scope.$watch(isSubmitted, function (submitted) {
        if (!submitted) {
          return;
        }

        return toggleErrors();
      });
    }
  };
}]);
forms.directive("agValidationErrors", ["validationMessages", "$interpolate", function (validationMessages, $interpolate) {
  return {
    restrict: "E",
    require: "^form",
    replace: true,
    link: function link(scope, element, attrs, formCtrl) {
      var fieldName = $interpolate(attrs["for"])(scope);
      var field = formCtrl[fieldName]; // Do cleanup

      var clearErrors = function clearErrors() {
        return element.html("");
      }; // Try to take an errors message from the attribute
      // otherwise fallback to the default error message


      var messageFor = function messageFor(error) {
        return attrs[error] || validationMessages[error];
      };

      var appendError = function appendError(message, klass) {
        if (klass == null) {
          klass = "";
        }

        return element.append("  <span class=\"help-inline ".concat(klass, "\">").concat(message, "</span>  "));
      };

      var displayErrorMessages = function displayErrorMessages() {
        clearErrors(); // Display client side errors

        return function () {
          var result = [];

          for (var error in field.$error) {
            var invalid = field.$error[error];

            if (!invalid) {
              continue;
            }

            var message = messageFor(error);

            if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(message)) {
              result.push(appendError(message));
            } else {
              result.push(undefined);
            }
          }

          return result;
        }();
      }; // Clear validation errors when the field is valid


      var initial = true;

      var isValid = function isValid() {
        var _formCtrl$fieldName;

        return (_formCtrl$fieldName = formCtrl[fieldName]) === null || _formCtrl$fieldName === void 0 ? void 0 : _formCtrl$fieldName.$valid;
      };

      scope.$watch(isValid, function () {
        if (!initial) {
          displayErrorMessages();
        }

        return initial = false;
      }); // Display validation errors while typing

      var getViewValue = function getViewValue() {
        var _formCtrl$fieldName2;

        return (_formCtrl$fieldName2 = formCtrl[fieldName]) === null || _formCtrl$fieldName2 === void 0 ? void 0 : _formCtrl$fieldName2.$viewValue;
      };

      scope.$watch(getViewValue, function () {
        if (field.$dirty) {
          return displayErrorMessages();
        }
      }); // Display validation errors when the form is submitted

      var isSubmitted = function isSubmitted() {
        return formCtrl.$submitted;
      };

      scope.$watch(isSubmitted, function (submitted) {
        if (submitted) {
          return displayErrorMessages();
        }
      }); // Display server side errors

      var getServerErrors = function getServerErrors() {
        var _formCtrl$$serverErro3;

        return (_formCtrl$$serverErro3 = formCtrl.$serverErrors) === null || _formCtrl$$serverErro3 === void 0 ? void 0 : _formCtrl$$serverErro3[fieldName];
      };

      return scope.$watch(getServerErrors, function (serverError) {
        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(serverError)) {
          return appendError(serverError, "server-error");
        } else {
          return element.find(".server-error").remove();
        }
      });
    }
  };
}]);
forms.directive("agServerValidationErrors", ["alerts", function (alerts) {
  return {
    restrict: "A",
    require: "^form",
    link: function link(scope, element, attrs, formCtrl) {
      formCtrl.$serverErrors = {}; //Display errors as alerts for those fields which are not in form

      var displayGlobalErrors = function displayGlobalErrors() {
        return function () {
          var result = [];

          for (var field in formCtrl.$serverErrors) {
            var message = formCtrl.$serverErrors[field];

            if (formCtrl[field]) {
              continue;
            } //If field is present in form, continue


            formCtrl.$serverErrors[field] = null; //Display error and remove it.

            result.push(alerts.error(message));
          }

          return result;
        }();
      }; // Hide server side validation errors while typing


      var getServerErrors = function getServerErrors() {
        return formCtrl.$serverErrors;
      };

      return scope.$watch(getServerErrors, function (serverErrors) {
        displayGlobalErrors(); // Iterate through all fields with server validation errors

        return angular__WEBPACK_IMPORTED_MODULE_4___default.a.forEach(serverErrors, function (_, field) {
          // Register change listener for those fields
          var unregister;

          var getViewValue = function getViewValue() {
            var _formCtrl$field4;

            return (_formCtrl$field4 = formCtrl[field]) === null || _formCtrl$field4 === void 0 ? void 0 : _formCtrl$field4.$viewValue;
          };

          return unregister = scope.$watch(getViewValue, function (oldVal, newVal) {
            var _formCtrl$field5;

            if (oldVal === newVal) {
              return;
            } // Remove server side error for the field when its value was changed


            (_formCtrl$field5 = formCtrl[field]) === null || _formCtrl$field5 === void 0 ? void 0 : _formCtrl$field5.$setValidity("server", true);
            formCtrl.$serverErrors[field] = null;
            return unregister();
          });
        });
      });
    }
  };
}]); // Handles server side errors

forms.factory("serverValidationErrorsHandler", ["$log", function ($log) {
  var setErrors = function setErrors(form, errors) {
    // cleanup previous errors
    form.$serverErrors = {}; // iterate through all server side validation errors

    return function () {
      var result = [];

      for (var field in errors) {
        // ..set errors on the nested form
        var message = errors[field];

        if (_typeof(message) === "object" && !lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(form[field])) {
          setErrors(form[field], message);
        } // ..set an error for the current form


        if (typeof message === "string") {
          var _form$field;

          (_form$field = form[field]) === null || _form$field === void 0 ? void 0 : _form$field.$setValidity("server", false);
          result.push(form.$serverErrors[field] = message);
        } else {
          result.push(undefined);
        }
      }

      return result;
    }();
  };

  return function (form, response, resourceName) {
    var _response$data, _response$data$errors;

    // skip when the response does not contain validation errors
    var errors = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$errors = _response$data.errors) === null || _response$data$errors === void 0 ? void 0 : _response$data$errors[resourceName];

    if (response.status !== 422 || lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(errors)) {
      $log.warn("Response does not contain validation errors", response);
      return;
    } // recursively set errors on the form


    return setErrors(form, errors);
  };
}]); //Automatically add asterisk to required fields.

var requiredDirective = [function () {
  return {
    restrict: "A",
    scope: false,
    link: function link(scope, element) {
      //console.log element.closest("label")
      return element.closest(".form-group").find(".control-label").addClass("required");
    }
  };
}];
forms.directive("required", requiredDirective);
forms.directive("ngRequired", requiredDirective);

/***/ }),

/***/ "NMY7":
/*!*****************************************!*\
  !*** ./examples/ag-demo-ui/src/app.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "NUOw":
/*!*********************************************************!*\
  !*** ./src/scripts/forms/services/MassUpdateHandler.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formsModule */ "O9c1");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var forms = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_2__["default"]); // Service for updating grid rows
// result should contain two arrays:
//   result.data - data for successfully updated rows
//   result.errors - assoc array for errors (id => errors)

forms.factory('MassUpdateHandler', ['$log', 'alerts', function ($log, alerts) {
  return function (grid, result) {
    var error, message;
    $log.info('[forms] Mass update response', result); // handle updated fields

    if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(result.data)) {
      for (var _i = 0, _Array$from = Array.from(result.data); _i < _Array$from.length; _i++) {
        var row = _Array$from[_i];
        grid.updateRow(row.id, row, false);
      }
    } else {
      $log.warn('[forms] Invalid JSON response, missing data array');
    } // handle fields with errors


    if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(result.errors)) {
      for (var id in result.errors) {
        error = result.errors[id];
        grid.flashOnError(id);
      } // make sure errors is an array instance


      if (result.errors instanceof Array) {
        if (result.errors.length === 0) {
          alerts.info('Mass update completed successfully');
          return;
        }

        for (var _i2 = 0, _Array$from2 = Array.from(result.errors); _i2 < _Array$from2.length; _i2++) {
          error = _Array$from2[_i2];
          message = ': ';

          for (var errorKey in error.errors) {
            // get failed instance (should be object)
            var errorValue = error.errors[errorKey];

            if (_typeof(errorValue) === 'object') {
              for (var msgKey in errorValue) {
                // error messages are strings
                var msgValue = errorValue[msgKey];

                if (typeof msgValue === 'string') {
                  // build message
                  var separator = message.length > 2 ? '\n' : '';
                  message = "".concat(message).concat(separator).concat(msgValue);
                }
              }
            }
          }

          alerts.error(message);
        }
      }
    } else {
      $log.warn('[forms] Invalid JSON response, missing errors assoc array');
      alerts.info('Mass update completed successfully');
    }

    if (result.message) {
      return alerts.error(result.message);
    }
  };
}]);

/***/ }),

/***/ "Nf61":
/*!*******************************************************!*\
  !*** ./src/scripts/resourceSupport/resourceModule.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-resource */ "3r+d");
/* harmony import */ var angular_resource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_resource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-route */ "STM2");
/* harmony import */ var angular_route__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular_route__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pathWithContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pathWithContext */ "qLk6");




var MOD_NAME = 'ag.resourceSupport';
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);
var resources = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(MOD_NAME, [angular_resource__WEBPACK_IMPORTED_MODULE_1___default.a, angular_route__WEBPACK_IMPORTED_MODULE_2___default.a, _pathWithContext__WEBPACK_IMPORTED_MODULE_3__["default"]]);
resources.constant('RestContext', ''); // Build a resource for the given restful url
// TODO cleanup and spec this service
// TODO consider move it to angle-grinder

resources.factory('resourceBuilder', ['$resource', 'pathWithContext', 'RestContext', function ($resource, pathWithContext, RestContext) {
  return function (basePath, _resourceName) {
    if (RestContext.length > 0) {
      basePath = '/api' + basePath;
    }

    if (!basePath) {}

    if (_resourceName == null) {
      _resourceName = basePath.replace(/^(\/+)/, '');
    }

    var pathWithoutContext = basePath;
    basePath = pathWithContext(basePath);
    var Resource = null;

    if (RestContext.length > 0) {
      Resource = $resource(basePath + '/:action/:id', {
        id: '@id'
      }, {
        list: {
          method: 'GET',
          params: {
            action: 'list'
          },
          isArray: false
        },
        get: {
          method: 'GET'
        },
        save: {
          method: 'POST'
        },
        update: {
          method: 'PUT'
        },
        delete: {
          method: 'DELETE'
        },
        // mass actions (for selected rows)
        massUpdate: {
          method: 'POST',
          params: {
            action: 'massUpdate'
          }
        },
        massDelete: {
          method: 'POST',
          params: {
            action: 'massDelete'
          }
        }
      });
    } else {
      Resource = $resource(basePath + '/:action/:id', {
        id: '@id'
      }, {
        list: {
          method: 'GET',
          params: {
            action: 'list'
          },
          isArray: false
        },
        get: {
          method: 'GET',
          params: {
            action: 'get'
          }
        },
        save: {
          method: 'POST',
          params: {
            action: 'save'
          }
        },
        update: {
          method: 'POST',
          params: {
            action: 'update'
          }
        },
        delete: {
          method: 'POST',
          params: {
            action: 'delete'
          }
        },
        // mass actions (for selected rows)
        massUpdate: {
          method: 'POST',
          params: {
            action: 'massUpdate'
          }
        },
        massDelete: {
          method: 'POST',
          params: {
            action: 'massDelete'
          }
        }
      });
    }

    angular__WEBPACK_IMPORTED_MODULE_0___default.a.extend(Resource.prototype, {
      resourceName: function resourceName() {
        return _resourceName;
      },
      resourcePath: function resourcePath() {
        return pathWithoutContext;
      },
      resourceData: function resourceData() {
        return angular__WEBPACK_IMPORTED_MODULE_0___default.a.fromJson(angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(this));
      },
      // Returns true if the record is persisted (has an id)
      persisted: function persisted() {
        return this.id != null;
      },
      // Return true if the record is not persisted
      newRecord: function newRecord() {
        return !this.persisted();
      },
      // Backbone style save() that inserts or updated the record
      // based on the presence of an id.
      save: function save(options) {
        if (options == null) {
          options = {};
        }

        var method;
        method = this.persisted() ? 'update' : 'save';
        return Resource[method]({}, this, options.success, options.error);
      },
      delete: function _delete(options) {
        if (options == null) {
          options = {};
        }

        return Resource.delete({}, this, options.success, options.error);
      }
    });
    return Resource;
  };
}]); // This module defines the resource mappings required by Angular JS to map to a
// standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.

resources.factory('Resource', ['$document', 'resourceBuilder', function ($document, resourceBuilder) {
  var $body = $document.find('body');
  var url = $($body).data('resource-path');
  var name = $($body).data('resource-name');
  return resourceBuilder(url, name);
}]); // Tries to load an user record with the given id taken from route params

resources.factory('resourceResolver', ['$q', '$route', 'Resource', function ($q, $route, Resource) {
  return function (id) {
    var deferred = $q.defer();

    var onSuccess = function onSuccess(user) {
      return deferred.resolve(user);
    };

    var onError = function onError() {
      return deferred.reject();
    };

    Resource.get({
      id: id
    }, onSuccess, onError);
    return deferred.promise;
  };
}]);

/***/ }),

/***/ "Npkl":
/*!*****************************************************************!*\
  !*** ./components/bootstrapx-clickover/bootstrapx-clickover.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ==========================================================
 * bootstrapx-clickover.js
 * https://github.com/lecar-red/bootstrapx-clickover
 * version: 1.0
 * ==========================================================
 *
 * Based on work from Twitter Bootstrap and
 * from Popover library http://twitter.github.com/bootstrap/javascript.html#popover
 * from the great guys at Twitter.
 *
 * Untested with 2.1.0 but should worked with 2.0.x
 *
 * ========================================================== */
!function ($) {
  "use strict";
  /* class definition */

  var Clickover = function Clickover(element, options) {
    // local init
    this.cinit('clickover', element, options);
  };

  Clickover.prototype = $.extend({}, $.fn.popover.Constructor.prototype, {
    constructor: Clickover,
    cinit: function cinit(type, element, options) {
      this.attr = {}; // choose random attrs instead of timestamp ones

      this.attr.me = (Math.random() * 10 + "").replace(/\D/g, '');
      this.attr.click_event_ns = "click." + this.attr.me + " touchstart." + this.attr.me;
      if (!options) options = {};
      options.trigger = 'manual'; // call parent

      this.init(type, element, options); // setup our own handlers

      this.$element.on('click', this.options.selector, $.proxy(this.clickery, this)); // soon add click hanlder to body to close this element
      // will need custom handler inside here
    },
    clickery: function clickery(e) {
      // clickery isn't only run by event handlers can be called by timeout or manually
      // only run our click handler and
      // need to stop progration or body click handler would fire right away
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      } // set popover's dim's


      this.options.width && this.tip().width(this.options.width);
      this.options.height && this.tip().height(this.options.height); // set popover's tip 'id' for greater control of rendering or css rules

      this.options.tip_id && this.tip().attr('id', this.options.tip_id); // add a custom class

      this.options.class_name && this.tip().addClass(this.options.class_name); // we could override this to provide show and hide hooks

      this[this.isShown() ? 'hide' : 'show'](); // if shown add global click closer

      if (this.isShown()) {
        var that = this; // close on global request, exclude clicks inside clickover

        this.options.global_close && $('body').on(this.attr.click_event_ns, function (e) {
          if (!that.tip().has(e.target).length) {
            that.clickery();
          }
        });
        this.options.esc_close && $(document).bind('keyup.clickery', function (e) {
          if (e.keyCode == 27) {
            that.clickery();
          }

          return;
        }); // first check for others that might be open
        // wanted to use 'click' but might accidently trigger other custom click handlers
        // on clickover elements

        !this.options.allow_multiple && $('[data-clickover-open=1]').each(function () {
          $(this).data('clickover') && $(this).data('clickover').clickery();
        }); // help us track elements w/ open clickovers using html5

        this.$element.attr('data-clickover-open', 1); // if element has close button then make that work, like to
        // add option close_selector

        this.tip().on('click', '[data-dismiss="clickover"]', $.proxy(this.clickery, this)); // trigger timeout hide

        if (this.options.auto_close && this.options.auto_close > 0) {
          this.attr.tid = setTimeout($.proxy(this.clickery, this), this.options.auto_close);
        } // provide callback hooks for post shown event


        typeof this.options.onShown == 'function' && this.options.onShown.call(this);
        this.$element.trigger('shown');
      } else {
        this.$element.removeAttr('data-clickover-open');
        this.options.esc_close && $(document).unbind('keyup.clickery');
        $('body').off(this.attr.click_event_ns);

        if (typeof this.attr.tid == "number") {
          clearTimeout(this.attr.tid);
          delete this.attr.tid;
        } // provide some callback hooks


        typeof this.options.onHidden == 'function' && this.options.onHidden.call(this);
        this.$element.trigger('hidden');
      }
    },
    isShown: function isShown() {
      return this.tip().hasClass('in');
    },
    resetPosition: function resetPosition() {
      var $tip, inside, pos, actualWidth, actualHeight, placement, tp;

      if (this.hasContent() && this.enabled) {
        $tip = this.tip();
        placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
        inside = /in/.test(placement);
        pos = this.getPosition(inside);
        actualWidth = $tip[0].offsetWidth;
        actualHeight = $tip[0].offsetHeight;

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {
              top: pos.top + pos.height,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            break;

          case 'top':
            tp = {
              top: pos.top - actualHeight,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            break;

          case 'left':
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left - actualWidth
            };
            break;

          case 'right':
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left + pos.width
            };
            break;
        }

        $tip.css(tp);
      }
    },
    debughide: function debughide() {
      var dt = new Date().toString();
      console.log(dt + ": clickover hide");
      this.hide();
    }
  });
  /* plugin definition */

  /* stolen from bootstrap tooltip.js */

  $.fn.clickover = function (option) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('clickover'),
          options = _typeof(option) == 'object' && option;
      if (!data) $this.data('clickover', data = new Clickover(this, options));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.clickover.Constructor = Clickover; // these defaults are passed directly to parent classes

  $.fn.clickover.defaults = $.extend({}, $.fn.popover.defaults, {
    trigger: 'manual',
    auto_close: 0,

    /* ms to auto close clickover, 0 means none */
    global_close: 1,

    /* allow close when clicked away from clickover */
    esc_close: 1,

    /* allow clickover to close when esc key is pressed */
    onShown: null,

    /* function to be run once clickover has been shown */
    onHidden: null,

    /* function to be run once clickover has been hidden */
    width: null,

    /* number is px (don't add px), null or 0 - don't set anything */
    height: null,

    /* number is px (don't add px), null or 0 - don't set anything */
    tip_id: null,

    /* id of popover container */
    class_name: 'clickover',

    /* default class name in addition to other classes */
    allow_multiple: 0
    /* enable to allow for multiple clickovers to be open at the same time */

  });
}(window.jQuery);

/***/ }),

/***/ "O9c1":
/*!******************************************!*\
  !*** ./src/scripts/forms/formsModule.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isFunction */ "lSCD");
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "QMGv");
/* harmony import */ var _select2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../select2 */ "Euip");
/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../alerts */ "97wk");
/* harmony import */ var _pathWithContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pathWithContext */ "qLk6");
/* harmony import */ var angular_xeditable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-xeditable */ "2qiw");
/* harmony import */ var angular_xeditable__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angular_xeditable__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-ui-bootstrap */ "+pEV");
/* harmony import */ var angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_7__);








var MOD_NAME = 'angleGrinder.forms';
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);
var forms = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(MOD_NAME, [angular_ui_bootstrap__WEBPACK_IMPORTED_MODULE_7___default.a, angular_xeditable__WEBPACK_IMPORTED_MODULE_6___default.a, _pathWithContext__WEBPACK_IMPORTED_MODULE_5__["default"], _common__WEBPACK_IMPORTED_MODULE_2__["default"], _select2__WEBPACK_IMPORTED_MODULE_3__["default"], _alerts__WEBPACK_IMPORTED_MODULE_4__["default"]]);
forms.run(['$templateCache', function ($templateCache) {
  // Override html template for the angular-ui/bootstrap pagination
  // to make it backward compatible with bootstrap 3.x
  $templateCache.put('template/pagination/pagination.html', "<ul class=\"pagination\">\n  <li ng-class=\"{disabled: noPrevious(), previous: align}\">\n    <a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a>\n  </li>\n\n  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\">\n    <a ng-click=\"selectPage(page.number)\">{{page.text}}</a>\n  </li>\n\n  <li ng-class=\"{disabled: noNext(), next: align}\">\n    <a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a>\n  </li>\n</ul>");
  return $templateCache.put('tooltip/tooltip.tpl.html', "<div class=\"tooltip in\" ng-show=\"title\">\n  <div class=\"tooltip-arrow\"></div>\n  <div class=\"tooltip-inner\" ng-bind=\"title\"></div>\n</div>");
}]);
forms.config(['$provide', function ($provide) {
  return (// Decorate select tags, wrap inside 'select-wrapper' so we can add dropdown arrow to standard html selects
    $provide.decorator('selectDirective', ['$delegate', function ($delegate) {
      var directive = $delegate[0];
      var link = directive.link;

      directive.compile = function (element, attrs) {
        return {
          pre: function pre(scope, element, attrs, ctrl) {
            if (lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default()(link.pre)) {
              return link.pre(scope, element, attrs, ctrl);
            }
          },
          post: function post(scope, element, attrs, ctrl) {
            // Add wrapper, if its not already wrapped and its not a select2-wrapper.
            if (!(element.parent().attr('class') === 'select-wrapper') && element.attr('ui-select2') === undefined) {
              var template = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element("<div class='select-wrapper'></div>");
              element.wrap(template);
            }

            if (lodash_isFunction__WEBPACK_IMPORTED_MODULE_0___default()(link.post)) {
              return link.post(scope, element, attrs, ctrl);
            }
          }
        };
      };

      return $delegate;
    }])
  );
}]); // TODO: refactor, can cause errors swallowing

forms.config(['$qProvider', function ($qProvider) {
  return $qProvider.errorOnUnhandledRejections(false);
}]);

/***/ }),

/***/ "P205":
/*!****************************************************!*\
  !*** ./src/scripts/common/directives/agSpinner.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commonModule */ "+MsD");


var spinner = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
/*
Use css to set the spinner animation image:
```
  li.spinner i.spin:before {
    content: url('/img/ajax-loader.gif')
  }
```
*/

spinner.directive('agSpinner', function () {
  return {
    replace: true,
    restrict: 'E',
    controller: ['$scope', 'pendingRequests', function ($scope, pendingRequests) {
      return $scope.showSpinner = function () {
        return pendingRequests.any();
      };
    }],
    template: "<li class=\"spinner\">\n  <a href=\"#\"><i ng-class=\"{spin: showSpinner()}\"></i></a>\n</li>"
  };
});

/***/ }),

/***/ "PGGC":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "QMGv":
/*!*************************************!*\
  !*** ./src/scripts/common/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonModule */ "+MsD");
/* harmony import */ var _agCurrencyFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agCurrencyFilter */ "CJbm");
/* harmony import */ var _agDateFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agDateFilter */ "mNvx");
/* harmony import */ var _agDateTimeFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agDateTimeFilter */ "pedN");
/* harmony import */ var _checkMarkFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkMarkFilter */ "Wiri");
/* harmony import */ var _newLinesFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./newLinesFilter */ "EHjO");
/* harmony import */ var _percentageFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./percentageFilter */ "fC4V");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services */ "jFYK");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directives */ "c96e");









/* harmony default export */ __webpack_exports__["default"] = (_commonModule__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "RGad":
/*!****************************************************!*\
  !*** ./src/scripts/gridz/services/GridLinkServ.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]);

var GridLinkServClass = function GridLinkServClass(pathWithContext, FlattenServ) {
  _classCallCheck(this, GridLinkServClass);

  var fn = function fn(path, name, idField, rowData) {
    if (rowData == null) {
      rowData = {};
    }

    if (!name) {
      return '';
    }

    var href = pathWithContext(path); // append id to the path (if given)

    if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(idField)) {
      var id = FlattenServ(rowData)[idField];

      if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(id)) {
        return '';
      }

      href += "#/".concat(id);
    }

    return "<a href=\"".concat(href, "\">").concat(name, "</a>");
  };

  return fn;
};

GridLinkServClass.$inject = ["pathWithContext", "FlattenServ"];
GridLinkServClass.$inject = ['pathWithContext', 'FlattenServ']; // Generic method for generating links inside jqGrid

gridz.service('GridLinkServ', GridLinkServClass);

/***/ }),

/***/ "RNd7":
/*!********************************************************!*\
  !*** ./src/scripts/forms/directives/agDeleteButton.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var forms = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Double check delete button
// usage:
//   <ag-delete-button when-confirmed="delete(record)"></ag-delete-button>
//
//   `when-confirmed` function to call when the action was confirmed

forms.directive("agDeleteButton", function () {
  return {
    restrict: "E",
    replace: true,
    scope: {
      whenConfirmed: "&"
    },
    controller: ["$scope", function ($scope) {
      $scope.confirmation = false;

      $scope.showConfirmation = function () {
        return $scope.confirmation = true;
      };

      return $scope.doDelete = function () {
        $scope.confirmation = false; // on the second click perform the given action

        var promise = $scope.whenConfirmed(); // disable / enable the button

        $scope.deleting = true;
        return typeof (promise === null || promise === void 0 ? void 0 : promise.finally) === 'function' ? promise === null || promise === void 0 ? void 0 : promise.finally(function () {
          return $scope.deleting = false;
        }) : undefined;
      };
    }],
    template: "<button type=\"button\"\n        class=\"btn ag-delete-button\"\n        ng-class=\"{ true: 'btn-warning', false: 'btn-danger' }[confirmation]\"\n        ng-disabled=\"deleting\"\n        ng-mouseleave=\"confirmation = false\"\n        ng-click=\"confirmation ? doDelete() : showConfirmation()\">\n  <i class=\"fa fa-trash-o\"></i>\n\n  <ng-switch on=\"confirmation\">\n    <span ng-switch-default>Delete</span>\n    <span ng-switch-when=\"true\">Are you sure?</span>\n  </ng-switch>\n\n  <span ng-if=\"deleting\">...</span>\n</button>"
  };
});

/***/ }),

/***/ "RcSf":
/*!***********************************************************!*\
  !*** ./src/scripts/gridz/directives/agGridPlaceholder.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
gridz.constant('rootPath', '/'); // Show the grid (or other content) when the current route
// points to the root page of the given section.

gridz.directive('agGridPlaceholder', ['$log', '$parse', 'pathWithContext', 'rootPath', function ($log, $parse, pathWithContext, rootPath) {
  return {
    restrict: 'E',
    scope: true,
    link: function link(scope, element, attrs) {
      scope.templateSrc = pathWithContext(attrs.src); // initially do not render the grid

      scope.renderGrid = false; // ability to force the grid rendering

      if (attrs.forceRenderGrid) {
        scope.renderGrid = $parse(attrs.forceRenderGrid)(scope);
      } // initially hide the grid


      scope.showGrid = false; // show / hide the grid on route change

      return scope.$on('$routeChangeSuccess', function (event, currentRoute) {
        var currentPath = currentRoute.originalPath;
        var show = currentPath === rootPath || currentPath === ''; // render the grid only once

        if (show) {
          scope.renderGrid = show;
        } // show/hide the grid


        scope.showGrid = show;
        var msg = show ? 'show grid' : 'hide grid';
        return $log.debug('[agGrid]', msg, currentRoute);
      });
    },
    template: "<div ng-if=\"renderGrid\">\n  <ng-include src=\"templateSrc\" ng-show=\"showGrid\"></ng-include>\n</div>"
  };
}]);

/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-SG": "zavE",
	"./en-SG.js": "zavE",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "Shj7":
/*!*****************************************************!*\
  !*** ./src/scripts/gridz/directives/agNewButton.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
gridz.directive('agNewButton', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var text = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element($compile('<i class="fa fa-plus" uib-tooltip="Create new"></i> ')(scope));
      return element.append(text);
    }
  };
}]);

/***/ }),

/***/ "TLok":
/*!****************************************************!*\
  !*** ./src/scripts/forms/directives/agMaxLines.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");
/* harmony import */ var _utils_isFalsy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/isFalsy */ "X8nh");



var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Validates text area to have not more then specified number of lines

app.directive('agMaxLines', ['$parse', function ($parse) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function link(scope, elem, attrs, ngModelCtrl) {
      var validator = function validator(value) {
        value = value ? value.trim() : value; // Takes value of `attrs.agMaxLines` and looks for this name in scope and takes value of this property

        var maxLines = $parse(attrs.agMaxLines)(scope);
        var numLines = (value || '').split('\n').length;
        var valid = Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_2__["isFalsy"])(maxLines) || numLines <= maxLines;
        ngModelCtrl.$setValidity('maxlines', valid);

        if (valid) {
          return value;
        } else {
          return undefined;
        }
      };

      ngModelCtrl.$parsers.unshift(validator);
      ngModelCtrl.$formatters.push(validator);
      return scope.$watch(attrs.agMaxLines, function () {
        return validator(ngModelCtrl.$viewValue);
      });
    }
  };
}]);

/***/ }),

/***/ "Tqsq":
/*!***********************************************************!*\
  !*** ./src/scripts/gridz/services/ApplyFormattersServ.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");




var gridz = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_3__["default"]); // Iterates through all columns and replaces formatters placeholders
// with the corresponding methods.

gridz.value('ApplyFormattersServ', function (colModel, formatters) {
  if (formatters == null) {
    formatters = {};
  }

  return lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(colModel, function (column) {
    if (!angular__WEBPACK_IMPORTED_MODULE_2___default.a.isString(column.formatter)) {
      return;
    }

    var formatter = formatters[column.formatter];

    if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(formatter)) {
      return column.formatter = formatter;
    }
  });
});

/***/ }),

/***/ "UH7L":
/*!****************************************************!*\
  !*** ./node_modules/free-jqgrid/css/ui.jqgrid.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "UZTw":
/*!*********************************************************!*\
  !*** ./src/scripts/gridz/directives/agGridXlsExport.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Generates xls export button for the given grid.
// Usage:
//   <a href="" ag-grid-xls-export="usersGrid">
//     <i class="fa fa-download"></i> Export to XLS
//   </a>
//   If nothing is specified table icon will be added
//   <a href="" ag-grid-xls-export="usersGrid"></a>

gridz.directive('agGridXlsExport', ['$window', 'NotificationDialogServ', '$compile', function ($window, NotificationDialogServ, $compile) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      // Add table symbol if no child is specified
      if (!element[0].firstChild) {
        var exp = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element($compile('<i class="fa fa-table" uib-tooltip="Export to Excel"></i>')(scope));
        element.append(exp);
      }

      return element.on('click', function (event) {
        event.preventDefault();
        var grid = scope.$grid;

        if (grid.getSelectedRowIds().length !== 0) {
          // if browser is IE then open new window and show SaveAs dialog, else use dataUri approach
          if ($window.navigator.userAgent.indexOf('MSIE ') > 0 || !!$window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
            var iframe = document.createElement('IFRAME');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe = iframe.contentWindow || iframe.contentDocument;
            var csvData = 'sep=|\r\n' + grid.getCsvData();
            iframe.document.open('text/html', 'replace');
            iframe.document.write(csvData);
            iframe.document.close();
            iframe.focus();
            return iframe.document.execCommand('SaveAs', true, 'download.csv');
          } else {
            var dataUri = grid.getXlsDataUri();
            var link = document.createElement('a');
            link.href = dataUri;
            link.setAttribute('download', 'download.xls');
            document.body.appendChild(link);
            var click_ev = document.createEvent('MouseEvents'); // initialize the event

            click_ev.initEvent('click', true, true); // trigger the event

            return link.dispatchEvent(click_ev);
          }
        } else {
          return NotificationDialogServ.open('Please select at least one row.');
        }
      });
    }
  };
}]);

/***/ }),

/***/ "VP9g":
/*!*************************************************!*\
  !*** ./examples/ag-demo-ui/src/org/listCtrl.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListCtrl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* @ngInject */
var ListCtrl =
/*#__PURE__*/
function () {
  function ListCtrl($scope, Resource, SinglePageCrudCtrlMixin, MassUpdateMixin, pathWithContext) {
    _classCallCheck(this, ListCtrl);

    $scope.gridOptions = {
      url: pathWithContext("/org/list?format=json"),
      colModel: this.colModel(),
      multiselect: true,
      shrinkToFit: true,
      // makes columns fit to width
      sortname: "num",
      sortorder: "asc",
      rowNum: 5,
      rowList: [5, 10, 20]
    };
    SinglePageCrudCtrlMixin($scope, {
      Resource: Resource,
      resourcePath: "/org",
      gridName: "orgGrid"
    });
    MassUpdateMixin($scope, {
      templateUrl: "/templates/org/massUpdateForm.html",
      controller: "org.MassUpdateFormCtrl",
      gridName: "orgGrid"
    });
  }

  _createClass(ListCtrl, [{
    key: "colModel",
    value: function colModel() {
      var showActionLink = function showActionLink(cellVal, options, rowdata) {
        return "<a href=\"#/".concat(rowdata.id, "\">").concat(cellVal, "</a>");
      };

      var showLink = function showLink(cellVal, options, rowdata) {
        var content = "<a href=\"#/".concat(rowdata.id, "\">").concat(cellVal, "</a>");
        return window.columnAligner("link", content);
      };

      return [{
        name: "id",
        label: "ID",
        width: 30,
        fixed: true,
        formatter: showActionLink
      }, {
        name: "name",
        label: "Name (right aligned)",
        width: 150,
        fixed: true,
        formatter: showLink
      }, {
        name: "name",
        label: "Name",
        width: 100,
        fixed: true,
        formatter: showActionLink
      }, {
        name: "num",
        label: "Num",
        width: 70
      }, {
        name: "addressDate",
        label: "Address date",
        width: 100
      }, {
        name: "timeZone",
        label: "Time Zone",
        width: 100
      }];
    }
  }]);

  return ListCtrl;
}();

ListCtrl.$inject = ["$scope", "Resource", "SinglePageCrudCtrlMixin", "MassUpdateMixin", "pathWithContext"];


/***/ }),

/***/ "VejM":
/*!*********************************************************!*\
  !*** ./src/scripts/common/directives/addEmptyOption.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "J2m7");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../commonModule */ "+MsD");




angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_3__["default"]).directive('addEmptyOption', function () {
  return {
    restrict: 'A',
    scope: {
      addEmptyOption: '='
    },
    link: function link(scope, element, attrs) {
      var emptyOption = !lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default()(attrs.emptyOption) ? JSON.parse(attrs.emptyOption.replace(/[']/g, '"')) : {
        id: '',
        name: ''
      };
      element.prepend(angular__WEBPACK_IMPORTED_MODULE_2___default.a.element("<option value=''>".concat(emptyOption.name, "</option>")));

      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_1___default()(scope.addEmptyOption) && scope.addEmptyOption.length > 0) {
        if (!lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(scope.addEmptyOption, {
          id: emptyOption.id
        })) {
          return scope.addEmptyOption.unshift(emptyOption);
        }
      }
    }
  };
});

/***/ }),

/***/ "VvvX":
/*!******************************************************************!*\
  !*** ./node_modules/select2-bootstrap-css/select2-bootstrap.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "Wiri":
/*!***********************************************!*\
  !*** ./src/scripts/common/checkMarkFilter.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonModule */ "+MsD");

 // Filter for boolean values, presents '✓' or '✘'

angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).filter('checkMark', function () {
  return function (input, options) {
    if (options == null) {
      options = {};
    }

    if (input) {
      if (options.hideTruth) {
        return '';
      }

      return "\u2713";
    } else {
      if (options.hideFalse) {
        return '';
      }

      return "\u2718";
    }
  };
});

/***/ }),

/***/ "X8nh":
/*!**************************************!*\
  !*** ./src/scripts/utils/isFalsy.js ***!
  \**************************************/
/*! exports provided: isEmpty, isFalsy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFalsy", function() { return isFalsy; });
/* harmony import */ var lodash_isNaN__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNaN */ "GODc");
/* harmony import */ var lodash_isNaN__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNaN__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "E+oP");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isString */ "4qC0");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_3__);




// uses babel plugin to only use what is referenced
function isEmpty(str) {
  return lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default()(str) || lodash_isString__WEBPACK_IMPORTED_MODULE_2___default()(str) && lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(str);
}
function isFalsy(value) {
  if (lodash_isNaN__WEBPACK_IMPORTED_MODULE_0___default()(value)) {
    return true;
  }

  if (lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default()(value)) {
    return true;
  }

  if (lodash_isString__WEBPACK_IMPORTED_MODULE_2___default()(value) && lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(value)) {
    return true;
  }

  if (value === false) {
    return true;
  }

  return false;
}

/***/ }),

/***/ "Xau7":
/*!***********************************************!*\
  !*** ./src/scripts/select2/Select2Options.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _agSelect2Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agSelect2Module */ "v3nq");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_agSelect2Module__WEBPACK_IMPORTED_MODULE_1__["default"]);

var Select2OptionsClass = function Select2OptionsClass() {
  _classCallCheck(this, Select2OptionsClass);

  return function (options, dataOptions) {
    if (options == null) {
      options = {};
    }

    if (dataOptions == null) {
      dataOptions = {};
    }

    if (!options.ajax) {
      options.ajax = {};
    } // build default options


    var defaults = {
      width: 'element',
      initSelection: angular__WEBPACK_IMPORTED_MODULE_0___default.a.noop,
      ajax: {
        dataType: 'json',
        url: angular__WEBPACK_IMPORTED_MODULE_0___default.a.noop,
        // dummy url, must be overridden
        data: function data(term, page) {
          if (page == null) {
            page = 1;
          }

          var dataDefaults = {
            // search term (query params)
            q: term,
            // sorting and pagination
            sort: 'id',
            order: 'asc',
            max: 20,
            page: page
          };
          return angular__WEBPACK_IMPORTED_MODULE_0___default.a.extend(dataDefaults, dataOptions);
        },
        results: function results(result, page) {
          return {
            results: result.rows,
            more: page < result.total
          };
        }
      },
      // formatters for result and selection
      formatResult: function formatResult(record) {
        return record.name;
      },
      formatSelection: function formatSelection(record) {
        return record.name;
      }
    };
    var ajax = angular__WEBPACK_IMPORTED_MODULE_0___default.a.extend(defaults.ajax, options.ajax);
    options = angular__WEBPACK_IMPORTED_MODULE_0___default.a.extend(defaults, options);
    options.ajax = ajax;
    return options;
  };
};

app.service('Select2Options', Select2OptionsClass);

/***/ }),

/***/ "YkKV":
/*!***************************************!*\
  !*** ./src/scripts/utils/deepDiff.js ***!
  \***************************************/
/*! exports provided: deepDiff, deepPick, getDeep, setDeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepDiff", function() { return deepDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepPick", function() { return deepPick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeep", function() { return getDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeep", function() { return setDeep; });
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "GoyQ");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEqual */ "Y+p1");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/forEach */ "bNQv");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_3__);




// babel plugin will only use what is referenced
function deepDiff(oldVal, newVal, allowed, reqFields) {
  var diffRecursive = function diffRecursive(oldVal, newVal, allowed, reqFields) {
    var args;
    var diff = {};

    if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default()(reqFields) && reqFields.length > 0) {
      args = [];
      args.push(newVal);
      args = args.concat(reqFields);
      diff = deepPick.apply(this, args);
    }

    if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default()(allowed) && allowed.length > 0) {
      args = [];
      args.push(newVal);
      args = args.concat(allowed);
      newVal = deepPick.apply(this, args);
    }

    lodash_forEach__WEBPACK_IMPORTED_MODULE_2___default()(newVal, function (v, k) {
      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_3___default()(oldVal) && lodash_isEqual__WEBPACK_IMPORTED_MODULE_1___default()(v, oldVal[k]) || k === '$cachedData') {
        return;
      }

      return diff[k] = lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(v) ? diffRecursive(oldVal[k], v) : newVal[k];
    });

    return diff;
  };

  if (allowed == null) {
    allowed = [];
  }

  if (reqFields == null) {
    reqFields = [];
  }

  return diffRecursive(oldVal, newVal, allowed, reqFields);
}
function deepPick(obj) {
  var result = new Object();

  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _Array$from = Array.from(keys); _i < _Array$from.length; _i++) {
    var path = _Array$from[_i];
    var value = getDeep(obj, path);

    if (value !== undefined) {
      setDeep(result, path, value);
    }
  }

  return result;
} // get the value of a nested property

function getDeep(obj, path) {
  var keys = path.split('.');

  for (var _i2 = 0, _Array$from2 = Array.from(keys); _i2 < _Array$from2.length; _i2++) {
    var key = _Array$from2[_i2];
    obj = obj[key];

    if (obj === undefined) {
      return;
    }
  }

  return obj;
} // set the value of a nested property

function setDeep(obj, path, value) {
  var keys = path.split('.');
  var i = 0;
  var n = keys.length;
  n--;

  while (i < n) {
    var key = keys[i++];
    obj = obj[key] = lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(obj[key]) ? obj[key] : {};
  }

  return obj[keys[i]] = value;
}

/***/ }),

/***/ "Z/dz":
/*!*************************************************!*\
  !*** ./src/scripts/gridz/gridPagerCtrlMixin.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gridzModule */ "LyZ+");


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
gridz.controller('gridPagerCtrlMixin', ['$log', '$scope', '$parse', '$location', '$q', 'gridName', 'currentId', 'path', function ($log, $scope, $parse, $location, $q, gridName, currentId, path) {
  var currIdGetter = $parse(currentId);
  var currIdSetter = currIdGetter.assign; // watch for the current id changes

  $scope.$watch(currentId, function (id, oldId) {
    if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(id)) {
      return;
    }

    if (id === oldId) {
      return;
    }

    return $location.path(path.replace(':id', id));
  }); // retrieve the grid

  var getGrid = function getGrid() {
    return $parse(gridName)($scope);
  }; // retrieve row ids on the current grid view


  var getGridIds = function getGridIds() {
    return getGrid().getIds();
  }; // load the previous page and yields row ids


  var prevGridPage = function prevGridPage() {
    var deferred = $q.defer();
    var promise = getGrid().prevPage();
    promise.then(function () {
      var ids = getGridIds();
      $log.debug('[agGrid] previous page was loaded', ids);
      return deferred.resolve(ids);
    });
    return deferred.promise;
  }; // load the next page and yields new ids


  var nextGridPage = function nextGridPage() {
    var deferred = $q.defer();
    var promise = getGrid().nextPage();
    promise.then(function () {
      var ids = getGridIds();
      $log.debug('[agGrid] next page was loaded', ids);
      return deferred.resolve(ids);
    });
    return deferred.promise;
  }; // get the current state


  var getCurrent = function getCurrent() {
    var ids = getGridIds();
    return [ids, ids.indexOf(currIdGetter($scope).toString())];
  };

  this.goTo = function (index) {
    // console.log(index)
    var _Array$from = Array.from(getCurrent()),
        _Array$from2 = _slicedToArray(_Array$from, 2),
        ids = _Array$from2[0],
        indx = _Array$from2[1];

    return currIdSetter($scope, ids[index]);
  };

  this.getIndex = function () {
    var ids = getGridIds();
    return ids.indexOf(currIdGetter($scope).toString());
  };

  this.getIds = function () {
    return getGridIds();
  }; // return true when a grid in the background is loaded
  // and the pager can be displayed


  this.show = function () {
    return !lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(getGrid());
  }; // return true when the current row is not the first one


  this.hasPrevRow = function () {
    var _Array$from3 = Array.from(getCurrent()),
        _Array$from4 = _slicedToArray(_Array$from3, 2),
        ids = _Array$from4[0],
        indx = _Array$from4[1];

    if (!getGrid().isFirstPage()) {
      return true;
    }

    return indx !== 0;
  }; // return true when the current row is not the last one


  this.hasNextRow = function () {
    var _Array$from5 = Array.from(getCurrent()),
        _Array$from6 = _slicedToArray(_Array$from5, 2),
        ids = _Array$from6[0],
        indx = _Array$from6[1];

    if (!getGrid().isLastPage()) {
      return true;
    }

    return indx !== ids.length - 1;
  }; // navigates to the previous row


  this.prevRow = function () {
    var _Array$from7 = Array.from(getCurrent()),
        _Array$from8 = _slicedToArray(_Array$from7, 2),
        ids = _Array$from8[0],
        indx = _Array$from8[1];

    if (indx > 0) {
      // get the previous id from the cached array of row ids
      return currIdSetter($scope, ids[indx - 1]);
    } else {
      // load the previos page and get the last id
      return prevGridPage().then(function (ids) {
        return currIdSetter($scope, ids[ids.length - 1]);
      });
    }
  }; // navigates to the next row


  this.nextRow = function () {
    var _Array$from9 = Array.from(getCurrent()),
        _Array$from10 = _slicedToArray(_Array$from9, 2),
        ids = _Array$from10[0],
        indx = _Array$from10[1];

    if (indx < ids.length - 1) {
      // get the next id from the cached array of row ids
      return currIdSetter($scope, ids[indx + 1]);
    } else {
      // load the next page and get the first id
      return nextGridPage().then(function (ids) {
        return currIdSetter($scope, ids[0]);
      });
    }
  };

  return this;
}]);

/***/ }),

/***/ "a16Y":
/*!**********************************************************!*\
  !*** ./src/scripts/gridz/services/ActionPopupHandler.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
gridz.factory('ActionPopupHandler', ['$log', function ($log) {
  return function (gridEl, scope, attrs) {
    // handles an action from the `actionPopup` menu
    var handleAction = function handleAction(action, id) {
      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(scope[action])) {
        $log.info("Trigger '".concat(action, "' for row '").concat(id, "'"));
        return scope.$apply(function () {
          return scope[action](id);
        });
      } else {
        return $log.warn("`$scope.".concat(action, "` is not defined"));
      }
    }; // handles click on show action inside the dropdown menu


    gridEl.on('showAction', function (event, id) {
      event.preventDefault();
      var action = attrs.showAction ? attrs.showAction : 'showRecord';
      return handleAction(action, id);
    }); // handles click on edit action inside the dropdown menu

    gridEl.on('editAction', function (event, id) {
      event.preventDefault();
      var action = attrs.editAction ? attrs.editAction : 'editRecord';
      return handleAction(action, id);
    }); // handles click on delete action inside the dropdown menu

    gridEl.on('deleteAction', function (event, id) {
      event.preventDefault();
      var action = attrs.deleteAction ? attrs.deleteAction : 'deleteRecord';
      return handleAction(action, id);
    }); // handles click on massUpdate action inside the dropdown menu

    gridEl.on('massUpdateAction', function (event) {
      event.preventDefault();
      var action = attrs.massUpdateAction ? attrs.massUpdateAction : 'massUpdate';
      return handleAction(action);
    }); // handles click on the cell with `editActionLink` formatter

    return gridEl.on('click', 'a.editActionLink', function (event) {
      event.preventDefault();
      var id = $(this).parents('tr:first').attr('id');
      var action = attrs.editAction ? attrs.editAction : 'editRecord';
      return handleAction(action, id);
    });
  };
}]);

/***/ }),

/***/ "aGkd":
/*!************************************************!*\
  !*** ./src/scripts/forms/directives/agBind.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");

 // Enhanced bind directive with default value
// Should be used with xeditable fields to show data in the view mode

angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]).directive('agBind', function () {
  return {
    restrict: 'A',
    controller: function controller() {
      this.showValue = function (value) {
        return angular__WEBPACK_IMPORTED_MODULE_0___default.a.isNumber(value) || !!value;
      };

      return this;
    },
    compile: function compile(element) {
      // grab the default value from the initial content
      var defaultValue = element.html() || '&nbsp;';
      return function (scope, element, attrs, ctrl) {
        return scope.$watch(attrs.agBind, function (value) {
          var txt = ctrl.showValue(value) ? value : defaultValue;
          return element.html(txt);
        });
      };
    }
  };
});

/***/ }),

/***/ "bQHU":
/*!***************************************************************!*\
  !*** ./src/scripts/common/services/NotificationDialogServ.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/BaseCtrl */ "MhVr");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../commonModule */ "+MsD");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var app = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_2__["default"]);

var NotificationDialogCtrl =
/*#__PURE__*/
function (_BaseCtrl) {
  _inherits(NotificationDialogCtrl, _BaseCtrl);

  function NotificationDialogCtrl() {
    _classCallCheck(this, NotificationDialogCtrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotificationDialogCtrl).apply(this, arguments));
  }

  _createClass(NotificationDialogCtrl, [{
    key: "initialize",
    value: function initialize() {
      return this.expose(this.$scope, 'options', 'close');
    }
  }, {
    key: "close",
    value: function close() {
      return this.$log.info('Closing notification dialog');
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.register(app, 'NotificationDialogCtrl');
      this.inject();
    }
  }, {
    key: "register",
    value: function register(app, name) {
      _get(_getPrototypeOf(NotificationDialogCtrl), "register", this).call(this, app, name);
    }
  }, {
    key: "inject",
    value: function inject() {
      _get(_getPrototypeOf(NotificationDialogCtrl), "inject", this).call(this, '$scope', '$log', 'options');
    }
  }]);

  return NotificationDialogCtrl;
}(_utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_0__["default"]);

NotificationDialogCtrl.initClass();

var NotificationDialogServ =
/*#__PURE__*/
function () {
  NotificationDialogServ.$inject = ["$log", "$q"];

  function NotificationDialogServ($log, $q) {
    _classCallCheck(this, NotificationDialogServ);

    this.$log = $log;
    this.$q = $q;
  }

  _createClass(NotificationDialogServ, [{
    key: "open",
    value: function open(options) {
      if (angular__WEBPACK_IMPORTED_MODULE_1___default.a.isString(options)) {
        options = {
          message: options
        };
      }

      if (options.okLabel == null) {
        options.okLabel = 'Ok';
      }

      this.$log.info('Opening notification dialog, message:', options.message);

      var _defer = this.$q.defer();

      swal({
        title: options.message,
        allowEscapeKey: false,
        confirmButtonText: options.okLabel
      }, function () {
        return _defer.resolve({
          defer: function defer() {
            return _defer;
          }
        });
      });
      return _defer.promise;
    }
  }]);

  return NotificationDialogServ;
}();

NotificationDialogServ.$inject = ['$log', '$q'];
app.service('NotificationDialogServ', NotificationDialogServ);

/***/ }),

/***/ "bXk/":
/*!**************************************************!*\
  !*** ./src/scripts/forms/directives/agPanels.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_every__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/every */ "Jlc5");
/* harmony import */ var lodash_every__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_every__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_max__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/max */ "q92V");
/* harmony import */ var lodash_max__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_max__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../formsModule */ "O9c1");





var forms = angular__WEBPACK_IMPORTED_MODULE_3___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_4__["default"]);
forms.value("getRealPanelHeight", function (el) {
  var bodyEl = el.find(".panel-body:visible");
  var oldHeight = $(bodyEl).height();
  bodyEl.css("min-height", "auto");
  var height = $(el).height(); // Do not equalize if element collapsed

  if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(bodyEl).attr("collapsed")) {
    bodyEl.css("min-height", 0);
  } else {
    var _bodyEl$, _bodyEl$$attributes;

    if (!(bodyEl === null || bodyEl === void 0 ? void 0 : (_bodyEl$ = bodyEl[0]) === null || _bodyEl$ === void 0 ? void 0 : (_bodyEl$$attributes = _bodyEl$.attributes) === null || _bodyEl$$attributes === void 0 ? void 0 : _bodyEl$$attributes['min-height'])) {
      bodyEl.css("min-height", oldHeight);
    }
  } // Remove padding between grid header and body


  if (el.find("[ag-grid]").length > 0) {
    el.find(".panel-heading").css("padding-bottom", "0px");
    bodyEl.css("padding-top", "0px");
  }

  return height;
});
forms.directive("agPanelsRow", ["getRealPanelHeight", function (getHeight) {
  return {
    restrict: "C",
    controller: function controller() {
      this.panels = [];

      this.registerPanel = function (el) {
        return this.panels.push($(el));
      };

      this.maxHeight = function () {
        var highest = lodash_max__WEBPACK_IMPORTED_MODULE_2___default()(this.panels, function (el) {
          return getHeight(el);
        });

        return getHeight(highest);
      }; // returns true when all panels are equalized


      this.allEqual = function () {
        var heights = lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(this.panels, function (el) {
          return getHeight(el);
        }); //_.chain(this.panels).map(el => getHeight(el)).value()


        return lodash_every__WEBPACK_IMPORTED_MODULE_0___default()(heights, function (height) {
          return height === heights[0];
        });
      };

      this.equalize = function () {
        if (this.allEqual()) {
          return;
        }

        var maxHeight = this.maxHeight();
        return angular__WEBPACK_IMPORTED_MODULE_3___default.a.forEach(this.panels, function (el) {
          var bodyEl = el.find(".panel-body"); // default padding

          var paddings = parseInt(bodyEl.css("padding-top")) + parseInt(bodyEl.css("padding-bottom")); // add heading and footer

          paddings += el.find(".panel-heading").outerHeight();
          paddings += el.find(".panel-footer").outerHeight();
          return bodyEl.css("min-height", maxHeight - paddings);
        });
      };

      return this;
    }
  };
}]);
forms.directive("agPanel", ["getRealPanelHeight", function (getHeight) {
  return {
    restrict: "C",
    require: "^agPanelsRow",
    link: function link(scope, element, attrs, ctrl) {
      // add the current panel to the stack
      ctrl.registerPanel(element);

      var elementHeight = function elementHeight() {
        return getHeight(element);
      };

      return scope.$watch(elementHeight, function () {
        return ctrl.equalize();
      });
    }
  };
}]); //
// To mark element(s) in panel that needs to be displayed when panel collapsing
// just add 'stay-on-collapse' attribute. Example:
//
// <form>
//   <div stay-on-collapse>...</div> <!-- this 'div' will be displayed when panel collapsed top -->
//   <div>...</div>
// </form>
//

forms.directive("agPanelStates", ["$compile", function ($compile) {
  return {
    restrict: "E",
    transclude: true,
    controller: ["$scope", function ($scope) {
      var _removeElements;

      $scope.changeState = function (event) {
        var stateButton = getAgPanel(event).find('[name="agPanelStates"]').find('[name="stateButton"]');

        if ($scope.state === "collapsed") {
          $scope.state = "normal";
          stateButton.find("i").prop("class", "fa fa-minus");
        } else {
          $scope.state = "collapsed";
          stateButton.find("i").prop("class", "fa fa-plus");
        }

        var element = getAgPanel(event);

        if (isGrid(element)) {
          collapseGrid(element);
        } else {
          collapseForm(element);
        }

        return true;
      };

      $scope.fullscreenState = function (event) {
        var panelModal = "<panel-modal></panel-modal>";
        angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(getAgPanel(event)).wrap(panelModal);
        $compile(panelModal)($scope);
        return true;
      }; // Gets the closest ag-panel


      var getAgPanel = function getAgPanel(event) {
        return angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(event.target).closest(".ag-panel");
      }; // Finds out if element is a grid


      var isGrid = function isGrid(element) {
        return angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find("table.gridz").length > 0;
      }; // Method for collapsing a grid


      var collapseGrid = function collapseGrid(element) {
        var row;
        var gridEl = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find("table.gridz");

        if ($scope.state === "collapsed") {
          var tBody = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(gridEl).find("tbody");

          if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(tBody).find(".ui-state-highlight").length > 0) {
            for (var _i = 0, _Array$from = Array.from(angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(gridEl).find("tbody").children()); _i < _Array$from.length; _i++) {
              row = _Array$from[_i];

              if (!angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).hasClass("ui-state-highlight") && !angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).hasClass("jqgfirstrow")) {
                angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).addClass("ng-hide");
              }
            }
          } else {
            $scope.gridRowNum = gridEl.jqGrid("getGridParam", "rowNum");
            gridEl.jqGrid("setGridParam", {
              rowNum: 1
            }).trigger("reloadGrid", [{
              page: 1
            }]);
          }

          angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find(".gridz-pager").addClass("ng-hide");
        }

        if ($scope.state === "normal") {
          if ($scope.gridRowNum) {
            gridEl.jqGrid("setGridParam", {
              rowNum: $scope.gridRowNum
            }).trigger("reloadGrid", [{
              page: 1
            }]);
          } else {
            for (var _i2 = 0, _Array$from2 = Array.from(angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(gridEl).find("tbody").children()); _i2 < _Array$from2.length; _i2++) {
              row = _Array$from2[_i2];

              if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).hasClass("ng-hide")) {
                angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).removeClass("ng-hide");
              }

              if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).hasClass("ui-state-highlight")) {
                angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(row).addClass("ui-state-highlight");
              }
            }
          }

          angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find(".gridz-pager").removeClass("ng-hide");
        }
      }; // Method for collapsing form


      var collapseForm = function collapseForm(element) {
        var panelBody = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find(".panel-body");

        if ($scope.state === "collapsed") {
          var clone = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(panelBody).clone();
          angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(panelBody).addClass("ng-hide");
          angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(panelBody).after(clone);

          _removeElements(clone);

          if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(clone).children().length === 0) {
            angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(clone).remove();
          }

          angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(clone).attr("collapsed", "true");
        }

        if ($scope.state === "normal") {
          for (var _i3 = 0, _Array$from3 = Array.from(panelBody); _i3 < _Array$from3.length; _i3++) {
            var el = _Array$from3[_i3];

            if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(el).hasClass("ng-hide")) {
              angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(el).removeClass("ng-hide");
            } else {
              angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(el).remove();
            }
          }
        }
      }; // Goes through the DOM element and hides all nodes without 'stay-on-collapse' attribute
      // Saves origin element structure


      return _removeElements = function removeElements(panelBody) {
        var children = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(panelBody).children();
        var hasElementToStay = false;

        for (var _i4 = 0, _Array$from4 = Array.from(children); _i4 < _Array$from4.length; _i4++) {
          var child = _Array$from4[_i4];

          if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(child).is("[stay-on-collapse]")) {
            hasElementToStay = true;
          } else if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(child).children().length > 0) {
            if (!_removeElements(child)) {
              angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(child).remove();
            } else {
              hasElementToStay = true;
            }
          } else {
            angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(child).remove();
          }
        }

        return hasElementToStay;
      };
    }],
    link: function link(scope, element, attrs, ctrl, transcludeFn) {
      var buttonList = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element($compile("<ul name=\"agPanelStates\" class=\"nav navbar-nav panel-states pull-right\"></ul>")(scope)); //add user buttons

      transcludeFn(scope, function (cloneContent) {
        return angular__WEBPACK_IMPORTED_MODULE_3___default.a.forEach(cloneContent, function (element) {
          var li = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element('<li></li>');

          if (element instanceof HTMLElement) {
            return buttonList.append(li.append(angular__WEBPACK_IMPORTED_MODULE_3___default.a.element($compile(element)(scope))));
          }
        });
      });
      var defaultButtons = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element($compile("<li>\n<a name=\"stateButton\" class=\"list\" ng-click=\"changeState($event)\" uib-tooltip=\"Hide/Show\">\n   <i class=\"fa fa-minus\"></i>\n</a>\n</li>\n<li>\n<a name=\"expandButton\" class=\"list\" ng-click=\"fullscreenState($event)\" uib-tooltip=\"Expand\">\n  <i class=\"fa fa-expand\"></i>\n</a>\n</li>\n<li>\n<a name=\"compressButton\" class=\"list ng-hide\" ng-click=\"close()\" uib-tooltip=\"Compress\">\n  <i class=\"fa fa-compress\"></i>\n</a>\n</li>")(scope));
      return element.prepend(buttonList.append(defaultButtons));
    }
  };
}]); // Directive for opening modal window

forms.directive("panelModal", ["$compile", "$uibModal", "$document", function ($compile, $modal, $document) {
  return {
    restrict: "E",
    template: "<div class=\"modal modal-fullscreen\">\n  <div class=\"modal-body\"></div>\n</div>",
    controller: ["$scope", function ($scope) {
      $scope.open = function () {
        return $scope.showModal = true;
      };

      $scope.close = function () {
        return $scope.showModal = false;
      }; // Close modal window (if it is open) when back button clicked


      $scope.$on("$locationChangeStart", function (event) {
        if ($scope.showModal) {
          event.preventDefault();
          return $scope.close();
        }
      }); // Trigger for grid resizing

      $scope.shrinkGridIfExists = function (element) {
        var gridWidth = element.width();
        var gridEl = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find("table.gridz");

        if (angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(gridEl).length > 0) {
          return gridEl.jqGrid("setGridWidth", gridWidth, true);
        }
      };

      return $scope.setGridMaxHeight = function (element) {
        var uiJqgridBdiv = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(element).find(".ui-jqgrid-bdiv");

        if (!$scope.maxHeight) {
          $scope.maxHeight = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(uiJqgridBdiv).css("max-height");
          return angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(uiJqgridBdiv).css("max-height", "80vh");
        } else {
          angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(uiJqgridBdiv).css("max-height", $scope.maxHeight);
          return $scope.maxHeight = undefined;
        }
      };
    }],
    link: function link(scope, element) {
      scope.open();
      return scope.$watch(function () {
        return scope.showModal;
      }, function (newVal) {
        var modalEl = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element($document).find('panel-modal');
        var agPanelStates = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(modalEl).find('[name="agPanelStates"]');
        var elementScope = element.scope();
        var state = agPanelStates.find('[name="stateButton"]');
        var expand = agPanelStates.find('[name="expandButton"]');
        var compress = agPanelStates.find('[name="compressButton"]');

        if (elementScope) {
          var modalBody;

          if (newVal) {
            state.addClass("ng-hide");
            expand.addClass("ng-hide");
            compress.removeClass("ng-hide");
            element.insertBefore(modalEl);
            element.find(".modal-body").append(angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(modalEl).children());
            modalBody = element.find(".modal-body").children();
            angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(modalEl).remove();
            scope.shrinkGridIfExists(modalBody);
            return scope.setGridMaxHeight(modalBody);
          } else {
            state.removeClass("ng-hide");
            expand.removeClass("ng-hide");
            compress.addClass("ng-hide");
            modalBody = angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(modalEl).find(".modal-body").children();
            angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(modalBody).insertBefore(modalEl);
            angular__WEBPACK_IMPORTED_MODULE_3___default.a.element(modalEl).remove();
            scope.shrinkGridIfExists(modalBody);
            return scope.setGridMaxHeight(modalBody);
          }
        }
      });
    }
  };
}]);

/***/ }),

/***/ "bmhT":
/*!*****************************************************!*\
  !*** ./node_modules/sweetalert/lib/sweet-alert.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c96e":
/*!************************************************!*\
  !*** ./src/scripts/common/directives/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addEmptyOption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addEmptyOption */ "VejM");
/* harmony import */ var _agBackButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agBackButton */ "21rE");
/* harmony import */ var _agFileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agFileUpload */ "u88p");
/* harmony import */ var _agSpinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agSpinner */ "P205");
/* harmony import */ var _ieSelectFix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ieSelectFix */ "2IQQ");
/* harmony import */ var _menuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menuItem */ "qGTf");
/* harmony import */ var _sideMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sideMenu */ "ANE9");
/* harmony import */ var _tagInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tagInput */ "nnEc");









/***/ }),

/***/ "cgDM":
/*!*******************************!*\
  !*** ./src/styles/gridz.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d+3G":
/*!**********************************************!*\
  !*** ./node_modules/animate.css/animate.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "eWXV":
/*!**********************************************************!*\
  !*** ./src/scripts/gridz/directives/agGridDataLoader.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]);

var AgGridDataLoaderClass = function AgGridDataLoaderClass($log, $http, $document) {
  _classCallCheck(this, AgGridDataLoaderClass);

  // url - data source url
  // gridCtrl - grid controller instance
  return function (url, gridCtrl) {
    // see http://www.trirand.com/jqgridwiki/doku.php?id=wiki:retrieving_data
    return function (params, loadingDivSelector) {
      // load grid data
      var promise = $http.get(url, {
        params: params
      });
      promise.then(function (response) {
        $log.debug('[gridz] grid data loaded', gridCtrl, response);
        return gridCtrl.addJSONData(response.data);
      }); // show/hide the loading animation

      var loadingEl = $document.find('#' + $.jgrid.jqID(loadingDivSelector));
      loadingEl.show();
      return promise.finally(function () {
        // list of urls for pending requests
        var pendingUrls = lodash_map__WEBPACK_IMPORTED_MODULE_0___default()($http.pendingRequests, function (it) {
          return it.url;
        }); // hide "Loading" for grid only if thereis no pending requests for this grid


        if (!Array.from(pendingUrls).includes(url)) {
          return loadingEl.hide();
        }
      });
    };
  };
};

AgGridDataLoaderClass.$inject = ["$log", "$http", "$document"];
AgGridDataLoaderClass.$inject = ['$log', '$http', '$document'];
gridz.service('agGridDataLoader', AgGridDataLoaderClass);

/***/ }),

/***/ "ekUz":
/*!***********************************************************!*\
  !*** ./src/scripts/forms/services/DialogCrudCtrlMixin.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ "zdiy");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../formsModule */ "O9c1");




var mixin = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_3__["default"]);
mixin.factory('DialogCrudCtrlMixin', ['$log', '$parse', 'FormDialogServ', 'ConfirmationDialogServ', 'alerts', function ($log, $parse, FormDialogServ, ConfirmationDialogServ, alerts) {
  return function ($scope, options) {
    if (options == null) {
      options = {};
    }

    var _options = options,
        Resource = _options.Resource,
        gridName = _options.gridName,
        templateUrl = _options.templateUrl,
        template = _options.template,
        extraDialogOptions = _options.extraDialogOptions; // Retrieve a grid controller from the scope

    var getGrid = function getGrid() {
      return $parse(gridName)($scope);
    };

    var openEditDialogFor = function openEditDialogFor(record) {
      var dialogOptions = {
        record: record,
        grid: getGrid(),
        scope: $scope,
        template: template
      };
      return FormDialogServ.open(templateUrl, lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(dialogOptions, extraDialogOptions));
    }; // Generic method for invoking an edit dialog for a resource
    // with the given id


    $scope.editRecord = function (id) {
      return Resource.get({
        id: id
      }, function (record) {
        if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(options.beforeEdit)) {
          record = options.beforeEdit(record);
        }

        return openEditDialogFor(record);
      });
    }; // Generic method from invoking a dialog for
    // creating a new record


    $scope.createRecord = function () {
      var record = new Resource();

      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(options.beforeCreate)) {
        record = options.beforeCreate(record);
      }

      return openEditDialogFor(record);
    }; // Generic method for deleting a record


    return $scope.deleteRecord = function (id) {
      return ConfirmationDialogServ.open().then(function (confirmed) {
        if (!confirmed) {
          return;
        }

        var promise = Resource.delete({
          id: id
        }).$promise;
        promise.then(function (record) {
          $log.debug("Record deleted ".concat(record.id));
          return getGrid().removeRow(record.id);
        });
        promise.catch(function (response) {
          alerts.error(response.data.message);
          return $log.error('Cannot delete a resource', response);
        });
        return promise;
      });
    };
  };
}]);

/***/ }),

/***/ "euIg":
/*!**********************************!*\
  !*** ./src/styles/vendor.css.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "+eM2");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! font-awesome/css/font-awesome.css */ "fxB9");
/* harmony import */ var font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(font_awesome_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ti_icons_css_themify_icons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ti-icons/css/themify-icons.css */ "hnkQ");
/* harmony import */ var ti_icons_css_themify_icons_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ti_icons_css_themify_icons_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! perfect-scrollbar/css/perfect-scrollbar.css */ "faiq");
/* harmony import */ var perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var toastr_build_toastr_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastr/build/toastr.css */ "0wR0");
/* harmony import */ var toastr_build_toastr_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(toastr_build_toastr_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var sweetalert_lib_sweet_alert_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert/lib/sweet-alert.css */ "bmhT");
/* harmony import */ var sweetalert_lib_sweet_alert_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert_lib_sweet_alert_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var Select2_select2_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! Select2/select2.css */ "ikRh");
/* harmony import */ var Select2_select2_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(Select2_select2_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var select2_bootstrap_css_select2_bootstrap_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! select2-bootstrap-css/select2-bootstrap.css */ "VvvX");
/* harmony import */ var select2_bootstrap_css_select2_bootstrap_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(select2_bootstrap_css_select2_bootstrap_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var angular_loading_bar_build_loading_bar_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-loading-bar/build/loading-bar.css */ "hQ1U");
/* harmony import */ var angular_loading_bar_build_loading_bar_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(angular_loading_bar_build_loading_bar_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var animate_css_animate_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! animate.css/animate.css */ "d+3G");
/* harmony import */ var animate_css_animate_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(animate_css_animate_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var v_button_dist_v_button_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! v-button/dist/v-button.css */ "pCJe");
/* harmony import */ var v_button_dist_v_button_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(v_button_dist_v_button_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ladda_dist_ladda_themeless_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ladda/dist/ladda-themeless.min.css */ "5gNK");
/* harmony import */ var ladda_dist_ladda_themeless_min_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ladda_dist_ladda_themeless_min_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var angular_xeditable_dist_css_xeditable_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular-xeditable/dist/css/xeditable.css */ "rP2o");
/* harmony import */ var angular_xeditable_dist_css_xeditable_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(angular_xeditable_dist_css_xeditable_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "L6m9");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_jquery_file_upload_angular_css_jquery_fileupload_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/jquery-file-upload-angular/css/jquery.fileupload.css */ "w2hN");
/* harmony import */ var _components_jquery_file_upload_angular_css_jquery_fileupload_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_components_jquery_file_upload_angular_css_jquery_fileupload_css__WEBPACK_IMPORTED_MODULE_14__);












 // OLD?

 // change to scss



/***/ }),

/***/ "f+SA":
/*!************************************!*\
  !*** ./src/styles/animations.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f4gn":
/*!************************************!*\
  !*** ./src/scripts/gridz/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gridzModule */ "LyZ+");
/* harmony import */ var _gridPagerCtrlMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gridPagerCtrlMixin */ "Z/dz");
/* harmony import */ var _services_ActionPopupHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/ActionPopupHandler */ "a16Y");
/* harmony import */ var _services_ApplyFormattersServ__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/ApplyFormattersServ */ "Tqsq");
/* harmony import */ var _services_ExcelExportServ__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/ExcelExportServ */ "pFQZ");
/* harmony import */ var _services_FlattenServ__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/FlattenServ */ "zgK6");
/* harmony import */ var _services_GridLinkServ__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/GridLinkServ */ "RGad");
/* harmony import */ var _directives_agColumnsConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directives/agColumnsConfig */ "5WPV");
/* harmony import */ var _directives_agGridDataLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directives/agGridDataLoader */ "eWXV");
/* harmony import */ var _directives_agGridPlaceholder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/agGridPlaceholder */ "RcSf");
/* harmony import */ var _directives_agGridQuickSearch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/agGridQuickSearch */ "w14U");
/* harmony import */ var _directives_agGridXlsExport__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directives/agGridXlsExport */ "UZTw");
/* harmony import */ var _directives_agNewButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/agNewButton */ "Shj7");
/* harmony import */ var _directives_agReloadGrid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directives/agReloadGrid */ "iYXj");
/* harmony import */ var _directives_agResetSortGrid__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directives/agResetSortGrid */ "9IHm");
/* harmony import */ var _directives_gridCrud__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/gridCrud */ "LBM1");
/* harmony import */ var _directives_search__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directives/search */ "5Yix");
/* harmony import */ var _directives_agGrid_gridz__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./directives/agGrid/gridz */ "86lq");
/* harmony import */ var _directives_agGrid_agGridz__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./directives/agGrid/agGridz */ "4CKJ");
/* harmony import */ var _directives_agGrid_agGridCtrl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./directives/agGrid/agGridCtrl */ "/BjM");





















/* harmony default export */ __webpack_exports__["default"] = (_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "fC4V":
/*!************************************************!*\
  !*** ./src/scripts/common/percentageFilter.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonModule */ "+MsD");


var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Percentage filter, based on https://github.com/vpegado/angular-percentage-filter

app.filter('percentage', function () {
  return function (input, decimals, suffix) {
    decimals = angular__WEBPACK_IMPORTED_MODULE_0___default.a.isNumber(decimals) ? decimals : 2;
    suffix = suffix || '%';

    if (!isFinite(input) || input === '') {
      return '';
    } else {
      return Math.round(input * Math.pow(10, decimals + 2)) / Math.pow(10, decimals) + suffix;
    }
  };
});

/***/ }),

/***/ "faiq":
/*!******************************************************************!*\
  !*** ./node_modules/perfect-scrollbar/css/perfect-scrollbar.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fxB9":
/*!********************************************************!*\
  !*** ./node_modules/font-awesome/css/font-awesome.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "gKM7":
/*!******************************************************!*\
  !*** ./src/scripts/forms/services/FormDialogServ.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/BaseCtrl */ "MhVr");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formsModule */ "O9c1");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var forms = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_2__["default"]); // Opens a modal dialog with embedded generic form for
// create or update record

forms.factory('FormDialogServ', ['$uibModal', 'pathWithContext', function ($modal, pathWithContext) {
  return {
    open: function open(templateUrl, _dialogOptions3) {
      var scope, template;

      if (_dialogOptions3 == null) {
        _dialogOptions3 = {};
      }

      if (angular__WEBPACK_IMPORTED_MODULE_1___default.a.isDefined(_dialogOptions3.scope)) {
        var _dialogOptions = _dialogOptions3;
        scope = _dialogOptions.scope;
      }

      if (angular__WEBPACK_IMPORTED_MODULE_1___default.a.isDefined(_dialogOptions3.scope)) {
        var _dialogOptions2 = _dialogOptions3;
        template = _dialogOptions2.template;
      }

      return $modal.open({
        //template: template,
        templateUrl: pathWithContext(templateUrl ? templateUrl : ""),
        controller: 'FormDialogCtrl',
        keyboard: false,
        // do not close the dialog with ESC key
        backdrop: 'static',
        // do not close on click outside of the dialog
        scope: scope,
        resolve: {
          dialogOptions: function dialogOptions() {
            return _dialogOptions3;
          }
        }
      });
    }
  };
}]); // Generic controller for forms inside modal dialogs

var FormDialogCtrl =
/*#__PURE__*/
function (_BaseCtrl) {
  _inherits(FormDialogCtrl, _BaseCtrl);

  function FormDialogCtrl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormDialogCtrl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormDialogCtrl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    /* {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super() }
      let thisFn = (() => { return this }).toString()
      let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;/)[1]
      eval(`${thisName} = this;`)
    } */

    _this.closeDialog = _this.closeDialog.bind(_assertThisInitialized(_this));
    _this.save = _this.save.bind(_assertThisInitialized(_this));
    _this.delete = _this.delete.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormDialogCtrl, [{
    key: "initialize",
    value: function initialize() {
      // Assign dialog options to the scope
      this.$scope.dialogOptions = this.dialogOptions;
      var _this$$scope$dialogOp = this.$scope.dialogOptions;
      this.record = _this$$scope$dialogOp.record;
      this.grid = _this$$scope$dialogOp.grid;
      // assign the given resource to the scope under its name
      var resourceName = angular__WEBPACK_IMPORTED_MODULE_1___default.a.isFunction(this.record.resourceName) ? this.record.resourceName() : 'record';
      this.$scope[resourceName] = this.record;

      if (this.$scope.dialogOptions.exposeRecordToScope) {
        this.$scope.$parent[resourceName] = this.record;
      }

      return this.expose(this.$scope, 'closeDialog', 'save', 'delete');
    } // Closes the dialog

  }, {
    key: "closeDialog",
    value: function closeDialog() {
      this.$log.info('[ag] closing the dialog');
      return this.$uibModalInstance.close(this.record);
    } // If form is valid performs server side update

  }, {
    key: "save",
    value: function save(record) {
      var _this2 = this;

      var promise = record.save().$promise;
      promise.then(function (record) {
        _this2.$log.info('[ag] record has been updated/created', record);

        _this2.grid.saveRow(record.id, record);

        return _this2.$scope.closeDialog();
      });
      return [promise, record];
    } // Performs server side delete

  }, {
    key: "delete",
    value: function _delete() {
      var _this3 = this;

      var promise = this.record.delete().$promise;
      promise.then(function (response) {
        _this3.$log.info('[ag] record has been deleted', response);

        _this3.grid.removeRow(response.id);

        return _this3.$scope.closeDialog();
      });
      promise.catch(function (response) {
        return _this3.$log.error('[ag] something went wrong', response);
      });
      return promise;
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.register(forms, 'FormDialogCtrl');
      this.inject('$scope', '$rootScope', '$log', '$uibModalInstance', 'dialogOptions');
    }
  }]);

  return FormDialogCtrl;
}(_utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_0__["default"]);

FormDialogCtrl.initClass();

/***/ }),

/***/ "hOyn":
/*!******************************!*\
  !*** ./src/angle-grinder.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_pathWithContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/pathWithContext */ "qLk6");
/* harmony import */ var _scripts_resourceSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/resourceSupport */ "hh/Y");
/* harmony import */ var _scripts_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/common */ "QMGv");
/* harmony import */ var _scripts_select2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/select2 */ "Euip");
/* harmony import */ var _scripts_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/forms */ "LSq8");
/* harmony import */ var _scripts_gridz__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scripts/gridz */ "f4gn");
/* harmony import */ var _scripts_alerts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scripts/alerts */ "97wk");








var agmod = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('angleGrinder', [_scripts_resourceSupport__WEBPACK_IMPORTED_MODULE_2__["default"], _scripts_select2__WEBPACK_IMPORTED_MODULE_4__["default"], _scripts_common__WEBPACK_IMPORTED_MODULE_3__["default"], _scripts_pathWithContext__WEBPACK_IMPORTED_MODULE_1__["default"], _scripts_gridz__WEBPACK_IMPORTED_MODULE_6__["default"], _scripts_forms__WEBPACK_IMPORTED_MODULE_5__["default"], _scripts_alerts__WEBPACK_IMPORTED_MODULE_7__["default"]]);
/* harmony default export */ __webpack_exports__["default"] = (agmod.name);
agmod.config(['$httpProvider', 'pathWithContextProvider', function ($httpProvider, pathWithContextProvider) {
  // Intercept all http errors
  $httpProvider.interceptors.push('httpErrorsInterceptor'); // Configure the context path

  var contextPath = $('body').data('context-path');

  if (contextPath != null) {
    pathWithContextProvider.setContextPath(contextPath);
  }
}]); // Intercepts all HTTP errors and displays a flash message

agmod.factory('httpErrorsInterceptor', ['$injector', '$q', 'alerts', function ($injector, $q, alerts) {
  return {
    response: function response(_response) {
      return _response;
    },
    responseError: function responseError(response) {
      var errorMessage, _ref;

      var genericErrorMessage = (response.statusText ? response.statusText : 'Unexpected HTTP error') + ' ' + response.status + ' : ' + response.config.url;
      var responseData = response.data;
      if (responseData == null) errorMessage = genericErrorMessage;else if (responseData.error != null) errorMessage = responseData.error;else if (responseData.message != null) errorMessage = responseData.message;else errorMessage = genericErrorMessage; // ..skip validation and auth errors

      if (response.status !== 422 && response.status !== 401) {
        alerts.error(errorMessage);
        return $q.reject(response);
      }

      return $q.reject(response);
    }
  };
}]); // Catch all jquery xhr errors

agmod.run(['$log', 'alerts', function ($log, alerts) {
  return $(document).ajaxError(function (event, jqxhr, settings, exception) {
    $log.error('Network error:', event, jqxhr, settings, exception);
    return alerts.error(exception);
  });
}]);
agmod.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var paginationOptions = {
    pageNumber: 1,
    pageSize: 25,
    sort: null
  };
  $scope.gridOptions = {
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    useExternalPagination: true,
    useExternalSorting: true,
    columnDefs: [{
      name: 'name'
    }, {
      name: 'gender',
      enableSorting: false
    }, {
      name: 'company',
      enableSorting: false
    }],
    onRegisterApi: function onRegisterApi(gridApi) {
      $scope.gridApi = gridApi;
      $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
        if (sortColumns.length == 0) {
          paginationOptions.sort = null;
        } else {
          paginationOptions.sort = sortColumns[0].sort.direction;
        }

        getPage();
      });
      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        getPage();
      });
    }
  };

  var getPage = function getPage() {
    var url;

    switch (paginationOptions.sort) {
      case uiGridConstants.ASC:
        url = '/data/100_ASC.json';
        break;

      case uiGridConstants.DESC:
        url = '/data/100_DESC.json';
        break;

      default:
        url = '/data/100.json';
        break;
    }

    $http.get(url).success(function (data) {
      $scope.gridOptions.totalItems = 100;
      var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
      $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
    });
  };

  getPage();
}]);

/***/ }),

/***/ "hQ1U":
/*!****************************************************************!*\
  !*** ./node_modules/angular-loading-bar/build/loading-bar.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "hh/Y":
/*!**********************************************!*\
  !*** ./src/scripts/resourceSupport/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resourceModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resourceModule */ "Nf61");
/* harmony import */ var _ResourceTemplateServ__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResourceTemplateServ */ "vYTt");
/* harmony import */ var _restrictResource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./restrictResource */ "mOYu");
/* harmony import */ var _RoutesServ__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RoutesServ */ "2Taq");

 //import './resourceBuilder'




/* harmony default export */ __webpack_exports__["default"] = (_resourceModule__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "hnkQ":
/*!*****************************************************!*\
  !*** ./node_modules/ti-icons/css/themify-icons.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "iYXj":
/*!******************************************************!*\
  !*** ./src/scripts/gridz/directives/agReloadGrid.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "xkGU");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]); // Directive to reload grid - keep scrolling position and selection

gridz.directive('agReloadGrid', [function () {
  return {
    restrict: 'E',
    replace: true,
    // assign grid instance
    scope: {
      grid: '=for'
    },
    link: function link($scope) {
      return $scope.reload = function () {
        // Save id of the selected row
        var selRow = angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy($scope.grid.getParam('selrow'));
        var selRows = angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy($scope.grid.getParam('selarrrow')); // Save grid scroll position

        var scrollPosition = $scope.grid.getGridEl().closest('.ui-jqgrid-bdiv').scrollTop(); // Some grids may have selection in gridComplete so to be sure that after reload grid will have the same selection
        // set it after grid complete

        $scope.grid.getGridEl().on('jqGridAfterGridComplete', function () {
          $scope.grid.clearSelection();

          if ($scope.grid.getParam('multiselect')) {
            return lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(selRows, function (id) {
              return $scope.grid.getGridEl().jqGrid('setSelection', id);
            });
          } else {
            return $scope.grid.getGridEl().jqGrid('setSelection', selRow);
          }
        }); // {current: true} - used for keep multi select

        return $scope.grid.reload([{
          current: true
        }]);
      };
    },
    template: '\
<a class="list" uib-tooltip="Reload Grid" ng-click="reload()"><i class="fa fa-refresh"></i></a>\
'
  };
}]);

/***/ }),

/***/ "ic1H":
/*!*************************************************!*\
  !*** ./examples/ag-demo-ui/src/org/formCtrl.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormCtrl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

/* @ngInject */
var FormCtrl = function FormCtrl($scope, $location, org) {
  _classCallCheck(this, FormCtrl);

  $scope.org = org;

  $scope.save = function (form, org) {
    if (form.$invalid) {
      return;
    }

    var onSuccess = function onSuccess(org) {
      return $location.path("/".concat(org.id));
    };

    var onError = function onError(response) {
      if (response.status === 422) {
        var errors = response.data.errors;
        return $scope.editForm.$serverErrors = errors.org;
      }
    };

    return org.save({
      success: onSuccess,
      error: onError
    });
  };
};

FormCtrl.$inject = ["$scope", "$location", "org"];
FormCtrl.$inject = ["$scope", "$location", "org"];


/***/ }),

/***/ "ikRh":
/*!******************************************!*\
  !*** ./node_modules/Select2/select2.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "jFYK":
/*!**********************************************!*\
  !*** ./src/scripts/common/services/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfirmationDialogServ__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfirmationDialogServ */ "Aced");
/* harmony import */ var _EmbeddedJsonServ__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmbeddedJsonServ */ "nrqn");
/* harmony import */ var _NotificationDialogServ__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NotificationDialogServ */ "bQHU");





/***/ }),

/***/ "kQpr":
/*!***********************************************************!*\
  !*** ./src/scripts/forms/services/SinglePageCrudMixin.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../formsModule */ "O9c1");

var mixin = angular.module(_formsModule__WEBPACK_IMPORTED_MODULE_0__["default"]);
mixin.factory('SinglePageCrudCtrlMixin', ['$log', '$location', 'DialogCrudCtrlMixin', function ($log, $location, DialogCrudCtrlMixin) {
  return function ($scope, args) {
    if (args == null) {
      args = {};
    }

    var _args = args,
        resourcePath = _args.resourcePath,
        gridName = _args.gridName,
        Resource = _args.Resource; // include `deleteRecord` method

    DialogCrudCtrlMixin($scope, {
      gridName: gridName,
      Resource: Resource
    }); // unset `createRecord` method from the parent mixin

    $scope.createRecord = angular.noop; // Generic method navigating to the show record page

    $scope.showRecord = function (id) {
      var showRecordPath = [resourcePath, id].join('/');
      return $location.path(showRecordPath);
    }; // Generic method navigating to the edit item page


    return $scope.editRecord = function (id) {
      var editRecordPath = [resourcePath, id, 'edit'].join('/');
      return $location.path(editRecordPath);
    };
  };
}]);

/***/ }),

/***/ "lIzJ":
/*!********************************************************!*\
  !*** ./src/scripts/forms/directives/editableCustom.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Ability to provide custom template directly in the DOM

app.directive('editableCustom', ['editableDirectiveFactory', function (editableDirectiveFactory) {
  var result = editableDirectiveFactory({
    directiveName: 'editableCustom'
  }); // Here be dragons...

  var compile = result.compile;

  result.compile = function (element) {
    // find template element, grab its html and remove it from the DOM
    var templateEl = element.next('[editable-custom-template]');
    var tpl = templateEl.html();
    templateEl.remove();
    compile.apply(this, arguments); // override linking function

    var link = result.link;
    return function (scope, element, attrs, ctrl) {
      // assign a template to the editable controller
      var eCtrl = ctrl[0];
      eCtrl.inputTpl = tpl;
      return link.apply(this, arguments);
    };
  };

  return result;
}]);

/***/ }),

/***/ "mNvx":
/*!********************************************!*\
  !*** ./src/scripts/common/agDateFilter.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonModule */ "+MsD");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_isFalsy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/isFalsy */ "X8nh");




var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.provider('agDateFilter', function () {
  // see https://docs.angularjs.org/api/ng/filter/date
  var defaultFormat = 'MMM DD, YYYY'; // Set the default date format
  // which will be used across the whole application.

  return {
    setDefaultFormat: function setDefaultFormat(format) {
      return defaultFormat = format;
    },
    $get: ['$filter', function ($filter) {
      return function (date, useTimeZone, format) {
        if (useTimeZone == null) {
          useTimeZone = false;
        }

        if (format == null) {
          format = defaultFormat;
        }

        if (Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_3__["isFalsy"])(date)) {
          return '';
        }

        return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format(format);
      };
    }]
  };
}); // removes timezone and just uses year,month, day

app.filter('localDate', ['agDate', function (agDate) {
  return function (input) {
    if (Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_3__["isFalsy"])(input)) {
      return '';
    } // ignores the time part


    return moment__WEBPACK_IMPORTED_MODULE_2___default()(input).format(agDate.getViewFormat());
  };
}]); // date with time and no timezone formated to the minutes

app.filter('localDateTime', function () {
  return function (input) {
    if (Object(_utils_isFalsy__WEBPACK_IMPORTED_MODULE_3__["isFalsy"])(input)) {
      return '';
    }

    return moment__WEBPACK_IMPORTED_MODULE_2___default.a.utc(input).format('MM/DD/YYYY h:mma');
  };
});

/***/ }),

/***/ "mOYu":
/*!*********************************************************!*\
  !*** ./src/scripts/resourceSupport/restrictResource.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ "QkVN");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "BkRI");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _resourceModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resourceModule */ "Nf61");
/* harmony import */ var _utils_deepDiff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/deepDiff */ "YkKV");





var app = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_resourceModule__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.value('requiredResourceFields', ['id']);
app.factory('restrictResource', ['$log', 'resourceBuilder', 'requiredResourceFields', function ($log, resourceBuilder, requiredResourceFields) {
  return function (resource, allowedFields) {
    if (allowedFields == null) {
      allowedFields = [];
    }

    angular__WEBPACK_IMPORTED_MODULE_2___default.a.extend(resource, {
      $cacheData: function $cacheData() {
        return this.$cachedData = this.resourceData();
      },
      $save: function $save() {
        var Record = resourceBuilder(this.resourcePath());

        var cached = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(this.$cachedData);

        var record = new Record(Object(_utils_deepDiff__WEBPACK_IMPORTED_MODULE_4__["deepDiff"])(cached, resource.resourceData(), allowedFields, requiredResourceFields));
        record.$save();
        this.$cachedData = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(this.$cachedData, record.resourceData());
        return this;
      },
      save: function save() {
        var Record = resourceBuilder(this.resourcePath());
        var record = new Record(Object(_utils_deepDiff__WEBPACK_IMPORTED_MODULE_4__["deepDiff"])(this.$cachedData, resource.resourceData(), allowedFields, requiredResourceFields));
        record.save();
        this.$cachedData = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(this.$cachedData, record.resourceData());
        return this;
      }
    });
    resource.$cacheData();
    return resource;
  };
}]);

/***/ }),

/***/ "n+WL":
/*!**************************************************************!*\
  !*** ./src/scripts/forms/directives/editablePanelHeading.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");

 // Adds button for editable form to make the form visable

var app = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
app.directive('editablePanelHeading', [function () {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    scope: {
      form: '=editablePanelHeading'
    },
    template: "<div class=\"panel-heading\">\n  <h4 class=\"panel-title\">\n    <span ng-transclude></span>\n    <a href=\"\" class=\"pull-right\"\n        ng-click=\"form.$show()\"\n        ng-if=\"!form.$visible\">\n      <i class=\"fa fa-pencil-square-o\"></i>\n    </a>\n  </h4>\n</div>"
  };
}]);

/***/ }),

/***/ "nnEc":
/*!***************************************************!*\
  !*** ./src/scripts/common/directives/tagInput.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commonModule */ "+MsD");


angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).directive('tagInput', function () {
  return {
    restrict: 'E',
    scope: {
      tags: '=ngModel'
    },
    link: function link($scope, element, attrs) {
      $scope.tagVal = '';
      $scope.style = attrs.style || '';
      $scope.placeholder = attrs.placeholder;
      $scope.defaultWidth = '10px';

      $scope.tagArray = function () {
        if ($scope.tags === undefined) {
          return [];
        }

        return $scope.tags.split(',').filter(function (tag) {
          return tag !== '';
        });
      };

      $scope.addTag = function () {
        if ($scope.tagVal.length === 0) {
          return;
        }

        var tagArray = $scope.tagArray();

        if (!Array.from(tagArray).includes($scope.tagVal)) {
          tagArray.push($scope.tagVal);
          $scope.tags = tagArray.join(',');
        }

        return $scope.tagVal = '';
      };

      $scope.deleteTag = function (key) {
        var tagArray = $scope.tagArray();

        if (tagArray.length > 0 && $scope.tagVal.length === 0 && key === undefined) {
          tagArray.pop();
        } else if (key !== undefined) {
          tagArray.splice(key, 1);
        }

        return $scope.tags = tagArray.join(',');
      };

      $scope.$watch('tagVal', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal !== undefined) {
          var tempEl = $('<span>' + newVal + '</span>').appendTo('body');
          $scope.inputWidth = tempEl.width() + 5;

          if ($scope.inputWidth < $scope.defaultWidth) {
            $scope.inputWidth = $scope.defaultWidth;
          }

          return tempEl.remove();
        }
      });
      element.bind('keydown', function (e) {
        var key = e.which;

        if (key === 9 || key === 13) {
          e.preventDefault();
        }

        if (key === 8) {
          return $scope.$apply('deleteTag()');
        }
      });
      element.bind('keyup', function (e) {
        var key = e.which; // Tab, Enter or , pressed

        if (key === 9 || key === 13 || key === 188) {
          e.preventDefault();
          return $scope.$apply('addTag()');
        }
      });
      return element.bind('focusout', function (e) {
        e.preventDefault();
        return $scope.$apply('addTag()');
      });
    },
    template: "<div class='tagged-input'><div class='tag' ng-repeat=\"tag in tagArray() track by $index\"><a href='javascript:' class='delete-tag' ng-click='deleteTag($index)'><i class='glyphicon glyphicon-remove'></i></a>{{tag}}</div><input type='text' style='width:  {{inputWidth}}' ng-model='tagVal' placeholder='{{placeholder}}'/></div>"
  };
});

/***/ }),

/***/ "nrqn":
/*!*********************************************************!*\
  !*** ./src/scripts/common/services/EmbeddedJsonServ.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commonModule */ "+MsD");

 // Makes it possible to reference embedded json from html into angular controllers

angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).factory('EmbeddedJsonServ', ['$document', function ($document) {
  return function (name) {
    var selector = "script[type='application/embedded-json'][name='" + name + "']";
    var node = $(selector);
    var val;

    if (node.length > 0) {
      val = angular__WEBPACK_IMPORTED_MODULE_0___default.a.fromJson(node[0].innerHTML.replace(/&quot;/g, '"'));
    }

    return val;
  };
}]);

/***/ }),

/***/ "oqhd":
/*!*********************************************************!*\
  !*** ./src/scripts/forms/directives/autofillPrevent.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var forms = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
forms.directive('autofillPrevent', ['$parse', function ($parse) {
  return {
    require: 'ngModel',
    link: function link(scope, elem, attrs, ngModel) {
      // Binds focus event to element
      elem.bind('focus', function () {
        return scope.hasBeenFocused = true;
      }); // Listen to any changes in view

      return ngModel.$viewChangeListeners.push(function () {
        if (!scope.hasBeenFocused) {
          return $parse(attrs.ngModel).assign(scope, ngModel.$setViewValue(''));
        }
      });
    }
  };
}]);

/***/ }),

/***/ "pCJe":
/*!*************************************************!*\
  !*** ./node_modules/v-button/dist/v-button.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "pFQZ":
/*!*******************************************************!*\
  !*** ./src/scripts/gridz/services/ExcelExportServ.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "ijCd");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]);

var XlsTemplateClass = function XlsTemplateClass($window) {
  _classCallCheck(this, XlsTemplateClass);

  var fn = function fn(param) {
    if (param == null) {
      param = {
        worksheet: 'Worksheet'
      };
    }

    var _param = param,
        worksheet = _param.worksheet,
        table = _param.table;
    return $window.btoa(unescape(encodeURIComponent("<html xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n  xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n  xmlns=\"http://www.w3.org/TR/REC-html40\">\n<head>\n<!--[if gte mso 9]>\n<xml>\n<x:ExcelWorkbook>\n  <x:ExcelWorksheets>\n      <x:ExcelWorksheet>\n      <x:Name>".concat(worksheet, "</x:Name>\n      <x:WorksheetOptions>\n        <x:DisplayGridlines/>\n      </x:WorksheetOptions>\n    </x:ExcelWorksheet>\n  </x:ExcelWorksheets>\n</x:ExcelWorkbook>\n</xml>\n<![endif]-->\n</head>\n<body>\n<table>").concat(table, "</table>\n</body>\n</html>"))));
  };

  return fn;
};

XlsTemplateClass.$inject = ["$window"];
XlsTemplateClass.$inject = ['$window']; // XLS template fot excel export

gridz.service('xlsTemplate', XlsTemplateClass);

var GridDataClass = function GridDataClass($document, $sanitize) {
  _classCallCheck(this, GridDataClass);

  var findGridEl = function findGridEl(gridId) {
    return $document.find("div#gbox_".concat(gridId));
  };

  var prepareHeading = function prepareHeading(gridId) {
    var gridEl = findGridEl(gridId); // get the grid's heading

    var el = gridEl.find('.ui-jqgrid-hbox table').clone(); // remove unnecessary columns

    el.find("th#".concat(gridId, "_cb")).remove();
    el.find("th#".concat(gridId, "_-row_action_col")).remove();
    el.find("tr[style*='display:none']").remove(); // Strip unnecessary white spaces from the headers

    el.find('th').each(function (index, th) {
      var thEl = $(th);
      return thEl.html(thEl.text().trim());
    });
    return el.html();
  };

  var prepareRows = function prepareRows(gridId, selectedIds) {
    var gridEl = findGridEl(gridId); // get the grid's table html content

    var el = gridEl.find("#".concat(gridId)).clone(); // remove the first row

    el.find('tr.jqgfirstrow').remove(); // remove action column and checkboxes

    el.find("td[aria-describedby='".concat(gridId, "_cb']")).remove();
    el.find("td[aria-describedby='".concat(gridId, "_-row_action_col']")).remove(); // unwrap all links

    el.find('td a').contents().unwrap(); // include only selected rows otherwise export everything

    if (selectedIds.length > 0) {
      el.find('tr').each(function (index, tr) {
        var rowEl = $(tr);
        var id = rowEl.attr('id');

        if (!lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(selectedIds, id)) {
          return el.find("tr#".concat(id)).remove();
        }
      });
    }

    return el.html();
  }; // build the result


  return function (gridId, selectedRows) {
    var resultEl = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<div></div>');
    resultEl.append(prepareHeading(gridId));
    resultEl.append(prepareRows(gridId, selectedRows)); // remove unnecessary html attributes

    var attrsToRemove = ['id', 'class', 'style', 'title', 'aria-describedby', 'aria-labelledby', 'aria-multiselectable', 'role', 'tabindex', 'sort'];

    for (var _i = 0, _Array$from = Array.from(attrsToRemove); _i < _Array$from.length; _i++) {
      var attr = _Array$from[_i];
      resultEl.find('*').removeAttr(attr);
    } // remove unsafe element
    // $sanitize(resultEl.html()) TODO:check how we can configure to not delete all dom tags


    return resultEl.html();
  };
};

GridDataClass.$inject = ["$document", "$sanitize"];
GridDataClass.$inject = ['$document', '$sanitize'];
gridz.service('gridData', GridDataClass);

var XlsDataClass = function XlsDataClass(xlsTemplate, gridData) {
  _classCallCheck(this, XlsDataClass);

  return function (gridId, selectedRows) {
    // generate the xls file content
    if (selectedRows == null) {
      selectedRows = [];
    }

    var data = xlsTemplate({
      table: gridData(gridId, selectedRows),
      worksheet: 'Grid export'
    });
    return "data:application/vnd.ms-excel;base64,".concat(data);
  };
};

XlsDataClass.$inject = ["xlsTemplate", "gridData"];
XlsDataClass.$inject = ['xlsTemplate', 'gridData']; // Generates XLS data uri

gridz.service('xlsData', XlsDataClass);

var CsvDataClass = function CsvDataClass(gridData) {
  _classCallCheck(this, CsvDataClass);

  var prepareCsvHeaders = function prepareCsvHeaders(data) {
    var headers = [];
    var resultEl = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<div></div>');
    resultEl.append(data);
    resultEl.find('th').each(function (index, th) {
      var thEl = $(th);
      return headers.push(thEl.text().trim());
    });
    return headers.join('|');
  };

  var prepareCsvRows = function prepareCsvRows(data) {
    var rows = '';
    var resultEl = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<div></div>');
    resultEl.append(data);
    resultEl.find('tr').each(function (index, tr) {
      var trEl = $(tr);
      var row = [];
      trEl.find('td').each(function (index, td) {
        var tdEl = $(td);
        return row.push(tdEl.text().trim());
      });
      return rows += row.join('|') + '\r\n';
    });
    return rows;
  };

  return function (gridId, selectedRows) {
    // generate the csv file content
    if (selectedRows == null) {
      selectedRows = [];
    }

    return prepareCsvHeaders(gridData(gridId, selectedRows)) + prepareCsvRows(gridData(gridId, selectedRows));
  };
};

CsvDataClass.$inject = ["gridData"];
CsvDataClass.$inject = ['gridData']; // Generates CSV data

gridz.service('csvData', CsvDataClass);

/***/ }),

/***/ "pedN":
/*!************************************************!*\
  !*** ./src/scripts/common/agDateTimeFilter.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonModule */ "+MsD");


angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).provider('agDateTimeFilter', function () {
  // see https://docs.angularjs.org/api/ng/filter/date
  var defaultFormat = 'DD MMM YYYY HH:mm A'; // Set the default date format
  // which will be used across the whole application.

  return {
    setDefaultFormat: function setDefaultFormat(format) {
      return defaultFormat = format;
    },
    $get: ['$filter', function ($filter) {
      return function (date, format) {
        if (format == null) {
          format = defaultFormat;
        }

        return $filter('agDate')(date, true, format);
      };
    }]
  };
});

/***/ }),

/***/ "pnUj":
/*!***********************!*\
  !*** ./src/vendor.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// jquery should be included seperately
window.jQuery = __webpack_require__(/*! jquery */ "EVdn");
window.$ = window.jQuery; // require('lodash')
// require('angular')
// require('angular-animate')
// require('angular-route')
// require('angular-resource')
// require('angular-sanitize')
// require('angular-scroll')
// require('angular-xeditable')
// require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.js')
// require('angular-ui-bootstrap')

__webpack_require__(/*! bootstrap/js/dropdown */ "QMJn");

__webpack_require__(/*! bootstrap/js/tooltip */ "HIsd"); //required by popover


__webpack_require__(/*! bootstrap/js/popover */ "Ol/X"); //required by clickover


__webpack_require__(/*! ../components/bootstrapx-clickover/bootstrapx-clickover */ "Npkl");

__webpack_require__(/*! free-jqgrid/js/jquery.jqgrid.src */ "eHjR");

__webpack_require__(/*! Select2/select2 */ "W7Vc");

__webpack_require__(/*! moment */ "wd/R");

__webpack_require__(/*! eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker */ "eR9f");

__webpack_require__(/*! later/later */ "yEoe"); // require('toastr/toastr.js')
// require('sweetalert/lib/sweet-alert.js')

/***/ }),

/***/ "qGTf":
/*!***************************************************!*\
  !*** ./src/scripts/common/directives/menuItem.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/BaseCtrl */ "MhVr");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../commonModule */ "+MsD");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var app = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.directive("menuItem", ["$route", function ($route) {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    scope: true,
    link: function link(scope, element, attrs) {
      var listIcon;
      scope.href = "#/" + attrs.for;
      var parent = element.parent();

      if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(parent[0].attributes["list-icon"])) {
        listIcon = parent[0].attributes["list-icon"].value;
      }

      scope.icon = attrs.icon || listIcon || "fa fa-circle";
      return scope.isActive = function () {
        var _$route$current;

        return ((_$route$current = $route.current) === null || _$route$current === void 0 ? void 0 : _$route$current.page) === attrs.for;
      };
    },
    template: "<li ng-class=\"{ active: isActive() }\">\n<a href=\"{{href}}\">\n  <i class=\"{{icon}}\"></i>\n    <span ng-transclude></span>\n  </a>\n</li>"
  };
}]);

var MenuCtrl =
/*#__PURE__*/
function (_BaseCtrl) {
  _inherits(MenuCtrl, _BaseCtrl);

  function MenuCtrl() {
    _classCallCheck(this, MenuCtrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuCtrl).apply(this, arguments));
  }

  _createClass(MenuCtrl, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      this.status = {};
      return this.$scope.$on("$routeChangeSuccess", function (event, currentRoute) {
        return _this.status[currentRoute.section] = true;
      });
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.register(app, "agMenuCtrl");
      this.inject("$scope");
    }
  }]);

  return MenuCtrl;
}(_utils_BaseCtrl__WEBPACK_IMPORTED_MODULE_1__["default"]);

MenuCtrl.initClass();

/***/ }),

/***/ "qLk6":
/*!**********************************************!*\
  !*** ./src/scripts/pathWithContext/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/filter */ "k4Da");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "3WF5");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_join__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/join */ "3tWz");
/* harmony import */ var lodash_join__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_join__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);





var MOD_NAME = 'ag.pathWithContext';
/* harmony default export */ __webpack_exports__["default"] = (MOD_NAME);
var app = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module(MOD_NAME, []); // Build an url with the query string from the given params

app.value('urlBuilder', function (path, params) {
  if (params == null) {
    params = {};
  } // see https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba


  var queryString = lodash_join__WEBPACK_IMPORTED_MODULE_3___default()(lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(params, function (value, key) {
    return "".concat(key, "=").concat(value);
  }), '&'); // const queryString = _.chain(params).map((value, key) => `${key}=${value}`).join('&').value()


  return lodash_filter__WEBPACK_IMPORTED_MODULE_1___default()([path, queryString], function (part) {
    return part.length > 0;
  }).join('?');
});
/*
Sample context path configuration:

```
app.config [
"pathWithContextProvider", (pathWithContextProvider) ->
  contextPath = $("body").data("context-path")
  pathWithContextProvider.setContextPath(contextPath)
]
```
*/

app.provider('pathWithContext', function () {
  var contextPath = '/'; // strips '/' from the end and the beginning

  var sanitizePath = function sanitizePath(path) {
    if (path.length === 0) {
      return '/';
    }

    return '/' + path.replace(/\/*$/, '').replace(/^\/*/, '');
  }; // Returns sanitized context path


  return {
    setContextPath: function setContextPath(path) {
      contextPath = sanitizePath(path);
    },
    // it cannot return a value
    $get: ['urlBuilder', function (urlBuilder) {
      return function (path, params) {
        // build a path with the context
        if (params == null) {
          params = {};
        }

        path = lodash_filter__WEBPACK_IMPORTED_MODULE_1___default()([contextPath, sanitizePath(path)], function (part) {
          return !lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(part) && part !== '/';
        }).join(''); // append query string from the given params

        return urlBuilder(path, params);
      };
    }]
  };
});
app.filter('withContext', ['pathWithContext', function (pathWithContext) {
  return function (path) {
    return pathWithContext(path);
  };
}]);

/***/ }),

/***/ "rP2o":
/*!***************************************************************!*\
  !*** ./node_modules/angular-xeditable/dist/css/xeditable.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "tRn4":
/*!***********************************************************!*\
  !*** ./examples/ag-demo-ui/src/org/MassUpdateFormCtrl.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MassUpdateFormCtrl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* @ngInject */
var MassUpdateFormCtrl = function MassUpdateFormCtrl($scope, massUpdateFormCtrlMixin, dialog, Resource, selectedIds, grid) {
  _classCallCheck(this, MassUpdateFormCtrl);

  $scope.records = {
    timeZone: "UTC"
  };
  massUpdateFormCtrlMixin($scope, {
    dialog: dialog,
    Resource: Resource,
    selectedIds: selectedIds,
    grid: grid
  });
};

MassUpdateFormCtrl.$inject = ["$scope", "massUpdateFormCtrlMixin", "dialog", "Resource", "selectedIds", "grid"];
MassUpdateFormCtrl.$inject = ["$scope", "massUpdateFormCtrlMixin", "dialog", "Resource", "selectedIds", "grid"];


/***/ }),

/***/ "u88p":
/*!*******************************************************!*\
  !*** ./src/scripts/common/directives/agFileUpload.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commonModule */ "+MsD");


angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_commonModule__WEBPACK_IMPORTED_MODULE_1__["default"]).directive('agFileUpload', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      return elem.bind('change', function (event) {
        return scope.$apply(function (self) {
          ctrl.$setViewValue(elem.val());
          ctrl.$render();
          return self[attrs.agFileUpload](event);
        });
      });
    }
  };
});

/***/ }),

/***/ "v3nq":
/*!************************************************!*\
  !*** ./src/scripts/select2/agSelect2Module.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui_select2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.select2 */ "3160");
/* harmony import */ var _pathWithContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pathWithContext */ "qLk6");



/* harmony default export */ __webpack_exports__["default"] = ('ag.select2');
angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ag.select2', [_ui_select2__WEBPACK_IMPORTED_MODULE_1__["default"], _pathWithContext__WEBPACK_IMPORTED_MODULE_2__["default"]]);

/***/ }),

/***/ "vYTt":
/*!*************************************************************!*\
  !*** ./src/scripts/resourceSupport/ResourceTemplateServ.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resourceModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resourceModule */ "Nf61");


angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_resourceModule__WEBPACK_IMPORTED_MODULE_1__["default"]).constant('contextPath', $('body').data('contextPath')) // Generate a template url for the given resource and path
.constant('ResourceTemplateServ', function (resource, path) {
  var parts = [];
  parts.push($('body').data('contextPath'));
  parts.push(resource.replace(/^\//, ''));
  parts.push(path);
  return parts.join('/');
});

/***/ }),

/***/ "w14U":
/*!***********************************************************!*\
  !*** ./src/scripts/gridz/directives/agGridQuickSearch.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");



var gridz = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
gridz.directive('agGridQuickSearch', [function () {
  return {
    restrict: 'E',
    // filters are optional
    scope: {
      grid: '=for',
      // assign grid instance
      filters: '=?'
    },
    link: function link($scope) {
      // apply empty quick search filter
      if (lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()($scope.filters)) {
        $scope.filters = {};
      }

      angular__WEBPACK_IMPORTED_MODULE_1___default.a.extend($scope.filters, {
        quickSearch: ''
      }); // perform grid search

      return $scope.search = function (filters) {
        return $scope.grid.search(filters);
      };
    },
    template: "<form class=\"search-form pull-right right-margin-5\" style=\"padding-top: 6px\" name=\"quickSearch\">\n  <input type=\"text\" placeholder=\"quick search\" quick-search-button class=\"search-query\"\n         ng-model=\"filters.quickSearch\"/>\n</form>"
  };
}]); // Trigers search on enter in quick serch input

gridz.directive('quickSearchButton', function () {
  return function (scope, element, attrs) {
    return element.bind('keydown', function (event) {
      // 13 - Enter key code
      if (event.which === 13) {
        event.preventDefault();
        scope.search(scope.filters);
      }

      if (event.which === 27) {
        if (scope.filters) {
          scope.filters.quickSearch = '';
        }

        scope.$apply();
        return scope.search(scope.filters);
      }
    });
  };
});

/***/ }),

/***/ "w2hN":
/*!*************************************************************************!*\
  !*** ./components/jquery-file-upload-angular/css/jquery.fileupload.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "wJ4t":
/*!*****************************************!*\
  !*** ./examples/ag-demo-ui/src/main.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_vendor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/vendor */ "pnUj");
/* harmony import */ var _src_vendor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_vendor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_styles_all_css_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src/styles/all.css.js */ "/s6T");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.css */ "NMY7");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _org_listCtrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./org/listCtrl */ "VP9g");
/* harmony import */ var _org_formCtrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./org/formCtrl */ "ic1H");
/* harmony import */ var _org_showCtrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./org/showCtrl */ "z3JV");
/* harmony import */ var _org_MassUpdateFormCtrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./org/MassUpdateFormCtrl */ "tRn4");
/* harmony import */ var _org_adminOrgModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./org/adminOrgModule */ "5fZH");
/* harmony import */ var _org_orgSelectOptions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./org/orgSelectOptions */ "+5hd");

 //import Org from './org'
// import OrgTab from './tabbedOrg'
// import User from './user'
// import OrgShowCase from './orgShowCase'

 //using ~/ points to the main projects src dir








console.log("adminOrg: ", _org_adminOrgModule__WEBPACK_IMPORTED_MODULE_8__["default"]);
var mod = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(_org_adminOrgModule__WEBPACK_IMPORTED_MODULE_8__["default"]);
mod.controller("org.FormCtrl", _org_formCtrl__WEBPACK_IMPORTED_MODULE_5__["default"]).controller("org.ListCtrl", _org_listCtrl__WEBPACK_IMPORTED_MODULE_4__["default"]).controller("org.ShowCtrl", _org_showCtrl__WEBPACK_IMPORTED_MODULE_6__["default"]).controller("org.MassUpdateFormCtrl", _org_MassUpdateFormCtrl__WEBPACK_IMPORTED_MODULE_7__["default"]).service("orgSelectOptions", _org_orgSelectOptions__WEBPACK_IMPORTED_MODULE_9__["default"]); //export default adminOrg
//Just an example for configuring dates formats

mod.config(["agDateProvider", function (provider) {
  provider.setViewFormat("MM/DD/YY");
  return provider.setLocalDateFormat("YYYY-MM-DD");
}]);
/*
const app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'appCtrl'
  }
}

// the es6 pattern is to setup the module and then export the string name of the module
angular.module('app.module', [uibootstrap])
  .directive('app', app)
  .service('appConfigSvc', AppConfigSvc)
  .controller('AppCtrl', AppCtrl)

export default 'app.module'
*/

/***/ }),

/***/ "wwXr":
/*!*********************************************************!*\
  !*** ./src/scripts/forms/directives/editableSelect2.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var forms = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // TODO spec it

forms.directive('editableSelect2', ['editableDirectiveFactory', function (editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableSelect2',
    inputTpl: '\
<input type="hidden" ng-model="$data" />\
'
  });
}]);

/***/ }),

/***/ "xp58":
/*!******************************************************************!*\
  !*** ./src/scripts/forms/directives/editableDirectiveFactory.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNil */ "J2iB");
/* harmony import */ var lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/reduce */ "xaJk");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../formsModule */ "O9c1");




var forms = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_3__["default"]); // Decorates all editable inputs with mechanism
// for displaying validation errors.

forms.config(["$provide", function ($provide) {
  return $provide.decorator("editableDirectiveFactory", ["$delegate", "validationMessages", function ($delegate, validationMessages) {
    // collect all error messages for the given model
    var errorsFor = function errorsFor(model) {
      var callback = function callback(result, invalid, error) {
        if (invalid) {
          result.push(validationMessages[error]);
        }

        return result;
      };

      return lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default()(model.$error, callback, []).join(", ");
    };

    return function () {
      var directive = $delegate.apply(this, arguments);
      var link = directive.link;

      directive.compile = function (element, attrs) {
        return function (scope, element, attrs, ctrl) {
          link.apply(this, arguments);
          var form = ctrl[1];
          var name = attrs.eName;
          var disabled = attrs.disabled; // watch for model validity
          // and display errors if necessary

          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(form) && !lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(name)) {
            var viewValue = function viewValue() {
              var _form$name;

              return (_form$name = form[name]) === null || _form$name === void 0 ? void 0 : _form$name.$viewValue;
            };

            scope.$watch(viewValue, function () {
              var model = form[name];

              if (model === null || model === void 0 ? void 0 : model.$invalid) {
                form.$setError(name, errorsFor(model));
              }

              if (model === null || model === void 0 ? void 0 : model.$valid) {
                return form.$setError(name, "");
              }
            });
          } // watch if input has disabled attribute


          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(form) && !lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(disabled)) {
            scope.disabled = disabled;
          }

          var options = attrs.options;

          if (!lodash_isNil__WEBPACK_IMPORTED_MODULE_0___default()(options)) {
            return scope.options = options;
          }
        };
      };

      return directive;
    };
  }]);
}]);

/***/ }),

/***/ "ysVj":
/*!*************************************************!*\
  !*** ./src/scripts/forms/directives/buttons.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formsModule */ "O9c1");


var forms = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_formsModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
forms.directive('agCreateButton', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    compile: function compile(element, attrs, trasclude) {
      return {
        pre: function pre(scope, element) {
          return trasclude(scope, function (clone) {
            // Append the default label
            if ($.trim(clone.text()) === '') {
              return element.append('Create');
            }
          });
        }
      };
    },
    template: "<a href=\"\" class=\"btn\">\n  <i class=\"fa fa-pencil-square-o\"></i>\n  <span ng-transclude></span>\n</a>"
  };
});
forms.directive('agCancelButton', function () {
  return {
    restrict: 'E',
    replace: true,
    template: "<button type=\"button\" class=\"btn\">\n  <i class=\"fa fa-times\"></i> Cancel\n</button>"
  };
});

/***/ }),

/***/ "z3JV":
/*!*************************************************!*\
  !*** ./examples/ag-demo-ui/src/org/showCtrl.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowCtrl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

/* @ngInject */
var ShowCtrl = function ShowCtrl($scope, $location, org) {
  _classCallCheck(this, ShowCtrl);

  $scope.org = org;

  $scope.delete = function (org) {
    var onSuccess = function onSuccess() {
      return $location.path("/");
    };

    return org.delete({
      success: onSuccess
    });
  };
};

ShowCtrl.$inject = ["$scope", "$location", "org"];
ShowCtrl.$inject = ["$scope", "$location", "org"];


/***/ }),

/***/ "zgK6":
/*!***************************************************!*\
  !*** ./src/scripts/gridz/services/FlattenServ.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridzModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gridzModule */ "LyZ+");


var gridz = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(_gridzModule__WEBPACK_IMPORTED_MODULE_1__["default"]); // Takes a nested Javascript object and flatten it.
// see: https://github.com/hughsk/flat

gridz.value('FlattenServ', function (target, opts) {
  if (opts == null) {
    opts = {
      delimiter: '.'
    };
  }

  var _opts = opts,
      delimiter = _opts.delimiter;

  var getKey = function getKey(key, prev) {
    if (prev) {
      return prev + delimiter + key;
    } else {
      return key;
    }
  };

  var step = function step(object, prev) {
    return angular__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(Object.keys(object), function (key) {
      var isArray = opts.safe && object[key] instanceof Array;
      var type = Object.prototype.toString.call(object[key]);
      var isObject = type === '[object Object]' || type === '[object Array]';
      var isAngular = key.indexOf('$') >= 0;

      if (!isArray && isObject && !isAngular) {
        return step(object[key], getKey(key, prev));
      }

      return output[getKey(key, prev)] = object[key];
    });
  };

  var output = {};
  step(target);
  return output;
});

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9hZy1kZW1vLXVpL3NyYy9vcmcvb3JnU2VsZWN0T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21tb24vY29tbW9uTW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcz9iOGExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mcmVlLWpxZ3JpZC9wbHVnaW5zL3VpLm11bHRpc2VsZWN0LmNzcz81MjUwIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dyaWR6L2RpcmVjdGl2ZXMvYWdHcmlkL2FnR3JpZEN0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9hbGwuY3NzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL3NlcnZpY2VzL1BhbmVsRm9ybU1peGluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90b2FzdHIvYnVpbGQvdG9hc3RyLmNzcz83ZjI5Iiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2FsZXJ0cy9BbGVydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2RpcmVjdGl2ZXMvYWdCYWNrQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbW1vbi9kaXJlY3RpdmVzL2llU2VsZWN0Rml4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Jlc291cmNlU3VwcG9ydC9Sb3V0ZXNTZXJ2LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlbGVjdDIvdWkuc2VsZWN0Mi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ncmlkei9kaXJlY3RpdmVzL2FnR3JpZC9hZ0dyaWR6LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL2RpcmVjdGl2ZXMvYWdTdWJtaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZGlyZWN0aXZlcy9hZ0NvbHVtbnNDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZGlyZWN0aXZlcy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvYWctZGVtby11aS9zcmMvb3JnL2FkbWluT3JnTW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sYWRkYS9kaXN0L2xhZGRhLXRoZW1lbGVzcy5taW4uY3NzPzRkZDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9hZ1RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ncmlkei9kaXJlY3RpdmVzL2FnR3JpZC9ncmlkei5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9kaXJlY3RpdmVzL2FnU2VsZWN0QmluZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9hbGVydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZGlyZWN0aXZlcy9hZ1Jlc2V0U29ydEdyaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2RpcmVjdGl2ZXMvc2lkZU1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL3NlcnZpY2VzL0NvbmZpcm1hdGlvbkRpYWxvZ1NlcnYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9lZGl0YWJsZURhdGVwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2FnQ3VycmVuY3lGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9lZGl0YWJsZUZvcm1CdXR0b25zLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbW1vbi9uZXdMaW5lc0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWxlY3QyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL2RpcmVjdGl2ZXMvYWdOdW1iZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9hZ1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9kaXJlY3RpdmVzL2RhdGVwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VsZWN0Mi9hZ1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9uYXNkYW4tYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyL2J1aWxkL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIuY3NzP2Y3NjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvc2VydmljZXMvTWFzc1VwZGF0ZU1peGluLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dyaWR6L2RpcmVjdGl2ZXMvZ3JpZENydWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9lZGl0YWJsZS1wYW5lbHMuY3NzPzk2ZDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZ3JpZHpNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvQmFzZUN0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy92YWxpZGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9hZy1kZW1vLXVpL3NyYy9hcHAuY3NzP2FjMzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvc2VydmljZXMvTWFzc1VwZGF0ZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcmVzb3VyY2VTdXBwb3J0L3Jlc291cmNlTW9kdWxlLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvYm9vdHN0cmFweC1jbGlja292ZXIvYm9vdHN0cmFweC1jbGlja292ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZm9ybXNNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2RpcmVjdGl2ZXMvYWdTcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3M/N2JjNCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovc2VydmljZXMvR3JpZExpbmtTZXJ2LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL2RpcmVjdGl2ZXMvYWdEZWxldGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZGlyZWN0aXZlcy9hZ0dyaWRQbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZGlyZWN0aXZlcy9hZ05ld0J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9kaXJlY3RpdmVzL2FnTWF4TGluZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovc2VydmljZXMvQXBwbHlGb3JtYXR0ZXJzU2Vydi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnJlZS1qcWdyaWQvY3NzL3VpLmpxZ3JpZC5jc3M/NzM2MyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ncmlkei9kaXJlY3RpdmVzL2FnR3JpZFhsc0V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9hZy1kZW1vLXVpL3NyYy9vcmcvbGlzdEN0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2RpcmVjdGl2ZXMvYWRkRW1wdHlPcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbGVjdDItYm9vdHN0cmFwLWNzcy9zZWxlY3QyLWJvb3RzdHJhcC5jc3M/NjZkOCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21tb24vY2hlY2tNYXJrRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2lzRmFsc3kuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VsZWN0Mi9TZWxlY3QyT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9kZWVwRGlmZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ncmlkei9ncmlkUGFnZXJDdHJsTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovc2VydmljZXMvQWN0aW9uUG9wdXBIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL2RpcmVjdGl2ZXMvYWdCaW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbW1vbi9zZXJ2aWNlcy9Ob3RpZmljYXRpb25EaWFsb2dTZXJ2LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL2RpcmVjdGl2ZXMvYWdQYW5lbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL3N3ZWV0LWFsZXJ0LmNzcz8yYWRkIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbW1vbi9kaXJlY3RpdmVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvZ3JpZHouc2Nzcz83M2IxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbmltYXRlLmNzcy9hbmltYXRlLmNzcz9kMWVkIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dyaWR6L2RpcmVjdGl2ZXMvYWdHcmlkRGF0YUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9zZXJ2aWNlcy9EaWFsb2dDcnVkQ3RybE1peGluLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvdmVuZG9yLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2FuaW1hdGlvbnMuc2Nzcz9iOTAxIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dyaWR6L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbW1vbi9wZXJjZW50YWdlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9jc3MvcGVyZmVjdC1zY3JvbGxiYXIuY3NzP2ZhYzMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzcz83YWRhIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL3NlcnZpY2VzL0Zvcm1EaWFsb2dTZXJ2LmpzIiwid2VicGFjazovLy8uL3NyYy9hbmdsZS1ncmluZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbmd1bGFyLWxvYWRpbmctYmFyL2J1aWxkL2xvYWRpbmctYmFyLmNzcz80NzNmIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Jlc291cmNlU3VwcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGktaWNvbnMvY3NzL3RoZW1pZnktaWNvbnMuY3NzPzMzM2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovZGlyZWN0aXZlcy9hZ1JlbG9hZEdyaWQuanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvYWctZGVtby11aS9zcmMvb3JnL2Zvcm1DdHJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9TZWxlY3QyL3NlbGVjdDIuY3NzPzQ0MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL3NlcnZpY2VzL1NpbmdsZVBhZ2VDcnVkTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9lZGl0YWJsZUN1c3RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21tb24vYWdEYXRlRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Jlc291cmNlU3VwcG9ydC9yZXN0cmljdFJlc291cmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Zvcm1zL2RpcmVjdGl2ZXMvZWRpdGFibGVQYW5lbEhlYWRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2RpcmVjdGl2ZXMvdGFnSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL3NlcnZpY2VzL0VtYmVkZGVkSnNvblNlcnYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZm9ybXMvZGlyZWN0aXZlcy9hdXRvZmlsbFByZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3YtYnV0dG9uL2Rpc3Qvdi1idXR0b24uY3NzPzgzNDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ3JpZHovc2VydmljZXMvRXhjZWxFeHBvcnRTZXJ2LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbW1vbi9hZ0RhdGVUaW1lRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy92ZW5kb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tbW9uL2RpcmVjdGl2ZXMvbWVudUl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcGF0aFdpdGhDb250ZXh0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXhlZGl0YWJsZS9kaXN0L2Nzcy94ZWRpdGFibGUuY3NzPzljMDkiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvYWctZGVtby11aS9zcmMvb3JnL01hc3NVcGRhdGVGb3JtQ3RybC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21tb24vZGlyZWN0aXZlcy9hZ0ZpbGVVcGxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VsZWN0Mi9hZ1NlbGVjdDJNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcmVzb3VyY2VTdXBwb3J0L1Jlc291cmNlVGVtcGxhdGVTZXJ2LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dyaWR6L2RpcmVjdGl2ZXMvYWdHcmlkUXVpY2tTZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9qcXVlcnktZmlsZS11cGxvYWQtYW5ndWxhci9jc3MvanF1ZXJ5LmZpbGV1cGxvYWQuY3NzP2U0NmUiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvYWctZGVtby11aS9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9kaXJlY3RpdmVzL2VkaXRhYmxlU2VsZWN0Mi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9kaXJlY3RpdmVzL2VkaXRhYmxlRGlyZWN0aXZlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9mb3Jtcy9kaXJlY3RpdmVzL2J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvYWctZGVtby11aS9zcmMvb3JnL3Nob3dDdHJsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dyaWR6L3NlcnZpY2VzL0ZsYXR0ZW5TZXJ2LmpzIl0sIm5hbWVzIjpbIk9yZ1NlbGVjdE9wdGlvbnMiLCJTZWxlY3QyT3B0aW9ucyIsInBhdGhXaXRoQ29udGV4dCIsIndpZHRoIiwiYWpheCIsInVybCIsImZvcm1hdFJlc3VsdCIsIm9yZyIsIm5hbWUiLCJmb3JtYXRTZWxlY3Rpb24iLCJNT0RfTkFNRSIsImNvbW1vbiIsImFuZ3VsYXIiLCJtb2R1bGUiLCJ1aWJNb2ROYW1lIiwibmdSb3V0ZSIsIm5nU2Nyb2xsIiwic2VydmljZSIsIkNvbmZpcm1hdGlvbkRpYWxvZ1NlcnYiLCJjb25maWciLCIkbG9jYWxlUHJvdmlkZXIiLCIkcHJvdmlkZSIsImRlZmF1bHRMb2NhbGUiLCIkZ2V0IiwiZXh0ZW5kIiwiTlVNQkVSX0ZPUk1BVFMiLCJQQVRURVJOUyIsIm5lZ1ByZSIsIm5lZ1N1ZiIsInZhbHVlIiwiZmFjdG9yeSIsIiRodHRwIiwicGVuZGluZ1JlcXVlc3RzIiwiYW55IiwiZm9yIiwiaHR0cE1ldGhvZHMiLCJyZXF1ZXN0cyIsInJlcXVlc3QiLCJtZXRob2QiLCJsZW5ndGgiLCJzdHIiLCJyZXBsYWNlIiwibWF0Y2giLCJwMSIsInAyIiwidG9VcHBlckNhc2UiLCIkbG9jYXRpb25Qcm92aWRlciIsImhhc2hQcmVmaXgiLCIkdWliVG9vbHRpcFByb3ZpZGVyIiwib3B0aW9ucyIsImFwcGVuZFRvQm9keSIsImdyaWR6IiwiZ3JpZHpNb2R1bGUiLCJBZ0dyaWRDdHJsIiwiaGlnaGxpZ2h0Q2xhc3MiLCJ1bmRlZmluZWQiLCJncmlkRWwiLCIkZWxlbWVudCIsImZpbmQiLCJnZXRHcmlkRWwiLCJhdHRyIiwiZ2V0UGFyYW0iLCJnZXRSb3dEYXRhIiwiaWRzIiwiZ2V0U2VsZWN0ZWRSb3dJZHMiLCJpZCIsImpxR3JpZCIsInJvd0lkIiwiZGF0YSIsImdldCIsImFkZEpTT05EYXRhIiwiJHJvb3RTY29wZSIsIiRicm9hZGNhc3QiLCJkZWZlcnJlZCIsIiRxIiwiZGVmZXIiLCJ1bnJlZ2lzdGVyIiwiJG9uIiwiXyIsInJlc29sdmUiLCJ0cmlnZ2VyIiwicHJvbWlzZSIsImdldEdyaWRQYXJhbSIsInBhcmFtcyIsInNldEdyaWRQYXJhbSIsImVtcHR5TWlzc2luZ0NlbGxzIiwiZmxhdERhdGEiLCJGbGF0dGVuU2VydiIsInByZXZEYXRhIiwiZGlmZiIsInJlc3RyaWN0ZWRDb2x1bW5zIiwia2V5IiwiZmlsdGVyIiwiQXJyYXkiLCJmcm9tIiwic2V0Um93RGF0YSIsImZsYXNoT25TdWNjZXNzIiwiJGF0dHJzIiwiYWdHcmlkIiwicG9zaXRpb24iLCJhZGRSb3dEYXRhIiwiZ2V0SW5kIiwiZ2V0RGF0YUlEcyIsIk1hdGgiLCJjZWlsIiwiZ2V0VG90YWxSZWNvcmRzIiwiZ2V0UGFnZVNpemUiLCJwYWdlIiwiZ2V0Q3VycmVudFBhZ2UiLCJnZXRUb3RhbFBhZ2VzIiwiaXNGaXJzdFBhZ2UiLCJsYXN0UGFnZSIsImxvYWRQYWdlIiwiaXNMYXN0UGFnZSIsImZpcnN0UGFnZSIsInNldFBhcmFtIiwicmVsb2FkIiwiaGFzUm93IiwidXBkYXRlUm93IiwiYWRkUm93IiwiZGVsUm93RGF0YSIsImZpbHRlcnMiLCJzZWFyY2giLCJoYXNTZWFyY2hGaWx0ZXJzIiwicG9zdERhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsImNvbHVtbklkIiwiY29sdW1uIiwiaGlkZGVuIiwic2hvd09ySGlkZSIsImlzQ29sdW1uSGlkZGVuIiwiX3RyaWdnZXJSZXNpemUiLCJkb25lIiwicGVybSIsImNob3NlbkNvbHVtbnMiLCJfZ2V0Q29sTW9kZWwiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0R3JpZElkIiwidG9Kc29uIiwieGxzRGF0YSIsImNzdkRhdGEiLCJjb21wbGV0ZSIsIm5vb3AiLCJfZmxhc2hSb3ciLCJjb2xvciIsInJvd0VsIiwiJCIsInJvd3MiLCJuYW1lZEl0ZW0iLCJjc3MiLCJkZWxheSIsImZhZGVPdXQiLCJmYWRlSW4iLCJjbGF6eiIsImFuaW1hdGlvbiIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImZvb3RlclJvdyIsIm5ld0Zvb3RlclJvdyIsImNsb25lIiwiaW5zZXJ0QWZ0ZXIiLCJyZXN1bHQiLCJrIiwidiIsInRkIiwiaXNOYU4iLCJwdXNoIiwiaW5uZXJIVE1MIiwicmVnaXN0ZXIiLCJpbmplY3QiLCJCYXNlQ3RybCIsImluaXRDbGFzcyIsImFwcCIsImZvcm1zTW9kdWxlIiwiJGxvZyIsIiRzY29wZSIsImFyZ3MiLCJmb3JtTmFtZSIsInNob3dGb3JtIiwidG9nZ2xlIiwiZGVidWciLCJ1cGRhdGUiLCJyZWNvcmQiLCJmb3JtIiwiJGludmFsaWQiLCJpbmZvIiwidG9hc3RyIiwicmVxdWlyZSIsIkFsZXJ0cyIsImFsZXJ0VGltZW91dCIsImFsZXJ0c09wdGlvbnMiLCJlcnJvciIsInN1Y2Nlc3MiLCJkZWZhdWx0T3B0aW9ucyIsImNsb3NlQnV0dG9uIiwibmV3ZXN0T25Ub3AiLCJwcm9ncmVzc0JhciIsInBvc2l0aW9uQ2xhc3MiLCJwcmV2ZW50RHVwbGljYXRlcyIsIm9uY2xpY2siLCJzaG93RHVyYXRpb24iLCJoaWRlRHVyYXRpb24iLCJ0aW1lT3V0IiwiZXh0ZW5kZWRUaW1lT3V0Iiwic2hvd0Vhc2luZyIsImhpZGVFYXNpbmciLCJzaG93TWV0aG9kIiwiaGlkZU1ldGhvZCIsInRhcFRvRGlzbWlzcyIsInRleHQiLCJ0eXBlIiwidGl0bGUiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJ0b0xvd2VyQ2FzZSIsIndyYXBNZXNzYWdlIiwic2V0VGltZW91dCIsIiRpbmplY3QiLCJjb21tb25Nb2R1bGUiLCJkaXJlY3RpdmUiLCIkd2luZG93IiwicmVzdHJpY3QiLCJsaW5rIiwic2NvcGUiLCJlbGVtZW50Iiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiaGlzdG9yeSIsImJhY2siLCJlbGVtIiwiYXR0cnMiLCJiaW5kIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1hcCIsIm9wdGlvbiIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJyZXNvdXJjZU1vZHVsZSIsInByb3ZpZGVyIiwiJHJvdXRlUHJvdmlkZXIiLCJSZXNvdXJjZVRlbXBsYXRlU2VydiIsInBhdGgiLCJzZXRPdGhlcndpc2UiLCJvdGhlcndpc2UiLCJzZWxmIiwiZm9yRWFjaCIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJnZXRDb250cm9sbGVyTmFtZSIsInNsaWNlIiwicmVkaXJlY3RUbyIsInVpU2VsZWN0MkNvbmZpZyIsIiR0aW1lb3V0IiwicHJpb3JpdHkiLCJjb21waWxlIiwidEVsbSIsInRBdHRycyIsIndhdGNoIiwicmVwZWF0T3B0aW9uIiwicmVwZWF0QXR0ciIsImlzU2VsZWN0IiwiaXMiLCJpc011bHRpcGxlIiwiaXNEZWZpbmVkIiwibXVsdGlwbGUiLCJqUXVlcnkiLCJ0cmltIiwic3BsaXQiLCJwb3AiLCJwcmUiLCJlbG0iLCJvcHRzIiwiJGV2YWwiLCJ1aVNlbGVjdDIiLCJjb252ZXJ0VG9Bbmd1bGFyTW9kZWwiLCJzZWxlY3QyX2RhdGEiLCJtb2RlbCIsInNpbXBsZV90YWdzIiwiaW5kZXgiLCJjb252ZXJ0VG9TZWxlY3QyTW9kZWwiLCJhbmd1bGFyX2RhdGEiLCJpbml0U2VsZWN0aW9uIiwicmVuRnVuYyIsInNlbGVjdDIiLCIkdmlld1ZhbHVlIiwiJGlzRW1wdHkiLCJ2aWV3VmFsdWUiLCJpc1N0cmluZyIsInNvcnRhYmxlIiwiY29udGFpbm1lbnQiLCJzdGFydCIsImlzT2JqZWN0IiwiJHJlbmRlciIsIiR3YXRjaCIsIm5nTW9kZWwiLCJjdXJyZW50Iiwib2xkIiwibmV3VmFsIiwib2xkVmFsIiwiJHNldFByaXN0aW5lIiwiZSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsIiQkcGhhc2UiLCIkcm9vdCIsIiRhcHBseSIsIiRzZXRWaWV3VmFsdWUiLCJjYWxsYmFjayIsImlzUHJpc3RpbmUiLCIkcHJpc3RpbmUiLCJwcmV2IiwidG9nZ2xlQ2xhc3MiLCIkb2JzZXJ2ZSIsIm5nTXVsdGlwbGUiLCIkc2V0IiwiJG1vZGVsVmFsdWUiLCJwb3N0IiwiJHBhcnNlcnMiLCJkaXYiLCIkdmFsaWQiLCIkZGlydHkiLCIkcGFyc2UiLCJhZ0dyaWREYXRhTG9hZGVyIiwiQWN0aW9uUG9wdXBIYW5kbGVyIiwiY2FtZWxpemUiLCJncmlkQ3RybCIsImFsaWFzIiwiYWdHcmlkTmFtZSIsImFzc2lnbiIsIkVycm9yIiwiYWdHcmlkQ29sTW9kZWwiLCJjb2xNb2RlbCIsImZyb21Kc29uIiwiaW5pdGlhbGl6ZUdyaWQiLCJkYXRhdHlwZSIsImRyb3BHcm91cGluZyIsImdyb3VwaW5nVmlldyIsImdyb3VwVGV4dCIsImdyaWRJZCIsImRyYWdnYWJsZSIsImFwcGVuZFRvIiwiaGVscGVyIiwiZHJvcHBhYmxlIiwiYWN0aXZlQ2xhc3MiLCJob3ZlckNsYXNzIiwiYWNjZXB0IiwiZHJvcCIsInVpIiwiJHRoaXMiLCJyZW1vdmUiLCJncm91cGluZ0NvbHVtbiIsImNsaWNrIiwicGFyZW50IiwiYXBwZW5kIiwiaXRlbXMiLCJzb3J0Iiwic3RvcCIsIm1pblJvd0hlaWdodCIsIml0IiwiZ3JvdXBDaGVja0JveCIsImlzQ2hlY2tlZCIsInNlbGVjdGVkSWRzIiwiZWFjaCIsInJvdyIsImNsb3Nlc3QiLCJwcm9wIiwiaW5pdEdyb3VwQ2hlY2tib3hlcyIsInBhZ2VyIiwic2VsZWN0Rmlyc3RSb3ciLCJfZ3JpZENvbXBsZXRlIiwiZ3JpZENvbXBsZXRlIiwib25HcmlkQ29tcGxldGUiLCJkYXRhSWRzIiwic2V0U2VsZWN0aW9uIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJmaWx0ZXJUb29sYmFyIiwiYmVmb3JlU2VhcmNoIiwiZGVmYXVsdEZpbHRlcnMiLCJwYXJzZSIsImluY2x1ZGVzIiwiZmlyc3RMb2FkIiwiY29uc29sZSIsImxvZyIsIndyYXAiLCJjaGVja2JveFNlbGVjdG9yIiwiaGVhZGVyU2VsZWN0b3IiLCJjdXJyZW50Q0IiLCJoZWFkZXJzIiwibmV4dFVudGlsIiwiY2hlY2tib3hlcyIsImRyb3BEb3duc2VjdGlvbiIsInByZXBlbmQiLCJ0aW1lb3V0UHJvbWlzZSIsImNhbmNlbCIsInRlbXBsYXRlIiwiZm9ybXMiLCJzZXJ2ZXJWYWxpZGF0aW9uRXJyb3JzSGFuZGxlciIsIm9uU3VibWl0IiwiYWdTdWJtaXQiLCJtYXJrQXNTdWJtaXR0ZWQiLCIkc3VibWl0dGVkIiwibmVzdGVkRm9ybXMiLCJpbnB1dCIsIl9fZ3VhcmRfXyIsIiQkZWxlbWVudCIsIngxIiwieCIsInRhZ05hbWUiLCJuZXN0ZWRGb3JtIiwiZm9ybUN0cmwiLCIkbmFtZSIsIiRldmVudCIsInJlc291cmNlIiwiJHNhdmluZyIsImZpbmFsbHlQcm9tIiwiZmluYWxseSIsImNhdGNoIiwicmVzcG9uc2UiLCJpc0Z1bmN0aW9uIiwicmVzb3VyY2VOYW1lIiwidHJhbnNmb3JtIiwiTWFuYWdlR3JpZENvbHVtbnNDdHJsIiwic3lzdGVtQ29sdW1ucyIsImdyaWQiLCJncmlkQ29sdW1ucyIsImF2YWlsYWJsZSIsImRpc3BsYXllZCIsImdyaWRDb2x1bW4iLCJvcmlnaW5hbElkIiwibGFiZWwiLCJzYXZlIiwibmV3Q29sdW1uc09yZGVyIiwiZGlzcGxheWVkQ29sdW1ucyIsImhpZGRlbkNvbHVtbnMiLCJyZW1hcENvbHVtbnMiLCJtYW5hZ2VDb2x1bW5zTW9kYWwiLCJjbG9zZSIsIiR1aWJNb2RhbCIsInRyYW5zY2x1ZGUiLCJyZW5kZXJNYW5hZ2VDb2x1bW5zTW9kYWwiLCJvcGVuIiwia2V5Ym9hcmQiLCJiYWNrZHJvcCIsInNlYXJjaEZvcm0iLCJzZWFyY2hpbmciLCJncmlkU2VhcmNoIiwiYWdTZWFyY2hGb3JtIiwid2FybiIsImFkdmFuY2VkU2VhcmNoIiwicmVzZXRTZWFyY2giLCJjb3B5IiwiYW5nbGVHcmluZGVyIiwiUmVzb3VyY2UiLCIkcm91dGUiLCJyZXNvdXJjZVJlc29sdmVyIiwiJGxvY2F0aW9uIiwidGFicyIsImNvbnRlbnRMb2FkaW5nIiwiY3VycmVudFRhYiIsInNlbGVjdGVkIiwiY3VycmVudFRlbXBsYXRlVXJsIiwidHBsU3JjIiwiY29udGVudExvYWRlZCIsInRhYiIsImxvYWRpbmciLCJvcGVuVGFiIiwiX3NlbGVjdFRhYiIsIl9hZGRUYWIiLCJzZWxlY3QiLCJjdHJsIiwiJHBhcmVudCIsInRhYnNldEN0cmwiLCJnZXRUYWIiLCJhY3RpdmUiLCJhdHRyaWJ1dGVzIiwiY3VycmVudE5hbWUiLCJhZ0ZvY3VzIiwiZm9jdXMiLCJHcmlkeiIsImluaXQiLCJnYm94SWQiLCJnZXRPcHRpb25zIiwiYWN0aW9uUG9wdXAiLCJhZGRSb3dBY3Rpb25Db2x1bW4iLCJlZGl0T25kYmxDbGljayIsImpxR3JpZEFmdGVyR3JpZENvbXBsZXRlIiwianFHcmlkQWZ0ZXJJbnNlcnRSb3ciLCJtdWx0aVNldFNlbGVjdGlvbiIsInNlbGVjdGVkUm93SWRzIiwicmVzcG9uc2l2ZVJlc2l6ZSIsImZuIiwiZGVmYXVsdHMiLCJvcHRCZWZvcmVTZWxlY3RSb3ciLCJiZWZvcmVTZWxlY3RSb3ciLCJyb3dpZCIsInJlc3AiLCJvcHRPblNlbGVjdFJvdyIsIm9uU2VsZWN0Um93Iiwib3B0T25TZWxlY3RBbGwiLCJvblNlbGVjdEFsbCIsInJvd0lkcyIsInN0YXR1cyIsIm1lbW9pemVTZWxlY3RlZFJvd3MiLCJvblNvcnRDb2wiLCJzb3J0bmFtZSIsIm9yZGVyIiwibXVsdGlTb3J0Iiwic29ydExhc3QiLCJzb3J0QXJyYXkiLCJyZXMiLCJpZFJlZ2V4IiwiUmVnRXhwIiwiZXhlYyIsImpvaW4iLCJtdWx0aXNlbGVjdCIsImV4Y2x1ZGUiLCJhY3Rpb25Qb3B1cFNldHVwIiwicG9wdXBzIiwicG9wdXBPcHRpb25zIiwicG9wdXBTZXR1cCIsImNvbHVtbk5hbWUiLCJzdGFydElkIiwiaXNDaGVja0JveCIsInRhcmdldCIsImN0cmxLZXkiLCJzaGlmdEtleSIsIm1ldGFLZXkiLCJzdGFydFJvdyIsImVuZFJvdyIsImlTdGFydCIsIm1pbiIsInJvd0luZGV4Iiwicm93SWRJbmRleCIsImlFbmQiLCJtYXgiLCJpIiwiZG9jdW1lbnQiLCJzZWxlY3Rpb24iLCJlbXB0eSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInNlbGVjdGVkUm93cyIsInJvd051bSIsInNwYW4iLCJzcGxpY2UiLCJwYXJXaWR0aCIsImN1cldpZHRoIiwidyIsImFicyIsInNldEdyaWRXaWR0aCIsImNvbnRhaW5lcklkIiwiYWN0aW9uQ29sIiwiaGlkZWRsZyIsInJlc2l6YWJsZSIsImZpeGVkIiwiZm9ybWF0dGVyIiwiY2VsbFZhbHVlIiwiY29sT3B0aW9ucyIsInJvd09iamVjdCIsImNlbGxGb3JtYXR0ZXIiLCJhY3Rpb25Qb3B1cEZvcm1hdHRlciIsInVuc2hpZnQiLCJyb3dDbGFzcyIsImljb24iLCJjbGlja292ZXIiLCJnbG9iYWxfY2xvc2UiLCJodG1sIiwiY29udGVudCIsIm9uU2hvd24iLCJwb3BVcFBhcmFtcyIsIiR0aXAiLCJhY3Rpb25NZW51IiwicmVzZXRTZWxlY3Rpb24iLCJtZW51TGlzdCIsImFjdGlvblBvcHVwT25TaG93IiwiY2FsbCIsImNsaWNrb3ZlckVsIiwicGFyZW50cyIsIm1lbnVFbCIsIm9uZGJsQ2xpY2tSb3ciLCJncmluZGVyIiwiR3JpZCIsImluc3RhbmNlIiwib3RoZXJBcmdzIiwicHJvdG90eXBlIiwiZWwiLCJDb25zdHJ1Y3RvciIsInBybU5hbWVzIiwianNvblJlYWRlciIsInJlcGVhdGl0ZW1zIiwibXR5cGUiLCJyb3dMaXN0IiwiYWx0Um93cyIsInNocmlua1RvRml0IiwiYXV0b3dpZHRoIiwiaGVpZ2h0Iiwidmlld3JlY29yZHMiLCJyZWNvcmR0ZXh0IiwiZm1hdHRlciIsImRhdGUiLCJjZWxsVmFsIiwiY29sdW1uQWxpZ25lciIsImFnRGF0ZUZpbHRlciIsImN1cnJlbmN5IiwiYWdDdXJyZW5jeUZpbHRlciIsImN1cnJlbmN5T3JaZXJvIiwib2tJY29uIiwicm93ZGF0YSIsImVkaXRBY3Rpb25MaW5rIiwiY3VycmVuY3lVbmZvcm1hdHRlciIsInBhcnNlRmxvYXQiLCJ1bmZvcm1hdCIsImFsaWduIiwiJGZpbHRlciIsInNob3dWYWx1ZSIsImlzTnVtYmVyIiwiZ2V0RmllbGQiLCJvYmplY3RzIiwiZmllbGQiLCJkZWZhdWx0VmFsdWUiLCJhZ1NlbGVjdEJpbmRGaWVsZCIsImFnU2VsZWN0QmluZCIsInR4dCIsImFnU2VsZWN0QmluZEZvciIsInJlc2V0U29ydCIsImRlZmF1bHRDb2x1bW4iLCJkZWZhdWx0T3JkZXIiLCJsc28iLCJoaWRlIiwic2hvdyIsImRpc2FibGVkQ2xhc3NOYW1lIiwiaGVhZGVySGVpZ2h0IiwiZWxTY3JvbGxUb3BPcmlnaW5hbCIsImhlYWRlciIsImdldEVsZW1lbnRCeUlkIiwib2Zmc2V0IiwidG9wIiwib2Zmc2V0SGVpZ2h0IiwicGFnZVlPZmZzZXQiLCJzd2VldEFsZXJ0Iiwic3dhbCIsIm1lc3NhZ2UiLCJjYW5jZWxMYWJlbCIsIm9rTGFiZWwiLCJjbG9zZU9uQ29uZmlybSIsImFsbG93RXNjYXBlS2V5Iiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsImlzQ29uZmlybWVkIiwiZWRpdGFibGVEaXJlY3RpdmVGYWN0b3J5IiwiZGlyZWN0aXZlTmFtZSIsImlucHV0VHBsIiwicmVuZGVyIiwiZGVmYXVsdFN5bWJvbCIsImRlZmF1bHRGb3JtYXQiLCJzZXREZWZhdWx0U3ltYm9sIiwic3ltYm9sIiwic2V0RGVmYXVsdEZvcm1hdCIsImZvcm1hdCIsImFtb3VudCIsImlzRmFsc3kiLCJmb3JtYXR0ZWRBbW91bnQiLCJ2YWwiLCJjYW5jZWxDYWxsQmFjayIsIiRjYW5jZWwiLCJpc05pbCIsImFnU2VsZWN0TW9kdWxlIiwiTlVNQkVSX1JFR0VYUCIsInRlc3QiLCIkZm9ybWF0dGVycyIsInRvRml4ZWQiLCJmcmFjdGlvblNpemUiLCJpc01vZGFsV2luZG93Iiwib2Zmc2V0UGFyZW50IiwiaGFzQXR0cmlidXRlIiwiaXNTYXZpbmciLCJzYXZpbmciLCJ2aWV3Rm9ybWF0IiwibG9jYWxEYXRlVGltZSIsImxvY2FsRGF0ZSIsInNldFZpZXdGb3JtYXQiLCJzZXRMb2NhbERhdGVGb3JtYXQiLCJzZXRMb2NhbERhdGVUaW1lRm9ybWF0Iiwic2V0RGF0ZUZvcm1hdCIsImdldFZpZXdGb3JtYXQiLCJnZXRJc29Gb3JtYXQiLCJpc1ZhbGlkIiwibW9tZW50IiwiYWdEYXRlIiwiZGF0ZXBpY2tlck9wdGlvbnMiLCJuZ01vZGVsQ3RybCIsImlzb0Zvcm1hdCIsImRhdGVUeXBlIiwiYWdEYXRlcGlja2VyIiwicGxhY2Vob2xkZXIiLCJkaXNhYmxlZCIsIl9kIiwidXRjIiwiJHNldFZhbGlkaXR5IiwiZGF0ZXRpbWVwaWNrZXIiLCJzZXRQaWNrZXJWYWx1ZSIsImRhdGVwaWNrZXIiLCJtb2RlbEZvcm1hdCIsImRhdGVGb3JtYXQiLCJzaGlmdCIsIm1vZGVsVmFsdWUiLCJzbW9kIiwiJGNvbXBpbGUiLCJzZWxlY3RPcHRpb25zIiwicmVzdWx0VGVtcGxhdGUiLCIkbmV3IiwiSFRNTEVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJvdXRlckhUTUwiLCJzZWxlY3RNdWx0aXBsZSIsIm1pbmltdW1JbnB1dExlbmd0aCIsInNob3dGaWxsIiwiZmlsbEFsbCIsInNlbGVjdE1pbmltdW1JbnB1dExlbmd0aCIsInBhcnNlSW50Iiwic2VsZWN0QWxsIiwic2VsZWN0QWpheFVybCIsInRlcm0iLCJxIiwicmVzdWx0cyIsIm1vcmUiLCJ0b3RhbCIsInF1aWV0TWlsbGlzIiwic2VsZWN0QWpheFF1aWV0TWlsbGlzIiwiaXRlbSIsImludGVycG9sYXRlIiwib3BlblNlbGVjdDIiLCJzZWxlY3RFbCIsImZpbGwiLCJtaXhpbiIsIiRtb2RhbCIsIk5vdGlmaWNhdGlvbkRpYWxvZ1NlcnYiLCJncmlkTmFtZSIsImV4dHJhUGFyYW1zIiwibWFzc1VwZGF0ZSIsIk1hc3NVcGRhdGVIYW5kbGVyIiwiZGlhbG9nIiwiYmVmb3JlU2F2ZSIsInJlY29yZHMiLCIkcHJvbWlzZSIsImNsZWFyU2VsZWN0aW9uIiwiY2xvc2VEaWFsb2ciLCIkY29udHJvbGxlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbGlja3MiLCJkYmxDbGljayIsImtleWJvYXJkbmF2IiwiY29sTmFtZXMiLCJsYXN0U2VsZWN0ZWRSb3ciLCJ3aGljaCIsInVuSGlnaGxpZ2h0Q2VsbCIsImxhc3RTZWxlY3RlZENlbGwiLCJmaXJzdElkIiwibGFzdElkIiwiaGlnaGxpZ2h0Q2VsbCIsImlzTW9kYWwiLCJjdHJsTG9jYWxzIiwiY29udHJvbGxlck5hbWUiLCJzZXRGb2N1cyIsIkdyaWRDcnVkQ3RybCIsInJlc291cmNlQnVpbGRlciIsInJlc3RyaWN0UmVzb3VyY2UiLCJhZnRlclNhdmUiLCJhY3Rpb25TdWZmaXgiLCJhbGxvd2VkRmllbGRzIiwiaGlkZUZvcm0iLCJtb2RhbCIsImRlZmF1bHRNb2RhbE9wdGlvbnMiLCJ3aW5kb3dDbGFzcyIsIm1vZGFsT3B0aW9ucyIsInJlbmRlcmVkIiwiZWRpdEFjdGlvbiIsInIiLCJjcmVhdGVBY3Rpb24iLCJzYXZlUm93IiwiY29sbmFtZSIsImlSb3ciLCJpQ29sIiwiY3VycmVudFRhcmdldCIsImNvbHVtbk5hbWVGb3JGb2N1cyIsImlucHV0cyIsImFnQ29tbW9uIiwicmVzb3VyY2VTdXBwb3J0IiwiYWdTZWxlY3QyIiwibmdTYW5pdGl6ZSIsInJ1biIsIm1lbWJlcnMiLCJmbWFwIiwiZW50aXR5IiwidG9TdHJpbmciLCJBTk5PVEFUSU9OX1JFRyIsImFubm90YXRpb25zIiwiYW5ub3RhdGlvbiIsImlkZW50aWZpZXIiLCJjb25zdHJ1Y3RvciIsImluaXRpYWxpemUiLCJyZXF1aXJlZCIsIm51bWJlciIsIm1pc21hdGNoIiwibWlubGVuZ3RoIiwibWF4bGVuZ3RoIiwiZW1haWwiLCJwYXR0ZXJuIiwibW9kZWxDdHJsIiwidmFsaWRhdGVFcXVhbCIsIm90aGVyVmFsdWUiLCJhbGxFbXB0eSIsImlzRW1wdHkiLCJ2YWxpZCIsInZhbGlkYXRvciIsImxlbmd0aFZhbGlkYXRvciIsImFnTGVuZ3RoIiwiJGludGVycG9sYXRlIiwiZmllbGRzIiwiZmllbGRFeHByIiwidG9nZ2xlRXJyb3JzIiwiaW52YWxpZCIsIiRzZXJ2ZXJFcnJvcnMiLCJnZXRWaWV3VmFsdWUiLCJpbml0aWFsIiwiZ2V0U2VydmVyRXJyb3JzIiwiaXNTdWJtaXR0ZWQiLCJzdWJtaXR0ZWQiLCJ2YWxpZGF0aW9uTWVzc2FnZXMiLCJmaWVsZE5hbWUiLCJjbGVhckVycm9ycyIsIm1lc3NhZ2VGb3IiLCJhcHBlbmRFcnJvciIsImtsYXNzIiwiZGlzcGxheUVycm9yTWVzc2FnZXMiLCIkZXJyb3IiLCJzZXJ2ZXJFcnJvciIsImFsZXJ0cyIsImRpc3BsYXlHbG9iYWxFcnJvcnMiLCJzZXJ2ZXJFcnJvcnMiLCJzZXRFcnJvcnMiLCJlcnJvcnMiLCJyZXF1aXJlZERpcmVjdGl2ZSIsImZsYXNoT25FcnJvciIsImVycm9yS2V5IiwiZXJyb3JWYWx1ZSIsIm1zZ0tleSIsIm1zZ1ZhbHVlIiwic2VwYXJhdG9yIiwicmVzb3VyY2VzIiwibmdSZXNvdXJjZSIsImFnUGF0aFdpdGhDb250ZXh0IiwiY29uc3RhbnQiLCIkcmVzb3VyY2UiLCJSZXN0Q29udGV4dCIsImJhc2VQYXRoIiwicGF0aFdpdGhvdXRDb250ZXh0IiwibGlzdCIsImFjdGlvbiIsImlzQXJyYXkiLCJkZWxldGUiLCJtYXNzRGVsZXRlIiwicmVzb3VyY2VQYXRoIiwicmVzb3VyY2VEYXRhIiwicGVyc2lzdGVkIiwibmV3UmVjb3JkIiwiJGRvY3VtZW50IiwiJGJvZHkiLCJvblN1Y2Nlc3MiLCJ1c2VyIiwib25FcnJvciIsInJlamVjdCIsIkNsaWNrb3ZlciIsImNpbml0IiwicG9wb3ZlciIsIm1lIiwicmFuZG9tIiwiY2xpY2tfZXZlbnRfbnMiLCJzZWxlY3RvciIsInByb3h5IiwiY2xpY2tlcnkiLCJzdG9wUHJvcGFnYXRpb24iLCJ0aXAiLCJ0aXBfaWQiLCJjbGFzc19uYW1lIiwiaXNTaG93biIsInRoYXQiLCJoYXMiLCJlc2NfY2xvc2UiLCJrZXlDb2RlIiwiYWxsb3dfbXVsdGlwbGUiLCJhdXRvX2Nsb3NlIiwidGlkIiwicmVtb3ZlQXR0ciIsInVuYmluZCIsIm9mZiIsImNsZWFyVGltZW91dCIsIm9uSGlkZGVuIiwicmVzZXRQb3NpdGlvbiIsImluc2lkZSIsInBvcyIsImFjdHVhbFdpZHRoIiwiYWN0dWFsSGVpZ2h0IiwicGxhY2VtZW50IiwidHAiLCJoYXNDb250ZW50IiwiZW5hYmxlZCIsImdldFBvc2l0aW9uIiwib2Zmc2V0V2lkdGgiLCJsZWZ0IiwiZGVidWdoaWRlIiwiZHQiLCJEYXRlIiwieGVkaXRhYmxlIiwiJHRlbXBsYXRlQ2FjaGUiLCJwdXQiLCJkZWNvcmF0b3IiLCIkZGVsZWdhdGUiLCIkcVByb3ZpZGVyIiwiZXJyb3JPblVuaGFuZGxlZFJlamVjdGlvbnMiLCJzcGlubmVyIiwic2hvd1NwaW5uZXIiLCJHcmlkTGlua1NlcnZDbGFzcyIsImlkRmllbGQiLCJyb3dEYXRhIiwiaHJlZiIsIndoZW5Db25maXJtZWQiLCJjb25maXJtYXRpb24iLCJzaG93Q29uZmlybWF0aW9uIiwiZG9EZWxldGUiLCJkZWxldGluZyIsInJvb3RQYXRoIiwidGVtcGxhdGVTcmMiLCJzcmMiLCJyZW5kZXJHcmlkIiwiZm9yY2VSZW5kZXJHcmlkIiwic2hvd0dyaWQiLCJjdXJyZW50Um91dGUiLCJjdXJyZW50UGF0aCIsIm9yaWdpbmFsUGF0aCIsIm1zZyIsIm1heExpbmVzIiwiYWdNYXhMaW5lcyIsIm51bUxpbmVzIiwiZm9ybWF0dGVycyIsImZpcnN0Q2hpbGQiLCJleHAiLCIkZ3JpZCIsImlmcmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50V2luZG93IiwiY29udGVudERvY3VtZW50IiwiZ2V0Q3N2RGF0YSIsIndyaXRlIiwiZXhlY0NvbW1hbmQiLCJkYXRhVXJpIiwiZ2V0WGxzRGF0YVVyaSIsInNldEF0dHJpYnV0ZSIsImNsaWNrX2V2IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiTGlzdEN0cmwiLCJTaW5nbGVQYWdlQ3J1ZEN0cmxNaXhpbiIsIk1hc3NVcGRhdGVNaXhpbiIsImdyaWRPcHRpb25zIiwic29ydG9yZGVyIiwic2hvd0FjdGlvbkxpbmsiLCJzaG93TGluayIsImFkZEVtcHR5T3B0aW9uIiwiZW1wdHlPcHRpb24iLCJoaWRlVHJ1dGgiLCJoaWRlRmFsc2UiLCJTZWxlY3QyT3B0aW9uc0NsYXNzIiwiZGF0YU9wdGlvbnMiLCJkYXRhVHlwZSIsImRhdGFEZWZhdWx0cyIsImRlZXBEaWZmIiwiYWxsb3dlZCIsInJlcUZpZWxkcyIsImRpZmZSZWN1cnNpdmUiLCJjb25jYXQiLCJkZWVwUGljayIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJnZXREZWVwIiwic2V0RGVlcCIsIm4iLCJjdXJyZW50SWQiLCJjdXJySWRHZXR0ZXIiLCJjdXJySWRTZXR0ZXIiLCJvbGRJZCIsImdldEdyaWQiLCJnZXRHcmlkSWRzIiwiZ2V0SWRzIiwicHJldkdyaWRQYWdlIiwicHJldlBhZ2UiLCJuZXh0R3JpZFBhZ2UiLCJuZXh0UGFnZSIsImdldEN1cnJlbnQiLCJnb1RvIiwiaW5keCIsImdldEluZGV4IiwiaGFzUHJldlJvdyIsImhhc05leHRSb3ciLCJwcmV2Um93IiwibmV4dFJvdyIsImhhbmRsZUFjdGlvbiIsInNob3dBY3Rpb24iLCJkZWxldGVBY3Rpb24iLCJtYXNzVXBkYXRlQWN0aW9uIiwiYWdCaW5kIiwiTm90aWZpY2F0aW9uRGlhbG9nQ3RybCIsImV4cG9zZSIsImJvZHlFbCIsIm9sZEhlaWdodCIsImdldEhlaWdodCIsInBhbmVscyIsInJlZ2lzdGVyUGFuZWwiLCJtYXhIZWlnaHQiLCJoaWdoZXN0IiwiYWxsRXF1YWwiLCJoZWlnaHRzIiwiZXF1YWxpemUiLCJwYWRkaW5ncyIsIm91dGVySGVpZ2h0IiwiZWxlbWVudEhlaWdodCIsInJlbW92ZUVsZW1lbnRzIiwiY2hhbmdlU3RhdGUiLCJzdGF0ZUJ1dHRvbiIsImdldEFnUGFuZWwiLCJzdGF0ZSIsImlzR3JpZCIsImNvbGxhcHNlR3JpZCIsImNvbGxhcHNlRm9ybSIsImZ1bGxzY3JlZW5TdGF0ZSIsInBhbmVsTW9kYWwiLCJ0Qm9keSIsImNoaWxkcmVuIiwiZ3JpZFJvd051bSIsInBhbmVsQm9keSIsImFmdGVyIiwiaGFzRWxlbWVudFRvU3RheSIsImNoaWxkIiwidHJhbnNjbHVkZUZuIiwiYnV0dG9uTGlzdCIsImNsb25lQ29udGVudCIsImxpIiwiZGVmYXVsdEJ1dHRvbnMiLCJzaG93TW9kYWwiLCJzaHJpbmtHcmlkSWZFeGlzdHMiLCJncmlkV2lkdGgiLCJzZXRHcmlkTWF4SGVpZ2h0IiwidWlKcWdyaWRCZGl2IiwibW9kYWxFbCIsImFnUGFuZWxTdGF0ZXMiLCJlbGVtZW50U2NvcGUiLCJleHBhbmQiLCJjb21wcmVzcyIsIm1vZGFsQm9keSIsIkFnR3JpZERhdGFMb2FkZXJDbGFzcyIsImxvYWRpbmdEaXZTZWxlY3RvciIsImxvYWRpbmdFbCIsImpncmlkIiwianFJRCIsInBlbmRpbmdVcmxzIiwiRm9ybURpYWxvZ1NlcnYiLCJleHRyYURpYWxvZ09wdGlvbnMiLCJvcGVuRWRpdERpYWxvZ0ZvciIsImRpYWxvZ09wdGlvbnMiLCJlZGl0UmVjb3JkIiwiYmVmb3JlRWRpdCIsImNyZWF0ZVJlY29yZCIsImJlZm9yZUNyZWF0ZSIsImRlbGV0ZVJlY29yZCIsImNvbmZpcm1lZCIsInJlbW92ZVJvdyIsImRlY2ltYWxzIiwic3VmZml4IiwiaXNGaW5pdGUiLCJyb3VuZCIsInBvdyIsIkZvcm1EaWFsb2dDdHJsIiwiZXhwb3NlUmVjb3JkVG9TY29wZSIsIiR1aWJNb2RhbEluc3RhbmNlIiwiYWdtb2QiLCJhbGVydHNNb2QiLCIkaHR0cFByb3ZpZGVyIiwicGF0aFdpdGhDb250ZXh0UHJvdmlkZXIiLCJpbnRlcmNlcHRvcnMiLCJjb250ZXh0UGF0aCIsInNldENvbnRleHRQYXRoIiwiJGluamVjdG9yIiwicmVzcG9uc2VFcnJvciIsImVycm9yTWVzc2FnZSIsIl9yZWYiLCJnZW5lcmljRXJyb3JNZXNzYWdlIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlRGF0YSIsImFqYXhFcnJvciIsImpxeGhyIiwic2V0dGluZ3MiLCJleGNlcHRpb24iLCJ1aUdyaWRDb25zdGFudHMiLCJwYWdpbmF0aW9uT3B0aW9ucyIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInBhZ2luYXRpb25QYWdlU2l6ZXMiLCJwYWdpbmF0aW9uUGFnZVNpemUiLCJ1c2VFeHRlcm5hbFBhZ2luYXRpb24iLCJ1c2VFeHRlcm5hbFNvcnRpbmciLCJjb2x1bW5EZWZzIiwiZW5hYmxlU29ydGluZyIsIm9uUmVnaXN0ZXJBcGkiLCJncmlkQXBpIiwiY29yZSIsInNvcnRDaGFuZ2VkIiwic29ydENvbHVtbnMiLCJkaXJlY3Rpb24iLCJnZXRQYWdlIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25DaGFuZ2VkIiwibmV3UGFnZSIsIkFTQyIsIkRFU0MiLCJ0b3RhbEl0ZW1zIiwiZmlyc3RSb3ciLCJzZWxSb3ciLCJzZWxSb3dzIiwic2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxUb3AiLCJGb3JtQ3RybCIsImVkaXRGb3JtIiwiRGlhbG9nQ3J1ZEN0cmxNaXhpbiIsInNob3dSZWNvcmQiLCJzaG93UmVjb3JkUGF0aCIsImVkaXRSZWNvcmRQYXRoIiwidGVtcGxhdGVFbCIsIm5leHQiLCJ0cGwiLCJlQ3RybCIsInVzZVRpbWVab25lIiwicmVxdWlyZWRSZXNvdXJjZUZpZWxkcyIsIiRjYWNoZURhdGEiLCIkY2FjaGVkRGF0YSIsIiRzYXZlIiwiUmVjb3JkIiwiY2FjaGVkIiwidGFncyIsInRhZ1ZhbCIsImRlZmF1bHRXaWR0aCIsInRhZ0FycmF5IiwidGFnIiwiYWRkVGFnIiwiZGVsZXRlVGFnIiwidGVtcEVsIiwiaW5wdXRXaWR0aCIsIm5vZGUiLCJoYXNCZWVuRm9jdXNlZCIsIiR2aWV3Q2hhbmdlTGlzdGVuZXJzIiwiWGxzVGVtcGxhdGVDbGFzcyIsInBhcmFtIiwid29ya3NoZWV0IiwidGFibGUiLCJidG9hIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJHcmlkRGF0YUNsYXNzIiwiJHNhbml0aXplIiwiZmluZEdyaWRFbCIsInByZXBhcmVIZWFkaW5nIiwidGgiLCJ0aEVsIiwicHJlcGFyZVJvd3MiLCJjb250ZW50cyIsInVud3JhcCIsInRyIiwicmVzdWx0RWwiLCJhdHRyc1RvUmVtb3ZlIiwiWGxzRGF0YUNsYXNzIiwieGxzVGVtcGxhdGUiLCJncmlkRGF0YSIsIkNzdkRhdGFDbGFzcyIsInByZXBhcmVDc3ZIZWFkZXJzIiwicHJlcGFyZUNzdlJvd3MiLCJ0ckVsIiwidGRFbCIsImxpc3RJY29uIiwiaXNBY3RpdmUiLCJNZW51Q3RybCIsInNlY3Rpb24iLCJxdWVyeVN0cmluZyIsInBhcnQiLCJzYW5pdGl6ZVBhdGgiLCJ1cmxCdWlsZGVyIiwiTWFzc1VwZGF0ZUZvcm1DdHJsIiwibWFzc1VwZGF0ZUZvcm1DdHJsTWl4aW4iLCJ0aW1lWm9uZSIsImFnRmlsZVVwbG9hZCIsInBhdGhXaXRoQ3R4IiwicGFydHMiLCJxdWlja1NlYXJjaCIsImFkbWluT3JnIiwibW9kIiwiU2hvd0N0cmwiLCJlcnJvcnNGb3IiLCJlTmFtZSIsIiRzZXRFcnJvciIsInRyYXNjbHVkZSIsImRlbGltaXRlciIsImdldEtleSIsInN0ZXAiLCJvYmplY3QiLCJzYWZlIiwiaXNBbmd1bGFyIiwib3V0cHV0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LFVBQUksQ0FBQ3FuQixPQUFELElBQVl6akIsUUFBWixJQUF3QixDQUFDaTZCLFNBQTdCLEVBQXdDO0FBQUUsZUFBT0gsSUFBSSxDQUFDQyxNQUFNLENBQUNobkMsR0FBRCxDQUFQLEVBQWM4bUMsTUFBTSxDQUFDOW1DLEdBQUQsRUFBTW1PLElBQU4sQ0FBcEIsQ0FBWDtBQUE2Qzs7QUFDdkYsYUFBT2c1QixNQUFNLENBQUNMLE1BQU0sQ0FBQzltQyxHQUFELEVBQU1tTyxJQUFOLENBQVAsQ0FBTixHQUE0QjY0QixNQUFNLENBQUNobkMsR0FBRCxDQUF6QztBQUNELEtBUjRCLENBQWxCO0FBQUEsR0FBWDs7QUFVQSxNQUFJbW5DLE1BQU0sR0FBRyxFQUFiO0FBQ0FKLE1BQUksQ0FBQ3RyQixNQUFELENBQUo7QUFDQSxTQUFPMHJCLE1BQVA7QUFDRCxDQXZCRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCJ3SjR0XCIsXCJqcXVlcnktbGlic1wiLFwidmVuZG9yLWxpYnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKiBAbmdJbmplY3QgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZ1NlbGVjdE9wdGlvbnMge1xuICBjb25zdHJ1Y3RvcihTZWxlY3QyT3B0aW9ucywgcGF0aFdpdGhDb250ZXh0KXtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFNlbGVjdDJPcHRpb25zKHtcbiAgICAgICAgd2lkdGg6IDE5MCxcbiAgICAgICAgYWpheDoge1xuICAgICAgICAgIHVybDogcGF0aFdpdGhDb250ZXh0KFwiL29yZy9waWNrTGlzdFwiKVxuICAgICAgICB9LFxuXG4vLyBmb3JtYXR0ZXJzIGZvciByZXN1bHQgYW5kIHNlbGVjdGlvblxuICAgICAgICBmb3JtYXRSZXN1bHQob3JnKSB7ICByZXR1cm4gb3JnLm5hbWU7IH0sXG4gICAgICAgIGZvcm1hdFNlbGVjdGlvbihvcmcpIHsgcmV0dXJuIG9yZy5uYW1lOyB9XG4gICAgICB9KVxuXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IG5nUm91dGUgZnJvbSAnYW5ndWxhci1yb3V0ZSdcbmltcG9ydCB1aWJNb2ROYW1lIGZyb20gJ2FuZ3VsYXItdWktYm9vdHN0cmFwJ1xuaW1wb3J0IG5nU2Nyb2xsIGZyb20gJ2FuZ3VsYXItc2Nyb2xsJ1xuaW1wb3J0IENvbmZpcm1hdGlvbkRpYWxvZ1NlcnYgZnJvbSAnLi9zZXJ2aWNlcy9Db25maXJtYXRpb25EaWFsb2dTZXJ2J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBNT0RfTkFNRSA9ICdhZy5jb21tb24nXG5leHBvcnQgZGVmYXVsdCBNT0RfTkFNRVxudmFyIGNvbW1vbiA9IGFuZ3VsYXIubW9kdWxlKE1PRF9OQU1FLCBbXG4gIHVpYk1vZE5hbWUsXG4gIG5nUm91dGUsXG4gIG5nU2Nyb2xsIC8vIFNjcm9sbFxuXSlcbiAgLnNlcnZpY2UoJ0NvbmZpcm1hdGlvbkRpYWxvZ1NlcnYnLCBDb25maXJtYXRpb25EaWFsb2dTZXJ2KVxuXG4vLyBjaGFuZ2UgZGVmYXVsdCBsb2NhbGUgdG8gdXNlIGAtYCBzeW1ib2wgZm9yIG5lZ2F0aXZlIGN1cnJlbmNpZXNcbmNvbW1vbi5jb25maWcoZnVuY3Rpb24oJGxvY2FsZVByb3ZpZGVyLCAkcHJvdmlkZSkge1xuICBjb25zdCBkZWZhdWx0TG9jYWxlID0gJGxvY2FsZVByb3ZpZGVyLiRnZXQoKVxuXG4gIGFuZ3VsYXIuZXh0ZW5kKGRlZmF1bHRMb2NhbGUuTlVNQkVSX0ZPUk1BVFMuUEFUVEVSTlNbMV0sIHtcbiAgICBuZWdQcmU6ICctJyxcbiAgICBuZWdTdWY6ICcnXG4gIH0pXG5cbiAgcmV0dXJuICRwcm92aWRlLnZhbHVlKCckbG9jYWxlJywgZGVmYXVsdExvY2FsZSlcbn0pXG5cbi8vIERlY29yYXRlcyBgJGh0dHAucGVuZGluZ1JlcXVlc3RzYCB3aXRoIHNvbWUgdXNlZnVsIGZlYXR1cmVzXG5jb21tb24uZmFjdG9yeSgncGVuZGluZ1JlcXVlc3RzJywgZnVuY3Rpb24oJGh0dHApIHtcbiAgY29uc3QgcGVuZGluZ1JlcXVlc3RzID0gKCkgPT4gcGVuZGluZ1JlcXVlc3RzLmFueSgpXG5cbiAgLy8gUmV0dXJucyB0cnVlIGlmIGFueSBodHRwIHJlcXVlc3QgaXMgaW4gcHJvZ3Jlc3NcbiAgcGVuZGluZ1JlcXVlc3RzLmFueSA9ICgpID0+IHBlbmRpbmdSZXF1ZXN0cy5mb3IoJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdQQVRDSCcsICdERUxFVEUnKVxuXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiBhIGh0dHAgcmVxdWVzdCB3aXRoIHRoZSBnaXZlbiBtZXRob2QgaXMgaW4gcHJvZ3Jlc3NcbiAgcGVuZGluZ1JlcXVlc3RzLmZvciA9IGZ1bmN0aW9uKC4uLmh0dHBNZXRob2RzKSB7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBfLmZpbHRlcigkaHR0cC5wZW5kaW5nUmVxdWVzdHMsIHJlcXVlc3QgPT4gXy5pbmNsdWRlcyhodHRwTWV0aG9kcywgcmVxdWVzdC5tZXRob2QpKVxuICAgIHJldHVybiByZXF1ZXN0cy5sZW5ndGggPiAwXG4gIH1cblxuICByZXR1cm4gcGVuZGluZ1JlcXVlc3RzXG59KVxuXG4vLyBDYW1lbGl6ZXMgdGhlIGdpdmVuIHN0cmluZ1xuY29tbW9uLnZhbHVlKCdjYW1lbGl6ZScsIHN0ciA9PiBzdHIucmVwbGFjZSgvKFxcLXxcXC58X3xcXHMpKyguKT8vZywgZnVuY3Rpb24obWF0Y2gsIHAxLCBwMikge1xuICBpZiAocDIpIHsgcmV0dXJuIHAyLnRvVXBwZXJDYXNlKCkgfSBlbHNlIHsgcmV0dXJuICcnIH1cbn0pKVxuXG4vLyBEdWUgdG8gY2hhbmdlcyBpbiBhbmd1bGFyIDEuNiBzZWUgaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvZ3VpZGUvbWlncmF0aW9uI2NvbW1pdC1hYTA3N2U4XG5jb21tb24uY29uZmlnKFsnJGxvY2F0aW9uUHJvdmlkZXInLCAkbG9jYXRpb25Qcm92aWRlciA9PiAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKV0pXG5cbi8vRklYIHRoZSBiYWQgbG9jYXRpb24gb24gcG9wb3ZlclxuY29tbW9uLmNvbmZpZyhmdW5jdGlvbigkdWliVG9vbHRpcFByb3ZpZGVyKSB7XG4gICR1aWJUb29sdGlwUHJvdmlkZXIub3B0aW9ucyh7YXBwZW5kVG9Cb2R5OiB0cnVlfSlcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uLy4uL2dyaWR6TW9kdWxlJ1xuaW1wb3J0IEJhc2VDdHJsIGZyb20gJy4uLy4uLy4uL3V0aWxzL0Jhc2VDdHJsJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKGdyaWR6TW9kdWxlKVxuXG4vLyBXcmFwcGVyIGZvciBqcUdyaWQgcHVibGljIEFQSVxuLy8gQ29udHJvbGxlciBpbnN0YW5jZSBjb3VsZCBiZSBwdWJsaXNoZWQgdG8gdGhlIHBhcmVudCBzY29wZVxuLy8gd2l0aCBgYWctZ3JpZC1uYW1lYCBkaXJlY3RpdmUsIGZvciBleGFtcGxlOlxuLy8gYDxkaXYgYWctZ3JpZD1cImdyaWRPcHRpb25zXCIgYWctZ3JpZC1uYW1lPVwidXNlcnNHcmlkXCI+PC9kaXY+YFxudmFyIEFnR3JpZEN0cmwgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBoaWdobGlnaHRDbGFzcyA9IHVuZGVmaW5lZFxuICBBZ0dyaWRDdHJsID0gY2xhc3MgQWdHcmlkQ3RybCBleHRlbmRzIEJhc2VDdHJsIHtcbiAgICBzdGF0aWMgaW5pdENsYXNzKCkge1xuXG4gICAgICB0aGlzLnJlZ2lzdGVyKGdyaWR6LCBcIkFnR3JpZEN0cmxcIilcbiAgICAgIHRoaXMuaW5qZWN0KFwiJHJvb3RTY29wZVwiLCBcIiRlbGVtZW50XCIsIFwiJGF0dHJzXCIsIFwiJHFcIiwgXCJoYXNTZWFyY2hGaWx0ZXJzXCIsIFwiRmxhdHRlblNlcnZcIiwgXCJ4bHNEYXRhXCIsIFwiY3N2RGF0YVwiKVxuXG4gICAgICBoaWdobGlnaHRDbGFzcyA9ICd1aS1zdGF0ZS1oaWdobGlnaHQnXG4gICAgfVxuXG4gICAgZ2V0R3JpZEVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JpZEVsIHx8ICh0aGlzLmdyaWRFbCA9IHRoaXMuJGVsZW1lbnQuZmluZChcInRhYmxlLmdyaWR6XCIpKVxuICAgIH1cblxuICAgIGdldEdyaWRJZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEdyaWRFbCgpLmF0dHIoXCJpZFwiKVxuICAgIH1cblxuICAgIC8vIEdpdmVzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcm93cyB3aGVuIG11bHRpc2VsZWN0IGlzIHNldCB0byB0cnVlLlxuICAgIC8vIFRoaXMgaXMgYSBvbmUtZGltZW5zaW9uYWwgYXJyYXkgYW5kIHRoZSB2YWx1ZXMgaW4gdGhlIGFycmF5IGNvcnJlc3BvbmRcbiAgICAvLyB0byB0aGUgc2VsZWN0ZWQgaWQncyBpbiB0aGUgZ3JpZC5cbiAgICBnZXRTZWxlY3RlZFJvd0lkcygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtKFwic2VsYXJycm93XCIpXG4gICAgfVxuXG4gICAgLy9HaXZlcyBzZWxlY3RlZCByb3cgb2JqZWN0cywgW3tpZDoxLi59LCB7aWQ6Mi4ufV1cbiAgICBnZXRTZWxlY3RlZFJvd3MoKSB7XG4gICAgICBjb25zdCBnZXRSb3dEYXRhID0gXy5iaW5kKHRoaXMuZ2V0Um93RGF0YSwgdGhpcylcbiAgICAgIGNvbnN0IGlkcyA9IHRoaXMuZ2V0U2VsZWN0ZWRSb3dJZHMoKVxuICAgICAgcmV0dXJuIF8ubWFwKGlkcywgaWQgPT4gZ2V0Um93RGF0YShpZCkpXG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRHcmlkRWwoKS5qcUdyaWQoJ3Jlc2V0U2VsZWN0aW9uJylcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFuIGFycmF5IHdpdGggZGF0YSBvZiB0aGUgcmVxdWVzdGVkIGlkID0gcm93aWQuXG4gICAgLy8gVGhlIHJldHVybmVkIGFycmF5IGlzIG9mIHR5cGUgbmFtZTp2YWx1ZSwgd2hlcmUgdGhlIG5hbWUgaXNcbiAgICAvLyBhIG5hbWUgZnJvbSBjb2xNb2RlbCBhbmQgdGhlIHZhbHVlIGZyb20gdGhlIGFzc29jaWF0ZWQgY29sdW1uIGluIHRoYXQgcm93LlxuICAgIC8vIEl0IHJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgdGhlIHJvd2lkIGNhbiBub3QgYmUgZm91bmQuXG4gICAgZ2V0Um93RGF0YShyb3dJZCA9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEdyaWRFbCgpLmdldFJvd0RhdGEocm93SWQpXG4gICAgfVxuXG4gICAgLy9SZXR1cm4gYWxsIHJvd3NcbiAgICBnZXRBbGxSb3dzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JpZEVsKCkuZ2V0Um93RGF0YSgpXG4gICAgfVxuXG4gICAgLy8gUG9wdWxhdGVzIHRoZSBncmlkIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAgYWRkSlNPTkRhdGEoZGF0YSkge1xuICAgICAgLy8gVGhlIGFkZEpTT05EYXRhIGlzIHZlcnkgb2xkIG1ldGhvZCB3aGljaCB1c2VzIHN0aWxsIGV4cGFuZG9zXG4gICAgICAvLyB0byB0aGUgRE9NIGVsZW1lbnQgb2YgdGhlIGdyaWQgKDx0YWJsZT4gZWxlbWVudCkuXG4gICAgICB0aGlzLmdldEdyaWRFbCgpLmdldCgwKS5hZGRKU09ORGF0YShkYXRhKVxuXG4gICAgICAvLyBicm9hZGNhc3RzIHRoZSBBbmd1bGFySlMgZXZlbnRcbiAgICAgIHJldHVybiB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChcImdyaWR6OmxvYWRDb21wbGV0ZVwiLCBkYXRhKVxuICAgIH1cblxuICAgIC8vIFJlbG9hZHMgdGhlIGdyaWQgd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nc1xuICAgIHJlbG9hZChvcHRpb25zKXtcbiAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHsgb3B0aW9ucyA9IFtdIH1cbiAgICAgIGNvbnN0IGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpXG5cbiAgICAgIHZhciB1bnJlZ2lzdGVyID0gdGhpcy4kcm9vdFNjb3BlLiRvbihcImdyaWR6OmxvYWRDb21wbGV0ZVwiLCBmdW5jdGlvbihfLCBkYXRhKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSlcbiAgICAgICAgcmV0dXJuIHVucmVnaXN0ZXIoKVxuICAgICAgfSlcblxuICAgICAgdGhpcy5nZXRHcmlkRWwoKS50cmlnZ2VyKFwicmVsb2FkR3JpZFwiLCBvcHRpb25zKVxuXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxuICAgIH1cblxuICAgIC8vIEdldHMgYSBwYXJ0aWN1bGFyIGdyaWQgcGFyYW1ldGVyXG4gICAgZ2V0UGFyYW0obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JpZEVsKCkuZ2V0R3JpZFBhcmFtKG5hbWUpXG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgZ2l2ZW4gZ3JpZCBwYXJhbWV0ZXJcbiAgICBzZXRQYXJhbShwYXJhbXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEdyaWRFbCgpLnNldEdyaWRQYXJhbShwYXJhbXMpXG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgdmFsdWVzICh1c2luZyB0aGUgZGF0YSBhcnJheSkgaW4gdGhlIHJvdyB3aXRoIHJvd2lkLlxuICAgIC8vIFRoZSBzeW50YXggb2YgZGF0YSBhcnJheSBpczoge25hbWUxOnZhbHVlMSxuYW1lMjogdmFsdWUyLi4ufVxuICAgIC8vIHdoZXJlIHRoZSBuYW1lIGlzIHRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gYXMgZGVzY3JpYmVkIGluIHRoZSBjb2xNb2RlbFxuICAgIC8vIGFuZCB0aGUgdmFsdWUgaXMgdGhlIG5ldyB2YWx1ZS5cbiAgICB1cGRhdGVSb3coaWQsIGRhdGEsIGVtcHR5TWlzc2luZ0NlbGxzKSB7XG4gICAgICBpZiAoZW1wdHlNaXNzaW5nQ2VsbHMgPT0gbnVsbCkgeyBlbXB0eU1pc3NpbmdDZWxscyA9IHRydWUgfVxuICAgICAgY29uc3QgZmxhdERhdGEgPSB0aGlzLkZsYXR0ZW5TZXJ2KGRhdGEpXG5cbiAgICAgIGNvbnN0IHByZXZEYXRhID0gdGhpcy5nZXRSb3dEYXRhKGlkKVxuICAgICAgaWYgKCFfLmlzTmlsKHByZXZEYXRhKSkge1xuICAgICAgICAvLyByZXRyaWV2ZSBhIGxpc3Qgb2YgcmVtb3ZlZCBrZXlzXG4gICAgICAgIGxldCBkaWZmID0gXy5kaWZmZXJlbmNlKF8ua2V5cyhwcmV2RGF0YSksIF8ua2V5cyhmbGF0RGF0YSkpXG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCByZXN0cmljdGVkIChwcml2YXRlKSBjb2x1bW5zIGxpa2UgYC1yb3dfYWN0aW9uX2NvbGBcbiAgICAgICAgY29uc3QgcmVzdHJpY3RlZENvbHVtbnMgPSBrZXkgPT4gIWtleS5tYXRjaCgvXi0vKVxuICAgICAgICBkaWZmID0gZGlmZi5maWx0ZXIocmVzdHJpY3RlZENvbHVtbnMpXG5cbiAgICAgICAgLy8gc2V0IGVtcHR5IHZhbHVlc1xuICAgICAgICBpZiAoZW1wdHlNaXNzaW5nQ2VsbHMpIHtcbiAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgQXJyYXkuZnJvbShkaWZmKSkgeyBmbGF0RGF0YVtrZXldID0gbnVsbCB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5nZXRHcmlkRWwoKS5zZXRSb3dEYXRhKGlkLCBmbGF0RGF0YSlcbiAgICAgIHRoaXMuZmxhc2hPblN1Y2Nlc3MoaWQpXG4gICAgICByZXR1cm4gdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoXCJncmlkejpyb3dVcGRhdGVkXCIsIHRoaXMuJGF0dHJzLmFnR3JpZCwgaWQsIGRhdGEpXG4gICAgfVxuXG4gICAgLy8gSW5zZXJ0cyBhIG5ldyByb3cgd2l0aCBpZCA9IHJvd2lkIGNvbnRhaW5pbmcgdGhlIGRhdGEgaW4gZGF0YSAoYW4gb2JqZWN0KSBhdFxuICAgIC8vIHRoZSBwb3NpdGlvbiBzcGVjaWZpZWQgKGZpcnN0IGluIHRoZSB0YWJsZSwgbGFzdCBpbiB0aGUgdGFibGUgb3IgYmVmb3JlIG9yIGFmdGVyIHRoZSByb3cgc3BlY2lmaWVkIGluIHNyY3Jvd2lkKS5cbiAgICAvLyBUaGUgc3ludGF4IG9mIHRoZSBkYXRhIG9iamVjdCBpczoge25hbWUxOnZhbHVlMSxuYW1lMjogdmFsdWUyLi4ufVxuICAgIC8vIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGNvbHVtbiBhcyBkZXNjcmliZWQgaW4gdGhlIGNvbE1vZGVsIGFuZCB0aGUgdmFsdWUgaXMgdGhlIHZhbHVlLlxuICAgIGFkZFJvdyhpZCwgZGF0YSwgcG9zaXRpb24pIHtcbiAgICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSB7IHBvc2l0aW9uID0gXCJmaXJzdFwiIH1cbiAgICAgIHRoaXMuZ2V0R3JpZEVsKCkuYWRkUm93RGF0YShpZCwgdGhpcy5GbGF0dGVuU2VydihkYXRhKSwgcG9zaXRpb24pXG4gICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChcImdyaWR6OnJvd0FkZGVkXCIsIHRoaXMuJGF0dHJzLmFnR3JpZCwgaWQsIGRhdGEpXG4gICAgICByZXR1cm4gdGhpcy5mbGFzaE9uU3VjY2VzcyhpZClcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ3JpZCBjb250YWlucyBhIHJvdyB3aXRoIHRoZSBnaXZlbiBpZFxuICAgIGhhc1JvdyhpZCkge1xuICAgICAgcmV0dXJuICEhdGhpcy5nZXRHcmlkRWwoKS5nZXRJbmQoaWQpXG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgaWQncyBpbiB0aGUgY3VycmVudCBncmlkIHZpZXcuXG4gICAgLy8gSXQgcmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBkYXRhIGlzIGF2YWlsYWJsZS5cbiAgICBnZXRJZHMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRHcmlkRWwoKS5nZXREYXRhSURzKClcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2VcbiAgICBnZXRDdXJyZW50UGFnZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtKFwicGFnZVwiKVxuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiByZWNvcmRzXG4gICAgZ2V0VG90YWxSZWNvcmRzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW0oXCJyZWNvcmRzXCIpXG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIHJvd3MgcGVyIHBhZ2VcbiAgICBnZXRQYWdlU2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtKFwicm93TnVtXCIpXG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzXG4gICAgZ2V0VG90YWxQYWdlcygpIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5nZXRUb3RhbFJlY29yZHMoKSAvIHRoaXMuZ2V0UGFnZVNpemUoKSlcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gdHJ1ZSBpZiB0aGUgY3VycmVudCBncmlkIHZpZXcgZGlzcGxheXMgdGhlIGZpcnN0IHBhZ2VcbiAgICBpc0ZpcnN0UGFnZSgpIHtcbiAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlKClcbiAgICAgIHJldHVybiBwYWdlID09PSAxXG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHRydWUgaWYgdGhlIGN1cnJlbnQgZ3JpZCB2aWV3IGRpc3BsYXlzIHRoZSBsYXN0IHBhZ2VcbiAgICBpc0xhc3RQYWdlKCkge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMuZ2V0Q3VycmVudFBhZ2UoKVxuICAgICAgcmV0dXJuIHBhZ2UgPT09IHRoaXMuZ2V0VG90YWxQYWdlcygpXG4gICAgfVxuXG4gICAgLy8gTG9hZHMgdGhlIHByZXZpb3VzIHBhZ2VcbiAgICBwcmV2UGFnZSgpIHtcbiAgICAgIGlmICh0aGlzLmlzRmlyc3RQYWdlKCkpIHsgcmV0dXJuIHRoaXMubGFzdFBhZ2UoKSB9XG5cbiAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlKClcbiAgICAgIHJldHVybiB0aGlzLmxvYWRQYWdlKHBhZ2UgLSAxKVxuICAgIH1cblxuICAgIC8vIExvYWRzIHRoZSBuZXh0IHBhZ2VcbiAgICBuZXh0UGFnZSgpIHtcbiAgICAgIGlmICh0aGlzLmlzTGFzdFBhZ2UoKSkgeyByZXR1cm4gdGhpcy5maXJzdFBhZ2UoKSB9XG5cbiAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlKClcbiAgICAgIHJldHVybiB0aGlzLmxvYWRQYWdlKHBhZ2UgKyAxKVxuICAgIH1cblxuICAgIC8vIExvYWRzIHRoZSBmaXJzdCBwYWdlXG4gICAgZmlyc3RQYWdlKCkgeyByZXR1cm4gdGhpcy5sb2FkUGFnZSgxKSB9XG5cbiAgICAvLyBMb2FkcyB0aGUgbGFzdCBwYWdlXG4gICAgbGFzdFBhZ2UoKSB7IHJldHVybiB0aGlzLmxvYWRQYWdlKHRoaXMuZ2V0VG90YWxQYWdlcygpKSB9XG5cbiAgICAvLyBMb2FkIHRoZSBzcGVjaWZpYyBwYWdlXG4gICAgbG9hZFBhZ2UocGFnZSkge1xuICAgICAgdGhpcy5zZXRQYXJhbSh7cGFnZX0pXG4gICAgICByZXR1cm4gdGhpcy5yZWxvYWQoKVxuICAgIH1cblxuICAgIHNhdmVSb3coaWQsIGRhdGEpIHtcbiAgICAgIGlmICh0aGlzLmhhc1JvdyhpZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlUm93KGlkLCBkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkUm93KGlkLCBkYXRhKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlbGV0ZXMgdGhlIHJvdyB3aXRoIHRoZSBpZCA9IHJvd2lkLlxuICAgIC8vIFRoaXMgb3BlcmF0aW9uIGRvZXMgbm90IGRlbGV0ZSBkYXRhIGZyb20gdGhlIHNlcnZlci5cbiAgICByZW1vdmVSb3coaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmZsYXNoT25TdWNjZXNzKGlkLCAoKSA9PiB0aGlzLmdldEdyaWRFbCgpLmRlbFJvd0RhdGEoaWQpKVxuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGdyaWQgc2VhcmNoIGZpbHRlcnMgYW5kIHRyaWdnZXJzIGEgcmVsb2FkXG4gICAgc2VhcmNoKGZpbHRlcnMpIHtcbiAgICAgIGNvbnN0IGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpXG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgc2VhcmNoOiB0aGlzLmhhc1NlYXJjaEZpbHRlcnMoZmlsdGVycyksXG4gICAgICAgIHBvc3REYXRhOiB7IGZpbHRlcnM6IEpTT04uc3RyaW5naWZ5KGZpbHRlcnMpXG4gICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0UGFyYW0ocGFyYW1zKVxuXG4gICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5yZWxvYWQoKVxuICAgICAgcHJvbWlzZS50aGVuKCgpID0+IGRlZmVycmVkLnJlc29sdmUoZmlsdGVycykpXG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBgdHJ1ZWAgaWYgYSBjb2x1bW50IHdpdGggdGhlIGdpdmVuIGlkIGlzIGhpZGRlblxuICAgIGlzQ29sdW1uSGlkZGVuKGNvbHVtbklkKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBfLmZpbmQodGhpcy5nZXRQYXJhbShcImNvbE1vZGVsXCIpLCB7bmFtZTogY29sdW1uSWR9KVxuICAgICAgcmV0dXJuIGNvbHVtbj8uaGlkZGVuXG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIHZpc2liaWxpdHkgb2YgYSBjb2x1bW4gd2l0aCB0aGUgZ2l2ZW4gaWRcbiAgICB0b2dnbGVDb2x1bW4oY29sdW1uSWQpIHtcbiAgICAgIGNvbnN0IHNob3dPckhpZGUgPSB0aGlzLmlzQ29sdW1uSGlkZGVuKGNvbHVtbklkKSA/IFwic2hvd0NvbFwiIDogXCJoaWRlQ29sXCJcbiAgICAgIHRoaXMuZ2V0R3JpZEVsKCkuanFHcmlkKHNob3dPckhpZGUsIGNvbHVtbklkKVxuICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJSZXNpemUoKVxuICAgIH1cblxuICAgIC8vIEludm9rZXMgYSBkaWFsb2cgZm9yIGNob29zaW5nIGFuZCByZW9yZGVyaW5nIGdyaWQncyBjb2x1bW5zXG4gICAgLy8gc2VlOiBodHRwOi8vd3d3LnRyaXJhbmQuY29tL2pxZ3JpZHdpa2kvZG9rdS5waHA/aWQ9d2lraSUzYWpxdWVyeV91aV9tZXRob2RzI2NvbHVtbl9jaG9vc2VyXG4gICAgY29sdW1uQ2hvb3NlcihvcHRpb25zKSB7XG4gICAgICAvLyBGdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSB1c2VyIHByZXNzIE9rIGJ1dHRvblxuICAgICAgLy8gaW5zaWRlIHRoZSBjb2x1bW4gY2hvb3NlciBkaWFsb2cuXG4gICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7IG9wdGlvbnMgPSB7fSB9XG4gICAgICBvcHRpb25zLmRvbmUgPSBwZXJtID0+IHtcbiAgICAgICAgLy8gY2FsbCBgcmVtYXBDb2x1bW5zYCBtZXRob2QgaW4gb3JkZXIgdG8gcmVvcmRlciB0aGUgY29sdW1uc1xuICAgICAgICBpZiAocGVybSkgeyB0aGlzLmdldEdyaWRFbCgpLmpxR3JpZChcInJlbWFwQ29sdW1uc1wiLCBwZXJtLCB0cnVlKSB9XG5cbiAgICAgICAgLy8gVE9ETyB3cmFwIGl0IGludG8gc2VydmljZVxuICAgICAgICAvLyBTdG9yZSBjaG9zZW4gY29sdW1uIGluIHRoZSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGNob3NlbkNvbHVtbnMgPSBfLm1hcCh0aGlzLl9nZXRDb2xNb2RlbCgpLCBjb2x1bW4gPT4gXy5waWNrKGNvbHVtbiwgXCJuYW1lXCIsIFwiaGlkZGVuXCIpKVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oYGdyaWR6LiR7dGhpcy5nZXRHcmlkSWQoKX0uY2hvc2VuQ29sdW1uc2AsIGFuZ3VsYXIudG9Kc29uKGNob3NlbkNvbHVtbnMpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXRHcmlkRWwoKS5qcUdyaWQoXCJjb2x1bW5DaG9vc2VyXCIsIG9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBkYXRhIHVyaSB3aXRoIHhscyBmaWxlIGNvbnRlbnQgZm9yIHJvd3MgZnJvbSB0aGUgY3VycmVudCBncmlkIHZpZXcuXG4gICAgZ2V0WGxzRGF0YVVyaSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnhsc0RhdGEodGhpcy5nZXRHcmlkSWQoKSwgdGhpcy5nZXRTZWxlY3RlZFJvd0lkcygpKVxuICAgIH1cblxuICAgIGdldENzdkRhdGEoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jc3ZEYXRhKHRoaXMuZ2V0R3JpZElkKCksIHRoaXMuZ2V0U2VsZWN0ZWRSb3dJZHMoKSlcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VycyBncmlkJ3MgcmVzaXplIGV2ZW50XG4gICAgLy8gQHByaXZhdGVcbiAgICAvLyBUT0RPIGZpeCBncmlkIHJlc2l6aW5nIGlzc3Vlc1xuICAgIC8vIFRPRE8gcmVzaXplIGFmdGVyIGNvbHVtbiBjaG9vc2VyIGRpYWxvZ1xuICAgIF90cmlnZ2VyUmVzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JpZEVsKCkudHJpZ2dlcihcInJlc2l6ZVwiKVxuICAgIH1cblxuICAgIC8vIEZsYXNoIHRoZSBnaXZlbiByb3dcbiAgICBmbGFzaE9uU3VjY2VzcyhpZCwgY29tcGxldGUpIHtcbiAgICAgIGlmIChjb21wbGV0ZSA9PSBudWxsKSB7IGNvbXBsZXRlID0gYW5ndWxhci5ub29wIH1cbiAgICAgIHJldHVybiB0aGlzLl9mbGFzaFJvdyhpZCwgXCIjREZGMEQ4XCIsIGNvbXBsZXRlKVxuICAgIH1cblxuICAgIC8vIEZsYXNoIHRoZSByb3cgd2l0aCByZWQgYmFja2dyb3VuZFxuICAgIGZsYXNoT25FcnJvcihpZCwgY29tcGxldGUpIHtcbiAgICAgIGlmIChjb21wbGV0ZSA9PSBudWxsKSB7IGNvbXBsZXRlID0gYW5ndWxhci5ub29wIH1cbiAgICAgIHJldHVybiB0aGlzLl9mbGFzaFJvdyhpZCwgXCIjRkYwMDAwXCIsIGNvbXBsZXRlKVxuICAgIH1cblxuICAgIF9mbGFzaFJvdyhpZCwgY29sb3IsIGNvbXBsZXRlKSB7XG4gICAgICBpZiAoY29sb3IgPT0gbnVsbCkgeyBjb2xvciA9IFwiI0RGRjBEOFwiIH1cbiAgICAgIGlmIChjb21wbGV0ZSA9PSBudWxsKSB7IGNvbXBsZXRlID0gYW5ndWxhci5ub29wIH1cbiAgICAgIGNvbnN0IHJvd0VsID0gJCh0aGlzLmdldEdyaWRFbCgpWzBdLnJvd3MubmFtZWRJdGVtKGlkKSlcblxuICAgICAgcm93RWwuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBjb2xvcilcbiAgICAgIHJvd0VsLmRlbGF5KDI1MCkuZmFkZU91dChcIm1lZGl1bVwiLCAoKSA9PiByb3dFbC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiXCIpKVxuXG4gICAgICByZXR1cm4gcm93RWwuZmFkZUluKFwiZmFzdFwiLCAoKSA9PiBjb21wbGV0ZSgpKVxuICAgIH1cblxuICAgIGFkZENsYXNzKGlkLCBjbGF6eiwgYW5pbWF0aW9uKSB7XG4gICAgICBpZiAoYW5pbWF0aW9uID09IG51bGwpIHsgYW5pbWF0aW9uID0gdHJ1ZSB9XG4gICAgICBjb25zdCByb3dFbCA9ICQodGhpcy5nZXRHcmlkRWwoKVswXS5yb3dzLm5hbWVkSXRlbShpZCkpXG5cbiAgICAgIGlmICghcm93RWwuaGFzQ2xhc3MoY2xhenopKSB7XG4gICAgICAgIGlmIChhbmltYXRpb24pIHtcbiAgICAgICAgICByb3dFbC5kZWxheSgyNTApLmZhZGVPdXQoXCJtZWRpdW1cIiwgKCkgPT4gcm93RWwuYWRkQ2xhc3MoY2xhenopKVxuICAgICAgICAgIHJldHVybiByb3dFbC5mYWRlSW4oXCJmYXN0XCIsICgpID0+IGFuZ3VsYXIubm9vcCgpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByb3dFbC5hZGRDbGFzcyhjbGF6eilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUNsYXNzKGlkLCBjbGF6eiwgYW5pbWF0aW9uKSB7XG4gICAgICBpZiAoYW5pbWF0aW9uID09IG51bGwpIHsgYW5pbWF0aW9uID0gdHJ1ZSB9XG4gICAgICBjb25zdCByb3dFbCA9ICQodGhpcy5nZXRHcmlkRWwoKVswXS5yb3dzLm5hbWVkSXRlbShpZCkpXG5cbiAgICAgIGlmIChyb3dFbC5oYXNDbGFzcyhjbGF6eikpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgICAgIHJvd0VsLmRlbGF5KDI1MCkuZmFkZU91dChcIm1lZGl1bVwiLCAoKSA9PiByb3dFbC5yZW1vdmVDbGFzcyhjbGF6eikpXG4gICAgICAgICAgcmV0dXJuIHJvd0VsLmZhZGVJbihcImZhc3RcIiwgKCkgPT4gYW5ndWxhci5ub29wKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJvd0VsLnJlbW92ZUNsYXNzKGNsYXp6KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0Um93KGlkKSB7XG4gICAgICBjb25zdCByb3dFbCA9ICQodGhpcy5nZXRHcmlkRWwoKVswXS5yb3dzLm5hbWVkSXRlbShpZCkpXG4gICAgICBpZiAoIXJvd0VsLmhhc0NsYXNzKGhpZ2hsaWdodENsYXNzKSkge1xuICAgICAgICByZXR1cm4gcm93RWwuYWRkQ2xhc3MoaGlnaGxpZ2h0Q2xhc3MpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdW5IaWdobGlnaHRSb3coaWQpIHtcbiAgICAgIGNvbnN0IHJvd0VsID0gJCh0aGlzLmdldEdyaWRFbCgpWzBdLnJvd3MubmFtZWRJdGVtKGlkKSlcbiAgICAgIGlmIChyb3dFbC5oYXNDbGFzcyhoaWdobGlnaHRDbGFzcykpIHtcbiAgICAgICAgcmV0dXJuIHJvd0VsLnJlbW92ZUNsYXNzKGhpZ2hsaWdodENsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGFkZEFkZGl0aW9uYWxGb290ZXIoZGF0YSkge1xuICAgICAgY29uc3QgZm9vdGVyUm93ID0gdGhpcy4kZWxlbWVudC5maW5kKCd0ci5mb290cm93JylcbiAgICAgIGxldCBuZXdGb290ZXJSb3cgPSB1bmRlZmluZWRcbiAgICAgIG5ld0Zvb3RlclJvdyA9IHRoaXMuJGVsZW1lbnQuZmluZCgndHIubXlmb290cm93JylcbiAgICAgIGlmIChuZXdGb290ZXJSb3cubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIGFkZCBzZWNvbmQgcm93IG9mIHRoZSBmb290ZXIgaWYgaXQncyBub3QgZXhpc3RcbiAgICAgICAgbmV3Rm9vdGVyUm93ID0gZm9vdGVyUm93LmNsb25lKClcbiAgICAgICAgbmV3Rm9vdGVyUm93LmFkZENsYXNzKCdteWZvb3Ryb3cgdWktd2lkZ2V0LWNvbnRlbnQnKVxuICAgICAgICBuZXdGb290ZXJSb3cuaW5zZXJ0QWZ0ZXIoZm9vdGVyUm93KVxuICAgICAgfVxuICAgICAgLy8gY2FsY3VsYXRlIHRoZSB2YWx1ZSBmb3IgdGhlIHNlY29uZCBmb290ZXIgcm93XG4gICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW11cbiAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XG4gICAgICAgICAgY29uc3QgdiA9IGRhdGFba11cbiAgICAgICAgICBjb25zdCB0ZCA9IG5ld0Zvb3RlclJvdy5maW5kKFwiW2FyaWEtZGVzY3JpYmVkYnk9XFxcImFyVHJhbkdyaWRfXCIgKyBrICsgJ1wiJyArICddJylcbiAgICAgICAgICBpZiAodGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCFpc05hTih2KSkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaCh0ZFswXS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz0ncHVsbC1yaWdodCBjdXJyZW5jeS1jb250ZW50Jz4ke3Z9PC9kaXY+YClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRkWzBdLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPScnPiR7dn08L2Rpdj5gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh1bmRlZmluZWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0pKClcbiAgICB9XG4gIH1cbiAgQWdHcmlkQ3RybC5pbml0Q2xhc3MoKVxuICByZXR1cm4gQWdHcmlkQ3RybFxufSkoKVxuIiwiaW1wb3J0ICcuL3ZlbmRvci5jc3MuanMnXG5cbmltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCAnLi9lZGl0YWJsZS1wYW5lbHMuY3NzJ1xuaW1wb3J0ICcuL2FuaW1hdGlvbnMuc2NzcydcbmltcG9ydCAnZnJlZS1qcWdyaWQvY3NzL3VpLmpxZ3JpZC5jc3MnXG5pbXBvcnQgJ2ZyZWUtanFncmlkL3BsdWdpbnMvdWkubXVsdGlzZWxlY3QuY3NzJ1xuaW1wb3J0ICcuL2dyaWR6LnNjc3MnXG4iLCJpbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8gbWl4aW4gZm9yIGZvcm1zIGluc2lkZSBpbmZvIHBhbmVsc1xuYXBwLmZhY3RvcnkoJ1BhbmVsRm9ybU1peGluJywgW1xuICAnJGxvZycsICRsb2cgPT4gZnVuY3Rpb24oJHNjb3BlLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkgeyBhcmdzID0ge30gfVxuICAgIGNvbnN0IHsgZm9ybU5hbWUgfSA9IGFyZ3NcblxuICAgIC8vIHRoZSBmb3JtIGluaXRpYWxseSBpcyBoaWRkZW5cbiAgICAkc2NvcGUuc2hvd0Zvcm0gPSBmYWxzZVxuXG4gICAgLy8gdG9nZ2xlcyBmb3JtIHZpc2liaWxpdHlcbiAgICAkc2NvcGUudG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAkbG9nLmRlYnVnKCdbYWddIHRvZ2dsZSBmb3JtIHZpc2liaWxpdHknLCAkc2NvcGUpXG4gICAgICByZXR1cm4gJHNjb3BlLnNob3dGb3JtID0gISRzY29wZS5zaG93Rm9ybVxuICAgIH1cblxuICAgIC8vIER1bW15IGFjdGlvbiBmb3IgdXBkYXRpbmcgdGhlIHJlY29yZC5cbiAgICAvLyBJdCBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiB0aGUgY29udHJvbGxlci5cbiAgICByZXR1cm4gJHNjb3BlLnVwZGF0ZSA9IGZ1bmN0aW9uKHJlY29yZCkge1xuICAgICAgY29uc3QgZm9ybSA9ICRzY29wZVtmb3JtTmFtZV1cbiAgICAgIGlmIChmb3JtLiRpbnZhbGlkKSB7IHJldHVybiB9XG5cbiAgICAgICRsb2cuaW5mbygndXBkYXRpbmcgdGhlIGZvcm0nLCBmb3JtLCByZWNvcmQpXG4gICAgICByZXR1cm4gJHNjb3BlLnNob3dGb3JtID0gZmFsc2VcbiAgICB9XG4gIH1cbl0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG53aW5kb3cudG9hc3RyID0gcmVxdWlyZSgndG9hc3RyJylcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRzIHtcbiAgY29uc3RydWN0b3IoYWxlcnRUaW1lb3V0KSB7XG4gICAgLy8gdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0XG4gICAgdGhpcy5hbGVydFRpbWVvdXQgPSBhbGVydFRpbWVvdXRcbiAgICB0aGlzLmFsZXJ0c09wdGlvbnMgPSB7XG4gICAgICBlcnJvcjoge30sXG4gICAgICBpbmZvOiB7fSxcbiAgICAgIHN1Y2Nlc3M6IHt9LFxuICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgbmV3ZXN0T25Ub3A6IHRydWUsXG4gICAgICAgIHByb2dyZXNzQmFyOiB0cnVlLFxuICAgICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtdG9wLXJpZ2h0JyxcbiAgICAgICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWUsXG4gICAgICAgIG9uY2xpY2s6IG51bGwsXG4gICAgICAgIHNob3dEdXJhdGlvbjogJzEwMCcsXG4gICAgICAgIGhpZGVEdXJhdGlvbjogJzEwMDAnLFxuICAgICAgICB0aW1lT3V0OiB0aGlzLmFsZXJ0VGltZW91dCxcbiAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAwLFxuICAgICAgICBzaG93RWFzaW5nOiAnc3dpbmcnLFxuICAgICAgICBoaWRlRWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgc2hvd01ldGhvZDogJ2ZhZGVJbicsXG4gICAgICAgIGhpZGVNZXRob2Q6ICdmYWRlT3V0JyxcbiAgICAgICAgdGFwVG9EaXNtaXNzOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyYXBNZXNzYWdlKHRleHQsIHR5cGUpIHtcbiAgICAvLyB0b2FzdHIub3B0aW9ucyA9IF8ubWVyZ2UoYW5ndWxhci5jb3B5KHRoaXMuYWxlcnRzT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyksIHRoaXMuYWxlcnRzT3B0aW9uc1t0eXBlXSlcbiAgICB0b2FzdHIub3B0aW9ucyA9IF8ubWVyZ2Uoe30sIHRoaXMuYWxlcnRzT3B0aW9ucy5kZWZhdWx0T3B0aW9ucywgdGhpcy5hbGVydHNPcHRpb25zW3R5cGVdKVxuICAgIGNvbnN0IHRpdGxlID0gdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR5cGUuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKClcbiAgICByZXR1cm4gdG9hc3RyW3R5cGVdKHRleHQsIHRpdGxlKVxuICB9XG5cbiAgLy8gSGVscGVyIG1ldGhvZHMgZm9yIHZhcmlvdXMgYWxlcnRzIHR5cGVzXG4gIHN1Y2Nlc3ModGV4dCkgeyByZXR1cm4gdGhpcy53cmFwTWVzc2FnZSh0ZXh0LCAnc3VjY2VzcycpIH1cbiAgaW5mbyh0ZXh0KSB7IHJldHVybiB0aGlzLndyYXBNZXNzYWdlKHRleHQsICdpbmZvJykgfVxuICBlcnJvcih0ZXh0KSB7IHJldHVybiB0aGlzLndyYXBNZXNzYWdlKHRleHQsICdlcnJvcicpIH1cblxuICBzZXRUaW1lb3V0KGRlbGF5LCB0eXBlKSB7XG4gICAgaWYgKCFfLmlzTmlsKHR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbGVydHNPcHRpb25zW3R5cGVdLnRpbWVPdXQgPSBkZWxheVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hbGVydHNPcHRpb25zLmRlZmF1bHRPcHRpb25zLnRpbWVPdXQgPSBkZWxheVxuICAgIH1cbiAgfVxuXG4gIHNldEVycm9yVGltZW91dChkZWxheSkge1xuICAgIHJldHVybiB0aGlzLnNldFRpbWVvdXQoZGVsYXksICdlcnJvcicpXG4gIH1cbn1cblxuQWxlcnRzLiRpbmplY3QgPSBbJ2FsZXJ0VGltZW91dCddXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGNvbW1vbk1vZHVsZSBmcm9tICcuLi9jb21tb25Nb2R1bGUnXG5cbi8vIEJ1dHRvbiB3aGljaCBhY3RzIGFzIGJyb3dzZXIncyBoaXN0b3J5IGJhY2sgYnV0dG9uXG5hbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpLmRpcmVjdGl2ZSgnYWdCYWNrQnV0dG9uJywgW1xuICAnJHdpbmRvdycsICR3aW5kb3cgPT4gKHtcbiAgICByZXN0cmljdDogJ0EnLFxuXG4gICAgbGluayhzY29wZSwgZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICByZXR1cm4gJHdpbmRvdy5oaXN0b3J5LmJhY2soKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi4vY29tbW9uTW9kdWxlJ1xuXG5hbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpLmRpcmVjdGl2ZSgnaWVTZWxlY3RGaXgnLCBbJyR3aW5kb3cnLCAkd2luZG93ID0+ICh7XG4gIHJlc3RyaWN0OiAnQScsXG5cbiAgbGluayhzY29wZSwgZWxlbSwgYXR0cnMpIHtcbiAgICByZXR1cm4gZWxlbS5iaW5kKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKCR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFIDknKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbSkubWFwKChvcHRpb24pID0+IG9wdGlvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvcHRpb24sIG9wdGlvbikpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IHJlc291cmNlTW9kdWxlIGZyb20gJy4vcmVzb3VyY2VNb2R1bGUnXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShyZXNvdXJjZU1vZHVsZSlcblxuYXBwLnByb3ZpZGVyKCdSb3V0ZXNTZXJ2JywgW1xuICAnJHJvdXRlUHJvdmlkZXInLFxuICAnUmVzb3VyY2VUZW1wbGF0ZVNlcnYnLFxuICBmdW5jdGlvbigkcm91dGVQcm92aWRlciwgUmVzb3VyY2VUZW1wbGF0ZVNlcnYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3NldFJvdXRlcycocGF0aCkge1xuICAgICAgICB0aGlzLnNldE90aGVyd2lzZShwYXRoLm90aGVyd2lzZSlcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgcmV0dXJuIF8uZm9yRWFjaChwYXRoLCAodiwgaykgPT4gXy5mb3JFYWNoKHYsIChkYXRhLCB1cmwpID0+ICRyb3V0ZVByb3ZpZGVyLndoZW4odXJsLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6IFJlc291cmNlVGVtcGxhdGVTZXJ2KCcvJyArIGssIGRhdGEucGFnZSksXG4gICAgICAgICAgY29udHJvbGxlcjogc2VsZi5nZXRDb250cm9sbGVyTmFtZShkYXRhKVxuICAgICAgICB9XG4gICAgICAgICkpKVxuICAgICAgfSxcbiAgICAgIGdldENvbnRyb2xsZXJOYW1lKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuY29udHJvbGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuY29udHJvbGxlclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBkYXRhLnBhZ2UuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkYXRhLnBhZ2Uuc2xpY2UoMSkgKyAnQ3RybCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdzZXRPdGhlcndpc2UnKHVybCkge1xuICAgICAgICBpZiAodXJsID09IG51bGwpIHsgdXJsID0gJy8nIH1cbiAgICAgICAgcmV0dXJuICRyb3V0ZVByb3ZpZGVyLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86IHVybCB9KVxuICAgICAgfSxcbiAgICAgICckZ2V0JygpIHt9XG4gICAgfVxuICB9XG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbnJlcXVpcmUoJ1NlbGVjdDIvc2VsZWN0Mi5qcycpXG5cbi8qKlxuICogQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktc2VsZWN0MiBhbmQgbW9kaWZlZCBmb3IgZXM2IG1vZHVsZXMuXG4gKiBUT0RPIHN0aWxsIG5lZWQgdG8gZml4IGZhaWxpbmcgdGVzdHNcbiAqL1xuLyoqXG4gKiBFbmhhbmNlZCBTZWxlY3QyIERyb3BtZW51c1xuICpcbiAqIEBBSkFYIE1vZGUgLSBXaGVuIGluIHRoaXMgbW9kZSwgeW91ciB2YWx1ZSB3aWxsIGJlIGFuIG9iamVjdCAob3IgYXJyYXkgb2Ygb2JqZWN0cykgb2YgdGhlIGRhdGEgdXNlZCBieSBTZWxlY3QyXG4gKiAgICAgVGhpcyBjaGFuZ2UgaXMgc28gdGhhdCB5b3UgZG8gbm90IGhhdmUgdG8gZG8gYW4gYWRkaXRpb25hbCBxdWVyeSB5b3Vyc2VsZiBvbiB0b3Agb2YgU2VsZWN0MidzIG93biBxdWVyeVxuICogQHBhcmFtcyBbb3B0aW9uc10ge29iamVjdH0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBwYXNzZWQgdG8gJC5mbi5zZWxlY3QyKCkuIFJlZmVyIHRvIHRoZSBkb2N1bWVudGF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICd1aS5zZWxlY3QyJ1xuXG5hbmd1bGFyLm1vZHVsZSgndWkuc2VsZWN0MicsIFtdKVxuICAudmFsdWUoJ3VpU2VsZWN0MkNvbmZpZycsIHt9KVxuICAuZGlyZWN0aXZlKCd1aVNlbGVjdDInLCBmdW5jdGlvbih1aVNlbGVjdDJDb25maWcsICR0aW1lb3V0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7fVxuICAgIGlmICh1aVNlbGVjdDJDb25maWcpIHtcbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMsIHVpU2VsZWN0MkNvbmZpZylcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgIHByaW9yaXR5OiAxLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24odEVsbSwgdEF0dHJzKSB7XG4gICAgICAgIHZhciB3YXRjaFxuICAgICAgICB2YXIgcmVwZWF0T3B0aW9uXG4gICAgICAgIHZhciByZXBlYXRBdHRyXG4gICAgICAgIHZhciBpc1NlbGVjdCA9IHRFbG0uaXMoJ3NlbGVjdCcpXG4gICAgICAgIHZhciBpc011bHRpcGxlID0gYW5ndWxhci5pc0RlZmluZWQodEF0dHJzLm11bHRpcGxlKVxuXG4gICAgICAgIC8vIEVuYWJsZSB3YXRjaGluZyBvZiB0aGUgb3B0aW9ucyBkYXRhc2V0IGlmIGluIHVzZVxuICAgICAgICBpZiAodEVsbS5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICByZXBlYXRPcHRpb24gPSB0RWxtLmZpbmQoJ29wdGdyb3VwW25nLXJlcGVhdF0sIG9wdGdyb3VwW2RhdGEtbmctcmVwZWF0XSwgb3B0aW9uW25nLXJlcGVhdF0sIG9wdGlvbltkYXRhLW5nLXJlcGVhdF0nKVxuXG4gICAgICAgICAgaWYgKHJlcGVhdE9wdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcGVhdEF0dHIgPSByZXBlYXRPcHRpb24uYXR0cignbmctcmVwZWF0JykgfHwgcmVwZWF0T3B0aW9uLmF0dHIoJ2RhdGEtbmctcmVwZWF0JylcbiAgICAgICAgICAgIHdhdGNoID0galF1ZXJ5LnRyaW0ocmVwZWF0QXR0ci5zcGxpdCgnfCcpWzBdKS5zcGxpdCgnICcpLnBvcCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbG0sIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAvLyBpbnN0YW5jZS1zcGVjaWZpYyBvcHRpb25zXG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBvcHRpb25zLCBzY29wZS4kZXZhbChhdHRycy51aVNlbGVjdDIpKVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgIENvbnZlcnQgZnJvbSBTZWxlY3QyIHZpZXctbW9kZWwgdG8gQW5ndWxhciB2aWV3LW1vZGVsLlxuICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgY29udmVydFRvQW5ndWxhck1vZGVsID0gZnVuY3Rpb24oc2VsZWN0Ml9kYXRhKSB7XG4gICAgICAgICAgICAgIHZhciBtb2RlbFxuICAgICAgICAgICAgICBpZiAob3B0cy5zaW1wbGVfdGFncykge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gW11cbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2VsZWN0Ml9kYXRhLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgIG1vZGVsLnB1c2godmFsdWUuaWQpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gc2VsZWN0Ml9kYXRhXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgQ29udmVydCBmcm9tIEFuZ3VsYXIgdmlldy1tb2RlbCB0byBTZWxlY3QyIHZpZXctbW9kZWwuXG4gICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBjb252ZXJ0VG9TZWxlY3QyTW9kZWwgPSBmdW5jdGlvbihhbmd1bGFyX2RhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIG1vZGVsID0gW11cbiAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyX2RhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChvcHRzLnNpbXBsZV90YWdzKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSBbXVxuXG5cbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICBhbmd1bGFyX2RhdGEsXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwucHVzaCh7IGlkOiB2YWx1ZSwgdGV4dDogdmFsdWUgfSlcbiAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IGFuZ3VsYXJfZGF0YVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBtb2RlbFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgLy8gVXNlIDxzZWxlY3QgbXVsdGlwbGU+IGluc3RlYWRcbiAgICAgICAgICAgICAgZGVsZXRlIG9wdHMubXVsdGlwbGVcbiAgICAgICAgICAgICAgZGVsZXRlIG9wdHMuaW5pdFNlbGVjdGlvblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgIG9wdHMubXVsdGlwbGUgPSB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbkZ1bmMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgZWxtLnNlbGVjdDIoJ3ZhbCcsIGNvbnRyb2xsZXIuJHZpZXdWYWx1ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICBpZiAob3B0cy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRpc0VtcHR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbHVlIHx8IHZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3VmFsdWUgPSBjb250cm9sbGVyLiR2aWV3VmFsdWVcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZpZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2aWV3VmFsdWUgPSB2aWV3VmFsdWUuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWxtLnNlbGVjdDIoJ2RhdGEnLCBjb252ZXJ0VG9TZWxlY3QyTW9kZWwodmlld1ZhbHVlKSlcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zb3J0YWJsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgZWxtLnNlbGVjdDIoJ2NvbnRhaW5lcicpLmZpbmQoJ3VsLnNlbGVjdDItY2hvaWNlcycpLnNvcnRhYmxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtLnNlbGVjdDIoJ29uU29ydFN0YXJ0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlbG0uc2VsZWN0Mignb25Tb3J0RW5kJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtLnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QoY29udHJvbGxlci4kdmlld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGVsbS5zZWxlY3QyKCdkYXRhJywgY29udHJvbGxlci4kdmlld1ZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFjb250cm9sbGVyLiR2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBlbG0uc2VsZWN0MignZGF0YScsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZWxtLnNlbGVjdDIoJ3ZhbCcsIGNvbnRyb2xsZXIuJHZpZXdWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuJHJlbmRlciA9IHJlbkZ1bmNcblxuICAgICAgICAgICAgICAvLyBXYXRjaCB0aGUgbW9kZWwgZm9yIHByb2dyYW1tYXRpYyBjaGFuZ2VzXG4gICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCh0QXR0cnMubmdNb2RlbCwgZnVuY3Rpb24oY3VycmVudCwgb2xkKSB7XG5cbiAgICAgICAgICAgICAgICAvKiBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNFcXVhbChjdXJyZW50LG9sZCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZW5GdW5jKClcbiAgICAgICAgICAgICAgfSwgdHJ1ZSlcblxuXG4gICAgICAgICAgICAgIC8vIFdhdGNoIHRoZSBvcHRpb25zIGRhdGFzZXQgZm9yIGNoYW5nZXNcblxuICAgICAgICAgICAgICBpZiAod2F0Y2gpIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCh3YXRjaCwgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwsIHNjb3BlKSB7XG5cbiAgICAgICAgICAgICAgICAgIC8qaWYgKGFuZ3VsYXIuZXF1YWxzKG5ld1ZhbCwgb2xkVmFsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgICAgLy8gRGVsYXllZCBzbyB0aGF0IHRoZSBvcHRpb25zIGhhdmUgdGltZSB0byBiZSByZW5kZXJlZFxuICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZWxlY3QyKCd2YWwnLCBjb250cm9sbGVyLiR2aWV3VmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggYW5ndWxhciB0byByZW1vdmUgdGhlIHN1cGVyZmx1b3VzIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICByZW5GdW5jKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCAmJiAhb2xkVmFsICYmIGNvbnRyb2xsZXIuJHNldFByaXN0aW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kc2V0UHJpc3RpbmUodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFpc1NlbGVjdCkge1xuXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB2aWV3IGFuZCBtb2RlbCB2YWx1ZSBhbmQgdXBkYXRlIHRoZSBhbmd1bGFyIHRlbXBsYXRlIG1hbnVhbGx5IGZvciB0aGUgYWpheC9tdWx0aXBsZSBzZWxlY3QyLlxuICAgICAgICAgICAgICAgIGVsbS5iaW5kKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICAgICAgICAgIGlmIChzY29wZS4kJHBoYXNlIHx8IHNjb3BlLiRyb290LiQkcGhhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kc2V0Vmlld1ZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRUb0FuZ3VsYXJNb2RlbChlbG0uc2VsZWN0MignZGF0YScpKSlcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmluaXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgIHZhciBpbml0U2VsZWN0aW9uID0gb3B0cy5pbml0U2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICBvcHRzLmluaXRTZWxlY3Rpb24gPSBmdW5jdGlvbihlbGVtZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBpbml0U2VsZWN0aW9uKGVsZW1lbnQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGlzUHJpc3RpbmUgPSBjb250cm9sbGVyLiRwcmlzdGluZVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJHNldFZpZXdWYWx1ZShjb252ZXJ0VG9Bbmd1bGFyTW9kZWwodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByaXN0aW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLiRzZXRQcmlzdGluZSgpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGVsbS5wcmV2KCkudG9nZ2xlQ2xhc3MoJ25nLXByaXN0aW5lJywgY29udHJvbGxlci4kcHJpc3RpbmUpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsbS5iaW5kKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBlbG0uc2VsZWN0MignZGVzdHJveScpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZGlzYWJsZWQnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICBlbG0uc2VsZWN0MignZW5hYmxlJywgIXZhbHVlKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ3JlYWRvbmx5JywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgZWxtLnNlbGVjdDIoJ3JlYWRvbmx5JywgISF2YWx1ZSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChhdHRycy5uZ011bHRpcGxlKSB7XG4gICAgICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ011bHRpcGxlLCBmdW5jdGlvbihuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICBhdHRycy4kc2V0KCdtdWx0aXBsZScsICEhbmV3VmFsKVxuICAgICAgICAgICAgICAgIGVsbS5zZWxlY3QyKG9wdHMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHBsdWdpbiBsYXRlIHNvIHRoYXQgdGhlIGluamVjdGVkIERPTSBkb2VzIG5vdCBkaXNydXB0IHRoZSB0ZW1wbGF0ZSBjb21waWxlclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgZWxtLnNlbGVjdDIob3B0cylcblxuICAgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZSAtIEknbSBub3Qgc3VyZSBhYm91dCB0aGlzIGJ1dCBpdCBzZWVtcyB0byBuZWVkIHRvIGJlIHRoZXJlXG4gICAgICAgICAgICAgIGVsbS5zZWxlY3QyKCdkYXRhJywgY29udHJvbGxlci4kbW9kZWxWYWx1ZSlcbiAgICAgICAgICAgICAgLy8gaW1wb3J0YW50IVxuICAgICAgICAgICAgICBjb250cm9sbGVyLiRyZW5kZXIoKVxuXG4gICAgICAgICAgICAgIC8vIE5vdCBzdXJlIGlmIEkgc2hvdWxkIGp1c3QgY2hlY2sgZm9yICFpc1NlbGVjdCBPUiBpZiBJIHNob3VsZCBjaGVjayBmb3IgJ3RhZ3MnIGtleVxuICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5pdFNlbGVjdGlvbiAmJiAhaXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNQcmlzdGluZSA9IGNvbnRyb2xsZXIuJHByaXN0aW5lXG4gICAgICAgICAgICAgICAgY29udHJvbGxlci4kcHJpc3RpbmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuJHNldFZpZXdWYWx1ZShcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnRUb0FuZ3VsYXJNb2RlbChlbG0uc2VsZWN0MignZGF0YScpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBpZiAoaXNQcmlzdGluZSkge1xuICAgICAgICAgICAgICAgICAgY29udHJvbGxlci4kc2V0UHJpc3RpbmUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbG0ucHJldigpLnRvZ2dsZUNsYXNzKCduZy1wcmlzdGluZScsIGNvbnRyb2xsZXIuJHByaXN0aW5lKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxtLCBhdHRycywgY29udHJvbGxlcikge1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdmFsaWQgYW5kIGRpcnR5IHN0YXR1c2VzXG4gICAgICAgICAgICBjb250cm9sbGVyLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGRpdiA9IGVsbS5wcmV2KClcbiAgICAgICAgICAgICAgZGl2XG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCduZy1pbnZhbGlkJywgIWNvbnRyb2xsZXIuJHZhbGlkKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnbmctdmFsaWQnLCBjb250cm9sbGVyLiR2YWxpZClcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ25nLWludmFsaWQtcmVxdWlyZWQnLCAhY29udHJvbGxlci4kdmFsaWQpXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCduZy12YWxpZC1yZXF1aXJlZCcsIGNvbnRyb2xsZXIuJHZhbGlkKVxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnbmctZGlydHknLCBjb250cm9sbGVyLiRkaXJ0eSlcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ25nLXByaXN0aW5lJywgY29udHJvbGxlci4kcHJpc3RpbmUpXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uLy4uL2dyaWR6TW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKGdyaWR6TW9kdWxlKVxuXG5ncmlkei5kaXJlY3RpdmUoJ2FnR3JpZCcsIFtcbiAgJyR0aW1lb3V0JywgJyRsb2cnLCAnJHBhcnNlJywgJ2FnR3JpZERhdGFMb2FkZXInLCAnQWN0aW9uUG9wdXBIYW5kbGVyJywgJ3BhdGhXaXRoQ29udGV4dCcsICdjYW1lbGl6ZScsXG4gIGZ1bmN0aW9uKCR0aW1lb3V0LCAkbG9nLCAkcGFyc2UsIGFnR3JpZERhdGFMb2FkZXIsIEFjdGlvblBvcHVwSGFuZGxlciwgcGF0aFdpdGhDb250ZXh0LCBjYW1lbGl6ZSkge1xuICAgIGNvbnN0IGxpbmsgPSBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGdyaWRDdHJsKSB7XG4gICAgICAvLyBmaW5kIGdyaWQgcGxhY2Vob2xkZXJcbiAgICAgIGNvbnN0IGdyaWRFbCA9IGVsZW1lbnQuZmluZCgndGFibGUuZ3JpZHonKVxuXG4gICAgICAvLyBwdWJsaXNoIGFnR3JpZCBjb250cm9sbGVyIHRvIHRoZSBwYXJlbnQgc2NvcGVcbiAgICAgIGNvbnN0IGFsaWFzID0gYXR0cnMuYWdHcmlkTmFtZVxuICAgICAgaWYgKGFsaWFzKSB7ICRwYXJzZShhbGlhcykuYXNzaWduKHNjb3BlLCBncmlkQ3RybCkgfVxuICAgICAgJHBhcnNlKCckZ3JpZCcpLmFzc2lnbihzY29wZSwgZ3JpZEN0cmwpIC8vIE1ha2UgdGhlIGdyaWQgYXZhaWxhYmxlIHRvIGNvbnRyb2xsZXJzIGFzICRzY29wZS4kZ3JpZFxuXG4gICAgICAvLyByZWFkIGdyaWQgb3B0aW9uc1xuICAgICAgY29uc3Qgb3B0aW9ucyA9ICRwYXJzZShhdHRycy5hZ0dyaWQpKHNjb3BlKVxuICAgICAgaWYgKCFvcHRpb25zKSB7IHRocm93IG5ldyBFcnJvcigndW5kZWZpbmVkIGdyaWQgb3B0aW9ucycpIH1cblxuICAgICAgLy8gcmVhZCBjb2xNb2RlbCBmcm9tIHRoZSBgYWctZ3JpZC1jb2wtbW9kZWxgIGF0dHJpYnV0ZVxuICAgICAgaWYgKGF0dHJzLmFnR3JpZENvbE1vZGVsKSB7IG9wdGlvbnMuY29sTW9kZWwgPSBhbmd1bGFyLmZyb21Kc29uKGF0dHJzLmFnR3JpZENvbE1vZGVsKSB9XG5cbiAgICAgIC8vIGtpbGwgdGhlIGdyaWQgd2hlbiB0aGUgcmVsYXRlZCBzY29wZSBpcyBkZXN0cm95ZWRcbiAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJGxvZy5kZWJ1ZygnW2FnR3JpZF0gZGVzdHJveWluZyB0aGUgZ3JpZCcsIGdyaWRFbClcbiAgICAgICAgcmV0dXJuIGdyaWRFbC5qcUdyaWQoJ0dyaWREZXN0cm95JylcbiAgICAgIH0pXG5cbiAgICAgIC8vIEluaXRpYWxpemVzIGEgZ3JpZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zXG4gICAgICBjb25zdCBpbml0aWFsaXplR3JpZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkbG9nLmRlYnVnKGBbYWdHcmlkXSBpbml0aWFsaXppbmcgJyR7YWxpYXN9JyB3aXRoYCwgb3B0aW9ucylcblxuICAgICAgICAvLyBhc3NpZ24gdGhlIHVybFxuICAgICAgICBpZiAoISghXy5pc05pbChvcHRpb25zLnVybCkpICYmICghXy5pc05pbChvcHRpb25zLnBhdGgpKSkge1xuICAgICAgICAgIG9wdGlvbnMudXJsID0gcGF0aFdpdGhDb250ZXh0KG9wdGlvbnMucGF0aClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVzZSBgJGh0dHBgIHNlcnZpY2UgdG8gbG9hZCB0aGUgZ3JpZCBkYXRhXG4gICAgICAgIGlmICgob3B0aW9ucy5kYXRhdHlwZSA9PT0gdW5kZWZpbmVkKSB8fCAob3B0aW9ucy5kYXRhdHlwZSA9PT0gbnVsbCkpIHtcbiAgICAgICAgICBvcHRpb25zLmRhdGF0eXBlID0gYWdHcmlkRGF0YUxvYWRlcihvcHRpb25zLnVybCwgZ3JpZEN0cmwpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5kcm9wR3JvdXBpbmcpIHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBncm91cGluZ1ZpZXdcbiAgICAgICAgICB9ID0gb3B0aW9uc1xuICAgICAgICAgIGdyb3VwaW5nVmlldy5ncm91cFRleHQgPSBncm91cGluZ1ZpZXcuZ3JvdXBUZXh0Lm1hcCh2YWx1ZSA9PiAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2JveFwiLz4nICsgdmFsdWUpXG4gICAgICAgICAgZ3JpZEVsLmpxR3JpZCgnc2V0R3JpZFBhcmFtJywgJ2dyb3VwaW5nVmlldycsIGdyb3VwaW5nVmlldylcbiAgICAgICAgfVxuXG4gICAgICAgIGdyaWRFbC5vbignanFHcmlkQWZ0ZXJHcmlkQ29tcGxldGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5kcm9wR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyaWRJZCA9IGFsaWFzXG4gICAgICAgICAgICAkKCd0ci51aS1qcWdyaWQtbGFiZWxzIHRoIGRpdicpLmRyYWdnYWJsZSh7XG4gICAgICAgICAgICAgIGFwcGVuZFRvOiAnYm9keScsXG4gICAgICAgICAgICAgIGhlbHBlcjogJ2Nsb25lJ1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgJChgIyR7YWxpYXN9R3JvdXBEcm9wRG93biBkaXYudGFnZ2VkLWlucHV0YCkuZHJvcHBhYmxlKHtcbiAgICAgICAgICAgICAgYWN0aXZlQ2xhc3M6ICd1aS1zdGF0ZS1kZWZhdWx0JyxcbiAgICAgICAgICAgICAgaG92ZXJDbGFzczogJ3VpLXN0YXRlLWhvdmVyJyxcbiAgICAgICAgICAgICAgYWNjZXB0OiAnOm5vdCgudWktc29ydGFibGUtaGVscGVyKScsXG4gICAgICAgICAgICAgIGRyb3AoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnBsYWNlaG9sZGVyJykucmVtb3ZlKClcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cGluZ0NvbHVtbiA9ICQoXCI8ZGl2IGNsYXNzPSd0YWcnPjwvZGl2PlwiKS5hdHRyKCdkYXRhLWNvbHVtbicsIHVpLmRyYWdnYWJsZS5hdHRyKCdpZCcpLnJlcGxhY2UoJ2pxZ2hfJyArIGdyaWRJZCArICdfJywgJycpKVxuICAgICAgICAgICAgICAgICQoJzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4gPC9pPicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgJCgnIycgKyBncmlkSWQpLmpxR3JpZCgnZ3JvdXBpbmdSZW1vdmUnKVxuICAgICAgICAgICAgICAgICAgJCgnIycgKyBncmlkSWQpLmpxR3JpZCgnZ3JvdXBpbmdHcm91cEJ5JywgJChgIyR7YWxpYXN9R3JvdXBEcm9wRG93biBkaXYudGFnOm5vdCgucGxhY2Vob2xkZXIpYCkubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5hdHRyKCdkYXRhLWNvbHVtbicpXG4gICAgICAgICAgICAgICAgICB9KS5nZXQoKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgaWYgKCQoYCMke2FsaWFzfUdyb3VwRHJvcERvd24gZGl2LnRhZzpub3QoLnBsYWNlaG9sZGVyKWApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwicGxhY2Vob2xkZXJcIj48L2Rpdj4nKS5hcHBlbmRUbygkdGhpcylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRUbyhncm91cGluZ0NvbHVtbilcbiAgICAgICAgICAgICAgICBncm91cGluZ0NvbHVtbi5hcHBlbmQodWkuZHJhZ2dhYmxlLnRleHQoKSlcbiAgICAgICAgICAgICAgICBncm91cGluZ0NvbHVtbi5hcHBlbmRUbygkdGhpcylcbiAgICAgICAgICAgICAgICAkKCcjJyArIGdyaWRJZCkuanFHcmlkKCdncm91cGluZ1JlbW92ZScpXG4gICAgICAgICAgICAgICAgJCgnIycgKyBncmlkSWQpLmpxR3JpZCgnZ3JvdXBpbmdHcm91cEJ5JywgJChgIyR7YWxpYXN9R3JvdXBEcm9wRG93biBkaXYudGFnOm5vdCgucGxhY2Vob2xkZXIpYCkubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuICQodGhpcykuYXR0cignZGF0YS1jb2x1bW4nKVxuICAgICAgICAgICAgICAgIH0pLmdldCgpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zb3J0YWJsZSh7XG4gICAgICAgICAgICAgIGl0ZW1zOiAnZGl2LnRhZzpub3QoLnBsYWNlaG9sZGVyKScsXG4gICAgICAgICAgICAgIHNvcnQoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygndWktc3RhdGUtZGVmYXVsdCcpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0b3AoKSB7XG4gICAgICAgICAgICAgICAgJCgnIycgKyBncmlkSWQpLmpxR3JpZCgnZ3JvdXBpbmdSZW1vdmUnKVxuICAgICAgICAgICAgICAgICQoJyMnICsgZ3JpZElkKS5qcUdyaWQoJ2dyb3VwaW5nR3JvdXBCeScsICQoYCMke2FsaWFzfUdyb3VwRHJvcERvd24gZGl2LnRhZzpub3QoLnBsYWNlaG9sZGVyKWApLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLmF0dHIoJ2RhdGEtY29sdW1uJylcbiAgICAgICAgICAgICAgICB9KS5nZXQoKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBZGQgYG1pbmAgY2xhc3MgdG8gcmVtb3ZlIHBhZGluZyB0byBtaW5pbWl6ZSByb3cgaGVpZ2h0XG4gICAgICAgICAgaWYgKG9wdGlvbnMubWluUm93SGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gXy5lYWNoKGdyaWRFbFswXS5yb3dzLCBpdCA9PiBhbmd1bGFyLmVsZW1lbnQoaXQpLmFkZENsYXNzKCdtaW4nKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZ3JvdXBDaGVja0JveCA9ICcuanFncm91cCA+IHRkID4gLmNib3gnXG5cbiAgICAgICAgZ3JpZEVsLm9uKCdqcUdyaWRTZWxlY3RBbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5kcm9wR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICQoJyNjYl8nICsgYWxpYXMpLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkcyA9IGdyaWRFbC5qcUdyaWQoJ2dldEdyaWRQYXJhbScsICdzZWxhcnJyb3cnKVxuICAgICAgICAgICAgcmV0dXJuICQoZ3JvdXBDaGVja0JveCkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpXG4gICAgICAgICAgICAgIGlmIChpc0NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkcy5wdXNoKHJvdy5hdHRyKCdpZCcpKVxuICAgICAgICAgICAgICAgIHJvdy5hZGRDbGFzcygndWktc3RhdGUtaGlnaGxpZ2h0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cucmVtb3ZlQ2xhc3MoJ3VpLXN0YXRlLWhpZ2hsaWdodCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpbml0R3JvdXBDaGVja2JveGVzKGFsaWFzLCBncm91cENoZWNrQm94KVxuXG4gICAgICAgIC8vIGpxR3JpZCBzdWNrcyBhdCB0aGlzIHBvaW50IGl0IGV4cGVjdHMgYHBhZ2VyYCB0byBiZSBhbiBpZFxuICAgICAgICBpZiAob3B0aW9ucy5wYWdlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBvcHRpb25zLnBhZ2VyID0gZWxlbWVudC5maW5kKCcuZ3JpZHotcGFnZXInKS5hdHRyKCdpZCcpIHx8ICdncmlkei1wYWdlcidcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnNlbGVjdEZpcnN0Um93ID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgX2dyaWRDb21wbGV0ZSA9IG9wdGlvbnMuZ3JpZENvbXBsZXRlXG5cbiAgICAgICAgICBjb25zdCBvbkdyaWRDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YUlkcyA9IGdyaWRFbC5nZXREYXRhSURzKClcbiAgICAgICAgICAgIGlmIChkYXRhSWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgZ3JpZEVsLnNldFNlbGVjdGlvbihkYXRhSWRzWzBdLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihfZ3JpZENvbXBsZXRlKSkgeyByZXR1cm4gX2dyaWRDb21wbGV0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRpb25zLmdyaWRDb21wbGV0ZSA9IG9uR3JpZENvbXBsZXRlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0aWFsaXplIGpxR3JpZCBvbiB0aGUgZ2l2ZW4gZWxlbWVudFxuICAgICAgICBncmlkRWwuZ3JpZHoob3B0aW9ucylcbiAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyVG9vbGJhcikge1xuICAgICAgICAgIGdyaWRFbC5qcUdyaWQoJ2ZpbHRlclRvb2xiYXInLCB7XG4gICAgICAgICAgICBiZWZvcmVTZWFyY2goKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0gZ3JpZEVsLmpxR3JpZCgnZ2V0R3JpZFBhcmFtJywgJ3Bvc3REYXRhJylcbiAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEZpbHRlcnMgPSBwb3N0RGF0YS5kZWZhdWx0RmlsdGVycyB8fCBwb3N0RGF0YS5maWx0ZXJzXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSAoXy5leHRlbmQoSlNPTi5wYXJzZShkZWZhdWx0RmlsdGVycyksIChfLnBpY2socG9zdERhdGEsICh2YWx1ZSwga2V5KSA9PiAhWydwYWdlJywgJ2ZpbHRlcnMnLCAnbWF4JywgJ3NvcnQnLCAnb3JkZXInLCAnbmQnLCAnX3NlYXJjaCddLmluY2x1ZGVzKGtleSkpKSkpXG4gICAgICAgICAgICAgIGZpbHRlcnMuZmlyc3RMb2FkID0gZmFsc2VcbiAgICAgICAgICAgICAgcG9zdERhdGEuZGVmYXVsdEZpbHRlcnMgPSBkZWZhdWx0RmlsdGVyc1xuICAgICAgICAgICAgICBwb3N0RGF0YS5maWx0ZXJzID0gSlNPTi5zdHJpbmdpZnkoZmlsdGVycylcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdUb29sYmFyIFNlYXJjaCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXRpYWxpemUgYWN0aW9uUG9wdXAgaGFuZGxlclxuICAgICAgICBBY3Rpb25Qb3B1cEhhbmRsZXIoZ3JpZEVsLCBzY29wZSwgYXR0cnMpXG4gICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdzZWxlY3QnKS53cmFwKCc8c3BhbiBjbGFzcz1cInNlbGVjdC13cmFwcGVyXCI+PC9zcGFuPicpKVxuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWF0ZXMgZ3JvdXAgY2hlY2tib3ggYWN0aW9uLlxuICAgICAgLy8gV2hlbiBhIGdyb3VwIGNoZWNrYm94IGlzIGNoZWNrZWRcbiAgICAgIC8vIHdhbGtzIHRocm91Z2ggcmVjb3JkcyBhbmQgc2VsZWN0cyB0aGVtXG4gICAgICAvLyB1bnRpbCBuZXh0IGdyb3VwIGNoZWNrYm94IGlzIGZvdW5kLlxuICAgICAgdmFyIGluaXRHcm91cENoZWNrYm94ZXMgPSBmdW5jdGlvbihncmlkSWQsIGNoZWNrYm94U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyU2VsZWN0b3IgPSBgLiR7YWxpYXN9Z2hlYWRfMGBcbiAgICAgICAgcmV0dXJuICQoJyMnICsgZ3JpZElkKS5vbignY2hhbmdlJywgY2hlY2tib3hTZWxlY3RvciwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDQiA9ICQodGhpcylcbiAgICAgICAgICBncmlkRWwuc2V0U2VsZWN0aW9uKCQodGhpcykuY2xvc2VzdCgndHInKS5hdHRyKCdpZCcpKVxuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBjdXJyZW50Q0IuY2xvc2VzdCgndHInKS5uZXh0VW50aWwoaGVhZGVyU2VsZWN0b3IpXG4gICAgICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGhlYWRlcnMuZmluZCgnLmNib3hbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgICAgICByZXR1cm4gY2hlY2tib3hlcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdyaWRFbC5zZXRTZWxlY3Rpb24oJCh0aGlzKS5jbG9zZXN0KCd0cicpLmF0dHIoJ2lkJykpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuZHJvcEdyb3VwaW5nKSB7XG4gICAgICAgIGNvbnN0IGRyb3BEb3duc2VjdGlvbiA9IGFuZ3VsYXIuZWxlbWVudChgPGRpdiA+XG48ZGl2IGNsYXNzPSd0YWdnZWQtaW5wdXQnIHN0eWxlPVwibWluLWhlaWdodDogMzVweDsgbWFyZ2luLWJvdHRvbTogLTRweFwiPkRyb3AgaGVhZGVycyBoZXJlPC9kaXY+XG4gPC9kaXY+YFxuICAgICAgICApXG4gICAgICAgIGRyb3BEb3duc2VjdGlvbi5hdHRyKCdpZCcsIGAke2FsaWFzfUdyb3VwRHJvcERvd25gKVxuICAgICAgICBlbGVtZW50LnByZXBlbmQoZHJvcERvd25zZWN0aW9uKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAvLyBFbGVtZW50IGlzIHZpc2libGUsIGluaXRpYWxpemUgdGhlIGdyaWQgbm93XG4gICAgICAgIHJldHVybiBpbml0aWFsaXplR3JpZCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdW5yZWdpc3RlclxuICAgICAgICAkbG9nLmluZm8oJ2dyaWQgaXMgbm90IHZpc2libGU6JywgYWxpYXMpXG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgZ3JpZCB3aGVuIHRoZSBlbGVtZW50IHdpbGwgYmUgdmlzaWJsZVxuICAgICAgICBsZXQgdGltZW91dFByb21pc2UgPSBudWxsXG4gICAgICAgIHJldHVybiB1bnJlZ2lzdGVyID0gc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0UHJvbWlzZSkgLy8gQ2FuY2VsIHByZXZpb3VzIHRpbWVvdXRcblxuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZG8gdGltZW91dCBiZWNhdXNlIG9mIHRoaXMgaXNzdWUgd2l0aCB1aWItdGFiIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL2Jvb3RzdHJhcC9pc3N1ZXMvMzc5NlxuICAgICAgICAgIC8vIE90aGVyd2lzZSB3aGVuIHRhYiBpcyBjbGlja2VkIGFuZCBkaWdlc3QgY3ljbGUgKCR3YXRjaCkgcnVucywgdGhlIGVsZW1lbnQuaXMoXCI6dmlzaWJsZVwiKSBpcyBzdGlsbCBmYWxzZSwgYW5kIGhlbmNlIGdyaWQgaXMgbmV2ZXIgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAgdGltZW91dFByb21pc2UgPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5pcygnOnZpc2libGUnKSkgeyByZXR1cm4gfVxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgZ3JpZCBvbiB0aGUgdmlzaWJsZSBlbGVtZW50XG4gICAgICAgICAgICBpbml0aWFsaXplR3JpZCgpXG5cbiAgICAgICAgICAgIC8vIHVucmVnaXN0ZXIgdGhlIHdhdGNoZXIgdG8gZnJlZSByZXNvdXJjZXNcbiAgICAgICAgICAgIHJldHVybiB1bnJlZ2lzdGVyKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAsIDEwMCwgZmFsc2UpIC8vIEhlcmUgZmFsc2UgbWVhbnMgZG9uJ3QgZmlyZSBuZXcgZGlnZXN0IGN5Y2xlLCBvdGhlcndpc2UgJHdhdGNoIHdpbGwgYmUgY2FsbGVkIGluZmluaXRlbHkuXG5cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcblxuICAgICAgcmVxdWlyZTogJ2FnR3JpZCcsXG4gICAgICBjb250cm9sbGVyOiAnQWdHcmlkQ3RybCcsXG5cbiAgICAgIHRlbXBsYXRlOiBgXFxcbjx0YWJsZSBjbGFzcz1cImdyaWR6XCI+PC90YWJsZT5cbjxkaXYgY2xhc3M9XCJncmlkei1wYWdlclwiPjwvZGl2PlxcXG5gLFxuXG4gICAgICBjb21waWxlKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIC8vIG1vZGlmeSBncmlkIGh0bWwgZWxlbWVudCwgZ2VuZXJhdGUgZ3JpZCBpZCBmcm9tIHRoZSBuYW1lIG9yIGFzc2lnbiBkZWZhdWx0IHZhbHVlXG4gICAgICAgIGNvbnN0IGlkID0gIV8uaXNOaWwoYXR0cnMuYWdHcmlkTmFtZSkgPyBjYW1lbGl6ZShhdHRycy5hZ0dyaWROYW1lKSA6ICdncmlkeidcblxuICAgICAgICBlbGVtZW50LmZpbmQoJ3RhYmxlLmdyaWR6JykuYXR0cignaWQnLCBpZClcbiAgICAgICAgZWxlbWVudC5maW5kKCdkaXYuZ3JpZHotcGFnZXInKS5hdHRyKCdpZCcsIGAke2lkfS1wYWdlcmApXG5cbiAgICAgICAgLy8gcmV0dXJuIGxpbmtpbmcgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgYXQgYSBsYXRlciB0aW1lXG4gICAgICAgIHJldHVybiB7IHBvc3Q6IGxpbmsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbnZhciBmb3JtcyA9IGFuZ3VsYXIubW9kdWxlKGZvcm1zTW9kdWxlKVxuXG5mb3Jtcy5kaXJlY3RpdmUoJ2FnU3VibWl0JywgW1xuICAnJHBhcnNlJywgJyRsb2cnLCAnc2VydmVyVmFsaWRhdGlvbkVycm9yc0hhbmRsZXInLFxuICAoJHBhcnNlLCAkbG9nLCBzZXJ2ZXJWYWxpZGF0aW9uRXJyb3JzSGFuZGxlcikgPT4gKHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICdmb3JtJyxcblxuICAgIGNvbXBpbGUoZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIGNvbnN0IG9uU3VibWl0ID0gJHBhcnNlKGF0dHJzLmFnU3VibWl0KVxuICAgICAgZm9ybXMgPSBbXVxuICAgICAgdmFyIG1hcmtBc1N1Ym1pdHRlZCA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgICAgZm9ybS4kc3VibWl0dGVkID0gdHJ1ZVxuICAgICAgICAvLyB0byBhdm9pZCBzaXR1YXRpb24gd2l0aCB0b28gbXVjaCByZWN1cnNpb24sIGNoZWNrIGlmIHRoZSBmb3JtIGlzIGFscmVhZHkgcHJvY2Vzc2VkLCBzZWUgYmVsb3dcbiAgICAgICAgZm9ybXMucHVzaChmb3JtKVxuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCAgYWxsIG5lc3RlZCBmb3JtcyBhbmQgbWFyayB0aGVtIGFzIHN1Ym1pdHRlZFxuICAgICAgICBjb25zdCBuZXN0ZWRGb3JtcyA9IF8uZmlsdGVyKF8udmFsdWVzKGZvcm0pLCBpbnB1dCA9PiAoX19ndWFyZF9fKF9fZ3VhcmRfXyhpbnB1dCAhPSBudWxsID8gaW5wdXQuJCRlbGVtZW50IDogdW5kZWZpbmVkLCB4MSA9PiB4MVswXSksIHggPT4geC50YWdOYW1lKSA9PT0gJ0ZPUk0nKSAmJiAoIUFycmF5LmZyb20oZm9ybXMpLmluY2x1ZGVzKGlucHV0KSkpXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5lc3RlZEZvcm1zKS5tYXAoKG5lc3RlZEZvcm0pID0+IG1hcmtBc1N1Ym1pdHRlZChuZXN0ZWRGb3JtKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGZvcm1DdHJsKSA9PiBlbGVtZW50Lm9uKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAkbG9nLmRlYnVnKCdbZm9ybXNdIHN1Ym1pdHRpbmcgZm9ybScsIGZvcm1DdHJsLiRuYW1lLCBlbGVtZW50LCBmb3JtQ3RybClcblxuICAgICAgICAvLyBtYXJrIHRoZSBmb3JtIGFzIHN1Ym1pdHRlZFxuICAgICAgICBzY29wZS4kYXBwbHkoKCkgPT4gbWFya0FzU3VibWl0dGVkKGZvcm1DdHJsKSlcblxuICAgICAgICAvLyBkbyBub3RoaW5nIHdoZW4gdGhlIGZvcm0gaXMgaW52YWxpZFxuICAgICAgICBpZiAoZm9ybUN0cmwuJGludmFsaWQpIHsgcmV0dXJuIH1cblxuICAgICAgICAvLyBzdWJtaXQgdGhlIGZvcm0gYW5kIGhhbmRsZSBhIHByb21pc2UgYWxvbmcgd2l0aCByZXNvdXJjZVxuICAgICAgICBjb25zdCByZXN1bHQgPSBfLmZsYXR0ZW4oW29uU3VibWl0KHNjb3BlLCB7ICRldmVudDogZXZlbnQgfSldKVxuICAgICAgICBjb25zdCBbcHJvbWlzZSwgcmVzb3VyY2VdID0gQXJyYXkuZnJvbShyZXN1bHQpXG5cbiAgICAgICAgLy8gVE9ETyB1c2UgYCRxLndoZW5gXG4gICAgICAgIGlmIChwcm9taXNlICYmIGFuZ3VsYXIuaXNPYmplY3QocHJvbWlzZSkpIHtcbiAgICAgICAgICAvLyBkaXNhYmxlL2VuYWJsZSBmb3JtIGNvbnRyb2xzXG4gICAgICAgICAgZm9ybUN0cmwuJHNhdmluZyA9IHRydWVcbiAgICAgICAgICBjb25zdCBmaW5hbGx5UHJvbSA9IHByb21pc2UuZmluYWxseSgoKSA9PiBmb3JtQ3RybC4kc2F2aW5nID0gZmFsc2UpXG5cbiAgICAgICAgICBmaW5hbGx5UHJvbS50aGVuKGFuZ3VsYXIubm9vcCwgYW5ndWxhci5ub29wKVxuXG4gICAgICAgICAgLy8gb24gc3VjY2VzczogcmVzZXQgdGhlIGZvcm1cbiAgICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZm9ybUN0cmwuJHNldFByaXN0aW5lKClcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1DdHJsLiRzdWJtaXR0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgKCkgPT4gZmFsc2UpXG5cbiAgICAgICAgICAvLyBvbiBlcnJvcjogaGFuZGxlIHNlcnZlciBzaWRlIGVycm9yc1xuICAgICAgICAgIHJldHVybiBwcm9taXNlLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNGdW5jdGlvbihyZXNvdXJjZSAhPSBudWxsID8gcmVzb3VyY2UucmVzb3VyY2VOYW1lIDogdW5kZWZpbmVkKSkgeyByZXR1cm4gfVxuICAgICAgICAgICAgcmV0dXJuIHNlcnZlclZhbGlkYXRpb25FcnJvcnNIYW5kbGVyKGZvcm1DdHJsLCByZXNwb25zZSwgcmVzb3VyY2UucmVzb3VyY2VOYW1lKCkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5dKVxuXG5mdW5jdGlvbiBfX2d1YXJkX18odmFsdWUsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwpID8gdHJhbnNmb3JtKHZhbHVlKSA6IHVuZGVmaW5lZFxufVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBncmlkek1vZHVsZSBmcm9tICcuLi9ncmlkek1vZHVsZSdcblxuY29uc3QgZ3JpZHogPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuY2xhc3MgTWFuYWdlR3JpZENvbHVtbnNDdHJsIHtcbiAgc3RhdGljIGluaXRDbGFzcygpIHtcbiAgICB0aGlzLiRpbmplY3QgPSBbJyRzY29wZSddXG4gIH1cblxuICBjb25zdHJ1Y3Rvcigkc2NvcGUpIHtcbiAgICAvLyBOYW1lcyBvZiBjb2x1bW5zIHdoaWNoIGFyZSBub3QgZGlzcGxheWVkIGF0IHRoZSBcIk1hbmFnZSBDb2x1bW5zXCIgbW9kYWwuXG4gICAgLy8gVGhlc2UgY29sdW1ucyBhcmUgcGxhY2VkIGF0IGZpcnN0IHBvc2l0aW9ucyBvZiBhIGdyaWQuXG4gICAgY29uc3Qgc3lzdGVtQ29sdW1ucyA9IFtcbiAgICAgICdjYicsXG4gICAgICAnLXJvd19hY3Rpb25fY29sJ1xuICAgIF1cblxuICAgIGxldCBncmlkRWwgPSAkc2NvcGUuZ3JpZC5nZXRHcmlkRWwoKVxuICAgIGNvbnN0IHtcbiAgICAgIGNvbE1vZGVsXG4gICAgfSA9IGdyaWRFbC5qcUdyaWQoJ2dldEdyaWRQYXJhbScpXG4gICAgJHNjb3BlLmdyaWRDb2x1bW5zID0ge1xuICAgICAgYXZhaWxhYmxlOiBbXSxcbiAgICAgIGRpc3BsYXllZDogW11cbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudCA9IG51bGxcbiAgICBjb2xNb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGdyaWRDb2x1bW4sIGluZGV4KSB7XG4gICAgICBpZiAoIXN5c3RlbUNvbHVtbnMuaW5jbHVkZXMoZ3JpZENvbHVtbi5uYW1lKSkge1xuICAgICAgICBlbGVtZW50ID0geyBvcmlnaW5hbElkOiBpbmRleCwgbGFiZWw6IGdyaWRDb2x1bW4ubGFiZWwsIG5hbWU6IGdyaWRDb2x1bW4ubmFtZSB9XG4gICAgICAgIGlmIChncmlkQ29sdW1uLmhpZGRlbikge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuZ3JpZENvbHVtbnMuYXZhaWxhYmxlLnB1c2goZWxlbWVudClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmdyaWRDb2x1bW5zLmRpc3BsYXllZC5wdXNoKGVsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgJHNjb3BlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGdyaWRFbCA9ICRzY29wZS5ncmlkLmdldEdyaWRFbCgpXG5cbiAgICAgIGNvbnN0IG5ld0NvbHVtbnNPcmRlciA9IFtdXG4gICAgICBjb25zdCBkaXNwbGF5ZWRDb2x1bW5zID0gW11cbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnMgPSBbXVxuXG4gICAgICBjb2xNb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHN5c3RlbUNvbHVtbnMuaW5jbHVkZXMoY29sdW1uLm5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld0NvbHVtbnNPcmRlci5wdXNoKGluZGV4KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAkc2NvcGUuZ3JpZENvbHVtbnMuZGlzcGxheWVkLmZvckVhY2goZnVuY3Rpb24oY29sdW1uLCBpbmRleCkge1xuICAgICAgICBkaXNwbGF5ZWRDb2x1bW5zLnB1c2goY29sdW1uLm5hbWUpXG4gICAgICAgIHJldHVybiBuZXdDb2x1bW5zT3JkZXIucHVzaChjb2x1bW4ub3JpZ2luYWxJZClcbiAgICAgIH0pXG5cbiAgICAgICRzY29wZS5ncmlkQ29sdW1ucy5hdmFpbGFibGUuZm9yRWFjaChmdW5jdGlvbihjb2x1bW4sIGluZGV4KSB7XG4gICAgICAgIGhpZGRlbkNvbHVtbnMucHVzaChjb2x1bW4ubmFtZSlcbiAgICAgICAgcmV0dXJuIG5ld0NvbHVtbnNPcmRlci5wdXNoKGNvbHVtbi5vcmlnaW5hbElkKVxuICAgICAgfSlcblxuICAgICAgZ3JpZEVsLnJlbWFwQ29sdW1ucyhuZXdDb2x1bW5zT3JkZXIsIHRydWUpXG4gICAgICBncmlkRWwuanFHcmlkKCdzaG93Q29sJywgZGlzcGxheWVkQ29sdW1ucylcbiAgICAgIGdyaWRFbC5qcUdyaWQoJ2hpZGVDb2wnLCBoaWRkZW5Db2x1bW5zKVxuICAgICAgcmV0dXJuICRzY29wZS5tYW5hZ2VDb2x1bW5zTW9kYWwuY2xvc2UoKVxuICAgIH1cblxuICAgICRzY29wZS5jYW5jZWwgPSAoKSA9PiAkc2NvcGUubWFuYWdlQ29sdW1uc01vZGFsLmNsb3NlKClcbiAgfVxufVxuTWFuYWdlR3JpZENvbHVtbnNDdHJsLmluaXRDbGFzcygpXG5cbmdyaWR6LmNvbnRyb2xsZXIoJ01hbmFnZUdyaWRDb2x1bW5zQ3RybCcsIE1hbmFnZUdyaWRDb2x1bW5zQ3RybClcblxuZ3JpZHouZGlyZWN0aXZlKCdhZ01hbmFnZUdyaWRDb2x1bW5zJywgW1xuICAnJHVpYk1vZGFsJywgJ3BhdGhXaXRoQ29udGV4dCcsXG4gICgkdWliTW9kYWwsIHBhdGhXaXRoQ29udGV4dCkgPT4gKHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgcmVwbGFjZTogdHJ1ZSxcblxuICAgIHNjb3BlOiB7XG4gICAgICBncmlkOiAnPSdcbiAgICB9LFxuXG4gICAgbGluayhzY29wZSkge1xuICAgICAgcmV0dXJuIHNjb3BlLnJlbmRlck1hbmFnZUNvbHVtbnNNb2RhbCA9ICgpID0+IHNjb3BlLm1hbmFnZUNvbHVtbnNNb2RhbCA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgY29udHJvbGxlcjogJ01hbmFnZUdyaWRDb2x1bW5zQ3RybCcsXG4gICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICBiYWNrZHJvcDogJ3N0YXRpYycsXG4gICAgICAgIHNjb3BlLFxuICAgICAgICB0ZW1wbGF0ZTogYFxcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWNvbHVtbnMtbW9kYWxcIj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIG5nLWNsaWNrPVwiY2FuY2VsKClcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICA8aDM+TWFuYWdlIENvbHVtbnM8L2gzPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgPGRpdiBuZy1yZXBlYXQ9XCIobGlzdE5hbWUsIGxpc3QpIGluIGdyaWRDb2x1bW5zXCIgY2xhc3M9XCJjb2wtbWQtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1pbmZvXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwYW5lbC10aXRsZVwiPnt7bGlzdE5hbWV9fSBjb2x1bW5zPC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5IHNpbXBsZURlbW9cIj5cblxuICAgICAgICAgICAgICAgICAgPHVsIGRuZC1saXN0PVwibGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaSBuZy1yZXBlYXQ9XCJpdGVtIGluIGxpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBkbmQtZHJhZ2dhYmxlPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRuZC1tb3ZlZD1cImxpc3Quc3BsaWNlKCRpbmRleCwgMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBkbmQtZWZmZWN0LWFsbG93ZWQ9XCJtb3ZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbS5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgIDxhZy1jYW5jZWwtYnV0dG9uIG5nLWNsaWNrPVwiY2FuY2VsKClcIj48L2FnLWNhbmNlbC1idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1wcmltYXJ5XCIgbmctY2xpY2s9XCJzYXZlKClcIj48aSBjbGFzcz1cImZhIGZhLWNoZWNrIGZhLWludmVyc2VcIj48L2k+IFNhdmU8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cXFxuYFxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IGBcXFxuPGEgbmctY2xpY2s9XCJyZW5kZXJNYW5hZ2VDb2x1bW5zTW9kYWwoKVwiPlxuICA8aSBjbGFzcz1cImZhIGZhLWV4Y2hhbmdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdWliLXRvb2x0aXA9J1Nob3csIGhpZGUgb3IgcmVvcmRlciBjb2x1bW5zJz48L2k+XG48L2E+XFxcbmBcbiAgfSlcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uL2dyaWR6TW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgZ3JpZHogPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuLy8gUmV0dW5ycyB0cnVlIGlmIGBmaWx0ZXJzYCBjb250YWluIGF0IGxlYXN0IG9uZSBub24tZW1wdHkgc2VhcmNoIGZpZWxkXG5ncmlkei52YWx1ZSgnaGFzU2VhcmNoRmlsdGVycycsIGZ1bmN0aW9uKGZpbHRlcnMpIHtcbiAgZm9yIChjb25zdCBrIGluIGZpbHRlcnMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGZpbHRlcnNba11cbiAgICBpZiAoXy5pc05pbCh2YWx1ZSkpIHsgY29udGludWUgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICgkLnRyaW0odmFsdWUpICE9PSAnJykgeyByZXR1cm4gdHJ1ZSB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5ncmlkei5kaXJlY3RpdmUoJ2FnU2VhcmNoQnV0dG9uJywgKCkgPT4gKHtcbiAgcmVzdHJpY3Q6ICdFJyxcbiAgcmVwbGFjZTogdHJ1ZSxcblxuICB0ZW1wbGF0ZTogYFxcXG48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBuZy1jbGljaz1cImFkdmFuY2VkU2VhcmNoKGZpbHRlcnMpXCIgbmctZGlzYWJsZWQ9XCJzZWFyY2hpbmdcIiBjbGFzcz1cImJ0biBidG4taW5mb1wiPlxuICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaCBmYS1pbnZlcnNlXCI+PC9pPiBTZWFyY2g8c3BhbiBuZy1zaG93PVwic2VhcmNoaW5nXCI+Li4uPC9zcGFuPlxuPC9idXR0b24+XFxcbmBcbn0pKVxuXG5ncmlkei5kaXJlY3RpdmUoJ2FnUmVzZXRTZWFyY2hCdXR0b24nLCAoKSA9PiAoe1xuICByZXN0cmljdDogJ0UnLFxuICByZXBsYWNlOiB0cnVlLFxuXG4gIHRlbXBsYXRlOiBgXFxcbjxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5nLWNsaWNrPVwicmVzZXRTZWFyY2goZmlsdGVycylcIiBuZy1kaXNhYmxlZD1cInNlYXJjaGluZ1wiIGNsYXNzPVwiYnRuXCI+XG4gIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+IFJlc2V0PHNwYW4gbmctc2hvdz1cInNlYXJjaGluZ1wiPi4uLjwvc3Bhbj5cbjwvYnV0dG9uPlxcXG5gXG59KSlcblxuZ3JpZHouZGlyZWN0aXZlKCdhZ1NlYXJjaEZvcm0nLCBbJyRsb2cnLCAkbG9nID0+ICh7XG4gIHJlc3RyaWN0OiAnQScsXG4gIHNjb3BlOiB0cnVlLFxuICByZXF1aXJlOiAnXmZvcm0nLFxuXG4gIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBmb3JtKSB7XG4gICAgLy8gYXNzaWduIGZvcm0gaW5zdGFuY2UgdG8gdGhlIHNjb3BlXG4gICAgcmV0dXJuIHNjb3BlLnNlYXJjaEZvcm0gPSBmb3JtXG4gIH0sXG5cbiAgY29udHJvbGxlcjogW1xuICAgICckc2NvcGUnLCAnJHBhcnNlJywgJyRhdHRycycsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcGFyc2UsICRhdHRycykge1xuICAgICAgJHNjb3BlLnNlYXJjaGluZyA9IGZhbHNlXG5cbiAgICAgIC8vIFBlcmZvcm0gc2VydmVyIHNpZGUgZ3JpZCBmaWx0ZXJpbmdcbiAgICAgIGNvbnN0IGdyaWRTZWFyY2ggPSBmdW5jdGlvbihmaWx0ZXJzKSB7XG4gICAgICAgIGlmIChmaWx0ZXJzID09IG51bGwpIHsgZmlsdGVycyA9IHt9IH1cbiAgICAgICAgY29uc3QgZ3JpZCA9ICRwYXJzZSgkYXR0cnMuYWdTZWFyY2hGb3JtKSgkc2NvcGUpXG5cbiAgICAgICAgaWYgKF8uaXNOaWwoZ3JpZCkpIHtcbiAgICAgICAgICAkbG9nLndhcm4oJ1tncmlkel0gZ3JpZCBpcyBub3QgZGVmaW5lZCcpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9taXNlID0gZ3JpZC5zZWFyY2goZmlsdGVycylcblxuICAgICAgICAvLyBlbmFibGUgYnV0dG9ucyB3aGVuIHRoZSBzZWFyY2ggaXMgY29tcGxldGVcbiAgICAgICAgJHNjb3BlLnNlYXJjaGluZyA9IHRydWVcbiAgICAgICAgcHJvbWlzZS5maW5hbGx5KCgpID0+ICRzY29wZS5zZWFyY2hpbmcgPSBmYWxzZSlcblxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuICAgICAgfVxuXG4gICAgICAvLyBUcmlnZ2VyIHNlYXJjaCBhY3Rpb24gZm9yIHRoZSBncmlkXG4gICAgICAkc2NvcGUuYWR2YW5jZWRTZWFyY2ggPSBmdW5jdGlvbihmaWx0ZXJzKSB7XG4gICAgICAgIGlmIChmaWx0ZXJzID09IG51bGwpIHsgZmlsdGVycyA9IHt9IH1cbiAgICAgICAgY29uc3QgZm9ybSA9ICRzY29wZS5zZWFyY2hGb3JtXG5cbiAgICAgICAgaWYgKGZvcm0gJiYgZm9ybS4kaW52YWxpZCkge1xuICAgICAgICAgIHJldHVybiAkbG9nLmluZm8oJ1tncmlkel0gYWR2YW5jZWQgc2VhcmNoIGZvcm0gaXMgaW52YWxpZCcsIGZvcm0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JpZFNlYXJjaChmaWx0ZXJzKVxuICAgICAgfVxuXG4gICAgICAvLyBSZXNldCB0aGUgc2VhcmNoIGZvcm0gYW5kIHRyaWdnZXIgZ3JpZCByZWxvYWRcbiAgICAgIHJldHVybiAkc2NvcGUucmVzZXRTZWFyY2ggPSBmdW5jdGlvbihmaWx0ZXJzKSB7XG4gICAgICAgIGlmIChmaWx0ZXJzID09IG51bGwpIHsgZmlsdGVycyA9IHt9IH1cbiAgICAgICAgY29uc3QgZGVmYXVsdEZpbHRlcnMgPSAkc2NvcGUuZGVmYXVsdEZpbHRlcnMgfHwge31cbiAgICAgICAgYW5ndWxhci5jb3B5KGRlZmF1bHRGaWx0ZXJzLCBmaWx0ZXJzKVxuXG4gICAgICAgIHJldHVybiBncmlkU2VhcmNoKGZpbHRlcnMpXG4gICAgICB9XG4gICAgfVxuICBdXG59KVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgYW5nbGVHcmluZGVyIGZyb20gJ34vYW5nbGUtZ3JpbmRlcidcblxuY29uc3QgTU9EX05BTUUgPSAnYWRtaW4ub3JnJ1xuY29uc3Qgb3JnID0gYW5ndWxhci5tb2R1bGUoTU9EX05BTUUsIFthbmdsZUdyaW5kZXJdKTtcbm9yZy5jb25maWcoW1xuICBcIiRyb3V0ZVByb3ZpZGVyXCIsICRyb3V0ZVByb3ZpZGVyID0+ICRyb3V0ZVByb3ZpZGVyXG4gICAgLndoZW4oXCIvXCIsIHtcbiAgICAgIHRlbXBsYXRlVXJsOiBcIi4uL3RlbXBsYXRlcy9vcmcvbGlzdC5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcIm9yZy5MaXN0Q3RybFwiXG4gICAgfSkud2hlbihcIi9jcmVhdGVcIiwge1xuICAgICAgdGVtcGxhdGVVcmw6IFwiLi4vdGVtcGxhdGVzL29yZy9mb3JtLmh0bWxcIixcbiAgICAgIGNvbnRyb2xsZXI6IFwib3JnLkZvcm1DdHJsXCIsXG4gICAgICByZXNvbHZlOiB7IG9yZzogW1wiUmVzb3VyY2VcIiwgUmVzb3VyY2UgPT4gbmV3IFJlc291cmNlKCldXG4gICAgICB9XG4gICAgfSlcblxuICAgIC53aGVuKFwiLzppZFwiLCB7XG4gICAgICB0ZW1wbGF0ZVVybDogXCIuLi90ZW1wbGF0ZXMvb3JnL3Nob3cuaHRtbFwiLFxuICAgICAgY29udHJvbGxlcjogXCJvcmcuU2hvd0N0cmxcIixcbiAgICAgIHJlc29sdmU6IHsgb3JnOiBbXG4gICAgICAgICAgXCIkcm91dGVcIiwgXCJyZXNvdXJjZVJlc29sdmVyXCIsICgkcm91dGUsIHJlc291cmNlUmVzb2x2ZXIpID0+IHJlc291cmNlUmVzb2x2ZXIoJHJvdXRlLmN1cnJlbnQucGFyYW1zLmlkKVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSlcblxuICAgIC53aGVuKFwiLzppZC9lZGl0XCIsIHtcbiAgICAgIHRlbXBsYXRlVXJsOiBcIi4uL3RlbXBsYXRlcy9vcmcvZm9ybS5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcIm9yZy5Gb3JtQ3RybFwiLFxuICAgICAgcmVzb2x2ZTogeyBvcmc6IFtcbiAgICAgICAgICBcIiRyb3V0ZVwiLCBcInJlc291cmNlUmVzb2x2ZXJcIiwgKCRyb3V0ZSwgcmVzb3VyY2VSZXNvbHZlcikgPT4gcmVzb3VyY2VSZXNvbHZlcigkcm91dGUuY3VycmVudC5wYXJhbXMuaWQpXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLm90aGVyd2lzZSh7cmVkaXJlY3RUbzogXCIvXCJ9KVxuXSk7XG5leHBvcnQgZGVmYXVsdCBNT0RfTkFNRVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIGZvcm1zID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbmZvcm1zLmRpcmVjdGl2ZSgnYWdUYWJzZXQnLCBbXG4gICckcGFyc2UnLCAnJHEnLFxuICAoJHBhcnNlLCAkcSkgPT4gKHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICBzY29wZTogdHJ1ZSxcbiAgICByZXF1aXJlOiAnYWdUYWJzZXQnLFxuXG4gICAgY29udHJvbGxlcjogW1xuICAgICAgJyRsb2cnLCAnJHNjb3BlJywgJyRsb2NhdGlvbicsXG4gICAgICBmdW5jdGlvbigkbG9nLCAkc2NvcGUsICRsb2NhdGlvbikge1xuICAgICAgICAvLyBzdGFjayBvZiB0aGUgdGFic1xuICAgICAgICAkc2NvcGUudGFicyA9IFtdXG5cbiAgICAgICAgLy8gc2hvdyBvciBoaWRlIHRoZSB0YWIgY29udGVudCBsb2FkaW5nIGluZGljYXRvclxuICAgICAgICAkc2NvcGUuY29udGVudExvYWRpbmcgPSBmYWxzZVxuXG4gICAgICAgIC8vIHJldHVybiB0aGUgY3VycmVudCB0YWJcbiAgICAgICAgJHNjb3BlLmN1cnJlbnRUYWIgPSAoKSA9PiBfLmZpbmQoJHNjb3BlLnRhYnMsIHsgc2VsZWN0ZWQ6IHRydWUgfSlcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGN1cnJlbnQgdGVtcGxhdGUgdXJsXG4gICAgICAgICRzY29wZS5jdXJyZW50VGVtcGxhdGVVcmwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50VGFiID0gJHNjb3BlLmN1cnJlbnRUYWIoKVxuICAgICAgICAgIGlmIChjdXJyZW50VGFiKSB7IHJldHVybiBjdXJyZW50VGFiLnRwbFNyYyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBldmFsdWF0ZXMgd2hlbiBhIG5ldyB0YWIgY29udGVudCBpcyBsb2FkZWRcbiAgICAgICAgJHNjb3BlLmNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBoaWRlIGNvbnRlbnQgbG9hZGluZyBpbmRpY2F0aW9uXG4gICAgICAgICAgJHNjb3BlLmNvbnRlbnRMb2FkaW5nID0gZmFsc2VcblxuICAgICAgICAgIC8vIGhpZGUgdGFiIGxvYWRpbmcgc3Bpbm5lclxuICAgICAgICAgIGNvbnN0IHRhYiA9ICRzY29wZS5jdXJyZW50VGFiKClcbiAgICAgICAgICB0YWIubG9hZGluZyA9IGZhbHNlXG5cbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHVybFxuICAgICAgICAgIGlmICghXy5pc05pbCh0YWIubmFtZSkpIHsgJGxvY2F0aW9uLnNlYXJjaCgndGFiJywgdGFiLm5hbWUpIH1cblxuICAgICAgICAgIHJldHVybiAkbG9nLmRlYnVnKCdbdGFic10gY29udGVudCBsb2FkZWQnLCB0YWIpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBPcGVuIGEgdGFiIHdpdGggdGhlIGdpdmVuIG5hbWVcbiAgICAgICAgdGhpcy5vcGVuVGFiID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gJHEuZGVmZXIoKVxuICAgICAgICAgIC8vIGZpbmQgdGhlIHRhYiBieSBuYW1lXG4gICAgICAgICAgY29uc3QgdGFiID0gXy5maW5kKCRzY29wZS50YWJzLCB7IG5hbWUgfSlcblxuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgd2hlbiB0aGUgdGFiIGNhbm5vdCBiZSBmb3VuZFxuICAgICAgICAgIGlmIChfLmlzTmlsKHRhYikpIHsgcmV0dXJuIGRlZmVycmVkLnByb21pc2UgfVxuXG4gICAgICAgICAgLy8gc2VsZWN0IHRoZSB0YWIgdW5sZXNzIGlzIG5vdCBhbHJlYWR5IHNlbGVjdGVkXG4gICAgICAgICAgaWYgKCF0YWIuc2VsZWN0ZWQpIHsgdGhpcy5fc2VsZWN0VGFiKHRhYikgfVxuXG4gICAgICAgICAgdmFyIHVucmVnaXN0ZXIgPSB0YWIuJHdhdGNoKCdsb2FkaW5nJywgZnVuY3Rpb24obG9hZGluZykge1xuICAgICAgICAgICAgaWYgKGxvYWRpbmcpIHsgcmV0dXJuIH0gLy8gdGFiIGlzIHN0aWxsIGxvYWRpbmcsIGRvIG5vdGhpbmdcblxuICAgICAgICAgICAgLy8gcmVxdWVzdGVkIHRhYiB3YXMgbG9hZGVkLCBoYW5kbGUgdGhlIHByb21pc2VcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGFiKVxuICAgICAgICAgICAgLy8gLi5hbmQgdW5yZWdpc3RlciB0aGUgd2F0Y2hlclxuICAgICAgICAgICAgcmV0dXJuIHVucmVnaXN0ZXIoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIGdpdmVuIHRhYlxuICAgICAgICAvLyBAcHJpdmF0ZVxuICAgICAgICB0aGlzLl9zZWxlY3RUYWIgPSBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAvLyBkZS1zZWxlY3QgYWxsIHRhYnNcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLnRhYnMsIHRhYiA9PiB0YWIuc2VsZWN0ZWQgPSAodGFiLmxvYWRpbmcgPSBmYWxzZSkpXG5cbiAgICAgICAgICAvLyBtYXJrIHRoZSBjdXJyZW50IHRhYiBhcyBzZWxlY3RlZFxuICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IHRydWVcblxuICAgICAgICAgIC8vIHNob3cgdGhlIGxvYWRpbmcgc3Bpbm5lcnNcbiAgICAgICAgICB0YWIubG9hZGluZyA9IHRydWVcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNvbnRlbnRMb2FkaW5nID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIG5ldyB0YWIgdG8gdGhlIHN0YWNrXG4gICAgICAgIC8vIEBwcml2YXRlXG4gICAgICAgIHRoaXMuX2FkZFRhYiA9IGZ1bmN0aW9uKHRhYiwgc2VsZWN0KSB7XG4gICAgICAgICAgLy8gYWRkIGEgdGFiIHRvIHRoZSBzdGFja1xuICAgICAgICAgIGlmIChzZWxlY3QgPT0gbnVsbCkgeyBzZWxlY3QgPSBmYWxzZSB9XG4gICAgICAgICAgJHNjb3BlLnRhYnMucHVzaCh0YWIpXG5cbiAgICAgICAgICAvLyBpZiB0aGUgdGFiIGlzIHRoZSBmaXJzdCBvbmUgbWFyayBpdCBhcyBzZWxlY3RlZFxuICAgICAgICAgIGlmIChzZWxlY3QgfHwgKCRzY29wZS50YWJzLmxlbmd0aCA9PT0gMSkpIHsgcmV0dXJuIHRoaXMuX3NlbGVjdFRhYih0YWIpIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF0sXG5cbiAgICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkge1xuICAgICAgLy8gcHVibGlzaCBhZ1RhYnNldCBjb250cm9sbGVyIHRvIHRoZSBwYXJlbnQgc2NvcGVcbiAgICAgIGNvbnN0IGFsaWFzID0gYXR0cnMubmFtZVxuICAgICAgaWYgKGFsaWFzKSB7IHJldHVybiAkcGFyc2UoYWxpYXMpLmFzc2lnbihzY29wZS4kcGFyZW50LCBjdHJsKSB9XG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiBgXFxcbjxkaXYgY2xhc3M9XCJuby1wYWRkaW5nXCI+XG4gIDxkaXYgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIiBuZy10cmFuc2NsdWRlIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTVweFwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgPHNwYW4gbmctaWY9XCJjb250ZW50TG9hZGluZ1wiPmxvYWRpbmcgdGhlIGNvbnRlbnQ8L3NwYW4+XG4gICAgPG5nLWluY2x1ZGUgc3JjPVwiY3VycmVudFRlbXBsYXRlVXJsKClcIlxuICAgICAgICAgICAgICAgIG9ubG9hZD1cImNvbnRlbnRMb2FkZWQoKVwiXG4gICAgICAgICAgICAgICAgbmctaGlkZT1cImNvbnRlbnRMb2FkaW5nXCI+PC9uZy1pbmNsdWRlPlxuICA8L2Rpdj5cbjwvZGl2PlxcXG5gXG4gIH0pXG5dKVxuXG5mb3Jtcy5kaXJlY3RpdmUoJ2FnVGFiJywgW1xuICAnJGxvZycsICckbG9jYXRpb24nLCAncGF0aFdpdGhDb250ZXh0JyxcbiAgKCRsb2csICRsb2NhdGlvbiwgcGF0aFdpdGhDb250ZXh0KSA9PiAoe1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXF1aXJlOiAnXmFnVGFic2V0JyxcbiAgICB0cmFuc2NsdWRlOiB0cnVlLFxuXG4gICAgc2NvcGU6IHtcbiAgICAgIC8vIHRleHQgYmluZGluZ1xuICAgICAgdGVtcGxhdGVVcmw6ICdAJyxcbiAgICAgIG5hbWU6ICdAJ1xuICAgIH0sXG5cbiAgICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgdGFic2V0Q3RybCkge1xuICAgICAgLy8gYXBwZW5kIHRoZSBhcHBsaWNhdGlvbiBjb250ZXh0IHRvIHRoZSB0ZW1wbGF0ZSB1cmxcbiAgICAgIHNjb3BlLnRwbFNyYyA9IHBhdGhXaXRoQ29udGV4dChzY29wZS50ZW1wbGF0ZVVybClcblxuICAgICAgLy8gYnkgZGVmYXVsdCBhbGwgbmV3IHRhYnMgYXJlIHVuc2VsZWN0ZWRcbiAgICAgIHNjb3BlLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgIHNjb3BlLmxvYWRpbmcgPSBmYWxzZVxuXG4gICAgICBjb25zdCBnZXRUYWIgPSAoKSA9PiAkbG9jYXRpb24uc2VhcmNoKCkudGFiXG5cbiAgICAgIC8vIGFkZCB0aGUgY3VycmVudCB0YWIgdG8gdGhlIHN0YWNrXG4gICAgICBjb25zdCBhY3RpdmUgPSAoKSA9PiAhXy5pc05pbChzY29wZS5uYW1lKSAmJiAoZ2V0VGFiKCkgPT09IHNjb3BlLm5hbWUpXG4gICAgICB0YWJzZXRDdHJsLl9hZGRUYWIoc2NvcGUsIGFjdGl2ZSgpKVxuXG4gICAgICAvLyBoYW5kbGVzIG1vdXNlIGNsaWNrIG9uIHRoZSB0YWJcbiAgICAgIHNjb3BlLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2NvcGUuc2VsZWN0ZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgcmV0dXJuIHRhYnNldEN0cmwuX3NlbGVjdFRhYihzY29wZSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNjb3BlLiR3YXRjaChnZXRUYWIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc2NvcGUubmFtZSkgJiYgKGdldFRhYigpID09PSBzY29wZS5uYW1lKSAmJiAhc2NvcGUuc2VsZWN0ZWQpIHsgcmV0dXJuIHNjb3BlLnNlbGVjdCgpIH1cbiAgICAgIH1cbiAgICAgICwgdHJ1ZSlcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IGBcXFxuPGxpIG5nLWNsaWNrPVwic2VsZWN0KClcIiBuZy1jbGFzcz1cInthY3RpdmU6IHNlbGVjdGVkLCBsb2FkaW5nOiBsb2FkaW5nfVwiPlxuICA8YSBocmVmPVwiXCIgbmctdHJhbnNjbHVkZT57e2hlYWRpbmd9fTwvYT5cbjwvbGk+XFxcbmBcbiAgfSlcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8gU2V0cyBmb2N1cyBvbiB0aGUgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBuYW1lXG4vLyBXb3JrcyBpbiBjb25qdW5jdGlvbiB3aXRoIGBhZ0ZvY3VzYCBkaXJlY3RpdmVcbmZvcm1zLmZhY3RvcnkoJ2ZvY3VzJywgWyckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgKCRyb290U2NvcGUsICR0aW1lb3V0KSA9PiBuYW1lID0+ICR0aW1lb3V0KCgpID0+ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnZm9jdXNPbicsIG5hbWUpKVxuXSlcblxuLy8gU2V0cyB0aGUgZm9jdXMgb24gdGhlIGVsZW1lbnRcbi8vIFRPRE8gY2hhbmdlIGl0IHRvIGBmb2N1cy1pZmBcbi8vIFRPRE8gc2VlIGh0dHA6Ly9ydW95dXN1bi5jb20vMjAxMy8wOC8yNC9hLWdsaW1wc2Utb2YtYW5ndWxhcmpzLXNjb3BlLXZpYS1leGFtcGxlLmh0bWxcbmZvcm1zLmRpcmVjdGl2ZSgnYWdGb2N1cycsICgpID0+ICh7XG4gIHJlc3RyaWN0OiAnQScsXG5cbiAgbGluayhzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGN1cnJlbnROYW1lID0gYXR0cmlidXRlcy5hZ0ZvY3VzXG5cbiAgICByZXR1cm4gc2NvcGUuJG9uKCdmb2N1c09uJywgZnVuY3Rpb24oZXZlbnQsIG5hbWUpIHtcbiAgICAgIGlmIChjdXJyZW50TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdhZy1mb2N1c2VkJylcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRbMF0uZm9jdXMoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pKVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jbGFzcyBHcmlkeiB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXQoZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIGluaXQoZWxlbWVudCwgb3B0cykge1xuICAgIHRoaXMuZ3JpZEVsID0gJChlbGVtZW50KVxuICAgIHRoaXMuZ3JpZElkID0gdGhpcy5ncmlkRWwuYXR0cihcImlkXCIpXG5cbiAgICAvLyB0aGUgY29udGFpbmluZyBkaXYgZm9yIHRoZSBncmlkLCB3aWxsIGJlIGJ1aWx0IGFmdGVyIGpxR3JpZCBpcyBjYWxsZWRcbiAgICB0aGlzLmdib3hJZCA9IGBnYm94XyR7dGhpcy5ncmlkSWR9YFxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucyhvcHRzKVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hY3Rpb25Qb3B1cCkgeyB0aGlzLmFkZFJvd0FjdGlvbkNvbHVtbigpIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmVkaXRPbmRibENsaWNrKSB7IHRoaXMuZWRpdE9uZGJsQ2xpY2soKSB9XG5cbiAgICAvLyBjYWxsIHRoZSBqcWdyaWRcbiAgICB0aGlzLmdyaWRFbC5qcUdyaWQodGhpcy5vcHRpb25zKVxuXG4gICAgaWYgKCQuaXNGdW5jdGlvbih0aGlzLm9wdGlvbnMuanFHcmlkQWZ0ZXJHcmlkQ29tcGxldGUpKSB7IHRoaXMuZ3JpZEVsLm9uKCdqcUdyaWRBZnRlckdyaWRDb21wbGV0ZScsIHRoaXMub3B0aW9ucy5qcUdyaWRBZnRlckdyaWRDb21wbGV0ZSkgfVxuICAgIGlmICgkLmlzRnVuY3Rpb24odGhpcy5vcHRpb25zLmpxR3JpZEFmdGVySW5zZXJ0Um93KSkgeyB0aGlzLmdyaWRFbC5vbignanFHcmlkQWZ0ZXJJbnNlcnRSb3cnLCB0aGlzLm9wdGlvbnMuanFHcmlkQWZ0ZXJJbnNlcnRSb3cpIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLm11bHRpU2V0U2VsZWN0aW9uKSB7IHRoaXMuc2VsZWN0ZWRSb3dJZHMgPSBbXSB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXNwb25zaXZlUmVzaXplKClcbiAgfVxuXG4gIGdldE9wdGlvbnMob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5mbi5ncmlkei5kZWZhdWx0cywgb3B0aW9ucylcblxuICAgIC8vIEV2ZW50cyAuLiBiZWZvcmVTZWxlY3RSb3dcbiAgICBjb25zdCBvcHRCZWZvcmVTZWxlY3RSb3cgPSBvcHRpb25zLmJlZm9yZVNlbGVjdFJvd1xuICAgIG9wdGlvbnMuYmVmb3JlU2VsZWN0Um93ID0gZnVuY3Rpb24ocm93aWQsIGUpIHtcbiAgICAgIGxldCByZXNwXG4gICAgICB0aGlzLmJlZm9yZVNlbGVjdFJvdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdEJlZm9yZVNlbGVjdFJvdykpIHsgcmVzcCA9IG9wdEJlZm9yZVNlbGVjdFJvdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH1cbiAgICAgIGlmICgocmVzcCA9PT0gdHJ1ZSkgfHwgKF8uaXNOaWwocmVzcCkpKSB7ICByZXR1cm4gdHJ1ZSB9IGVsc2UgeyByZXR1cm4gZmFsc2UgfVxuICAgIH0uYmluZCh0aGlzKVxuXG4gICAgLy8gRXZlbnRzIC4uIG9uU2VsZWN0Um93XG4gICAgY29uc3Qgb3B0T25TZWxlY3RSb3cgPSBvcHRpb25zLm9uU2VsZWN0Um93XG4gICAgb3B0aW9ucy5vblNlbGVjdFJvdyA9IGZ1bmN0aW9uKHJvd2lkLCBpc0NoZWNrZWQsIGV2ZW50KSB7XG4gICAgICB0aGlzLm9uU2VsZWN0Um93LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0T25TZWxlY3RSb3cpKSB7IG9wdE9uU2VsZWN0Um93LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9LmJpbmQodGhpcylcblxuICAgIGNvbnN0IG9wdE9uU2VsZWN0QWxsID0gb3B0aW9ucy5vblNlbGVjdEFsbFxuICAgIG9wdGlvbnMub25TZWxlY3RBbGwgPSBmdW5jdGlvbihyb3dJZHMsIHN0YXR1cykge1xuICAgICAgdGhpcy5vblNlbGVjdEFsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdE9uU2VsZWN0QWxsKSkgeyBvcHRPblNlbGVjdEFsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfS5iaW5kKHRoaXMpXG5cbiAgICAvLyBFdmVudHMgLi4gZ3JpZENvbXBsZXRlXG4gICAgY29uc3QgX2dyaWRDb21wbGV0ZSA9IG9wdGlvbnMuZ3JpZENvbXBsZXRlXG4gICAgb3B0aW9ucy5ncmlkQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZ3JpZENvbXBsZXRlLmFwcGx5KHRoaXMpXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKF9ncmlkQ29tcGxldGUpKSB7IF9ncmlkQ29tcGxldGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB9XG4gICAgICB0aGlzLmdyaWRFbC50cmlnZ2VyKFwiZ3JpZENvbXBsZXRlXCIpXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm11bHRpU2V0U2VsZWN0aW9uKSB7IHJldHVybiB0aGlzLm1lbW9pemVTZWxlY3RlZFJvd3MoKSB9XG4gICAgfS5iaW5kKHRoaXMpXG5cbiAgICAvLyBCeSBkZWZhdWx0IGZyZWUtanFyaWQgcHJlcGFyZWQgc29ydGluZyBwcm9wZXJ0aWVzIHdpdGggbmV4dCBwYXR0ZXJuXG4gICAgLy8gc29ydE5hbWUgPSBjb2x1bW5OYW1lKGlkLCBuYW1lLCBldGMpIG9yZGVyKGFzY3xkZXNjKSwgbmV4dCBjb2x1bW4gb3JkZXIgb2YgdGhlIGxhc3QgY29sdW1uIG5hbWUgaXMgaW4gYG9yZGVyYCBwYXJhbWV0clxuICAgIC8vIEV4YW1wbGU6IGlmIHVzZXIgZmlyc3Qgc29ydGVkIGJ5IG5hbWUgYW5kIHRoZW4gYnkgaWQgc29ydCBwYXJhbXMgd2lsbCBiZSBsb29rIGxpa2Uge3NvcnROYW1lOiAnbmFtZSBhc2MsIGlkJywgb3JkZXI6ICdhc2MnfVxuICAgIC8vIER1ZSB0byB0aGUgZmFjdCB0aGF0IGlmIGlkKG9yIG90aGVyIHVuaXF1ZSkgZmllbGQgaXMgb24gdGhlIGZpcnN0IHBsYWNlLCB0aGUgb3RoZXIgc29ydGluZyB3b250IGhhdmUgYW55IHNlbnNlXG4gICAgLy8gYHNvcnRMYXN0YCBvcHRpb24gaXMgYWRkZWQgdG8gbW92ZSB1bmlxdWUgY29sdW1uIHRvIHRoZSBsYXN0IHBsYWNlXG4gICAgLy8gICBFeGFtcGxlOiBpZiB1c2VyIGZpcnN0IHNvcnRlZCBieSBpZCBhbmQgdGhlbiBieSBuYW1lIHNvcnQgcGFyYW1zIHdpbGwgYmUgbG9vayBsaWtlIHtzb3J0TmFtZTogJ25hbWUgYXNjLCBpZCcsIG9yZGVyOiAnYXNjJ31cbiAgICBvcHRpb25zLm9uU29ydENvbCA9IChzb3J0bmFtZSwgeCwgb3JkZXIpPT4ge1xuICAgICAgaWYgKG9wdGlvbnMubXVsdGlTb3J0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gb3B0aW9ucy5zb3J0TGFzdCB8fCBcImlkXCJcbiAgICAgICAgaWYgKHNvcnRuYW1lLmluZGV4T2YoaWQpID4gLTEpIHtcbiAgICAgICAgICBzb3J0bmFtZSA9IHNvcnRuYW1lICsgYCAke29yZGVyfWBcbiAgICAgICAgICBjb25zdCBzb3J0QXJyYXkgPSBzb3J0bmFtZS5zcGxpdCgnLCcpXG4gICAgICAgICAgY29uc3QgcmVzID0gW11cbiAgICAgICAgICBsZXQgc29ydCA9IG51bGxcbiAgICAgICAgICBjb25zdCBpZFJlZ2V4ID0gbmV3IFJlZ0V4cChgKCR7aWR9WyBdKyhhc2N8ZGVzYykpYClcbiAgICAgICAgICBfLmVhY2goc29ydEFycmF5LCBmdW5jdGlvbihpdCl7XG4gICAgICAgICAgICBpdCA9IGl0LnRyaW0oKVxuICAgICAgICAgICAgaWYgKF8uaXNOaWwoaWRSZWdleC5leGVjKGl0KSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5wdXNoKGl0KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvcnQgPSBpdC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChzb3J0KSB7IHJlcy5wdXNoKHNvcnRbMF0pIH1cbiAgICAgICAgICBzb3J0bmFtZSA9IHJlcy5qb2luKFwiLFwiKVxuICAgICAgICAgIHRoaXMuZ3JpZEVsLmpxR3JpZChcInNldEdyaWRQYXJhbVwiLCB7c29ydG5hbWV9KVxuICAgICAgICAgIGlmIChzb3J0KSB7IHJldHVybiB0aGlzLmdyaWRFbC5qcUdyaWQoXCJzZXRHcmlkUGFyYW1cIiwge29yZGVyOiBzb3J0WzFdfSkgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdHJ1ZSAtIHByb3ZpZGVzIGEgcG9zc2liaWxpdHkgdG8gc2VsZWN0IG11bHRpcGxlIHNldHMgb2YgcmVjb3JkcyB3aXRoIFwic2hpZnRcIiBrZXkuXG4gICAgLy8gUHJldmlvdXNseSBzZWxlY3RlZCBncm91cChzKSB3aWxsIG5vdCBiZSB1bnNlbGVjdGVkLlxuICAgIG9wdGlvbnMubXVsdGlTZXRTZWxlY3Rpb24gPSBvcHRpb25zLm11bHRpc2VsZWN0ICYmIG9wdGlvbnMubXVsdGlTZXRTZWxlY3Rpb25cblxuICAgIC8vIGlmIHNvcnRhYmxlIGlzIHRydWUgdGhlbiBhZGQgZXhjbHVzaW9uIGZvciB0aGUgYWN0aW9uIGNvbHVtblxuICAgIGlmIChvcHRpb25zLmFjdGlvblBvcHVwICYmIG9wdGlvbnMuc29ydGFibGUpIHtcbiAgICAgIG9wdGlvbnMuc29ydGFibGUgPSB7ZXhjbHVkZTogYCMke3RoaXMuZ3JpZElkfV8tcm93X2FjdGlvbl9jb2xgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICAvKlxuICBzdHVmZiB0byBkbyBhZnRlciB0aGUgZ3JpZCBpcyBjb21wbGV0ZWQgbG9hZGluZyBhbmQgcmVuZGVyaW5nXG4gICovXG4gIGdyaWRDb21wbGV0ZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFjdGlvblBvcHVwKSB7IHRoaXMuYWN0aW9uUG9wdXBTZXR1cCgpIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBvcHVwcykge1xuICAgICAgcmV0dXJuIF8uZWFjaCh0aGlzLm9wdGlvbnMucG9wdXBzLCBmdW5jdGlvbihwb3B1cE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wdXBTZXR1cChwb3B1cE9wdGlvbnMuY29sdW1uTmFtZSwgcG9wdXBPcHRpb25zLmlubmVySFRNTClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLypcbiAgSGFuZGxlcyBwcm9wZXIgbXVsdGkgc2VsZWN0aW9uIG9mIHJvd3NcbiAgKi9cbiAgYmVmb3JlU2VsZWN0Um93KHJvd2lkLCBlKSB7XG4gICAgY29uc3Qge1xuICAgICAgcm93c1xuICAgIH0gPSB0aGlzLmdyaWRFbFswXVxuXG4gICAgLy8gZ2V0IGlkIG9mIHRoZSBwcmV2aW91cyBzZWxlY3RlZCByb3dcbiAgICBjb25zdCBzdGFydElkID0gdGhpcy5ncmlkRWwuanFHcmlkKFwiZ2V0R3JpZFBhcmFtXCIsIFwic2Vscm93XCIpXG4gICAgY29uc3QgaXNDaGVja0JveCA9ICQoZS50YXJnZXQpLmhhc0NsYXNzKFwiY2JveFwiKVxuXG4gICAgaWYgKCFlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUubWV0YUtleSAmJiAhaXNDaGVja0JveCkge1xuICAgICAgLy8gUmVzZXQgc2VsZWN0aW9uIGlmIG11bHRpYm94b25seSBpcyBzZXQgdG8gdHJ1ZSByZWFkIGh0dHA6Ly93d3cudHJpcmFuZC5jb20vanFncmlkd2lraS9kb2t1LnBocD9pZD13aWtpOm9wdGlvbnNcbiAgICAgIC8vIGRlZmF1bHQgbXVsdGlib3hvbmx5IGRvZXNuJ3Qgd29yayB3aXRoIGN0cmwvc2hpZnQga2V5cy5cbiAgICAgIGlmICh0aGlzLmdyaWRFbC5qcUdyaWQoXCJnZXRHcmlkUGFyYW1cIiwgXCJhZ011bHRpYm94b25seVwiKSkgeyB0aGlzLmdyaWRFbC5qcUdyaWQoXCJyZXNldFNlbGVjdGlvblwiKSB9XG4gICAgfVxuICAgIGlmIChzdGFydElkICYmIGUuc2hpZnRLZXkpIHtcblxuICAgICAgdGhpcy5ncmlkRWwuanFHcmlkKFwicmVzZXRTZWxlY3Rpb25cIilcblxuICAgICAgLy8gZ2V0IERPTSBlbGVtZW50cyBvZiB0aGUgcHJldmlvdXMgc2VsZWN0ZWQgYW5kXG4gICAgICAvLyB0aGUgc2VsZWN0ZWQgcm93c1xuICAgICAgY29uc3Qgc3RhcnRSb3cgPSByb3dzLm5hbWVkSXRlbShzdGFydElkKVxuICAgICAgY29uc3QgZW5kUm93ID0gcm93cy5uYW1lZEl0ZW0ocm93aWQpXG4gICAgICBpZiAoc3RhcnRSb3cgJiYgZW5kUm93KSB7XG5cbiAgICAgICAgLy8gZ2V0IG1pbiBhbmQgbWF4IGZyb20gdGhlIGluZGV4ZXMgb2YgdGhlIHByZXZpb3VzIHNlbGVjdGVkXG4gICAgICAgIC8vIGFuZCB0aGUgc2VsZWN0ZWQgcm93c1xuICAgICAgICBjb25zdCBpU3RhcnQgPSBNYXRoLm1pbihzdGFydFJvdy5yb3dJbmRleCwgZW5kUm93LnJvd0luZGV4KVxuICAgICAgICBjb25zdCByb3dJZEluZGV4ID0gZW5kUm93LnJvd0luZGV4XG4gICAgICAgIGNvbnN0IGlFbmQgPSBNYXRoLm1heChzdGFydFJvdy5yb3dJbmRleCwgcm93SWRJbmRleClcbiAgICAgICAgbGV0IGkgPSBpU3RhcnRcbiAgICAgICAgd2hpbGUgKGkgPD0gaUVuZCkge1xuICAgICAgICAgIC8vIHRoZSByb3cgd2l0aCByb3dpZCB3aWxsIGJlIHNlbGVjdGVkIGJ5XG4gICAgICAgICAgLy8ganFHcmlkLiBTbyB3ZSBkb24ndCBuZWVkIHNlbGVjdCBpdFxuICAgICAgICAgIGlmIChpICE9PSByb3dJZEluZGV4KSB7IHRoaXMuZ3JpZEVsLmpxR3JpZChcInNldFNlbGVjdGlvblwiLCByb3dzW2ldLmlkLCBmYWxzZSkgfVxuICAgICAgICAgIGkrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyIHRleHQgc2VsZWN0aW9uXG4gICAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSkge1xuICAgICAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKVxuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKSB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tdWx0aVNldFNlbGVjdGlvbikgeyB0aGlzLm1lbW9pemVTZWxlY3RlZFJvd3MoKSB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbWVtb2l6ZVNlbGVjdGVkUm93cygpIHtcbiAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSB0aGlzLnNlbGVjdGVkUm93SWRzXG4gICAgcmV0dXJuIF8uZWFjaCh0aGlzLmdyaWRFbC5qcUdyaWQoXCJnZXRHcmlkUGFyYW1cIiwgXCJzZWxhcnJyb3dcIiksIGZ1bmN0aW9uKGlkKSB7XG4gICAgICBpZiAoIShBcnJheS5mcm9tKHNlbGVjdGVkUm93cykuaW5jbHVkZXMoaWQpKSkgeyByZXR1cm4gc2VsZWN0ZWRSb3dzLnB1c2goaWQpIH1cbiAgICB9KVxuICB9XG5cbiAgb25TZWxlY3RBbGwoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5tdWx0aVNldFNlbGVjdGlvbikgeyByZXR1cm4gdGhpcy5zZWxlY3RlZFJvd0lkcyA9IFtdIH1cbiAgfVxuXG4gIG9uU2VsZWN0Um93KHJvd2lkLCBpc0NoZWNrZWQsZSkge1xuICAgIGlmICh0aGlzLmdyaWRFbC5qcUdyaWQoXCJnZXRHcmlkUGFyYW1cIiwgXCJhZ1Jvd051bWJlclwiKSkge1xuICAgIC8vQWRkIG51bWJlciBvZiBzZWxlY3RlZCByb3cgaW4gZ3JpZChubWJlciBmb3IgYWxsIHBhZ2VzKVxuICAgICAgY29uc3QgaWRzID0gdGhpcy5ncmlkRWwuZ2V0RGF0YUlEcygpXG4gICAgICBsZXQgdGV4dCA9IFwiXCJcbiAgICAgIC8vY2hlY2sgaWYgb25seSBvbmUgcm93IGlzIHNlbGVjdGVkXG4gICAgICBpZiAodGhpcy5ncmlkRWwuanFHcmlkKFwiZ2V0R3JpZFBhcmFtXCIsIFwic2VsYXJycm93XCIpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAvL2FkZCB0byB0aGUgZ3JpZCBmb290ZXIgbnVtYmVyIG9mIHRoZSByb3cgaW4gdG90YWwgZm9yIGFsbCBwYWdlc1xuICAgICAgICBjb25zdCByb3dOdW0gPSAoKCB0aGlzLmdyaWRFbC5qcUdyaWQoXCJnZXRHcmlkUGFyYW1cIiwgXCJwYWdlXCIpIC0gMSApICogdGhpcy5ncmlkRWwuanFHcmlkKFwiZ2V0R3JpZFBhcmFtXCIsIFwicm93TnVtXCIpKSArIGlkcy5pbmRleE9mKHJvd2lkKSArIDFcbiAgICAgICAgdGV4dCA9IGBDdXJyZW50IHJvdyAjICR7cm93TnVtfSB8IGBcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZXIgPSB0aGlzLmdyaWRFbC5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiI3BheW1lbnRHcmlkLXBhZ2VyX3JpZ2h0XCIpXG4gICAgICBjb25zdCBzcGFuID0gcGFnZXIuZmluZCgnI3Jvd051bScpXG4gICAgICBpZiAoc3Bhbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGFnZXIucHJlcGVuZChgPHNwYW4gaWQ9J3Jvd051bSc+JHt0ZXh0fSA8L3NwYW4+YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwYW4udGV4dCh0ZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubXVsdGlTZXRTZWxlY3Rpb24pIHtcbiAgICAgIGlmICghaXNDaGVja2VkKSB7IHRoaXMuc2VsZWN0ZWRSb3dJZHMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRSb3dJZHMuaW5kZXhPZihyb3dpZCksIDEpIH1cbiAgICAgIGlmIChlPy5zaGlmdEtleSkge1xuICAgICAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkRWxcbiAgICAgICAgZ3JpZC5qcUdyaWQoXCJyZXNldFNlbGVjdGlvblwiKVxuICAgICAgICBncmlkLmpxR3JpZChcInNldFNlbGVjdGlvblwiLCByb3dpZClcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gdGhpcy5zZWxlY3RlZFJvd0lkc1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGdyaWQuanFHcmlkKFwiZ2V0R3JpZFBhcmFtXCIsIFwic2VsYXJycm93XCIpXG4gICAgICAgIF8uZWFjaChzZWxlY3RlZFJvd3MsIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgaWYgKCEoQXJyYXkuZnJvbShzZWxlY3RlZCkuaW5jbHVkZXMoaWQpKSkgeyByZXR1cm4gZ3JpZC5qcUdyaWQoXCJzZXRTZWxlY3Rpb25cIiwgaWQpIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLypcbiAgYWRkcyBsaXN0ZW5lciB0byByZXNpemUgZ3JpZCB0byBwYXJlbnQgY29udGFpbmVyIHdoZW4gd2luZG93IGlzIHJlc2l6ZWQuXG4gIFRoaXMgd2lsbCB3b3JrIGZvciByZXBvbnNpdmUgYW5kIGZsdWlkIGxheW91dHNcbiAgKi9cbiAgcmVzcG9uc2l2ZVJlc2l6ZSgpIHtcbiAgICBjb25zdCBnYm94SWQgPSBgI2dib3hfJHt0aGlzLmdyaWRFbC5hdHRyKFwiaWRcIil9YFxuICAgIHJldHVybiAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgKGV2ZW50LCB1aSkgPT4ge1xuXG4gICAgICAvLyBHZXQgd2lkdGggb2YgcGFyZW50IGNvbnRhaW5lciB3aGljaCBpcyBhc3N1bWVkIHRvIGJlIGV4cGFuZGVkIHRvIHNwYW5cbiAgICAgIGxldCBwYXJXaWR0aFxuICAgICAgaWYgKCQoZ2JveElkKS5wYXJlbnQoKS53aWR0aCgpID4gMCkge1xuICAgICAgICBwYXJXaWR0aCA9ICQoZ2JveElkKS5wYXJlbnQoKS53aWR0aCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJXaWR0aCA9ICQoXCIjcGFnZVwiKS53aWR0aCgpXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJXaWR0aCA9ICQoZ2JveElkKS53aWR0aCgpXG4gICAgICBjb25zdCB3ID0gcGFyV2lkdGggLSAxIC8vIGFkZCAtMSBGdWRnZSBmYWN0b3IgdG8gcHJldmVudCBob3Jpem9udGFsIHNjcm9sbGJhcnNcblxuICAgICAgaWYgKE1hdGguYWJzKHcgLSBjdXJXaWR0aCkgPiAyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRFbC5zZXRHcmlkV2lkdGgodylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8qKioqKioqKioqKioqQWN0aW9uIHBvcHVwIG1ldGhvZHMqKioqKioqKioqKioqXG5cbiAgLypcbiAgYWRkcyB0aGUgYWN0aW9uIGNvbHVtbiBhbmQgZm9ybWF0dGVyLlxuICAqL1xuICBhZGRSb3dBY3Rpb25Db2x1bW4oKSB7XG4gICAgY29uc3QgY29udGFpbmVySWQgPSBgZ2JveF8ke3RoaXMuZ3JpZEVsLmF0dHIoXCJpZFwiKX1gXG5cbiAgICBjb25zdCBhY3Rpb25Db2wgPSB7XG4gICAgICBuYW1lOiBcIi1yb3dfYWN0aW9uX2NvbFwiLCAvLyBjYW4ndCByZXNpemVcbiAgICAgIGxhYmVsOiBcIiBcIixcbiAgICAgIHdpZHRoOiAyMCxcbiAgICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICAgIHNlYXJjaDogZmFsc2UsXG4gICAgICBoaWRlZGxnOiB0cnVlLFxuICAgICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICAgIGZpeGVkOiB0cnVlLCAvLyBkb24ndCBhdXRvIGNhbGMgc2l6ZVxuXG4gICAgICBmb3JtYXR0ZXI6IChjZWxsVmFsdWUsIGNvbE9wdGlvbnMsIHJvd09iamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLm9wdGlvbnMuYWN0aW9uUG9wdXAuY2VsbEZvcm1hdHRlciB8fCB0aGlzLmFjdGlvblBvcHVwRm9ybWF0dGVyXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIoY29udGFpbmVySWQsIGNlbGxWYWx1ZSwgY29sT3B0aW9ucywgcm93T2JqZWN0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29sTW9kZWwudW5zaGlmdChhY3Rpb25Db2wpXG4gIH1cblxuICBwb3B1cEZvcm1hdHRlcihjb250YWluZXJJZCwgcm93Q2xhc3MsIGljb24pIHtcbiAgICByZXR1cm4gYFxcXG48YSBjbGFzcz1cIiR7cm93Q2xhc3N9XCIgZGF0YS10b2dnbGU9XCJwb3BvdmVyXCIgaHJlZj1cIiNcIlxuICAgZGF0YS1jb250YWluZXI9XCIjJHtjb250YWluZXJJZH1cIj48aSBjbGFzcz1cIiR7aWNvbn1cIj48L2k+PC9hPlxcXG5gXG4gIH1cblxuICAvKlxuICBkZWZhdWx0IHJvd0FjdGlvbkZvcm1hdHRlci4gY29udGFpbmVySWQgaXMgdGhlIGRvbSBlbCB0byBhZGQgdGhlIGRyb3AgZG93biB0b1xuICAqL1xuICBhY3Rpb25Qb3B1cEZvcm1hdHRlcihjb250YWluZXJJZCkge1xuICAgIHJldHVybiBgXFxcbjxhIGNsYXNzPVwianFnLXJvdy1hY3Rpb25cIiBkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIiBocmVmPVwiI1wiXG4gICBkYXRhLWNvbnRhaW5lcj1cIiMke2NvbnRhaW5lcklkfVwiPjxpIGNsYXNzPVwiZmEgZmEtY29nXCI+PC9pPjwvYT5cXFxuYFxuICB9XG5cblxuXG4gIHBvcHVwU2V0dXAoY29sdW1uTmFtZSwgaW5uZXJIVE1MKXtcbiAgICByZXR1cm4gJChgLiR7Y29sdW1uTmFtZX1gKS5jbGlja292ZXIoe1xuICAgICAgZ2xvYmFsX2Nsb3NlOiB0cnVlLFxuICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgIGNvbnRlbnQ6IFwiPGRpdj48L2Rpdj5cIixcbiAgICAgIHRlbXBsYXRlOiBgXFxcbjxkaXYgY2xhc3M9XCJwb3BvdmVyIHJvdy1hY3Rpb24tcG9wb3ZlclwiPlxuICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudCBkcm9wZG93biBjbGVhcmZpeFwiIHN0eWxlPVwicGFkZGluZzogMDtcIj48L2Rpdj5cbjwvZGl2PlxcXG5gLFxuICAgICAgb25TaG93bigpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBpbm5lckhUTUxcbiAgICAgICAgaWYgKHR5cGVvZiBpbm5lckhUTUwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBzZWxmID0gdGhpc1xuICAgICAgICAgIGNvbnN0IHBhcmFtcz0gSlNPTi5wYXJzZSh0aGlzLiRlbGVtZW50WzBdLmF0dHJpYnV0ZXMucG9wVXBQYXJhbXMudmFsdWUpXG4gICAgICAgICAgY29udGVudCA9IGlubmVySFRNTCh0aGlzLCBwYXJhbXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGYuJHRpcFswXS5pbm5lckhUTUwgPSBjb250ZW50XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIGNhbGxlZCBhZnRlciBncmlkIGNvbXBsZXRlIHRvIHNldHVwIHRoZSBtZW51XG4gIGFjdGlvblBvcHVwU2V0dXAoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBjb25zdCB7XG4gICAgICBvcHRpb25zXG4gICAgfSA9IHRoaXNcblxuICAgIGxldCBhY3Rpb25NZW51ID0gXCJcIlxuICAgIGlmICghXy5pc05pbChvcHRpb25zLmFjdGlvblBvcHVwLnJlc2V0U2VsZWN0aW9uKSAmJiAob3B0aW9ucy5hY3Rpb25Qb3B1cC5yZXNldFNlbGVjdGlvbiAhPT0gZmFsc2UpKSB7XG4gICAgICBvcHRpb25zLmFjdGlvblBvcHVwLnJlc2V0U2VsZWN0aW9uID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFjdGlvblBvcHVwLm1lbnVMaXN0KSB7XG4gICAgICBhY3Rpb25NZW51ID0gb3B0aW9ucy5hY3Rpb25Qb3B1cC5tZW51TGlzdFxuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb25NZW51ID0gYFxcXG48dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cbiAgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyb3dfYWN0aW9uX3Nob3dcIiBkYXRhLWRpc21pc3M9XCJjbGlja292ZXJcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLWV5ZVwiPjwvaT5zaG93PC9hPlxuICA8L2xpPlxuICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInJvd19hY3Rpb25fZWRpdFwiIGRhdGEtZGlzbWlzcz1cImNsaWNrb3ZlclwiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsLXNxdWFyZS1vXCI+PC9pPmVkaXQ8L2E+XG4gIDwvbGk+XG4gIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwicm93X2FjdGlvbl9kZWxldGVcIiBkYXRhLWRpc21pc3M9XCJjbGlja292ZXJcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXRyYXNoLW9cIj48L2k+ZGVsZXRlPC9hPlxuICA8L2xpPlxuPC91bD5cXFxuYFxuICAgIH1cblxuICAgIHJldHVybiAkKFwiLmpxZy1yb3ctYWN0aW9uXCIpLmNsaWNrb3Zlcih7XG4gICAgICBnbG9iYWxfY2xvc2U6IHRydWUsXG4gICAgICBodG1sOiB0cnVlLFxuICAgICAgY29udGVudDogYWN0aW9uTWVudSxcbiAgICAgIHRlbXBsYXRlOiBgXFxcbjxkaXYgY2xhc3M9XCJwb3BvdmVyIHJvdy1hY3Rpb24tcG9wb3ZlclwiPlxuICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudCBkcm9wZG93biBjbGVhcmZpeFwiIHN0eWxlPVwicGFkZGluZzogMDtcIj48L2Rpdj5cbjwvZGl2PlxcXG5gLFxuICAgICAgb25TaG93bigpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuYWN0aW9uUG9wdXBPblNob3cuY2FsbChzZWxmLCB0aGlzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBmaXJlZCB3aGVuIHRoZSBjbGlja292ZXIgaXMgc2hvd25cbiAgYWN0aW9uUG9wdXBPblNob3coY2xpY2tvdmVyRWwpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IGlkID0gJChjbGlja292ZXJFbC4kZWxlbWVudCwgdGhpcy5ncmlkRWwucm93cykucGFyZW50cyhcInRyOmZpcnN0XCIpLmF0dHIoXCJpZFwiKVxuXG4gICAgdGhpcy5ncmlkRWwuZGF0YShcImFjdGlvblJvd0lkXCIsIGlkKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uUG9wdXAucmVzZXRTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuZ3JpZEVsLmpxR3JpZChcInJlc2V0U2VsZWN0aW9uXCIpXG4gICAgICB0aGlzLmdyaWRFbC5qcUdyaWQoXCJzZXRTZWxlY3Rpb25cIiwgaWQpXG4gICAgfVxuXG4gICAgY29uc3QgbWVudUVsID0gJChgIyR7c2VsZi5nYm94SWR9IC5kcm9wZG93bi1tZW51YClcblxuICAgIG1lbnVFbC5vbihcImNsaWNrXCIsIFwibGkgYS5yb3dfYWN0aW9uX3Nob3dcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVybiB0aGlzLmdyaWRFbC50cmlnZ2VyKFwic2hvd0FjdGlvblwiLCBbaWQsIHNlbGZdKVxuICB9KVxuXG4gICAgbWVudUVsLm9uKFwiY2xpY2tcIiwgXCJsaSBhLnJvd19hY3Rpb25fZWRpdFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgcmV0dXJuIHRoaXMuZ3JpZEVsLnRyaWdnZXIoXCJlZGl0QWN0aW9uXCIsIFtpZCwgc2VsZl0pXG4gIH0pXG5cbiAgICBtZW51RWwub24oXCJjbGlja1wiLCBcImxpIGEucm93X2FjdGlvbl9kZWxldGVcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVybiB0aGlzLmdyaWRFbC50cmlnZ2VyKFwiZGVsZXRlQWN0aW9uXCIsIFtpZCwgc2VsZl0pXG4gIH0pXG5cbiAgICByZXR1cm4gbWVudUVsLm9uKFwiY2xpY2tcIiwgXCJsaSBhLnJvd19hY3Rpb25fbWFzc191cGRhdGVcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVybiB0aGlzLmdyaWRFbC50cmlnZ2VyKFwibWFzc1VwZGF0ZUFjdGlvblwiLCBbXSlcbiAgfSlcbiAgfVxuXG4gIGVkaXRPbmRibENsaWNrKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ3JpZEVsXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vbmRibENsaWNrUm93ID0gaWQgPT4gZ3JpZC50cmlnZ2VyKFwiZWRpdEFjdGlvblwiLCBbaWQsIHNlbGZdKVxuICB9XG59XG5cbi8vIHJlZ2lzdGVyIG5hbWVzcGFjZVxuJC5leHRlbmQodHJ1ZSwgd2luZG93LCB7Z3JpbmRlcjoge0dyaWQ6IEdyaWR6fX0pXG5cbi8vIEpxdWVyeSBQbHVnaW4gZGVmaW5pdGlvblxuJC5mbi5ncmlkeiA9IGZ1bmN0aW9uKG9wdGlvbikge1xuICBsZXQgaW5zdGFuY2VcbiAgaWYgKHR5cGVvZiBvcHRpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBvdGhlckFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaW5zdGFuY2UgPSAkKHRoaXMpLmRhdGEoXCJncmlkelwiKVxuICAgIGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZVtvcHRpb25dKSB7XG4gICAgICBpbnN0YW5jZVtvcHRpb25dLmFwcGx5KHRoaXMsIG90aGVyQXJncylcbiAgICB9XG4gICAgZWxzZSB7fSAvLyB0cnkgcGFzc2luZyB0aHJvdWdoIHRvIGpxZ3JpZFxuICAgIHJldHVybiAkKHRoaXMpLmpxR3JpZChhcmd1bWVudHMpXG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGVsID0gJCh0aGlzKVxuXG4gICAgaW5zdGFuY2UgPSBlbC5kYXRhKFwiZ3JpZHpcIilcbiAgICBjb25zdCBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbiA6IHt9XG4gICAgaWYgKCFpbnN0YW5jZSkgeyByZXR1cm4gZWwuZGF0YShcImdyaWR6XCIsIChpbnN0YW5jZSA9IG5ldyBHcmlkeih0aGlzLCBvcHRpb25zKSkpIH1cbiAgfSlcbn1cblxuJC5mbi5ncmlkei5Db25zdHJ1Y3RvciA9IEdyaWR6XG5cbiQuZm4uZ3JpZHouZGVmYXVsdHMgPSB7XG4gIHBybU5hbWVzOiB7XG4gICAgcGFnZTogXCJwYWdlXCIsXG4gICAgcm93czogXCJtYXhcIixcbiAgICBzb3J0OiBcInNvcnRcIixcbiAgICBvcmRlcjogXCJvcmRlclwiXG4gIH0sXG5cbiAganNvblJlYWRlcjoge1xuICAgIHJlcGVhdGl0ZW1zOiBmYWxzZVxuICB9LFxuXG4gIC8vIERlZmluZXMgaW4gd2hhdCBmb3JtYXQgdG8gZXhwZWN0IHRoZSBkYXRhIHRoYXQgZmlsbHMgdGhlIGdyaWQuXG4gIC8vICAganNvbiAgLSB1c2UgaW50ZXJuYWwganFncmlkIGZ1bmN0aW9uIHRvIGxvYWQgdGhlIGRhdGEgdmlhIGFqYXhcbiAgLy8gICBsb2NhbCAtIHVzZSBsb2NhbCBkYXRhXG4gIGRhdGF0eXBlOiBcImpzb25cIixcblxuICBtdHlwZTogXCJHRVRcIiwgLy8gZm9yIHRoZSBhamF4IGpzb24gcmVhZFxuICByb3dOdW06IDIwLCAvLyBudW0gcm93cyB0byBzaG93IGJ5IGRlZmF1bHRcbiAgcm93TGlzdDogWzEwLCAyMCwgNTAsIDEwMF0sXG4gIGFsdFJvd3M6IHRydWUsXG4gIHNocmlua1RvRml0OiBmYWxzZSxcbiAgYXV0b3dpZHRoOiB0cnVlLFxuICBoZWlnaHQ6IFwiMTAwJVwiLFxuICBzb3J0YWJsZTogdHJ1ZSxcbiAgbXVsdGlzZWxlY3Q6IHRydWUsIC8vIG9uZSBvciBtb3JlIHJvdyBzZWxlY3Rpb25zXG4gIHZpZXdyZWNvcmRzOiB0cnVlLCAvLyBzaG93cyBiZWdpbm5pbmcgYW5kIGVuZGluZyByZWNvcmQgbnVtYmVyIGluIHRoZSBncmlkLCBvdXQgb2YgdGhlIHRvdGFsIG51bWJlciBvZiByZWNvcmRzIGluIHRoZSBxdWVyeS5cbiAgLy8gU3BlY2lmeSByZWNvcmRzIGluZm8gZm9ybWF0XG4gIC8vIHswfSAtIHRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVjb3JkcyBkZXBlbmRpbmcgb24gcGFnZSBudW1iZXIgYW5kIG51bWJlciBvZiByZXF1ZXN0ZWQgcmVjb3Jkc1xuICAvLyB7MX0gLSB0aGUgZW5kIHBvc2l0aW9uXG4gIC8vIHsyfSAtIHRvdGFsIHJlY29yZHMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyLlxuICByZWNvcmR0ZXh0OiBcIlJlY29yZHMgezB9IC0gezF9IG9mIHsyfVwiLFxuXG4gIGJlZm9yZVNlbGVjdFJvdzogbnVsbCxcbiAgZ3JpZENvbXBsZXRlOiBudWxsLFxuICBhY3Rpb25Qb3B1cDoge1xuICAgIGZvcm1hdHRlcjogbnVsbCxcbiAgICBtZW51TGlzdDogbnVsbFxuICB9XG59XG5cbi8vIEV4dHJhIGZvcm1hdHRlcnMgZm9yIGpxR3JpZFxuJC5leHRlbmQoJC5mbi5mbWF0dGVyLCB7XG5cbiAgLy8gdXNlIGBhZ0RhdGVGaWx0ZXJgIGZvciBmb3JtYXQgZGF0ZXNcbiAgZGF0ZShjZWxsVmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jb2x1bW5BbGlnbmVyKFwiZGF0ZVwiLCB3aW5kb3cuYWdEYXRlRmlsdGVyKGNlbGxWYWwpLCBvcHRpb25zKVxuICB9LFxuXG4gIC8vIHVzZSBgYWdDdXJyZW5jeUZpbHRlcmAgZm9yIGZvcm1hdCBjdXJyZW5jaWVzXG4gIGN1cnJlbmN5KGNlbGxWYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gd2luZG93LmNvbHVtbkFsaWduZXIoXCJjdXJyZW5jeVwiLCB3aW5kb3cuYWdDdXJyZW5jeUZpbHRlcihjZWxsVmFsKSwgb3B0aW9ucylcbiAgfSxcblxuICAvLyB1c2UgYGFnQ3VycmVuY3lGaWx0ZXJgIGZvciBmb3JtYXQgY3VycmVuY2llcywgdXNlIDAgZm9yIGVtcHR5L251bGwvdW5kZWZpbmVkIHZhbHVlXG4gIGN1cnJlbmN5T3JaZXJvKGNlbGxWYWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoKHR5cGVvZihjZWxsVmFsKSA9PT0gJ3VuZGVmaW5lZCcpIHx8IChjZWxsVmFsID09PSBudWxsKSB8fCAoY2VsbFZhbCA9PT0gJ251bGwnKSB8fCAoY2VsbFZhbCA9PT0gJycpKSB7XG4gICAgICBjZWxsVmFsID0gMFxuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuY29sdW1uQWxpZ25lcihcImN1cnJlbmN5XCIsIHdpbmRvdy5hZ0N1cnJlbmN5RmlsdGVyKGNlbGxWYWwpLCBvcHRpb25zKVxuICB9LFxuXG5cbiAgb2tJY29uKGNlbGxWYWwsIG9wdGlvbnMsIHJvd2RhdGEpIHtcbiAgICBpZiAoY2VsbFZhbCkgeyByZXR1cm4gXCI8aSBjbGFzcz0nZmEgZmEtY2hlY2snPjwvaT5cIiB9IGVsc2UgeyByZXR1cm4gXCJcIiB9XG4gIH0sXG5cbiAgZWRpdEFjdGlvbkxpbmsoY2VsbFZhbCwgb3B0aW9ucywgcm93ZGF0YSkge1xuICAgIHJldHVybiBgXFxcbjxhIGNsYXNzPVwiZWRpdEFjdGlvbkxpbmtcIiBocmVmPVwiI1wiPiR7Y2VsbFZhbH08L2E+XFxcbmBcbiAgfVxufVxuKVxuXG5cbmNvbnN0IGN1cnJlbmN5VW5mb3JtYXR0ZXIgPSBmdW5jdGlvbihjZWxsVmFsKSB7XG4gIGlmICgodHlwZW9mKGNlbGxWYWwpID09PSAndW5kZWZpbmVkJykgfHwgKGNlbGxWYWwgPT09IG51bGwpIHx8IChjZWxsVmFsID09PSAnbnVsbCcpIHx8IChjZWxsVmFsID09PSAnJykpIHtcbiAgICByZXR1cm4gMFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGNlbGxWYWwucmVwbGFjZSgvW14wLTlcXC4tXSsvZyxcIlwiKSlcbiAgfVxufVxuXG5cbiQuZXh0ZW5kKCQuZm4uZm1hdHRlcj8uY3VycmVuY3ksXG4gIHt1bmZvcm1hdDogY3VycmVuY3lVbmZvcm1hdHRlcn0pXG5cbiQuZXh0ZW5kKCQuZm4uZm1hdHRlcj8uY3VycmVuY3lPclplcm8sXG4gIHt1bmZvcm1hdDogY3VycmVuY3lVbmZvcm1hdHRlcn0pXG5cbi8vIFJldHVybnMgdGhlIHRlbXBsYXRlIGZvciBkYXRhIGNvbHVtbiBhbGlnbm1lbnQuXG4vLyB0eXBlICAgIC0gdHlwZSBvZiBhIGNvbHVtbnMgKGUuZy4gY3VycmVuY3ksIGRhdGUsIGxpbmspXG4vLyBjb250ZW50IC0gY29udGVudCBvZiBhIGdyaWQgY2VsbFxud2luZG93LmNvbHVtbkFsaWduZXIgPSBmdW5jdGlvbih0eXBlLCBjb250ZW50LCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zPy5jb2xNb2RlbD8uYWxpZ24pIHtcbiAgICByZXR1cm4gY29udGVudFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBgXFxcbjxkaXYgY2xhc3M9XCIke3R5cGV9LWNvbnRlbnRcIj4ke2NvbnRlbnR9PC9kaXY+XFxcbmBcbiAgfVxufVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuLy8gRW5oYW5jZWQgYmluZCBkaXJlY3RpdmUgd2l0aCBkZWZhdWx0IHZhbHVlXG4vLyBGb3IgZWRpdGFibGUgc2VsZWN0IGZpZWxkc1xuYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpLmRpcmVjdGl2ZSgnYWdTZWxlY3RCaW5kJywgWyckZmlsdGVyJywgJyRwYXJzZScsIGZ1bmN0aW9uKCRmaWx0ZXIsICRwYXJzZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG5cbiAgICBjb250cm9sbGVyKCkge1xuICAgICAgdGhpcy5zaG93VmFsdWUgPSB2YWx1ZSA9PiBhbmd1bGFyLmlzTnVtYmVyKHZhbHVlKSB8fCAhIXZhbHVlXG5cbiAgICAgIHRoaXMuZ2V0RmllbGQgPSBmdW5jdGlvbihvYmplY3RzLCBpZCwgZmllbGQsIHNjb3BlKSB7XG4gICAgICAgIG9iamVjdHMgPSAkcGFyc2Uob2JqZWN0cykoc2NvcGUpXG4gICAgICAgIGlmICgoaWQgJSAxKSA9PT0gMCkgeyBpZCA9IGFuZ3VsYXIuZnJvbUpzb24oaWQpIH1cbiAgICAgICAgY29uc3QgZWxlbWVudCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKG9iamVjdHMsIHsgaWQgfSwgdHJ1ZSlcbiAgICAgICAgaWYgKCFfLmlzTmlsKGVsZW1lbnQpICYmIChlbGVtZW50Lmxlbmd0aCA+IDApKSB7IHJldHVybiBlbGVtZW50WzBdW2ZpZWxkXSB9IGVsc2UgeyByZXR1cm4gJycgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBjb21waWxlKGVsZW1lbnQpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgaW5pdGlhbCBjb250ZW50XG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBlbGVtZW50Lmh0bWwoKSB8fCAnJm5ic3A7J1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gYXR0cnMuYWdTZWxlY3RCaW5kRmllbGRcbiAgICAgICAgcmV0dXJuIHNjb3BlLiR3YXRjaChhdHRycy5hZ1NlbGVjdEJpbmQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgdHh0ID0gY3RybC5zaG93VmFsdWUodmFsdWUpID8gY3RybC5nZXRGaWVsZChhdHRycy5hZ1NlbGVjdEJpbmRGb3IsIHZhbHVlLCBmaWVsZCwgc2NvcGUpIDogZGVmYXVsdFZhbHVlXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaHRtbCh0eHQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBBbGVydHMgZnJvbSAnLi9BbGVydHMnXG5cbmNvbnN0IE1PRF9OQU1FID0gJ2FuZ2xlR3JpbmRlci5hbGVydHMnXG5leHBvcnQgZGVmYXVsdCBNT0RfTkFNRVxuXG5hbmd1bGFyLm1vZHVsZShNT0RfTkFNRSwgW10pXG4gIC52YWx1ZSgnYWxlcnRUaW1lb3V0JywgMzAwMClcbiAgLnNlcnZpY2UoJ2FsZXJ0cycsIEFsZXJ0cylcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5cbnZhciBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKGdyaWR6TW9kdWxlKVxuXG5ncmlkei5kaXJlY3RpdmUoJ2FnUmVzZXRTb3J0R3JpZCcsIFtcbiAgKCkgPT4gKHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcGxhY2U6IHRydWUsXG5cbiAgICBzY29wZToge1xuICAgICAgZ3JpZDogJz1mb3InXG4gICAgfSxcblxuICAgIGxpbmsoJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgcmV0dXJuICRzY29wZS5yZXNldFNvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29sdW1uTmFtZSA9IGF0dHJzLmRlZmF1bHRDb2x1bW4gPyBhdHRycy5kZWZhdWx0Q29sdW1uIDogJ2lkJ1xuICAgICAgICBjb25zdCBvcmRlciA9IGF0dHJzLmRlZmF1bHRPcmRlciA/IGF0dHJzLmRlZmF1bHRPcmRlciA6ICdhc2MnXG5cbiAgICAgICAgY29uc3QgY29sTW9kZWwgPSAkc2NvcGUuZ3JpZC5nZXRHcmlkRWwoKS5nZXRHcmlkUGFyYW0oJ2NvbE1vZGVsJylcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbE1vZGVsLCBjb2x1bW4gPT4gY29sdW1uLmxzbyA9IChjb2x1bW4ubmFtZSA9PT0gY29sdW1uTmFtZSkgfHwgKGNvbHVtbi5uYW1lID09PSAnaWQnKSA/IG9yZGVyIDogJycpXG5cbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGBbYWctZ3JpZC1uYW1lPScke2F0dHJzLmZvcn0nXWApLmZpbmQoJ3NwYW4ucy1pY28nKS5oaWRlKClcbiAgICAgICAgJHNjb3BlLmdyaWQuZ2V0R3JpZEVsKCkuc2V0R3JpZFBhcmFtKHsgc29ydG5hbWU6IGNvbHVtbk5hbWUsIG9yZGVyIH0pLnRyaWdnZXIoJ3JlbG9hZEdyaWQnKVxuXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IGFuZ3VsYXIuZWxlbWVudChgW2lkJD0nXyR7Y29sdW1uTmFtZX0nXWApXG4gICAgICAgIGNvbHVtbi5maW5kKCdzcGFuLnMtaWNvJykuc2hvdygpXG5cbiAgICAgICAgY29uc3QgZGlzYWJsZWRDbGFzc05hbWUgPSAndWktc3RhdGUtZGlzYWJsZWQnXG4gICAgICAgIGlmIChvcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgICBjb2x1bW4uZmluZCgnLnVpLWljb24tYXNjJykucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzc05hbWUpXG4gICAgICAgICAgY29sdW1uLmZpbmQoJy51aS1pY29uLWRlc2MnKS5hZGRDbGFzcyhkaXNhYmxlZENsYXNzTmFtZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW4uZmluZCgnLnVpLWljb24tYXNjJykuYWRkQ2xhc3MoZGlzYWJsZWRDbGFzc05hbWUpXG4gICAgICAgICAgY29sdW1uLmZpbmQoJy51aS1pY29uLWRlc2MnKS5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzTmFtZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogJ1xcXG48YSBjbGFzcz1cImxpc3RcIiB1aWItdG9vbHRpcD1cIlJlc2V0IFNvcnRpbmdcIiBuZy1jbGljaz1cInJlc2V0U29ydCgpXCI+PGkgY2xhc3M9XCJmYSBmYS1zb3J0XCI+PC9pPjwvYT5cXFxuJ1xuICB9KVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgY29tbW9uTW9kdWxlIGZyb20gJy4uL2NvbW1vbk1vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKS5kaXJlY3RpdmUoJ2FnU2lkZU1lbnUnLCBbXG4gICckd2luZG93JywgJyR0aW1lb3V0JywgKCR3aW5kb3csICR0aW1lb3V0KSA9PiAoe1xuICAgIHJlc3RyaWN0OiAnQScsXG5cbiAgICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gMFxuICAgICAgbGV0IGVsU2Nyb2xsVG9wT3JpZ2luYWwgPSAwXG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGF0dHIuaGVhZGVyKSlcbiAgICAgICAgZWxTY3JvbGxUb3BPcmlnaW5hbCA9IGVsZW1lbnQub2Zmc2V0KCkudG9wXG4gICAgICAgIGlmICghXy5pc05pbChhbmd1bGFyLmVsZW1lbnQoaGVhZGVyKVswXSkpIHsgcmV0dXJuIGhlYWRlckhlaWdodCA9IGFuZ3VsYXIuZWxlbWVudChoZWFkZXIpWzBdLm9mZnNldEhlaWdodCB9XG4gICAgICB9KVxuXG4gICAgICBjb25zdCB3aW5kb3cgPSBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdylcbiAgICAgIHJldHVybiB3aW5kb3cuYmluZCgnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3dbMF0ucGFnZVlPZmZzZXQgPiBoZWFkZXJIZWlnaHQpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygncG9zaXRpb24nLCAnZml4ZWQnKS5jc3MoJ3RvcCcsIGAke2F0dHIub2Zmc2V0fXB4YClcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93WzBdLnBhZ2VZT2Zmc2V0IDw9IGhlYWRlckhlaWdodCkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSlcbl0pXG4iLCJpbXBvcnQgc3dlZXRBbGVydCBmcm9tICdzd2VldGFsZXJ0J1xud2luZG93LnN3ZWV0QWxlcnQgPSB3aW5kb3cuc3dhbCA9IHN3ZWV0QWxlcnRcblxuLyogQG5nSW5qZWN0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dTZXJ2IHtcbiAgY29uc3RydWN0b3IoJGxvZywgJHEpIHtcbiAgICB0aGlzLiRsb2cgPSAkbG9nXG4gICAgdGhpcy4kcSA9ICRxXG4gIH1cblxuICBvcGVuKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG4gICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMgPSB7IG1lc3NhZ2U6IG9wdGlvbnMgfVxuICAgIH1cblxuICAgIC8vIGFzc2lnbiBkZWZhdWx0IGNvbmZpcm1hdGlvbiBtZXNzYWdlXG4gICAgaWYgKG9wdGlvbnMubWVzc2FnZSA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLm1lc3NhZ2UgPSAnQXJlIHlvdSBzdXJlPydcbiAgICB9XG5cbiAgICAvLyBhc3NpZ24gYnV0dG9uIGxhYmVsc1xuICAgIGlmIChvcHRpb25zLmNhbmNlbExhYmVsID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuY2FuY2VsTGFiZWwgPSAnQ2FuY2VsJ1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5va0xhYmVsID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMub2tMYWJlbCA9ICdPaydcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY2xvc2VPbkNvbmZpcm0gPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5jbG9zZU9uQ29uZmlybSA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLiRsb2cuaW5mbygnW2FnXSBvcGVuaW5nIGNvbmZpcm1hdGlvbiBkaWFsb2cnLCBvcHRpb25zKVxuXG4gICAgY29uc3QgZGVmZXIgPSB0aGlzLiRxLmRlZmVyKClcblxuICAgIHN3YWwoe1xuICAgICAgdGl0bGU6IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgIGFsbG93RXNjYXBlS2V5OiBmYWxzZSxcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogb3B0aW9ucy5va0xhYmVsLFxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogb3B0aW9ucy5jYW5jZWxMYWJlbCxcbiAgICAgIGNsb3NlT25Db25maXJtOiBvcHRpb25zLmNsb3NlT25Db25maXJtXG4gICAgfSwgaXNDb25maXJtZWQgPT4gZGVmZXIucmVzb2x2ZShpc0NvbmZpcm1lZCkpXG5cbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZVxuICB9XG59XG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8geC1lZGl0YWJsZSB3cmFwcGVyIGZvciBkYXRlIHBpY2tlciB3aXRoIGNhbGVuZGFyIGJ1dHRvblxuZm9ybXMuZGlyZWN0aXZlKCdlZGl0YWJsZURhdGVwaWNrZXInLCBbXG4gICdlZGl0YWJsZURpcmVjdGl2ZUZhY3RvcnknLCAnJGZpbHRlcicsIGZ1bmN0aW9uKGVkaXRhYmxlRGlyZWN0aXZlRmFjdG9yeSwgJGZpbHRlcikge1xuICAgIHJldHVybiBlZGl0YWJsZURpcmVjdGl2ZUZhY3Rvcnkoe1xuICAgICAgZGlyZWN0aXZlTmFtZTogJ2VkaXRhYmxlRGF0ZXBpY2tlcicsXG5cbiAgICAgIGlucHV0VHBsOiAnXFxcbjxhZy1kYXRlcGlja2VyIG5nLW1vZGVsPVwiJGRhdGFcIiBkYXRlcGlja2VyLW9wdGlvbnM9XCJ7e29wdGlvbnN9fVwiPjwvYWctZGF0ZXBpY2tlcj5cXFxuJyxcblxuICAgICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQucmVuZGVyLmNhbGwodGhpcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGNvbW1vbk1vZHVsZSBmcm9tICcuL2NvbW1vbk1vZHVsZSdcbmltcG9ydCB7IGlzRmFsc3kgfSBmcm9tICd+L3NjcmlwdHMvdXRpbHMvaXNGYWxzeSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGNvbW1vbk1vZHVsZSlcblxuYXBwLnByb3ZpZGVyKCdhZ0N1cnJlbmN5RmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gIGxldCBkZWZhdWx0U3ltYm9sID0gJyQnXG4gIGxldCBkZWZhdWx0Rm9ybWF0ID0gJzwlPSBzeW1ib2wgJT48JT0gYW1vdW50ICU+J1xuXG4gIC8vIFNldCB0aGUgZGVmYXVsdCBjdXJyZW5jeSBzeW1ib2xcbiAgLy8gd2hpY2ggd2lsbCBiZSB1c2VkIGFjcm9zcyB0aGUgd2hvbGUgYXBwbGljYXRpb24uXG4gIHJldHVybiB7XG4gICAgc2V0RGVmYXVsdFN5bWJvbChzeW1ib2wpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0U3ltYm9sID0gc3ltYm9sXG4gICAgfSxcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBjdXJyZW5jeSBmb3JtYXRcbiAgICBzZXREZWZhdWx0Rm9ybWF0KGZvcm1hdCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRcbiAgICB9LFxuXG4gICAgJGdldDogW1xuICAgICAgJyRmaWx0ZXInLCAoJGZpbHRlcikgPT4gZnVuY3Rpb24oYW1vdW50LCBzeW1ib2wpIHtcbiAgICAgICAgaWYgKHN5bWJvbCA9PSBudWxsKSB7IHN5bWJvbCA9IGRlZmF1bHRTeW1ib2wgfVxuICAgICAgICBpZiAoaXNGYWxzeShhbW91bnQpKSB7IHJldHVybiAnJyB9XG5cbiAgICAgICAgY29uc3QgZm9ybWF0dGVkQW1vdW50ID0gJGZpbHRlcignY3VycmVuY3knKShhbW91bnQsICcnKVxuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZShkZWZhdWx0Rm9ybWF0KSh7IGFtb3VudDogZm9ybWF0dGVkQW1vdW50LCBzeW1ib2wgfSlcbiAgICAgIH1cblxuICAgIF1cbiAgfVxufSlcblxuYXBwLmZpbHRlcignYWdDdXJyZW5jeU9yWmVybycsIFsnYWdDdXJyZW5jeUZpbHRlcicsIGFnQ3VycmVuY3lGaWx0ZXIgPT4gZnVuY3Rpb24odmFsKSB7XG4gIGlmICgodHlwZW9mICh2YWwpID09PSAndW5kZWZpbmVkJykgfHwgKHZhbCA9PT0gbnVsbCkgfHwgKHZhbCA9PT0gJ251bGwnKSB8fCAodmFsID09PSAnJykpIHtcbiAgICB2YWwgPSAwXG4gIH1cbiAgcmV0dXJuIGFnQ3VycmVuY3lGaWx0ZXIodmFsKVxufVxuXG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGZvcm1zTW9kdWxlKVxuXG5hcHAuZGlyZWN0aXZlKCdlZGl0YWJsZUZvcm1CdXR0b25zJywgW1xuICAnJHBhcnNlJywgJHBhcnNlID0+ICh7XG4gICAgcmVzdHJpY3Q6ICdBJyxcblxuICAgIHNjb3BlOiB7XG4gICAgICBmb3JtOiAnPWVkaXRhYmxlRm9ybUJ1dHRvbnMnLFxuICAgICAgY2FuY2VsQ2FsbEJhY2s6ICcmb25jYW5jZWwnXG4gICAgfSxcblxuICAgIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICByZXR1cm4gc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNjb3BlLmZvcm0uJGNhbmNlbCgpXG4gICAgICAgIGlmICghXy5pc05pbChzY29wZS5jYW5jZWxDYWxsQmFjaykpIHtcbiAgICAgICAgICByZXR1cm4gc2NvcGUuY2FuY2VsQ2FsbEJhY2soKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiBgXFxcbjxkaXYgY2xhc3M9XCJidXR0b25zXCI+XG48IS0tXG48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAgIG5nLWNsaWNrPVwiZm9ybS4kc2hvdygpXCJcbiAgICAgICAgbmctaWY9XCIhZm9ybS4kdmlzaWJsZVwiPlxuICBFZGl0XG48L2J1dHRvbj5cbi0tPlxuPHNwYW4gbmctaWY9XCJmb3JtLiR2aXNpYmxlXCI+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgbmctZGlzYWJsZWQ9XCJmb3JtLiR3YWl0aW5nXCIgbmctY2xpY2s9XCJjYW5jZWwoKVwiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+IENhbmNlbCA8L2J1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXByaW1hcnlcIiBuZy1kaXNhYmxlZD1cImZvcm0uJGludmFsaWQgfHwgZm9ybS4kd2FpdGluZ1wiPjxpIGNsYXNzPVwiZmEgZmEtY2hlY2sgZmEtaW52ZXJzZVwiPjwvaT4gU2F2ZSA8L2J1dHRvbj5cbjwvc3Bhbj5cbjwvZGl2PlxcXG5gXG4gIH0pXG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi9jb21tb25Nb2R1bGUnXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpXG5cbi8vIENvbnZlcnQgbGluZSBicmFrcyB0byBodG1sXG5hcHAuZmlsdGVyKCduZXdMaW5lcycsICgpID0+IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCFhbmd1bGFyLmlzU3RyaW5nKHRleHQpKSB7IHJldHVybiB0ZXh0IH1cbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFxuL2csICc8YnIgLz4nKVxufSlcbiIsImltcG9ydCBhZ1NlbGVjdE1vZHVsZSBmcm9tICcuL2FnU2VsZWN0Mk1vZHVsZSdcbmltcG9ydCAnLi9TZWxlY3QyT3B0aW9ucydcbmltcG9ydCAnLi9hZ1NlbGVjdCdcblxuZXhwb3J0IGRlZmF1bHQgYWdTZWxlY3RNb2R1bGVcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8gdHJlYXQgdGV4dCBpbnB1dHMgYXMgbnVtYmVycyB3aXRob3V0IGhhdmluZyBpbnB1dCB0eXBlIGFzIG51bWJlclxuLy8gSXQgd2lsbCBwYXJzZSB0aGUgaW5wdXQgdmFsdWVzIHVzaW5nIHBhcnNlRmxvYXQgc28gYW5ndWxhciBjb250cm9sbGVycyBjYW4gdHJlYXQgdGhlIG1vZGVsIHZhbHVlIGFzIG51bWhlcnMgd2l0aG91dCBoYXZpbmcgdG8gY29udmVydCBpdCB0byBudW1iZXIgZWFjaCB0aW1lLlxuXG5hcHAuZGlyZWN0aXZlKCdhZ051bWJlcicsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBOVU1CRVJfUkVHRVhQID0gL15cXHMqKFxcLXxcXCspPyhcXGQrfChcXGQqKFxcLlxcZCopKSlcXHMqJC8gLy8gYm9ycm93ZWQgZnJvbSBhbmd1bGFyanNcblxuICByZXR1cm4ge1xuICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAvLyBib3Jyb3dlZCBsb2dpYyBmcm9tIGFuZ3VsYXJqcyBudW1iZXIgZGlyZWN0aXZlXG4gICAgICBjdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSBjdHJsLiRpc0VtcHR5KHZhbHVlKVxuICAgICAgICBpZiAoZW1wdHkgfHwgTlVNQkVSX1JFR0VYUC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfSBlbHNlIGlmIChlbXB0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBjdHJsLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKGN0cmwuJGlzRW1wdHkodmFsdWUpKSB7IHJldHVybiAnJyB9IGVsc2UgeyByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZChhdHRycy5mcmFjdGlvblNpemUgfHwgMikgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuZm9ybXMuZGlyZWN0aXZlKCdhZ1N1Ym1pdEJ1dHRvbicsICgpID0+ICh7XG4gIHJlc3RyaWN0OiAnRScsXG4gIHJlcGxhY2U6IHRydWUsXG4gIHNjb3BlOiB0cnVlLFxuICByZXF1aXJlOiAnXmZvcm0nLFxuXG4gIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBmb3JtQ3RybCkge1xuICAgIC8vIENoZWNrIGlmIHN1Ym1pdCBidXR0b24gaXMgaW4gdGhlIG1vZGFsIHdpbmRvd1xuICAgIC8vIHVzZWQgdG8gZGlzYWJsZSBzdWJtaXQgYnV0dG9uIHdoaWxlIG1vZGFsIGNsb3NpbmdcbiAgICBsZXQgaXNNb2RhbFdpbmRvd1xuICAgIGlmICghXy5pc05pbChlbGVtZW50WzBdLm9mZnNldFBhcmVudCkpIHsgaXNNb2RhbFdpbmRvdyA9IGVsZW1lbnRbMF0ub2Zmc2V0UGFyZW50Lmhhc0F0dHJpYnV0ZSgnbW9kYWwtd2luZG93JykgfVxuICAgIGNvbnN0IGlzU2F2aW5nID0gKCkgPT4gZm9ybUN0cmwuJHNhdmluZ1xuICAgIHNjb3BlLiR3YXRjaChpc1NhdmluZywgZnVuY3Rpb24oc2F2aW5nKSB7XG4gICAgICBpZiAoIShpc01vZGFsV2luZG93ICYmIHNjb3BlLnNhdmluZykpIHsgcmV0dXJuIHNjb3BlLnNhdmluZyA9IHNhdmluZyB9XG4gICAgfSlcblxuICAgIHJldHVybiBzY29wZS50ZXh0ID0gYXR0cnMudGV4dCB8fCAnU2F2ZSdcbiAgfSxcblxuICB0ZW1wbGF0ZTogYFxcXG48YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tcHJpbWFyeVwiXG4gICAgICAgIG5nLWRpc2FibGVkPVwic2F2aW5nXCI+XG4gIDxpIGNsYXNzPVwiZmEgZmEtY2hlY2sgZmEtaW52ZXJzZVwiPjwvaT4ge3t0ZXh0fX08c3BhbiBuZy1zaG93PVwic2F2aW5nXCI+Li4uPC9zcGFuPlxuPC9idXR0b24+XFxcbmBcbn0pKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIvc3JjL2pzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlcidcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIGZvcm1zID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbmZvcm1zLnByb3ZpZGVyKCdhZ0RhdGUnLCBmdW5jdGlvbigpIHtcbiAgbGV0IHZpZXdGb3JtYXQgPSAnTU0vREQvWVlZWSdcblxuICBsZXQgZGF0ZSA9ICdZWVlZLU1NLUREVEhIOm1tWidcbiAgbGV0IGxvY2FsRGF0ZVRpbWUgPSAnWVlZWS1NTS1ERFRISDptbSdcbiAgbGV0IGxvY2FsRGF0ZSA9ICdZWVlZLU1NLUREJ1xuXG4gIHJldHVybiB7XG4gICAgc2V0Vmlld0Zvcm1hdChmb3JtYXQpIHtcbiAgICAgIHJldHVybiB2aWV3Rm9ybWF0ID0gZm9ybWF0XG4gICAgfSxcblxuICAgIHNldExvY2FsRGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICAgIHJldHVybiBsb2NhbERhdGUgPSBmb3JtYXRcbiAgICB9LFxuXG4gICAgc2V0TG9jYWxEYXRlVGltZUZvcm1hdChmb3JtYXQpIHtcbiAgICAgIHJldHVybiBsb2NhbERhdGVUaW1lID0gZm9ybWF0XG4gICAgfSxcblxuICAgIHNldERhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgICByZXR1cm4gZGF0ZSA9IGZvcm1hdFxuICAgIH0sXG5cbiAgICAkZ2V0OiBbXG4gICAgICAoKSA9PiAoe1xuICAgICAgICBnZXRWaWV3Rm9ybWF0KCkge1xuICAgICAgICAgIHJldHVybiB2aWV3Rm9ybWF0XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SXNvRm9ybWF0KG5hbWUpIHtcbiAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOiByZXR1cm4gZGF0ZVxuICAgICAgICAgICAgY2FzZSAnbG9jYWxEYXRlVGltZSc6IHJldHVybiBsb2NhbERhdGVUaW1lXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbG9jYWxEYXRlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzVmFsaWQodmFsdWUsIGZvcm1hdCkge1xuICAgICAgICAgIHJldHVybiBtb21lbnQodmFsdWUsIGZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgXVxuICB9XG59KVxuXG4vLyB1c2VzIGh0dHA6Ly9lb25hc2Rhbi5naXRodWIuaW8vYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyL1xuZm9ybXMuZGlyZWN0aXZlKCdhZ0RhdGVwaWNrZXInLCBbXG4gICckdGltZW91dCcsICdhZ0RhdGUnLCAoJHRpbWVvdXQsIGFnRGF0ZSkgPT4gKHtcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgcmVzdHJpY3Q6ICdBRScsXG5cbiAgICBzY29wZToge1xuICAgICAgZGF0ZXBpY2tlck9wdGlvbnM6ICdAJ1xuICAgIH0sXG5cbiAgICBsaW5rKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBmb3JtYXQ6IGFnRGF0ZS5nZXRWaWV3Rm9ybWF0KCksXG4gICAgICAgIGlzb0Zvcm1hdDogYWdEYXRlLmdldElzb0Zvcm1hdCgkYXR0cnMuZGF0ZVR5cGUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChkZWZhdWx0T3B0aW9ucywgJHNjb3BlLiRldmFsKCRhdHRycy5kYXRlcGlja2VyT3B0aW9ucykpXG4gICAgICBjb25zdCB7IGlzb0Zvcm1hdCB9ID0gb3B0aW9uc1xuICAgICAgZGVsZXRlIG9wdGlvbnMuaXNvRm9ybWF0XG5cbiAgICAgIC8vIERlY29yYXRlIGRhdGVwaWNrZXIgd2l0aCBidXR0b24gYW5kIHNvbWUgdXNlZnVsbCBzdHVmZiBpZiBkaXJlY3RpdmUgaXMgZWxlbWVudCwgbm90IGF0dHJpYnV0ZVxuICAgICAgaWYgKF8uaXNOaWwoJGF0dHJzLmFnRGF0ZXBpY2tlcikpIHtcbiAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2lucHV0LWdyb3VwJykuYWRkQ2xhc3MoJ2RhdGUnKS5hZGRDbGFzcygnYWctZGF0ZXBpY2tlcicpXG4gICAgICAgIGNvbnN0IGlucHV0ID0gYDxpbnB1dCBuYW1lPSckeyRhdHRycy5pZCB8fCAnJ30nIGNsYXNzPSdmb3JtLWNvbnRyb2wnIHBsYWNlaG9sZGVyPSckeyRhdHRycy5wbGFjZWhvbGRlciB8fCAnJ30nICR7IV8uaXNOaWwoJGF0dHJzLmRpc2FibGVkKSA/ICdkaXNhYmxlZCcgOiB1bmRlZmluZWR9PlxuPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPjxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIj48L2k+PC9zcGFuPmBcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGlucHV0KVxuICAgICAgfVxuXG4gICAgICAkZWxlbWVudC5vbignZHAuY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKG5nTW9kZWxDdHJsKSB7XG4gICAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFfLmlzTmlsKGV2ZW50LmRhdGUpICYmIChldmVudC5kYXRlLl9kICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUobW9tZW50LnV0YyhldmVudC5kYXRlLl9kKS5mb3JtYXQoaXNvRm9ybWF0KSlcbiAgICAgICAgICAgICAgcmV0dXJuIG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnZGF0ZUZvcm1hdCcsIGFnRGF0ZS5pc1ZhbGlkKG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlLCBpc29Gb3JtYXQpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkuZGF0ZXRpbWVwaWNrZXIob3B0aW9ucylcblxuICAgICAgY29uc3Qgc2V0UGlja2VyVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBudWxsXG4gICAgICAgIGlmIChuZ01vZGVsQ3RybCAmJiBuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKSB7XG4gICAgICAgICAgZGF0ZSA9IG1vbWVudC51dGMobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSwgaXNvRm9ybWF0KVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSAkZWxlbWVudC5kYXRhKCdEYXRlVGltZVBpY2tlcicpXG4gICAgICAgIGlmIChkYXRlcGlja2VyKSB7IHJldHVybiBkYXRlcGlja2VyLmRhdGUoZGF0ZSkgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmdNb2RlbEN0cmwpIHtcbiAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlciA9ICgpID0+IHNldFBpY2tlclZhbHVlKClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXRQaWNrZXJWYWx1ZSgpXG4gICAgfVxuICB9KVxuXSlcblxuZm9ybXMuZGlyZWN0aXZlKCdhZ0RhdGUnLCBbXG4gICdhZ0RhdGUnLCBhZ0RhdGUgPT4gKHtcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICByZXF1aXJlOiAnP25nTW9kZWwnLFxuXG4gICAgbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG5nTW9kZWxDdHJsKSB7XG4gICAgICBjb25zdCBtb2RlbEZvcm1hdCA9IGFnRGF0ZS5nZXRJc29Gb3JtYXQoYXR0cnMuZGF0ZVR5cGUpXG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gYXR0cnMuZGF0ZUZvcm1hdCB8fCBhZ0RhdGUuZ2V0Vmlld0Zvcm1hdCgpXG5cbiAgICAgIG5nTW9kZWxDdHJsLiRwYXJzZXJzLnNoaWZ0KClcbiAgICAgIG5nTW9kZWxDdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24odmlld1ZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhZ0RhdGUuaXNWYWxpZCh2aWV3VmFsdWUsIGRhdGVGb3JtYXQpXG4gICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnZGF0ZUZvcm1hdCcsIGlzVmFsaWQpXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModmlld1ZhbHVlLCBkYXRlRm9ybWF0KS5mb3JtYXQobW9kZWxGb3JtYXQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBuZ01vZGVsQ3RybC4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKG1vZGVsVmFsdWUpIHtcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGFnRGF0ZS5pc1ZhbGlkKG1vZGVsVmFsdWUsIG1vZGVsRm9ybWF0KVxuICAgICAgICBuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ2RhdGVGb3JtYXQnLCBpc1ZhbGlkKVxuICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyhtb2RlbFZhbHVlLCBtb2RlbEZvcm1hdCkuZm9ybWF0KGRhdGVGb3JtYXQpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGFnU2VsZWN0TW9kdWxlIGZyb20gJy4vYWdTZWxlY3QyTW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgc21vZCA9IGFuZ3VsYXIubW9kdWxlKGFnU2VsZWN0TW9kdWxlKVxuXG4vLyBDcmVhdGVzIHNlbGVjdDIgY29tcG9uZW50IGFsb25nIHdpdGggdGhlIFwic2hvd1wiIGJ1dHRvblxuLy8gT3B0aW9uczpcbi8vICAgYHNlbGVjdC1vcHRpb25zYCB0YWtlcyBzZWxlY3QyIG9wdGlvbnMgZnJvbSB0aGUgY29udHJvbGxlclxuLy8gICBgbmctbW9kZWxgIHRha2VzIGEgbW9kZWxcbnNtb2QuZGlyZWN0aXZlKCdhZ1NlbGVjdDInLCBbXG4gICckcm9vdFNjb3BlJywgJyRjb21waWxlJywgJyRsb2cnLCAncGF0aFdpdGhDb250ZXh0JyxcbiAgKCRyb290U2NvcGUsICRjb21waWxlLCAkbG9nLCBwYXRoV2l0aENvbnRleHQpID0+ICh7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgICBzY29wZToge1xuICAgICAgc2VsZWN0T3B0aW9uczogJz0nLFxuICAgICAgbmdNb2RlbDogJz0nXG4gICAgfSxcblxuICAgIGNvbXBpbGUoZWxlbWVudCwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcbiAgICAgIC8vIGZpbmQgYSB0ZW1wbGF0ZSBmb3IgdGhlIHJlc3VsdCBpdGVtXG4gICAgICBsZXQgcmVzdWx0VGVtcGxhdGUgPSBudWxsXG4gICAgICBjb25zdCBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpXG5cbiAgICAgIHRyYW5zY2x1ZGUoc2NvcGUsIGNsb25lID0+ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgICAgIGZvciAoZWxlbWVudCBvZiBBcnJheS5mcm9tKGNsb25lKSkge1xuICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgIV8uaXNOaWwoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FnLXNlbGVjdDItcmVzdWx0JykpKSB7XG4gICAgICAgICAgICByZXN1bHRUZW1wbGF0ZSA9IGVsZW1lbnQub3V0ZXJIVE1MXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh1bmRlZmluZWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0pKCkpXG5cbiAgICAgIC8vIHByZSBsaW5raW5nIGZ1bmN0aW9uXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmUoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgbGV0IG9wdGlvbnMgPSBhbmd1bGFyLmNvcHkoc2NvcGUuc2VsZWN0T3B0aW9ucyB8fCB7IG11bHRpcGxlOiB0cnVlIH0pXG4gICAgICAgICAgaWYgKCFfLmlzTmlsKGF0dHJzLnNlbGVjdE11bHRpcGxlKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5tdWx0aXBsZSA9IGF0dHJzLnNlbGVjdE11bHRpcGxlID09PSAndHJ1ZSdcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUub3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICAgICAgIC8vIHJlYWQgYG1pbmltdW1JbnB1dExlbmd0aGAgb3B0aW9uIGZyb20gdGhlIGF0dHJpYnV0ZVxuICAgICAgICAgIGlmIChvcHRpb25zLm1pbmltdW1JbnB1dExlbmd0aCA9PSBudWxsKSB7IG9wdGlvbnMubWluaW11bUlucHV0TGVuZ3RoID0gMSB9XG4gICAgICAgICAgc2NvcGUuc2hvd0ZpbGwgPSBhdHRycy5maWxsQWxsICYmIChhdHRycy5maWxsQWxsID09PSAndHJ1ZScpXG4gICAgICAgICAgaWYgKCFfLmlzTmlsKGF0dHJzLnNlbGVjdE1pbmltdW1JbnB1dExlbmd0aCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWluaW11bUlucHV0TGVuZ3RoID0gcGFyc2VJbnQoYXR0cnMuc2VsZWN0TWluaW11bUlucHV0TGVuZ3RoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIV8uaXNOaWwoYXR0cnMuc2VsZWN0QWxsKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5taW5pbXVtSW5wdXRMZW5ndGggPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHNldCB0aGUgZGVmYXVsdCBgd2lkdGhgXG4gICAgICAgICAgaWYgKG9wdGlvbnMud2lkdGggPT0gbnVsbCkgeyBvcHRpb25zLndpZHRoID0gJ3Jlc29sdmUnIH1cblxuICAgICAgICAgIC8vIGNyZWF0ZSBgYWpheGBcbiAgICAgICAgICBpZiAoXy5pc05pbChvcHRpb25zLmFqYXgpICYmICFfLmlzTmlsKGF0dHJzLnNlbGVjdEFqYXhVcmwpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmFqYXggPSB7XG4gICAgICAgICAgICAgIHVybDogcGF0aFdpdGhDb250ZXh0KGF0dHJzLnNlbGVjdEFqYXhVcmwpLFxuICAgICAgICAgICAgICBkYXRhKHRlcm0sIHBhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgcTogdGVybSwgLy8gc2VhcmNoIHRlcm0gKHF1ZXJ5IHBhcmFtcylcbiAgICAgICAgICAgICAgICAgIG1heDogMjAsXG4gICAgICAgICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgICAgICAgc29ydDogJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgb3JkZXI6ICdhc2MnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZXN1bHRzKGRhdGEsIHBhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3JlID0gcGFnZSA8IGRhdGEudG90YWxcbiAgICAgICAgICAgICAgICByZXR1cm4geyByZXN1bHRzOiBkYXRhLnJvd3MsIG1vcmUgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlYWQgYHF1aWV0TWlsbGlzYCBvcHRpb24gZnJvbSB0aGUgYXR0cmlidXRlXG4gICAgICAgICAgICAvLyBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIHRoZSB1c2VyIHRvXG4gICAgICAgICAgICAvLyBzdG9wIHR5cGluZyBiZWZvcmUgaXNzdWluZyB0aGUgYWpheCByZXF1ZXN0XG4gICAgICAgICAgICBvcHRpb25zLmFqYXgucXVpZXRNaWxsaXMgPSA1MDBcbiAgICAgICAgICAgIGlmICghXy5pc05pbChhdHRycy5zZWxlY3RBamF4UXVpZXRNaWxsaXMpKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnMuYWpheC5xdWlldE1pbGxpcyA9IHBhcnNlSW50KGF0dHJzLnNlbGVjdEFqYXhRdWlldE1pbGxpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjcmVhdGUgYGZvcm1hdFJlc3VsdGAgZnVuY3Rpb24gZnJvbSB0aGUgZ2l2ZW4gdGVtcGxhdGVcbiAgICAgICAgICBpZiAoIV8uaXNOaWwocmVzdWx0VGVtcGxhdGUpKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5mb3JtYXRSZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBvcHRpb25zLmZvcm1hdFJlc3VsdCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0geyBpbnRlcnBvbGF0ZTogL1xce1xceyguKz8pXFx9XFx9L2cgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQoXy50ZW1wbGF0ZShyZXN1bHRUZW1wbGF0ZSwgb3B0aW9ucykoeyBpdGVtIH0pKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY3JlYXRlIGRlZmF1bHQgYGZvcm1hdFNlbGVjdGlvbmAgbWV0aG9kXG4gICAgICAgICAgaWYgKG9wdGlvbnMuZm9ybWF0U2VsZWN0aW9uID09IG51bGwpIHsgb3B0aW9ucy5mb3JtYXRTZWxlY3Rpb24gPSBpdGVtID0+IGl0ZW0ubmFtZSB9XG5cbiAgICAgICAgICByZXR1cm4gJGxvZy5kZWJ1ZygnW2Zvcm1zXSBpbml0aWFsaXppbmcgQWdTZWxlY3QyIGNvbXBvbmVudCcsIHNjb3BlLm9wdGlvbnMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IGBcXFxuPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gIDxpbnB1dCB1aS1zZWxlY3QyPVwib3B0aW9uc1wiIG5nLW1vZGVsPVwibmdNb2RlbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cImhpZGRlblwiLz5cbiAgPHNlbGVjdC1maWxsIG5nLWlmPVwic2hvd0ZpbGxcIj48L3NlbGVjdC1maWxsPlxuPC9kaXY+XG5cXFxuYFxuICB9KVxuXSlcblxuc21vZC5kaXJlY3RpdmUoJ2FnU2VsZWN0Mk9wZW4nLCAoKSA9PiAoe1xuICByZXN0cmljdDogJ0UnLFxuICByZXBsYWNlOiB0cnVlLFxuICBzY29wZTogdHJ1ZSxcblxuICBjb250cm9sbGVyOiBbJyRzY29wZScsICckZWxlbWVudCcsICgkc2NvcGUsICRlbGVtZW50KSA9PiAkc2NvcGUub3BlblNlbGVjdDIgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzZWxlY3RFbCA9ICRlbGVtZW50LnBhcmVudCgpLmZpbmQoJy5zZWxlY3QyLWNvbnRhaW5lcicpXG4gICAgc2VsZWN0RWwuc2VsZWN0Mignb3BlbicpXG4gIH1cbiAgXSxcblxuICB0ZW1wbGF0ZTogYFxcXG48c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIG9wZW4tc2VsZWN0MiBidG4tZGVmYXVsdCBcIiB0eXBlPVwiYnV0dG9uXCIgbmctY2xpY2s9XCJvcGVuU2VsZWN0MigpXCI+PGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+PC9idXR0b24+XG48L3NwYW4+XFxcbmBcbn0pKVxuXG5zbW9kLmRpcmVjdGl2ZSgnc2VsZWN0RmlsbCcsIFtcbiAgJyRodHRwJywgJ3BhdGhXaXRoQ29udGV4dCcsICckcGFyc2UnLFxuICAoJGh0dHAsIHBhdGhXaXRoQ29udGV4dCwgJHBhcnNlKSA9PiAoe1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICBwcmlvcml0eTogMjAwMCxcblxuICAgIGxpbmsoc2NvcGUsICRlbGVtZW50LCBhdHRycykge1xuICAgICAgcmV0dXJuIHNjb3BlLmZpbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0RWwgPSAkZWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdkaXZbc2VsZWN0LWFqYXgtdXJsXScpWzBdXG4gICAgICAgIGNvbnN0IG1vZGVsID0gJHBhcnNlKHNlbGVjdEVsLmF0dHJpYnV0ZXNbJ25nLW1vZGVsJ10udmFsdWUpXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQocGF0aFdpdGhDb250ZXh0KHNlbGVjdEVsLmF0dHJpYnV0ZXNbJ3NlbGVjdC1hamF4LXVybCddLnZhbHVlKSkudGhlbihmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IFtdXG4gICAgICAgICAgaWYgKG1vZGVsKHNjb3BlLiRwYXJlbnQuJHBhcmVudCkubGVuZ3RoIDwgcmVzcC5kYXRhLnJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXNwLmRhdGEucm93c1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbW9kZWwuYXNzaWduKHNjb3BlLiRwYXJlbnQuJHBhcmVudCwgcmVzdWx0KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogYFxcXG48c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIG9wZW4tc2VsZWN0MiBidG4tZGVmYXVsdCBcIiB0eXBlPVwiYnV0dG9uXCIgbmctY2xpY2s9XCJmaWxsKClcIj48aSBjbGFzcz1cImZhIGZhLXRydWNrXCI+PC9pPjwvYnV0dG9uPlxuPC9zcGFuPlxcXG5gXG4gIH0pXG5dKVxuXG5zbW9kLmRpcmVjdGl2ZSgnYWdTZWxlY3QyRmlsbCcsIFtcbiAgJyRodHRwJywgJ3BhdGhXaXRoQ29udGV4dCcsICckcGFyc2UnLFxuICAoJGh0dHAsIHBhdGhXaXRoQ29udGV4dCwgJHBhcnNlKSA9PiAoe1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICBzY29wZTogdHJ1ZSxcblxuICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRlbGVtZW50JywgKCRzY29wZSwgJGVsZW1lbnQpID0+ICRzY29wZS5maWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBzZWxlY3RFbCA9ICRlbGVtZW50LnBhcmVudCgpLmZpbmQoJy5zZWxlY3QyLWNvbnRhaW5lcicpXG4gICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RFbFswXS5hdHRyaWJ1dGVzLmlkLnZhbHVlLnJlcGxhY2UoJ3MyaWRfJywgJycpKVxuICAgICAgY29uc3QgbW9kZWwgPSAkcGFyc2UoYW5ndWxhci5lbGVtZW50KHNlbGVjdClbMF0uYXR0cmlidXRlc1snbmctbW9kZWwnXS52YWx1ZSlcbiAgICAgIGxldCByZXN1bHQgPSBfLm1hcChzZWxlY3Qub3B0aW9ucywgJ3ZhbHVlJylcbiAgICAgIGlmICghXy5pc05pbChtb2RlbCgkc2NvcGUuJHBhcmVudCkpICYmIChtb2RlbCgkc2NvcGUuJHBhcmVudCkubGVuZ3RoID09PSByZXN1bHQubGVuZ3RoKSkge1xuICAgICAgICByZXN1bHQgPSBbXVxuICAgICAgfVxuICAgICAgbW9kZWwuYXNzaWduKCRzY29wZS4kcGFyZW50LCByZXN1bHQpXG4gICAgfVxuICAgIF0sXG5cbiAgICBsaW5rKHNjb3BlLCAkZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIHJldHVybiAkZWxlbWVudC5wYXJlbnQoKS5jc3MoJ2Rpc3BsYXknLCAndGFibGUnKVxuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogYFxcXG48c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIG9wZW4tc2VsZWN0MiBidG4tZGVmYXVsdCBcIiB0eXBlPVwiYnV0dG9uXCIgbmctY2xpY2s9XCJmaWxsKClcIj48aSBjbGFzcz1cImZhIGZhLXRydWNrXCI+PC9pPjwvYnV0dG9uPlxuPC9zcGFuPlxcXG5gXG4gIH0pXG5dKVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIG1peGluID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbm1peGluLmZhY3RvcnkoJ01hc3NVcGRhdGVNaXhpbicsIFtcbiAgJyRsb2cnLCAnJHBhcnNlJywgJyR1aWJNb2RhbCcsICdwYXRoV2l0aENvbnRleHQnLCAnTm90aWZpY2F0aW9uRGlhbG9nU2VydicsXG4gICgkbG9nLCAkcGFyc2UsICRtb2RhbCwgcGF0aFdpdGhDb250ZXh0LCBOb3RpZmljYXRpb25EaWFsb2dTZXJ2KSA9PiBmdW5jdGlvbigkc2NvcGUsIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7IGFyZ3MgPSB7fSB9XG4gICAgbGV0IHsgZ3JpZE5hbWUsIHRlbXBsYXRlVXJsLCBjb250cm9sbGVyLCBleHRyYVBhcmFtcyB9ID0gYXJnc1xuICAgIGlmIChjb250cm9sbGVyID09IG51bGwpIHsgY29udHJvbGxlciA9ICdNYXNzVXBkYXRlRm9ybUN0cmwnIH1cblxuICAgIHJldHVybiAkc2NvcGUubWFzc1VwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgZ3JpZCA9ICRwYXJzZShncmlkTmFtZSkoJHNjb3BlKVxuICAgICAgaWYgKF8uaXNOaWwoZ3JpZCkpIHsgdGhyb3cgbmV3IEVycm9yKCd0aGUgZ3JpZCBpcyBub3QgZGVmaW5lZCcpIH1cblxuICAgICAgLy8gLi5ncmFiIHNlbGVjdGVkIHJvdyBpZHNcbiAgICAgIGNvbnN0IHNlbGVjdGVkSWRzID0gZ3JpZC5nZXRTZWxlY3RlZFJvd0lkcygpXG4gICAgICBpZiAoc2VsZWN0ZWRJZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkRpYWxvZ1NlcnYub3BlbignUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCBvbmUgcm93LicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gJG1vZGFsLm9wZW4oe1xuXG4gICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoV2l0aENvbnRleHQodGVtcGxhdGVVcmwpLFxuICAgICAgICBjb250cm9sbGVyLFxuXG4gICAgICAgIGtleWJvYXJkOiBmYWxzZSwgLy8gZG8gbm90IGNsb3NlIHRoZSBkaWFsb2cgd2l0aCBFU0Mga2V5XG4gICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJywgLy8gZG8gbm90IGNsb3NlIG9uIGNsaWNrIG91dHNpZGUgb2YgdGhlIGRpYWxvZ1xuXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICBzZWxlY3RlZElkcygpIHsgcmV0dXJuIHNlbGVjdGVkSWRzIH0sXG4gICAgICAgICAgZ3JpZCgpIHsgcmV0dXJuIGdyaWQgfSxcbiAgICAgICAgICBleHRyYVBhcmFtcygpIHsgcmV0dXJuIGV4dHJhUGFyYW1zIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXSlcblxuLy8gRGVjb3JhdGVzIHRoZSAkc2NvcGUgd2l0aCBtYXNzIHVwZGF0ZSBtYWdpY1xubWl4aW4uZmFjdG9yeSgnbWFzc1VwZGF0ZUZvcm1DdHJsTWl4aW4nLCBbXG4gICckbG9nJywgJ01hc3NVcGRhdGVIYW5kbGVyJyxcbiAgKCRsb2csIE1hc3NVcGRhdGVIYW5kbGVyKSA9PiBmdW5jdGlvbigkc2NvcGUsIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7IGFyZ3MgPSB7fSB9XG4gICAgY29uc3QgeyBkaWFsb2csIFJlc291cmNlLCBzZWxlY3RlZElkcywgZ3JpZCwgYmVmb3JlU2F2ZSB9ID0gYXJnc1xuXG4gICAgLy8gR2VuZXJpYyBtZXRob2QgZm9yIG1hc3MgdXBkYXRpbmcgc2VsZWN0ZWQgcm93c1xuICAgICRzY29wZS5tYXNzVXBkYXRlID0gZnVuY3Rpb24ocmVjb3Jkcykge1xuICAgICAgbGV0IGRhdGEgPSBhbmd1bGFyLmNvcHkocmVjb3JkcylcbiAgICAgICRsb2cuaW5mbygnW2Zvcm1zXSBtYXNzIHVwZGF0ZScsIGRhdGEpXG5cbiAgICAgIC8vIGBiZWZvcmVTYXZlYCBjYWxsYmFjayBpcyBnaXZlblxuICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihiZWZvcmVTYXZlKSkge1xuICAgICAgICAvLyB0cmFuc2Zvcm0gdGhlIGRhdGFcbiAgICAgICAgZGF0YSA9IGJlZm9yZVNhdmUoZGF0YSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1zID0geyBpZHM6IHNlbGVjdGVkSWRzLCBkYXRhIH1cbiAgICAgIGNvbnN0IHByb21pc2UgPSBSZXNvdXJjZS5tYXNzVXBkYXRlKHBhcmFtcykuJHByb21pc2VcblxuICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgTWFzc1VwZGF0ZUhhbmRsZXIoZ3JpZCwgcmVzdWx0KVxuICAgICAgICBncmlkLmNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgJHNjb3BlLmNsb3NlRGlhbG9nKClcblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIEdlbmVyaWMgbWV0aG9kIGZvciBjbG9zaW5nIHRoZSBtYXNzIHVwZGF0ZSBkaWFsb2dcbiAgICByZXR1cm4gJHNjb3BlLmNsb3NlRGlhbG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICAkbG9nLmluZm8oJ1tmb3Jtc10gY2xvc2luZyB0aGUgbWFzcyB1cGRhdGUgZGlhbG9nJylcbiAgICAgIHJldHVybiBkaWFsb2cuY2xvc2UoKVxuICAgIH1cbiAgfVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuLy8gVXNlcyB0byBzaG93IGVkaXQgcGFuZWwgZm9yIGdyaWQgcm93LiBTdXBwb3J0cyBkYmwgY2xpY2sgb24gZ3JpZCBjZWxsLlxuYXBwLmRpcmVjdGl2ZShcImdyaWRDcnVkXCIsIFtcIiRjb250cm9sbGVyXCIsIFwiJHRpbWVvdXRcIiwgKCRjb250cm9sbGVyLCAkdGltZW91dCkgPT4gKHtcbiAgcmVzdHJpY3Q6IFwiQVwiLFxuICByZXBsYWNlOiB0cnVlLFxuICBzY29wZTogdHJ1ZSxcbiAgdGVtcGxhdGU6ICc8ZGl2ICBuZy1zaG93PVwic2hvd0Zvcm1cIj48bmctaW5jbHVkZSBuZy1pZj1cIiFpc01vZGFsXCIgc3JjPVwidGVtcGxhdGUgfCB3aXRoQ29udGV4dFwiPjwvbmctaW5jbHVkZT48L2Rpdj4nLFxuXG4gIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgY29uc3QgZ3JpZEVsID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFthZy1ncmlkLW5hbWU9JHthdHRycy5ncmlkTmFtZX1dYCkpLmZpbmQoXCJ0YWJsZS5ncmlkelwiKVxuICAgIGNvbnN0IGNsaWNrcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZ3JpZEVsLmpxR3JpZCgnc2V0R3JpZFBhcmFtJywge29uZGJsQ2xpY2tSb3c6IHNjb3BlLmRibENsaWNrfSlcbiAgICAgIGlmICgoYXR0cnMua2V5Ym9hcmRuYXYgPT09IHRydWUpIHx8IChhdHRycy5rZXlib2FyZG5hdiA9PT0gJ3RydWUnKSkge1xuICAgICAgICBjb25zdCBjb2xOYW1lcyA9IGdyaWRFbC5qcUdyaWQoJ2dldEdyaWRQYXJhbScsJ2NvbE5hbWVzJylcbiAgICAgICAgcmV0dXJuIGdyaWRFbC5iaW5kKFwia2V5ZG93blwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgaWYgKHNjb3BlLmxhc3RTZWxlY3RlZFJvdykge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoICE9PSAxMykge1xuICAgICAgICAgICAgICBzY29wZS51bkhpZ2hsaWdodENlbGwoc2NvcGUubGFzdFNlbGVjdGVkUm93LCBzY29wZS5sYXN0U2VsZWN0ZWRDZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaWRzID0gZ3JpZEVsLmpxR3JpZCgnZ2V0RGF0YUlEcycpXG4gICAgICAgICAgICBjb25zdCBmaXJzdElkID0gaWRzWzBdXG4gICAgICAgICAgICBjb25zdCBsYXN0SWQgPSBpZHNbaWRzLmxlbmd0aC0xXVxuICAgICAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICAgICAgICAgICAgc2NvcGUuZGJsQ2xpY2soc2NvcGUubGFzdFNlbGVjdGVkUm93LCBudWxsLCBzY29wZS5sYXN0U2VsZWN0ZWRDZWxsLCBldmVudClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIDQwOiAvL2Rvd25cbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUubGFzdFNlbGVjdGVkUm93ICE9PSBsYXN0SWQpIHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLmxhc3RTZWxlY3RlZFJvdyA9IGlkc1tpZHMuaW5kZXhPZihzY29wZS5sYXN0U2VsZWN0ZWRSb3cpICsgMV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAzODogLy91cFxuICAgICAgICAgICAgICAgIGlmIChzY29wZS5sYXN0U2VsZWN0ZWRSb3cgIT09IGZpcnN0SWQpIHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLmxhc3RTZWxlY3RlZFJvdyA9IGlkc1tpZHMuaW5kZXhPZihzY29wZS5sYXN0U2VsZWN0ZWRSb3cpIC0gMV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAzOTogLy9yaWdodFxuICAgICAgICAgICAgICAgIGlmIChzY29wZS5sYXN0U2VsZWN0ZWRDZWxsICE9PSBjb2xOYW1lcy5sZW5ndGgpIHsgc2NvcGUubGFzdFNlbGVjdGVkQ2VsbCsrIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlIDM3OiAvL2xlZnRcbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUubGFzdFNlbGVjdGVkQ2VsbCAhPT0gMCkgeyBzY29wZS5sYXN0U2VsZWN0ZWRDZWxsLS0gfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzY29wZS5oaWdobGlnaHRDZWxsKHNjb3BlLmxhc3RTZWxlY3RlZFJvdywgc2NvcGUubGFzdFNlbGVjdGVkQ2VsbClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgYXR0cnMuJG9ic2VydmUoXCJncmlkQ3J1ZFwiLCBjbGlja3MpXG4gICAgc2NvcGUuaXNNb2RhbCA9IChhdHRycy5pc01vZGFsID09PSB0cnVlKSB8fCAoYXR0cnMuaXNNb2RhbCA9PT0gJ3RydWUnKVxuXG4gICAgY29uc3QgY3RybExvY2FscyA9IHtcbiAgICAgICRzY29wZTogc2NvcGUsXG4gICAgICAkZWxlbWVudDogZWxlbWVudCxcbiAgICAgICRhdHRyczogYXR0cnNcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9sbGVyTmFtZSA9IGF0dHJzLmNvbnRyb2xsZXIgPyBhdHRycy5jb250cm9sbGVyIDogXCJHcmlkQ3J1ZEN0cmxcIlxuICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBjdHJsTG9jYWxzKVxuXG4gICAgcmV0dXJuIHNjb3BlLiR3YXRjaChcbiAgICAgICgpID0+IHNjb3BlLnNob3dGb3JtIHx8IGZhbHNlLFxuICAgICAgZnVuY3Rpb24obmV3VmFsKSB7XG4gICAgICAgIGlmIChuZXdWYWwpIHtcbiAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoKCkgPT4gc2NvcGUuc2V0Rm9jdXMoZWxlbWVudCkpXG4gICAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuXSlcblxuY2xhc3MgR3JpZENydWRDdHJsIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcGFyc2UsICRsb2csIHJlc291cmNlQnVpbGRlciwgJHdpbmRvdywgcmVzdHJpY3RSZXNvdXJjZSwgJHVpYk1vZGFsLCBwYXRoV2l0aENvbnRleHQsICR0aW1lb3V0KSB7XG5cbiAgICBsZXQgUmVzb3VyY2UgPSBudWxsXG4gICAgbGV0IGJlZm9yZVNhdmUgPSBudWxsXG4gICAgbGV0IGFmdGVyU2F2ZSA9IG51bGxcbiAgICAkc2NvcGUubGFzdFNlbGVjdGVkUm93ID0gbnVsbFxuICAgICRzY29wZS5sYXN0U2VsZWN0ZWRDZWxsID0gbnVsbFxuXG4gICAgaWYgKCRhdHRycy5iZWZvcmVTYXZlKSB7IGJlZm9yZVNhdmUgPSAkc2NvcGVbJGF0dHJzLmJlZm9yZVNhdmVdIH1cbiAgICBpZiAoJGF0dHJzLmFmdGVyU2F2ZSkgeyBhZnRlclNhdmUgPSAkc2NvcGVbJGF0dHJzLmFmdGVyU2F2ZV0gfVxuXG4gICAgY29uc3QgcmVzb3VyY2VOYW1lID0gJGF0dHJzLnJlc291cmNlXG4gICAgUmVzb3VyY2UgPSByZXNvdXJjZUJ1aWxkZXIoYC8ke3Jlc291cmNlTmFtZX1gLCByZXNvdXJjZU5hbWUpXG4gICAgY29uc3QgYWN0aW9uU3VmZml4ID0gcmVzb3VyY2VOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVzb3VyY2VOYW1lLnN1YnN0cmluZygxKVxuXG4gICAgJHNjb3BlLnRlbXBsYXRlID0gJGF0dHJzLnRlbXBsYXRlXG5cbiAgICBjb25zdCBncmlkID0gICgpID0+ICRwYXJzZSgkYXR0cnMuZ3JpZE5hbWUpKCRzY29wZSlcblxuICAgIGNvbnN0IGFsbG93ZWRGaWVsZHMgPSAkcGFyc2UoJGF0dHJzLmFsbG93ZWRGaWVsZHMpKCRzY29wZSlcblxuICAgIGNvbnN0IGhpZGVGb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJHNjb3BlLmlzTW9kYWwpIHtcbiAgICAgICAgJHNjb3BlLm1vZGFsLmNsb3NlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5zaG93Rm9ybSA9IGZhbHNlXG4gICAgICB9XG4gICAgICByZXR1cm4gJHNjb3BlLmhpZ2hsaWdodENlbGwoJHNjb3BlLmxhc3RTZWxlY3RlZFJvdywgJHNjb3BlLmxhc3RTZWxlY3RlZENlbGwpXG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0Zvcm0gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkc2NvcGUuaXNNb2RhbCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0TW9kYWxPcHRpb25zID0ge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoV2l0aENvbnRleHQoJHNjb3BlLnRlbXBsYXRlKSxcbiAgICAgICAgICBrZXlib2FyZDogZmFsc2UsIC8vIGRvIG5vdCBjbG9zZSB0aGUgZGlhbG9nIHdpdGggRVNDIGtleVxuICAgICAgICAgIGJhY2tkcm9wOiBcInN0YXRpY1wiLCAvLyBkbyBub3QgY2xvc2Ugb24gY2xpY2sgb3V0c2lkZSBvZiB0aGUgZGlhbG9nXG4gICAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgICB3aW5kb3dDbGFzczogXCJcIlxuICAgICAgICB9XG4gICAgICAgIGxldCBtb2RhbE9wdGlvbnMgPSBhbmd1bGFyLmZyb21Kc29uKCRhdHRycy5tb2RhbE9wdGlvbnMpXG4gICAgICAgIG1vZGFsT3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKGRlZmF1bHRNb2RhbE9wdGlvbnMsIG1vZGFsT3B0aW9ucylcbiAgICAgICAgbW9kYWxPcHRpb25zLndpbmRvd0NsYXNzID0gbW9kYWxPcHRpb25zLndpbmRvd0NsYXNzICsgXCIgZ3JpZC1jcnVkLW1vZGFsIFwiXG5cbiAgICAgICAgJHNjb3BlLm1vZGFsID0gJHVpYk1vZGFsLm9wZW4oXG4gICAgICAgICAgbW9kYWxPcHRpb25zXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuICRzY29wZS5tb2RhbC5yZW5kZXJlZC50aGVuKCgpID0+ICR0aW1lb3V0KCgpID0+ICRzY29wZS5zZXRGb2N1cyhhbmd1bGFyLmVsZW1lbnQoYW5ndWxhci5lbGVtZW50KFwiLmdyaWQtY3J1ZC1tb2RhbFwiKVswXSkpXG4gICAgICAgICxcbiAgICAgICAgICA1MDApKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS5zaG93Rm9ybSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlZGl0QWN0aW9uID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgIGxldCByZWNvcmRcbiAgICAgICRzY29wZS51bkhpZ2hsaWdodENlbGwoJHNjb3BlLmxhc3RTZWxlY3RlZFJvdywgJHNjb3BlLmxhc3RTZWxlY3RlZENlbGwpXG4gICAgICAkbG9nLmluZm8oYFtncmlkQ3J1ZF0gRWRpdCAke3Jlc291cmNlTmFtZX0gOiAke2lkfWApXG4gICAgICAkc2NvcGUubGFzdFNlbGVjdGVkUm93ID0gaWRcbiAgICAgIHJldHVybiByZWNvcmQgPSBSZXNvdXJjZS5nZXQoe2lkfSwgZnVuY3Rpb24ocikge1xuICAgICAgICAkc2NvcGVbcmVzb3VyY2VOYW1lXSA9IHJlc3RyaWN0UmVzb3VyY2UociwgYWxsb3dlZEZpZWxkcylcbiAgICAgICAgcmV0dXJuIHNob3dGb3JtKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlQWN0aW9uID1mdW5jdGlvbigpIHtcbiAgICAgICRsb2cuaW5mbyhgW2dyaWRDcnVkXSBDcmVhdGUgJHtyZXNvdXJjZU5hbWV9YClcbiAgICAgIGNvbnN0IHJlY29yZCA9IG5ldyBSZXNvdXJjZSgpXG4gICAgICAkc2NvcGVbcmVzb3VyY2VOYW1lXSA9IHJlY29yZFxuICAgICAgcmV0dXJuIHNob3dGb3JtKClcbiAgICB9XG5cbiAgICAkc2NvcGUuc2F2ZSA9IHJlY29yZCA9PiB7XG4gICAgICAkbG9nLmluZm8oXCJbZ3JpZENydWRdIFNhdmluZyByZWNvcmRcIilcbiAgICAgIGlmIChiZWZvcmVTYXZlKSB7XG4gICAgICAgICRsb2cuaW5mbyhgW2dyaWRDcnVkXSBDYWxsaW5nIGJlZm9yZVNhdmU6ICR7cmVzb3VyY2VOYW1lfWApXG4gICAgICAgIGJlZm9yZVNhdmUocmVjb3JkKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9taXNlID0gcmVjb3JkLnNhdmUoKS4kcHJvbWlzZVxuICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlY29yZCkge1xuICAgICAgICAkbG9nLmluZm8oXCJbZ3JpZENydWRdIHJlY29yZCBoYXMgYmVlbiB1cGRhdGVkL2NyZWF0ZWRcIiwgcmVjb3JkKVxuICAgICAgICBncmlkKCkuc2F2ZVJvdyhyZWNvcmQuaWQsIHJlY29yZClcbiAgICAgICAgaGlkZUZvcm0oKVxuICAgICAgICBpZihhZnRlclNhdmUpIHtcbiAgICAgICAgICAkbG9nLmluZm8oYFtncmlkQ3J1ZF0gQ2FsbGluZyBhZnRlclNhdmU6ICR7cmVzb3VyY2VOYW1lfWApXG4gICAgICAgICAgYWZ0ZXJTYXZlKHJlY29yZClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJHNjb3BlLmhpZ2hsaWdodENlbGwoJHNjb3BlLmxhc3RTZWxlY3RlZFJvdywgJHNjb3BlLmxhc3RTZWxlY3RlZENlbGwpXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gW3Byb21pc2UsIHJlY29yZF1cbiAgICB9XG5cbiAgICAkc2NvcGUuaGlnaGxpZ2h0Q2VsbCA9IGZ1bmN0aW9uKHJvd2lkLCBjb2xuYW1lKSB7XG4gICAgICBjb25zdCBxID0gZ3JpZCgpLmdldEdyaWRFbCgpXG4gICAgICAvL2NvbnNvbGUubG9nKHEpXG4gICAgICBxLmpxR3JpZChcInNldENlbGxcIiwgcm93aWQsIGNvbG5hbWUsIFwiXCIsICB7XCJib3JkZXItY29sb3JcIjogXCJncmVlblwiLCBcImJvcmRlci13aWR0aFwiOiBcInRoaW5cIiwgXCJib3JkZXItc3R5bGVcIjogXCJkb3VibGVcIn0pXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgICRzY29wZS51bkhpZ2hsaWdodENlbGwgPSBmdW5jdGlvbihyb3dpZCwgY29sbmFtZSkge1xuICAgICAgY29uc3QgcSA9IGdyaWQoKS5nZXRHcmlkRWwoKVxuICAgICAgLy9jb25zb2xlLmxvZyhxKVxuICAgICAgcS5qcUdyaWQoXCJzZXRDZWxsXCIsIHJvd2lkLCBjb2xuYW1lLCBcIlwiLCAge1wiYm9yZGVyLXdpZHRoXCI6IFwiMHB4XCJ9KVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICAkc2NvcGUuY2FuY2VsID0gKCkgPT4gaGlkZUZvcm0oKVxuXG4gICAgJHNjb3BlLmRibENsaWNrID0gZnVuY3Rpb24ocm93aWQsIGlSb3csIGlDb2wsIGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sTW9kZWxcbiAgICAgIH0gPSAkc2NvcGVbYCR7ZT8uY3VycmVudFRhcmdldD8uaWR9YF0uZ2V0R3JpZEVsKCkuZ2V0R3JpZFBhcmFtKClcbiAgICAgICRzY29wZS5jb2x1bW5OYW1lRm9yRm9jdXMgPSBjb2xNb2RlbFtpQ29sXT8uW1wibmFtZVwiXVxuICAgICAgZWRpdEFjdGlvbihyb3dpZClcbiAgICAgIHJldHVybiAkc2NvcGUubGFzdFNlbGVjdGVkQ2VsbCA9IGlDb2xcbiAgICB9XG5cbiAgICAkc2NvcGUuc2V0Rm9jdXMgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoJHNjb3BlLmNvbHVtbk5hbWVGb3JGb2N1cykgeyAvLyBjaGVjayBpZiB2YXJpYWJsZSBleGlzdHNcbiAgICAgICAgY29uc3QgaW5wdXRzID0gZWxlbWVudC5maW5kKFwiaW5wdXRcIilcbiAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgQXJyYXkuZnJvbShpbnB1dHMpKSB7XG4gICAgICAgICAgaWYgKGlucHV0Lm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJHNjb3BlLmNvbHVtbk5hbWVGb3JGb2N1cy50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpXG4gICAgICAgICAgICBpbnB1dC5zZWxlY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuZmluZChgW2lkPSdzMmlkXyR7JHNjb3BlLmNvbHVtbk5hbWVGb3JGb2N1c30nXWApLnNlbGVjdDIoXCJvcGVuXCIpXG4gICAgICAgIHJldHVybiAkc2NvcGUuY29sdW1uTmFtZUZvckZvY3VzID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgICRwYXJzZShgZWRpdCR7YWN0aW9uU3VmZml4fWApLmFzc2lnbigkc2NvcGUuJHBhcmVudCwgZWRpdEFjdGlvbilcbiAgICAkcGFyc2UoYGNyZWF0ZSR7YWN0aW9uU3VmZml4fWApLmFzc2lnbigkc2NvcGUuJHBhcmVudCwgY3JlYXRlQWN0aW9uKVxuICB9XG59XG5HcmlkQ3J1ZEN0cmwuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRlbGVtZW50XCIsIFwiJGF0dHJzXCIsICBcIiRwYXJzZVwiLCBcIiRsb2dcIiwgXCJyZXNvdXJjZUJ1aWxkZXJcIiwgXCIkd2luZG93XCIsXG4gIFwicmVzdHJpY3RSZXNvdXJjZVwiLCBcIiR1aWJNb2RhbFwiLCBcInBhdGhXaXRoQ29udGV4dFwiLCBcIiR0aW1lb3V0XCJdXG5cblxuYW5ndWxhci5tb2R1bGUoXCJhbmdsZUdyaW5kZXIuZ3JpZHpcIikuY29udHJvbGxlcihcIkdyaWRDcnVkQ3RybFwiLCBHcmlkQ3J1ZEN0cmwpXG4iLCJpbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi9mb3Jtc01vZHVsZSdcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnQmluZCdcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnRGVsZXRlQnV0dG9uJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdNYXhMaW5lcydcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnTnVtYmVyJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdQYW5lbHMnXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9hZ1NlbGVjdEJpbmQnXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9hZ1N1Ym1pdCdcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnU3VibWl0QnV0dG9uJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdUYWJzJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYXV0b2ZpbGxQcmV2ZW50J1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYnV0dG9ucydcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2RhdGVwaWNrZXInXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9lZGl0YWJsZUN1c3RvbSdcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2VkaXRhYmxlRGF0ZXBpY2tlcidcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2VkaXRhYmxlRGlyZWN0aXZlRmFjdG9yeSdcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2VkaXRhYmxlRm9ybUJ1dHRvbnMnXG5cbmltcG9ydCAnLi9kaXJlY3RpdmVzL2VkaXRhYmxlUGFuZWxIZWFkaW5nJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvZWRpdGFibGVTZWxlY3QyJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvZm9jdXMnXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy92YWxpZGF0aW9ucydcblxuaW1wb3J0ICcuL3NlcnZpY2VzL0RpYWxvZ0NydWRDdHJsTWl4aW4nXG5pbXBvcnQgJy4vc2VydmljZXMvRm9ybURpYWxvZ1NlcnYnXG5pbXBvcnQgJy4vc2VydmljZXMvTWFzc1VwZGF0ZUhhbmRsZXInXG5pbXBvcnQgJy4vc2VydmljZXMvTWFzc1VwZGF0ZU1peGluJ1xuaW1wb3J0ICcuL3NlcnZpY2VzL1BhbmVsRm9ybU1peGluJ1xuaW1wb3J0ICcuL3NlcnZpY2VzL1NpbmdsZVBhZ2VDcnVkTWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1zTW9kdWxlXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGFnQ29tbW9uIGZyb20gJy4uL2NvbW1vbidcbmltcG9ydCByZXNvdXJjZVN1cHBvcnQgZnJvbSAnLi4vcmVzb3VyY2VTdXBwb3J0J1xuaW1wb3J0IGFnU2VsZWN0MiBmcm9tICcuLi9zZWxlY3QyJ1xuaW1wb3J0IG5nU2FuaXRpemUgZnJvbSAnYW5ndWxhci1zYW5pdGl6ZSdcbmltcG9ydCAnYW5ndWxhci1kcmFnLWFuZC1kcm9wLWxpc3RzJ1xuaW1wb3J0ICdmcmVlLWpxZ3JpZC9qcy9qcXVlcnkuanFncmlkLnNyYy5qcydcblxuY29uc3QgTU9EX05BTUUgPSAnYW5nbGVHcmluZGVyLmdyaWR6J1xuZXhwb3J0IGRlZmF1bHQgTU9EX05BTUVcbnZhciBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKCdhbmdsZUdyaW5kZXIuZ3JpZHonLCBbXG4gIGFnQ29tbW9uLFxuICByZXNvdXJjZVN1cHBvcnQsXG4gIGFnU2VsZWN0MixcbiAgbmdTYW5pdGl6ZSxcbiAgJ2RuZExpc3RzJ1xuXSlcblxuLy8gR2xvYmFsbHkgZXhwb3NlIGN1c3RvbSBmb3JtYXR0ZXJzIGZvciBkYXRlcyBhbmQgY3VycmVuY2llcy5cbi8vIFVzZWQgYnkgamdHcmlkIGZvciBmb3JtYXR0aW5nIGNlbGwgdmFsdWVzLlxuZ3JpZHoucnVuKFtcbiAgJyR3aW5kb3cnLCAnYWdEYXRlRmlsdGVyJywgJ2FnQ3VycmVuY3lGaWx0ZXInLFxuICBmdW5jdGlvbigkd2luZG93LCBhZ0RhdGVGaWx0ZXIsIGFnQ3VycmVuY3lGaWx0ZXIpIHtcbiAgICAkd2luZG93LmFnRGF0ZUZpbHRlciA9IGFnRGF0ZUZpbHRlclxuICAgIHJldHVybiAkd2luZG93LmFnQ3VycmVuY3lGaWx0ZXIgPSBhZ0N1cnJlbmN5RmlsdGVyXG4gIH1cbl0pXG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VDdHJsIHtcbiAgc3RhdGljIHJlZ2lzdGVyKGFwcCwgbmFtZSkge1xuICAgIGlmIChuYW1lID09IG51bGwpIHsgbmFtZSA9IHRoaXMubmFtZSB8fCBfX2d1YXJkX18odGhpcy50b1N0cmluZygpLm1hdGNoKC9mdW5jdGlvblxccyooLio/KVxcKC8pLCB4ID0+IHhbMV0pIH1cbiAgICBpZiAodHlwZW9mIGFwcCA9PT0gJ3N0cmluZycpIHsgYXBwID0gYW5ndWxhci5tb2R1bGUoYXBwKSB9XG4gICAgcmV0dXJuIGFwcC5jb250cm9sbGVyKG5hbWUsIHRoaXMpXG4gIH1cblxuICBzdGF0aWMgaW5qZWN0KC4uLmFubm90YXRpb25zKSB7XG4gICAgY29uc3QgQU5OT1RBVElPTl9SRUcgPSAvXihcXFMrKShcXHMrYXNcXHMrKFxcdyspKT8kL1xuXG4gICAgdGhpcy5hbm5vdGF0aW9ucyA9IF8ubWFwKGFubm90YXRpb25zLCBmdW5jdGlvbihhbm5vdGF0aW9uKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGFubm90YXRpb24ubWF0Y2goQU5OT1RBVElPTl9SRUcpXG4gICAgICByZXR1cm4geyBuYW1lOiBtYXRjaFsxXSwgaWRlbnRpZmllcjogbWF0Y2hbM10gfHwgbWF0Y2hbMV0gfVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy4kaW5qZWN0ID0gXy5tYXAodGhpcy5hbm5vdGF0aW9ucywgYW5ub3RhdGlvbiA9PiBhbm5vdGF0aW9uLm5hbWUpXG4gIH1cblxuICAvLyBFeHBvc2UgdGhlIGdpdmVuIGZpZWxkcyB0byB0aGUgYCRzY29wZWBcbiAgZXhwb3NlKCRzY29wZSwgLi4ubWVtYmVycykge1xuICAgIC8vIHNlZSBodHRwczovL21lZGl1bS5jb20vbWFraW5nLWludGVybmV0cy93aHktdXNpbmctY2hhaW4taXMtYS1taXN0YWtlLTliYzFmODBkNTFiYVxuICAgIHZhciBmbWFwID0gXy5tYXAobWVtYmVycywgKGZpZWxkKSA9PiBbZmllbGQsIHRoaXNbZmllbGRdXSlcbiAgICByZXR1cm4gXy5lYWNoKGZtYXAsICguLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCBbZmllbGQsIGVudGl0eV0gPSBBcnJheS5mcm9tKGFyZ3NbMF0pXG4gICAgICByZXR1cm4gJHNjb3BlW2ZpZWxkXSA9IHR5cGVvZiBlbnRpdHkgPT09ICdmdW5jdGlvbicgPyBfLmJpbmQoZW50aXR5LCB0aGlzKSA6IGVudGl0eVxuICAgIH0pXG4gICAgLy8gcmV0dXJuIF8uY2hhaW4obWVtYmVycylcbiAgICAvLyAgIC5tYXAoKGZpZWxkKSA9PiBbZmllbGQsIHRoaXNbZmllbGRdXSlcbiAgICAvLyAgIC5lYWNoKCguLi5hcmdzKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IFtmaWVsZCwgZW50aXR5XSA9IEFycmF5LmZyb20oYXJnc1swXSlcbiAgICAvLyAgICAgcmV0dXJuICRzY29wZVtmaWVsZF0gPSB0eXBlb2YgZW50aXR5ID09PSAnZnVuY3Rpb24nID8gXy5iaW5kKGVudGl0eSwgdGhpcykgOiBlbnRpdHlcbiAgICAvLyAgIH0pXG4gICAgLy8gICAudmFsdWUoKVxuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uZGVwZW5kZW5jaWVzKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29uc3RydWN0b3IuYW5ub3RhdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBhbm5vdGF0aW9uID0gdGhpcy5jb25zdHJ1Y3Rvci5hbm5vdGF0aW9uc1tpbmRleF1cbiAgICAgIHRoaXNbYW5ub3RhdGlvbi5pZGVudGlmaWVyXSA9IGRlcGVuZGVuY2llc1tpbmRleF1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5pbml0aWFsaXplKClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBpc0ZhbHN5LCBpc0VtcHR5IH0gZnJvbSAnLi4vLi4vdXRpbHMvaXNGYWxzeSdcblxudmFyIGZvcm1zID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbmZvcm1zLnZhbHVlKFwidmFsaWRhdGlvbk1lc3NhZ2VzXCIsIHtcbiAgcmVxdWlyZWQ6IFwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZFwiLFxuICBudW1iZXI6IFwiVGhpcyBmaWVsZCBtdXN0IGJlIGEgbnVtYmVyXCIsXG4gIG1pc21hdGNoOiBcIkRvZXMgbm90IG1hdGNoIHRoZSBjb25maXJtYXRpb25cIixcbiAgbWlubGVuZ3RoOiBcIlRoaXMgZmllbGQgaXMgdG9vIHNob3J0XCIsXG4gIG1heGxlbmd0aDogXCJUaGlzIGZpZWxkIGlzIHRvbyBsb25nXCIsXG4gIGVtYWlsOiBcIkludmFsaWQgZW1haWwgYWRkcmVzc1wiLFxuICBwYXR0ZXJuOiBcIkludmFsaWQgcGF0dGVyblwiXG59XG4pXG5cbi8vIEN1c3RvbSB2YWxpZGF0aW9uIGRpcmVjdGl2ZSBmb3IgZmllbGRzIG1hdGNoLlxuLy8gTWlnaHQgYmUgdXNlZCBmb3IgcGFzc3dvcmQgY29uZmlybWF0aW9uIHZhbGlkYXRpb24uXG5mb3Jtcy5kaXJlY3RpdmUoXCJtYXRjaFwiLCAoKSA9PiAoe1xuICByZXF1aXJlOiBcIm5nTW9kZWxcIixcblxuICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgbW9kZWxDdHJsKSB7XG4gICAgY29uc3QgdmFsaWRhdGVFcXVhbCA9IGZ1bmN0aW9uKHZhbHVlLCBvdGhlclZhbHVlKSB7XG4gICAgICBjb25zdCBhbGxFbXB0eSA9IF8uZXZlcnkoW2lzRW1wdHkodmFsdWUpLCBpc0VtcHR5KG90aGVyVmFsdWUpXSlcbiAgICAgIGNvbnN0IHZhbGlkID0gYWxsRW1wdHkgfHwgKHZhbHVlID09PSBvdGhlclZhbHVlKVxuXG4gICAgICBtb2RlbEN0cmwuJHNldFZhbGlkaXR5KFwibWlzbWF0Y2hcIiwgdmFsaWQpXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICAvLyB3YXRjaCB0aGUgb3RoZXIgdmFsdWUgYW5kIHJlLXZhbGlkYXRlIG9uIGNoYW5nZVxuICAgIHNjb3BlLiR3YXRjaChhdHRycy5tYXRjaCwgb3RoZXJWYWx1ZSA9PiB2YWxpZGF0ZUVxdWFsKG1vZGVsQ3RybC4kdmlld1ZhbHVlLCBvdGhlclZhbHVlKSlcblxuICAgIGNvbnN0IHZhbGlkYXRvciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBjb25zdCBvdGhlclZhbHVlID0gc2NvcGUuJGV2YWwoYXR0cnMubWF0Y2gpXG4gICAgICByZXR1cm4gdmFsaWRhdGVFcXVhbCh2YWx1ZSwgb3RoZXJWYWx1ZSlcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBET00gLT4gbW9kZWxcbiAgICBtb2RlbEN0cmwuJHBhcnNlcnMudW5zaGlmdCh2YWxpZGF0b3IpXG5cbiAgICAvLyB2YWxpZGF0ZSBtb2RlbCAtPiBET01cbiAgICByZXR1cm4gbW9kZWxDdHJsLiRmb3JtYXR0ZXJzLnVuc2hpZnQodmFsaWRhdG9yKVxuICB9XG59KSlcblxuZm9ybXMuZGlyZWN0aXZlKFwiYWdMZW5ndGhcIixcbiAgW1wiJHBhcnNlXCIsICgkcGFyc2UpID0+ICh7XG4gICAgcmVxdWlyZTogXCJuZ01vZGVsXCIsXG4gICAgcmVzdHJpY3Q6IFwiQVwiLFxuXG4gICAgbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIG5nTW9kZWxDdHJsKSB7XG5cbiAgICAgIGNvbnN0IGxlbmd0aFZhbGlkYXRvciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGxldCB2YWxpZFxuICAgICAgICBjb25zdCBsZW5ndGggPSAkcGFyc2UoYXR0cnMuYWdMZW5ndGgpKHNjb3BlKVxuXG4gICAgICAgIC8vSWYgbGVuZ3RoIGlzIG5vdCBwcm92aWRlZCwgb3IgdmFsdWUgaXMgbm90IGVudGVyZWQsIGl0cyB2YWxpZFxuICAgICAgICAvL1RoaXMgdmFsaWRhdG9yIGRvZXMgbm90IGNoZWNrIGZvciByZXF1aXJlZCB2YWx1ZXMsIHNvIGlmIHZhbHVlIG11c3QgYmUgZW50ZXJlZCwgYWRkIG5nLXJlcXVpcmVkXG5cbiAgICAgICAgaWYgKGlzRmFsc3kobGVuZ3RoKSB8fCBuZ01vZGVsQ3RybC4kaXNFbXB0eSh2YWx1ZSkpIHsgdmFsaWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7IHZhbGlkID0gKHZhbHVlLmxlbmd0aCA9PT0gbGVuZ3RoKSB9XG5cbiAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZhbGlkaXR5KFwibGVuZ3RoXCIsIHZhbGlkKVxuXG4gICAgICAgIGlmICh2YWxpZCkgeyByZXR1cm4gdmFsdWUgfSBlbHNlIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gICAgICB9XG5cbiAgICAgIG5nTW9kZWxDdHJsLiRwYXJzZXJzLnVuc2hpZnQobGVuZ3RoVmFsaWRhdG9yKVxuICAgICAgbmdNb2RlbEN0cmwuJGZvcm1hdHRlcnMucHVzaChsZW5ndGhWYWxpZGF0b3IpXG5cbiAgICAgIHJldHVybiBzY29wZS4kd2F0Y2goYXR0cnMuYWdMZW5ndGgsICgpID0+IGxlbmd0aFZhbGlkYXRvcihuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKSlcbiAgICB9XG4gIH0pXVxuKVxuXG5mb3Jtcy5kaXJlY3RpdmUoXCJhZ0ZpZWxkR3JvdXBcIiwgW1xuICBcIiR0aW1lb3V0XCIsIFwiJGxvZ1wiLCBcIiRpbnRlcnBvbGF0ZVwiLFxuICAoJHRpbWVvdXQsICRsb2csICRpbnRlcnBvbGF0ZSkgPT4gKHtcbiAgICByZXN0cmljdDogXCJBXCIsXG4gICAgcmVxdWlyZTogXCJeZm9ybVwiLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcblxuICAgIHRlbXBsYXRlOiBgXFxcbjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXFxuYCxcblxuICAgIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBmb3JtQ3RybCkge1xuICAgICAgY29uc3QgZmllbGRzID0gXy5tYXAoKGF0dHJzW1wiZm9yXCJdIHx8IFwiXCIpLnNwbGl0KFwiLFwiKSwgZmllbGRFeHByID0+ICRpbnRlcnBvbGF0ZShmaWVsZEV4cHIpKHNjb3BlKSlcblxuICAgICAgY29uc3QgdG9nZ2xlRXJyb3JzID0gKCkgPT4gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHRydWUgaWYgdGhlIGZpZWxkIGlzIGludmFsaWQgb3IgaXQgaGFzIHNlcnZlciBzaWRlIGVycm9yc1xuICAgICAgICBjb25zdCBpbnZhbGlkID0gXy5tYXAoZmllbGRzLCBmaWVsZCA9PiBmb3JtQ3RybFtmaWVsZF0/LiRpbnZhbGlkIHx8IGZvcm1DdHJsLiRzZXJ2ZXJFcnJvcnM/LltmaWVsZF0pXG5cbiAgICAgICAgaWYgKF8uc29tZShpbnZhbGlkKSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmFkZENsYXNzKFwiaGFzLWVycm9yXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJoYXMtZXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gV2F0Y2ggZm9yIHZhbGlkaXR5IHN0YXRlIGNoYW5nZSBhbmQgZGlzcGxheSBlcnJvcnMgaWYgbmVjZXNzYXJ5XG4gICAgICBhbmd1bGFyLmZvckVhY2goZmllbGRzLCBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICBjb25zdCBnZXRWaWV3VmFsdWUgPSAoKSA9PiBmb3JtQ3RybFtmaWVsZF0/LiR2aWV3VmFsdWVcbiAgICAgICAgcmV0dXJuIHNjb3BlLiR3YXRjaChnZXRWaWV3VmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghZm9ybUN0cmxbZmllbGRdPy4kZGlydHkpIHsgcmV0dXJuIH1cbiAgICAgICAgICByZXR1cm4gdG9nZ2xlRXJyb3JzKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIC8vIERpc3BsYXkgc2VydmVyIHNpZGUgdmFsaWRhdGlvbiBlcnJvcnMgKG9ubHkgb25jZSlcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZHMsIGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgIGxldCBpbml0aWFsID0gdHJ1ZVxuICAgICAgICBjb25zdCBnZXRTZXJ2ZXJFcnJvcnMgPSAoKSA9PiBmb3JtQ3RybC4kc2VydmVyRXJyb3JzPy5bZmllbGRdXG4gICAgICAgIHJldHVybiBzY29wZS4kd2F0Y2goZ2V0U2VydmVyRXJyb3JzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIWluaXRpYWwpIHsgdG9nZ2xlRXJyb3JzKCkgfVxuICAgICAgICAgIHJldHVybiBpbml0aWFsID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIC8vIERpc3BsYXkgdmFsaWRhdGlvbiBlcnJvcnMgd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcbiAgICAgIGNvbnN0IGlzU3VibWl0dGVkID0gKCkgPT4gZm9ybUN0cmwuJHN1Ym1pdHRlZFxuICAgICAgcmV0dXJuIHNjb3BlLiR3YXRjaChpc1N1Ym1pdHRlZCwgZnVuY3Rpb24oc3VibWl0dGVkKSB7XG4gICAgICAgIGlmICghc3VibWl0dGVkKSB7IHJldHVybiB9XG4gICAgICAgIHJldHVybiB0b2dnbGVFcnJvcnMoKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5dKVxuXG5mb3Jtcy5kaXJlY3RpdmUoXCJhZ1ZhbGlkYXRpb25FcnJvcnNcIixcbiAgW1widmFsaWRhdGlvbk1lc3NhZ2VzXCIsIFwiJGludGVycG9sYXRlXCIsICh2YWxpZGF0aW9uTWVzc2FnZXMsICRpbnRlcnBvbGF0ZSkgPT4gKHtcbiAgICByZXN0cmljdDogXCJFXCIsXG4gICAgcmVxdWlyZTogXCJeZm9ybVwiLFxuICAgIHJlcGxhY2U6IHRydWUsXG5cbiAgICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgZm9ybUN0cmwpIHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9ICRpbnRlcnBvbGF0ZShhdHRyc1tcImZvclwiXSkoc2NvcGUpXG4gICAgICBjb25zdCBmaWVsZCA9IGZvcm1DdHJsW2ZpZWxkTmFtZV1cblxuICAgICAgLy8gRG8gY2xlYW51cFxuICAgICAgY29uc3QgY2xlYXJFcnJvcnMgPSAoKSA9PiBlbGVtZW50Lmh0bWwoXCJcIilcblxuICAgICAgLy8gVHJ5IHRvIHRha2UgYW4gZXJyb3JzIG1lc3NhZ2UgZnJvbSB0aGUgYXR0cmlidXRlXG4gICAgICAvLyBvdGhlcndpc2UgZmFsbGJhY2sgdG8gdGhlIGRlZmF1bHQgZXJyb3IgbWVzc2FnZVxuICAgICAgY29uc3QgbWVzc2FnZUZvciA9IGVycm9yID0+IGF0dHJzW2Vycm9yXSB8fCB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdXG5cbiAgICAgIGNvbnN0IGFwcGVuZEVycm9yID0gZnVuY3Rpb24obWVzc2FnZSwga2xhc3MpIHtcbiAgICAgICAgaWYgKGtsYXNzID09IG51bGwpIHsga2xhc3MgPSBcIlwiIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXBwZW5kKGBcXFxuICA8c3BhbiBjbGFzcz1cImhlbHAtaW5saW5lICR7a2xhc3N9XCI+JHttZXNzYWdlfTwvc3Bhbj5cXFxuICBgXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlzcGxheUVycm9yTWVzc2FnZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJFcnJvcnMoKVxuXG4gICAgICAgIC8vIERpc3BsYXkgY2xpZW50IHNpZGUgZXJyb3JzXG4gICAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgZXJyb3IgaW4gZmllbGQuJGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBpbnZhbGlkID0gZmllbGQuJGVycm9yW2Vycm9yXVxuICAgICAgICAgICAgaWYgKCFpbnZhbGlkKSB7IGNvbnRpbnVlIH1cblxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VGb3IoZXJyb3IpXG4gICAgICAgICAgICBpZiAoIV8uaXNOaWwobWVzc2FnZSkpIHsgcmVzdWx0LnB1c2goYXBwZW5kRXJyb3IobWVzc2FnZSkpIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHVuZGVmaW5lZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9KSgpXG4gICAgICB9XG5cbiAgICAgIC8vIENsZWFyIHZhbGlkYXRpb24gZXJyb3JzIHdoZW4gdGhlIGZpZWxkIGlzIHZhbGlkXG4gICAgICBsZXQgaW5pdGlhbCA9IHRydWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAoKSA9PiBmb3JtQ3RybFtmaWVsZE5hbWVdPy4kdmFsaWRcbiAgICAgIHNjb3BlLiR3YXRjaChpc1ZhbGlkLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFpbml0aWFsKSB7IGRpc3BsYXlFcnJvck1lc3NhZ2VzKCkgfVxuICAgICAgICByZXR1cm4gaW5pdGlhbCA9IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICAvLyBEaXNwbGF5IHZhbGlkYXRpb24gZXJyb3JzIHdoaWxlIHR5cGluZ1xuICAgICAgY29uc3QgZ2V0Vmlld1ZhbHVlID0gKCkgPT4gZm9ybUN0cmxbZmllbGROYW1lXT8uJHZpZXdWYWx1ZVxuICAgICAgc2NvcGUuJHdhdGNoKGdldFZpZXdWYWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChmaWVsZC4kZGlydHkpIHsgcmV0dXJuIGRpc3BsYXlFcnJvck1lc3NhZ2VzKCkgfVxuICAgICAgfSlcblxuICAgICAgLy8gRGlzcGxheSB2YWxpZGF0aW9uIGVycm9ycyB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZFxuICAgICAgY29uc3QgaXNTdWJtaXR0ZWQgPSAoKSA9PiBmb3JtQ3RybC4kc3VibWl0dGVkXG4gICAgICBzY29wZS4kd2F0Y2goaXNTdWJtaXR0ZWQsIGZ1bmN0aW9uKHN1Ym1pdHRlZCkge1xuICAgICAgICBpZiAoc3VibWl0dGVkKSB7IHJldHVybiBkaXNwbGF5RXJyb3JNZXNzYWdlcygpIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIERpc3BsYXkgc2VydmVyIHNpZGUgZXJyb3JzXG4gICAgICBjb25zdCBnZXRTZXJ2ZXJFcnJvcnMgPSAoKSA9PiBmb3JtQ3RybC4kc2VydmVyRXJyb3JzPy5bZmllbGROYW1lXVxuICAgICAgcmV0dXJuIHNjb3BlLiR3YXRjaChnZXRTZXJ2ZXJFcnJvcnMsIGZ1bmN0aW9uKHNlcnZlckVycm9yKSB7XG4gICAgICAgIGlmICghXy5pc05pbChzZXJ2ZXJFcnJvcikpIHtcbiAgICAgICAgICByZXR1cm4gYXBwZW5kRXJyb3Ioc2VydmVyRXJyb3IsIFwic2VydmVyLWVycm9yXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZChcIi5zZXJ2ZXItZXJyb3JcIikucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pXVxuKVxuXG5mb3Jtcy5kaXJlY3RpdmUoXCJhZ1NlcnZlclZhbGlkYXRpb25FcnJvcnNcIiwgW1wiYWxlcnRzXCIsIGFsZXJ0cyA9PiAoe1xuICByZXN0cmljdDogXCJBXCIsXG4gIHJlcXVpcmU6IFwiXmZvcm1cIixcblxuICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgZm9ybUN0cmwpIHtcbiAgICBmb3JtQ3RybC4kc2VydmVyRXJyb3JzID0ge31cblxuICAgIC8vRGlzcGxheSBlcnJvcnMgYXMgYWxlcnRzIGZvciB0aG9zZSBmaWVsZHMgd2hpY2ggYXJlIG5vdCBpbiBmb3JtXG4gICAgY29uc3QgZGlzcGxheUdsb2JhbEVycm9ycyA9ICgpID0+ICgoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgICAgZm9yIChsZXQgZmllbGQgaW4gZm9ybUN0cmwuJHNlcnZlckVycm9ycykge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZm9ybUN0cmwuJHNlcnZlckVycm9yc1tmaWVsZF1cbiAgICAgICAgaWYgKGZvcm1DdHJsW2ZpZWxkXSkgeyBjb250aW51ZSB9IC8vSWYgZmllbGQgaXMgcHJlc2VudCBpbiBmb3JtLCBjb250aW51ZVxuXG4gICAgICAgIGZvcm1DdHJsLiRzZXJ2ZXJFcnJvcnNbZmllbGRdID0gbnVsbCAvL0Rpc3BsYXkgZXJyb3IgYW5kIHJlbW92ZSBpdC5cbiAgICAgICAgcmVzdWx0LnB1c2goYWxlcnRzLmVycm9yKG1lc3NhZ2UpKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0pKClcblxuXG4gICAgLy8gSGlkZSBzZXJ2ZXIgc2lkZSB2YWxpZGF0aW9uIGVycm9ycyB3aGlsZSB0eXBpbmdcbiAgICBjb25zdCBnZXRTZXJ2ZXJFcnJvcnMgPSAoKSA9PiBmb3JtQ3RybC4kc2VydmVyRXJyb3JzXG5cbiAgICByZXR1cm4gc2NvcGUuJHdhdGNoKGdldFNlcnZlckVycm9ycywgZnVuY3Rpb24oc2VydmVyRXJyb3JzKSB7XG4gICAgICBkaXNwbGF5R2xvYmFsRXJyb3JzKClcbiAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBhbGwgZmllbGRzIHdpdGggc2VydmVyIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICByZXR1cm4gYW5ndWxhci5mb3JFYWNoKHNlcnZlckVycm9ycywgZnVuY3Rpb24oXywgZmllbGQpIHtcblxuICAgICAgICAvLyBSZWdpc3RlciBjaGFuZ2UgbGlzdGVuZXIgZm9yIHRob3NlIGZpZWxkc1xuICAgICAgICBsZXQgdW5yZWdpc3RlclxuICAgICAgICBjb25zdCBnZXRWaWV3VmFsdWUgPSAoKSA9PiBmb3JtQ3RybFtmaWVsZF0/LiR2aWV3VmFsdWVcbiAgICAgICAgcmV0dXJuIHVucmVnaXN0ZXIgPSBzY29wZS4kd2F0Y2goZ2V0Vmlld1ZhbHVlLCBmdW5jdGlvbihvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICAgIGlmIChvbGRWYWwgPT09IG5ld1ZhbCkgeyByZXR1cm4gfVxuXG4gICAgICAgICAgLy8gUmVtb3ZlIHNlcnZlciBzaWRlIGVycm9yIGZvciB0aGUgZmllbGQgd2hlbiBpdHMgdmFsdWUgd2FzIGNoYW5nZWRcbiAgICAgICAgICBmb3JtQ3RybFtmaWVsZF0/LiRzZXRWYWxpZGl0eShcInNlcnZlclwiLCB0cnVlKVxuICAgICAgICAgIGZvcm1DdHJsLiRzZXJ2ZXJFcnJvcnNbZmllbGRdID0gbnVsbFxuICAgICAgICAgIHJldHVybiB1bnJlZ2lzdGVyKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSldKVxuXG4vLyBIYW5kbGVzIHNlcnZlciBzaWRlIGVycm9yc1xuZm9ybXMuZmFjdG9yeShcInNlcnZlclZhbGlkYXRpb25FcnJvcnNIYW5kbGVyXCIsIFtcbiAgXCIkbG9nXCIsIGZ1bmN0aW9uKCRsb2cpIHtcblxuICAgIHZhciBzZXRFcnJvcnMgPSBmdW5jdGlvbihmb3JtLCBlcnJvcnMpIHtcbiAgICAgIC8vIGNsZWFudXAgcHJldmlvdXMgZXJyb3JzXG4gICAgICBmb3JtLiRzZXJ2ZXJFcnJvcnMgPSB7fVxuXG4gICAgICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIHNlcnZlciBzaWRlIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW11cbiAgICAgICAgZm9yIChsZXQgZmllbGQgaW4gZXJyb3JzKSB7XG5cbiAgICAgICAgLy8gLi5zZXQgZXJyb3JzIG9uIHRoZSBuZXN0ZWQgZm9ybVxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvcnNbZmllbGRdXG4gICAgICAgICAgaWYgKCh0eXBlb2YgbWVzc2FnZSA9PT0gXCJvYmplY3RcIikgJiYgIV8uaXNOaWwoZm9ybVtmaWVsZF0pKSB7XG4gICAgICAgICAgICBzZXRFcnJvcnMoZm9ybVtmaWVsZF0sIG1lc3NhZ2UpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gLi5zZXQgYW4gZXJyb3IgZm9yIHRoZSBjdXJyZW50IGZvcm1cbiAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZvcm1bZmllbGRdPy4kc2V0VmFsaWRpdHkoXCJzZXJ2ZXJcIiwgZmFsc2UpXG4gICAgICAgICAgICByZXN1bHQucHVzaChmb3JtLiRzZXJ2ZXJFcnJvcnNbZmllbGRdID0gbWVzc2FnZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godW5kZWZpbmVkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9KSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGZvcm0sIHJlc3BvbnNlLCByZXNvdXJjZU5hbWUpIHtcbiAgICAgIC8vIHNraXAgd2hlbiB0aGUgcmVzcG9uc2UgZG9lcyBub3QgY29udGFpbiB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAgY29uc3QgZXJyb3JzID0gcmVzcG9uc2UuZGF0YT8uZXJyb3JzPy5bcmVzb3VyY2VOYW1lXVxuICAgICAgaWYgKChyZXNwb25zZS5zdGF0dXMgIT09IDQyMikgfHwgXy5pc05pbChlcnJvcnMpKSB7XG4gICAgICAgICRsb2cud2FybihcIlJlc3BvbnNlIGRvZXMgbm90IGNvbnRhaW4gdmFsaWRhdGlvbiBlcnJvcnNcIiwgcmVzcG9uc2UpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyByZWN1cnNpdmVseSBzZXQgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICByZXR1cm4gc2V0RXJyb3JzKGZvcm0sIGVycm9ycylcbiAgICB9XG4gIH1cbl0pXG5cbi8vQXV0b21hdGljYWxseSBhZGQgYXN0ZXJpc2sgdG8gcmVxdWlyZWQgZmllbGRzLlxuY29uc3QgcmVxdWlyZWREaXJlY3RpdmUgPSBbKCkgPT4gKHtcbiAgcmVzdHJpY3Q6IFwiQVwiLFxuICBzY29wZTogZmFsc2UsXG5cbiAgbGluayhzY29wZSwgZWxlbWVudCkge1xuICAgIC8vY29uc29sZS5sb2cgZWxlbWVudC5jbG9zZXN0KFwibGFiZWxcIilcbiAgICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KFwiLmZvcm0tZ3JvdXBcIikuZmluZChcIi5jb250cm9sLWxhYmVsXCIpLmFkZENsYXNzKFwicmVxdWlyZWRcIilcbiAgfVxufSlcbl1cblxuZm9ybXMuZGlyZWN0aXZlKFwicmVxdWlyZWRcIiwgcmVxdWlyZWREaXJlY3RpdmUpXG5mb3Jtcy5kaXJlY3RpdmUoXCJuZ1JlcXVpcmVkXCIsIHJlcXVpcmVkRGlyZWN0aXZlKVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIGZvcm1zID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbi8vIFNlcnZpY2UgZm9yIHVwZGF0aW5nIGdyaWQgcm93c1xuLy8gcmVzdWx0IHNob3VsZCBjb250YWluIHR3byBhcnJheXM6XG4vLyAgIHJlc3VsdC5kYXRhIC0gZGF0YSBmb3Igc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgcm93c1xuLy8gICByZXN1bHQuZXJyb3JzIC0gYXNzb2MgYXJyYXkgZm9yIGVycm9ycyAoaWQgPT4gZXJyb3JzKVxuZm9ybXMuZmFjdG9yeSgnTWFzc1VwZGF0ZUhhbmRsZXInLCBbXG4gICckbG9nJywgJ2FsZXJ0cycsICgkbG9nLCBhbGVydHMpID0+IGZ1bmN0aW9uKGdyaWQsIHJlc3VsdCkge1xuICAgIGxldCBlcnJvciwgbWVzc2FnZVxuICAgICRsb2cuaW5mbygnW2Zvcm1zXSBNYXNzIHVwZGF0ZSByZXNwb25zZScsIHJlc3VsdClcblxuICAgIC8vIGhhbmRsZSB1cGRhdGVkIGZpZWxkc1xuICAgIGlmICghXy5pc05pbChyZXN1bHQuZGF0YSkpIHtcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIEFycmF5LmZyb20ocmVzdWx0LmRhdGEpKSB7IGdyaWQudXBkYXRlUm93KHJvdy5pZCwgcm93LCBmYWxzZSkgfVxuICAgIH0gZWxzZSB7XG4gICAgICAkbG9nLndhcm4oJ1tmb3Jtc10gSW52YWxpZCBKU09OIHJlc3BvbnNlLCBtaXNzaW5nIGRhdGEgYXJyYXknKVxuICAgIH1cblxuICAgIC8vIGhhbmRsZSBmaWVsZHMgd2l0aCBlcnJvcnNcbiAgICBpZiAoIV8uaXNOaWwocmVzdWx0LmVycm9ycykpIHtcbiAgICAgIGZvciAoY29uc3QgaWQgaW4gcmVzdWx0LmVycm9ycykgeyBlcnJvciA9IHJlc3VsdC5lcnJvcnNbaWRdOyBncmlkLmZsYXNoT25FcnJvcihpZCkgfVxuICAgICAgLy8gbWFrZSBzdXJlIGVycm9ycyBpcyBhbiBhcnJheSBpbnN0YW5jZVxuICAgICAgaWYgKHJlc3VsdC5lcnJvcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydHMuaW5mbygnTWFzcyB1cGRhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChlcnJvciBvZiBBcnJheS5mcm9tKHJlc3VsdC5lcnJvcnMpKSB7XG4gICAgICAgICAgbWVzc2FnZSA9ICc6ICdcbiAgICAgICAgICBmb3IgKGNvbnN0IGVycm9yS2V5IGluIGVycm9yLmVycm9ycykge1xuICAgICAgICAgIC8vIGdldCBmYWlsZWQgaW5zdGFuY2UgKHNob3VsZCBiZSBvYmplY3QpXG4gICAgICAgICAgICBjb25zdCBlcnJvclZhbHVlID0gZXJyb3IuZXJyb3JzW2Vycm9yS2V5XVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvclZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1zZ0tleSBpbiBlcnJvclZhbHVlKSB7XG4gICAgICAgICAgICAgIC8vIGVycm9yIG1lc3NhZ2VzIGFyZSBzdHJpbmdzXG4gICAgICAgICAgICAgICAgY29uc3QgbXNnVmFsdWUgPSBlcnJvclZhbHVlW21zZ0tleV1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1zZ1ZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGJ1aWxkIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IG1lc3NhZ2UubGVuZ3RoID4gMiA/ICdcXG4nIDogJydcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHttZXNzYWdlfSR7c2VwYXJhdG9yfSR7bXNnVmFsdWV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhbGVydHMuZXJyb3IobWVzc2FnZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAkbG9nLndhcm4oJ1tmb3Jtc10gSW52YWxpZCBKU09OIHJlc3BvbnNlLCBtaXNzaW5nIGVycm9ycyBhc3NvYyBhcnJheScpXG4gICAgICBhbGVydHMuaW5mbygnTWFzcyB1cGRhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseScpXG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gYWxlcnRzLmVycm9yKHJlc3VsdC5tZXNzYWdlKVxuICAgIH1cbiAgfVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgbmdSZXNvdXJjZSBmcm9tICdhbmd1bGFyLXJlc291cmNlJ1xuaW1wb3J0IG5nUm91dGUgZnJvbSAnYW5ndWxhci1yb3V0ZSdcbmltcG9ydCBhZ1BhdGhXaXRoQ29udGV4dCBmcm9tICcuLi9wYXRoV2l0aENvbnRleHQnXG5cbmNvbnN0IE1PRF9OQU1FID0gJ2FnLnJlc291cmNlU3VwcG9ydCdcbmV4cG9ydCBkZWZhdWx0IE1PRF9OQU1FXG52YXIgcmVzb3VyY2VzID0gYW5ndWxhci5tb2R1bGUoTU9EX05BTUUsIFtcbiAgbmdSZXNvdXJjZSxcbiAgbmdSb3V0ZSxcbiAgYWdQYXRoV2l0aENvbnRleHRcbl0pXG5cbnJlc291cmNlcy5jb25zdGFudCgnUmVzdENvbnRleHQnLCAnJylcbi8vIEJ1aWxkIGEgcmVzb3VyY2UgZm9yIHRoZSBnaXZlbiByZXN0ZnVsIHVybFxuLy8gVE9ETyBjbGVhbnVwIGFuZCBzcGVjIHRoaXMgc2VydmljZVxuLy8gVE9ETyBjb25zaWRlciBtb3ZlIGl0IHRvIGFuZ2xlLWdyaW5kZXJcbnJlc291cmNlcy5mYWN0b3J5KCdyZXNvdXJjZUJ1aWxkZXInLCBbXG4gICckcmVzb3VyY2UnLCAncGF0aFdpdGhDb250ZXh0JywgJ1Jlc3RDb250ZXh0JywgZnVuY3Rpb24oJHJlc291cmNlLCBwYXRoV2l0aENvbnRleHQsIFJlc3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGJhc2VQYXRoLCByZXNvdXJjZU5hbWUpIHtcbiAgICAgIGlmIChSZXN0Q29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGJhc2VQYXRoID0gJy9hcGknICsgYmFzZVBhdGhcbiAgICAgIH1cbiAgICAgIGlmKCFiYXNlUGF0aCl7XG5cbiAgICAgIH1cbiAgICAgIGlmIChyZXNvdXJjZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICByZXNvdXJjZU5hbWUgPSBiYXNlUGF0aC5yZXBsYWNlKC9eKFxcLyspLywgJycpXG4gICAgICB9XG4gICAgICB2YXIgcGF0aFdpdGhvdXRDb250ZXh0ID0gYmFzZVBhdGhcbiAgICAgIGJhc2VQYXRoID0gcGF0aFdpdGhDb250ZXh0KGJhc2VQYXRoKVxuICAgICAgdmFyIFJlc291cmNlID0gbnVsbFxuICAgICAgaWYgKFJlc3RDb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgUmVzb3VyY2UgPSAkcmVzb3VyY2UoYmFzZVBhdGggKyAnLzphY3Rpb24vOmlkJywgeyBpZDogJ0BpZCcgfSwge1xuICAgICAgICAgIGxpc3Q6IHsgbWV0aG9kOiAnR0VUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2xpc3QnIH0sIGlzQXJyYXk6IGZhbHNlIH0sXG4gICAgICAgICAgZ2V0OiB7IG1ldGhvZDogJ0dFVCcgfSxcbiAgICAgICAgICBzYXZlOiB7IG1ldGhvZDogJ1BPU1QnIH0sXG4gICAgICAgICAgdXBkYXRlOiB7IG1ldGhvZDogJ1BVVCcgfSxcbiAgICAgICAgICBkZWxldGU6IHsgbWV0aG9kOiAnREVMRVRFJyB9LFxuXG4gICAgICAgICAgLy8gbWFzcyBhY3Rpb25zIChmb3Igc2VsZWN0ZWQgcm93cylcbiAgICAgICAgICBtYXNzVXBkYXRlOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAnbWFzc1VwZGF0ZScgfSB9LFxuICAgICAgICAgIG1hc3NEZWxldGU6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdtYXNzRGVsZXRlJyB9IH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFJlc291cmNlID0gJHJlc291cmNlKGJhc2VQYXRoICsgJy86YWN0aW9uLzppZCcsIHsgaWQ6ICdAaWQnIH0sIHtcbiAgICAgICAgICBsaXN0OiB7IG1ldGhvZDogJ0dFVCcsIHBhcmFtczogeyBhY3Rpb246ICdsaXN0JyB9LCBpc0FycmF5OiBmYWxzZSB9LFxuICAgICAgICAgIGdldDogeyBtZXRob2Q6ICdHRVQnLCBwYXJhbXM6IHsgYWN0aW9uOiAnZ2V0JyB9IH0sXG4gICAgICAgICAgc2F2ZTogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ3NhdmUnIH0gfSxcbiAgICAgICAgICB1cGRhdGU6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICd1cGRhdGUnIH0gfSxcbiAgICAgICAgICBkZWxldGU6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdkZWxldGUnIH0gfSxcblxuICAgICAgICAgIC8vIG1hc3MgYWN0aW9ucyAoZm9yIHNlbGVjdGVkIHJvd3MpXG4gICAgICAgICAgbWFzc1VwZGF0ZTogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ21hc3NVcGRhdGUnIH0gfSxcbiAgICAgICAgICBtYXNzRGVsZXRlOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAnbWFzc0RlbGV0ZScgfSB9XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKFJlc291cmNlLnByb3RvdHlwZSwge1xuICAgICAgICByZXNvdXJjZU5hbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiByZXNvdXJjZU5hbWVcbiAgICAgICAgfSxcblxuICAgICAgICByZXNvdXJjZVBhdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBwYXRoV2l0aG91dENvbnRleHRcbiAgICAgICAgfSxcblxuICAgICAgICByZXNvdXJjZURhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhbmd1bGFyLmZyb21Kc29uKGFuZ3VsYXIudG9Kc29uKHRoaXMpKVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVjb3JkIGlzIHBlcnNpc3RlZCAoaGFzIGFuIGlkKVxuICAgICAgICBwZXJzaXN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlkICE9IG51bGxcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgcmVjb3JkIGlzIG5vdCBwZXJzaXN0ZWRcbiAgICAgICAgbmV3UmVjb3JkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIXRoaXMucGVyc2lzdGVkKClcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBCYWNrYm9uZSBzdHlsZSBzYXZlKCkgdGhhdCBpbnNlcnRzIG9yIHVwZGF0ZWQgdGhlIHJlY29yZFxuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgcHJlc2VuY2Ugb2YgYW4gaWQuXG4gICAgICAgIHNhdmU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7IG9wdGlvbnMgPSB7fSB9XG5cbiAgICAgICAgICB2YXIgbWV0aG9kXG4gICAgICAgICAgbWV0aG9kID0gdGhpcy5wZXJzaXN0ZWQoKSA/ICd1cGRhdGUnIDogJ3NhdmUnXG4gICAgICAgICAgcmV0dXJuIFJlc291cmNlW21ldGhvZF0oe30sIHRoaXMsIG9wdGlvbnMuc3VjY2Vzcywgb3B0aW9ucy5lcnJvcilcbiAgICAgICAgfSxcblxuICAgICAgICBkZWxldGU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7IG9wdGlvbnMgPSB7fSB9XG5cbiAgICAgICAgICByZXR1cm4gUmVzb3VyY2UuZGVsZXRlKHt9LCB0aGlzLCBvcHRpb25zLnN1Y2Nlc3MsIG9wdGlvbnMuZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBSZXNvdXJjZVxuICAgIH1cbiAgfVxuXSlcblxuLy8gVGhpcyBtb2R1bGUgZGVmaW5lcyB0aGUgcmVzb3VyY2UgbWFwcGluZ3MgcmVxdWlyZWQgYnkgQW5ndWxhciBKUyB0byBtYXAgdG8gYVxuLy8gc3RhbmRhcmQgR3JhaWxzIENSVUQgVVJMIHNjaGVtZSB0aGF0IHVzZXMgYFwiLyRjb250cm9sbGVyLyRhY3Rpb24/LyRpZD9cImAuXG5yZXNvdXJjZXMuZmFjdG9yeSgnUmVzb3VyY2UnLCBbXG4gICckZG9jdW1lbnQnLCAncmVzb3VyY2VCdWlsZGVyJywgZnVuY3Rpb24oJGRvY3VtZW50LCByZXNvdXJjZUJ1aWxkZXIpIHtcbiAgICB2YXIgJGJvZHkgPSAkZG9jdW1lbnQuZmluZCgnYm9keScpXG4gICAgdmFyIHVybCA9ICQoJGJvZHkpLmRhdGEoJ3Jlc291cmNlLXBhdGgnKVxuICAgIHZhciBuYW1lID0gJCgkYm9keSkuZGF0YSgncmVzb3VyY2UtbmFtZScpXG5cbiAgICByZXR1cm4gcmVzb3VyY2VCdWlsZGVyKHVybCwgbmFtZSlcbiAgfVxuXSlcblxuLy8gVHJpZXMgdG8gbG9hZCBhbiB1c2VyIHJlY29yZCB3aXRoIHRoZSBnaXZlbiBpZCB0YWtlbiBmcm9tIHJvdXRlIHBhcmFtc1xucmVzb3VyY2VzLmZhY3RvcnkoJ3Jlc291cmNlUmVzb2x2ZXInLCBbXG4gICckcScsICckcm91dGUnLCAnUmVzb3VyY2UnLCBmdW5jdGlvbigkcSwgJHJvdXRlLCBSZXNvdXJjZSkge1xuICAgIHJldHVybiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKVxuXG4gICAgICB2YXIgb25TdWNjZXNzID0gZnVuY3Rpb24odXNlcikge1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSh1c2VyKVxuICAgICAgfVxuXG4gICAgICB2YXIgb25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVqZWN0KClcbiAgICAgIH1cblxuICAgICAgUmVzb3VyY2UuZ2V0KHsgaWQ6IGlkIH0sIG9uU3VjY2Vzcywgb25FcnJvcilcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuICB9XG5dKVxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogYm9vdHN0cmFweC1jbGlja292ZXIuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9sZWNhci1yZWQvYm9vdHN0cmFweC1jbGlja292ZXJcbiAqIHZlcnNpb246IDEuMFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICpcbiAqIEJhc2VkIG9uIHdvcmsgZnJvbSBUd2l0dGVyIEJvb3RzdHJhcCBhbmRcbiAqIGZyb20gUG9wb3ZlciBsaWJyYXJ5IGh0dHA6Ly90d2l0dGVyLmdpdGh1Yi5jb20vYm9vdHN0cmFwL2phdmFzY3JpcHQuaHRtbCNwb3BvdmVyXG4gKiBmcm9tIHRoZSBncmVhdCBndXlzIGF0IFR3aXR0ZXIuXG4gKlxuICogVW50ZXN0ZWQgd2l0aCAyLjEuMCBidXQgc2hvdWxkIHdvcmtlZCB3aXRoIDIuMC54XG4gKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuIWZ1bmN0aW9uKCQpIHtcbiAgXCJ1c2Ugc3RyaWN0XCJcblxuICAvKiBjbGFzcyBkZWZpbml0aW9uICovXG4gIHZhciBDbGlja292ZXIgPSBmdW5jdGlvbiAoIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG4gICAgLy8gbG9jYWwgaW5pdFxuICAgIHRoaXMuY2luaXQoJ2NsaWNrb3ZlcicsIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgfVxuXG4gIENsaWNrb3Zlci5wcm90b3R5cGUgPSAkLmV4dGVuZCh7fSwgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG4gICAgY29uc3RydWN0b3I6IENsaWNrb3ZlclxuXG4gICAgLCBjaW5pdDogZnVuY3Rpb24oIHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG4gICAgICB0aGlzLmF0dHIgPSB7fTtcblxuICAgICAgLy8gY2hvb3NlIHJhbmRvbSBhdHRycyBpbnN0ZWFkIG9mIHRpbWVzdGFtcCBvbmVzXG4gICAgICB0aGlzLmF0dHIubWUgPSAoKE1hdGgucmFuZG9tKCkgKiAxMCkgKyBcIlwiKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgdGhpcy5hdHRyLmNsaWNrX2V2ZW50X25zID0gXCJjbGljay5cIiArIHRoaXMuYXR0ci5tZSArIFwiIHRvdWNoc3RhcnQuXCIgKyB0aGlzLmF0dHIubWU7XG5cbiAgICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBvcHRpb25zLnRyaWdnZXIgPSAnbWFudWFsJztcblxuICAgICAgLy8gY2FsbCBwYXJlbnRcbiAgICAgIHRoaXMuaW5pdCggdHlwZSwgZWxlbWVudCwgb3B0aW9ucyApO1xuXG4gICAgICAvLyBzZXR1cCBvdXIgb3duIGhhbmRsZXJzXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCAnY2xpY2snLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy5jbGlja2VyeSwgdGhpcykgKTtcblxuICAgICAgLy8gc29vbiBhZGQgY2xpY2sgaGFubGRlciB0byBib2R5IHRvIGNsb3NlIHRoaXMgZWxlbWVudFxuICAgICAgLy8gd2lsbCBuZWVkIGN1c3RvbSBoYW5kbGVyIGluc2lkZSBoZXJlXG4gICAgfVxuICAgICwgY2xpY2tlcnk6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIGNsaWNrZXJ5IGlzbid0IG9ubHkgcnVuIGJ5IGV2ZW50IGhhbmRsZXJzIGNhbiBiZSBjYWxsZWQgYnkgdGltZW91dCBvciBtYW51YWxseVxuICAgICAgLy8gb25seSBydW4gb3VyIGNsaWNrIGhhbmRsZXIgYW5kXG4gICAgICAvLyBuZWVkIHRvIHN0b3AgcHJvZ3JhdGlvbiBvciBib2R5IGNsaWNrIGhhbmRsZXIgd291bGQgZmlyZSByaWdodCBhd2F5XG4gICAgICBpZiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBwb3BvdmVyJ3MgZGltJ3NcbiAgICAgIHRoaXMub3B0aW9ucy53aWR0aCAgJiYgdGhpcy50aXAoKS53aWR0aCggIHRoaXMub3B0aW9ucy53aWR0aCAgKTtcbiAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQgJiYgdGhpcy50aXAoKS5oZWlnaHQoIHRoaXMub3B0aW9ucy5oZWlnaHQgKTtcblxuICAgICAgLy8gc2V0IHBvcG92ZXIncyB0aXAgJ2lkJyBmb3IgZ3JlYXRlciBjb250cm9sIG9mIHJlbmRlcmluZyBvciBjc3MgcnVsZXNcbiAgICAgIHRoaXMub3B0aW9ucy50aXBfaWQgICAgICYmIHRoaXMudGlwKCkuYXR0cignaWQnLCB0aGlzLm9wdGlvbnMudGlwX2lkICk7XG5cbiAgICAgIC8vIGFkZCBhIGN1c3RvbSBjbGFzc1xuICAgICAgdGhpcy5vcHRpb25zLmNsYXNzX25hbWUgJiYgdGhpcy50aXAoKS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY2xhc3NfbmFtZSk7XG5cbiAgICAgIC8vIHdlIGNvdWxkIG92ZXJyaWRlIHRoaXMgdG8gcHJvdmlkZSBzaG93IGFuZCBoaWRlIGhvb2tzXG4gICAgICB0aGlzWyB0aGlzLmlzU2hvd24oKSA/ICdoaWRlJyA6ICdzaG93JyBdKCk7XG5cbiAgICAgIC8vIGlmIHNob3duIGFkZCBnbG9iYWwgY2xpY2sgY2xvc2VyXG4gICAgICBpZiAoIHRoaXMuaXNTaG93bigpICkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgLy8gY2xvc2Ugb24gZ2xvYmFsIHJlcXVlc3QsIGV4Y2x1ZGUgY2xpY2tzIGluc2lkZSBjbGlja292ZXJcbiAgICAgICAgdGhpcy5vcHRpb25zLmdsb2JhbF9jbG9zZSAmJlxuICAgICAgICAgICQoJ2JvZHknKS5vbiggdGhpcy5hdHRyLmNsaWNrX2V2ZW50X25zLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoICF0aGF0LnRpcCgpLmhhcyhlLnRhcmdldCkubGVuZ3RoICkgeyB0aGF0LmNsaWNrZXJ5KCk7IH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMuZXNjX2Nsb3NlICYmICQoZG9jdW1lbnQpLmJpbmQoJ2tleXVwLmNsaWNrZXJ5JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykgeyB0aGF0LmNsaWNrZXJ5KCk7IH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZmlyc3QgY2hlY2sgZm9yIG90aGVycyB0aGF0IG1pZ2h0IGJlIG9wZW5cbiAgICAgICAgLy8gd2FudGVkIHRvIHVzZSAnY2xpY2snIGJ1dCBtaWdodCBhY2NpZGVudGx5IHRyaWdnZXIgb3RoZXIgY3VzdG9tIGNsaWNrIGhhbmRsZXJzXG4gICAgICAgIC8vIG9uIGNsaWNrb3ZlciBlbGVtZW50c1xuICAgICAgICAhdGhpcy5vcHRpb25zLmFsbG93X211bHRpcGxlICYmXG4gICAgICAgICAgICAkKCdbZGF0YS1jbGlja292ZXItb3Blbj0xXScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnY2xpY2tvdmVyJykgJiYgJCh0aGlzKS5kYXRhKCdjbGlja292ZXInKS5jbGlja2VyeSgpOyB9KTtcblxuICAgICAgICAvLyBoZWxwIHVzIHRyYWNrIGVsZW1lbnRzIHcvIG9wZW4gY2xpY2tvdmVycyB1c2luZyBodG1sNVxuICAgICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtY2xpY2tvdmVyLW9wZW4nLCAxKTtcblxuICAgICAgICAvLyBpZiBlbGVtZW50IGhhcyBjbG9zZSBidXR0b24gdGhlbiBtYWtlIHRoYXQgd29yaywgbGlrZSB0b1xuICAgICAgICAvLyBhZGQgb3B0aW9uIGNsb3NlX3NlbGVjdG9yXG4gICAgICAgIHRoaXMudGlwKCkub24oJ2NsaWNrJywgJ1tkYXRhLWRpc21pc3M9XCJjbGlja292ZXJcIl0nLCAkLnByb3h5KHRoaXMuY2xpY2tlcnksIHRoaXMpKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIHRpbWVvdXQgaGlkZVxuICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5hdXRvX2Nsb3NlICYmIHRoaXMub3B0aW9ucy5hdXRvX2Nsb3NlID4gMCApIHtcbiAgICAgICAgICB0aGlzLmF0dHIudGlkID1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoICQucHJveHkodGhpcy5jbGlja2VyeSwgdGhpcyksIHRoaXMub3B0aW9ucy5hdXRvX2Nsb3NlICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm92aWRlIGNhbGxiYWNrIGhvb2tzIGZvciBwb3N0IHNob3duIGV2ZW50XG4gICAgICAgIHR5cGVvZiB0aGlzLm9wdGlvbnMub25TaG93biA9PSAnZnVuY3Rpb24nICYmIHRoaXMub3B0aW9ucy5vblNob3duLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvd24nKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUF0dHIoJ2RhdGEtY2xpY2tvdmVyLW9wZW4nKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMuZXNjX2Nsb3NlICYmICQoZG9jdW1lbnQpLnVuYmluZCgna2V5dXAuY2xpY2tlcnknKTtcblxuICAgICAgICAkKCdib2R5Jykub2ZmKCB0aGlzLmF0dHIuY2xpY2tfZXZlbnRfbnMgKTtcblxuICAgICAgICBpZiAoIHR5cGVvZiB0aGlzLmF0dHIudGlkID09IFwibnVtYmVyXCIgKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYXR0ci50aWQpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmF0dHIudGlkO1xuICAgICAgICB9XG5cblx0XHQvLyBwcm92aWRlIHNvbWUgY2FsbGJhY2sgaG9va3NcbiAgICAgICAgdHlwZW9mIHRoaXMub3B0aW9ucy5vbkhpZGRlbiA9PSAnZnVuY3Rpb24nICYmIHRoaXMub3B0aW9ucy5vbkhpZGRlbi5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgIH1cbiAgICAsIGlzU2hvd246IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGlwKCkuaGFzQ2xhc3MoJ2luJyk7XG4gICAgfVxuICAgICwgcmVzZXRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGlwXG4gICAgICAgICwgaW5zaWRlXG4gICAgICAgICwgcG9zXG4gICAgICAgICwgYWN0dWFsV2lkdGhcbiAgICAgICAgLCBhY3R1YWxIZWlnaHRcbiAgICAgICAgLCBwbGFjZW1lbnRcbiAgICAgICAgLCB0cFxuXG4gICAgICBpZiAodGhpcy5oYXNDb250ZW50KCkgJiYgdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICR0aXAgPSB0aGlzLnRpcCgpXG5cbiAgICAgICAgcGxhY2VtZW50ID0gdHlwZW9mIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnBsYWNlbWVudC5jYWxsKHRoaXMsICR0aXBbMF0sIHRoaXMuJGVsZW1lbnRbMF0pIDpcbiAgICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50XG5cbiAgICAgICAgaW5zaWRlID0gL2luLy50ZXN0KHBsYWNlbWVudClcblxuICAgICAgICBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKGluc2lkZSlcblxuICAgICAgICBhY3R1YWxXaWR0aCA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICAgICAgYWN0dWFsSGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgICAgICBzd2l0Y2ggKGluc2lkZSA/IHBsYWNlbWVudC5zcGxpdCgnICcpWzFdIDogcGxhY2VtZW50KSB7XG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHRwID0ge3RvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQsIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMn1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHRwID0ge3RvcDogcG9zLnRvcCAtIGFjdHVhbEhlaWdodCwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggLyAyIC0gYWN0dWFsV2lkdGggLyAyfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIHRwID0ge3RvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgLSBhY3R1YWxXaWR0aH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgdHAgPSB7dG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICAkdGlwLmNzcyh0cClcbiAgICAgIH1cbiAgICB9XG4gICAgLCBkZWJ1Z2hpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGR0ID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuXG4gICAgICBjb25zb2xlLmxvZyhkdCArIFwiOiBjbGlja292ZXIgaGlkZVwiKTtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfSlcblxuICAvKiBwbHVnaW4gZGVmaW5pdGlvbiAqL1xuICAvKiBzdG9sZW4gZnJvbSBib290c3RyYXAgdG9vbHRpcC5qcyAqL1xuICAkLmZuLmNsaWNrb3ZlciA9IGZ1bmN0aW9uKCBvcHRpb24gKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgICAgLCBkYXRhID0gJHRoaXMuZGF0YSgnY2xpY2tvdmVyJylcbiAgICAgICAgLCBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdjbGlja292ZXInLCAoZGF0YSA9IG5ldyBDbGlja292ZXIodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4uY2xpY2tvdmVyLkNvbnN0cnVjdG9yID0gQ2xpY2tvdmVyXG5cbiAgLy8gdGhlc2UgZGVmYXVsdHMgYXJlIHBhc3NlZCBkaXJlY3RseSB0byBwYXJlbnQgY2xhc3Nlc1xuICAkLmZuLmNsaWNrb3Zlci5kZWZhdWx0cyA9ICQuZXh0ZW5kKHt9LCAkLmZuLnBvcG92ZXIuZGVmYXVsdHMsIHtcbiAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICBhdXRvX2Nsb3NlOiAgIDAsIC8qIG1zIHRvIGF1dG8gY2xvc2UgY2xpY2tvdmVyLCAwIG1lYW5zIG5vbmUgKi9cbiAgICBnbG9iYWxfY2xvc2U6IDEsIC8qIGFsbG93IGNsb3NlIHdoZW4gY2xpY2tlZCBhd2F5IGZyb20gY2xpY2tvdmVyICovXG4gICAgZXNjX2Nsb3NlOiAgICAxLCAvKiBhbGxvdyBjbGlja292ZXIgdG8gY2xvc2Ugd2hlbiBlc2Mga2V5IGlzIHByZXNzZWQgKi9cbiAgICBvblNob3duOiAgbnVsbCwgIC8qIGZ1bmN0aW9uIHRvIGJlIHJ1biBvbmNlIGNsaWNrb3ZlciBoYXMgYmVlbiBzaG93biAqL1xuICAgIG9uSGlkZGVuOiBudWxsLCAgLyogZnVuY3Rpb24gdG8gYmUgcnVuIG9uY2UgY2xpY2tvdmVyIGhhcyBiZWVuIGhpZGRlbiAqL1xuICAgIHdpZHRoOiAgbnVsbCwgLyogbnVtYmVyIGlzIHB4IChkb24ndCBhZGQgcHgpLCBudWxsIG9yIDAgLSBkb24ndCBzZXQgYW55dGhpbmcgKi9cbiAgICBoZWlnaHQ6IG51bGwsIC8qIG51bWJlciBpcyBweCAoZG9uJ3QgYWRkIHB4KSwgbnVsbCBvciAwIC0gZG9uJ3Qgc2V0IGFueXRoaW5nICovXG4gICAgdGlwX2lkOiBudWxsLCAgLyogaWQgb2YgcG9wb3ZlciBjb250YWluZXIgKi9cbiAgICBjbGFzc19uYW1lOiAnY2xpY2tvdmVyJywgLyogZGVmYXVsdCBjbGFzcyBuYW1lIGluIGFkZGl0aW9uIHRvIG90aGVyIGNsYXNzZXMgKi9cbiAgICBhbGxvd19tdWx0aXBsZTogMCAvKiBlbmFibGUgdG8gYWxsb3cgZm9yIG11bHRpcGxlIGNsaWNrb3ZlcnMgdG8gYmUgb3BlbiBhdCB0aGUgc2FtZSB0aW1lICovXG4gIH0pXG5cbn0oIHdpbmRvdy5qUXVlcnkgKTtcblxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBhZ0NvbW1vbiBmcm9tICcuLi9jb21tb24nXG5pbXBvcnQgYWdTZWxlY3QyIGZyb20gJy4uL3NlbGVjdDInXG5pbXBvcnQgYWxlcnRzIGZyb20gJy4uL2FsZXJ0cydcbmltcG9ydCBhZ1BhdGhXaXRoQ29udGV4dCBmcm9tICcuLi9wYXRoV2l0aENvbnRleHQnXG5pbXBvcnQgeGVkaXRhYmxlIGZyb20gJ2FuZ3VsYXIteGVkaXRhYmxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHVpYk1vZE5hbWUgZnJvbSAnYW5ndWxhci11aS1ib290c3RyYXAnXG5cbmNvbnN0IE1PRF9OQU1FID0gJ2FuZ2xlR3JpbmRlci5mb3JtcydcbmV4cG9ydCBkZWZhdWx0IE1PRF9OQU1FXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShNT0RfTkFNRSwgW1xuICB1aWJNb2ROYW1lLFxuICB4ZWRpdGFibGUsXG4gIGFnUGF0aFdpdGhDb250ZXh0LFxuICBhZ0NvbW1vbixcbiAgYWdTZWxlY3QyLFxuICBhbGVydHNcbl0pXG5cbmZvcm1zLnJ1bihbXG4gICckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgLy8gT3ZlcnJpZGUgaHRtbCB0ZW1wbGF0ZSBmb3IgdGhlIGFuZ3VsYXItdWkvYm9vdHN0cmFwIHBhZ2luYXRpb25cbiAgICAvLyB0byBtYWtlIGl0IGJhY2t3YXJkIGNvbXBhdGlibGUgd2l0aCBib290c3RyYXAgMy54XG5cbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5odG1sJyxcbiAgICAgIGBcXFxuPHVsIGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICA8bGkgbmctY2xhc3M9XCJ7ZGlzYWJsZWQ6IG5vUHJldmlvdXMoKSwgcHJldmlvdXM6IGFsaWdufVwiPlxuICAgIDxhIGhyZWYgbmctY2xpY2s9XCJzZWxlY3RQYWdlKHBhZ2UgLSAxKVwiPnt7Z2V0VGV4dCgncHJldmlvdXMnKX19PC9hPlxuICA8L2xpPlxuXG4gIDxsaSBuZy1yZXBlYXQ9XCJwYWdlIGluIHBhZ2VzXCIgbmctY2xhc3M9XCJ7YWN0aXZlOiBwYWdlLmFjdGl2ZSwgZGlzYWJsZWQ6IHBhZ2UuZGlzYWJsZWR9XCI+XG4gICAgPGEgbmctY2xpY2s9XCJzZWxlY3RQYWdlKHBhZ2UubnVtYmVyKVwiPnt7cGFnZS50ZXh0fX08L2E+XG4gIDwvbGk+XG5cbiAgPGxpIG5nLWNsYXNzPVwie2Rpc2FibGVkOiBub05leHQoKSwgbmV4dDogYWxpZ259XCI+XG4gICAgPGEgaHJlZiBuZy1jbGljaz1cInNlbGVjdFBhZ2UocGFnZSArIDEpXCI+e3tnZXRUZXh0KCduZXh0Jyl9fTwvYT5cbiAgPC9saT5cbjwvdWw+XFxcbmBcbiAgICApXG5cbiAgICByZXR1cm4gJHRlbXBsYXRlQ2FjaGUucHV0KCd0b29sdGlwL3Rvb2x0aXAudHBsLmh0bWwnLFxuICAgICAgYFxcXG48ZGl2IGNsYXNzPVwidG9vbHRpcCBpblwiIG5nLXNob3c9XCJ0aXRsZVwiPlxuICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiIG5nLWJpbmQ9XCJ0aXRsZVwiPjwvZGl2PlxuPC9kaXY+XFxcbmBcbiAgICApXG4gIH1cbl0pXG5cbmZvcm1zLmNvbmZpZyhbJyRwcm92aWRlJywgJHByb3ZpZGUgPT4gLy8gRGVjb3JhdGUgc2VsZWN0IHRhZ3MsIHdyYXAgaW5zaWRlICdzZWxlY3Qtd3JhcHBlcicgc28gd2UgY2FuIGFkZCBkcm9wZG93biBhcnJvdyB0byBzdGFuZGFyZCBodG1sIHNlbGVjdHNcbiAgJHByb3ZpZGUuZGVjb3JhdG9yKCdzZWxlY3REaXJlY3RpdmUnLCBbJyRkZWxlZ2F0ZScsIGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgIGNvbnN0IGRpcmVjdGl2ZSA9ICRkZWxlZ2F0ZVswXVxuICAgIGNvbnN0IHtcbiAgICAgIGxpbmtcbiAgICB9ID0gZGlyZWN0aXZlXG5cbiAgICBkaXJlY3RpdmUuY29tcGlsZSA9IChlbGVtZW50LCBhdHRycykgPT4gKHtcbiAgICAgIHByZShzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihsaW5rLnByZSkpIHsgcmV0dXJuIGxpbmsucHJlKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkgfVxuICAgICAgfSxcblxuICAgICAgcG9zdChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgLy8gQWRkIHdyYXBwZXIsIGlmIGl0cyBub3QgYWxyZWFkeSB3cmFwcGVkIGFuZCBpdHMgbm90IGEgc2VsZWN0Mi13cmFwcGVyLlxuICAgICAgICBpZiAoIShlbGVtZW50LnBhcmVudCgpLmF0dHIoJ2NsYXNzJykgPT09ICdzZWxlY3Qtd3JhcHBlcicpICYmIChlbGVtZW50LmF0dHIoJ3VpLXNlbGVjdDInKSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KFwiPGRpdiBjbGFzcz0nc2VsZWN0LXdyYXBwZXInPjwvZGl2PlwiKVxuICAgICAgICAgIGVsZW1lbnQud3JhcCh0ZW1wbGF0ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24obGluay5wb3N0KSkgeyByZXR1cm4gbGluay5wb3N0KHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gJGRlbGVnYXRlXG4gIH1cbiAgXSlcbl0pXG5cbi8vIFRPRE86IHJlZmFjdG9yLCBjYW4gY2F1c2UgZXJyb3JzIHN3YWxsb3dpbmdcbmZvcm1zLmNvbmZpZyhbJyRxUHJvdmlkZXInLCAkcVByb3ZpZGVyID0+ICRxUHJvdmlkZXIuZXJyb3JPblVuaGFuZGxlZFJlamVjdGlvbnMoZmFsc2UpXG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi4vY29tbW9uTW9kdWxlJ1xuXG5jb25zdCBzcGlubmVyID0gYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKVxuXG4vKlxuVXNlIGNzcyB0byBzZXQgdGhlIHNwaW5uZXIgYW5pbWF0aW9uIGltYWdlOlxuYGBgXG4gIGxpLnNwaW5uZXIgaS5zcGluOmJlZm9yZSB7XG4gICAgY29udGVudDogdXJsKCcvaW1nL2FqYXgtbG9hZGVyLmdpZicpXG4gIH1cbmBgYFxuKi9cbnNwaW5uZXIuZGlyZWN0aXZlKCdhZ1NwaW5uZXInLCAoKSA9PiAoe1xuICByZXBsYWNlOiB0cnVlLFxuICByZXN0cmljdDogJ0UnLFxuXG4gIGNvbnRyb2xsZXI6IFtcbiAgICAnJHNjb3BlJywgJ3BlbmRpbmdSZXF1ZXN0cycsXG4gICAgKCRzY29wZSwgcGVuZGluZ1JlcXVlc3RzKSA9PiAkc2NvcGUuc2hvd1NwaW5uZXIgPSAoKSA9PiBwZW5kaW5nUmVxdWVzdHMuYW55KClcbiAgXSxcblxuICB0ZW1wbGF0ZTogYFxcXG48bGkgY2xhc3M9XCJzcGlubmVyXCI+XG4gIDxhIGhyZWY9XCIjXCI+PGkgbmctY2xhc3M9XCJ7c3Bpbjogc2hvd1NwaW5uZXIoKX1cIj48L2k+PC9hPlxuPC9saT5cXFxuYFxufSkpXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgY29tbW9uTW9kdWxlIGZyb20gJy4vY29tbW9uTW9kdWxlJ1xuaW1wb3J0ICcuL2FnQ3VycmVuY3lGaWx0ZXInXG5pbXBvcnQgJy4vYWdEYXRlRmlsdGVyJ1xuaW1wb3J0ICcuL2FnRGF0ZVRpbWVGaWx0ZXInXG5pbXBvcnQgJy4vY2hlY2tNYXJrRmlsdGVyJ1xuaW1wb3J0ICcuL25ld0xpbmVzRmlsdGVyJ1xuaW1wb3J0ICcuL3BlcmNlbnRhZ2VGaWx0ZXInXG5pbXBvcnQgJy4vc2VydmljZXMnXG5pbXBvcnQgJy4vZGlyZWN0aXZlcydcblxuZXhwb3J0IGRlZmF1bHQgY29tbW9uTW9kdWxlXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uL2dyaWR6TW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgZ3JpZHogPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuY2xhc3MgR3JpZExpbmtTZXJ2Q2xhc3Mge1xuICBjb25zdHJ1Y3RvcihwYXRoV2l0aENvbnRleHQsIEZsYXR0ZW5TZXJ2KSB7XG4gICAgY29uc3QgZm4gPSBmdW5jdGlvbihwYXRoLCBuYW1lLCBpZEZpZWxkLCByb3dEYXRhKSB7XG4gICAgICBpZiAocm93RGF0YSA9PSBudWxsKSB7IHJvd0RhdGEgPSB7fSB9XG4gICAgICBpZiAoIW5hbWUpIHsgcmV0dXJuICcnIH1cblxuICAgICAgbGV0IGhyZWYgPSBwYXRoV2l0aENvbnRleHQocGF0aClcblxuICAgICAgLy8gYXBwZW5kIGlkIHRvIHRoZSBwYXRoIChpZiBnaXZlbilcbiAgICAgIGlmICghXy5pc05pbChpZEZpZWxkKSkge1xuICAgICAgICBjb25zdCBpZCA9IEZsYXR0ZW5TZXJ2KHJvd0RhdGEpW2lkRmllbGRdXG4gICAgICAgIGlmIChfLmlzTmlsKGlkKSkgeyByZXR1cm4gJycgfVxuXG4gICAgICAgIGhyZWYgKz0gYCMvJHtpZH1gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgXFxcbjxhIGhyZWY9XCIke2hyZWZ9XCI+JHtuYW1lfTwvYT5cXFxuYFxuICAgIH1cbiAgICByZXR1cm4gZm5cbiAgfVxufVxuXG5HcmlkTGlua1NlcnZDbGFzcy4kaW5qZWN0ID0gWydwYXRoV2l0aENvbnRleHQnLCAnRmxhdHRlblNlcnYnXVxuLy8gR2VuZXJpYyBtZXRob2QgZm9yIGdlbmVyYXRpbmcgbGlua3MgaW5zaWRlIGpxR3JpZFxuZ3JpZHouc2VydmljZSgnR3JpZExpbmtTZXJ2JywgR3JpZExpbmtTZXJ2Q2xhc3MpXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8gRG91YmxlIGNoZWNrIGRlbGV0ZSBidXR0b25cbi8vIHVzYWdlOlxuLy8gICA8YWctZGVsZXRlLWJ1dHRvbiB3aGVuLWNvbmZpcm1lZD1cImRlbGV0ZShyZWNvcmQpXCI+PC9hZy1kZWxldGUtYnV0dG9uPlxuLy9cbi8vICAgYHdoZW4tY29uZmlybWVkYCBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGFjdGlvbiB3YXMgY29uZmlybWVkXG5mb3Jtcy5kaXJlY3RpdmUoXCJhZ0RlbGV0ZUJ1dHRvblwiLCAoKSA9PiAoe1xuICByZXN0cmljdDogXCJFXCIsXG4gIHJlcGxhY2U6IHRydWUsXG5cbiAgc2NvcGU6IHtcbiAgICB3aGVuQ29uZmlybWVkOiBcIiZcIlxuICB9LFxuXG4gIGNvbnRyb2xsZXI6IFtcbiAgICBcIiRzY29wZVwiLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICRzY29wZS5jb25maXJtYXRpb24gPSBmYWxzZVxuXG4gICAgICAkc2NvcGUuc2hvd0NvbmZpcm1hdGlvbiA9ICgpID0+ICRzY29wZS5jb25maXJtYXRpb24gPSB0cnVlXG5cbiAgICAgIHJldHVybiAkc2NvcGUuZG9EZWxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmNvbmZpcm1hdGlvbiA9IGZhbHNlXG5cbiAgICAgICAgLy8gb24gdGhlIHNlY29uZCBjbGljayBwZXJmb3JtIHRoZSBnaXZlbiBhY3Rpb25cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9ICRzY29wZS53aGVuQ29uZmlybWVkKClcblxuICAgICAgICAvLyBkaXNhYmxlIC8gZW5hYmxlIHRoZSBidXR0b25cbiAgICAgICAgJHNjb3BlLmRlbGV0aW5nID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdHlwZW9mIHByb21pc2U/LmZpbmFsbHkgPT09ICdmdW5jdGlvbicgPyBwcm9taXNlPy5maW5hbGx5KCgpID0+ICRzY29wZS5kZWxldGluZyA9IGZhbHNlKSA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH1cbiAgXSxcblxuICB0ZW1wbGF0ZTogYFxcXG48YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImJ0biBhZy1kZWxldGUtYnV0dG9uXCJcbiAgICAgICAgbmctY2xhc3M9XCJ7IHRydWU6ICdidG4td2FybmluZycsIGZhbHNlOiAnYnRuLWRhbmdlcicgfVtjb25maXJtYXRpb25dXCJcbiAgICAgICAgbmctZGlzYWJsZWQ9XCJkZWxldGluZ1wiXG4gICAgICAgIG5nLW1vdXNlbGVhdmU9XCJjb25maXJtYXRpb24gPSBmYWxzZVwiXG4gICAgICAgIG5nLWNsaWNrPVwiY29uZmlybWF0aW9uID8gZG9EZWxldGUoKSA6IHNob3dDb25maXJtYXRpb24oKVwiPlxuICA8aSBjbGFzcz1cImZhIGZhLXRyYXNoLW9cIj48L2k+XG5cbiAgPG5nLXN3aXRjaCBvbj1cImNvbmZpcm1hdGlvblwiPlxuICAgIDxzcGFuIG5nLXN3aXRjaC1kZWZhdWx0PkRlbGV0ZTwvc3Bhbj5cbiAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInRydWVcIj5BcmUgeW91IHN1cmU/PC9zcGFuPlxuICA8L25nLXN3aXRjaD5cblxuICA8c3BhbiBuZy1pZj1cImRlbGV0aW5nXCI+Li4uPC9zcGFuPlxuPC9idXR0b24+XFxcbmBcbn0pKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBncmlkek1vZHVsZSBmcm9tICcuLi9ncmlkek1vZHVsZSdcblxuY29uc3QgZ3JpZHogPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuZ3JpZHouY29uc3RhbnQoJ3Jvb3RQYXRoJywgJy8nKVxuXG4vLyBTaG93IHRoZSBncmlkIChvciBvdGhlciBjb250ZW50KSB3aGVuIHRoZSBjdXJyZW50IHJvdXRlXG4vLyBwb2ludHMgdG8gdGhlIHJvb3QgcGFnZSBvZiB0aGUgZ2l2ZW4gc2VjdGlvbi5cbmdyaWR6LmRpcmVjdGl2ZSgnYWdHcmlkUGxhY2Vob2xkZXInLCBbXG4gICckbG9nJywgJyRwYXJzZScsICdwYXRoV2l0aENvbnRleHQnLCAncm9vdFBhdGgnLFxuICAoJGxvZywgJHBhcnNlLCBwYXRoV2l0aENvbnRleHQsIHJvb3RQYXRoKSA9PiAoe1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHRydWUsXG5cbiAgICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgc2NvcGUudGVtcGxhdGVTcmMgPSBwYXRoV2l0aENvbnRleHQoYXR0cnMuc3JjKVxuXG4gICAgICAvLyBpbml0aWFsbHkgZG8gbm90IHJlbmRlciB0aGUgZ3JpZFxuICAgICAgc2NvcGUucmVuZGVyR3JpZCA9IGZhbHNlXG5cbiAgICAgIC8vIGFiaWxpdHkgdG8gZm9yY2UgdGhlIGdyaWQgcmVuZGVyaW5nXG4gICAgICBpZiAoYXR0cnMuZm9yY2VSZW5kZXJHcmlkKSB7XG4gICAgICAgIHNjb3BlLnJlbmRlckdyaWQgPSAkcGFyc2UoYXR0cnMuZm9yY2VSZW5kZXJHcmlkKShzY29wZSlcbiAgICAgIH1cblxuICAgICAgLy8gaW5pdGlhbGx5IGhpZGUgdGhlIGdyaWRcbiAgICAgIHNjb3BlLnNob3dHcmlkID0gZmFsc2VcblxuICAgICAgLy8gc2hvdyAvIGhpZGUgdGhlIGdyaWQgb24gcm91dGUgY2hhbmdlXG4gICAgICByZXR1cm4gc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIGN1cnJlbnRSb3V0ZSkge1xuICAgICAgICBjb25zdCBjdXJyZW50UGF0aCA9IGN1cnJlbnRSb3V0ZS5vcmlnaW5hbFBhdGhcbiAgICAgICAgY29uc3Qgc2hvdyA9IChjdXJyZW50UGF0aCA9PT0gcm9vdFBhdGgpIHx8IChjdXJyZW50UGF0aCA9PT0gJycpXG5cbiAgICAgICAgLy8gcmVuZGVyIHRoZSBncmlkIG9ubHkgb25jZVxuICAgICAgICBpZiAoc2hvdykgeyBzY29wZS5yZW5kZXJHcmlkID0gc2hvdyB9XG5cbiAgICAgICAgLy8gc2hvdy9oaWRlIHRoZSBncmlkXG4gICAgICAgIHNjb3BlLnNob3dHcmlkID0gc2hvd1xuXG4gICAgICAgIGNvbnN0IG1zZyA9IHNob3cgPyAnc2hvdyBncmlkJyA6ICdoaWRlIGdyaWQnXG4gICAgICAgIHJldHVybiAkbG9nLmRlYnVnKCdbYWdHcmlkXScsIG1zZywgY3VycmVudFJvdXRlKVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IGBcXFxuPGRpdiBuZy1pZj1cInJlbmRlckdyaWRcIj5cbiAgPG5nLWluY2x1ZGUgc3JjPVwidGVtcGxhdGVTcmNcIiBuZy1zaG93PVwic2hvd0dyaWRcIj48L25nLWluY2x1ZGU+XG48L2Rpdj5cXFxuYFxuICB9KVxuXSlcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZlwiOiBcIksvdGNcIixcblx0XCIuL2FmLmpzXCI6IFwiSy90Y1wiLFxuXHRcIi4vYXJcIjogXCJqbk80XCIsXG5cdFwiLi9hci1kelwiOiBcIm8xYkVcIixcblx0XCIuL2FyLWR6LmpzXCI6IFwibzFiRVwiLFxuXHRcIi4vYXIta3dcIjogXCJRajRKXCIsXG5cdFwiLi9hci1rdy5qc1wiOiBcIlFqNEpcIixcblx0XCIuL2FyLWx5XCI6IFwiSFAzaFwiLFxuXHRcIi4vYXItbHkuanNcIjogXCJIUDNoXCIsXG5cdFwiLi9hci1tYVwiOiBcIkNvUkpcIixcblx0XCIuL2FyLW1hLmpzXCI6IFwiQ29SSlwiLFxuXHRcIi4vYXItc2FcIjogXCJnakNUXCIsXG5cdFwiLi9hci1zYS5qc1wiOiBcImdqQ1RcIixcblx0XCIuL2FyLXRuXCI6IFwiYllNNlwiLFxuXHRcIi4vYXItdG4uanNcIjogXCJiWU02XCIsXG5cdFwiLi9hci5qc1wiOiBcImpuTzRcIixcblx0XCIuL2F6XCI6IFwiU0Z4V1wiLFxuXHRcIi4vYXouanNcIjogXCJTRnhXXCIsXG5cdFwiLi9iZVwiOiBcIkg4RURcIixcblx0XCIuL2JlLmpzXCI6IFwiSDhFRFwiLFxuXHRcIi4vYmdcIjogXCJoS3JzXCIsXG5cdFwiLi9iZy5qc1wiOiBcImhLcnNcIixcblx0XCIuL2JtXCI6IFwicC9yTFwiLFxuXHRcIi4vYm0uanNcIjogXCJwL3JMXCIsXG5cdFwiLi9iblwiOiBcImtFT2FcIixcblx0XCIuL2JuLmpzXCI6IFwia0VPYVwiLFxuXHRcIi4vYm9cIjogXCIwbW8rXCIsXG5cdFwiLi9iby5qc1wiOiBcIjBtbytcIixcblx0XCIuL2JyXCI6IFwiYUlkZlwiLFxuXHRcIi4vYnIuanNcIjogXCJhSWRmXCIsXG5cdFwiLi9ic1wiOiBcIkpWU0pcIixcblx0XCIuL2JzLmpzXCI6IFwiSlZTSlwiLFxuXHRcIi4vY2FcIjogXCIxeFo0XCIsXG5cdFwiLi9jYS5qc1wiOiBcIjF4WjRcIixcblx0XCIuL2NzXCI6IFwiUEEyclwiLFxuXHRcIi4vY3MuanNcIjogXCJQQTJyXCIsXG5cdFwiLi9jdlwiOiBcIkEreGFcIixcblx0XCIuL2N2LmpzXCI6IFwiQSt4YVwiLFxuXHRcIi4vY3lcIjogXCJsNWVwXCIsXG5cdFwiLi9jeS5qc1wiOiBcImw1ZXBcIixcblx0XCIuL2RhXCI6IFwiRHhRdlwiLFxuXHRcIi4vZGEuanNcIjogXCJEeFF2XCIsXG5cdFwiLi9kZVwiOiBcInRHbFhcIixcblx0XCIuL2RlLWF0XCI6IFwicyt1a1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCJzK3VrXCIsXG5cdFwiLi9kZS1jaFwiOiBcInUzR0lcIixcblx0XCIuL2RlLWNoLmpzXCI6IFwidTNHSVwiLFxuXHRcIi4vZGUuanNcIjogXCJ0R2xYXCIsXG5cdFwiLi9kdlwiOiBcIldZcmpcIixcblx0XCIuL2R2LmpzXCI6IFwiV1lyalwiLFxuXHRcIi4vZWxcIjogXCJqVWVZXCIsXG5cdFwiLi9lbC5qc1wiOiBcImpVZVlcIixcblx0XCIuL2VuLVNHXCI6IFwiemF2RVwiLFxuXHRcIi4vZW4tU0cuanNcIjogXCJ6YXZFXCIsXG5cdFwiLi9lbi1hdVwiOiBcIkRtdmlcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiRG12aVwiLFxuXHRcIi4vZW4tY2FcIjogXCJPSVlpXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIk9JWWlcIixcblx0XCIuL2VuLWdiXCI6IFwiT2FhN1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCJPYWE3XCIsXG5cdFwiLi9lbi1pZVwiOiBcIjRkT3dcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiNGRPd1wiLFxuXHRcIi4vZW4taWxcIjogXCJjek1vXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcImN6TW9cIixcblx0XCIuL2VuLW56XCI6IFwiYjFEeVwiLFxuXHRcIi4vZW4tbnouanNcIjogXCJiMUR5XCIsXG5cdFwiLi9lb1wiOiBcIlpkdW9cIixcblx0XCIuL2VvLmpzXCI6IFwiWmR1b1wiLFxuXHRcIi4vZXNcIjogXCJpWXVMXCIsXG5cdFwiLi9lcy1kb1wiOiBcIkNqelRcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiQ2p6VFwiLFxuXHRcIi4vZXMtdXNcIjogXCJWY2xxXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIlZjbHFcIixcblx0XCIuL2VzLmpzXCI6IFwiaVl1TFwiLFxuXHRcIi4vZXRcIjogXCI3QmpDXCIsXG5cdFwiLi9ldC5qc1wiOiBcIjdCakNcIixcblx0XCIuL2V1XCI6IFwiRC9KTVwiLFxuXHRcIi4vZXUuanNcIjogXCJEL0pNXCIsXG5cdFwiLi9mYVwiOiBcImpmU0NcIixcblx0XCIuL2ZhLmpzXCI6IFwiamZTQ1wiLFxuXHRcIi4vZmlcIjogXCJnZWtCXCIsXG5cdFwiLi9maS5qc1wiOiBcImdla0JcIixcblx0XCIuL2ZvXCI6IFwiQnlGNFwiLFxuXHRcIi4vZm8uanNcIjogXCJCeUY0XCIsXG5cdFwiLi9mclwiOiBcIm55WWNcIixcblx0XCIuL2ZyLWNhXCI6IFwiMmZqblwiLFxuXHRcIi4vZnItY2EuanNcIjogXCIyZmpuXCIsXG5cdFwiLi9mci1jaFwiOiBcIkRra3lcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiRGtreVwiLFxuXHRcIi4vZnIuanNcIjogXCJueVljXCIsXG5cdFwiLi9meVwiOiBcImNSaXhcIixcblx0XCIuL2Z5LmpzXCI6IFwiY1JpeFwiLFxuXHRcIi4vZ2FcIjogXCJVU0N4XCIsXG5cdFwiLi9nYS5qc1wiOiBcIlVTQ3hcIixcblx0XCIuL2dkXCI6IFwiOXJSaVwiLFxuXHRcIi4vZ2QuanNcIjogXCI5clJpXCIsXG5cdFwiLi9nbFwiOiBcImlFRGRcIixcblx0XCIuL2dsLmpzXCI6IFwiaUVEZFwiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCJES3IrXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIkRLcitcIixcblx0XCIuL2d1XCI6IFwiNE1WM1wiLFxuXHRcIi4vZ3UuanNcIjogXCI0TVYzXCIsXG5cdFwiLi9oZVwiOiBcIng2cEhcIixcblx0XCIuL2hlLmpzXCI6IFwieDZwSFwiLFxuXHRcIi4vaGlcIjogXCIzRTFyXCIsXG5cdFwiLi9oaS5qc1wiOiBcIjNFMXJcIixcblx0XCIuL2hyXCI6IFwiUzZsblwiLFxuXHRcIi4vaHIuanNcIjogXCJTNmxuXCIsXG5cdFwiLi9odVwiOiBcIld4UmxcIixcblx0XCIuL2h1LmpzXCI6IFwiV3hSbFwiLFxuXHRcIi4vaHktYW1cIjogXCIxcll5XCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIjFyWXlcIixcblx0XCIuL2lkXCI6IFwiVURoUlwiLFxuXHRcIi4vaWQuanNcIjogXCJVRGhSXCIsXG5cdFwiLi9pc1wiOiBcIkJWZzNcIixcblx0XCIuL2lzLmpzXCI6IFwiQlZnM1wiLFxuXHRcIi4vaXRcIjogXCJicGloXCIsXG5cdFwiLi9pdC1jaFwiOiBcImJ4S1hcIixcblx0XCIuL2l0LWNoLmpzXCI6IFwiYnhLWFwiLFxuXHRcIi4vaXQuanNcIjogXCJicGloXCIsXG5cdFwiLi9qYVwiOiBcIkI1NU5cIixcblx0XCIuL2phLmpzXCI6IFwiQjU1TlwiLFxuXHRcIi4vanZcIjogXCJ0VUN2XCIsXG5cdFwiLi9qdi5qc1wiOiBcInRVQ3ZcIixcblx0XCIuL2thXCI6IFwiSUJ0WlwiLFxuXHRcIi4va2EuanNcIjogXCJJQnRaXCIsXG5cdFwiLi9ra1wiOiBcImJYbTdcIixcblx0XCIuL2trLmpzXCI6IFwiYlhtN1wiLFxuXHRcIi4va21cIjogXCI2QjBZXCIsXG5cdFwiLi9rbS5qc1wiOiBcIjZCMFlcIixcblx0XCIuL2tuXCI6IFwiUHBJd1wiLFxuXHRcIi4va24uanNcIjogXCJQcEl3XCIsXG5cdFwiLi9rb1wiOiBcIkl2aStcIixcblx0XCIuL2tvLmpzXCI6IFwiSXZpK1wiLFxuXHRcIi4va3VcIjogXCJKQ0YvXCIsXG5cdFwiLi9rdS5qc1wiOiBcIkpDRi9cIixcblx0XCIuL2t5XCI6IFwibGdudFwiLFxuXHRcIi4va3kuanNcIjogXCJsZ250XCIsXG5cdFwiLi9sYlwiOiBcIlJBd1FcIixcblx0XCIuL2xiLmpzXCI6IFwiUkF3UVwiLFxuXHRcIi4vbG9cIjogXCJzcDN6XCIsXG5cdFwiLi9sby5qc1wiOiBcInNwM3pcIixcblx0XCIuL2x0XCI6IFwiSnZsV1wiLFxuXHRcIi4vbHQuanNcIjogXCJKdmxXXCIsXG5cdFwiLi9sdlwiOiBcInVYd0lcIixcblx0XCIuL2x2LmpzXCI6IFwidVh3SVwiLFxuXHRcIi4vbWVcIjogXCJLVHowXCIsXG5cdFwiLi9tZS5qc1wiOiBcIktUejBcIixcblx0XCIuL21pXCI6IFwiYUlzblwiLFxuXHRcIi4vbWkuanNcIjogXCJhSXNuXCIsXG5cdFwiLi9ta1wiOiBcImFRa1VcIixcblx0XCIuL21rLmpzXCI6IFwiYVFrVVwiLFxuXHRcIi4vbWxcIjogXCJBdnZZXCIsXG5cdFwiLi9tbC5qc1wiOiBcIkF2dllcIixcblx0XCIuL21uXCI6IFwibFl0UVwiLFxuXHRcIi4vbW4uanNcIjogXCJsWXRRXCIsXG5cdFwiLi9tclwiOiBcIk9iMFpcIixcblx0XCIuL21yLmpzXCI6IFwiT2IwWlwiLFxuXHRcIi4vbXNcIjogXCI2K1FCXCIsXG5cdFwiLi9tcy1teVwiOiBcIlpBTVBcIixcblx0XCIuL21zLW15LmpzXCI6IFwiWkFNUFwiLFxuXHRcIi4vbXMuanNcIjogXCI2K1FCXCIsXG5cdFwiLi9tdFwiOiBcIkcwVXlcIixcblx0XCIuL210LmpzXCI6IFwiRzBVeVwiLFxuXHRcIi4vbXlcIjogXCJob25GXCIsXG5cdFwiLi9teS5qc1wiOiBcImhvbkZcIixcblx0XCIuL25iXCI6IFwiYk9NdFwiLFxuXHRcIi4vbmIuanNcIjogXCJiT010XCIsXG5cdFwiLi9uZVwiOiBcIk9qa1RcIixcblx0XCIuL25lLmpzXCI6IFwiT2prVFwiLFxuXHRcIi4vbmxcIjogXCIrczBnXCIsXG5cdFwiLi9ubC1iZVwiOiBcIjJ5a3ZcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiMnlrdlwiLFxuXHRcIi4vbmwuanNcIjogXCIrczBnXCIsXG5cdFwiLi9ublwiOiBcInVFeWVcIixcblx0XCIuL25uLmpzXCI6IFwidUV5ZVwiLFxuXHRcIi4vcGEtaW5cIjogXCI4LytSXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIjgvK1JcIixcblx0XCIuL3BsXCI6IFwialZkQ1wiLFxuXHRcIi4vcGwuanNcIjogXCJqVmRDXCIsXG5cdFwiLi9wdFwiOiBcIjhtQkRcIixcblx0XCIuL3B0LWJyXCI6IFwiMHRSa1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIwdFJrXCIsXG5cdFwiLi9wdC5qc1wiOiBcIjhtQkRcIixcblx0XCIuL3JvXCI6IFwibHl4b1wiLFxuXHRcIi4vcm8uanNcIjogXCJseXhvXCIsXG5cdFwiLi9ydVwiOiBcImxYem9cIixcblx0XCIuL3J1LmpzXCI6IFwibFh6b1wiLFxuXHRcIi4vc2RcIjogXCJaNFFNXCIsXG5cdFwiLi9zZC5qc1wiOiBcIlo0UU1cIixcblx0XCIuL3NlXCI6IFwiLy85d1wiLFxuXHRcIi4vc2UuanNcIjogXCIvLzl3XCIsXG5cdFwiLi9zaVwiOiBcIjdhVjlcIixcblx0XCIuL3NpLmpzXCI6IFwiN2FWOVwiLFxuXHRcIi4vc2tcIjogXCJlK2FlXCIsXG5cdFwiLi9zay5qc1wiOiBcImUrYWVcIixcblx0XCIuL3NsXCI6IFwiZ1ZWS1wiLFxuXHRcIi4vc2wuanNcIjogXCJnVlZLXCIsXG5cdFwiLi9zcVwiOiBcInlQTXNcIixcblx0XCIuL3NxLmpzXCI6IFwieVBNc1wiLFxuXHRcIi4vc3JcIjogXCJ6eDZTXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiRStsVlwiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIkUrbFZcIixcblx0XCIuL3NyLmpzXCI6IFwieng2U1wiLFxuXHRcIi4vc3NcIjogXCJVcjFEXCIsXG5cdFwiLi9zcy5qc1wiOiBcIlVyMURcIixcblx0XCIuL3N2XCI6IFwiWDcwOVwiLFxuXHRcIi4vc3YuanNcIjogXCJYNzA5XCIsXG5cdFwiLi9zd1wiOiBcImROd0FcIixcblx0XCIuL3N3LmpzXCI6IFwiZE53QVwiLFxuXHRcIi4vdGFcIjogXCJQZVVXXCIsXG5cdFwiLi90YS5qc1wiOiBcIlBlVVdcIixcblx0XCIuL3RlXCI6IFwiWEx2TlwiLFxuXHRcIi4vdGUuanNcIjogXCJYTHZOXCIsXG5cdFwiLi90ZXRcIjogXCJWMng5XCIsXG5cdFwiLi90ZXQuanNcIjogXCJWMng5XCIsXG5cdFwiLi90Z1wiOiBcIk94djZcIixcblx0XCIuL3RnLmpzXCI6IFwiT3h2NlwiLFxuXHRcIi4vdGhcIjogXCJFT2dXXCIsXG5cdFwiLi90aC5qc1wiOiBcIkVPZ1dcIixcblx0XCIuL3RsLXBoXCI6IFwiRHppMFwiLFxuXHRcIi4vdGwtcGguanNcIjogXCJEemkwXCIsXG5cdFwiLi90bGhcIjogXCJ6M1ZkXCIsXG5cdFwiLi90bGguanNcIjogXCJ6M1ZkXCIsXG5cdFwiLi90clwiOiBcIkRvSHJcIixcblx0XCIuL3RyLmpzXCI6IFwiRG9IclwiLFxuXHRcIi4vdHpsXCI6IFwiejFGQ1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiejFGQ1wiLFxuXHRcIi4vdHptXCI6IFwid1FrOVwiLFxuXHRcIi4vdHptLWxhdG5cIjogXCJ0VDNKXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcInRUM0pcIixcblx0XCIuL3R6bS5qc1wiOiBcIndRazlcIixcblx0XCIuL3VnLWNuXCI6IFwiWVJleFwiLFxuXHRcIi4vdWctY24uanNcIjogXCJZUmV4XCIsXG5cdFwiLi91a1wiOiBcInJhTHJcIixcblx0XCIuL3VrLmpzXCI6IFwicmFMclwiLFxuXHRcIi4vdXJcIjogXCJVcFFXXCIsXG5cdFwiLi91ci5qc1wiOiBcIlVwUVdcIixcblx0XCIuL3V6XCI6IFwiTG94b1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIkFRNjhcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCJBUTY4XCIsXG5cdFwiLi91ei5qc1wiOiBcIkxveG9cIixcblx0XCIuL3ZpXCI6IFwiS1NGOFwiLFxuXHRcIi4vdmkuanNcIjogXCJLU0Y4XCIsXG5cdFwiLi94LXBzZXVkb1wiOiBcIi9YNXZcIixcblx0XCIuL3gtcHNldWRvLmpzXCI6IFwiL1g1dlwiLFxuXHRcIi4veW9cIjogXCJmelBnXCIsXG5cdFwiLi95by5qc1wiOiBcImZ6UGdcIixcblx0XCIuL3poLWNuXCI6IFwiWERwZ1wiLFxuXHRcIi4vemgtY24uanNcIjogXCJYRHBnXCIsXG5cdFwiLi96aC1oa1wiOiBcIlNhdE9cIixcblx0XCIuL3poLWhrLmpzXCI6IFwiU2F0T1wiLFxuXHRcIi4vemgtdHdcIjogXCJrT3BOXCIsXG5cdFwiLi96aC10dy5qc1wiOiBcImtPcE5cIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiUm5oWlwiOyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5cbmNvbnN0IGdyaWR6ID0gYW5ndWxhci5tb2R1bGUoZ3JpZHpNb2R1bGUpXG5cbmdyaWR6LmRpcmVjdGl2ZSgnYWdOZXdCdXR0b24nLCBbJyRjb21waWxlJywgJGNvbXBpbGUgPT4gKHtcbiAgcmVzdHJpY3Q6ICdBJyxcblxuICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgIGNvbnN0IHRleHQgPSBhbmd1bGFyLmVsZW1lbnQoJGNvbXBpbGUoJzxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiIHVpYi10b29sdGlwPVwiQ3JlYXRlIG5ld1wiPjwvaT4gJykoc2NvcGUpKVxuICAgIHJldHVybiBlbGVtZW50LmFwcGVuZCh0ZXh0KVxuICB9XG59KVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5pbXBvcnQgeyBpc0ZhbHN5IH0gZnJvbSAnLi4vLi4vdXRpbHMvaXNGYWxzeSdcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGZvcm1zTW9kdWxlKVxuLy8gVmFsaWRhdGVzIHRleHQgYXJlYSB0byBoYXZlIG5vdCBtb3JlIHRoZW4gc3BlY2lmaWVkIG51bWJlciBvZiBsaW5lc1xuYXBwLmRpcmVjdGl2ZSgnYWdNYXhMaW5lcycsIFsnJHBhcnNlJywgKCRwYXJzZSkgPT4gKHtcbiAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICByZXN0cmljdDogJ0EnLFxuXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBuZ01vZGVsQ3RybCkge1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlID8gdmFsdWUudHJpbSgpIDogdmFsdWVcbiAgICAgIC8vIFRha2VzIHZhbHVlIG9mIGBhdHRycy5hZ01heExpbmVzYCBhbmQgbG9va3MgZm9yIHRoaXMgbmFtZSBpbiBzY29wZSBhbmQgdGFrZXMgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eVxuICAgICAgY29uc3QgbWF4TGluZXMgPSAkcGFyc2UoYXR0cnMuYWdNYXhMaW5lcykoc2NvcGUpXG4gICAgICBjb25zdCBudW1MaW5lcyA9ICh2YWx1ZSB8fCAnJykuc3BsaXQoJ1xcbicpLmxlbmd0aFxuICAgICAgY29uc3QgdmFsaWQgPSBpc0ZhbHN5KG1heExpbmVzKSB8fCAobnVtTGluZXMgPD0gbWF4TGluZXMpXG4gICAgICBuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ21heGxpbmVzJywgdmFsaWQpXG4gICAgICBpZiAodmFsaWQpIHsgcmV0dXJuIHZhbHVlIH0gZWxzZSB7IHJldHVybiB1bmRlZmluZWQgfVxuICAgIH1cblxuICAgIG5nTW9kZWxDdHJsLiRwYXJzZXJzLnVuc2hpZnQodmFsaWRhdG9yKVxuICAgIG5nTW9kZWxDdHJsLiRmb3JtYXR0ZXJzLnB1c2godmFsaWRhdG9yKVxuXG4gICAgcmV0dXJuIHNjb3BlLiR3YXRjaChhdHRycy5hZ01heExpbmVzLCAoKSA9PiB2YWxpZGF0b3IobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSkpXG4gIH1cbn0pXG5cbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uL2dyaWR6TW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgZ3JpZHogPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuLy8gSXRlcmF0ZXMgdGhyb3VnaCBhbGwgY29sdW1ucyBhbmQgcmVwbGFjZXMgZm9ybWF0dGVycyBwbGFjZWhvbGRlcnNcbi8vIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgbWV0aG9kcy5cbmdyaWR6LnZhbHVlKCdBcHBseUZvcm1hdHRlcnNTZXJ2JywgZnVuY3Rpb24oY29sTW9kZWwsIGZvcm1hdHRlcnMpIHtcbiAgaWYgKGZvcm1hdHRlcnMgPT0gbnVsbCkgeyBmb3JtYXR0ZXJzID0ge30gfVxuICByZXR1cm4gXy5tYXAoY29sTW9kZWwsIGZ1bmN0aW9uKGNvbHVtbikge1xuICAgIGlmICghYW5ndWxhci5pc1N0cmluZyhjb2x1bW4uZm9ybWF0dGVyKSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1tjb2x1bW4uZm9ybWF0dGVyXVxuICAgIGlmICghXy5pc05pbChmb3JtYXR0ZXIpKSB7IHJldHVybiBjb2x1bW4uZm9ybWF0dGVyID0gZm9ybWF0dGVyIH1cbiAgfSlcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uL2dyaWR6TW9kdWxlJ1xuXG5jb25zdCBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKGdyaWR6TW9kdWxlKVxuXG4vLyBHZW5lcmF0ZXMgeGxzIGV4cG9ydCBidXR0b24gZm9yIHRoZSBnaXZlbiBncmlkLlxuLy8gVXNhZ2U6XG4vLyAgIDxhIGhyZWY9XCJcIiBhZy1ncmlkLXhscy1leHBvcnQ9XCJ1c2Vyc0dyaWRcIj5cbi8vICAgICA8aSBjbGFzcz1cImZhIGZhLWRvd25sb2FkXCI+PC9pPiBFeHBvcnQgdG8gWExTXG4vLyAgIDwvYT5cbi8vICAgSWYgbm90aGluZyBpcyBzcGVjaWZpZWQgdGFibGUgaWNvbiB3aWxsIGJlIGFkZGVkXG4vLyAgIDxhIGhyZWY9XCJcIiBhZy1ncmlkLXhscy1leHBvcnQ9XCJ1c2Vyc0dyaWRcIj48L2E+XG5ncmlkei5kaXJlY3RpdmUoJ2FnR3JpZFhsc0V4cG9ydCcsIFtcbiAgJyR3aW5kb3cnLCAnTm90aWZpY2F0aW9uRGlhbG9nU2VydicsICckY29tcGlsZScsICgkd2luZG93LCBOb3RpZmljYXRpb25EaWFsb2dTZXJ2LCAkY29tcGlsZSkgPT4gKHtcbiAgICByZXN0cmljdDogJ0EnLFxuXG4gICAgbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAvLyBBZGQgdGFibGUgc3ltYm9sIGlmIG5vIGNoaWxkIGlzIHNwZWNpZmllZFxuICAgICAgaWYgKCFlbGVtZW50WzBdLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgY29uc3QgZXhwID0gYW5ndWxhci5lbGVtZW50KCRjb21waWxlKCc8aSBjbGFzcz1cImZhIGZhLXRhYmxlXCIgdWliLXRvb2x0aXA9XCJFeHBvcnQgdG8gRXhjZWxcIj48L2k+Jykoc2NvcGUpKVxuICAgICAgICBlbGVtZW50LmFwcGVuZChleHApXG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgZ3JpZCA9IHNjb3BlLiRncmlkXG5cbiAgICAgICAgaWYgKGdyaWQuZ2V0U2VsZWN0ZWRSb3dJZHMoKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgLy8gaWYgYnJvd3NlciBpcyBJRSB0aGVuIG9wZW4gbmV3IHdpbmRvdyBhbmQgc2hvdyBTYXZlQXMgZGlhbG9nLCBlbHNlIHVzZSBkYXRhVXJpIGFwcHJvYWNoXG4gICAgICAgICAgaWYgKCgkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRSAnKSA+IDApIHx8ICEhJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpIHtcbiAgICAgICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJRlJBTUUnKVxuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKVxuICAgICAgICAgICAgaWZyYW1lID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgaWZyYW1lLmNvbnRlbnREb2N1bWVudFxuICAgICAgICAgICAgY29uc3QgY3N2RGF0YSA9ICdzZXA9fFxcclxcbicgKyBncmlkLmdldENzdkRhdGEoKVxuICAgICAgICAgICAgaWZyYW1lLmRvY3VtZW50Lm9wZW4oJ3RleHQvaHRtbCcsICdyZXBsYWNlJylcbiAgICAgICAgICAgIGlmcmFtZS5kb2N1bWVudC53cml0ZShjc3ZEYXRhKVxuICAgICAgICAgICAgaWZyYW1lLmRvY3VtZW50LmNsb3NlKClcbiAgICAgICAgICAgIGlmcmFtZS5mb2N1cygpXG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdTYXZlQXMnLCB0cnVlLCAnZG93bmxvYWQuY3N2JylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YVVyaSA9IGdyaWQuZ2V0WGxzRGF0YVVyaSgpXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSBkYXRhVXJpXG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnZG93bmxvYWQueGxzJylcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcbiAgICAgICAgICAgIGNvbnN0IGNsaWNrX2V2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJylcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIGV2ZW50XG4gICAgICAgICAgICBjbGlja19ldi5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgdHJ1ZSlcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAgICAgICAgICByZXR1cm4gbGluay5kaXNwYXRjaEV2ZW50KGNsaWNrX2V2KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gTm90aWZpY2F0aW9uRGlhbG9nU2Vydi5vcGVuKCdQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IG9uZSByb3cuJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5dKVxuIiwiLyogQG5nSW5qZWN0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Q3RybCB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgUmVzb3VyY2UsIFNpbmdsZVBhZ2VDcnVkQ3RybE1peGluLCBNYXNzVXBkYXRlTWl4aW4sIHBhdGhXaXRoQ29udGV4dCkge1xuICAgICRzY29wZS5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIHVybDogcGF0aFdpdGhDb250ZXh0KFwiL29yZy9saXN0P2Zvcm1hdD1qc29uXCIpLFxuICAgICAgY29sTW9kZWw6IHRoaXMuY29sTW9kZWwoKSxcbiAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgc2hyaW5rVG9GaXQ6IHRydWUsIC8vIG1ha2VzIGNvbHVtbnMgZml0IHRvIHdpZHRoXG4gICAgICBzb3J0bmFtZTogXCJudW1cIixcbiAgICAgIHNvcnRvcmRlcjogXCJhc2NcIixcblxuICAgICAgcm93TnVtOiA1LFxuICAgICAgcm93TGlzdDogWzUsIDEwLCAyMF1cbiAgICB9O1xuXG4gICAgU2luZ2xlUGFnZUNydWRDdHJsTWl4aW4oJHNjb3BlLCB7XG4gICAgICBSZXNvdXJjZSxcbiAgICAgIHJlc291cmNlUGF0aDogXCIvb3JnXCIsXG4gICAgICBncmlkTmFtZTogXCJvcmdHcmlkXCJcbiAgICB9XG4gICAgKTtcblxuICAgIE1hc3NVcGRhdGVNaXhpbigkc2NvcGUsIHtcbiAgICAgIHRlbXBsYXRlVXJsOiBcIi90ZW1wbGF0ZXMvb3JnL21hc3NVcGRhdGVGb3JtLmh0bWxcIixcbiAgICAgIGNvbnRyb2xsZXI6IFwib3JnLk1hc3NVcGRhdGVGb3JtQ3RybFwiLFxuICAgICAgZ3JpZE5hbWU6IFwib3JnR3JpZFwiXG4gICAgfVxuICAgICk7XG4gIH1cblxuICBjb2xNb2RlbCgpIHtcbiAgICBjb25zdCBzaG93QWN0aW9uTGluayA9IChjZWxsVmFsLCBvcHRpb25zLCByb3dkYXRhKSA9PiBgXFxcbjxhIGhyZWY9XCIjLyR7cm93ZGF0YS5pZH1cIj4ke2NlbGxWYWx9PC9hPlxcXG5gO1xuXG4gICAgY29uc3Qgc2hvd0xpbmsgPSBmdW5jdGlvbihjZWxsVmFsLCBvcHRpb25zLCByb3dkYXRhKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYFxcXG48YSBocmVmPVwiIy8ke3Jvd2RhdGEuaWR9XCI+JHtjZWxsVmFsfTwvYT5cXFxuYDtcbiAgICAgIHJldHVybiB3aW5kb3cuY29sdW1uQWxpZ25lcihcImxpbmtcIiwgY29udGVudCk7XG4gICAgfTtcblxuICAgIHJldHVybiBbXG4gICAgICB7IG5hbWU6IFwiaWRcIiwgbGFiZWw6IFwiSURcIiwgd2lkdGg6IDMwLCBmaXhlZDogdHJ1ZSwgZm9ybWF0dGVyOiBzaG93QWN0aW9uTGluayB9LFxuICAgICAgeyBuYW1lOiBcIm5hbWVcIiwgbGFiZWw6IFwiTmFtZSAocmlnaHQgYWxpZ25lZClcIiwgd2lkdGg6IDE1MCwgZml4ZWQ6IHRydWUsIGZvcm1hdHRlcjogc2hvd0xpbmsgfSxcbiAgICAgIHsgbmFtZTogXCJuYW1lXCIsIGxhYmVsOiBcIk5hbWVcIiwgd2lkdGg6IDEwMCwgZml4ZWQ6IHRydWUsIGZvcm1hdHRlcjogc2hvd0FjdGlvbkxpbmsgfSxcbiAgICAgIHsgbmFtZTogXCJudW1cIiwgbGFiZWw6IFwiTnVtXCIsIHdpZHRoOiA3MCB9LFxuICAgICAgeyBuYW1lOiBcImFkZHJlc3NEYXRlXCIsIGxhYmVsOiBcIkFkZHJlc3MgZGF0ZVwiLCB3aWR0aDogMTAwIH0sXG4gICAgICB7IG5hbWU6IFwidGltZVpvbmVcIiwgbGFiZWw6IFwiVGltZSBab25lXCIsIHdpZHRoOiAxMDAgfVxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgY29tbW9uTW9kdWxlIGZyb20gJy4uL2NvbW1vbk1vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKS5kaXJlY3RpdmUoJ2FkZEVtcHR5T3B0aW9uJywgKCkgPT4gKHtcbiAgcmVzdHJpY3Q6ICdBJyxcbiAgc2NvcGU6IHsgYWRkRW1wdHlPcHRpb246ICc9JyB9LFxuXG4gIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgY29uc3QgZW1wdHlPcHRpb24gPSAhXy5pc05pbChhdHRycy5lbXB0eU9wdGlvbikgPyBKU09OLnBhcnNlKGF0dHJzLmVtcHR5T3B0aW9uLnJlcGxhY2UoL1snXS9nLCAnXCInKSkgOiB7IGlkOiAnJywgbmFtZTogJycgfVxuICAgIGVsZW1lbnQucHJlcGVuZChhbmd1bGFyLmVsZW1lbnQoYDxvcHRpb24gdmFsdWU9Jyc+JHtlbXB0eU9wdGlvbi5uYW1lfTwvb3B0aW9uPmApKVxuICAgIGlmICghXy5pc05pbChzY29wZS5hZGRFbXB0eU9wdGlvbikgJiYgKHNjb3BlLmFkZEVtcHR5T3B0aW9uLmxlbmd0aCA+IDApKSB7XG4gICAgICBpZiAoIV8uZmluZChzY29wZS5hZGRFbXB0eU9wdGlvbiwgeyBpZDogZW1wdHlPcHRpb24uaWQgfSkpIHsgcmV0dXJuIHNjb3BlLmFkZEVtcHR5T3B0aW9uLnVuc2hpZnQoZW1wdHlPcHRpb24pIH1cbiAgICB9XG4gIH1cbn0pKVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi9jb21tb25Nb2R1bGUnXG5cbi8vIEZpbHRlciBmb3IgYm9vbGVhbiB2YWx1ZXMsIHByZXNlbnRzICfinJMnIG9yICfinJgnXG5hbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpLmZpbHRlcignY2hlY2tNYXJrJywgKCkgPT4gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT0gbnVsbCkgeyBvcHRpb25zID0ge30gfVxuICBpZiAoaW5wdXQpIHtcbiAgICBpZiAob3B0aW9ucy5oaWRlVHJ1dGgpIHsgcmV0dXJuICcnIH1cbiAgICByZXR1cm4gJ1xcdTI3MTMnXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wdGlvbnMuaGlkZUZhbHNlKSB7IHJldHVybiAnJyB9XG4gICAgcmV0dXJuICdcXHUyNzE4J1xuICB9XG59KVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJyAvLyB1c2VzIGJhYmVsIHBsdWdpbiB0byBvbmx5IHVzZSB3aGF0IGlzIHJlZmVyZW5jZWRcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkoc3RyKSB7XG4gIHJldHVybiBfLmlzTmlsKHN0cikgfHwgKF8uaXNTdHJpbmcoc3RyKSAmJiBfLmlzRW1wdHkoc3RyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmFsc3kodmFsdWUpIHtcbiAgaWYgKF8uaXNOYU4odmFsdWUpKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKF8uaXNOaWwodmFsdWUpKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKF8uaXNTdHJpbmcodmFsdWUpICYmIF8uaXNFbXB0eSh2YWx1ZSkpIHsgcmV0dXJuIHRydWUgfVxuICBpZiAodmFsdWUgPT09IGZhbHNlKSB7IHJldHVybiB0cnVlIH1cbiAgcmV0dXJuIGZhbHNlXG59XG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGFnU2VsZWN0TW9kdWxlIGZyb20gJy4vYWdTZWxlY3QyTW9kdWxlJ1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoYWdTZWxlY3RNb2R1bGUpXG5cbmNsYXNzIFNlbGVjdDJPcHRpb25zQ2xhc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucywgZGF0YU9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHsgb3B0aW9ucyA9IHt9IH1cbiAgICAgIGlmIChkYXRhT3B0aW9ucyA9PSBudWxsKSB7IGRhdGFPcHRpb25zID0ge30gfVxuICAgICAgaWYgKCFvcHRpb25zLmFqYXgpIHsgb3B0aW9ucy5hamF4ID0ge30gfVxuXG4gICAgICAvLyBidWlsZCBkZWZhdWx0IG9wdGlvbnNcbiAgICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgICB3aWR0aDogJ2VsZW1lbnQnLFxuICAgICAgICBpbml0U2VsZWN0aW9uOiBhbmd1bGFyLm5vb3AsXG5cbiAgICAgICAgYWpheDoge1xuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgdXJsOiBhbmd1bGFyLm5vb3AsIC8vIGR1bW15IHVybCwgbXVzdCBiZSBvdmVycmlkZGVuXG5cbiAgICAgICAgICBkYXRhKHRlcm0sIHBhZ2UpIHtcbiAgICAgICAgICAgIGlmIChwYWdlID09IG51bGwpIHsgcGFnZSA9IDEgfVxuICAgICAgICAgICAgY29uc3QgZGF0YURlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAvLyBzZWFyY2ggdGVybSAocXVlcnkgcGFyYW1zKVxuICAgICAgICAgICAgICBxOiB0ZXJtLFxuXG4gICAgICAgICAgICAgIC8vIHNvcnRpbmcgYW5kIHBhZ2luYXRpb25cbiAgICAgICAgICAgICAgc29ydDogJ2lkJyxcbiAgICAgICAgICAgICAgb3JkZXI6ICdhc2MnLFxuICAgICAgICAgICAgICBtYXg6IDIwLFxuICAgICAgICAgICAgICBwYWdlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmV4dGVuZChkYXRhRGVmYXVsdHMsIGRhdGFPcHRpb25zKVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICByZXN1bHRzKHJlc3VsdCwgcGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcmVzdWx0czogcmVzdWx0LnJvd3MsXG4gICAgICAgICAgICAgIG1vcmU6IHBhZ2UgPCByZXN1bHQudG90YWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZm9ybWF0dGVycyBmb3IgcmVzdWx0IGFuZCBzZWxlY3Rpb25cbiAgICAgICAgZm9ybWF0UmVzdWx0KHJlY29yZCkgeyByZXR1cm4gcmVjb3JkLm5hbWUgfSxcbiAgICAgICAgZm9ybWF0U2VsZWN0aW9uKHJlY29yZCkgeyByZXR1cm4gcmVjb3JkLm5hbWUgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhamF4ID0gYW5ndWxhci5leHRlbmQoZGVmYXVsdHMuYWpheCwgb3B0aW9ucy5hamF4KVxuICAgICAgb3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKVxuICAgICAgb3B0aW9ucy5hamF4ID0gYWpheFxuICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG4gIH1cbn1cblxuYXBwLnNlcnZpY2UoJ1NlbGVjdDJPcHRpb25zJywgU2VsZWN0Mk9wdGlvbnNDbGFzcylcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCcgLy8gYmFiZWwgcGx1Z2luIHdpbGwgb25seSB1c2Ugd2hhdCBpcyByZWZlcmVuY2VkXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwRGlmZihvbGRWYWwsIG5ld1ZhbCwgYWxsb3dlZCwgcmVxRmllbGRzKSB7XG4gIHZhciBkaWZmUmVjdXJzaXZlID0gZnVuY3Rpb24ob2xkVmFsLCBuZXdWYWwsIGFsbG93ZWQsIHJlcUZpZWxkcykge1xuICAgIGxldCBhcmdzXG4gICAgbGV0IGRpZmYgPSB7fVxuXG4gICAgaWYgKCFfLmlzTmlsKHJlcUZpZWxkcykgJiYgKHJlcUZpZWxkcy5sZW5ndGggPiAwKSkge1xuICAgICAgYXJncyA9IFtdXG4gICAgICBhcmdzLnB1c2gobmV3VmFsKVxuICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KHJlcUZpZWxkcylcbiAgICAgIGRpZmYgPSBkZWVwUGljay5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cblxuICAgIGlmICghXy5pc05pbChhbGxvd2VkKSAmJiAoYWxsb3dlZC5sZW5ndGggPiAwKSkge1xuICAgICAgYXJncyA9IFtdXG4gICAgICBhcmdzLnB1c2gobmV3VmFsKVxuICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KGFsbG93ZWQpXG4gICAgICBuZXdWYWwgPSBkZWVwUGljay5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cblxuICAgIF8uZm9yRWFjaChuZXdWYWwsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICAgIGlmICgoIV8uaXNOaWwob2xkVmFsKSAmJiBfLmlzRXF1YWwodiwgb2xkVmFsW2tdKSkgfHwgKGsgPT09ICckY2FjaGVkRGF0YScpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmV0dXJuIGRpZmZba10gPSBfLmlzT2JqZWN0KHYpID8gZGlmZlJlY3Vyc2l2ZShvbGRWYWxba10sIHYpIDogbmV3VmFsW2tdXG4gICAgfSlcbiAgICByZXR1cm4gZGlmZlxuICB9XG5cbiAgaWYgKGFsbG93ZWQgPT0gbnVsbCkgeyBhbGxvd2VkID0gW10gfVxuICBpZiAocmVxRmllbGRzID09IG51bGwpIHsgcmVxRmllbGRzID0gW10gfVxuICByZXR1cm4gZGlmZlJlY3Vyc2l2ZShvbGRWYWwsIG5ld1ZhbCwgYWxsb3dlZCwgcmVxRmllbGRzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcFBpY2sob2JqLCAuLi5rZXlzKSB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBPYmplY3QoKVxuXG4gIGZvciAoY29uc3QgcGF0aCBvZiBBcnJheS5mcm9tKGtleXMpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXREZWVwKG9iaiwgcGF0aClcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkgeyBzZXREZWVwKHJlc3VsdCwgcGF0aCwgdmFsdWUpIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gZ2V0IHRoZSB2YWx1ZSBvZiBhIG5lc3RlZCBwcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXAob2JqLCBwYXRoKSB7XG4gIGNvbnN0IGtleXMgPSBwYXRoLnNwbGl0KCcuJylcblxuICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKGtleXMpKSB7XG4gICAgb2JqID0gb2JqW2tleV1cbiAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIH1cbiAgfVxuXG4gIHJldHVybiBvYmpcbn1cblxuLy8gc2V0IHRoZSB2YWx1ZSBvZiBhIG5lc3RlZCBwcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZXAob2JqLCBwYXRoLCB2YWx1ZSkge1xuICBjb25zdCBrZXlzID0gcGF0aC5zcGxpdCgnLicpXG4gIGxldCBpID0gMFxuICBsZXQgbiA9IGtleXMubGVuZ3RoXG5cbiAgbi0tXG4gIHdoaWxlIChpIDwgbikge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaSsrXVxuICAgIG9iaiA9IChvYmpba2V5XSA9IChfLmlzT2JqZWN0KG9ialtrZXldKSA/IG9ialtrZXldIDoge30pKVxuICB9XG5cbiAgcmV0dXJuIG9ialtrZXlzW2ldXSA9IHZhbHVlXG59XG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4vZ3JpZHpNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbnZhciBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKGdyaWR6TW9kdWxlKVxuXG5ncmlkei5jb250cm9sbGVyKCdncmlkUGFnZXJDdHJsTWl4aW4nLCBbXG4gICckbG9nJywgJyRzY29wZScsICckcGFyc2UnLCAnJGxvY2F0aW9uJywgJyRxJywgJ2dyaWROYW1lJywgJ2N1cnJlbnRJZCcsICdwYXRoJyxcbiAgZnVuY3Rpb24oJGxvZywgJHNjb3BlLCAkcGFyc2UsICRsb2NhdGlvbiwgJHEsIGdyaWROYW1lLCBjdXJyZW50SWQsIHBhdGgpIHtcbiAgICBjb25zdCBjdXJySWRHZXR0ZXIgPSAkcGFyc2UoY3VycmVudElkKVxuICAgIGNvbnN0IGN1cnJJZFNldHRlciA9IGN1cnJJZEdldHRlci5hc3NpZ25cblxuICAgIC8vIHdhdGNoIGZvciB0aGUgY3VycmVudCBpZCBjaGFuZ2VzXG4gICAgJHNjb3BlLiR3YXRjaChjdXJyZW50SWQsIGZ1bmN0aW9uKGlkLCBvbGRJZCkge1xuICAgICAgaWYgKF8uaXNOaWwoaWQpKSB7IHJldHVybiB9XG4gICAgICBpZiAoaWQgPT09IG9sZElkKSB7IHJldHVybiB9XG5cbiAgICAgIHJldHVybiAkbG9jYXRpb24ucGF0aChwYXRoLnJlcGxhY2UoJzppZCcsIGlkKSlcbiAgICB9KVxuXG4gICAgLy8gcmV0cmlldmUgdGhlIGdyaWRcbiAgICBjb25zdCBnZXRHcmlkID0gKCkgPT4gJHBhcnNlKGdyaWROYW1lKSgkc2NvcGUpXG5cbiAgICAvLyByZXRyaWV2ZSByb3cgaWRzIG9uIHRoZSBjdXJyZW50IGdyaWQgdmlld1xuICAgIGNvbnN0IGdldEdyaWRJZHMgPSAoKSA9PiBnZXRHcmlkKCkuZ2V0SWRzKClcblxuICAgIC8vIGxvYWQgdGhlIHByZXZpb3VzIHBhZ2UgYW5kIHlpZWxkcyByb3cgaWRzXG4gICAgY29uc3QgcHJldkdyaWRQYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBkZWZlcnJlZCA9ICRxLmRlZmVyKClcblxuICAgICAgY29uc3QgcHJvbWlzZSA9IGdldEdyaWQoKS5wcmV2UGFnZSgpXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGlkcyA9IGdldEdyaWRJZHMoKVxuICAgICAgICAkbG9nLmRlYnVnKCdbYWdHcmlkXSBwcmV2aW91cyBwYWdlIHdhcyBsb2FkZWQnLCBpZHMpXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGlkcylcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuXG4gICAgLy8gbG9hZCB0aGUgbmV4dCBwYWdlIGFuZCB5aWVsZHMgbmV3IGlkc1xuICAgIGNvbnN0IG5leHRHcmlkUGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgZGVmZXJyZWQgPSAkcS5kZWZlcigpXG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSBnZXRHcmlkKCkubmV4dFBhZ2UoKVxuICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBpZHMgPSBnZXRHcmlkSWRzKClcbiAgICAgICAgJGxvZy5kZWJ1ZygnW2FnR3JpZF0gbmV4dCBwYWdlIHdhcyBsb2FkZWQnLCBpZHMpXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGlkcylcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IHN0YXRlXG4gICAgY29uc3QgZ2V0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgaWRzID0gZ2V0R3JpZElkcygpXG4gICAgICByZXR1cm4gW2lkcywgaWRzLmluZGV4T2YoY3VycklkR2V0dGVyKCRzY29wZSkudG9TdHJpbmcoKSldXG4gICAgfVxuXG4gICAgdGhpcy5nb1RvID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgY29uc3QgW2lkcywgaW5keF0gPSBBcnJheS5mcm9tKGdldEN1cnJlbnQoKSlcbiAgICAgIHJldHVybiBjdXJySWRTZXR0ZXIoJHNjb3BlLCBpZHNbaW5kZXhdKVxuICAgIH1cblxuICAgIHRoaXMuZ2V0SW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGlkcyA9IGdldEdyaWRJZHMoKVxuICAgICAgcmV0dXJuIGlkcy5pbmRleE9mKGN1cnJJZEdldHRlcigkc2NvcGUpLnRvU3RyaW5nKCkpXG4gICAgfVxuXG4gICAgdGhpcy5nZXRJZHMgPSAoKSA9PiBnZXRHcmlkSWRzKClcblxuICAgIC8vIHJldHVybiB0cnVlIHdoZW4gYSBncmlkIGluIHRoZSBiYWNrZ3JvdW5kIGlzIGxvYWRlZFxuICAgIC8vIGFuZCB0aGUgcGFnZXIgY2FuIGJlIGRpc3BsYXllZFxuICAgIHRoaXMuc2hvdyA9ICgpID0+ICFfLmlzTmlsKGdldEdyaWQoKSlcblxuICAgIC8vIHJldHVybiB0cnVlIHdoZW4gdGhlIGN1cnJlbnQgcm93IGlzIG5vdCB0aGUgZmlyc3Qgb25lXG4gICAgdGhpcy5oYXNQcmV2Um93ID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBbaWRzLCBpbmR4XSA9IEFycmF5LmZyb20oZ2V0Q3VycmVudCgpKVxuXG4gICAgICBpZiAoIWdldEdyaWQoKS5pc0ZpcnN0UGFnZSgpKSB7IHJldHVybiB0cnVlIH1cbiAgICAgIHJldHVybiBpbmR4ICE9PSAwXG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHRydWUgd2hlbiB0aGUgY3VycmVudCByb3cgaXMgbm90IHRoZSBsYXN0IG9uZVxuICAgIHRoaXMuaGFzTmV4dFJvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgW2lkcywgaW5keF0gPSBBcnJheS5mcm9tKGdldEN1cnJlbnQoKSlcblxuICAgICAgaWYgKCFnZXRHcmlkKCkuaXNMYXN0UGFnZSgpKSB7IHJldHVybiB0cnVlIH1cbiAgICAgIHJldHVybiBpbmR4ICE9PSAoaWRzLmxlbmd0aCAtIDEpXG4gICAgfVxuXG4gICAgLy8gbmF2aWdhdGVzIHRvIHRoZSBwcmV2aW91cyByb3dcbiAgICB0aGlzLnByZXZSb3cgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IFtpZHMsIGluZHhdID0gQXJyYXkuZnJvbShnZXRDdXJyZW50KCkpXG5cbiAgICAgIGlmIChpbmR4ID4gMCkge1xuICAgICAgICAvLyBnZXQgdGhlIHByZXZpb3VzIGlkIGZyb20gdGhlIGNhY2hlZCBhcnJheSBvZiByb3cgaWRzXG4gICAgICAgIHJldHVybiBjdXJySWRTZXR0ZXIoJHNjb3BlLCBpZHNbaW5keCAtIDFdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbG9hZCB0aGUgcHJldmlvcyBwYWdlIGFuZCBnZXQgdGhlIGxhc3QgaWRcbiAgICAgICAgcmV0dXJuIHByZXZHcmlkUGFnZSgpLnRoZW4oaWRzID0+IGN1cnJJZFNldHRlcigkc2NvcGUsIGlkc1tpZHMubGVuZ3RoIC0gMV0pKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5hdmlnYXRlcyB0byB0aGUgbmV4dCByb3dcbiAgICB0aGlzLm5leHRSb3cgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IFtpZHMsIGluZHhdID0gQXJyYXkuZnJvbShnZXRDdXJyZW50KCkpXG5cbiAgICAgIGlmIChpbmR4IDwgKGlkcy5sZW5ndGggLSAxKSkge1xuICAgICAgICAvLyBnZXQgdGhlIG5leHQgaWQgZnJvbSB0aGUgY2FjaGVkIGFycmF5IG9mIHJvdyBpZHNcbiAgICAgICAgcmV0dXJuIGN1cnJJZFNldHRlcigkc2NvcGUsIGlkc1tpbmR4ICsgMV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsb2FkIHRoZSBuZXh0IHBhZ2UgYW5kIGdldCB0aGUgZmlyc3QgaWRcbiAgICAgICAgcmV0dXJuIG5leHRHcmlkUGFnZSgpLnRoZW4oaWRzID0+IGN1cnJJZFNldHRlcigkc2NvcGUsIGlkc1swXSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbnZhciBncmlkeiA9IGFuZ3VsYXIubW9kdWxlKGdyaWR6TW9kdWxlKVxuXG5ncmlkei5mYWN0b3J5KCdBY3Rpb25Qb3B1cEhhbmRsZXInLCBbXG4gICckbG9nJywgJGxvZyA9PiBmdW5jdGlvbihncmlkRWwsIHNjb3BlLCBhdHRycykge1xuICAvLyBoYW5kbGVzIGFuIGFjdGlvbiBmcm9tIHRoZSBgYWN0aW9uUG9wdXBgIG1lbnVcbiAgICBjb25zdCBoYW5kbGVBY3Rpb24gPSBmdW5jdGlvbihhY3Rpb24sIGlkKSB7XG4gICAgICBpZiAoIV8uaXNOaWwoc2NvcGVbYWN0aW9uXSkpIHtcbiAgICAgICAgJGxvZy5pbmZvKGBUcmlnZ2VyICcke2FjdGlvbn0nIGZvciByb3cgJyR7aWR9J2ApXG4gICAgICAgIHJldHVybiBzY29wZS4kYXBwbHkoKCkgPT4gc2NvcGVbYWN0aW9uXShpZCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJGxvZy53YXJuKGBcXGAkc2NvcGUuJHthY3Rpb259XFxgIGlzIG5vdCBkZWZpbmVkYClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoYW5kbGVzIGNsaWNrIG9uIHNob3cgYWN0aW9uIGluc2lkZSB0aGUgZHJvcGRvd24gbWVudVxuICAgIGdyaWRFbC5vbignc2hvd0FjdGlvbicsIGZ1bmN0aW9uKGV2ZW50LCBpZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3QgYWN0aW9uID0gYXR0cnMuc2hvd0FjdGlvbiA/IGF0dHJzLnNob3dBY3Rpb24gOiAnc2hvd1JlY29yZCdcbiAgICAgIHJldHVybiBoYW5kbGVBY3Rpb24oYWN0aW9uLCBpZClcbiAgICB9KVxuXG4gICAgLy8gaGFuZGxlcyBjbGljayBvbiBlZGl0IGFjdGlvbiBpbnNpZGUgdGhlIGRyb3Bkb3duIG1lbnVcbiAgICBncmlkRWwub24oJ2VkaXRBY3Rpb24nLCBmdW5jdGlvbihldmVudCwgaWQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGF0dHJzLmVkaXRBY3Rpb24gPyBhdHRycy5lZGl0QWN0aW9uIDogJ2VkaXRSZWNvcmQnXG4gICAgICByZXR1cm4gaGFuZGxlQWN0aW9uKGFjdGlvbiwgaWQpXG4gICAgfSlcblxuICAgIC8vIGhhbmRsZXMgY2xpY2sgb24gZGVsZXRlIGFjdGlvbiBpbnNpZGUgdGhlIGRyb3Bkb3duIG1lbnVcbiAgICBncmlkRWwub24oJ2RlbGV0ZUFjdGlvbicsIGZ1bmN0aW9uKGV2ZW50LCBpZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3QgYWN0aW9uID0gYXR0cnMuZGVsZXRlQWN0aW9uID8gYXR0cnMuZGVsZXRlQWN0aW9uIDogJ2RlbGV0ZVJlY29yZCdcbiAgICAgIHJldHVybiBoYW5kbGVBY3Rpb24oYWN0aW9uLCBpZClcbiAgICB9KVxuXG4gICAgLy8gaGFuZGxlcyBjbGljayBvbiBtYXNzVXBkYXRlIGFjdGlvbiBpbnNpZGUgdGhlIGRyb3Bkb3duIG1lbnVcbiAgICBncmlkRWwub24oJ21hc3NVcGRhdGVBY3Rpb24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3QgYWN0aW9uID0gYXR0cnMubWFzc1VwZGF0ZUFjdGlvbiA/IGF0dHJzLm1hc3NVcGRhdGVBY3Rpb24gOiAnbWFzc1VwZGF0ZSdcbiAgICAgIHJldHVybiBoYW5kbGVBY3Rpb24oYWN0aW9uKVxuICAgIH0pXG5cbiAgICAvLyBoYW5kbGVzIGNsaWNrIG9uIHRoZSBjZWxsIHdpdGggYGVkaXRBY3Rpb25MaW5rYCBmb3JtYXR0ZXJcbiAgICByZXR1cm4gZ3JpZEVsLm9uKCdjbGljaycsICdhLmVkaXRBY3Rpb25MaW5rJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IGlkID0gJCh0aGlzKS5wYXJlbnRzKCd0cjpmaXJzdCcpLmF0dHIoJ2lkJylcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGF0dHJzLmVkaXRBY3Rpb24gPyBhdHRycy5lZGl0QWN0aW9uIDogJ2VkaXRSZWNvcmQnXG4gICAgICByZXR1cm4gaGFuZGxlQWN0aW9uKGFjdGlvbiwgaWQpXG4gICAgfSlcbiAgfVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5cbi8vIEVuaGFuY2VkIGJpbmQgZGlyZWN0aXZlIHdpdGggZGVmYXVsdCB2YWx1ZVxuLy8gU2hvdWxkIGJlIHVzZWQgd2l0aCB4ZWRpdGFibGUgZmllbGRzIHRvIHNob3cgZGF0YSBpbiB0aGUgdmlldyBtb2RlXG5hbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSkuZGlyZWN0aXZlKCdhZ0JpbmQnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuXG4gICAgY29udHJvbGxlcigpIHtcbiAgICAgIHRoaXMuc2hvd1ZhbHVlID0gdmFsdWUgPT4gYW5ndWxhci5pc051bWJlcih2YWx1ZSkgfHwgISF2YWx1ZVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBjb21waWxlKGVsZW1lbnQpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgaW5pdGlhbCBjb250ZW50XG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBlbGVtZW50Lmh0bWwoKSB8fCAnJm5ic3A7J1xuXG4gICAgICByZXR1cm4gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkgPT4gc2NvcGUuJHdhdGNoKGF0dHJzLmFnQmluZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY29uc3QgdHh0ID0gY3RybC5zaG93VmFsdWUodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWVcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuaHRtbCh0eHQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCBCYXNlQ3RybCBmcm9tICcuLi8uLi91dGlscy9CYXNlQ3RybCdcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgY29tbW9uTW9kdWxlIGZyb20gJy4uL2NvbW1vbk1vZHVsZSdcblxuY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKVxuXG5jbGFzcyBOb3RpZmljYXRpb25EaWFsb2dDdHJsIGV4dGVuZHMgQmFzZUN0cmwge1xuICBzdGF0aWMgaW5pdENsYXNzKCkge1xuICAgIHRoaXMucmVnaXN0ZXIoYXBwLCAnTm90aWZpY2F0aW9uRGlhbG9nQ3RybCcpXG4gICAgdGhpcy5pbmplY3QoKVxuICB9XG5cbiAgc3RhdGljIHJlZ2lzdGVyKGFwcCwgbmFtZSkge1xuICAgIHN1cGVyLnJlZ2lzdGVyKGFwcCwgbmFtZSlcbiAgfVxuXG4gIHN0YXRpYyBpbmplY3QoKSB7XG4gICAgc3VwZXIuaW5qZWN0KCckc2NvcGUnLCAnJGxvZycsICdvcHRpb25zJylcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3NlKHRoaXMuJHNjb3BlLCAnb3B0aW9ucycsICdjbG9zZScpXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy4kbG9nLmluZm8oJ0Nsb3Npbmcgbm90aWZpY2F0aW9uIGRpYWxvZycpXG4gIH1cbn1cbk5vdGlmaWNhdGlvbkRpYWxvZ0N0cmwuaW5pdENsYXNzKClcblxuY2xhc3MgTm90aWZpY2F0aW9uRGlhbG9nU2VydiB7XG4gIGNvbnN0cnVjdG9yKCRsb2csICRxKSB7XG4gICAgdGhpcy4kbG9nID0gJGxvZ1xuICAgIHRoaXMuJHEgPSAkcVxuICB9XG5cbiAgb3BlbihvcHRpb25zKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHsgb3B0aW9ucyA9IHsgbWVzc2FnZTogb3B0aW9ucyB9IH1cbiAgICBpZiAob3B0aW9ucy5va0xhYmVsID09IG51bGwpIHsgb3B0aW9ucy5va0xhYmVsID0gJ09rJyB9XG5cbiAgICB0aGlzLiRsb2cuaW5mbygnT3BlbmluZyBub3RpZmljYXRpb24gZGlhbG9nLCBtZXNzYWdlOicsIG9wdGlvbnMubWVzc2FnZSlcbiAgICBjb25zdCBkZWZlciA9IHRoaXMuJHEuZGVmZXIoKVxuXG4gICAgc3dhbCh7XG4gICAgICB0aXRsZTogb3B0aW9ucy5tZXNzYWdlLFxuICAgICAgYWxsb3dFc2NhcGVLZXk6IGZhbHNlLFxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6IG9wdGlvbnMub2tMYWJlbFxuICAgIH0sICgpID0+IGRlZmVyLnJlc29sdmUoe1xuICAgICAgZGVmZXIoKSB7IHJldHVybiBkZWZlciB9XG4gICAgfSkpXG5cbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZVxuICB9XG59XG5Ob3RpZmljYXRpb25EaWFsb2dTZXJ2LiRpbmplY3QgPSBbJyRsb2cnLCAnJHEnXVxuXG5hcHAuc2VydmljZSgnTm90aWZpY2F0aW9uRGlhbG9nU2VydicsIE5vdGlmaWNhdGlvbkRpYWxvZ1NlcnYpXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuZm9ybXMudmFsdWUoXCJnZXRSZWFsUGFuZWxIZWlnaHRcIiwgZnVuY3Rpb24oZWwpIHtcbiAgY29uc3QgYm9keUVsID0gZWwuZmluZChcIi5wYW5lbC1ib2R5OnZpc2libGVcIilcbiAgY29uc3Qgb2xkSGVpZ2h0ID0gJChib2R5RWwpLmhlaWdodCgpXG5cbiAgYm9keUVsLmNzcyhcIm1pbi1oZWlnaHRcIiwgXCJhdXRvXCIpXG4gIGNvbnN0IGhlaWdodCA9ICQoZWwpLmhlaWdodCgpXG4gIC8vIERvIG5vdCBlcXVhbGl6ZSBpZiBlbGVtZW50IGNvbGxhcHNlZFxuICBpZiAoYW5ndWxhci5lbGVtZW50KGJvZHlFbCkuYXR0cihcImNvbGxhcHNlZFwiKSkge1xuICAgIGJvZHlFbC5jc3MoXCJtaW4taGVpZ2h0XCIsIDApXG4gIH0gZWxzZSB7XG4gICAgaWYgKCFib2R5RWw/LlswXT8uYXR0cmlidXRlcz8uWydtaW4taGVpZ2h0J10pIHsgYm9keUVsLmNzcyhcIm1pbi1oZWlnaHRcIiwgb2xkSGVpZ2h0KSB9XG4gIH1cblxuICAvLyBSZW1vdmUgcGFkZGluZyBiZXR3ZWVuIGdyaWQgaGVhZGVyIGFuZCBib2R5XG4gIGlmIChlbC5maW5kKFwiW2FnLWdyaWRdXCIpLmxlbmd0aCA+IDApIHtcbiAgICBlbC5maW5kKFwiLnBhbmVsLWhlYWRpbmdcIikuY3NzKFwicGFkZGluZy1ib3R0b21cIiwgXCIwcHhcIilcbiAgICBib2R5RWwuY3NzKFwicGFkZGluZy10b3BcIiwgXCIwcHhcIilcbiAgfVxuXG4gIHJldHVybiBoZWlnaHRcbn0pXG5cbmZvcm1zLmRpcmVjdGl2ZShcImFnUGFuZWxzUm93XCIsIFtcbiAgXCJnZXRSZWFsUGFuZWxIZWlnaHRcIiwgZnVuY3Rpb24oZ2V0SGVpZ2h0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkNcIixcbiAgICAgIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHRoaXMucGFuZWxzID0gW11cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyUGFuZWwgPSBmdW5jdGlvbihlbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBhbmVscy5wdXNoKCQoZWwpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXhIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCBoaWdoZXN0ID0gXy5tYXgodGhpcy5wYW5lbHMsIGVsID0+IGdldEhlaWdodChlbCkpXG4gICAgICAgICAgcmV0dXJuIGdldEhlaWdodChoaWdoZXN0KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJucyB0cnVlIHdoZW4gYWxsIHBhbmVscyBhcmUgZXF1YWxpemVkXG4gICAgICAgIHRoaXMuYWxsRXF1YWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCBoZWlnaHRzID0gXy5tYXAodGhpcy5wYW5lbHMsIGVsID0+IGdldEhlaWdodChlbCkpXG4gICAgICAgICAgLy9fLmNoYWluKHRoaXMucGFuZWxzKS5tYXAoZWwgPT4gZ2V0SGVpZ2h0KGVsKSkudmFsdWUoKVxuICAgICAgICAgIHJldHVybiBfLmV2ZXJ5KGhlaWdodHMsIGhlaWdodCA9PiBoZWlnaHQgPT09IGhlaWdodHNbMF0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVxdWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYWxsRXF1YWwoKSkgeyByZXR1cm4gfVxuXG4gICAgICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gdGhpcy5tYXhIZWlnaHQoKVxuXG4gICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnBhbmVscywgZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHlFbCA9IGVsLmZpbmQoXCIucGFuZWwtYm9keVwiKVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IHBhZGRpbmdcbiAgICAgICAgICAgIGxldCBwYWRkaW5ncyA9IHBhcnNlSW50KGJvZHlFbC5jc3MoXCJwYWRkaW5nLXRvcFwiKSkgKyBwYXJzZUludChib2R5RWwuY3NzKFwicGFkZGluZy1ib3R0b21cIikpXG5cbiAgICAgICAgICAgIC8vIGFkZCBoZWFkaW5nIGFuZCBmb290ZXJcbiAgICAgICAgICAgIHBhZGRpbmdzICs9IGVsLmZpbmQoXCIucGFuZWwtaGVhZGluZ1wiKS5vdXRlckhlaWdodCgpXG4gICAgICAgICAgICBwYWRkaW5ncyArPSBlbC5maW5kKFwiLnBhbmVsLWZvb3RlclwiKS5vdXRlckhlaWdodCgpXG5cbiAgICAgICAgICAgIHJldHVybiBib2R5RWwuY3NzKFwibWluLWhlaWdodFwiLCBtYXhIZWlnaHQgLSBwYWRkaW5ncylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgIH1cbiAgICB9XG4gIH1cbl0pXG5cbmZvcm1zLmRpcmVjdGl2ZShcImFnUGFuZWxcIiwgW1xuICBcImdldFJlYWxQYW5lbEhlaWdodFwiLCBnZXRIZWlnaHQgPT4gKHtcbiAgcmVzdHJpY3Q6IFwiQ1wiLFxuICByZXF1aXJlOiBcIl5hZ1BhbmVsc1Jvd1wiLFxuXG4gIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cbiAgICAvLyBhZGQgdGhlIGN1cnJlbnQgcGFuZWwgdG8gdGhlIHN0YWNrXG4gICAgY3RybC5yZWdpc3RlclBhbmVsKGVsZW1lbnQpXG5cbiAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gKCkgPT4gZ2V0SGVpZ2h0KGVsZW1lbnQpXG4gICAgcmV0dXJuIHNjb3BlLiR3YXRjaChlbGVtZW50SGVpZ2h0LCAoKSA9PiBjdHJsLmVxdWFsaXplKCkpXG4gIH1cbn0pXG5dKVxuXG4vL1xuLy8gVG8gbWFyayBlbGVtZW50KHMpIGluIHBhbmVsIHRoYXQgbmVlZHMgdG8gYmUgZGlzcGxheWVkIHdoZW4gcGFuZWwgY29sbGFwc2luZ1xuLy8ganVzdCBhZGQgJ3N0YXktb24tY29sbGFwc2UnIGF0dHJpYnV0ZS4gRXhhbXBsZTpcbi8vXG4vLyA8Zm9ybT5cbi8vICAgPGRpdiBzdGF5LW9uLWNvbGxhcHNlPi4uLjwvZGl2PiA8IS0tIHRoaXMgJ2Rpdicgd2lsbCBiZSBkaXNwbGF5ZWQgd2hlbiBwYW5lbCBjb2xsYXBzZWQgdG9wIC0tPlxuLy8gICA8ZGl2Pi4uLjwvZGl2PlxuLy8gPC9mb3JtPlxuLy9cbmZvcm1zLmRpcmVjdGl2ZShcImFnUGFuZWxTdGF0ZXNcIiwgIFtcbiAgXCIkY29tcGlsZVwiLCAkY29tcGlsZSA9PiAoe1xuICByZXN0cmljdDogXCJFXCIsXG4gIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgY29udHJvbGxlcjogW1xuICAgIFwiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgICBsZXQgcmVtb3ZlRWxlbWVudHNcbiAgICAgICRzY29wZS5jaGFuZ2VTdGF0ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHN0YXRlQnV0dG9uID0gZ2V0QWdQYW5lbChldmVudCkuZmluZCgnW25hbWU9XCJhZ1BhbmVsU3RhdGVzXCJdJykuZmluZCgnW25hbWU9XCJzdGF0ZUJ1dHRvblwiXScpXG4gICAgICAgIGlmICgkc2NvcGUuc3RhdGUgPT09IFwiY29sbGFwc2VkXCIpIHtcbiAgICAgICAgICAkc2NvcGUuc3RhdGUgPSBcIm5vcm1hbFwiXG4gICAgICAgICAgc3RhdGVCdXR0b24uZmluZChcImlcIikucHJvcChcImNsYXNzXCIsIFwiZmEgZmEtbWludXNcIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2NvcGUuc3RhdGUgPSBcImNvbGxhcHNlZFwiXG4gICAgICAgICAgc3RhdGVCdXR0b24uZmluZChcImlcIikucHJvcChcImNsYXNzXCIsIFwiZmEgZmEtcGx1c1wiKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRBZ1BhbmVsKGV2ZW50KVxuICAgICAgICBpZiAoaXNHcmlkKGVsZW1lbnQpKSB7IGNvbGxhcHNlR3JpZChlbGVtZW50KSB9IGVsc2UgeyBjb2xsYXBzZUZvcm0oZWxlbWVudCkgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAkc2NvcGUuZnVsbHNjcmVlblN0YXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcGFuZWxNb2RhbCA9IFwiPHBhbmVsLW1vZGFsPjwvcGFuZWwtbW9kYWw+XCJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGdldEFnUGFuZWwoZXZlbnQpKS53cmFwKHBhbmVsTW9kYWwpXG4gICAgICAgICRjb21waWxlKHBhbmVsTW9kYWwpKCRzY29wZSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgLy8gR2V0cyB0aGUgY2xvc2VzdCBhZy1wYW5lbFxuICAgICAgdmFyIGdldEFnUGFuZWwgPSBldmVudCA9PiBhbmd1bGFyLmVsZW1lbnQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLmFnLXBhbmVsXCIpXG5cbiAgICAgIC8vIEZpbmRzIG91dCBpZiBlbGVtZW50IGlzIGEgZ3JpZFxuICAgICAgdmFyIGlzR3JpZCA9IGVsZW1lbnQgPT4gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoXCJ0YWJsZS5ncmlkelwiKS5sZW5ndGggPiAwXG5cbiAgICAgIC8vIE1ldGhvZCBmb3IgY29sbGFwc2luZyBhIGdyaWRcbiAgICAgIHZhciBjb2xsYXBzZUdyaWQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGxldCByb3dcbiAgICAgICAgY29uc3QgZ3JpZEVsID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoXCJ0YWJsZS5ncmlkelwiKVxuXG4gICAgICAgIGlmICgkc2NvcGUuc3RhdGUgPT09IFwiY29sbGFwc2VkXCIpIHtcbiAgICAgICAgICBjb25zdCB0Qm9keSA9IGFuZ3VsYXIuZWxlbWVudChncmlkRWwpLmZpbmQoXCJ0Ym9keVwiKVxuICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQodEJvZHkpLmZpbmQoXCIudWktc3RhdGUtaGlnaGxpZ2h0XCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAocm93IG9mIEFycmF5LmZyb20oYW5ndWxhci5lbGVtZW50KGdyaWRFbCkuZmluZChcInRib2R5XCIpLmNoaWxkcmVuKCkpKSB7XG4gICAgICAgICAgICAgIGlmICghYW5ndWxhci5lbGVtZW50KHJvdykuaGFzQ2xhc3MoXCJ1aS1zdGF0ZS1oaWdobGlnaHRcIikgJiYgIWFuZ3VsYXIuZWxlbWVudChyb3cpLmhhc0NsYXNzKFwianFnZmlyc3Ryb3dcIikpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQocm93KS5hZGRDbGFzcyhcIm5nLWhpZGVcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuZ3JpZFJvd051bSA9IGdyaWRFbC5qcUdyaWQoXCJnZXRHcmlkUGFyYW1cIiwgXCJyb3dOdW1cIilcbiAgICAgICAgICAgIGdyaWRFbC5qcUdyaWQoXCJzZXRHcmlkUGFyYW1cIiwge3Jvd051bTogMX0pLnRyaWdnZXIoXCJyZWxvYWRHcmlkXCIsIFt7cGFnZTogMX1dKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZChcIi5ncmlkei1wYWdlclwiKS5hZGRDbGFzcyhcIm5nLWhpZGVcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkc2NvcGUuc3RhdGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmdyaWRSb3dOdW0pIHsgZ3JpZEVsLmpxR3JpZChcInNldEdyaWRQYXJhbVwiLCB7cm93TnVtOiAkc2NvcGUuZ3JpZFJvd051bX0pLnRyaWdnZXIoXCJyZWxvYWRHcmlkXCIsIFt7cGFnZTogMX1dKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHJvdyBvZiBBcnJheS5mcm9tKGFuZ3VsYXIuZWxlbWVudChncmlkRWwpLmZpbmQoXCJ0Ym9keVwiKS5jaGlsZHJlbigpKSkge1xuICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KHJvdykuaGFzQ2xhc3MoXCJuZy1oaWRlXCIpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHJvdykucmVtb3ZlQ2xhc3MoXCJuZy1oaWRlXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChyb3cpLmhhc0NsYXNzKFwidWktc3RhdGUtaGlnaGxpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHJvdykuYWRkQ2xhc3MoXCJ1aS1zdGF0ZS1oaWdobGlnaHRcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZChcIi5ncmlkei1wYWdlclwiKS5yZW1vdmVDbGFzcyhcIm5nLWhpZGVcIilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNZXRob2QgZm9yIGNvbGxhcHNpbmcgZm9ybVxuICAgICAgdmFyIGNvbGxhcHNlRm9ybSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcGFuZWxCb2R5ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoXCIucGFuZWwtYm9keVwiKVxuICAgICAgICBpZiAoJHNjb3BlLnN0YXRlID09PSBcImNvbGxhcHNlZFwiKSB7XG4gICAgICAgICAgY29uc3QgY2xvbmUgPSBhbmd1bGFyLmVsZW1lbnQocGFuZWxCb2R5KS5jbG9uZSgpXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KHBhbmVsQm9keSkuYWRkQ2xhc3MoXCJuZy1oaWRlXCIpXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KHBhbmVsQm9keSkuYWZ0ZXIoY2xvbmUpXG4gICAgICAgICAgcmVtb3ZlRWxlbWVudHMoY2xvbmUpXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChjbG9uZSkuY2hpbGRyZW4oKS5sZW5ndGggPT09IDApIHsgYW5ndWxhci5lbGVtZW50KGNsb25lKS5yZW1vdmUoKSB9XG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KGNsb25lKS5hdHRyKFwiY29sbGFwc2VkXCIsIFwidHJ1ZVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmICgkc2NvcGUuc3RhdGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICBmb3IgKGxldCBlbCBvZiBBcnJheS5mcm9tKHBhbmVsQm9keSkpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWwpLmhhc0NsYXNzKFwibmctaGlkZVwiKSkgeyBhbmd1bGFyLmVsZW1lbnQoZWwpLnJlbW92ZUNsYXNzKFwibmctaGlkZVwiKVxuICAgICAgICAgICAgfSBlbHNlIHsgYW5ndWxhci5lbGVtZW50KGVsKS5yZW1vdmUoKSB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEdvZXMgdGhyb3VnaCB0aGUgRE9NIGVsZW1lbnQgYW5kIGhpZGVzIGFsbCBub2RlcyB3aXRob3V0ICdzdGF5LW9uLWNvbGxhcHNlJyBhdHRyaWJ1dGVcbiAgICAgIC8vIFNhdmVzIG9yaWdpbiBlbGVtZW50IHN0cnVjdHVyZVxuICAgICAgcmV0dXJuIHJlbW92ZUVsZW1lbnRzID0gZnVuY3Rpb24ocGFuZWxCb2R5KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gYW5ndWxhci5lbGVtZW50KHBhbmVsQm9keSkuY2hpbGRyZW4oKVxuICAgICAgICBsZXQgaGFzRWxlbWVudFRvU3RheSA9IGZhbHNlXG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIEFycmF5LmZyb20oY2hpbGRyZW4pKSB7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChjaGlsZCkuaXMoXCJbc3RheS1vbi1jb2xsYXBzZV1cIikpIHtcbiAgICAgICAgICAgIGhhc0VsZW1lbnRUb1N0YXkgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmVsZW1lbnQoY2hpbGQpLmNoaWxkcmVuKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCFyZW1vdmVFbGVtZW50cyhjaGlsZCkpIHsgYW5ndWxhci5lbGVtZW50KGNoaWxkKS5yZW1vdmUoKSB9IGVsc2UgeyBoYXNFbGVtZW50VG9TdGF5ID0gdHJ1ZSB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChjaGlsZCkucmVtb3ZlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc0VsZW1lbnRUb1N0YXlcbiAgICAgIH1cbiAgICB9XG5cbiAgXSxcblxuICBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCwgdHJhbnNjbHVkZUZuKSB7XG4gICAgY29uc3QgYnV0dG9uTGlzdCA9IGFuZ3VsYXIuZWxlbWVudCgkY29tcGlsZShgXFxcbjx1bCBuYW1lPVwiYWdQYW5lbFN0YXRlc1wiIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgcGFuZWwtc3RhdGVzIHB1bGwtcmlnaHRcIj48L3VsPlxcXG5gKShzY29wZSkpXG5cbiAgICAvL2FkZCB1c2VyIGJ1dHRvbnNcbiAgICB0cmFuc2NsdWRlRm4oc2NvcGUsIGNsb25lQ29udGVudCA9PiBhbmd1bGFyLmZvckVhY2goY2xvbmVDb250ZW50LCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBjb25zdCBsaSA9IGFuZ3VsYXIuZWxlbWVudCgnPGxpPjwvbGk+JylcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbkxpc3QuYXBwZW5kKGxpLmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpKSkpXG4gICAgICB9XG4gICAgfSkpXG5cbiAgICBjb25zdCBkZWZhdWx0QnV0dG9ucyA9IGFuZ3VsYXIuZWxlbWVudCgkY29tcGlsZShgXFxcbjxsaT5cbjxhIG5hbWU9XCJzdGF0ZUJ1dHRvblwiIGNsYXNzPVwibGlzdFwiIG5nLWNsaWNrPVwiY2hhbmdlU3RhdGUoJGV2ZW50KVwiIHVpYi10b29sdGlwPVwiSGlkZS9TaG93XCI+XG4gICA8aSBjbGFzcz1cImZhIGZhLW1pbnVzXCI+PC9pPlxuPC9hPlxuPC9saT5cbjxsaT5cbjxhIG5hbWU9XCJleHBhbmRCdXR0b25cIiBjbGFzcz1cImxpc3RcIiBuZy1jbGljaz1cImZ1bGxzY3JlZW5TdGF0ZSgkZXZlbnQpXCIgdWliLXRvb2x0aXA9XCJFeHBhbmRcIj5cbiAgPGkgY2xhc3M9XCJmYSBmYS1leHBhbmRcIj48L2k+XG48L2E+XG48L2xpPlxuPGxpPlxuPGEgbmFtZT1cImNvbXByZXNzQnV0dG9uXCIgY2xhc3M9XCJsaXN0IG5nLWhpZGVcIiBuZy1jbGljaz1cImNsb3NlKClcIiB1aWItdG9vbHRpcD1cIkNvbXByZXNzXCI+XG4gIDxpIGNsYXNzPVwiZmEgZmEtY29tcHJlc3NcIj48L2k+XG48L2E+XG48L2xpPlxcXG5gKShzY29wZSkpXG4gICAgcmV0dXJuIGVsZW1lbnQucHJlcGVuZChidXR0b25MaXN0LmFwcGVuZChkZWZhdWx0QnV0dG9ucykpXG4gIH1cbn0pXG5cbl0pXG5cbi8vIERpcmVjdGl2ZSBmb3Igb3BlbmluZyBtb2RhbCB3aW5kb3dcbmZvcm1zLmRpcmVjdGl2ZShcInBhbmVsTW9kYWxcIiwgW1xuICBcIiRjb21waWxlXCIsIFwiJHVpYk1vZGFsXCIsIFwiJGRvY3VtZW50XCIsICgkY29tcGlsZSwgJG1vZGFsLCAkZG9jdW1lbnQpID0+ICh7XG4gIHJlc3RyaWN0OiBcIkVcIixcblxuICB0ZW1wbGF0ZTogYFxcXG48ZGl2IGNsYXNzPVwibW9kYWwgbW9kYWwtZnVsbHNjcmVlblwiPlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPjwvZGl2PlxuPC9kaXY+XFxcbmAsXG5cbiAgY29udHJvbGxlcjogW1xuICAgIFwiJHNjb3BlXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgICAkc2NvcGUub3BlbiA9ICgpID0+ICRzY29wZS5zaG93TW9kYWwgPSB0cnVlXG5cbiAgICAgICRzY29wZS5jbG9zZSA9ICgpID0+ICRzY29wZS5zaG93TW9kYWwgPSBmYWxzZVxuXG4gICAgICAvLyBDbG9zZSBtb2RhbCB3aW5kb3cgKGlmIGl0IGlzIG9wZW4pIHdoZW4gYmFjayBidXR0b24gY2xpY2tlZFxuICAgICAgJHNjb3BlLiRvbihcIiRsb2NhdGlvbkNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICgkc2NvcGUuc2hvd01vZGFsKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2xvc2UoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBUcmlnZ2VyIGZvciBncmlkIHJlc2l6aW5nXG4gICAgICAkc2NvcGUuc2hyaW5rR3JpZElmRXhpc3RzID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBjb25zdCBncmlkV2lkdGggPSBlbGVtZW50LndpZHRoKClcbiAgICAgICAgY29uc3QgZ3JpZEVsID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoXCJ0YWJsZS5ncmlkelwiKVxuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGdyaWRFbCkubGVuZ3RoID4gMCkgeyByZXR1cm4gZ3JpZEVsLmpxR3JpZChcInNldEdyaWRXaWR0aFwiLCBncmlkV2lkdGgsIHRydWUpIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRzY29wZS5zZXRHcmlkTWF4SGVpZ2h0ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBjb25zdCB1aUpxZ3JpZEJkaXYgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZChcIi51aS1qcWdyaWQtYmRpdlwiKVxuICAgICAgICBpZiAoISRzY29wZS5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAkc2NvcGUubWF4SGVpZ2h0ID0gYW5ndWxhci5lbGVtZW50KHVpSnFncmlkQmRpdikuY3NzKFwibWF4LWhlaWdodFwiKVxuICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQodWlKcWdyaWRCZGl2KS5jc3MoXCJtYXgtaGVpZ2h0XCIsIFwiODB2aFwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCh1aUpxZ3JpZEJkaXYpLmNzcyhcIm1heC1oZWlnaHRcIiwgJHNjb3BlLm1heEhlaWdodClcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1heEhlaWdodCA9IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIF0sXG5cbiAgbGluayhzY29wZSwgZWxlbWVudCkge1xuICAgIHNjb3BlLm9wZW4oKVxuXG4gICAgcmV0dXJuIHNjb3BlLiR3YXRjaChcbiAgICAgICgpID0+IHNjb3BlLnNob3dNb2RhbCxcbiAgICAgIGZ1bmN0aW9uKG5ld1ZhbCkge1xuICAgICAgICBjb25zdCBtb2RhbEVsID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudCkuZmluZCgncGFuZWwtbW9kYWwnKVxuICAgICAgICBjb25zdCBhZ1BhbmVsU3RhdGVzID0gYW5ndWxhci5lbGVtZW50KG1vZGFsRWwpLmZpbmQoJ1tuYW1lPVwiYWdQYW5lbFN0YXRlc1wiXScpXG4gICAgICAgIGNvbnN0IGVsZW1lbnRTY29wZSA9IGVsZW1lbnQuc2NvcGUoKVxuICAgICAgICBjb25zdCBzdGF0ZSA9IGFnUGFuZWxTdGF0ZXMuZmluZCgnW25hbWU9XCJzdGF0ZUJ1dHRvblwiXScpXG4gICAgICAgIGNvbnN0IGV4cGFuZCA9IGFnUGFuZWxTdGF0ZXMuZmluZCgnW25hbWU9XCJleHBhbmRCdXR0b25cIl0nKVxuICAgICAgICBjb25zdCBjb21wcmVzcyA9IGFnUGFuZWxTdGF0ZXMuZmluZCgnW25hbWU9XCJjb21wcmVzc0J1dHRvblwiXScpXG5cbiAgICAgICAgaWYgKGVsZW1lbnRTY29wZSkge1xuICAgICAgICAgIGxldCBtb2RhbEJvZHlcbiAgICAgICAgICBpZiAobmV3VmFsKSB7XG4gICAgICAgICAgICBzdGF0ZS5hZGRDbGFzcyhcIm5nLWhpZGVcIilcbiAgICAgICAgICAgIGV4cGFuZC5hZGRDbGFzcyhcIm5nLWhpZGVcIilcbiAgICAgICAgICAgIGNvbXByZXNzLnJlbW92ZUNsYXNzKFwibmctaGlkZVwiKVxuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobW9kYWxFbClcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZChcIi5tb2RhbC1ib2R5XCIpLmFwcGVuZChhbmd1bGFyLmVsZW1lbnQobW9kYWxFbCkuY2hpbGRyZW4oKSlcbiAgICAgICAgICAgIG1vZGFsQm9keSA9IGVsZW1lbnQuZmluZChcIi5tb2RhbC1ib2R5XCIpLmNoaWxkcmVuKClcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChtb2RhbEVsKS5yZW1vdmUoKVxuICAgICAgICAgICAgc2NvcGUuc2hyaW5rR3JpZElmRXhpc3RzKG1vZGFsQm9keSlcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5zZXRHcmlkTWF4SGVpZ2h0KG1vZGFsQm9keSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUucmVtb3ZlQ2xhc3MoXCJuZy1oaWRlXCIpXG4gICAgICAgICAgICBleHBhbmQucmVtb3ZlQ2xhc3MoXCJuZy1oaWRlXCIpXG4gICAgICAgICAgICBjb21wcmVzcy5hZGRDbGFzcyhcIm5nLWhpZGVcIilcbiAgICAgICAgICAgIG1vZGFsQm9keSA9IGFuZ3VsYXIuZWxlbWVudChtb2RhbEVsKS5maW5kKFwiLm1vZGFsLWJvZHlcIikuY2hpbGRyZW4oKVxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG1vZGFsQm9keSkuaW5zZXJ0QmVmb3JlKG1vZGFsRWwpXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobW9kYWxFbCkucmVtb3ZlKClcbiAgICAgICAgICAgIHNjb3BlLnNocmlua0dyaWRJZkV4aXN0cyhtb2RhbEJvZHkpXG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuc2V0R3JpZE1heEhlaWdodChtb2RhbEJvZHkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgfVxufSlcblxuXSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi9hZGRFbXB0eU9wdGlvbidcbmltcG9ydCAnLi9hZ0JhY2tCdXR0b24nXG5pbXBvcnQgJy4vYWdGaWxlVXBsb2FkJ1xuaW1wb3J0ICcuL2FnU3Bpbm5lcidcbmltcG9ydCAnLi9pZVNlbGVjdEZpeCdcbmltcG9ydCAnLi9tZW51SXRlbSdcbmltcG9ydCAnLi9zaWRlTWVudSdcbmltcG9ydCAnLi90YWdJbnB1dCdcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IGdyaWR6ID0gYW5ndWxhci5tb2R1bGUoZ3JpZHpNb2R1bGUpXG5cbmNsYXNzIEFnR3JpZERhdGFMb2FkZXJDbGFzcyB7XG4gIGNvbnN0cnVjdG9yKCRsb2csICRodHRwLCAkZG9jdW1lbnQpIHtcbiAgICAvLyB1cmwgLSBkYXRhIHNvdXJjZSB1cmxcbiAgICAvLyBncmlkQ3RybCAtIGdyaWQgY29udHJvbGxlciBpbnN0YW5jZVxuICAgIHJldHVybiBmdW5jdGlvbih1cmwsIGdyaWRDdHJsKSB7IC8vIHNlZSBodHRwOi8vd3d3LnRyaXJhbmQuY29tL2pxZ3JpZHdpa2kvZG9rdS5waHA/aWQ9d2lraTpyZXRyaWV2aW5nX2RhdGFcbiAgICAgIHJldHVybiBmdW5jdGlvbihwYXJhbXMsIGxvYWRpbmdEaXZTZWxlY3Rvcikge1xuICAgICAgICAvLyBsb2FkIGdyaWQgZGF0YVxuICAgICAgICBjb25zdCBwcm9taXNlID0gJGh0dHAuZ2V0KHVybCwgeyBwYXJhbXMgfSlcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgJGxvZy5kZWJ1ZygnW2dyaWR6XSBncmlkIGRhdGEgbG9hZGVkJywgZ3JpZEN0cmwsIHJlc3BvbnNlKVxuICAgICAgICAgIHJldHVybiBncmlkQ3RybC5hZGRKU09ORGF0YShyZXNwb25zZS5kYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIHNob3cvaGlkZSB0aGUgbG9hZGluZyBhbmltYXRpb25cbiAgICAgICAgY29uc3QgbG9hZGluZ0VsID0gJGRvY3VtZW50LmZpbmQoJyMnICsgJC5qZ3JpZC5qcUlEKGxvYWRpbmdEaXZTZWxlY3RvcikpXG4gICAgICAgIGxvYWRpbmdFbC5zaG93KClcbiAgICAgICAgcmV0dXJuIHByb21pc2UuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBsaXN0IG9mIHVybHMgZm9yIHBlbmRpbmcgcmVxdWVzdHNcbiAgICAgICAgICBjb25zdCBwZW5kaW5nVXJscyA9IF8ubWFwKCRodHRwLnBlbmRpbmdSZXF1ZXN0cywgaXQgPT4gaXQudXJsKVxuICAgICAgICAgIC8vIGhpZGUgXCJMb2FkaW5nXCIgZm9yIGdyaWQgb25seSBpZiB0aGVyZWlzIG5vIHBlbmRpbmcgcmVxdWVzdHMgZm9yIHRoaXMgZ3JpZFxuICAgICAgICAgIGlmICghQXJyYXkuZnJvbShwZW5kaW5nVXJscykuaW5jbHVkZXModXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvYWRpbmdFbC5oaWRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkFnR3JpZERhdGFMb2FkZXJDbGFzcy4kaW5qZWN0ID0gWyckbG9nJywgJyRodHRwJywgJyRkb2N1bWVudCddXG5ncmlkei5zZXJ2aWNlKCdhZ0dyaWREYXRhTG9hZGVyJywgQWdHcmlkRGF0YUxvYWRlckNsYXNzKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIG1peGluID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbm1peGluLmZhY3RvcnkoJ0RpYWxvZ0NydWRDdHJsTWl4aW4nLCBbXG4gICckbG9nJywgJyRwYXJzZScsICdGb3JtRGlhbG9nU2VydicsICdDb25maXJtYXRpb25EaWFsb2dTZXJ2JywgJ2FsZXJ0cycsXG4gICgkbG9nLCAkcGFyc2UsIEZvcm1EaWFsb2dTZXJ2LCBDb25maXJtYXRpb25EaWFsb2dTZXJ2LCBhbGVydHMpID0+IGZ1bmN0aW9uKCRzY29wZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHsgb3B0aW9ucyA9IHt9IH1cbiAgICBjb25zdCB7IFJlc291cmNlLCBncmlkTmFtZSwgdGVtcGxhdGVVcmwsIHRlbXBsYXRlLCBleHRyYURpYWxvZ09wdGlvbnMgfSA9IG9wdGlvbnNcblxuICAgIC8vIFJldHJpZXZlIGEgZ3JpZCBjb250cm9sbGVyIGZyb20gdGhlIHNjb3BlXG4gICAgY29uc3QgZ2V0R3JpZCA9ICgpID0+ICRwYXJzZShncmlkTmFtZSkoJHNjb3BlKVxuXG4gICAgY29uc3Qgb3BlbkVkaXREaWFsb2dGb3IgPSBmdW5jdGlvbihyZWNvcmQpIHtcbiAgICAgIGNvbnN0IGRpYWxvZ09wdGlvbnMgPSB7IHJlY29yZCwgZ3JpZDogZ2V0R3JpZCgpLCBzY29wZTogJHNjb3BlLCB0ZW1wbGF0ZTogdGVtcGxhdGUgfVxuICAgICAgcmV0dXJuIEZvcm1EaWFsb2dTZXJ2Lm9wZW4odGVtcGxhdGVVcmwsIF8uZXh0ZW5kKGRpYWxvZ09wdGlvbnMsIGV4dHJhRGlhbG9nT3B0aW9ucykpXG4gICAgfVxuXG4gICAgLy8gR2VuZXJpYyBtZXRob2QgZm9yIGludm9raW5nIGFuIGVkaXQgZGlhbG9nIGZvciBhIHJlc291cmNlXG4gICAgLy8gd2l0aCB0aGUgZ2l2ZW4gaWRcbiAgICAkc2NvcGUuZWRpdFJlY29yZCA9IGlkID0+IFJlc291cmNlLmdldCh7IGlkIH0sIGZ1bmN0aW9uKHJlY29yZCkge1xuICAgICAgaWYgKCFfLmlzTmlsKG9wdGlvbnMuYmVmb3JlRWRpdCkpIHsgcmVjb3JkID0gb3B0aW9ucy5iZWZvcmVFZGl0KHJlY29yZCkgfVxuICAgICAgcmV0dXJuIG9wZW5FZGl0RGlhbG9nRm9yKHJlY29yZClcbiAgICB9KVxuXG4gICAgLy8gR2VuZXJpYyBtZXRob2QgZnJvbSBpbnZva2luZyBhIGRpYWxvZyBmb3JcbiAgICAvLyBjcmVhdGluZyBhIG5ldyByZWNvcmRcbiAgICAkc2NvcGUuY3JlYXRlUmVjb3JkID0gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgcmVjb3JkID0gbmV3IFJlc291cmNlKClcbiAgICAgIGlmICghXy5pc05pbChvcHRpb25zLmJlZm9yZUNyZWF0ZSkpIHsgcmVjb3JkID0gb3B0aW9ucy5iZWZvcmVDcmVhdGUocmVjb3JkKSB9XG4gICAgICByZXR1cm4gb3BlbkVkaXREaWFsb2dGb3IocmVjb3JkKVxuICAgIH1cblxuICAgIC8vIEdlbmVyaWMgbWV0aG9kIGZvciBkZWxldGluZyBhIHJlY29yZFxuICAgIHJldHVybiAkc2NvcGUuZGVsZXRlUmVjb3JkID0gaWQgPT4gQ29uZmlybWF0aW9uRGlhbG9nU2Vydi5vcGVuKCkudGhlbihmdW5jdGlvbihjb25maXJtZWQpIHtcbiAgICAgIGlmICghY29uZmlybWVkKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSBSZXNvdXJjZS5kZWxldGUoeyBpZCB9KS4kcHJvbWlzZVxuXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVjb3JkKSB7XG4gICAgICAgICRsb2cuZGVidWcoYFJlY29yZCBkZWxldGVkICR7cmVjb3JkLmlkfWApXG4gICAgICAgIHJldHVybiBnZXRHcmlkKCkucmVtb3ZlUm93KHJlY29yZC5pZClcbiAgICAgIH0pXG5cbiAgICAgIHByb21pc2UuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgYWxlcnRzLmVycm9yKHJlc3BvbnNlLmRhdGEubWVzc2FnZSlcbiAgICAgICAgcmV0dXJuICRsb2cuZXJyb3IoJ0Nhbm5vdCBkZWxldGUgYSByZXNvdXJjZScsIHJlc3BvbnNlKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHByb21pc2VcbiAgICB9KVxuICB9XG5dKVxuIiwiaW1wb3J0IFwiYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3NcIlxuaW1wb3J0IFwiZm9udC1hd2Vzb21lL2Nzcy9mb250LWF3ZXNvbWUuY3NzXCJcbmltcG9ydCBcInRpLWljb25zL2Nzcy90aGVtaWZ5LWljb25zLmNzc1wiXG5pbXBvcnQgJ3BlcmZlY3Qtc2Nyb2xsYmFyL2Nzcy9wZXJmZWN0LXNjcm9sbGJhci5jc3MnXG5pbXBvcnQgJ3RvYXN0ci9idWlsZC90b2FzdHIuY3NzJ1xuaW1wb3J0ICdzd2VldGFsZXJ0L2xpYi9zd2VldC1hbGVydC5jc3MnXG5pbXBvcnQgJ1NlbGVjdDIvc2VsZWN0Mi5jc3MnXG5pbXBvcnQgJ3NlbGVjdDItYm9vdHN0cmFwLWNzcy9zZWxlY3QyLWJvb3RzdHJhcC5jc3MnXG5pbXBvcnQgJ2FuZ3VsYXItbG9hZGluZy1iYXIvYnVpbGQvbG9hZGluZy1iYXIuY3NzJ1xuaW1wb3J0ICdhbmltYXRlLmNzcy9hbmltYXRlLmNzcydcbmltcG9ydCAndi1idXR0b24vZGlzdC92LWJ1dHRvbi5jc3MnXG5pbXBvcnQgJ2xhZGRhL2Rpc3QvbGFkZGEtdGhlbWVsZXNzLm1pbi5jc3MnXG5pbXBvcnQgJ2FuZ3VsYXIteGVkaXRhYmxlL2Rpc3QvY3NzL3hlZGl0YWJsZS5jc3MnXG4vLyBPTEQ/XG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcycgLy8gY2hhbmdlIHRvIHNjc3NcbmltcG9ydCAnLi4vLi4vY29tcG9uZW50cy9qcXVlcnktZmlsZS11cGxvYWQtYW5ndWxhci9jc3MvanF1ZXJ5LmZpbGV1cGxvYWQuY3NzJ1xuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4vZ3JpZHpNb2R1bGUnXG5pbXBvcnQgJy4vZ3JpZFBhZ2VyQ3RybE1peGluJ1xuaW1wb3J0ICcuL3NlcnZpY2VzL0FjdGlvblBvcHVwSGFuZGxlcidcbmltcG9ydCAnLi9zZXJ2aWNlcy9BcHBseUZvcm1hdHRlcnNTZXJ2J1xuaW1wb3J0ICcuL3NlcnZpY2VzL0V4Y2VsRXhwb3J0U2VydidcbmltcG9ydCAnLi9zZXJ2aWNlcy9GbGF0dGVuU2VydidcbmltcG9ydCAnLi9zZXJ2aWNlcy9HcmlkTGlua1NlcnYnXG5cbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnQ29sdW1uc0NvbmZpZydcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnR3JpZERhdGFMb2FkZXInXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9hZ0dyaWRQbGFjZWhvbGRlcidcbmltcG9ydCAnLi9kaXJlY3RpdmVzL2FnR3JpZFF1aWNrU2VhcmNoJ1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdHcmlkWGxzRXhwb3J0J1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdOZXdCdXR0b24nXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9hZ1JlbG9hZEdyaWQnXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9hZ1Jlc2V0U29ydEdyaWQnXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9ncmlkQ3J1ZCdcbmltcG9ydCAnLi9kaXJlY3RpdmVzL3NlYXJjaCdcblxuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdHcmlkL2dyaWR6J1xuaW1wb3J0ICcuL2RpcmVjdGl2ZXMvYWdHcmlkL2FnR3JpZHonXG5pbXBvcnQgJy4vZGlyZWN0aXZlcy9hZ0dyaWQvYWdHcmlkQ3RybCdcblxuZXhwb3J0IGRlZmF1bHQgZ3JpZHpNb2R1bGVcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgY29tbW9uTW9kdWxlIGZyb20gJy4vY29tbW9uTW9kdWxlJ1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKVxuXG4vLyBQZXJjZW50YWdlIGZpbHRlciwgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3ZwZWdhZG8vYW5ndWxhci1wZXJjZW50YWdlLWZpbHRlclxuYXBwLmZpbHRlcigncGVyY2VudGFnZScsICgpID0+IGZ1bmN0aW9uKGlucHV0LCBkZWNpbWFscywgc3VmZml4KSB7XG4gIGRlY2ltYWxzID0gYW5ndWxhci5pc051bWJlcihkZWNpbWFscykgPyBkZWNpbWFscyA6IDJcbiAgc3VmZml4ID0gc3VmZml4IHx8ICclJ1xuICBpZiAoIWlzRmluaXRlKGlucHV0KSB8fCAoaW5wdXQgPT09ICcnKSkge1xuICAgIHJldHVybiAnJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoTWF0aC5yb3VuZChpbnB1dCAqIE1hdGgucG93KDEwLCBkZWNpbWFscyArIDIpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgc3VmZml4XG4gIH1cbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgQmFzZUN0cmwgZnJvbSAnLi4vLi4vdXRpbHMvQmFzZUN0cmwnXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8gT3BlbnMgYSBtb2RhbCBkaWFsb2cgd2l0aCBlbWJlZGRlZCBnZW5lcmljIGZvcm0gZm9yXG4vLyBjcmVhdGUgb3IgdXBkYXRlIHJlY29yZFxuZm9ybXMuZmFjdG9yeSgnRm9ybURpYWxvZ1NlcnYnLCBbXG4gICckdWliTW9kYWwnLCAncGF0aFdpdGhDb250ZXh0JyxcbiAgKCRtb2RhbCwgcGF0aFdpdGhDb250ZXh0KSA9PiAoe1xuICAgIG9wZW4odGVtcGxhdGVVcmwsIGRpYWxvZ09wdGlvbnMpIHtcbiAgICAgIGxldCBzY29wZSwgdGVtcGxhdGVcbiAgICAgIGlmIChkaWFsb2dPcHRpb25zID09IG51bGwpIHsgZGlhbG9nT3B0aW9ucyA9IHt9IH1cbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChkaWFsb2dPcHRpb25zLnNjb3BlKSkgeyAoeyBzY29wZSB9ID0gZGlhbG9nT3B0aW9ucykgfVxuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGRpYWxvZ09wdGlvbnMuc2NvcGUpKSB7ICh7IHRlbXBsYXRlIH0gPSBkaWFsb2dPcHRpb25zKSB9XG5cbiAgICAgIHJldHVybiAkbW9kYWwub3Blbih7XG4gICAgICAgIC8vdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogcGF0aFdpdGhDb250ZXh0KHRlbXBsYXRlVXJsP3RlbXBsYXRlVXJsOlwiXCIpLFxuICAgICAgICBjb250cm9sbGVyOiAnRm9ybURpYWxvZ0N0cmwnLFxuICAgICAgICBrZXlib2FyZDogZmFsc2UsIC8vIGRvIG5vdCBjbG9zZSB0aGUgZGlhbG9nIHdpdGggRVNDIGtleVxuICAgICAgICBiYWNrZHJvcDogJ3N0YXRpYycsIC8vIGRvIG5vdCBjbG9zZSBvbiBjbGljayBvdXRzaWRlIG9mIHRoZSBkaWFsb2dcbiAgICAgICAgc2NvcGUsXG5cbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgIGRpYWxvZ09wdGlvbnMoKSB7IHJldHVybiBkaWFsb2dPcHRpb25zIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5dKVxuXG4vLyBHZW5lcmljIGNvbnRyb2xsZXIgZm9yIGZvcm1zIGluc2lkZSBtb2RhbCBkaWFsb2dzXG5jbGFzcyBGb3JtRGlhbG9nQ3RybCBleHRlbmRzIEJhc2VDdHJsIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpXG4gICAgLyoge1xuICAgICAgLy8gSGFjazogdHJpY2sgQmFiZWwvVHlwZVNjcmlwdCBpbnRvIGFsbG93aW5nIHRoaXMgYmVmb3JlIHN1cGVyLlxuICAgICAgaWYgKGZhbHNlKSB7IHN1cGVyKCkgfVxuICAgICAgbGV0IHRoaXNGbiA9ICgoKSA9PiB7IHJldHVybiB0aGlzIH0pLnRvU3RyaW5nKClcbiAgICAgIGxldCB0aGlzTmFtZSA9IHRoaXNGbi5tYXRjaCgvcmV0dXJuICg/Ol9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcXCgpKihcXHcrKVxcKSo7LylbMV1cbiAgICAgIGV2YWwoYCR7dGhpc05hbWV9ID0gdGhpcztgKVxuICAgIH0gKi9cbiAgICB0aGlzLmNsb3NlRGlhbG9nID0gdGhpcy5jbG9zZURpYWxvZy5iaW5kKHRoaXMpXG4gICAgdGhpcy5zYXZlID0gdGhpcy5zYXZlLmJpbmQodGhpcylcbiAgICB0aGlzLmRlbGV0ZSA9IHRoaXMuZGVsZXRlLmJpbmQodGhpcylcbiAgfVxuXG4gIHN0YXRpYyBpbml0Q2xhc3MoKSB7XG4gICAgdGhpcy5yZWdpc3Rlcihmb3JtcywgJ0Zvcm1EaWFsb2dDdHJsJylcbiAgICB0aGlzLmluamVjdCgnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJGxvZycsICckdWliTW9kYWxJbnN0YW5jZScsICdkaWFsb2dPcHRpb25zJylcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgLy8gQXNzaWduIGRpYWxvZyBvcHRpb25zIHRvIHRoZSBzY29wZVxuICAgIHRoaXMuJHNjb3BlLmRpYWxvZ09wdGlvbnMgPSB0aGlzLmRpYWxvZ09wdGlvbnM7XG4gICAgKHsgcmVjb3JkOiB0aGlzLnJlY29yZCwgZ3JpZDogdGhpcy5ncmlkIH0gPSB0aGlzLiRzY29wZS5kaWFsb2dPcHRpb25zKVxuXG4gICAgLy8gYXNzaWduIHRoZSBnaXZlbiByZXNvdXJjZSB0byB0aGUgc2NvcGUgdW5kZXIgaXRzIG5hbWVcbiAgICBjb25zdCByZXNvdXJjZU5hbWUgPSBhbmd1bGFyLmlzRnVuY3Rpb24odGhpcy5yZWNvcmQucmVzb3VyY2VOYW1lKSA/IHRoaXMucmVjb3JkLnJlc291cmNlTmFtZSgpIDogJ3JlY29yZCdcbiAgICB0aGlzLiRzY29wZVtyZXNvdXJjZU5hbWVdID0gdGhpcy5yZWNvcmRcbiAgICBpZiAodGhpcy4kc2NvcGUuZGlhbG9nT3B0aW9ucy5leHBvc2VSZWNvcmRUb1Njb3BlKSB7IHRoaXMuJHNjb3BlLiRwYXJlbnRbcmVzb3VyY2VOYW1lXSA9IHRoaXMucmVjb3JkIH1cblxuICAgIHJldHVybiB0aGlzLmV4cG9zZSh0aGlzLiRzY29wZSwgJ2Nsb3NlRGlhbG9nJywgJ3NhdmUnLCAnZGVsZXRlJylcbiAgfVxuXG4gIC8vIENsb3NlcyB0aGUgZGlhbG9nXG4gIGNsb3NlRGlhbG9nKCkge1xuICAgIHRoaXMuJGxvZy5pbmZvKCdbYWddIGNsb3NpbmcgdGhlIGRpYWxvZycpXG4gICAgcmV0dXJuIHRoaXMuJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UodGhpcy5yZWNvcmQpXG4gIH1cblxuICAvLyBJZiBmb3JtIGlzIHZhbGlkIHBlcmZvcm1zIHNlcnZlciBzaWRlIHVwZGF0ZVxuICBzYXZlKHJlY29yZCkge1xuICAgIGNvbnN0IHByb21pc2UgPSByZWNvcmQuc2F2ZSgpLiRwcm9taXNlXG5cbiAgICBwcm9taXNlLnRoZW4ocmVjb3JkID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdbYWddIHJlY29yZCBoYXMgYmVlbiB1cGRhdGVkL2NyZWF0ZWQnLCByZWNvcmQpXG5cbiAgICAgIHRoaXMuZ3JpZC5zYXZlUm93KHJlY29yZC5pZCwgcmVjb3JkKVxuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlLmNsb3NlRGlhbG9nKClcbiAgICB9KVxuXG4gICAgcmV0dXJuIFtwcm9taXNlLCByZWNvcmRdXG4gIH1cblxuICAvLyBQZXJmb3JtcyBzZXJ2ZXIgc2lkZSBkZWxldGVcbiAgZGVsZXRlKCkge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnJlY29yZC5kZWxldGUoKS4kcHJvbWlzZVxuXG4gICAgcHJvbWlzZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuJGxvZy5pbmZvKCdbYWddIHJlY29yZCBoYXMgYmVlbiBkZWxldGVkJywgcmVzcG9uc2UpXG5cbiAgICAgIHRoaXMuZ3JpZC5yZW1vdmVSb3cocmVzcG9uc2UuaWQpXG4gICAgICByZXR1cm4gdGhpcy4kc2NvcGUuY2xvc2VEaWFsb2coKVxuICAgIH0pXG5cbiAgICBwcm9taXNlLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiB0aGlzLiRsb2cuZXJyb3IoJ1thZ10gc29tZXRoaW5nIHdlbnQgd3JvbmcnLCByZXNwb25zZSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxufVxuRm9ybURpYWxvZ0N0cmwuaW5pdENsYXNzKClcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgYWdQYXRoV2l0aENvbnRleHQgZnJvbSAnLi9zY3JpcHRzL3BhdGhXaXRoQ29udGV4dCdcbmltcG9ydCByZXNvdXJjZVN1cHBvcnQgZnJvbSAnLi9zY3JpcHRzL3Jlc291cmNlU3VwcG9ydCdcbmltcG9ydCBhZ0NvbW1vbiBmcm9tICcuL3NjcmlwdHMvY29tbW9uJ1xuaW1wb3J0IGFnU2VsZWN0MiBmcm9tICcuL3NjcmlwdHMvc2VsZWN0MidcbmltcG9ydCBmb3JtcyBmcm9tICcuL3NjcmlwdHMvZm9ybXMnXG5pbXBvcnQgZ3JpZHogZnJvbSAnLi9zY3JpcHRzL2dyaWR6J1xuaW1wb3J0IGFsZXJ0c01vZCBmcm9tICcuL3NjcmlwdHMvYWxlcnRzJ1xuXG52YXIgYWdtb2QgPSBhbmd1bGFyLm1vZHVsZSgnYW5nbGVHcmluZGVyJywgW1xuICByZXNvdXJjZVN1cHBvcnQsXG4gIGFnU2VsZWN0MixcbiAgYWdDb21tb24sXG4gIGFnUGF0aFdpdGhDb250ZXh0LFxuICBncmlkeixcbiAgZm9ybXMsXG4gIGFsZXJ0c01vZFxuXSlcblxuZXhwb3J0IGRlZmF1bHQgYWdtb2QubmFtZVxuXG5hZ21vZC5jb25maWcoW1xuICAnJGh0dHBQcm92aWRlcicsICdwYXRoV2l0aENvbnRleHRQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIsIHBhdGhXaXRoQ29udGV4dFByb3ZpZGVyKSB7XG4gICAgLy8gSW50ZXJjZXB0IGFsbCBodHRwIGVycm9yc1xuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2h0dHBFcnJvcnNJbnRlcmNlcHRvcicpXG5cbiAgICAvLyBDb25maWd1cmUgdGhlIGNvbnRleHQgcGF0aFxuICAgIHZhciBjb250ZXh0UGF0aCA9ICQoJ2JvZHknKS5kYXRhKCdjb250ZXh0LXBhdGgnKVxuICAgIGlmIChjb250ZXh0UGF0aCAhPSBudWxsKSB7XG4gICAgICBwYXRoV2l0aENvbnRleHRQcm92aWRlci5zZXRDb250ZXh0UGF0aChjb250ZXh0UGF0aClcbiAgICB9XG4gIH1cbl0pXG5cbi8vIEludGVyY2VwdHMgYWxsIEhUVFAgZXJyb3JzIGFuZCBkaXNwbGF5cyBhIGZsYXNoIG1lc3NhZ2VcbmFnbW9kLmZhY3RvcnkoJ2h0dHBFcnJvcnNJbnRlcmNlcHRvcicsIFtcbiAgJyRpbmplY3RvcicsICckcScsICdhbGVydHMnLCBmdW5jdGlvbigkaW5qZWN0b3IsICRxLCBhbGVydHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZVxuICAgICAgfSxcbiAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UsIF9yZWZcbiAgICAgICAgdmFyIGdlbmVyaWNFcnJvck1lc3NhZ2UgPSAocmVzcG9uc2Uuc3RhdHVzVGV4dCA/IHJlc3BvbnNlLnN0YXR1c1RleHQgOiAnVW5leHBlY3RlZCBIVFRQIGVycm9yJykgKyAnICcgKyByZXNwb25zZS5zdGF0dXMgKyAnIDogJyArIHJlc3BvbnNlLmNvbmZpZy51cmxcbiAgICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLmRhdGFcblxuICAgICAgICBpZiAocmVzcG9uc2VEYXRhID09IG51bGwpIGVycm9yTWVzc2FnZSA9IGdlbmVyaWNFcnJvck1lc3NhZ2VcbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VEYXRhLmVycm9yICE9IG51bGwpIGVycm9yTWVzc2FnZSA9IHJlc3BvbnNlRGF0YS5lcnJvclxuICAgICAgICBlbHNlIGlmIChyZXNwb25zZURhdGEubWVzc2FnZSAhPSBudWxsKSBlcnJvck1lc3NhZ2UgPSByZXNwb25zZURhdGEubWVzc2FnZVxuICAgICAgICBlbHNlIGVycm9yTWVzc2FnZSA9IGdlbmVyaWNFcnJvck1lc3NhZ2VcblxuICAgICAgICAvLyAuLnNraXAgdmFsaWRhdGlvbiBhbmQgYXV0aCBlcnJvcnNcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gNDIyICYmIHJlc3BvbnNlLnN0YXR1cyAhPT0gNDAxKSB7XG4gICAgICAgICAgYWxlcnRzLmVycm9yKGVycm9yTWVzc2FnZSlcbiAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4gICAgICB9XG4gICAgfVxuICB9XG5dKVxuXG4vLyBDYXRjaCBhbGwganF1ZXJ5IHhociBlcnJvcnNcbmFnbW9kLnJ1bihbXG4gICckbG9nJywgJ2FsZXJ0cycsIGZ1bmN0aW9uKCRsb2csIGFsZXJ0cykge1xuICAgIHJldHVybiAkKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oZXZlbnQsIGpxeGhyLCBzZXR0aW5ncywgZXhjZXB0aW9uKSB7XG4gICAgICAkbG9nLmVycm9yKCdOZXR3b3JrIGVycm9yOicsIGV2ZW50LCBqcXhociwgc2V0dGluZ3MsIGV4Y2VwdGlvbilcbiAgICAgIHJldHVybiBhbGVydHMuZXJyb3IoZXhjZXB0aW9uKVxuICAgIH0pXG4gIH1cbl0pXG5cbmFnbW9kLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgW1xuICAnJHNjb3BlJywgJyRodHRwJywgJ3VpR3JpZENvbnN0YW50cycsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsIHVpR3JpZENvbnN0YW50cykge1xuICAgIHZhciBwYWdpbmF0aW9uT3B0aW9ucyA9IHtcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXG4gICAgICBwYWdlU2l6ZTogMjUsXG4gICAgICBzb3J0OiBudWxsXG4gICAgfVxuXG4gICAgJHNjb3BlLmdyaWRPcHRpb25zID0ge1xuICAgICAgcGFnaW5hdGlvblBhZ2VTaXplczogWzI1LCA1MCwgNzVdLFxuICAgICAgcGFnaW5hdGlvblBhZ2VTaXplOiAyNSxcbiAgICAgIHVzZUV4dGVybmFsUGFnaW5hdGlvbjogdHJ1ZSxcbiAgICAgIHVzZUV4dGVybmFsU29ydGluZzogdHJ1ZSxcbiAgICAgIGNvbHVtbkRlZnM6IFtcbiAgICAgICAgeyBuYW1lOiAnbmFtZScgfSxcbiAgICAgICAgeyBuYW1lOiAnZ2VuZGVyJywgZW5hYmxlU29ydGluZzogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiAnY29tcGFueScsIGVuYWJsZVNvcnRpbmc6IGZhbHNlIH1cbiAgICAgIF0sXG4gICAgICBvblJlZ2lzdGVyQXBpOiBmdW5jdGlvbihncmlkQXBpKSB7XG4gICAgICAgICRzY29wZS5ncmlkQXBpID0gZ3JpZEFwaVxuICAgICAgICAkc2NvcGUuZ3JpZEFwaS5jb3JlLm9uLnNvcnRDaGFuZ2VkKCRzY29wZSwgZnVuY3Rpb24oZ3JpZCwgc29ydENvbHVtbnMpIHtcbiAgICAgICAgICBpZiAoc29ydENvbHVtbnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb25PcHRpb25zLnNvcnQgPSBudWxsXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb25PcHRpb25zLnNvcnQgPSBzb3J0Q29sdW1uc1swXS5zb3J0LmRpcmVjdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgICBnZXRQYWdlKClcbiAgICAgICAgfSlcbiAgICAgICAgZ3JpZEFwaS5wYWdpbmF0aW9uLm9uLnBhZ2luYXRpb25DaGFuZ2VkKCRzY29wZSwgZnVuY3Rpb24obmV3UGFnZSwgcGFnZVNpemUpIHtcbiAgICAgICAgICBwYWdpbmF0aW9uT3B0aW9ucy5wYWdlTnVtYmVyID0gbmV3UGFnZVxuICAgICAgICAgIHBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplID0gcGFnZVNpemVcbiAgICAgICAgICBnZXRQYWdlKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ2V0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHVybFxuICAgICAgc3dpdGNoIChwYWdpbmF0aW9uT3B0aW9ucy5zb3J0KSB7XG4gICAgICAgIGNhc2UgdWlHcmlkQ29uc3RhbnRzLkFTQzpcbiAgICAgICAgICB1cmwgPSAnL2RhdGEvMTAwX0FTQy5qc29uJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgdWlHcmlkQ29uc3RhbnRzLkRFU0M6XG4gICAgICAgICAgdXJsID0gJy9kYXRhLzEwMF9ERVNDLmpzb24nXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB1cmwgPSAnL2RhdGEvMTAwLmpzb24nXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgJGh0dHAuZ2V0KHVybClcbiAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICRzY29wZS5ncmlkT3B0aW9ucy50b3RhbEl0ZW1zID0gMTAwXG4gICAgICAgICAgdmFyIGZpcnN0Um93ID0gKHBhZ2luYXRpb25PcHRpb25zLnBhZ2VOdW1iZXIgLSAxKSAqIHBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplXG4gICAgICAgICAgJHNjb3BlLmdyaWRPcHRpb25zLmRhdGEgPSBkYXRhLnNsaWNlKGZpcnN0Um93LCBmaXJzdFJvdyArIHBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldFBhZ2UoKVxuICB9XG5dKVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCByZXNvdXJjZU1vZHVsZSBmcm9tICcuL3Jlc291cmNlTW9kdWxlJ1xuLy9pbXBvcnQgJy4vcmVzb3VyY2VCdWlsZGVyJ1xuaW1wb3J0ICcuL1Jlc291cmNlVGVtcGxhdGVTZXJ2J1xuaW1wb3J0ICcuL3Jlc3RyaWN0UmVzb3VyY2UnXG5pbXBvcnQgJy4vUm91dGVzU2VydidcblxuZXhwb3J0IGRlZmF1bHQgcmVzb3VyY2VNb2R1bGVcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IGdyaWR6ID0gYW5ndWxhci5tb2R1bGUoZ3JpZHpNb2R1bGUpXG5cbi8vIERpcmVjdGl2ZSB0byByZWxvYWQgZ3JpZCAtIGtlZXAgc2Nyb2xsaW5nIHBvc2l0aW9uIGFuZCBzZWxlY3Rpb25cbmdyaWR6LmRpcmVjdGl2ZSgnYWdSZWxvYWRHcmlkJywgW1xuICAoKSA9PiAoe1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcblxuICAgIC8vIGFzc2lnbiBncmlkIGluc3RhbmNlXG4gICAgc2NvcGU6IHtcbiAgICAgIGdyaWQ6ICc9Zm9yJ1xuICAgIH0sXG5cbiAgICBsaW5rKCRzY29wZSkge1xuICAgICAgcmV0dXJuICRzY29wZS5yZWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gU2F2ZSBpZCBvZiB0aGUgc2VsZWN0ZWQgcm93XG4gICAgICAgIGNvbnN0IHNlbFJvdyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuZ3JpZC5nZXRQYXJhbSgnc2Vscm93JykpXG4gICAgICAgIGNvbnN0IHNlbFJvd3MgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmdyaWQuZ2V0UGFyYW0oJ3NlbGFycnJvdycpKVxuICAgICAgICAvLyBTYXZlIGdyaWQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gJHNjb3BlLmdyaWQuZ2V0R3JpZEVsKCkuY2xvc2VzdCgnLnVpLWpxZ3JpZC1iZGl2Jykuc2Nyb2xsVG9wKClcblxuICAgICAgICAvLyBTb21lIGdyaWRzIG1heSBoYXZlIHNlbGVjdGlvbiBpbiBncmlkQ29tcGxldGUgc28gdG8gYmUgc3VyZSB0aGF0IGFmdGVyIHJlbG9hZCBncmlkIHdpbGwgaGF2ZSB0aGUgc2FtZSBzZWxlY3Rpb25cbiAgICAgICAgLy8gc2V0IGl0IGFmdGVyIGdyaWQgY29tcGxldGVcbiAgICAgICAgJHNjb3BlLmdyaWQuZ2V0R3JpZEVsKCkub24oJ2pxR3JpZEFmdGVyR3JpZENvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLmdyaWQuY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICAgIGlmICgkc2NvcGUuZ3JpZC5nZXRQYXJhbSgnbXVsdGlzZWxlY3QnKSkge1xuICAgICAgICAgICAgcmV0dXJuIF8uZWFjaChzZWxSb3dzLCBpZCA9PiAkc2NvcGUuZ3JpZC5nZXRHcmlkRWwoKS5qcUdyaWQoJ3NldFNlbGVjdGlvbicsIGlkKSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ncmlkLmdldEdyaWRFbCgpLmpxR3JpZCgnc2V0U2VsZWN0aW9uJywgc2VsUm93KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLy8ge2N1cnJlbnQ6IHRydWV9IC0gdXNlZCBmb3Iga2VlcCBtdWx0aSBzZWxlY3RcbiAgICAgICAgcmV0dXJuICRzY29wZS5ncmlkLnJlbG9hZChbeyBjdXJyZW50OiB0cnVlIH1dKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogJ1xcXG48YSBjbGFzcz1cImxpc3RcIiB1aWItdG9vbHRpcD1cIlJlbG9hZCBHcmlkXCIgbmctY2xpY2s9XCJyZWxvYWQoKVwiPjxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaFwiPjwvaT48L2E+XFxcbidcbiAgfSlcbl0pXG4iLCIvKlxuICogZGVjYWZmZWluYXRlIHN1Z2dlc3Rpb25zOlxuICogRFMxMDI6IFJlbW92ZSB1bm5lY2Vzc2FyeSBjb2RlIGNyZWF0ZWQgYmVjYXVzZSBvZiBpbXBsaWNpdCByZXR1cm5zXG4gKiBEUzIwNjogQ29uc2lkZXIgcmV3b3JraW5nIGNsYXNzZXMgdG8gYXZvaWQgaW5pdENsYXNzXG4gKiBGdWxsIGRvY3M6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZWNhZmZlaW5hdGUvZGVjYWZmZWluYXRlL2Jsb2IvbWFzdGVyL2RvY3Mvc3VnZ2VzdGlvbnMubWRcbiAqL1xuXG4vKiBAbmdJbmplY3QgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1DdHJsIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkbG9jYXRpb24sIG9yZykge1xuICAgICRzY29wZS5vcmcgPSBvcmc7XG5cbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uKGZvcm0sIG9yZykge1xuICAgICAgaWYgKGZvcm0uJGludmFsaWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgIGNvbnN0IG9uU3VjY2VzcyA9IG9yZyA9PiAkbG9jYXRpb24ucGF0aChgLyR7b3JnLmlkfWApO1xuXG4gICAgICBjb25zdCBvbkVycm9yID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZXJyb3JzXG4gICAgICAgICAgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5lZGl0Rm9ybS4kc2VydmVyRXJyb3JzID0gZXJyb3JzLm9yZztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG9yZy5zYXZlKHtzdWNjZXNzOiBvblN1Y2Nlc3MsIGVycm9yOiBvbkVycm9yfSk7XG4gICAgfTtcbiAgfVxufVxuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0ICcuL0NvbmZpcm1hdGlvbkRpYWxvZ1NlcnYnXG5pbXBvcnQgJy4vRW1iZWRkZWRKc29uU2VydidcbmltcG9ydCAnLi9Ob3RpZmljYXRpb25EaWFsb2dTZXJ2J1xuIiwiaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgbWl4aW4gPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxubWl4aW4uZmFjdG9yeSgnU2luZ2xlUGFnZUNydWRDdHJsTWl4aW4nLCBbXG4gICckbG9nJywgJyRsb2NhdGlvbicsICdEaWFsb2dDcnVkQ3RybE1peGluJyxcbiAgKCRsb2csICRsb2NhdGlvbiwgRGlhbG9nQ3J1ZEN0cmxNaXhpbikgPT4gZnVuY3Rpb24oJHNjb3BlLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkgeyBhcmdzID0ge30gfVxuICAgIGNvbnN0IHsgcmVzb3VyY2VQYXRoLCBncmlkTmFtZSwgUmVzb3VyY2UgfSA9IGFyZ3NcblxuICAgIC8vIGluY2x1ZGUgYGRlbGV0ZVJlY29yZGAgbWV0aG9kXG4gICAgRGlhbG9nQ3J1ZEN0cmxNaXhpbigkc2NvcGUsIHtcbiAgICAgIGdyaWROYW1lLFxuICAgICAgUmVzb3VyY2VcbiAgICB9XG4gICAgKVxuXG4gICAgLy8gdW5zZXQgYGNyZWF0ZVJlY29yZGAgbWV0aG9kIGZyb20gdGhlIHBhcmVudCBtaXhpblxuICAgICRzY29wZS5jcmVhdGVSZWNvcmQgPSBhbmd1bGFyLm5vb3BcblxuICAgIC8vIEdlbmVyaWMgbWV0aG9kIG5hdmlnYXRpbmcgdG8gdGhlIHNob3cgcmVjb3JkIHBhZ2VcbiAgICAkc2NvcGUuc2hvd1JlY29yZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICBjb25zdCBzaG93UmVjb3JkUGF0aCA9IFtyZXNvdXJjZVBhdGgsIGlkXS5qb2luKCcvJylcbiAgICAgIHJldHVybiAkbG9jYXRpb24ucGF0aChzaG93UmVjb3JkUGF0aClcbiAgICB9XG5cbiAgICAvLyBHZW5lcmljIG1ldGhvZCBuYXZpZ2F0aW5nIHRvIHRoZSBlZGl0IGl0ZW0gcGFnZVxuICAgIHJldHVybiAkc2NvcGUuZWRpdFJlY29yZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICBjb25zdCBlZGl0UmVjb3JkUGF0aCA9IFtyZXNvdXJjZVBhdGgsIGlkLCAnZWRpdCddLmpvaW4oJy8nKVxuICAgICAgcmV0dXJuICRsb2NhdGlvbi5wYXRoKGVkaXRSZWNvcmRQYXRoKVxuICAgIH1cbiAgfVxuXG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGZvcm1zTW9kdWxlKVxuXG4vLyBBYmlsaXR5IHRvIHByb3ZpZGUgY3VzdG9tIHRlbXBsYXRlIGRpcmVjdGx5IGluIHRoZSBET01cbmFwcC5kaXJlY3RpdmUoJ2VkaXRhYmxlQ3VzdG9tJywgW1xuICAnZWRpdGFibGVEaXJlY3RpdmVGYWN0b3J5JywgZnVuY3Rpb24oZWRpdGFibGVEaXJlY3RpdmVGYWN0b3J5KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gZWRpdGFibGVEaXJlY3RpdmVGYWN0b3J5KHsgZGlyZWN0aXZlTmFtZTogJ2VkaXRhYmxlQ3VzdG9tJyB9KVxuXG4gICAgLy8gSGVyZSBiZSBkcmFnb25zLi4uXG4gICAgY29uc3QgeyBjb21waWxlIH0gPSByZXN1bHRcbiAgICByZXN1bHQuY29tcGlsZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIC8vIGZpbmQgdGVtcGxhdGUgZWxlbWVudCwgZ3JhYiBpdHMgaHRtbCBhbmQgcmVtb3ZlIGl0IGZyb20gdGhlIERPTVxuICAgICAgY29uc3QgdGVtcGxhdGVFbCA9IGVsZW1lbnQubmV4dCgnW2VkaXRhYmxlLWN1c3RvbS10ZW1wbGF0ZV0nKVxuICAgICAgY29uc3QgdHBsID0gdGVtcGxhdGVFbC5odG1sKClcbiAgICAgIHRlbXBsYXRlRWwucmVtb3ZlKClcblxuICAgICAgY29tcGlsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cbiAgICAgIC8vIG92ZXJyaWRlIGxpbmtpbmcgZnVuY3Rpb25cbiAgICAgIGNvbnN0IHsgbGluayB9ID0gcmVzdWx0XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIC8vIGFzc2lnbiBhIHRlbXBsYXRlIHRvIHRoZSBlZGl0YWJsZSBjb250cm9sbGVyXG4gICAgICAgIGNvbnN0IGVDdHJsID0gY3RybFswXVxuICAgICAgICBlQ3RybC5pbnB1dFRwbCA9IHRwbFxuXG4gICAgICAgIHJldHVybiBsaW5rLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGNvbW1vbk1vZHVsZSBmcm9tICcuL2NvbW1vbk1vZHVsZSdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IHsgaXNGYWxzeSB9IGZyb20gJ34vc2NyaXB0cy91dGlscy9pc0ZhbHN5J1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKVxuXG5hcHAucHJvdmlkZXIoJ2FnRGF0ZUZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAvLyBzZWUgaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL2ZpbHRlci9kYXRlXG4gIGxldCBkZWZhdWx0Rm9ybWF0ID0gJ01NTSBERCwgWVlZWSdcblxuICAvLyBTZXQgdGhlIGRlZmF1bHQgZGF0ZSBmb3JtYXRcbiAgLy8gd2hpY2ggd2lsbCBiZSB1c2VkIGFjcm9zcyB0aGUgd2hvbGUgYXBwbGljYXRpb24uXG4gIHJldHVybiB7XG4gICAgc2V0RGVmYXVsdEZvcm1hdChmb3JtYXQpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0Rm9ybWF0ID0gZm9ybWF0XG4gICAgfSxcblxuICAgICRnZXQ6IFtcbiAgICAgICckZmlsdGVyJywgKCRmaWx0ZXIpID0+IGZ1bmN0aW9uKGRhdGUsIHVzZVRpbWVab25lLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKHVzZVRpbWVab25lID09IG51bGwpIHsgdXNlVGltZVpvbmUgPSBmYWxzZSB9XG4gICAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkgeyBmb3JtYXQgPSBkZWZhdWx0Rm9ybWF0IH1cbiAgICAgICAgaWYgKGlzRmFsc3koZGF0ZSkpIHsgcmV0dXJuICcnIH1cblxuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpXG4gICAgICB9XG4gICAgXVxuICB9XG59KVxuXG4vLyByZW1vdmVzIHRpbWV6b25lIGFuZCBqdXN0IHVzZXMgeWVhcixtb250aCwgZGF5XG5hcHAuZmlsdGVyKCdsb2NhbERhdGUnLCBbJ2FnRGF0ZScsIChhZ0RhdGUpID0+IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmIChpc0ZhbHN5KGlucHV0KSkgeyByZXR1cm4gJycgfVxuICAvLyBpZ25vcmVzIHRoZSB0aW1lIHBhcnRcbiAgcmV0dXJuIG1vbWVudChpbnB1dCkuZm9ybWF0KGFnRGF0ZS5nZXRWaWV3Rm9ybWF0KCkpXG59XSlcblxuLy8gZGF0ZSB3aXRoIHRpbWUgYW5kIG5vIHRpbWV6b25lIGZvcm1hdGVkIHRvIHRoZSBtaW51dGVzXG5hcHAuZmlsdGVyKCdsb2NhbERhdGVUaW1lJywgKCkgPT4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgaWYgKGlzRmFsc3koaW5wdXQpKSB7IHJldHVybiAnJyB9XG4gIHJldHVybiBtb21lbnQudXRjKGlucHV0KS5mb3JtYXQoJ01NL0REL1lZWVkgaDptbWEnKVxufSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgcmVzb3VyY2VNb2R1bGUgZnJvbSAnLi9yZXNvdXJjZU1vZHVsZSdcbmltcG9ydCB7IGRlZXBEaWZmIH0gZnJvbSAnLi4vdXRpbHMvZGVlcERpZmYnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShyZXNvdXJjZU1vZHVsZSlcblxuYXBwLnZhbHVlKCdyZXF1aXJlZFJlc291cmNlRmllbGRzJywgWydpZCddKVxuXG5hcHAuZmFjdG9yeSgncmVzdHJpY3RSZXNvdXJjZScsIFtcbiAgJyRsb2cnLCAncmVzb3VyY2VCdWlsZGVyJywgJ3JlcXVpcmVkUmVzb3VyY2VGaWVsZHMnLFxuICAoJGxvZywgcmVzb3VyY2VCdWlsZGVyLCByZXF1aXJlZFJlc291cmNlRmllbGRzKSA9PiBmdW5jdGlvbihyZXNvdXJjZSwgYWxsb3dlZEZpZWxkcykge1xuICAgIGlmIChhbGxvd2VkRmllbGRzID09IG51bGwpIHsgYWxsb3dlZEZpZWxkcyA9IFtdIH1cbiAgICBhbmd1bGFyLmV4dGVuZChyZXNvdXJjZSwge1xuICAgICAgJGNhY2hlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNhY2hlZERhdGEgPSB0aGlzLnJlc291cmNlRGF0YSgpXG4gICAgICB9LFxuICAgICAgJHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IFJlY29yZCA9IHJlc291cmNlQnVpbGRlcih0aGlzLnJlc291cmNlUGF0aCgpKVxuICAgICAgICBjb25zdCBjYWNoZWQgPSBfLmNsb25lRGVlcCh0aGlzLiRjYWNoZWREYXRhKVxuICAgICAgICBjb25zdCByZWNvcmQgPSBuZXcgUmVjb3JkKGRlZXBEaWZmKGNhY2hlZCwgcmVzb3VyY2UucmVzb3VyY2VEYXRhKCksIGFsbG93ZWRGaWVsZHMsIHJlcXVpcmVkUmVzb3VyY2VGaWVsZHMpKVxuICAgICAgICByZWNvcmQuJHNhdmUoKVxuICAgICAgICB0aGlzLiRjYWNoZWREYXRhID0gXy5tZXJnZSh0aGlzLiRjYWNoZWREYXRhLCByZWNvcmQucmVzb3VyY2VEYXRhKCkpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9LFxuXG4gICAgICBzYXZlKCkge1xuICAgICAgICBjb25zdCBSZWNvcmQgPSByZXNvdXJjZUJ1aWxkZXIodGhpcy5yZXNvdXJjZVBhdGgoKSlcbiAgICAgICAgY29uc3QgcmVjb3JkID0gbmV3IFJlY29yZChkZWVwRGlmZih0aGlzLiRjYWNoZWREYXRhLCByZXNvdXJjZS5yZXNvdXJjZURhdGEoKSwgYWxsb3dlZEZpZWxkcywgcmVxdWlyZWRSZXNvdXJjZUZpZWxkcykpXG4gICAgICAgIHJlY29yZC5zYXZlKClcbiAgICAgICAgdGhpcy4kY2FjaGVkRGF0YSA9IF8ubWVyZ2UodGhpcy4kY2FjaGVkRGF0YSwgcmVjb3JkLnJlc291cmNlRGF0YSgpKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgfVxuICAgIH1cbiAgICApXG5cbiAgICByZXNvdXJjZS4kY2FjaGVEYXRhKClcbiAgICByZXR1cm4gcmVzb3VyY2VcbiAgfVxuXSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZm9ybXNNb2R1bGUgZnJvbSAnLi4vZm9ybXNNb2R1bGUnXG5cbi8vIEFkZHMgYnV0dG9uIGZvciBlZGl0YWJsZSBmb3JtIHRvIG1ha2UgdGhlIGZvcm0gdmlzYWJsZVxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGZvcm1zTW9kdWxlKVxuXG5hcHAuZGlyZWN0aXZlKCdlZGl0YWJsZVBhbmVsSGVhZGluZycsIFtcbiAgKCkgPT4gKHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgcmVwbGFjZTogdHJ1ZSxcblxuICAgIHNjb3BlOiB7IGZvcm06ICc9ZWRpdGFibGVQYW5lbEhlYWRpbmcnIH0sXG5cbiAgICB0ZW1wbGF0ZTogYFxcXG48ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxuICA8aDQgY2xhc3M9XCJwYW5lbC10aXRsZVwiPlxuICAgIDxzcGFuIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlxuICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInB1bGwtcmlnaHRcIlxuICAgICAgICBuZy1jbGljaz1cImZvcm0uJHNob3coKVwiXG4gICAgICAgIG5nLWlmPVwiIWZvcm0uJHZpc2libGVcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsLXNxdWFyZS1vXCI+PC9pPlxuICAgIDwvYT5cbiAgPC9oND5cbjwvZGl2PlxcXG5gXG4gIH0pXG5dKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi4vY29tbW9uTW9kdWxlJ1xuXG5hbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpLmRpcmVjdGl2ZSgndGFnSW5wdXQnLCAoKSA9PiAoe1xuICByZXN0cmljdDogJ0UnLFxuXG4gIHNjb3BlOiB7XG4gICAgdGFnczogJz1uZ01vZGVsJ1xuICB9LFxuXG4gIGxpbmsoJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICRzY29wZS50YWdWYWwgPSAnJ1xuICAgICRzY29wZS5zdHlsZSA9IGF0dHJzLnN0eWxlIHx8ICcnXG4gICAgJHNjb3BlLnBsYWNlaG9sZGVyID0gYXR0cnMucGxhY2Vob2xkZXJcbiAgICAkc2NvcGUuZGVmYXVsdFdpZHRoID0gJzEwcHgnXG5cbiAgICAkc2NvcGUudGFnQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkc2NvcGUudGFncyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBbXSB9XG4gICAgICByZXR1cm4gJHNjb3BlLnRhZ3Muc3BsaXQoJywnKS5maWx0ZXIodGFnID0+IHRhZyAhPT0gJycpXG4gICAgfVxuXG4gICAgJHNjb3BlLmFkZFRhZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCRzY29wZS50YWdWYWwubGVuZ3RoID09PSAwKSB7IHJldHVybiB9XG4gICAgICBjb25zdCB0YWdBcnJheSA9ICRzY29wZS50YWdBcnJheSgpXG4gICAgICBpZiAoIUFycmF5LmZyb20odGFnQXJyYXkpLmluY2x1ZGVzKCRzY29wZS50YWdWYWwpKSB7XG4gICAgICAgIHRhZ0FycmF5LnB1c2goJHNjb3BlLnRhZ1ZhbClcbiAgICAgICAgJHNjb3BlLnRhZ3MgPSB0YWdBcnJheS5qb2luKCcsJylcbiAgICAgIH1cbiAgICAgIHJldHVybiAkc2NvcGUudGFnVmFsID0gJydcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVsZXRlVGFnID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICBjb25zdCB0YWdBcnJheSA9ICRzY29wZS50YWdBcnJheSgpXG4gICAgICBpZiAoKHRhZ0FycmF5Lmxlbmd0aCA+IDApICYmICgkc2NvcGUudGFnVmFsLmxlbmd0aCA9PT0gMCkgJiYgKGtleSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICB0YWdBcnJheS5wb3AoKVxuICAgICAgfSBlbHNlIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgeyB0YWdBcnJheS5zcGxpY2Uoa2V5LCAxKSB9XG4gICAgICByZXR1cm4gJHNjb3BlLnRhZ3MgPSB0YWdBcnJheS5qb2luKCcsJylcbiAgICB9XG5cbiAgICAkc2NvcGUuJHdhdGNoKCd0YWdWYWwnLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKChuZXdWYWwgIT09IG9sZFZhbCkgfHwgKG5ld1ZhbCAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBjb25zdCB0ZW1wRWwgPSAkKCc8c3Bhbj4nICsgbmV3VmFsICsgJzwvc3Bhbj4nKS5hcHBlbmRUbygnYm9keScpXG4gICAgICAgICRzY29wZS5pbnB1dFdpZHRoID0gdGVtcEVsLndpZHRoKCkgKyA1XG4gICAgICAgIGlmICgkc2NvcGUuaW5wdXRXaWR0aCA8ICRzY29wZS5kZWZhdWx0V2lkdGgpIHsgJHNjb3BlLmlucHV0V2lkdGggPSAkc2NvcGUuZGVmYXVsdFdpZHRoIH1cbiAgICAgICAgcmV0dXJuIHRlbXBFbC5yZW1vdmUoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBlbGVtZW50LmJpbmQoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBjb25zdCBrZXkgPSBlLndoaWNoXG5cbiAgICAgIGlmICgoa2V5ID09PSA5KSB8fCAoa2V5ID09PSAxMykpIHsgZS5wcmV2ZW50RGVmYXVsdCgpIH1cbiAgICAgIGlmIChrZXkgPT09IDgpIHsgcmV0dXJuICRzY29wZS4kYXBwbHkoJ2RlbGV0ZVRhZygpJykgfVxuICAgIH0pXG5cbiAgICBlbGVtZW50LmJpbmQoJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgY29uc3Qga2V5ID0gZS53aGljaFxuXG4gICAgICAvLyBUYWIsIEVudGVyIG9yICwgcHJlc3NlZFxuICAgICAgaWYgKChrZXkgPT09IDkpIHx8IChrZXkgPT09IDEzKSB8fCAoa2V5ID09PSAxODgpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICByZXR1cm4gJHNjb3BlLiRhcHBseSgnYWRkVGFnKCknKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZWxlbWVudC5iaW5kKCdmb2N1c291dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgcmV0dXJuICRzY29wZS4kYXBwbHkoJ2FkZFRhZygpJylcbiAgICB9KVxuICB9LFxuXG4gIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J3RhZ2dlZC1pbnB1dCc+PGRpdiBjbGFzcz0ndGFnJyBuZy1yZXBlYXQ9XFxcInRhZyBpbiB0YWdBcnJheSgpIHRyYWNrIGJ5ICRpbmRleFxcXCI+PGEgaHJlZj0namF2YXNjcmlwdDonIGNsYXNzPSdkZWxldGUtdGFnJyBuZy1jbGljaz0nZGVsZXRlVGFnKCRpbmRleCknPjxpIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZSc+PC9pPjwvYT57e3RhZ319PC9kaXY+PGlucHV0IHR5cGU9J3RleHQnIHN0eWxlPSd3aWR0aDogIHt7aW5wdXRXaWR0aH19JyBuZy1tb2RlbD0ndGFnVmFsJyBwbGFjZWhvbGRlcj0ne3twbGFjZWhvbGRlcn19Jy8+PC9kaXY+XCJcbn0pKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi4vY29tbW9uTW9kdWxlJ1xuXG4vLyBNYWtlcyBpdCBwb3NzaWJsZSB0byByZWZlcmVuY2UgZW1iZWRkZWQganNvbiBmcm9tIGh0bWwgaW50byBhbmd1bGFyIGNvbnRyb2xsZXJzXG5hbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpLmZhY3RvcnkoJ0VtYmVkZGVkSnNvblNlcnYnLCBbJyRkb2N1bWVudCcsICRkb2N1bWVudCA9PiBmdW5jdGlvbihuYW1lKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gXCJzY3JpcHRbdHlwZT0nYXBwbGljYXRpb24vZW1iZWRkZWQtanNvbiddW25hbWU9J1wiICsgbmFtZSArIFwiJ11cIlxuICBjb25zdCBub2RlID0gJChzZWxlY3RvcilcbiAgbGV0IHZhbFxuICBpZiAobm9kZS5sZW5ndGggPiAwKSB7XG4gICAgdmFsID0gYW5ndWxhci5mcm9tSnNvbihub2RlWzBdLmlubmVySFRNTC5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJykpXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuZm9ybXMuZGlyZWN0aXZlKCdhdXRvZmlsbFByZXZlbnQnLCBbXG4gICckcGFyc2UnLCAkcGFyc2UgPT4gKHtcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG5cbiAgICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgbmdNb2RlbCkge1xuICAgIC8vIEJpbmRzIGZvY3VzIGV2ZW50IHRvIGVsZW1lbnRcbiAgICAgIGVsZW0uYmluZCgnZm9jdXMnLCAoKSA9PiBzY29wZS5oYXNCZWVuRm9jdXNlZCA9IHRydWUpXG5cbiAgICAgIC8vIExpc3RlbiB0byBhbnkgY2hhbmdlcyBpbiB2aWV3XG4gICAgICByZXR1cm4gbmdNb2RlbC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXNjb3BlLmhhc0JlZW5Gb2N1c2VkKSB7XG4gICAgICAgICAgcmV0dXJuICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIG5nTW9kZWwuJHNldFZpZXdWYWx1ZSgnJykpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG5dKVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBncmlkek1vZHVsZSBmcm9tICcuLi9ncmlkek1vZHVsZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxudmFyIGdyaWR6ID0gYW5ndWxhci5tb2R1bGUoZ3JpZHpNb2R1bGUpXG5cbmNsYXNzIFhsc1RlbXBsYXRlQ2xhc3Mge1xuICBjb25zdHJ1Y3Rvcigkd2luZG93KSB7XG4gICAgY29uc3QgZm4gPSBmdW5jdGlvbihwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtID09IG51bGwpIHsgcGFyYW0gPSB7IHdvcmtzaGVldDogJ1dvcmtzaGVldCcgfSB9XG4gICAgICBjb25zdCB7IHdvcmtzaGVldCwgdGFibGUgfSA9IHBhcmFtXG4gICAgICByZXR1cm4gJHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChgXFxcbjxodG1sIHhtbG5zOm89XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpvZmZpY2VcIlxuICB4bWxuczp4PVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6ZXhjZWxcIlxuICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy1odG1sNDBcIj5cbjxoZWFkPlxuPCEtLVtpZiBndGUgbXNvIDldPlxuPHhtbD5cbjx4OkV4Y2VsV29ya2Jvb2s+XG4gIDx4OkV4Y2VsV29ya3NoZWV0cz5cbiAgICAgIDx4OkV4Y2VsV29ya3NoZWV0PlxuICAgICAgPHg6TmFtZT4ke3dvcmtzaGVldH08L3g6TmFtZT5cbiAgICAgIDx4OldvcmtzaGVldE9wdGlvbnM+XG4gICAgICAgIDx4OkRpc3BsYXlHcmlkbGluZXMvPlxuICAgICAgPC94OldvcmtzaGVldE9wdGlvbnM+XG4gICAgPC94OkV4Y2VsV29ya3NoZWV0PlxuICA8L3g6RXhjZWxXb3Jrc2hlZXRzPlxuPC94OkV4Y2VsV29ya2Jvb2s+XG48L3htbD5cbjwhW2VuZGlmXS0tPlxuPC9oZWFkPlxuPGJvZHk+XG48dGFibGU+JHt0YWJsZX08L3RhYmxlPlxuPC9ib2R5PlxuPC9odG1sPlxcXG5gKSkpXG4gICAgfVxuICAgIHJldHVybiBmblxuICB9XG59XG5YbHNUZW1wbGF0ZUNsYXNzLiRpbmplY3QgPSBbJyR3aW5kb3cnXVxuLy8gWExTIHRlbXBsYXRlIGZvdCBleGNlbCBleHBvcnRcbmdyaWR6LnNlcnZpY2UoJ3hsc1RlbXBsYXRlJywgWGxzVGVtcGxhdGVDbGFzcylcblxuY2xhc3MgR3JpZERhdGFDbGFzcyB7XG4gIGNvbnN0cnVjdG9yKCRkb2N1bWVudCwgJHNhbml0aXplKSB7XG4gICAgY29uc3QgZmluZEdyaWRFbCA9IGdyaWRJZCA9PiAkZG9jdW1lbnQuZmluZChgZGl2I2dib3hfJHtncmlkSWR9YClcblxuICAgIGNvbnN0IHByZXBhcmVIZWFkaW5nID0gZnVuY3Rpb24oZ3JpZElkKSB7XG4gICAgICBjb25zdCBncmlkRWwgPSBmaW5kR3JpZEVsKGdyaWRJZClcblxuICAgICAgLy8gZ2V0IHRoZSBncmlkJ3MgaGVhZGluZ1xuICAgICAgY29uc3QgZWwgPSBncmlkRWwuZmluZCgnLnVpLWpxZ3JpZC1oYm94IHRhYmxlJykuY2xvbmUoKVxuXG4gICAgICAvLyByZW1vdmUgdW5uZWNlc3NhcnkgY29sdW1uc1xuICAgICAgZWwuZmluZChgdGgjJHtncmlkSWR9X2NiYCkucmVtb3ZlKClcbiAgICAgIGVsLmZpbmQoYHRoIyR7Z3JpZElkfV8tcm93X2FjdGlvbl9jb2xgKS5yZW1vdmUoKVxuICAgICAgZWwuZmluZChcInRyW3N0eWxlKj0nZGlzcGxheTpub25lJ11cIikucmVtb3ZlKClcblxuICAgICAgLy8gU3RyaXAgdW5uZWNlc3Nhcnkgd2hpdGUgc3BhY2VzIGZyb20gdGhlIGhlYWRlcnNcbiAgICAgIGVsLmZpbmQoJ3RoJykuZWFjaChmdW5jdGlvbihpbmRleCwgdGgpIHtcbiAgICAgICAgY29uc3QgdGhFbCA9ICQodGgpXG4gICAgICAgIHJldHVybiB0aEVsLmh0bWwodGhFbC50ZXh0KCkudHJpbSgpKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGVsLmh0bWwoKVxuICAgIH1cblxuICAgIGNvbnN0IHByZXBhcmVSb3dzID0gZnVuY3Rpb24oZ3JpZElkLCBzZWxlY3RlZElkcykge1xuICAgICAgY29uc3QgZ3JpZEVsID0gZmluZEdyaWRFbChncmlkSWQpXG5cbiAgICAgIC8vIGdldCB0aGUgZ3JpZCdzIHRhYmxlIGh0bWwgY29udGVudFxuICAgICAgY29uc3QgZWwgPSBncmlkRWwuZmluZChgIyR7Z3JpZElkfWApLmNsb25lKClcblxuICAgICAgLy8gcmVtb3ZlIHRoZSBmaXJzdCByb3dcbiAgICAgIGVsLmZpbmQoJ3RyLmpxZ2ZpcnN0cm93JykucmVtb3ZlKClcbiAgICAgIC8vIHJlbW92ZSBhY3Rpb24gY29sdW1uIGFuZCBjaGVja2JveGVzXG4gICAgICBlbC5maW5kKGB0ZFthcmlhLWRlc2NyaWJlZGJ5PScke2dyaWRJZH1fY2InXWApLnJlbW92ZSgpXG4gICAgICBlbC5maW5kKGB0ZFthcmlhLWRlc2NyaWJlZGJ5PScke2dyaWRJZH1fLXJvd19hY3Rpb25fY29sJ11gKS5yZW1vdmUoKVxuICAgICAgLy8gdW53cmFwIGFsbCBsaW5rc1xuICAgICAgZWwuZmluZCgndGQgYScpLmNvbnRlbnRzKCkudW53cmFwKClcblxuICAgICAgLy8gaW5jbHVkZSBvbmx5IHNlbGVjdGVkIHJvd3Mgb3RoZXJ3aXNlIGV4cG9ydCBldmVyeXRoaW5nXG4gICAgICBpZiAoc2VsZWN0ZWRJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbC5maW5kKCd0cicpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHRyKSB7XG4gICAgICAgICAgY29uc3Qgcm93RWwgPSAkKHRyKVxuXG4gICAgICAgICAgY29uc3QgaWQgPSByb3dFbC5hdHRyKCdpZCcpXG4gICAgICAgICAgaWYgKCFfLmluY2x1ZGVzKHNlbGVjdGVkSWRzLCBpZCkpIHsgcmV0dXJuIGVsLmZpbmQoYHRyIyR7aWR9YCkucmVtb3ZlKCkgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWwuaHRtbCgpXG4gICAgfVxuXG4gICAgLy8gYnVpbGQgdGhlIHJlc3VsdFxuICAgIHJldHVybiBmdW5jdGlvbihncmlkSWQsIHNlbGVjdGVkUm93cykge1xuICAgICAgY29uc3QgcmVzdWx0RWwgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JylcbiAgICAgIHJlc3VsdEVsLmFwcGVuZChwcmVwYXJlSGVhZGluZyhncmlkSWQpKVxuICAgICAgcmVzdWx0RWwuYXBwZW5kKHByZXBhcmVSb3dzKGdyaWRJZCwgc2VsZWN0ZWRSb3dzKSlcblxuICAgICAgLy8gcmVtb3ZlIHVubmVjZXNzYXJ5IGh0bWwgYXR0cmlidXRlc1xuICAgICAgY29uc3QgYXR0cnNUb1JlbW92ZSA9IFsnaWQnLCAnY2xhc3MnLCAnc3R5bGUnLCAndGl0bGUnLFxuICAgICAgICAnYXJpYS1kZXNjcmliZWRieScsICdhcmlhLWxhYmVsbGVkYnknLCAnYXJpYS1tdWx0aXNlbGVjdGFibGUnLFxuICAgICAgICAncm9sZScsICd0YWJpbmRleCcsICdzb3J0J11cbiAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGF0dHJzVG9SZW1vdmUpKSB7IHJlc3VsdEVsLmZpbmQoJyonKS5yZW1vdmVBdHRyKGF0dHIpIH1cblxuICAgICAgLy8gcmVtb3ZlIHVuc2FmZSBlbGVtZW50XG4gICAgICAvLyAkc2FuaXRpemUocmVzdWx0RWwuaHRtbCgpKSBUT0RPOmNoZWNrIGhvdyB3ZSBjYW4gY29uZmlndXJlIHRvIG5vdCBkZWxldGUgYWxsIGRvbSB0YWdzXG4gICAgICByZXR1cm4gcmVzdWx0RWwuaHRtbCgpXG4gICAgfVxuICB9XG59XG5cbkdyaWREYXRhQ2xhc3MuJGluamVjdCA9IFsnJGRvY3VtZW50JywgJyRzYW5pdGl6ZSddXG5ncmlkei5zZXJ2aWNlKCdncmlkRGF0YScsIEdyaWREYXRhQ2xhc3MpXG5cbmNsYXNzIFhsc0RhdGFDbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHhsc1RlbXBsYXRlLCBncmlkRGF0YSkge1xuICAgIHJldHVybiBmdW5jdGlvbihncmlkSWQsIHNlbGVjdGVkUm93cykge1xuICAgICAgLy8gZ2VuZXJhdGUgdGhlIHhscyBmaWxlIGNvbnRlbnRcbiAgICAgIGlmIChzZWxlY3RlZFJvd3MgPT0gbnVsbCkgeyBzZWxlY3RlZFJvd3MgPSBbXSB9XG4gICAgICBjb25zdCBkYXRhID0geGxzVGVtcGxhdGUoeyB0YWJsZTogZ3JpZERhdGEoZ3JpZElkLCBzZWxlY3RlZFJvd3MpLCB3b3Jrc2hlZXQ6ICdHcmlkIGV4cG9ydCcgfSlcbiAgICAgIHJldHVybiBgZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZXhjZWw7YmFzZTY0LCR7ZGF0YX1gXG4gICAgfVxuICB9XG59XG5cblhsc0RhdGFDbGFzcy4kaW5qZWN0ID0gWyd4bHNUZW1wbGF0ZScsICdncmlkRGF0YSddXG5cbi8vIEdlbmVyYXRlcyBYTFMgZGF0YSB1cmlcbmdyaWR6LnNlcnZpY2UoJ3hsc0RhdGEnLCBYbHNEYXRhQ2xhc3MpXG5cbmNsYXNzIENzdkRhdGFDbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGdyaWREYXRhKSB7XG4gICAgY29uc3QgcHJlcGFyZUNzdkhlYWRlcnMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0gW11cbiAgICAgIGNvbnN0IHJlc3VsdEVsID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpXG4gICAgICByZXN1bHRFbC5hcHBlbmQoZGF0YSlcbiAgICAgIHJlc3VsdEVsLmZpbmQoJ3RoJykuZWFjaChmdW5jdGlvbihpbmRleCwgdGgpIHtcbiAgICAgICAgY29uc3QgdGhFbCA9ICQodGgpXG4gICAgICAgIHJldHVybiBoZWFkZXJzLnB1c2godGhFbC50ZXh0KCkudHJpbSgpKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBoZWFkZXJzLmpvaW4oJ3wnKVxuICAgIH1cblxuICAgIGNvbnN0IHByZXBhcmVDc3ZSb3dzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgbGV0IHJvd3MgPSAnJ1xuICAgICAgY29uc3QgcmVzdWx0RWwgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JylcbiAgICAgIHJlc3VsdEVsLmFwcGVuZChkYXRhKVxuICAgICAgcmVzdWx0RWwuZmluZCgndHInKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB0cikge1xuICAgICAgICBjb25zdCB0ckVsID0gJCh0cilcbiAgICAgICAgY29uc3Qgcm93ID0gW11cbiAgICAgICAgdHJFbC5maW5kKCd0ZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHRkKSB7XG4gICAgICAgICAgY29uc3QgdGRFbCA9ICQodGQpXG4gICAgICAgICAgcmV0dXJuIHJvdy5wdXNoKHRkRWwudGV4dCgpLnRyaW0oKSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcm93cyArPSByb3cuam9pbignfCcpICsgJ1xcclxcbidcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcm93c1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbihncmlkSWQsIHNlbGVjdGVkUm93cykge1xuICAgICAgLy8gZ2VuZXJhdGUgdGhlIGNzdiBmaWxlIGNvbnRlbnRcbiAgICAgIGlmIChzZWxlY3RlZFJvd3MgPT0gbnVsbCkgeyBzZWxlY3RlZFJvd3MgPSBbXSB9XG4gICAgICByZXR1cm4gcHJlcGFyZUNzdkhlYWRlcnMoZ3JpZERhdGEoZ3JpZElkLCBzZWxlY3RlZFJvd3MpKSArIHByZXBhcmVDc3ZSb3dzKGdyaWREYXRhKGdyaWRJZCwgc2VsZWN0ZWRSb3dzKSlcbiAgICB9XG4gIH1cbn1cblxuQ3N2RGF0YUNsYXNzLiRpbmplY3QgPSBbJ2dyaWREYXRhJ11cblxuLy8gR2VuZXJhdGVzIENTViBkYXRhXG5ncmlkei5zZXJ2aWNlKCdjc3ZEYXRhJywgQ3N2RGF0YUNsYXNzKVxuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi9jb21tb25Nb2R1bGUnXG5cbmFuZ3VsYXIubW9kdWxlKGNvbW1vbk1vZHVsZSkucHJvdmlkZXIoJ2FnRGF0ZVRpbWVGaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgLy8gc2VlIGh0dHBzOi8vZG9jcy5hbmd1bGFyanMub3JnL2FwaS9uZy9maWx0ZXIvZGF0ZVxuICBsZXQgZGVmYXVsdEZvcm1hdCA9ICdERCBNTU0gWVlZWSBISDptbSBBJ1xuXG4gIC8vIFNldCB0aGUgZGVmYXVsdCBkYXRlIGZvcm1hdFxuICAvLyB3aGljaCB3aWxsIGJlIHVzZWQgYWNyb3NzIHRoZSB3aG9sZSBhcHBsaWNhdGlvbi5cbiAgcmV0dXJuIHtcbiAgICBzZXREZWZhdWx0Rm9ybWF0KGZvcm1hdCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRcbiAgICB9LFxuXG4gICAgJGdldDogW1xuICAgICAgJyRmaWx0ZXInLCAkZmlsdGVyID0+IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHsgZm9ybWF0ID0gZGVmYXVsdEZvcm1hdCB9XG4gICAgICAgIHJldHVybiAkZmlsdGVyKCdhZ0RhdGUnKShkYXRlLCB0cnVlLCBmb3JtYXQpXG4gICAgICB9XG5cbiAgICBdXG4gIH1cbn0pXG4iLCIvLyBqcXVlcnkgc2hvdWxkIGJlIGluY2x1ZGVkIHNlcGVyYXRlbHlcbndpbmRvdy5qUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKVxud2luZG93LiQgPSB3aW5kb3cualF1ZXJ5XG5cbi8vIHJlcXVpcmUoJ2xvZGFzaCcpXG4vLyByZXF1aXJlKCdhbmd1bGFyJylcbi8vIHJlcXVpcmUoJ2FuZ3VsYXItYW5pbWF0ZScpXG4vLyByZXF1aXJlKCdhbmd1bGFyLXJvdXRlJylcbi8vIHJlcXVpcmUoJ2FuZ3VsYXItcmVzb3VyY2UnKVxuLy8gcmVxdWlyZSgnYW5ndWxhci1zYW5pdGl6ZScpXG4vLyByZXF1aXJlKCdhbmd1bGFyLXNjcm9sbCcpXG4vLyByZXF1aXJlKCdhbmd1bGFyLXhlZGl0YWJsZScpXG4vLyByZXF1aXJlKCdhbmd1bGFyLWRyYWctYW5kLWRyb3AtbGlzdHMvYW5ndWxhci1kcmFnLWFuZC1kcm9wLWxpc3RzLmpzJylcbi8vIHJlcXVpcmUoJ2FuZ3VsYXItdWktYm9vdHN0cmFwJylcblxucmVxdWlyZSgnYm9vdHN0cmFwL2pzL2Ryb3Bkb3duJylcbnJlcXVpcmUoJ2Jvb3RzdHJhcC9qcy90b29sdGlwJykgLy9yZXF1aXJlZCBieSBwb3BvdmVyXG5yZXF1aXJlKCdib290c3RyYXAvanMvcG9wb3ZlcicpIC8vcmVxdWlyZWQgYnkgY2xpY2tvdmVyXG5yZXF1aXJlKCcuLi9jb21wb25lbnRzL2Jvb3RzdHJhcHgtY2xpY2tvdmVyL2Jvb3RzdHJhcHgtY2xpY2tvdmVyJylcblxucmVxdWlyZSgnZnJlZS1qcWdyaWQvanMvanF1ZXJ5LmpxZ3JpZC5zcmMnKVxuXG5yZXF1aXJlKCdTZWxlY3QyL3NlbGVjdDInKVxucmVxdWlyZSgnbW9tZW50JylcbnJlcXVpcmUoJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9zcmMvanMvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyJylcbnJlcXVpcmUoJ2xhdGVyL2xhdGVyJylcbi8vIHJlcXVpcmUoJ3RvYXN0ci90b2FzdHIuanMnKVxuLy8gcmVxdWlyZSgnc3dlZXRhbGVydC9saWIvc3dlZXQtYWxlcnQuanMnKVxuIiwiaW1wb3J0IEJhc2VDdHJsIGZyb20gJy4uLy4uL3V0aWxzL0Jhc2VDdHJsJ1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBjb21tb25Nb2R1bGUgZnJvbSAnLi4vY29tbW9uTW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZShjb21tb25Nb2R1bGUpXG5cbmFwcC5kaXJlY3RpdmUoXCJtZW51SXRlbVwiLCBbXG4gIFwiJHJvdXRlXCIsICRyb3V0ZSA9PiAoe1xuICByZXN0cmljdDogXCJFXCIsXG4gIHRyYW5zY2x1ZGU6IHRydWUsXG4gIHJlcGxhY2U6IHRydWUsXG4gIHNjb3BlOiB0cnVlLFxuXG4gIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgbGV0IGxpc3RJY29uXG4gICAgc2NvcGUuaHJlZiA9IFwiIy9cIiArIGF0dHJzLmZvclxuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50KClcbiAgICBpZiAoIV8uaXNOaWwocGFyZW50WzBdLmF0dHJpYnV0ZXNbXCJsaXN0LWljb25cIl0pKSB7IGxpc3RJY29uID0gcGFyZW50WzBdLmF0dHJpYnV0ZXNbXCJsaXN0LWljb25cIl0udmFsdWUgfVxuICAgIHNjb3BlLmljb24gPSBhdHRycy5pY29uIHx8IGxpc3RJY29uIHx8IFwiZmEgZmEtY2lyY2xlXCJcbiAgICByZXR1cm4gc2NvcGUuaXNBY3RpdmUgPSAoKSA9PiAkcm91dGUuY3VycmVudD8ucGFnZSA9PT0gYXR0cnMuZm9yXG4gIH0sXG5cbiAgdGVtcGxhdGU6IGBcXFxuPGxpIG5nLWNsYXNzPVwieyBhY3RpdmU6IGlzQWN0aXZlKCkgfVwiPlxuPGEgaHJlZj1cInt7aHJlZn19XCI+XG4gIDxpIGNsYXNzPVwie3tpY29ufX1cIj48L2k+XG4gICAgPHNwYW4gbmctdHJhbnNjbHVkZT48L3NwYW4+XG4gIDwvYT5cbjwvbGk+XFxcbmBcbn0pXG5dKVxuXG5jbGFzcyBNZW51Q3RybCBleHRlbmRzIEJhc2VDdHJsIHtcbiAgc3RhdGljIGluaXRDbGFzcygpIHtcblxuICAgIHRoaXMucmVnaXN0ZXIoYXBwLCBcImFnTWVudUN0cmxcIilcbiAgICB0aGlzLmluamVjdChcIiRzY29wZVwiKVxuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHt9XG4gICAgcmV0dXJuIHRoaXMuJHNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIiwgKGV2ZW50LCBjdXJyZW50Um91dGUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXR1c1tjdXJyZW50Um91dGUuc2VjdGlvbl0gPSB0cnVlXG4gICAgfSlcbiAgfVxufVxuTWVudUN0cmwuaW5pdENsYXNzKClcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IE1PRF9OQU1FID0gJ2FnLnBhdGhXaXRoQ29udGV4dCdcbmV4cG9ydCBkZWZhdWx0IE1PRF9OQU1FXG5cbmNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKE1PRF9OQU1FLCBbXSlcblxuLy8gQnVpbGQgYW4gdXJsIHdpdGggdGhlIHF1ZXJ5IHN0cmluZyBmcm9tIHRoZSBnaXZlbiBwYXJhbXNcbmFwcC52YWx1ZSgndXJsQnVpbGRlcicsIGZ1bmN0aW9uKHBhdGgsIHBhcmFtcykge1xuICBpZiAocGFyYW1zID09IG51bGwpIHsgcGFyYW1zID0ge30gfVxuICAvLyBzZWUgaHR0cHM6Ly9tZWRpdW0uY29tL21ha2luZy1pbnRlcm5ldHMvd2h5LXVzaW5nLWNoYWluLWlzLWEtbWlzdGFrZS05YmMxZjgwZDUxYmFcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IF8uam9pbihfLm1hcChwYXJhbXMsICh2YWx1ZSwga2V5KSA9PiBgJHtrZXl9PSR7dmFsdWV9YCksICcmJylcbiAgLy8gY29uc3QgcXVlcnlTdHJpbmcgPSBfLmNoYWluKHBhcmFtcykubWFwKCh2YWx1ZSwga2V5KSA9PiBgJHtrZXl9PSR7dmFsdWV9YCkuam9pbignJicpLnZhbHVlKClcbiAgcmV0dXJuIF8uZmlsdGVyKFtwYXRoLCBxdWVyeVN0cmluZ10sIHBhcnQgPT4gcGFydC5sZW5ndGggPiAwKS5qb2luKCc/Jylcbn0pXG5cbi8qXG5TYW1wbGUgY29udGV4dCBwYXRoIGNvbmZpZ3VyYXRpb246XG5cbmBgYFxuYXBwLmNvbmZpZyBbXG5cInBhdGhXaXRoQ29udGV4dFByb3ZpZGVyXCIsIChwYXRoV2l0aENvbnRleHRQcm92aWRlcikgLT5cbiAgY29udGV4dFBhdGggPSAkKFwiYm9keVwiKS5kYXRhKFwiY29udGV4dC1wYXRoXCIpXG4gIHBhdGhXaXRoQ29udGV4dFByb3ZpZGVyLnNldENvbnRleHRQYXRoKGNvbnRleHRQYXRoKVxuXVxuYGBgXG4qL1xuYXBwLnByb3ZpZGVyKCdwYXRoV2l0aENvbnRleHQnLCBmdW5jdGlvbigpIHtcbiAgbGV0IGNvbnRleHRQYXRoID0gJy8nXG5cbiAgLy8gc3RyaXBzICcvJyBmcm9tIHRoZSBlbmQgYW5kIHRoZSBiZWdpbm5pbmdcbiAgY29uc3Qgc2FuaXRpemVQYXRoID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJy8nIH1cbiAgICByZXR1cm4gJy8nICsgcGF0aC5yZXBsYWNlKC9cXC8qJC8sICcnKS5yZXBsYWNlKC9eXFwvKi8sICcnKVxuICB9XG5cbiAgLy8gUmV0dXJucyBzYW5pdGl6ZWQgY29udGV4dCBwYXRoXG4gIHJldHVybiB7XG4gICAgc2V0Q29udGV4dFBhdGgocGF0aCkge1xuICAgICAgY29udGV4dFBhdGggPSBzYW5pdGl6ZVBhdGgocGF0aClcbiAgICB9LCAvLyBpdCBjYW5ub3QgcmV0dXJuIGEgdmFsdWVcblxuICAgICRnZXQ6IFtcbiAgICAgICd1cmxCdWlsZGVyJywgdXJsQnVpbGRlciA9PiBmdW5jdGlvbihwYXRoLCBwYXJhbXMpIHtcbiAgICAgIC8vIGJ1aWxkIGEgcGF0aCB3aXRoIHRoZSBjb250ZXh0XG4gICAgICAgIGlmIChwYXJhbXMgPT0gbnVsbCkgeyBwYXJhbXMgPSB7fSB9XG4gICAgICAgIHBhdGggPSBfLmZpbHRlcihbY29udGV4dFBhdGgsIHNhbml0aXplUGF0aChwYXRoKV0sIHBhcnQgPT4gIV8uaXNOaWwocGFydCkgJiYgKHBhcnQgIT09ICcvJykpLmpvaW4oJycpXG4gICAgICAgIC8vIGFwcGVuZCBxdWVyeSBzdHJpbmcgZnJvbSB0aGUgZ2l2ZW4gcGFyYW1zXG4gICAgICAgIHJldHVybiB1cmxCdWlsZGVyKHBhdGgsIHBhcmFtcylcbiAgICAgIH1cblxuICAgIF1cbiAgfVxufSlcblxuYXBwLmZpbHRlcignd2l0aENvbnRleHQnLCBbJ3BhdGhXaXRoQ29udGV4dCcsIHBhdGhXaXRoQ29udGV4dCA9PiBwYXRoID0+IHBhdGhXaXRoQ29udGV4dChwYXRoKV0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKiBAbmdJbmplY3QgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3NVcGRhdGVGb3JtQ3RybCB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgbWFzc1VwZGF0ZUZvcm1DdHJsTWl4aW4sIGRpYWxvZywgUmVzb3VyY2UsIHNlbGVjdGVkSWRzLCBncmlkKSB7XG4gICAgJHNjb3BlLnJlY29yZHMgPSB7dGltZVpvbmU6IFwiVVRDXCJ9O1xuXG4gICAgbWFzc1VwZGF0ZUZvcm1DdHJsTWl4aW4oJHNjb3BlLCB7XG4gICAgICBkaWFsb2csXG4gICAgICBSZXNvdXJjZSxcbiAgICAgIHNlbGVjdGVkSWRzLFxuICAgICAgZ3JpZFxuICAgIH1cbiAgICApO1xuICB9XG59XG5cbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgY29tbW9uTW9kdWxlIGZyb20gJy4uL2NvbW1vbk1vZHVsZSdcblxuYW5ndWxhci5tb2R1bGUoY29tbW9uTW9kdWxlKS5kaXJlY3RpdmUoJ2FnRmlsZVVwbG9hZCcsICgpID0+ICh7XG4gIHJlc3RyaWN0OiAnQScsXG4gIHJlcXVpcmU6ICduZ01vZGVsJyxcblxuICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgIHJldHVybiBlbGVtLmJpbmQoJ2NoYW5nZScsIGV2ZW50ID0+IHNjb3BlLiRhcHBseShmdW5jdGlvbihzZWxmKSB7XG4gICAgICBjdHJsLiRzZXRWaWV3VmFsdWUoZWxlbS52YWwoKSlcbiAgICAgIGN0cmwuJHJlbmRlcigpXG4gICAgICByZXR1cm4gc2VsZlthdHRycy5hZ0ZpbGVVcGxvYWRdKGV2ZW50KVxuICAgIH0pKVxuICB9XG59KSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgdWlTZWxlY3QyIGZyb20gJy4vdWkuc2VsZWN0MidcbmltcG9ydCBwYXRoV2l0aEN0eCBmcm9tICcuLi9wYXRoV2l0aENvbnRleHQnXG5cbmV4cG9ydCBkZWZhdWx0ICdhZy5zZWxlY3QyJ1xuYW5ndWxhci5tb2R1bGUoJ2FnLnNlbGVjdDInLCBbXG4gIHVpU2VsZWN0MixcbiAgcGF0aFdpdGhDdHhcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IHJlc291cmNlTW9kdWxlIGZyb20gJy4vcmVzb3VyY2VNb2R1bGUnXG5cbmFuZ3VsYXIubW9kdWxlKHJlc291cmNlTW9kdWxlKVxuICAuY29uc3RhbnQoJ2NvbnRleHRQYXRoJywgJCgnYm9keScpLmRhdGEoJ2NvbnRleHRQYXRoJykpXG4vLyBHZW5lcmF0ZSBhIHRlbXBsYXRlIHVybCBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGFuZCBwYXRoXG4gIC5jb25zdGFudCgnUmVzb3VyY2VUZW1wbGF0ZVNlcnYnLCBmdW5jdGlvbihyZXNvdXJjZSwgcGF0aCkge1xuICAgIGNvbnN0IHBhcnRzID0gW11cblxuICAgIHBhcnRzLnB1c2goJCgnYm9keScpLmRhdGEoJ2NvbnRleHRQYXRoJykpXG4gICAgcGFydHMucHVzaChyZXNvdXJjZS5yZXBsYWNlKC9eXFwvLywgJycpKVxuICAgIHBhcnRzLnB1c2gocGF0aClcblxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcvJylcbiAgfSlcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXG5pbXBvcnQgZ3JpZHpNb2R1bGUgZnJvbSAnLi4vZ3JpZHpNb2R1bGUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IGdyaWR6ID0gYW5ndWxhci5tb2R1bGUoZ3JpZHpNb2R1bGUpXG5cbmdyaWR6LmRpcmVjdGl2ZSgnYWdHcmlkUXVpY2tTZWFyY2gnLCBbXG4gICgpID0+ICh7XG4gICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgIC8vIGZpbHRlcnMgYXJlIG9wdGlvbmFsXG4gICAgc2NvcGU6IHtcbiAgICAgIGdyaWQ6ICc9Zm9yJywgLy8gYXNzaWduIGdyaWQgaW5zdGFuY2VcbiAgICAgIGZpbHRlcnM6ICc9PydcbiAgICB9LFxuXG4gICAgbGluaygkc2NvcGUpIHtcbiAgICAgIC8vIGFwcGx5IGVtcHR5IHF1aWNrIHNlYXJjaCBmaWx0ZXJcbiAgICAgIGlmIChfLmlzTmlsKCRzY29wZS5maWx0ZXJzKSkgeyAkc2NvcGUuZmlsdGVycyA9IHt9IH1cbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5maWx0ZXJzLCB7IHF1aWNrU2VhcmNoOiAnJyB9KVxuXG4gICAgICAvLyBwZXJmb3JtIGdyaWQgc2VhcmNoXG4gICAgICByZXR1cm4gJHNjb3BlLnNlYXJjaCA9IGZpbHRlcnMgPT4gJHNjb3BlLmdyaWQuc2VhcmNoKGZpbHRlcnMpXG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiBgXFxcbjxmb3JtIGNsYXNzPVwic2VhcmNoLWZvcm0gcHVsbC1yaWdodCByaWdodC1tYXJnaW4tNVwiIHN0eWxlPVwicGFkZGluZy10b3A6IDZweFwiIG5hbWU9XCJxdWlja1NlYXJjaFwiPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInF1aWNrIHNlYXJjaFwiIHF1aWNrLXNlYXJjaC1idXR0b24gY2xhc3M9XCJzZWFyY2gtcXVlcnlcIlxuICAgICAgICAgbmctbW9kZWw9XCJmaWx0ZXJzLnF1aWNrU2VhcmNoXCIvPlxuPC9mb3JtPlxcXG5gXG4gIH0pXG5dKVxuXG4vLyBUcmlnZXJzIHNlYXJjaCBvbiBlbnRlciBpbiBxdWljayBzZXJjaCBpbnB1dFxuZ3JpZHouZGlyZWN0aXZlKCdxdWlja1NlYXJjaEJ1dHRvbicsICgpID0+IChzY29wZSwgZWxlbWVudCwgYXR0cnMpID0+IGVsZW1lbnQuYmluZCgna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIC8vIDEzIC0gRW50ZXIga2V5IGNvZGVcbiAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBzY29wZS5zZWFyY2goc2NvcGUuZmlsdGVycylcbiAgfVxuXG4gIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcbiAgICBpZiAoc2NvcGUuZmlsdGVycykgeyBzY29wZS5maWx0ZXJzLnF1aWNrU2VhcmNoID0gJycgfVxuICAgIHNjb3BlLiRhcHBseSgpXG4gICAgcmV0dXJuIHNjb3BlLnNlYXJjaChzY29wZS5maWx0ZXJzKVxuICB9XG59KSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnfi92ZW5kb3InXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuLy9pbXBvcnQgT3JnIGZyb20gJy4vb3JnJ1xuLy8gaW1wb3J0IE9yZ1RhYiBmcm9tICcuL3RhYmJlZE9yZydcbi8vIGltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcbi8vIGltcG9ydCBPcmdTaG93Q2FzZSBmcm9tICcuL29yZ1Nob3dDYXNlJ1xuaW1wb3J0ICd+L3N0eWxlcy9hbGwuY3NzLmpzJyAvL3VzaW5nIH4vIHBvaW50cyB0byB0aGUgbWFpbiBwcm9qZWN0cyBzcmMgZGlyXG5pbXBvcnQgJy4vYXBwLmNzcydcblxuXG5pbXBvcnQgTGlzdEN0cmwgZnJvbSAnLi9vcmcvbGlzdEN0cmwnXG5pbXBvcnQgRm9ybUN0cmwgZnJvbSAnLi9vcmcvZm9ybUN0cmwnXG5pbXBvcnQgU2hvd0N0cmwgZnJvbSAnLi9vcmcvc2hvd0N0cmwnXG5pbXBvcnQgTWFzc1VwZGF0ZUZvcm1DdHJsIGZyb20gJy4vb3JnL01hc3NVcGRhdGVGb3JtQ3RybCdcbmltcG9ydCBhZG1pbk9yZyBmcm9tICcuL29yZy9hZG1pbk9yZ01vZHVsZSdcbmltcG9ydCBPcmdTZWxlY3RPcHRpb25zIGZyb20gXCIuL29yZy9vcmdTZWxlY3RPcHRpb25zXCI7XG5cbmNvbnNvbGUubG9nKFwiYWRtaW5Pcmc6IFwiLCBhZG1pbk9yZylcbmNvbnN0IG1vZCA9IGFuZ3VsYXIubW9kdWxlKGFkbWluT3JnKVxuXG5tb2QuY29udHJvbGxlcihcIm9yZy5Gb3JtQ3RybFwiLCBGb3JtQ3RybClcbiAgLmNvbnRyb2xsZXIoXCJvcmcuTGlzdEN0cmxcIiwgTGlzdEN0cmwpXG4gIC5jb250cm9sbGVyKFwib3JnLlNob3dDdHJsXCIsIFNob3dDdHJsKVxuICAuY29udHJvbGxlcihcIm9yZy5NYXNzVXBkYXRlRm9ybUN0cmxcIiwgTWFzc1VwZGF0ZUZvcm1DdHJsKVxuICAuc2VydmljZShcIm9yZ1NlbGVjdE9wdGlvbnNcIixPcmdTZWxlY3RPcHRpb25zIClcblxuLy9leHBvcnQgZGVmYXVsdCBhZG1pbk9yZ1xuLy9KdXN0IGFuIGV4YW1wbGUgZm9yIGNvbmZpZ3VyaW5nIGRhdGVzIGZvcm1hdHNcbm1vZC5jb25maWcoW1xuICBcImFnRGF0ZVByb3ZpZGVyXCIsIGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgcHJvdmlkZXIuc2V0Vmlld0Zvcm1hdChcIk1NL0REL1lZXCIpO1xuICAgIHJldHVybiBwcm92aWRlci5zZXRMb2NhbERhdGVGb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xuICB9XG5dKTtcblxuXG5cblxuLypcbmNvbnN0IGFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hcHAuaHRtbCcpLFxuICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJyxcbiAgICBjb250cm9sbGVyQXM6ICdhcHBDdHJsJ1xuICB9XG59XG5cbi8vIHRoZSBlczYgcGF0dGVybiBpcyB0byBzZXR1cCB0aGUgbW9kdWxlIGFuZCB0aGVuIGV4cG9ydCB0aGUgc3RyaW5nIG5hbWUgb2YgdGhlIG1vZHVsZVxuYW5ndWxhci5tb2R1bGUoJ2FwcC5tb2R1bGUnLCBbdWlib290c3RyYXBdKVxuICAuZGlyZWN0aXZlKCdhcHAnLCBhcHApXG4gIC5zZXJ2aWNlKCdhcHBDb25maWdTdmMnLCBBcHBDb25maWdTdmMpXG4gIC5jb250cm9sbGVyKCdBcHBDdHJsJywgQXBwQ3RybClcblxuZXhwb3J0IGRlZmF1bHQgJ2FwcC5tb2R1bGUnXG4qL1xuIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcidcbmltcG9ydCBmb3Jtc01vZHVsZSBmcm9tICcuLi9mb3Jtc01vZHVsZSdcblxudmFyIGZvcm1zID0gYW5ndWxhci5tb2R1bGUoZm9ybXNNb2R1bGUpXG5cbi8vIFRPRE8gc3BlYyBpdFxuZm9ybXMuZGlyZWN0aXZlKCdlZGl0YWJsZVNlbGVjdDInLCBbXG4gICdlZGl0YWJsZURpcmVjdGl2ZUZhY3RvcnknLCBlZGl0YWJsZURpcmVjdGl2ZUZhY3RvcnkgPT4gZWRpdGFibGVEaXJlY3RpdmVGYWN0b3J5KHtcbiAgICBkaXJlY3RpdmVOYW1lOiAnZWRpdGFibGVTZWxlY3QyJyxcblxuICAgIGlucHV0VHBsOiAnXFxcbjxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmctbW9kZWw9XCIkZGF0YVwiIC8+XFxcbidcbiAgfSlcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuLy8gRGVjb3JhdGVzIGFsbCBlZGl0YWJsZSBpbnB1dHMgd2l0aCBtZWNoYW5pc21cbi8vIGZvciBkaXNwbGF5aW5nIHZhbGlkYXRpb24gZXJyb3JzLlxuZm9ybXMuY29uZmlnKFtcIiRwcm92aWRlXCIsICRwcm92aWRlID0+ICRwcm92aWRlLmRlY29yYXRvcihcImVkaXRhYmxlRGlyZWN0aXZlRmFjdG9yeVwiLCBbXG4gIFwiJGRlbGVnYXRlXCIsIFwidmFsaWRhdGlvbk1lc3NhZ2VzXCIsIGZ1bmN0aW9uKCRkZWxlZ2F0ZSwgdmFsaWRhdGlvbk1lc3NhZ2VzKSB7XG5cbiAgICAvLyBjb2xsZWN0IGFsbCBlcnJvciBtZXNzYWdlcyBmb3IgdGhlIGdpdmVuIG1vZGVsXG4gICAgY29uc3QgZXJyb3JzRm9yID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24ocmVzdWx0LCBpbnZhbGlkLCBlcnJvcikge1xuICAgICAgICBpZiAoaW52YWxpZCkgeyByZXN1bHQucHVzaCh2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdKSB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF8ucmVkdWNlKG1vZGVsLiRlcnJvciwgY2FsbGJhY2ssIFtdKS5qb2luKFwiLCBcIilcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBkaXJlY3RpdmUgPSAkZGVsZWdhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgY29uc3Qge1xuICAgICAgICBsaW5rXG4gICAgICB9ID0gZGlyZWN0aXZlXG5cbiAgICAgIGRpcmVjdGl2ZS5jb21waWxlID0gKGVsZW1lbnQsIGF0dHJzKSA9PiAoZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIGxpbmsuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBjdHJsWzFdXG4gICAgICAgIGNvbnN0IG5hbWUgPSBhdHRycy5lTmFtZVxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgfSA9IGF0dHJzXG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIG1vZGVsIHZhbGlkaXR5XG4gICAgICAgIC8vIGFuZCBkaXNwbGF5IGVycm9ycyBpZiBuZWNlc3NhcnlcbiAgICAgICAgaWYgKCFfLmlzTmlsKGZvcm0pICYmICFfLmlzTmlsKG5hbWUpKSB7XG4gICAgICAgICAgY29uc3Qgdmlld1ZhbHVlID0gKCkgPT4gZm9ybVtuYW1lXT8uJHZpZXdWYWx1ZVxuICAgICAgICAgIHNjb3BlLiR3YXRjaCh2aWV3VmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBmb3JtW25hbWVdXG5cbiAgICAgICAgICAgIGlmIChtb2RlbD8uJGludmFsaWQpIHtcbiAgICAgICAgICAgICAgZm9ybS4kc2V0RXJyb3IobmFtZSwgZXJyb3JzRm9yKG1vZGVsKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vZGVsPy4kdmFsaWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uJHNldEVycm9yKG5hbWUsIFwiXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdhdGNoIGlmIGlucHV0IGhhcyBkaXNhYmxlZCBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKCFfLmlzTmlsKGZvcm0pICYmICFfLmlzTmlsKGRpc2FibGVkKSkge1xuICAgICAgICAgIHNjb3BlLmRpc2FibGVkID0gZGlzYWJsZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgIH0gPSBhdHRyc1xuICAgICAgICBpZiAoIV8uaXNOaWwob3B0aW9ucykpIHtcbiAgICAgICAgICByZXR1cm4gc2NvcGUub3B0aW9ucyA9IG9wdGlvbnNcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGRpcmVjdGl2ZVxuICAgIH1cbiAgfVxuXSlcbl0pXG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGZvcm1zTW9kdWxlIGZyb20gJy4uL2Zvcm1zTW9kdWxlJ1xuXG52YXIgZm9ybXMgPSBhbmd1bGFyLm1vZHVsZShmb3Jtc01vZHVsZSlcblxuZm9ybXMuZGlyZWN0aXZlKCdhZ0NyZWF0ZUJ1dHRvbicsICgpID0+ICh7XG4gIHJlc3RyaWN0OiAnRScsXG4gIHJlcGxhY2U6IHRydWUsXG4gIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgY29tcGlsZShlbGVtZW50LCBhdHRycywgdHJhc2NsdWRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByZShzY29wZSwgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJhc2NsdWRlKHNjb3BlLCBmdW5jdGlvbihjbG9uZSkge1xuICAgICAgICAgIC8vIEFwcGVuZCB0aGUgZGVmYXVsdCBsYWJlbFxuICAgICAgICAgIGlmICgkLnRyaW0oY2xvbmUudGV4dCgpKSA9PT0gJycpIHsgcmV0dXJuIGVsZW1lbnQuYXBwZW5kKCdDcmVhdGUnKSB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRlbXBsYXRlOiBgXFxcbjxhIGhyZWY9XCJcIiBjbGFzcz1cImJ0blwiPlxuICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbC1zcXVhcmUtb1wiPjwvaT5cbiAgPHNwYW4gbmctdHJhbnNjbHVkZT48L3NwYW4+XG48L2E+XFxcbmBcbn0pKVxuXG5mb3Jtcy5kaXJlY3RpdmUoJ2FnQ2FuY2VsQnV0dG9uJywgKCkgPT4gKHtcbiAgcmVzdHJpY3Q6ICdFJyxcbiAgcmVwbGFjZTogdHJ1ZSxcblxuICB0ZW1wbGF0ZTogYFxcXG48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiPlxuICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPiBDYW5jZWxcbjwvYnV0dG9uPlxcXG5gXG59KSlcbiIsIi8qXG4gKiBkZWNhZmZlaW5hdGUgc3VnZ2VzdGlvbnM6XG4gKiBEUzEwMjogUmVtb3ZlIHVubmVjZXNzYXJ5IGNvZGUgY3JlYXRlZCBiZWNhdXNlIG9mIGltcGxpY2l0IHJldHVybnNcbiAqIERTMjA2OiBDb25zaWRlciByZXdvcmtpbmcgY2xhc3NlcyB0byBhdm9pZCBpbml0Q2xhc3NcbiAqIEZ1bGwgZG9jczogaHR0cHM6Ly9naXRodWIuY29tL2RlY2FmZmVpbmF0ZS9kZWNhZmZlaW5hdGUvYmxvYi9tYXN0ZXIvZG9jcy9zdWdnZXN0aW9ucy5tZFxuICovXG5cbi8qIEBuZ0luamVjdCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd0N0cmwge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRsb2NhdGlvbiwgb3JnKSB7XG4gICAgJHNjb3BlLm9yZyA9IG9yZztcblxuICAgICRzY29wZS5kZWxldGUgPSBmdW5jdGlvbihvcmcpIHtcbiAgICAgIGNvbnN0IG9uU3VjY2VzcyA9ICgpID0+ICRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgIHJldHVybiBvcmcuZGVsZXRlKHtzdWNjZXNzOiBvblN1Y2Nlc3N9KTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IGdyaWR6TW9kdWxlIGZyb20gJy4uL2dyaWR6TW9kdWxlJ1xuXG52YXIgZ3JpZHogPSBhbmd1bGFyLm1vZHVsZShncmlkek1vZHVsZSlcblxuLy8gVGFrZXMgYSBuZXN0ZWQgSmF2YXNjcmlwdCBvYmplY3QgYW5kIGZsYXR0ZW4gaXQuXG4vLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9odWdoc2svZmxhdFxuZ3JpZHoudmFsdWUoJ0ZsYXR0ZW5TZXJ2JywgZnVuY3Rpb24odGFyZ2V0LCBvcHRzKSB7XG4gIGlmIChvcHRzID09IG51bGwpIHsgb3B0cyA9IHsgZGVsaW1pdGVyOiAnLicgfSB9XG4gIGNvbnN0IHtcbiAgICBkZWxpbWl0ZXJcbiAgfSA9IG9wdHNcblxuICBjb25zdCBnZXRLZXkgPSBmdW5jdGlvbihrZXksIHByZXYpIHtcbiAgICBpZiAocHJldikgeyByZXR1cm4gcHJldiArIGRlbGltaXRlciArIGtleSB9IGVsc2UgeyByZXR1cm4ga2V5IH1cbiAgfVxuXG4gIHZhciBzdGVwID0gKG9iamVjdCwgcHJldikgPT4gYW5ndWxhci5mb3JFYWNoKE9iamVjdC5rZXlzKG9iamVjdCksIGZ1bmN0aW9uKGtleSkge1xuICAgIGNvbnN0IGlzQXJyYXkgPSBvcHRzLnNhZmUgJiYgb2JqZWN0W2tleV0gaW5zdGFuY2VvZiBBcnJheVxuICAgIGNvbnN0IHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0W2tleV0pXG4gICAgY29uc3QgaXNPYmplY3QgPSAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHx8ICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKVxuICAgIGNvbnN0IGlzQW5ndWxhciA9IGtleS5pbmRleE9mKCckJykgPj0gMFxuXG4gICAgaWYgKCFpc0FycmF5ICYmIGlzT2JqZWN0ICYmICFpc0FuZ3VsYXIpIHsgcmV0dXJuIHN0ZXAob2JqZWN0W2tleV0sIGdldEtleShrZXksIHByZXYpKSB9XG4gICAgcmV0dXJuIG91dHB1dFtnZXRLZXkoa2V5LCBwcmV2KV0gPSBvYmplY3Rba2V5XVxuICB9KVxuXG4gIHZhciBvdXRwdXQgPSB7fVxuICBzdGVwKHRhcmdldClcbiAgcmV0dXJuIG91dHB1dFxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=