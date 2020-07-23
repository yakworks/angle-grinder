import angular from 'angular'
import ngRoute from 'angular-route'
import uibModName from 'angular-ui-bootstrap'
import ngScroll from 'angular-scroll'
import ngcookies from 'angular-cookies'
import ngAnimate from 'angular-animate'
import ngSanitize from 'angular-sanitize'
import ngLoadingBar from 'angular-loading-bar'
import vButton from 'v-button'
import filtersModule from '../filters'

import ConfirmationDialogServ from './services/ConfirmationDialogServ'
import _ from 'lodash'

const MOD_NAME = 'ag.common'
export default MOD_NAME
var common = angular.module(MOD_NAME, [
  uibModName,
  ngRoute,
  ngcookies,
  ngAnimate,
  ngSanitize,
  ngLoadingBar,
  vButton,
  ngScroll, // Scroll
  filtersModule
])

common.service('ConfirmationDialogServ', ConfirmationDialogServ)

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
common.config(function($uibTooltipProvider) {
  $uibTooltipProvider.options({ appendToBody: true })
})
