import angular from 'angular'
import gridzModule from '../module'
import _ from 'lodash'

var gridz = angular.module(gridzModule)

//FIXME deprecated?, why do we need this here but not for the others?
gridz.directive('agSearchForm', ['$log', $log => ({
  restrict: 'A',
  scope: true,
  require: '^form',

  link(scope, element, attrs, form) {
    // assign form instance to the scope
    return scope.searchForm = form
  },

  controller: [
    '$scope', '$parse', '$attrs',
    function($scope, $parse, $attrs) {
      $scope.searching = false

      // Perform server side grid filtering
      const gridSearch = function(filters) {
        if (filters == null) { filters = {} }
        const grid = $parse($attrs.agSearchForm)($scope)

        if (_.isNil(grid)) {
          $log.warn('[gridz] grid is not defined')
          return
        }

        const promise = grid.search(filters)

        // enable buttons when the search is complete
        $scope.searching = true
        promise.finally(() => $scope.searching = false)

        return promise
      }

      // Trigger search action for the grid
      $scope.advancedSearch = function(filters) {
        if (filters == null) { filters = {} }
        const form = $scope.searchForm

        if (form && form.$invalid) {
          return $log.info('[gridz] advanced search form is invalid', form)
        }

        return gridSearch(filters)
      }

      // Reset the search form and trigger grid reload
      return $scope.resetSearch = function(filters) {
        if (filters == null) { filters = {} }
        const defaultFilters = $scope.defaultFilters || {}
        angular.copy(defaultFilters, filters)

        return gridSearch(filters)
      }
    }
  ]
})
])
