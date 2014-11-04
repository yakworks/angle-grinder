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
      <form class="navbar-search pull-right" name="quickSearch" ng-submit="search(filters)">
        <input type="text" placeholder="quick search" class="search-query col-md-2"
               ng-model="filters.quickSearch"/>
        <button ng-show="false" type="submit">Search</button>
      </form>
    """
]
