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
      <i class="icon-search icon-white"></i> Search<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agResetSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" ng-click="resetSearch()" ng-disabled="searching" class="btn">
      <i class="icon-remove"></i> Reset<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agSearchForm", ["$log", ($log) ->
  restrict: "A"
  scope: true
  require: "^form"

  link: (scope, element, attrs, form) ->
    # assign form instance to the scope
    scope.searchForm = form

  controller: ["$scope", "$attrs", "$document", ($scope, $attrs, $document) ->
    $scope.filters = {}
    $scope.searching = false

    # enable buttons back when something wrong happened
    $document.ajaxError (event, jqxhr, settings, exception) ->
      if settings.type is "GET"
        $scope.$apply -> $scope.searching = false

    # Perform server side grid filtering
    gridSearch = (filters = {}) ->
      $scope.searching = true
      gridCtrl = $scope.$parent[$attrs.agSearchForm]

      unless gridCtrl
        $log.warn "grid is not defined"
        return

      # enable buttons when the search is complete
      gridCtrl.search(filters).then ->
         $scope.searching = false

    # Trigger search action for the grid
    $scope.advancedSearch = (filters) ->
      formCtrl = $scope.searchForm
      return $log.info "advanced search form is invalid", formCtrl  if formCtrl?.$invalid

      gridSearch(filters)

    # Reset the search form and trigger grid reload
    $scope.resetSearch = (filters = {}) ->
      $scope.filters = filters
      gridSearch(filters)
  ]
]
