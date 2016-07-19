gridz = angular.module("angleGrinder.gridz")

# Retunrs true if `filters` contain at least one non-empty search field
gridz.value "hasSearchFilters", (filters) ->
  for _, value of filters
    continue unless value?

    if typeof value is "string"
      return true if $.trim(value) isnt ""
    else
      return true

  return false

gridz.directive "agSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="submit" ng-click="advancedSearch(filters)" ng-disabled="searching" class="btn btn-info">
      <i class="fa fa-search fa-inverse"></i> Search<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agResetSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" ng-click="resetSearch(filters)" ng-disabled="searching" class="btn">
      <i class="fa fa-times"></i> Reset<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agSearchForm", ["$log", ($log) ->
  restrict: "A"
  scope: true
  require: "^form"

  link: (scope, element, attrs, form) ->
    # assign form instance to the scope
    scope.searchForm = form

  controller: [
    "$scope", "$parse", "$attrs",
    ($scope, $parse, $attrs) ->
      $scope.searching = false

      # Perform server side grid filtering
      gridSearch = (filters = {}) ->
        grid = $parse($attrs.agSearchForm)($scope)

        unless grid?
          $log.warn "[gridz] grid is not defined"
          return

        promise = grid.search(filters)

        # enable buttons when the search is complete
        $scope.searching = true
        promise.finally -> $scope.searching = false

        return promise

      # Trigger search action for the grid
      $scope.advancedSearch = (filters = {}) ->
        form = $scope.searchForm

        if form and form.$invalid
          return $log.info "[gridz] advanced search form is invalid", form

        gridSearch(filters)

      # Reset the search form and trigger grid reload
      $scope.resetSearch = (filters = {}) ->
        defaultFilters = $scope.defaultFilters or {}
        angular.copy(defaultFilters, filters)

        gridSearch(filters)
  ]
]
