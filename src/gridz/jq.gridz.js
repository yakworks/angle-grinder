/* eslint-disable no-unused-vars */
import _ from 'lodash'
import Log from '../utils/Log'

/**
 * jquery library to wrap jqgrid and add our defaults
 */
class Gridz {
  constructor(element, options) {
    this.init(element, options)
  }

  init(element, opts) {
    this.gridEl = $(element)
    this.gridId = this.gridEl.attr('id')

    // the containing div for the grid, will be built after jqGrid is called
    this.gboxId = `gbox_${this.gridId}`
    this.options = this.getOptions(opts)

    // if (this.options.actionPopup) { this.addRowActionColumn() }
    if (this.options.editOndblClick) { this.editOndblClick() }

    // call the jqgrid
    this.gridEl.jqGrid(this.options)

    if ($.isFunction(this.options.jqGridAfterGridComplete)) { this.gridEl.on('jqGridAfterGridComplete', this.options.jqGridAfterGridComplete) }
    if ($.isFunction(this.options.jqGridAfterInsertRow)) { this.gridEl.on('jqGridAfterInsertRow', this.options.jqGridAfterInsertRow) }
    if (this.options.multiSetSelection) { this.selectedRowIds = [] }

    return this.responsiveResize()
  }

  getOptions(options) {
    options = $.extend({}, $.fn.gridz.defaults, options)

    // Events .. beforeSelectRow
    const optBeforeSelectRow = options.beforeSelectRow
    options.beforeSelectRow = function(rowid, e) {
      let resp
      this.beforeSelectRow.apply(this, arguments)
      if ($.isFunction(optBeforeSelectRow)) { resp = optBeforeSelectRow.apply(this, arguments) }
      if ((resp === true) || (_.isNil(resp))) { return true } else { return false }
    }.bind(this)

    // Events .. onSelectRow
    const optOnSelectRow = options.onSelectRow
    options.onSelectRow = function(rowid, isChecked, event) {
      this.onSelectRow.apply(this, arguments)
      if ($.isFunction(optOnSelectRow)) { optOnSelectRow.apply(this, arguments) }
      return true
    }.bind(this)

    const optOnSelectAll = options.onSelectAll
    options.onSelectAll = function(rowIds, status) {
      this.onSelectAll.apply(this, arguments)
      if ($.isFunction(optOnSelectAll)) { optOnSelectAll.apply(this, arguments) }
      return true
    }.bind(this)

    // Events .. gridComplete
    const _gridComplete = options.gridComplete
    options.gridComplete = function() {
      this.gridComplete.apply(this)
      if ($.isFunction(_gridComplete)) { _gridComplete.apply(this, arguments) }
      this.gridEl.trigger('gridComplete')
      if (this.options.multiSetSelection) { return this.memoizeSelectedRows() }
    }.bind(this)

    // By default free-jqrid prepared sorting properties with next pattern
    // sortName = columnName(id, name, etc) order(asc|desc), next column order of the last column name is in `order` parametr
    // Example: if user first sorted by name and then by id sort params will be look like {sortName: 'name asc, id', order: 'asc'}
    // Due to the fact that if id(or other unique) field is on the first place, the other sorting wont have any sense
    // `sortLast` option is added to move unique column to the last place
    //   Example: if user first sorted by id and then by name sort params will be look like {sortName: 'name asc, id', order: 'asc'}
    options.onSortCol = (sortname, x, order) => {
      if (options.multiSort) {
        // console.log('onSortCol sortname order', sortname, order)
        const id = options.sortLast || 'id'
        if (sortname.indexOf(id) > -1) {
          sortname = sortname + ` ${order}`
          const sortArray = sortname.split(',')
          const res = []
          let sort = null
          const idRegex = new RegExp(`(${id}[ ]+(asc|desc))`)
          _.each(sortArray, function(it) {
            it = it.trim()
            if (_.isNil(idRegex.exec(it))) {
              return res.push(it)
            } else {
              return sort = it.split(' ')
            }
          })
          if (sort) { res.push(sort[0]) }
          sortname = res.join(',')
          this.gridEl.jqGrid('setGridParam', { sortname })
          if (sort) { return this.gridEl.jqGrid('setGridParam', { order: sort[1] }) }
        }
      }
    }

    // If true - provides a possibility to select multiple sets of records with "shift" key.
    // Previously selected group(s) will not be unselected.
    options.multiSetSelection = options.multiselect && options.multiSetSelection

    // if sortable is true then add exclusion for the action column
    if (options.actionPopup && options.sortable) {
      options.sortable = { exclude: `#${this.gridId}_-row_action_col` }
    }

    return options
  }

  /*
  stuff to do after the grid is completed loading and rendering
  */
  gridComplete() {
    if (this.options.actionPopup) { this.actionPopupSetup() }
    if (this.options.popups) {
      return _.each(this.options.popups, function(popupOptions) {
        return this.popupSetup(popupOptions.columnName, popupOptions.innerHTML)
      })
    }
  }

