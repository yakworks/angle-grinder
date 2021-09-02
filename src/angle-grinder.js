import angular from 'angular'
import uibModName from './ng/uib'
import agCommon from './ng/common'
import filtersMod from './ng/filters'
import agCompMod from './ng/components'
import agControlsMod from './ng/controls'
import gridz from './ng/gridz'
import agPathWithContext from './ng/pathWithContext'
import agSidebar from './ng/sidebar/sidebars'
import agSidenav from './ng/sidenav'
import uiRouterStateHelper from './ng/uirouter/stateHelper'

// foo
var agmod = angular.module('angleGrinder', [
  uiRouterStateHelper,
  uibModName,
  agCommon,
  filtersMod,
  agPathWithContext,
  gridz,
  agCompMod,
  agControlsMod,
  agSidebar,
  agSidenav
])

export default agmod.name

agmod.config(function($httpProvider, pathWithContextProvider) {
  // Intercept all http errors
  $httpProvider.interceptors.push('httpErrorsInterceptor')

  // Configure the context path
  var contextPath = $('body').data('context-path')
  if (contextPath != null) {
    pathWithContextProvider.setContextPath(contextPath)
  }
})

// see Running an AngularJS App in Production https://docs.angularjs.org/guide/production#!
agmod.config(function($compileProvider) {
  $compileProvider.debugInfoEnabled(false)
})

// default store, should be overriden in production, here so testing works
agmod.service('dataStoreApi', function() {})

// Intercepts all HTTP errors and displays a flash message
agmod.factory('httpErrorsInterceptor', [
  '$injector', '$q', 'alerts', function($injector, $q, alerts) {
    return {
      response: function(response) {
        return response
      },
      responseError: function(response) {
        var errorMessage
        var genericErrorMessage = (response.statusText ? response.statusText : 'Unexpected HTTP error') + ' ' + response.status + ' : ' + response.config.url
        var responseData = response.data

        if (responseData == null) errorMessage = genericErrorMessage
        else if (responseData.error != null) errorMessage = responseData.error
        else if (responseData.message != null) errorMessage = responseData.message
        else errorMessage = genericErrorMessage

        // ..skip validation and auth errors
        if (response.status !== 422 && response.status !== 401) {
          alerts.error(errorMessage)
          return $q.reject(response)
        }
        return $q.reject(response)
      }
    }
  }
])

// Catch all jquery xhr errors
agmod.run(function($log, alerts) {
  return $(document).ajaxError(function(event, jqxhr, settings, exception) {
    $log.error('Network error:', event, jqxhr, settings, exception)
    return alerts.error(exception)
  })
})
