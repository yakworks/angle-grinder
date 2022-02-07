/* eslint-disable no-unused-vars */
import { makeLabel } from '@yakit/core/nameUtils'
import { xlsData, csvData } from './excelExport'
import flattenObject from '@yakit/core/flattenObject'
import toast from '@yakit/ui/growl'
import _ from 'lodash'
import { subscribe } from 'svelte/internal'

export default class GridDataApiCtrl {
  formatters
  dataApi
  unsubs = []
  highlightClass = 'ui-state-highlight'
  systemColumns = ['cb', '-row_action_col']
  isDense = false //DEPRECATED dont ue
  // injected
  ctx

  defaultCtxMenuOptions = {
    edit: {
      display: 'Edit',
      icon: 'far fa-edit'
    },
    delete: {
      display: 'Delete',
      icon: 'far fa-trash-alt'
    }
  }

  setupAndInit(wrapperNode, context) {
    this.ctx = context
    const gridWrapper = $(wrapperNode)
    const gridEl = gridWrapper.find('table.gridz')
    this.setupGrid(gridWrapper, gridEl)
    this.initGridz()

    return this.ctx
  }

  setupGrid(gridWrapper, jqGridElement) {

    // this.ctx = ctx
    const opts = this.ctx.gridOptions
    //assign itself so parents can see it
    this.ctx.gridCtrl = this
    // shortcut shared state
    // this.state = _.merge(this.state, this.ctx.state)
    this.stateStore = this.ctx.stateStore
    opts.loadui = 'block'
    this.gridOptions = opts

    opts.ondblClickRow = (rowid,iRow,iCol,e) => {
      let name = this.getColModel()[iCol]["name"]
      console.log("ondblClickRow ID", rowid)
      console.log("ondblClickRow Col", name)
      // console.log("ondblClickRow", rowid,iRow,iCol,e)
    }

    if(opts.hasOwnProperty('restrictSearch')) {
      this.restrictSearch = opts.restrictSearch
    }

    const $jqGrid = $(jqGridElement)
    this.jqGridEl = $jqGrid
    this.$gridWrapper = $(gridWrapper)

    //we need uniq gridId for cases if 2 grids on one page, in other case pagers will be messed
    if (!this.gridId) {
      //if no gridId is specified in opts, then generate it based on apiKey
      this.gridId =  opts.gridId || opts.dataApi?.key?.replace('/', '_')
    }
    $jqGrid.attr('id', this.gridId)

    let optsToMerge = _.pick(opts, [
      'dataApi', 'initSearch', 'restrictSearch', 'contextMenuClick'
    ])
    _.mergeWith(this, optsToMerge, (obj, optVal) => {
      //dont merge val if its null
      return optVal === null ? obj : undefined
    })

    // pager ID setup
    if (opts.pager !== false) {
      const pagerId = `${this.gridId}-pager`
      this.$gridWrapper.find('div.gridz-pager').attr('id', pagerId)
      opts.pager = pagerId
    }

    // set the hasSelected flag events
    const onSelect = (rowId, status, event) => {
      if (opts.eventHandlers?.onSelect && _.isFunction(opts.eventHandlers.onSelect)) {
        opts.eventHandlers.onSelect(rowId, status, event)
      }

      this.hasSelected = (this.getSelectedRowIds().length > 0)

      this.ctx.stateStore.update( state => {
        state.hasSelected = this.hasSelected
        return state
      })

      $jqGrid.trigger('gridz:selectedRows', [this.getSelectedRowIds()])
    }

    $jqGrid.on('jqGridSelectRow', onSelect)
    $jqGrid.on('jqGridSelectAll', onSelect)

    // if no datatype is passed in then use internal default
    if (_.isNil(opts.datatype)) {
      opts.datatype = (params) => this.gridLoader(params)
    }

    this.setupColModel(opts)
    this.setupCtxMenu(opts)
    // this.setupDataLoader(gridOptions)
    this.setupGridCompleteEvent(this, $jqGrid, opts)
    this.setupFormatters(this, $jqGrid, opts)
    this.formatters && this.setupCustomFormatters(this, this.formatters, opts)

    // adds the listener to the store
    const unsubscribe = this.dataApi.pageViewStore.subscribe(data => {
      this.addJSONData(data)
    });
    this.unsubs.push(unsubscribe)

  }

  //initialize the grid the jquery way
  initGridz(){
    this.jqGridEl.gridz(this.gridOptions)
  }

  // the jqGrid table element
  getGridEl() {
    return this.jqGridEl
  }

  // the wrapper div that has the toolbar and table and footer
  getGridWrapper() {
    return this.$gridWrapper
  }

