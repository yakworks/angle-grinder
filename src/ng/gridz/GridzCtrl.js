/* eslint-disable no-unused-vars */
import gridzInit from './gridzInit'
import _ from 'lodash'
import Log from 'angle-grinder/src/utils/Log'

export default class GridzCtrl {
  highlightClass = 'ui-state-highlight'
  systemColumns = ['cb', '-row_action_col']
  isDense = false

  /* @ngInject */
  constructor($rootScope, $scope, $element, $attrs, $q, $compile, hasSearchFilters, FlattenServ, xlsData, csvData, $window) {
    this.$rootScope = $rootScope
    this.$scope = $scope
    this.$element = $element
    this.$attrs = $attrs
    this.$q = $q
    this.$compile = $compile
    this.hasSearchFilters = hasSearchFilters
    this.FlattenServ = FlattenServ
    this.csvData = csvData
    this.xlsData = xlsData
    this.$window = $window
  }

  $onInit() {
    // Log.debug('AgGridCtrl $onInit')
    const { $element, gridId, gridOptions } = this
    const gridEl = this.getGridEl()

    gridEl.attr('id', gridId)

    // pager ID setup
    if (gridOptions.pager !== false) {
      const pagerId = `${gridId}-pager`
      $element.find('div.gridz-pager').attr('id', pagerId)
      gridOptions.pager = pagerId
    }

    // set the hasSelected flag events
    const onSelect = () => {
      this.$rootScope.$evalAsync(() => {
        this.hasSelected = (this.getSelectedRowIds().length > 0)
      })
    }
    gridEl.on('jqGridSelectRow', onSelect)
    gridEl.on('jqGridSelectAll', onSelect)

    gridzInit.setupCtxMenu(this, gridOptions)
    gridzInit.setupDataLoader(this, gridOptions)
    gridzInit.setupGridCompleteEvent(this, gridEl, gridOptions)
  }

  // $postLink() {
  // Log.debug('AgGridCtrl $postLink')
  // }

  $onDestroy() {
    this.getGridEl().jqGrid('GridDestroy')
  }

  getGridEl() {
    return this.gridEl || (this.gridEl = this.$element.find('table.gridz'))
  }

  getGridId() {
    return this.getGridEl().attr('id')
  }

  getGridz() {
    return this.getGridEl().data('gridz')
  }

  // Gives the currently selected rows when multiselect is set to true.
  // This is a one-dimensional array and the values in the array correspond
  // to the selected id's in the grid.
  getSelectedRowIds() {
    return this.getParam('selarrrow')
  }

  hasSelectedRowIds() {
    return this.getParam('selarrrow').length > 0
  }

  // Gives selected row objects, [{id:1..}, {id:2..}]
  getSelectedRows() {
    const getRowData = _.bind(this.getRowData, this)
    const ids = this.getSelectedRowIds()
    return _.map(ids, id => getRowData(id))
  }

  clearSelection() {
    return this.getGridEl().jqGrid('resetSelection')
  }

  // Returns an array with data of the requested id = rowid.
  // The returned array is of type name:value, where the name is
  // a name from colModel and the value from the associated column in that row.
  // It returns an empty array if the rowid can not be found.
  getRowData(rowId = null) {
    return this.getGridEl().getRowData(rowId)
  }

  // Return all rows
  getAllRows() {
    return this.getGridEl().getRowData()
  }

  // Populates the grid with the given data.
  addJSONData(data) {
    // The addJSONData is very old method which uses still expandos
    // to the DOM element of the grid (<table> element).
    this.getGridEl().get(0).addJSONData(data)

    // broadcasts the AngularJS event
    return this.$rootScope.$broadcast('gridz:loadComplete', data)
  }

  // Reloads the grid with the current settings
  reload(options) {
    if (options == null) { options = [] }
    const deferred = this.$q.defer()

    var unregister = this.$rootScope.$on('gridz:loadComplete', function (_, data) {
      deferred.resolve(data)
      return unregister()
    })

    this.getGridEl().trigger('reloadGrid', options)

    return deferred.promise
  }

