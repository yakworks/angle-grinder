import angular from 'angular'
import grid2Mod from './module'
import GridCtrl from '../../gridz/GridCtrl'
// import Log from '@yakit/core/Log'
import _ from 'lodash'

angular.module(grid2Mod).directive('gridz',
  function($timeout, $parse, $compile) {
    'ngInject';
    const link = function($scope, $el, attrs, gridCtrl) {
      const $gridzEl = $el.find('table.gridz')

      gridCtrl.setupGrid($el, $gridzEl, gridCtrl.gridOptions)

      $gridzEl.on('jqGridAfterGridComplete', function() {
        //this compiles the angular html that gets generated by the formatters
        $compile($gridzEl)($scope)
      })

      $gridzEl.on( "gridz:selectedRows", function( event, selectedIds ) {
        // the toolbar is tied to the has selected, this makes it pick up the changes
        $scope.$evalAsync(() => {
          gridCtrl.hasSelected = gridCtrl.hasSelected
        })
      })

      $scope.$on('$destroy', function() {
        $gridzEl.jqGrid('GridDestroy')
      });

      // scope[gridId] will be set to gridCtrl
      // FIXME not clear what this is doing
      $parse(gridCtrl.gridId).assign($scope, gridCtrl)

      //FIXME is this drill still needed? looks like its for tabs and making sure we dont init early?
      if ($el.is(':visible')) {
        // Element is visible, initialize the grid now
        gridCtrl.initGridz()
      } else {
        let unregister
        // Initialize the grid when the element will be visible
        let timeoutPromise = null
        return unregister = $scope.$watch(function() {
          $timeout.cancel(timeoutPromise) // Cancel previous timeout
          // We have to do timeout because of this issue with uib-tab https://github.com/angular-ui/bootstrap/issues/3796
          // Otherwise when tab is clicked and digest cycle ($watch) runs, the element.is(":visible") is still false, and hence grid is never initialized.
          timeoutPromise = $timeout(function() {
            if (!$gridzEl.is(':visible')) { return }
            // initialize the grid on the visible element
            gridCtrl.initGridz()
            // unregister the watcher to free resources
            return unregister()
          }, 100, false) // Here false means don't fire new digest cycle, otherwise $watch will be called infinitely.

          return false
        })
      }
    }

    return {
      restrict: 'E',
      controller: GridCtrl,
      controllerAs: 'gridCtrl',
      bindToController: {
        toolbarOptions: '<',
        gridId: '@',
        gridOptions: '<',
        restrictSearch: '<',
        ctx: '<'
      },
      template: `\
      <div class="gridz-wrapper">
        <gridz-toolbar options="gridCtrl.toolbarOptions" ctx="gridCtrl.ctx" grid-ctrl="gridCtrl"></gridz-toolbar>
        <table class="gridz" ng-class="{'is-dense': gridCtrl.isDense}"></table>
        <div class="gridz-pager"></div>
      </div>`,
      link: link
    }
  }
)
