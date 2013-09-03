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
    <button type="button" ng-click="advancedSearch(search)" ng-class="{disabled: searching}" class="btn btn-info">
      <i class="icon-search icon-white"></i> Search<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agResetSearchButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" ng-click="resetSearch()" ng-class="{disabled: searching}" class="btn">
      <i class="icon-remove"></i> Reset<span ng-show="searching">...</span>
    </button>
  """

gridz.directive "agSearchForm", ["$rootScope", ($rootScope) ->
  restrict: "A"
  scope: false
  link: ($scope, $element, attrs) ->
    $element.addClass "ag-search-form"

    $scope.searching = false
    $scope.search = {}

    # Trigger search action for the grid
    $scope.advancedSearch = (search) ->
      $scope.searching = true
      $rootScope.$broadcast "searchUpdated", search

    # Listen to grid load complete action
    $scope.$on "gridzLoadComplete", ->
      $scope.searching = false

    # Reset the search form and trigger grid reload
    $scope.resetSearch = ->
      $scope.search = {}
      $scope.advancedSearch($scope.search)
]
