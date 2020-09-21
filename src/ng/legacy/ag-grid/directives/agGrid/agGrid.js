import angular from 'angular'
import gridzModule from '../../gridzModule'
import agGridCtrl from './agGridCtrl'
import Log from '../../../../../../src/utils/Log'
import _ from 'lodash'

const gridz = angular.module(gridzModule)

gridz.directive('agGrid',
  function($timeout, $parse, $q, GridDataLoader, ActionPopupHandler, pathWithContext) {
    const link = function(scope, element, attrs, gridCtrl) {
      // Log.debug('AgGrids post link')
      // find grid placeholder
      const gridEl = gridCtrl.getGridEl()

      // publish agGrid controller to the parent scope
      const alias = attrs.agGridName
      const actionCtrl = scope[attrs.actionCtrl]
      // scope[agGridName] will be set to gridCtrl
      if (alias) { $parse(alias).assign(scope, gridCtrl) }
      // assign scope.$grid as well to gridCtrl
      $parse('$grid').assign(scope, gridCtrl) // Make the grid available to controllers as $scope.$grid

      // read grid options
      const optionsPromise = $parse(attrs.agGrid)(scope)
      // for the cases when options are promises(when it loads from backend)
      $q.when(optionsPromise).then(options => {
        if (!options) { throw new Error('undefined grid options') }

        // read colModel from the `ag-grid-col-model` attribute
        if (attrs.agGridColModel) { options.colModel = angular.fromJson(attrs.agGridColModel) }

        // kill the grid when the related scope is destroyed
        scope.$on('$destroy', function() {
          // Log.debug('[agGrid] destroying the grid', gridEl)
          return gridEl.jqGrid('GridDestroy')
        })

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

          if (options.dropGrouping) {
            const { groupingView } = options
            groupingView.groupText = groupingView.groupText.map(value => '<input type="checkbox" class="cbox"/>' + value)
            gridEl.jqGrid('setGridParam', 'groupingView', groupingView)
          }

          gridEl.on('jqGridAfterGridComplete', function() {
            if (options.dropGrouping) {
              const gridId = alias
              $('tr.ui-jqgrid-labels th div').draggable({
                appendTo: 'body',
                helper: 'clone'
              })

              $(`#${alias}GroupDropDown div.tagged-input`).droppable({
                activeClass: 'ui-state-default',
                hoverClass: 'ui-state-hover',
                accept: ':not(.ui-sortable-helper)',
                drop(event, ui) {
                  const $this = $(this)
                  $this.find('.placeholder').remove()
                  const groupingColumn = $("<div class='tag'></div>").attr('data-column', ui.draggable.attr('id').replace('jqgh_' + gridId + '_', ''))
                  $('<i class="fa fa-times" aria-hidden="true"> </i>').click(function() {
                    $(this).parent().remove()
                    $('#' + gridId).jqGrid('groupingRemove')
                    $('#' + gridId).jqGrid('groupingGroupBy', $(`#${alias}GroupDropDown div.tag:not(.placeholder)`).map(function() {
                      return $(this).attr('data-column')
                    }).get()
                    )
                    if ($(`#${alias}GroupDropDown div.tag:not(.placeholder)`).length === 0) {
                      $('<div class="placeholder"></div>').appendTo($this)
                    }
                  }).appendTo(groupingColumn)
                  groupingColumn.append(ui.draggable.text())
                  groupingColumn.appendTo($this)
                  $('#' + gridId).jqGrid('groupingRemove')
                  $('#' + gridId).jqGrid('groupingGroupBy', $(`#${alias}GroupDropDown div.tag:not(.placeholder)`).map(function() {
                    return $(this).attr('data-column')
                  }).get()
                  )
                }
              }).sortable({
                items: 'div.tag:not(.placeholder)',
                sort() {
                  $(this).removeClass('ui-state-default')
                },
                stop() {
                  $('#' + gridId).jqGrid('groupingRemove')
                  $('#' + gridId).jqGrid('groupingGroupBy', $(`#${alias}GroupDropDown div.tag:not(.placeholder)`).map(function() {
                    return $(this).attr('data-column')
                  }).get()
                  )
                }
              })
            }

            // Add `min` class to remove pading to minimize row height
            if (options.minRowHeight) {
              return _.each(gridEl[0].rows, it => angular.element(it).addClass('min'))
            }
          })

          const groupCheckBox = '.jqgroup > td > .cbox'

          gridEl.on('jqGridSelectAll', function() {
            if (options.dropGrouping) {
              const isChecked = $('#cb_' + alias).is(':checked')
              const selectedIds = gridEl.jqGrid('getGridParam', 'selarrrow')
              return $(groupCheckBox).each(function() {
                const row = $(this).closest('tr')
                if (isChecked) {
                  selectedIds.push(row.attr('id'))
                  row.addClass('ui-state-highlight')
                  return $(this).prop('checked', true)
                } else {
                  row.removeClass('ui-state-highlight')
                  return $(this).prop('checked', false)
                }
              })
            }
          })

          initGroupCheckboxes(alias, groupCheckBox)

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
            }
            )
          }

          // initialize actionPopup handler
          ActionPopupHandler(gridEl, actionCtrl || scope, attrs)
          return angular.element(element.find('select').wrap('<span class="select-wrapper"></span>'))
        }

        // Initiates group checkbox action.
        // When a group checkbox is checked
        // walks through records and selects them
        // until next group checkbox is found.
        var initGroupCheckboxes = function(gridId, checkboxSelector) {
          const headerSelector = `.${alias}ghead_0`
          return $('#' + gridId).on('change', checkboxSelector, function(e) {
            const currentCB = $(this)
            gridEl.setSelection($(this).closest('tr').attr('id'))
            const headers = currentCB.closest('tr').nextUntil(headerSelector)
            const checkboxes = headers.find('.cbox[type="checkbox"]')
            return checkboxes.each(function() {
              return gridEl.setSelection($(this).closest('tr').attr('id'))
            })
          })
        }

        if (options.dropGrouping) {
          const dropDownsection = angular.element(`<div >
<div class='tagged-input' style="min-height: 35px; margin-bottom: -4px">Drop headers here</div>
 </div>`
          )
          dropDownsection.attr('id', `${alias}GroupDropDown`)
          element.prepend(dropDownsection)
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
      })
    }

    return {
      restrict: 'A',
      controller: agGridCtrl,
      template: `\
<table class="gridz"></table>
<div class="gridz-pager"></div>`,
      link: link
    }
  }
)