  getGridId() {
    return this.jqGridEl.attr('id')
  }

  // Gives the currently selected rows when multiselect is set to true.
  // This is a one-dimensional array and the values in the array correspond
  // to the selected id's in the grid.
  getSelectedRowIds() {
    return this.getParam('selarrrow')
  }

  getSelectedRowId() {
    return this.getParam('selrow')
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
    return this.jqGridEl.jqGrid('resetSelection')
  }

  selectRow(selRowId) {
    this.clearSelection()
    return this.jqGridEl.jqGrid('setSelection', selRowId)
  }

  // Returns an array with data of the requested id = rowid.
  // The returned array is of type name:value, where the name is
  // a name from colModel and the value from the associated column in that row.
  // It returns an empty array if the rowid can not be found.
  getRowData(rowId = null) {
    return this.jqGridEl.getRowData(rowId)
  }

  // Return all rows
  getAllRows() {
    return this.jqGridEl.getRowData()
  }

  updateFooter(data) {
    if(this.jqGridEl) this.jqGridEl.footerData('set', data)
  }

  // Populates the grid with the given data.
  addJSONData(data) {
    //FIXME HACK not sure why we need to do this
    const jqgrid = this.jqGridEl.get(0)
    if(jqgrid.addJSONData && !_.isEmpty(data)){
      jqgrid.addJSONData(data)
    }
    // fire jquery event
    return this.jqGridEl.trigger('gridz:loadComplete', [data])
  }

  // Reloads the grid with the current settings
  reload(options) {
    return new Promise((resolve) => {
      if (options == null) { options = [] }
      this.jqGridEl.on( "gridz:loadComplete", function( event, data ) {
        resolve(data)
        $(this).off(event)
      });
      this.jqGridEl.trigger('reloadGrid', options)
    })
  }

  // reloads and keeps what was selected
  reloadKeepSelected() {
    // Save id of the selected row
    const selRow = _.cloneDeep(this.getParam('selrow'))
    const selRows = _.cloneDeep(this.getParam('selarrrow'))

    const jqGridEl = this.getGridEl()
    // Save grid scroll position
    jqGridEl.closest('.ui-jqgrid-bdiv').scrollTop()

    const afterGridComplete = () => {
      this.clearSelection()
      if (this.getParam('multiselect')) {
        _.each(selRows, id => jqGridEl.jqGrid('setSelection', id))
      } else {
        jqGridEl.jqGrid('setSelection', selRow)
      }
      jqGridEl.off('jqGridAfterGridComplete', afterGridComplete)
    }
    // jqGridEl.off('jqGridAfterGridComplete', afterGridComplete).on('jqGridAfterGridComplete', afterGridComplete);
    // {current: true} - used for keep multi select
    return this.reload([{ current: true }])
  }

  resetSort(sortname = '', sortorder = '') {
    console.log("resetSort",sortname,sortorder)
    const colModel = this.getParam('colModel')
    colModel.forEach(column => {
      column.lso = (column.name === sortname) || (column.name === 'id') ? sortorder : ''
    })
    this.setParam({'sortMap':{}}, true)
    let sortMap = this.getParam('sortMap')
    console.log("resetSort sortMap",sortMap)
    this.$gridWrapper.find('span.s-ico').hide()
    //this.setParam({ sortname, sortorder }) // .trigger('reloadGrid')
    this.reload([{ current: true }])
    // const column = this.$gridWrapper.find(`#jqgh_${this.gridId}_id`)
    // const disabledClassName = 'ui-state-disabled'
    // column.find('.s-ico').css('display', 'inline-block')
    // if (sortorder === 'asc') {
    //   column.find('.ui-icon-asc').removeClass(disabledClassName)
    //   column.find('.ui-icon-desc').addClass(disabledClassName)
    // } else {
    //   column.find('.ui-icon-asc').addClass(disabledClassName)
    //   column.find('.ui-icon-desc').removeClass(disabledClassName)
    // }
  }

  // Gets a particular grid parameter
  getParam(name) {
    return this.jqGridEl.getGridParam(name)
  }

  /**
   * Sets the given grid parameter, pass overwrite true if blanking out a param
   */
  setParam(params, overwrite) {
    this.jqGridEl.setGridParam(params, overwrite)
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

    colConfig.visible.forEach(function(column, index) {
      colSetup.displayedColumns.push(column.name)
      colSetup.newColumnsOrder.push(column.originalId)
    })

    colConfig.hidden.forEach(function(column, index) {
      colSetup.hiddenColumns.push(column.name)
      colSetup.newColumnsOrder.push(column.originalId)
    })

    const jqGridEl = this.getGridEl()
    jqGridEl.remapColumns(colSetup.newColumnsOrder, true)
    jqGridEl.jqGrid('showCol', colSetup.displayedColumns)
    jqGridEl.jqGrid('hideCol', colSetup.hiddenColumns)
  }