  /*
  Handles proper multi selection of rows
  */
  beforeSelectRow(rowid, e) {
    const {
      rows
    } = this.gridEl[0]

    // get id of the previous selected row
    const startId = this.gridEl.jqGrid('getGridParam', 'selrow')
    const isCheckBox = $(e.target).hasClass('cbox')

    if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !isCheckBox) {
      // Reset selection if multiboxonly is set to true read http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
      // default multiboxonly doesn't work with ctrl/shift keys.
      if (this.gridEl.jqGrid('getGridParam', 'agMultiboxonly')) { this.gridEl.jqGrid('resetSelection') }
    }
    if (startId && e.shiftKey) {
      this.gridEl.jqGrid('resetSelection')

      // get DOM elements of the previous selected and
      // the selected rows
      const startRow = rows.namedItem(startId)
      const endRow = rows.namedItem(rowid)
      if (startRow && endRow) {
        // get min and max from the indexes of the previous selected
        // and the selected rows
        const iStart = Math.min(startRow.rowIndex, endRow.rowIndex)
        const rowIdIndex = endRow.rowIndex
        const iEnd = Math.max(startRow.rowIndex, rowIdIndex)
        let i = iStart
        while (i <= iEnd) {
          // the row with rowid will be selected by
          // jqGrid. So we don't need select it
          if (i !== rowIdIndex) { this.gridEl.jqGrid('setSelection', rows[i].id, false) }
          i++
        }
      }

      // clear text selection
      if (document.selection && document.selection.empty) {
        document.selection.empty()
      } else if (window.getSelection) { window.getSelection().removeAllRanges() }
    }

    if (this.options.multiSetSelection) { this.memoizeSelectedRows() }

    return true
  }

  memoizeSelectedRows() {
    const selectedRows = this.selectedRowIds
    return _.each(this.gridEl.jqGrid('getGridParam', 'selarrrow'), function(id) {
      if (!(Array.from(selectedRows).includes(id))) { return selectedRows.push(id) }
    })
  }

  onSelectAll() {
    if (this.options.multiSetSelection) { return this.selectedRowIds = [] }
  }

  onSelectRow(rowid, isChecked, e) {
    if (this.gridEl.jqGrid('getGridParam', 'agRowNumber')) {
    // Add number of selected row in grid(nmber for all pages)
      const ids = this.gridEl.getDataIDs()
      let text = ''
      // check if only one row is selected
      if (this.gridEl.jqGrid('getGridParam', 'selarrrow').length === 1) {
        // add to the grid footer number of the row in total for all pages
        const rowNum = ((this.gridEl.jqGrid('getGridParam', 'page') - 1) * this.gridEl.jqGrid('getGridParam', 'rowNum')) + ids.indexOf(rowid) + 1
        text = `Current row # ${rowNum} | `
      }

      //FIXME need to fix this
      const pager = this.gridEl.parent().parent().parent().parent().find('#paymentGrid-pager_right')
      const span = pager.find('#rowNum')
      if (span.length === 0) {
        pager.prepend(`<span id='rowNum'>${text} </span>`)
      } else {
        span.text(text)
      }
    }

    if (this.options.multiSetSelection) {
      if (!isChecked) { this.selectedRowIds.splice(this.selectedRowIds.indexOf(rowid), 1) }
      if (e?.shiftKey) {
        const grid = this.gridEl
        grid.jqGrid('resetSelection')
        grid.jqGrid('setSelection', rowid)
        const selectedRows = this.selectedRowIds
        const selected = grid.jqGrid('getGridParam', 'selarrrow')
        _.each(selectedRows, function(id) {
          if (!(Array.from(selected).includes(id))) { return grid.jqGrid('setSelection', id) }
        })
      }
    }

    return true
  }

  /*
  adds listener to resize grid to parent container when window is resized.
  This will work for reponsive and fluid layouts
  */
  responsiveResize() {
    const gboxId = `#gbox_${this.gridEl.attr('id')}`
    return $(window).on('resize', (event, ui) => {
      // Get width of parent container which is assumed to be expanded to span
      let parWidth
      if ($(gboxId).parent().width() > 0) {
        parWidth = $(gboxId).parent().width()
      } else {
        parWidth = $('#page').width()
      }
      const curWidth = $(gboxId).width()
      const w = parWidth - 1 // add -1 Fudge factor to prevent horizontal scrollbars

      if (Math.abs(w - curWidth) > 2) {
        return this.gridEl.setGridWidth(w)
      }
    })
  }
}

// register namespace
// $.extend(true, window, { grinder: { Grid: Gridz } })

// Jquery Plugin definition
$.fn.gridz = function(option) {
  let instance
  if (typeof option === 'string') {
    const otherArgs = Array.prototype.slice.call(arguments, 1)
    instance = $(this).data('gridz')
    if (instance && instance[option]) {
      instance[option].apply(this, otherArgs)
    } else {} // try passing through to jqgrid
    return $(this).jqGrid(arguments)
  }

  return this.each(function() {
    const el = $(this)
    // Log.debug("gridz el", el)
    instance = el.data('gridz')

    const options = typeof option === 'object' ? option : {}
    // Log.debug("gridz instance", instance)
    if (!instance) {
      const ginstance = el.data('gridz', (instance = new Gridz(this, options)))
      // Log.debug("el.data('gridz')", el.data('gridz'))
      return ginstance
    }
  })
}

$.fn.gridz.Constructor = Gridz

$.fn.gridz.defaults = {
  prmNames: {
    page: 'page',
    rows: 'max',
    sort: 'sort',
    order: 'order'
  },
  localReader: {
    root: 'data'
  },

  // Defines in what format to expect the data that fills the grid.
  //   json  - use internal jqgrid function to load the data via ajax
  //   local - use local data
  datatype: 'json',

  mtype: 'GET', // for the ajax json read
  rowNum: 20, // num rows to show by default
  rowList: [10, 20, 50, 100],
  altRows: true,
  shrinkToFit: true,
  autowidth: true,
  height: '100%',
  sortable: true,
  multiselect: true, // one or more row selections
  viewrecords: true, // shows beginning and ending record number in the grid, out of the total number of records in the query.
  // Specify records info format
  // {0} - the start position of the records depending on page number and number of requested records
  // {1} - the end position
  // {2} - total records returned from the server.
  recordtext: 'Records {0} - {1} of {2}',

  beforeSelectRow: null,
  gridComplete: null,
  actionPopup: false
}
