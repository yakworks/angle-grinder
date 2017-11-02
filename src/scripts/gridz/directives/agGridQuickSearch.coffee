gridz = angular.module "angleGrinder.gridz"

gridz.directive "agGridQuickSearch", [
  ->
    restrict: "E"

    scope:
      grid: "=for"  # assign grid instance
      criteria: "=?" # criteria are optional

    link: ($scope) ->
      # apply empty quick search filter
      $scope.criteria = {} unless $scope.criteria?
      angular.extend($scope.criteria, quickSearch: "")

      # perform grid search
      $scope.search = (criteria) ->
        $scope.grid.search(criteria)

    template: """
      <form class="search-form pull-right right-margin-5" name="quickSearch"">
        <input type="text" placeholder="quick search" quick-search-button class="search-query"
               ng-model="criteria.quickSearch"/>
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
        scope.search(scope.criteria)

      if event.which is 27
        scope.criteria.quickSearch = "" if scope.criteria
        scope.$apply()
        scope.search(scope.criteria)