  // contextMenuClick = (model, menuItem) => {
    //listCtrl can pass the listener
    // return this.contextMenuClickAction(model, menuItem)
    //return this.listCtrl.fireRowAction(model, menuItem)
  // }

  // Updates the values (using the data array) in the row with rowid.
  // The syntax of data array is: {name1:value1,name2: value2...}
  // where the name is the name of the column as described in the colModel
  // and the value is the new value.
  updateRow(id, data, emptyMissingCells = false) {
    if (emptyMissingCells == null) { emptyMissingCells = true }
    const flatData = flattenObject(data)

   // const prevData = this.getRowData(id)
   // if (!_.isNil(prevData)) {
   //   // retrieve a list of removed keys
   //   let diff = _.difference(Object.keys(prevData), Object.keys(flatData))
   //   // filter out restricted (private) columns like `-row_action_col`
   //   const restrictedColumns = key => !key.match(/^-/)
   //   diff = diff.filter(restrictedColumns)
   //   // set empty values
   //   if (emptyMissingCells) {
   //     for (const key of Array.from(diff)) { flatData[key] = null }
   //   }
   // }

   this.jqGridEl.setRowData(id, {...flatData, ...data})
   this.flashOnSuccess(id)
   return this.jqGridEl.trigger('gridz:rowUpdated', [id, data])
  }

  // Inserts a new row with id = rowid containing the data in data (an object) at
  // the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
  // The syntax of the data object is: {name1:value1,name2: value2...}
  // where name is the name of the column as described in the colModel and the value is the value.
  addRow(id, data, position) {
    if (position == null) { position = 'first' }
    const flatData = flattenObject(data)
    console.log("addRow", data)
    this.jqGridEl.addRowData(id, data, position)
    this.flashOnSuccess(id)
    return this.jqGridEl.trigger('gridz:rowAdded', [id, data])
  }

  // Returns `true` if the grid contains a row with the given id
  hasRow(id) {
    return !!this.jqGridEl.getInd(id)
  }

