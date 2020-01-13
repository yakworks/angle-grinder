import angular from 'angular'
import gridzModule from '../../gridzModule'
import BaseCtrl from '../../../utils/BaseCtrl'

const gridz = angular.module(gridzModule)


// Wrapper for jqGrid public API
// Controller instance could be published to the parent scope
// with `ag-grid-name` directive, for example:
// `<div ag-grid="gridOptions" ag-grid-name="usersGrid"></div>`
var AgGridCtrl = (function() {
  let highlightClass = undefined
  AgGridCtrl = class AgGridCtrl extends BaseCtrl {
    static initClass() {

      this.register(gridz, "AgGridCtrl")
      this.inject("$rootScope", "$element", "$attrs", "$q", "hasSearchFilters", "FlattenServ", "xlsData", "csvData")

      highlightClass = 'ui-state-highlight'
    }

    getGridEl() {
      return this.gridEl || (this.gridEl = this.$element.find("table.gridz"))
    }

    getGridId() {
      return this.getGridEl().attr("id")
    }

    // Gives the currently selected rows when multiselect is set to true.
    // This is a one-dimensional array and the values in the array correspond
    // to the selected id's in the grid.
    getSelectedRowIds() {
      return this.getParam("selarrrow")
    }

    //Gives selected row objects, [{id:1..}, {id:2..}]
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

    //Return all rows
    getAllRows() {
      return this.getGridEl().getRowData()
    }

    // Populates the grid with the given data.
    addJSONData(data) {
      // The addJSONData is very old method which uses still expandos
      // to the DOM element of the grid (<table> element).
      this.getGridEl().get(0).addJSONData(data)

      // broadcasts the AngularJS event
      return this.$rootScope.$broadcast("gridz:loadComplete", data)
    }

    // Reloads the grid with the current settings
    reload(options){
      if (options == null) { options = [] }
      const deferred = this.$q.defer()

      var unregister = this.$rootScope.$on("gridz:loadComplete", function(_, data) {
        deferred.resolve(data)
        return unregister()
      })

      this.getGridEl().trigger("reloadGrid", options)

      return deferred.promise
    }

    // Gets a particular grid parameter
    getParam(name) {
      return this.getGridEl().getGridParam(name)
    }

    // Sets the given grid parameter
    setParam(params) {
      return this.getGridEl().setGridParam(params)
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
          for (let key of Array.from(diff)) { flatData[key] = null }
        }
      }

      this.getGridEl().setRowData(id, flatData)
      this.flashOnSuccess(id)
      return this.$rootScope.$broadcast("gridz:rowUpdated", this.$attrs.agGrid, id, data)
    }

    // Inserts a new row with id = rowid containing the data in data (an object) at
    // the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
    // The syntax of the data object is: {name1:value1,name2: value2...}
    // where name is the name of the column as described in the colModel and the value is the value.
    addRow(id, data, position) {
      if (position == null) { position = "first" }
      this.getGridEl().addRowData(id, this.FlattenServ(data), position)
      this.$rootScope.$broadcast("gridz:rowAdded", this.$attrs.agGrid, id, data)
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
      return this.getParam("page")
    }

    // Returns the total number of records
    getTotalRecords() {
      return this.getParam("records")
    }

    // Returns the number of rows per page
    getPageSize() {
      return this.getParam("rowNum")
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
      this.setParam({page})
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
    search(filters) {
      const deferred = this.$q.defer()

      const params = {
        page: 1,
        search: this.hasSearchFilters(filters),
        postData: { filters: JSON.stringify(filters)
      }
      }

      this.setParam(params)

      const promise = this.reload()
      promise.then(() => deferred.resolve(filters))

      return deferred.promise
    }

    // Returns `true` if a columnt with the given id is hidden
    isColumnHidden(columnId) {
      const column = _.find(this.getParam("colModel"), {name: columnId})
      return column?.hidden
    }

    // Toggle visibility of a column with the given id
    toggleColumn(columnId) {
      const showOrHide = this.isColumnHidden(columnId) ? "showCol" : "hideCol"
      this.getGridEl().jqGrid(showOrHide, columnId)
      return this._triggerResize()
    }

    // Invokes a dialog for choosing and reordering grid's columns
    // see: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3ajquery_ui_methods#column_chooser
    columnChooser(options) {
      // Function which will be called when the user press Ok button
      // inside the column chooser dialog.
      if (options == null) { options = {} }
      options.done = perm => {
        // call `remapColumns` method in order to reorder the columns
        if (perm) { this.getGridEl().jqGrid("remapColumns", perm, true) }

        // TODO wrap it into service
        // Store chosen column in the local storage
        const chosenColumns = _.map(this._getColModel(), column => _.pick(column, "name", "hidden"))

        return window.localStorage.setItem(`gridz.${this.getGridId()}.chosenColumns`, angular.toJson(chosenColumns))
      }

      return this.getGridEl().jqGrid("columnChooser", options)
    }

    // Returns data uri with xls file content for rows from the current grid view.
    getXlsDataUri() {
      return this.xlsData(this.getGridId(), this.getSelectedRowIds())
    }

    getCsvData() {
      return this.csvData(this.getGridId(), this.getSelectedRowIds())
    }

    // Triggers grid's resize event
    // @private
    // TODO fix grid resizing issues
    // TODO resize after column chooser dialog
    _triggerResize() {
      return this.getGridEl().trigger("resize")
    }

    // Flash the given row
    flashOnSuccess(id, complete) {
      if (complete == null) { complete = angular.noop }
      return this._flashRow(id, "#DFF0D8", complete)
    }

    // Flash the row with red background
    flashOnError(id, complete) {
      if (complete == null) { complete = angular.noop }
      return this._flashRow(id, "#FF0000", complete)
    }

    _flashRow(id, color, complete) {
      if (color == null) { color = "#DFF0D8" }
      if (complete == null) { complete = angular.noop }
      const rowEl = $(this.getGridEl()[0].rows.namedItem(id))

      rowEl.css("background-color", color)
      rowEl.delay(250).fadeOut("medium", () => rowEl.css("background-color", ""))

      return rowEl.fadeIn("fast", () => complete())
    }

    addClass(id, clazz, animation) {
      if (animation == null) { animation = true }
      const rowEl = $(this.getGridEl()[0].rows.namedItem(id))

      if (!rowEl.hasClass(clazz)) {
        if (animation) {
          rowEl.delay(250).fadeOut("medium", () => rowEl.addClass(clazz))
          return rowEl.fadeIn("fast", () => angular.noop())
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
          rowEl.delay(250).fadeOut("medium", () => rowEl.removeClass(clazz))
          return rowEl.fadeIn("fast", () => angular.noop())
        } else {
          return rowEl.removeClass(clazz)
        }
      }
    }

    highlightRow(id) {
      const rowEl = $(this.getGridEl()[0].rows.namedItem(id))
      if (!rowEl.hasClass(highlightClass)) {
        return rowEl.addClass(highlightClass)
      }
    }

    unHighlightRow(id) {
      const rowEl = $(this.getGridEl()[0].rows.namedItem(id))
      if (rowEl.hasClass(highlightClass)) {
        return rowEl.removeClass(highlightClass)
      }
    }

    addAdditionalFooter(data) {
      const footerRow = this.$element.find('tr.footrow')
      let newFooterRow = undefined
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
        for (let k in data) {
          const v = data[k]
          const td = newFooterRow.find("[aria-describedby=\"arTranGrid_" + k + '"' + ']')
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
  AgGridCtrl.initClass()
  return AgGridCtrl
})()
