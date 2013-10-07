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
    <button type="button" ng-click="advancedSearch(filters)" ng-disabled="!promise" class="btn btn-info">
      <i class="icon-search icon-white"></i> Search<span ng-show="!promise">...</span>
    </button>
  """

gridz.directive "agResetSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" ng-click="resetSearch()" ng-disabled="!promise" class="btn">
      <i class="icon-remove"></i> Reset<span ng-show="!promise">...</span>
    </button>
  """

gridz.directive "agSearchForm", ["$log", ($log) ->
  restrict: "A"
  scope: false
  link: (scope, element, attrs) ->
    element.addClass "ag-search-form"

    scope.filters = {}
    scope.promise = true

    # Trigger search action for the grid
    scope.advancedSearch = (filters) ->
      gridCtrl = scope[attrs.agSearchForm]

      unless gridCtrl
        $log.warn "grid is not defined"
        return

      scope.promise = gridCtrl.search(filters)

      # enable buttons back when something wrong happened
      $(document).ajaxError (event, jqxhr, settings, exception) ->
        if settings.type is "GET"
          scope.$apply -> scope.promise = true

    # Reset the search form and trigger grid reload
    scope.resetSearch = (filters = {}) ->
      scope.filters = filters
      scope.advancedSearch(filters)
]
