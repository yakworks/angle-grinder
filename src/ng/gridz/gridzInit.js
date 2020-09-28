// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'
// import { forEach } from 'angular-ui-router'
import { makeLabel } from '../../utils/labelMaker'
/**
* functions to initialize the grid
*/

const defaultCtxMenuOptions = {
  edit: {
    display: 'Edit',
    icon: 'far fa-edit'
  },
  delete: {
    display: 'Delete',
    icon: 'far fa-trash-alt'
  }
}

export function init(opts, gridCtrl) {
  setupCtxMenu(opts, gridCtrl)
}

export function setupCtxMenu(gridCtrl, opts) {
  if (!opts.contextMenu) return

  if (opts.contextMenu === true) {
    // use the defaults
    gridCtrl.ctxMenuOptions = defaultCtxMenuOptions
    addCtxMenuIconColumn(opts)
  }
}

/**
 * adds the action column and formatter.
 */
function addCtxMenuIconColumn(opts) {
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

export function setupDataLoader(gridCtrl, options) {
  // Log.debug(`[agGrid] initializing '${alias}' with`, options)

  // assign the url
  if (!(!_.isNil(options.url)) && (!_.isNil(options.path))) {
    options.url = gridCtrl.pathWithContext(options.path)
  }

  // use `$http` service to load the grid data
  if ((options.datatype === undefined) || (options.datatype === null)) {
    options.datatype = gridCtrl.GridDataLoader(options.url, gridCtrl)
  }
}

export function setupGridCompleteEvent(gridCtrl, gridEl, options) {
  gridEl.on('jqGridAfterGridComplete', function() {
    gridCtrl.$compile(gridEl)(gridCtrl.$scope)

    // Add `min` class to remove pading to minimize row height
    if (options.minRowHeight || options.denseRows) {
      gridCtrl.isDense = true
      // return _.each(gridEl[0].rows, it => angular.element(it).addClass('min'))
    }
    if (options.selectFirstRow === true) {
      const dataIds = gridEl.getDataIDs()
      if (dataIds.length > 0) {
        gridEl.setSelection(dataIds[0], true)
      }
    }
  })
}

export function setupFormatters(gridCtrl, gridEl, options) {
  // add any events etc for formatters
  gridEl.on('click', 'a.editActionLink', function(event) {
    event.preventDefault()
    const id = $(this).parents('tr:first').attr('id')
    return gridCtrl.contextMenuClick({ id: id }, { key: 'edit' })
  })

  gridEl.on('click', 'a.gridLink', function(event) {
    event.preventDefault()
    const id = $(this).parents('tr:first').attr('id')
    window.location.href += '/' + id
  })
}

/**
 * transforms colModel, setups default label, etc
 */
export function setupColModel(options) {
  options.colModel.forEach((col, i) => {
    if (!col.label) col.label = makeLabel(col.name)
  })
}

export default {
  setupCtxMenu,
  setupDataLoader,
  setupGridCompleteEvent,
  setupFormatters,
  setupColModel
}
