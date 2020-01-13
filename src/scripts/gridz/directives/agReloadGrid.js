import angular from 'angular'
import gridzModule from '../gridzModule'

const gridz = angular.module(gridzModule)

// Directive to reload grid - keep scrolling position and selection
gridz.directive('agReloadGrid', [
  () => ({
    restrict: 'E',
    replace: true,

    // assign grid instance
    scope: {
      grid: '=for'
    },

    link($scope) {
      return $scope.reload = function() {
        // Save id of the selected row
        const selRow = angular.copy($scope.grid.getParam('selrow'))
        const selRows = angular.copy($scope.grid.getParam('selarrrow'))
        // Save grid scroll position
        const scrollPosition = $scope.grid.getGridEl().closest('.ui-jqgrid-bdiv').scrollTop()

        // Some grids may have selection in gridComplete so to be sure that after reload grid will have the same selection
        // set it after grid complete
        $scope.grid.getGridEl().on('jqGridAfterGridComplete', function() {
          $scope.grid.clearSelection()
          if ($scope.grid.getParam('multiselect')) {
            return _.each(selRows, id => $scope.grid.getGridEl().jqGrid('setSelection', id))
          } else {
            return $scope.grid.getGridEl().jqGrid('setSelection', selRow)
          }
        })
        // {current: true} - used for keep multi select
        return $scope.grid.reload([{ current: true }])
      }
    },

    template: '\
<a class="list" uib-tooltip="Reload Grid" ng-click="reload()"><i class="fa fa-refresh"></i></a>\
'
  })
])
