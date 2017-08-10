gridz = angular.module "angleGrinder.gridz"

gridz.directive "agGridQuickSearch", [
  ->
    restrict: "E"

    scope:
      grid: "=for"  # assign grid instance
      filters: "=?" # filters are optional

    link: ($scope, element, attrs) ->
      # apply empty quick search filter
      $scope.filters = {} unless $scope.filters?
      angular.extend($scope.filters, quickSearch: "")
      $scope.placeholder = if attrs.placeholder then attrs.placeholder else "quick search"
      # perform grid search
      $scope.search = (filters) ->
        $scope.grid.search(filters)

    template: """
      <form class="search-form pull-right right-margin-5" name="quickSearch"">
        <input type="text" placeholder="{{placeholder}}" quick-search-button class="search-query"
               ng-model="filters.quickSearch"/>
      </form>
    """
]

# Trigers search on enter in quick serch input
gridz.directive "quickSearchButton", ->
  (scope, element, attrs) ->
    element.bind "keydown", (event)->
      # 13 - Enter key code
      if event.which is 13
        event.preventDefault()
        scope.search(scope.filters)

      if event.which is 27
        scope.filters.quickSearch = "" if scope.filters
        scope.$apply()
        scope.search(scope.filters)
