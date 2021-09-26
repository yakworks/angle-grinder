import angular from 'angular'
import grid2Mod from './module'
import GridCtrl from './GridCtrl'
// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'

angular.module(grid2Mod).directive('gridz',
  function($timeout, $parse) {
    const link = function(scope, element, attrs, gridCtrl) {
      // Log.debug('AgGrids post link')
      const gridEl = gridCtrl.getGridEl()

      // scope[gridId] will be set to gridCtrl
      $parse(gridCtrl.gridId).assign(scope, gridCtrl)

      const options = gridCtrl.gridOptions
      if (!options) { throw new Error('undefined grid options') }

      // Initializes a grid with the given options
      const initializeGrid = function() {
        // Log.debug(`[agGrid] initializing '${alias}' with`, options)

        // initialize gridz/jqGrid on the given element
        gridEl.gridz(options)

        // the query by example toolbar
        if (options.filterToolbar) {
          gridEl.jqGrid('filterToolbar', {
            beforeSearch() {
              const postData = gridEl.jqGrid('getGridParam', 'postData')
              const defaultFilters = postData.defaultFilters || postData.filters
              const filters = (_.extend(JSON.parse(defaultFilters), (_.pick(postData, (value, key) => !['page', 'filters', 'max', 'sort', 'order', 'nd', '_search'].includes(key)))))
              filters.firstLoad = false
              postData.defaultFilters = defaultFilters
              postData.filters = JSON.stringify(filters)
            }
          })
        }

        // FIXME Whats this doing?
        return angular.element(element.find('select').wrap('<span class="select-wrapper"></span>'))
      }

      if (element.is(':visible')) {
        // Element is visible, initialize the grid now
        return initializeGrid()
      } else {
        let unregister
        // Initialize the grid when the element will be visible
        let timeoutPromise = null
        return unregister = scope.$watch(function() {
          $timeout.cancel(timeoutPromise) // Cancel previous timeout
          // We have to do timeout because of this issue with uib-tab https://github.com/angular-ui/bootstrap/issues/3796
          // Otherwise when tab is clicked and digest cycle ($watch) runs, the element.is(":visible") is still false, and hence grid is never initialized.
          timeoutPromise = $timeout(function() {
            if (!element.is(':visible')) { return }
            // initialize the grid on the visible element
            initializeGrid()
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
        listCtrl: '<',
        formatters: '<'
      },
      template: `\
      <div class="gridz-wrapper">
        <gridz-toolbar options="gridCtrl.toolbarOptions"></gridz-toolbar>
        <table class="gridz" ng-class="{'is-dense': gridCtrl.isDense}"></table>
        <div class="gridz-pager"></div>
      </div>`,
      link: link
    }
  }
)