  // reloads and keeps what was selected
  reloadKeepSelected() {
    // Save id of the selected row
    const selRow = angular.copy(this.getParam('selrow'))
    const selRows = angular.copy(this.getParam('selarrrow'))

    const gridEl = this.getGridEl()
    // Save grid scroll position
    // const scrollPosition = $scope.grid.getGridEl().closest('.ui-jqgrid-bdiv').scrollTop()
    gridEl.closest('.ui-jqgrid-bdiv').scrollTop()

    const afterGridComplete = () => {
      this.clearSelection()
      if (this.getParam('multiselect')) {
        _.each(selRows, id => gridEl.jqGrid('setSelection', id))
      } else {
        gridEl.jqGrid('setSelection', selRow)
      }
      gridEl.off('jqGridAfterGridComplete', afterGridComplete)
    }
    // gridEl.off('jqGridAfterGridComplete', afterGridComplete).on('jqGridAfterGridComplete', afterGridComplete);
    // {current: true} - used for keep multi select
    return this.reload([{ current: true }])
  }

  resetSort(sortname = 'id', sortorder = 'asc') {
    const colModel = this.getParam('colModel')
    angular.forEach(colModel, column => column.lso = (column.name === sortname) || (column.name === 'id') ? sortorder : '')

    this.$element.find('span.s-ico').hide()
    this.setParam({ sortname, sortorder }) // .trigger('reloadGrid')
    this.reload([{ current: true }])
    const column = angular.element(`[id$='_${sortname}']`)
    // column.find('span.s-ico').show()

    const disabledClassName = 'ui-state-disabled'
    if (sortorder === 'asc') {
      column.find('.ui-icon-asc').removeClass(disabledClassName)
      column.find('.ui-icon-desc').addClass(disabledClassName)
    } else {
      column.find('.ui-icon-asc').addClass(disabledClassName)
      column.find('.ui-icon-desc').removeClass(disabledClassName)
    }
  }

  // Gets a particular grid parameter
  getParam(name) {
    return this.getGridEl().getGridParam(name)
  }

  // Sets the given grid parameter
  setParam(params) {
    return this.getGridEl().setGridParam(params)
  }

  // returns the column model
  getColModel() {
    return this.getParam('colModel')
    // return _.filter(this.getParam('colModel'), gridColumn => {
    //   return !systemColumns.includes(gridColumn.name)
    // })
  }

  // reconfigures columns, expects an objecct with a visible array and hidden array
  configColumns(colConfig) {
    const colSetup = { newColumnsOrder: [], displayedColumns: [], hiddenColumns: [] }

    this.getColModel().forEach((column, index) => {
      if (this.systemColumns.includes(column.name)) {
        return colSetup.newColumnsOrder.push(index)
      }
    })

    colConfig.visible.forEach(function (column, index) {
      colSetup.displayedColumns.push(column.name)
      colSetup.newColumnsOrder.push(column.originalId)
    })

    colConfig.hidden.forEach(function (column, index) {
      colSetup.hiddenColumns.push(column.name)
      colSetup.newColumnsOrder.push(column.originalId)
    })

    const gridEl = this.getGridEl()
    gridEl.remapColumns(colSetup.newColumnsOrder, true)
    gridEl.jqGrid('showCol', colSetup.displayedColumns)
    gridEl.jqGrid('hideCol', colSetup.hiddenColumns)
  }

  contextMenuClick = (model, menuItem) => {
    const id = model.id
    const menuItemKey = menuItem.key
    this.listCtrl.fireRowAction(model, menuItem)
    Log.debug("contextMenuClick this.listCtrl", this.listCtrl)
    Log.debug("contextMenuClick this", this)
    Log.debug("contextMenuClick id", id)
    Log.debug("menuItem.key", menuItem.key)

  }

  // Updates the values (using the data array) in the row with rowid.
  // The syntax of data array is: {name1:value1,name2: value2...}
  // where the name is the name of the column as described in the colModel
  // and the value is the new value.
  updateRow(id, data, emptyMissingCells) {
    if (emptyMissingCells == null) { emptyMissingCells = true }
    const flatData = this.FlattenServ(data)

    const prevData = this.getRowData(id)
    if (!_.isNil(prevData)) {
      // retrieve a list of removed keys
      let diff = _.difference(_.keys(prevData), _.keys(flatData))

      // filter out restricted (private) columns like `-row_action_col`
      const restrictedColumns = key => !key.match(/^-/)
      diff = diff.filter(restrictedColumns)

      // set empty values
      if (emptyMissingCells) {
        for (const key of Array.from(diff)) { flatData[key] = null }
      }
    }

    this.getGridEl().setRowData(id, flatData)
    this.flashOnSuccess(id)
    return this.$rootScope.$broadcast('gridz:rowUpdated', this.$attrs.agGrid, id, data)
  }

