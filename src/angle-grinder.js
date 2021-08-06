import angular from 'angular'
import agCommon from './ng/common'
import filtersMod from './ng/filters'
import agCompMod from './ng/components'
import agControlsMod from './ng/controls'
// import legacyMod from './ng/legacy'
import gridz from './ng/gridz'
import agPathWithContext from './ng/pathWithContext'
import resourceSupport from './ng/resourceSupport'
import agSidebar from './ng/sidebar/sidebars'
import agSidenav from './ng/sidenav'
import uiRouterStateHelper from './ng/uirouter/stateHelper'

// foo
var agmod = angular.module('angleGrinder', [
  resourceSupport,
  uiRouterStateHelper,
  agCommon,
  filtersMod,
  agPathWithContext,
  gridz,
  // legacyMod,
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
}
)

agmod.controller('MainCtrl', function($scope, $http, uiGridConstants) {
  var paginationOptions = {
    pageNumber: 1,
    pageSize: 25,
    sort: null
  }

  $scope.gridOptions = {
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    useExternalPagination: true,
    useExternalSorting: true,
    columnDefs: [
      { name: 'name' },
      { name: 'gender', enableSorting: false },
      { name: 'company', enableSorting: false }
    ],
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi
      $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
        if (sortColumns.length === 0) {
          paginationOptions.sort = null
        } else {
          paginationOptions.sort = sortColumns[0].sort.direction
        }
        getPage()
      })
      gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
        paginationOptions.pageNumber = newPage
        paginationOptions.pageSize = pageSize
        getPage()
      })
    }
  }

  var getPage = function() {
    var url
    switch (paginationOptions.sort) {
      case uiGridConstants.ASC:
        url = '/data/100_ASC.json'
        break
      case uiGridConstants.DESC:
        url = '/data/100_DESC.json'
        break
      default:
        url = '/data/100.json'
        break
    }

    $http.get(url)
      .success(function(data) {
        $scope.gridOptions.totalItems = 100
        var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize
        $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize)
      })
  }

  getPage()
}
)