  // Returns an array of the id's in the current grid view.
  // It returns an empty array if no data is available.
  getIds() {
    return this.jqGridEl.getDataIDs()
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

  addOrUpdateRow(id, data) {
    if (this.hasRow(id)) {
      return this.updateRow(id, data)
    } else {
      return this.addRow(id, data)
    }
  }

  // Deletes the row with the id = rowid.
  // This operation does not delete data from the server.
  removeRow(id) {
    return this.flashOnSuccess(id, () => this.jqGridEl.delRowData(id))
  }

  // Sets the grid search filters and triggers a reload
  async quickSearch(queryText) {
    return this.search(null, queryText)
  }

  // Sets the grid search filters and triggers a reload
  async search(q, queryText) {
    try {
      this.isSearching = true
      const params = {
        page: 1,
        search: this.hasSearchFilters(q)
      }
      this.setParam(params, true)

      let postData = { q }
      if (queryText || queryText === '') postData.qSearch = queryText
      this.setParam({ postData })

      //if its empty then manually blank it out
      if(_.isEmpty(q)){
        let pp = this.getParam("postData")
        pp.q = {}
      }
      //reload wil end up calling the gridLoader function
      await this.reload()
    } catch (er) {
      //XXX should not swallow errors
      console.error('search error', er)
    }
  }

  hasSearchFilters(filters) {
    for (const k in filters) {
      const value = filters[k]
      if (_.isNil(value)) { continue }

      if (typeof value === 'string') {
        if (value.trim() !== '') { return true }
      } else {
        return true
      }
    }
    return false
  }

  /**
   * The main loader for the grid. get called internally from pager and sort.
   *
   * @param {*} p the params to send to search
   */
  async gridLoader(p) {
    this.toggleLoading(true)
    try {
      //we use the sortMap that constructed in jq.gridz so remove the sort and order

      let sortMap = this.getParam('sortMap')
      if(sortMap){
        delete p.order; delete p.sort;
        p.sort = sortMap
      }

      // to be able to set default filters on the first load
      let q = p.q
      if(_.isString(q) && !_.isEmpty(q)){
        if (q.trim().indexOf('{') === 0) {
          q = JSON.parse(q)
        } else {
          q = {'$qSearch': q}
        }
      }
      // when grid is for child or detail data, restrictSearch is what to filter it by,
      // for example is showing invoices for customer then restrictSearch might be set to {custId:123}
      const restrictSearch = this.restrictSearch || {}
      // const initSearch = this.initSearch || {}
      // const search = _.merge(initSearch, searchModel || {})
      q = {...q, ...restrictSearch}

      //now if its not empty set it back to p
      if(!_.isEmpty(q)){
        p.q = q
      }
      const data = await this.dataApi.search(p)
      // this.addJSONData(data)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.toggleLoading(false)
    }
  }

  handleError(er) {
    console.error(er)
    toast.error(er)
  }

  // Returns `true` if a columnt with the given id is hidden
  isColumnHidden(columnId) {
    const column = _.find(this.getParam('colModel'), { name: columnId })
    return column?.hidden
  }

  // Toggle visibility of a column with the given id
  toggleColumn(columnId) {
    const showOrHide = this.isColumnHidden(columnId) ? 'showCol' : 'hideCol'
    this.jqGridEl.jqGrid(showOrHide, columnId)
    return this._triggerResize()
  }

  // Returns data uri with xls file content for rows from the current grid view.
  getXlsDataUri() {
    return xlsData(this.getGridId(), this.getSelectedRowIds())
  }

  // @ts-ignore
  xlsExport() {
    console.log('xlsExport', this.getSelectedRowIds())
    if (this.getSelectedRowIds().length !== 0) {
      // if browser is IE then open new window and show SaveAs dialog, else use dataUri approach
      // can this part be deprecated?
      if ((window.navigator.userAgent.indexOf('MSIE ') > 0) ||
        !!window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
        let iframe = document.createElement('IFRAME')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        // @ts-ignore
        let iframeDoc = iframe.contentWindow.document || iframe.contentDocument.document
        const csvDta = 'sep=|\r\n' + this.getCsvData()
        iframeDoc.open('text/html', 'replace')
        iframeDoc.write(csvDta)
        iframeDoc.close()
        iframe.focus()
        return iframeDoc.execCommand('SaveAs', true, 'download.csv')
      } else {
        const dataUri = this.getXlsDataUri()
        const link = document.createElement('a')
        link.href = dataUri
        link.setAttribute('download', 'download.xls')
        link.click()
      }
    }
  }

  getCsvData() {
    return csvData()(this.getGridId(), this.getSelectedRowIds())
  }

  toggleLoading(show = true) {
    const loadEl = this.$gridWrapper.find(`#load_${this.getGridId()}`)
    const overlay = this.$gridWrapper.find(`#lui_${this.getGridId()}`)
    if (show) {
      loadEl.show()
      overlay.show()
    } else {
      loadEl.hide()
      overlay.hide()
    }
    return show ? loadEl.show() : loadEl.hide()
  }

  // Triggers grid's resize event
  // @private
  // TODO fix grid resizing issues
  // TODO resize after column chooser dialog
  _triggerResize() {
    return this.jqGridEl.trigger('resize')
  }

  // Flash the given row
  flashOnSuccess(id, complete) {
    if (complete == null) { complete = ()=>{}  }
    return this._flashRow(id, '#DFF0D8', complete)
  }

  // Flash the row with red background
  flashOnError(id, complete) {
    if (complete == null) { complete = ()=>{} }
    return this._flashRow(id, '#FF0000', complete)
  }

  _flashRow(id, color, complete) {
    if (color == null) { color = '#DFF0D8' }
    if (complete == null) { complete = ()=>{} }
    const rowEl = $(this.jqGridEl[0].rows.namedItem(id))

    rowEl.css('background-color', color)
    rowEl.delay(250).fadeOut('medium', () => rowEl.css('background-color', ''))

    return rowEl.fadeIn('fast', () => complete())
  }

  addClass(id, clazz, animation) {
    if (animation == null) { animation = true }
    const rowEl = $(this.jqGridEl[0].rows.namedItem(id))

    if (!rowEl.hasClass(clazz)) {
      if (animation) {
        rowEl.delay(250).fadeOut('medium', () => rowEl.addClass(clazz))
        return rowEl.fadeIn('fast', () => {})
      } else {
        return rowEl.addClass(clazz)
      }
    }
  }

  removeClass(id, clazz, animation) {
    if (animation == null) { animation = true }
    const rowEl = $(this.jqGridEl[0].rows.namedItem(id))

    if (rowEl.hasClass(clazz)) {
      if (animation) {
        rowEl.delay(250).fadeOut('medium', () => rowEl.removeClass(clazz))
        return rowEl.fadeIn('fast', () => {})
      } else {
        return rowEl.removeClass(clazz)
      }
    }
  }

  // FIXME its not clear to me what these are for. The grid seems to works without the highloghtclass workgin
  highlightRow(id) {
    const rowEl = $(this.jqGridEl[0].rows.namedItem(id))
    if (!rowEl.hasClass(this.highlightClass)) {
      return rowEl.addClass(this.highlightClass)
    }
  }

  unHighlightRow(id) {
    const rowEl = $(this.jqGridEl[0].rows.namedItem(id))
    if (rowEl.hasClass(this.highlightClass)) {
      return rowEl.removeClass(this.highlightClass)
    }
  }

  addAdditionalFooter(data) {
    const footerRow = this.$gridWrapper.find('tr.footrow')
    let newFooterRow
    newFooterRow = this.$gridWrapper.find('tr.myfootrow')
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

  //*** gridzInit  ****/

  setupFormatters(gridCtrl, jqGridEl, options) {
    // add any events etc for formatters
    jqGridEl.on('click', 'a.editActionLink', function(event) {
      event.preventDefault()
      const id = $(this).parents('tr:first').attr('id')
      return gridCtrl.contextMenuClick({ id: id }, { key: 'edit' })
    })

    jqGridEl.on('click', 'a.gridLink', function(event) {
      event.preventDefault()
      const id = $(this).parents('tr:first').attr('id')
      window.location.href += (window.location.href.endsWith('/') ? '' : '/') + id
    })

    jqGridEl.on('click', 'a.showLink', function(event) {
      event.preventDefault()

      const id = event.target.dataset.id
      // const id = $(this).parents('tr:first').attr('id')
      window.location.href += (window.location.href.endsWith('/') ? '' : '/') + id
    })
  }

  setupCustomFormatters(gridCtrl, formatters, options) {
    options.colModel.forEach((col, i) => {
      if (col.formatter && _.isString(col.formatter) && formatters[col.formatter]) col.formatter = formatters[col.formatter].bind(this)
    })
  }

  setupGridCompleteEvent(gridCtrl, jqGridEl, options) {
    jqGridEl.on('jqGridAfterGridComplete', function() {
      // Add `min` class to remove pading to minimize row height
      if (options.minRowHeight || options.denseRows) {
        gridCtrl.isDense = true
        // return _.each(jqGridEl[0].rows, it => angular.element(it).addClass('min'))
      }
      if (options.selectFirstRow === true) {
        const dataIds = jqGridEl.getDataIDs()
        if (dataIds.length > 0) {
          jqGridEl.setSelection(dataIds[0], true)
        }
      }
    })
  }

  /**
  * adds the action column and formatter.
  */
  addCtxMenuIconColumn(opts) {
    const actionCol = {
      name: 'context_menu_col',
      label: ' ',
      width: 20,
      sortable: false,
      search: false,
      hidedlg: true,
      resizable: false,
      fixed: true, // don't auto calc size
      formatter: (cellValue, colOptions, rowObject) => {
        return `<a class="jqg-context-menu" href="#"
          context-menu="gridCtrl.ctxMenuOptions"
          context-menu-click="gridCtrl.contextMenuClick"
          context-menu-on="gridz"
          context-menu-model="{id: ${rowObject.id}}"><i class="fas fa-cog"></i></a>`
      }
    }
    opts.colModel.unshift(actionCol)
  }

  setupCtxMenu(opts) {
    if (!opts.contextMenu) return

    if (opts.contextMenu === true) {
      // use the defaults
      this.ctxMenuOptions = this.defaultCtxMenuOptions
      this.addCtxMenuIconColumn(opts)
    }
  }

  setupColModel(options) {
    options.colModel.forEach((col, i) => {
      if (!col.label) col.label = makeLabel(col.name)
    })
  }

  // the query by example toolbar
  // FIXME not used anywhere that I can find was called right after jq gridz call.
  setupFilterToolBar(options){
    if (options.filterToolbar) {
      this.jqGridEl.jqGrid('filterToolbar', {
        beforeSearch() {
          const postData = this.jqGridEl.jqGrid('getGridParam', 'postData')
          const defaultFilters = postData.defaultFilters || postData.filters
          // @ts-ignore
          const filters = (_.extend(JSON.parse(defaultFilters), (_.pick(postData, (_value, key) => !['page', 'filters', 'max', 'sort', 'order'].includes(key)))))
          filters.firstLoad = false
          postData.defaultFilters = defaultFilters
          postData.filters = filters
        }
      })
    }
  }

  destroy(){
    this.unsubs.forEach(fn => {
      fn()
    })
    this.jqGridEl?.jqGrid('GridDestroy')
  }

}