  // Inserts a new row with id = rowid containing the data in data (an object) at
  // the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
  // The syntax of the data object is: {name1:value1,name2: value2...}
  // where name is the name of the column as described in the colModel and the value is the value.
  addRow(id, data, position) {
    if (position == null) { position = 'first' }
    this.getGridEl().addRowData(id, this.FlattenServ(data), position)
    this.$rootScope.$broadcast('gridz:rowAdded', this.$attrs.agGrid, id, data)
    return this.flashOnSuccess(id)
  }

  // Returns `true` if the grid contains a row with the given id
  hasRow(id) {
    return !!this.getGridEl().getInd(id)
  }

  // Returns an array of the id's in the current grid view.
  // It returns an empty array if no data is available.
  getIds() {
    return this.getGridEl().getDataIDs()
  }

  // Returns the current page
  getCurrentPage() {
    return this.getParam('page')
  }

  // Returns the total number of records
  getTotalRecords() {
    return this.getParam('records')
  }

  // Returns the number of rows per page
  getPageSize() {
    return this.getParam('rowNum')
  }

  // Returns the total number of pages
  getTotalPages() {
    return Math.ceil(this.getTotalRecords() / this.getPageSize())
  }

  // return true if the current grid view displays the first page
  isFirstPage() {
    const page = this.getCurrentPage()
    return page === 1
  }

  // return true if the current grid view displays the last page
  isLastPage() {
    const page = this.getCurrentPage()
    return page === this.getTotalPages()
  }

  // Loads the previous page
  prevPage() {
    if (this.isFirstPage()) { return this.lastPage() }

    const page = this.getCurrentPage()
    return this.loadPage(page - 1)
  }

  // Loads the next page
  nextPage() {
    if (this.isLastPage()) { return this.firstPage() }

    const page = this.getCurrentPage()
    return this.loadPage(page + 1)
  }

  // Loads the first page
  firstPage() { return this.loadPage(1) }

  // Loads the last page
  lastPage() { return this.loadPage(this.getTotalPages()) }

  // Load the specific page
  loadPage(page) {
    this.setParam({ page })
    return this.reload()
  }

  saveRow(id, data) {
    if (this.hasRow(id)) {
      return this.updateRow(id, data)
    } else {
      return this.addRow(id, data)
    }
  }

  // Deletes the row with the id = rowid.
  // This operation does not delete data from the server.
  removeRow(id) {
    return this.flashOnSuccess(id, () => this.getGridEl().delRowData(id))
  }

  // Sets the grid search filters and triggers a reload
  quickSearch(queryText) {
    return this.search({ quickSearch: queryText })
  }

  // Sets the grid search filters and triggers a reload
  search(filters) {
    const deferred = this.$q.defer()

    const params = {
      page: 1,
      search: this.hasSearchFilters(filters),
      postData: { filters: JSON.stringify(filters) }
    }

    this.setParam(params)

    const promise = this.reload()
    promise.then(() => deferred.resolve(filters))

    return deferred.promise
  }

  // Returns `true` if a columnt with the given id is hidden
  isColumnHidden(columnId) {
    const column = _.find(this.getParam('colModel'), { name: columnId })
    return column?.hidden
  }

  // Toggle visibility of a column with the given id
  toggleColumn(columnId) {
    const showOrHide = this.isColumnHidden(columnId) ? 'showCol' : 'hideCol'
    this.getGridEl().jqGrid(showOrHide, columnId)
    return this._triggerResize()
  }

  // Returns data uri with xls file content for rows from the current grid view.
  getXlsDataUri() {
    return this.xlsData(this.getGridId(), this.getSelectedRowIds())
  }

