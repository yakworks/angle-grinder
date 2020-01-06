/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module("angleGrinder.gridz")

// Retunrs true if `filters` contain at least one non-empty search field
gridz.value("hasSearchFilters", function(filters) {
  for (let k in filters) {
    const value = filters[k]
    if (_.isNil(value)) { continue }

    if (typeof value === "string") {
      if ($.trim(value) !== "") { return true }
    } else {
      return true
    }
  }

  return false
})

gridz.directive("agSearchButton", () => ({
  restrict: "E",
  replace: true,

  template: `\
<button type="submit" ng-click="advancedSearch(filters)" ng-disabled="searching" class="btn btn-info">
  <i class="fa fa-search fa-inverse"></i> Search<span ng-show="searching">...</span>
</button>\
`
}))

gridz.directive("agResetSearchButton", () => ({
  restrict: "E",
  replace: true,

  template: `\
<button type="button" ng-click="resetSearch(filters)" ng-disabled="searching" class="btn">
  <i class="fa fa-times"></i> Reset<span ng-show="searching">...</span>
</button>\
`
}))

gridz.directive("agSearchForm", ["$log", $log => ({
  restrict: "A",
  scope: true,
  require: "^form",

  link(scope, element, attrs, form) {
    // assign form instance to the scope
    return scope.searchForm = form
  },

  controller: [
    "$scope", "$parse", "$attrs",
    function($scope, $parse, $attrs) {
      $scope.searching = false

      // Perform server side grid filtering
      const gridSearch = function(filters) {
        if (filters == null) { filters = {} }
        const grid = $parse($attrs.agSearchForm)($scope)

        if (_.isNil(grid)) {
          $log.warn("[gridz] grid is not defined")
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
          return $log.info("[gridz] advanced search form is invalid", form)
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
