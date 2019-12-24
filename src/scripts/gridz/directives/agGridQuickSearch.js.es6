/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const gridz = angular.module("angleGrinder.gridz");

gridz.directive("agGridQuickSearch", [
  () => ({
    restrict: "E",

    // filters are optional
    scope: {
      grid: "=for",  // assign grid instance
      filters: "=?"
    },

    link($scope) {
      // apply empty quick search filter
      if (!$scope.filters?) { $scope.filters = {}; }
      angular.extend($scope.filters, {quickSearch: ""});

      // perform grid search
      return $scope.search = filters => $scope.grid.search(filters);
    },

    template: `\
<form class="search-form pull-right right-margin-5" style="padding-top: 6px" name="quickSearch">
  <input type="text" placeholder="quick search" quick-search-button class="search-query"
         ng-model="filters.quickSearch"/>
</form>\
`
  })
]);

// Trigers search on enter in quick serch input
gridz.directive("quickSearchButton", () => (scope, element, attrs) => element.bind("keydown", function(event){
  // 13 - Enter key code
  if (event.which === 13) {
    event.preventDefault();
    scope.search(scope.filters);
  }

  if (event.which === 27) {
    if (scope.filters) { scope.filters.quickSearch = ""; }
    scope.$apply();
    return scope.search(scope.filters);
  }
}));
