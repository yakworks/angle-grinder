import angular from 'angular'
import ngRoute from 'angular-route'
import ngScroll from 'angular-scroll'
import ngcookies from 'angular-cookies'
import ngAnimate from 'angular-animate'
import ngSanitize from 'angular-sanitize'
import ngLoadingBar from 'angular-loading-bar'
import 'angular-breadcrumb'
// import vButton from 'v-button'
import filtersModule from '../filters'
import uiRouter from 'angular-ui-router'

import _ from 'lodash'

const MOD_NAME = 'ag.common'
export default MOD_NAME
var common = angular.module(MOD_NAME, [
  // uibModName,
  ngRoute,
  ngcookies,
  ngAnimate,
  ngSanitize,
  ngLoadingBar,
  uiRouter,
  'ncy-angular-breadcrumb',
  // vButton,
  ngScroll, // Scroll
  filtersModule
])

// Decorates `$http.pendingRequests` with some useful features
common.factory('pendingRequests', function($http) {
  const pendingRequests = () => pendingRequests.any()

  // Returns true if any http request is in progress
  pendingRequests.any = () => pendingRequests.for('GET', 'POST', 'PUT', 'PATCH', 'DELETE')

  // Returns true if a http request with the given method is in progress
  pendingRequests.for = function(...httpMethods) {
    const requests = _.filter($http.pendingRequests, request => _.includes(httpMethods, request.method))
    return requests.length > 0
  }

  return pendingRequests
})

// Due to changes in angular 1.6 see https://docs.angularjs.org/guide/migration#commit-aa077e8
common.config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')])

// FIX the bad location on popover
/*
common.config(function($uibTooltipProvider) {
  $uibTooltipProvider.options({ appendToBody: true })
})
*/

// Angular-breadcrumb
common.config(function($breadcrumbProvider) {
  'ngInject';
  $breadcrumbProvider.setOptions({
    template: '<ul class="breadcrumb"><li><a ui-sref="app.dashboard"><i class="fas fa-home margin-right-5 text-large text-dark"></i>Home</a></li><li ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</li></ul>'
  })
})

// Angular-Loading-Bar
common.config(function(cfpLoadingBarProvider) {
  'ngInject';
  cfpLoadingBarProvider.includeBar = true
  cfpLoadingBarProvider.includeSpinner = true
})

// common sanitation
common.config(function($compileProvider) {
  'ngInject';
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/)
})

// see https://stackoverflow.com/questions/45827733/replacing-http-with-fetch-api
common.run(normalizePromiseSideEffects)

normalizePromiseSideEffects.$inject = ['$rootScope']

function normalizePromiseSideEffects($rootScope) {
  attachScopeApplicationToPromiseMethod('then')
  attachScopeApplicationToPromiseMethod('catch')
  attachScopeApplicationToPromiseMethod('finally')

  function attachScopeApplicationToPromiseMethod(methodName) {
    const NativePromiseAPI = window.Promise
    const nativeImplementation = NativePromiseAPI.prototype[methodName]

    NativePromiseAPI.prototype[methodName] = function(...promiseArgs) {
      const newPromiseArgs = promiseArgs.map(wrapFunctionInScopeApplication)
      return nativeImplementation.bind(this)(...newPromiseArgs)
    }
  }

  function wrapFunctionInScopeApplication(fn) {
    if (!_.isFunction(fn) || fn.isScopeApplicationWrapped) {
      return fn
    }

    const wrappedFn = (...args) => {
      const result = fn(...args)
      // this API is used since it's $q was using in AngularJS src
      $rootScope.$evalAsync()
      return result
    }
    wrappedFn.isScopeApplicationWrapped = true
    return wrappedFn
  }
}