  xlsExport() {
    if (this.getSelectedRowIds().length !== 0) {
      // if browser is IE then open new window and show SaveAs dialog, else use dataUri approach
      // can this part be deprecated?
      if ((this.$window.navigator.userAgent.indexOf('MSIE ') > 0) ||
        !!this.$window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
        let iframe = document.createElement('IFRAME')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        iframe = iframe.contentWindow || iframe.contentDocument
        const csvData = 'sep=|\r\n' + this.getCsvData()
        iframe.document.open('text/html', 'replace')
        iframe.document.write(csvData)
        iframe.document.close()
        iframe.focus()
        return iframe.document.execCommand('SaveAs', true, 'download.csv')
      } else {
        const dataUri = this.getXlsDataUri()
        const link = document.createElement('a')
        link.href = dataUri
        link.setAttribute('download', 'download.xls')
        document.body.appendChild(link)
        const clickev = document.createEvent('MouseEvents')
        // initialize the event
        clickev.initEvent('click', true, true)
        // trigger the event
        return link.dispatchEvent(clickev)
      }
    }
  }

  getCsvData() {
    return this.csvData(this.getGridId(), this.getSelectedRowIds())
  }

  toggleLoading(show = true) {
    const loadEl = this.$element.find(`#load_${this.gridId}`)
    return show ? loadEl.show() : loadEl.hide()
  }

  // Triggers grid's resize event
  // @private
  // TODO fix grid resizing issues
  // TODO resize after column chooser dialog
  _triggerResize() {
    return this.getGridEl().trigger('resize')
  }

  // Flash the given row
  flashOnSuccess(id, complete) {
    if (complete == null) { complete = angular.noop }
    return this._flashRow(id, '#DFF0D8', complete)
  }

  // Flash the row with red background
  flashOnError(id, complete) {
    if (complete == null) { complete = angular.noop }
    return this._flashRow(id, '#FF0000', complete)
  }

  _flashRow(id, color, complete) {
    if (color == null) { color = '#DFF0D8' }
    if (complete == null) { complete = angular.noop }
    const rowEl = $(this.getGridEl()[0].rows.namedItem(id))

    rowEl.css('background-color', color)
    rowEl.delay(250).fadeOut('medium', () => rowEl.css('background-color', ''))

    return rowEl.fadeIn('fast', () => complete())
  }

  addClass(id, clazz, animation) {
    if (animation == null) { animation = true }
    const rowEl = $(this.getGridEl()[0].rows.namedItem(id))

    if (!rowEl.hasClass(clazz)) {
      if (animation) {
        rowEl.delay(250).fadeOut('medium', () => rowEl.addClass(clazz))
        return rowEl.fadeIn('fast', () => angular.noop())
      } else {
        return rowEl.addClass(clazz)
      }
    }
  }

  removeClass(id, clazz, animation) {
    if (animation == null) { animation = true }
    const rowEl = $(this.getGridEl()[0].rows.namedItem(id))

    if (rowEl.hasClass(clazz)) {
      if (animation) {
        rowEl.delay(250).fadeOut('medium', () => rowEl.removeClass(clazz))
        return rowEl.fadeIn('fast', () => angular.noop())
      } else {
        return rowEl.removeClass(clazz)
      }
    }
  }

  // FIXME its not clear to me what these are for. The grid seems to works without the highloghtclass workgin
  highlightRow(id) {
    const rowEl = $(this.getGridEl()[0].rows.namedItem(id))
    if (!rowEl.hasClass(this.highlightClass)) {
      return rowEl.addClass(this.highlightClass)
    }
  }

  unHighlightRow(id) {
    const rowEl = $(this.getGridEl()[0].rows.namedItem(id))
    if (rowEl.hasClass(this.highlightClass)) {
      return rowEl.removeClass(this.highlightClass)
    }
  }

  addAdditionalFooter(data) {
    const footerRow = this.$element.find('tr.footrow')
    let newFooterRow
    newFooterRow = this.$element.find('tr.myfootrow')
    if (newFooterRow.length === 0) {
      // add second row of the footer if it's not exist
      newFooterRow = footerRow.clone()
      newFooterRow.addClass('myfootrow ui-widget-content')
      newFooterRow.insertAfter(footerRow)
    }
    // calculate the value for the second footer row
    return (() => {
      const result = []
      for (const k in data) {
        const v = data[k]
        const td = newFooterRow.find('[aria-describedby="arTranGrid_' + k + '"' + ']')
        if (td.length > 0) {
          if (!isNaN(v)) {
            result.push(td[0].innerHTML = `<div class='pull-right currency-content'>${v}</div>`)
          } else {
            result.push(td[0].innerHTML = `<div class=''>${v}</div>`)
          }
        } else {
          result.push(undefined)
        }
      }
      return result
    })()
  }
}
