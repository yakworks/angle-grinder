import angular from 'angular'
import grid2Mod from './module'
import './toolbar'
import './support'
import GridzCtrl from './GridzCtrl'
// jqgrid jquery setup
import './gridz'
import './formatters'
import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'

export default grid2Mod

angular.module(grid2Mod).directive('gridz',
  function($timeout, $parse, GridDataLoader, ActionPopupHandler, pathWithContext) {
    const link = function(scope, element, attrs, gridCtrl) {
      // Log.debug('AgGrids post link')
      // find grid placeholder
      const gridEl = gridCtrl.getGridEl()

      // publish agGrid controller to the parent scope
      const alias = gridCtrl.gridId // attrs.gridId
      const actionCtrl = gridCtrl.actionCtrl // scope[attrs.actionCtrl]
      // gridCtrl.actionCtrl = actionCtrl
      console.log('actionCtrl', actionCtrl)
      // scope[gridId] will be set to gridCtrl
      if (alias) { $parse(alias).assign(scope, gridCtrl) }

      const options = gridCtrl.gridOptions
      if (!options) { throw new Error('undefined grid options') }

      // Initializes a grid with the given options
      const initializeGrid = function() {
        // Log.debug(`[agGrid] initializing '${alias}' with`, options)

        // assign the url
        if (!(!_.isNil(options.url)) && (!_.isNil(options.path))) {
          options.url = pathWithContext(options.path)
        }

        // use `$http` service to load the grid data
        if ((options.datatype === undefined) || (options.datatype === null)) {
          options.datatype = GridDataLoader(options.url, gridCtrl)
        }
        gridEl.on('jqGridAfterGridComplete', function() {
          // Add `min` class to remove pading to minimize row height
          if (options.minRowHeight) {
            return _.each(gridEl[0].rows, it => angular.element(it).addClass('min'))
          }
        })

        // jqGrid sucks at this point it expects `pager` to be an id
        if (options.pager !== false) {
          options.pager = element.find('.gridz-pager').attr('id') || 'gridz-pager'
        }

        if (options.selectFirstRow === true) {
          const _gridComplete = options.gridComplete
          const onGridComplete = function() {
            const dataIds = gridEl.getDataIDs()
            if (dataIds.length > 0) {
              gridEl.setSelection(dataIds[0], true)
            }
            if (_.isFunction(_gridComplete)) { return _gridComplete.apply(this, arguments) }
          }
          options.gridComplete = onGridComplete
        }

        // initialize jqGrid on the given element
        gridEl.gridz(options)

        if (options.filterToolbar) {
          gridEl.jqGrid('filterToolbar', {
            beforeSearch() {
              const postData = gridEl.jqGrid('getGridParam', 'postData')
              const defaultFilters = postData.defaultFilters || postData.filters
              const filters = (_.extend(JSON.parse(defaultFilters), (_.pick(postData, (value, key) => !['page', 'filters', 'max', 'sort', 'order', 'nd', '_search'].includes(key)))))
              filters.firstLoad = false
              postData.defaultFilters = defaultFilters
              postData.filters = JSON.stringify(filters)
              // return console.log('Toolbar Search')
            }
          })
        }

        // initialize actionPopup handler
        ActionPopupHandler(gridEl, actionCtrl || scope, attrs)
        return angular.element(element.find('select').wrap('<span class="select-wrapper"></span>'))
      }

      if (element.is(':visible')) {
        // Element is visible, initialize the grid now
        return initializeGrid()
      } else {
        let unregister
        Log.info('grid is not visible:', alias)

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
      controller: GridzCtrl,
      controllerAs: 'gridCtrl',
      bindToController: {
        toolbarOptions: '<',
        gridId: '@',
        gridOptions: '<',
        actionCtrl: '<'
      },
      template: `\
      <div class="gridz-wrapper">
        <gridz-toolbar options="gridCtrl.toolbarOptions"></gridz-toolbar>
        <table class="gridz"></table>
        <div class="gridz-pager"></div>
      </div>`,
      link: link
    }
  }
)
