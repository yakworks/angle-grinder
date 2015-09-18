gridz = angular.module "angleGrinder.gridz"

gridz.directive "agGridQuickSearch", [
  ->
    restrict: "E"

    scope:
      grid: "=for"  # assign grid instance
      filters: "=?" # filters are optional

    link: ($scope) ->
      # apply empty quick search filter
      $scope.filters = {} unless $scope.filters?
      angular.extend($scope.filters, quickSearch: "")

      # perform grid search
      $scope.search = (filters) ->
        $scope.grid.search(filters)

    template: """
      <form class="navbar-search pull-right" name="quickSearch"">
        <input type="text" placeholder="quick search"  style="margin-top: 7px" quick-search-button class="search-query span2"
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
        # Run search only if there are any filters specified
        if not angular.equals(scope.filters, {quickSearch: ""})
          scope.search(scope.filters)

      if event.which is 27
        scope.filters.quickSearch = "" if scope.filters
        scope.$apply()