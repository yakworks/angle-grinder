/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module("angleGrinder.gridz");

gridz.directive("agResetSortGrid", [
  () => ({
    restrict: "E",
    replace: true,

    scope: {
      grid: "=for"
    },

    link($scope, element, attrs) {

      return $scope.resetSort = function() {
        const columnName = attrs.defaultColumn ? attrs.defaultColumn : "id";
        const order = attrs.defaultOrder ? attrs.defaultOrder : "asc";

        const colModel = $scope.grid.getGridEl().getGridParam("colModel");
        angular.forEach(colModel, column => column.lso = (column.name === columnName) || (column.name === 'id') ? order : '');

        angular.element(`[ag-grid-name='${attrs.for}']`).find('span.s-ico').hide();
        $scope.grid.getGridEl().setGridParam({sortname: columnName, order}).trigger('reloadGrid');

        const column = angular.element(`[id$='_${columnName}']`);
        column.find("span.s-ico").show();

        const disabledClassName = "ui-state-disabled";
        if (order === "asc") {
          column.find(".ui-icon-asc").removeClass(disabledClassName);
          column.find(".ui-icon-desc").addClass(disabledClassName);
        } else {
          column.find(".ui-icon-asc").addClass(disabledClassName);
          column.find(".ui-icon-desc").removeClass(disabledClassName);
        }

      };
    },

    template: `\
<a class="list" uib-tooltip="Reset Sorting" ng-click="resetSort()"><i class="fa fa-sort"></i></a>\
`
  })
]);

