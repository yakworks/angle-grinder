// import Log from 'angle-grinder/src/utils/Log'
// import _ from 'lodash'
import { get, writable } from 'svelte/store';
import { isEmpty, cloneDeep, isFunction, merge } from '../utils/dash'
import appConfigApi from '../dataApi/AppConfigApi'
import toast from '../tools/toast'
import Swal from '../tools/swal'

const not_implemented = "not implemented"

const makeListDataCtrl = (opts) => {

  let defaultToolbarOpts = {
    selectedButtons: {
      bulkUpdate: { icon: 'edit_note', tooltip: 'Bulk Update' },
      xlsExport: { icon: 'mdi-microsoft-excel', tooltip: 'Export to Excel' }
    },
    leftButtons: {
      create: { icon: 'add_box', tooltip: 'Create New' }
    },
    searchFormButton: { icon: 'mdi-text-box-search-outline', tooltip: 'Show Search Filters Form' }
  }

  let state = {
    isDense:false,
    isConfigured: false,
    showSearchForm: false,
    hasSelected: false
  }

  let stateStore

  let ctrl = {

    async doConfig(ctx = {}) {
      if(!ctrl.apiKey) ctrl.apiKey = ctrl.dataApi.key

      console.log("makeListDataCtrl.doConfig called with ", ctx)
      if(isEmpty(ctx)) {
        let apiCfg = await appConfigApi.getConfig(ctrl.apiKey)
        ctx = cloneDeep(apiCfg)
        console.log("makeListDataCtrl.doConfig appConfigApi", ctx)
      }

      ctx.stateStore = ctrl.dataApi.stores.stateStore
      ctx.stateStore.set(state)
      console.log("makeListDataCtrl ctx.stateStore", get(ctx.stateStore))
      ctx.state = state
      //short cut
      ctrl.state = state

      const gopts = ctx.gridOptions || {}
      if (ctrl.eventHandlers) {
        gopts.eventHandlers = ctrl.eventHandlers
      }
      gopts.dataApi = ctrl.dataApi

      if (!gopts.toolbarOptions) gopts.toolbarOptions = {}
      const tbopts = merge({}, defaultToolbarOpts, gopts.toolbarOptions)

      // setup search form show based on if searchForm is configured
      if (ctx.searchForm === undefined) {
        gopts.showSearchForm = false
        ctx.state.showSearchForm = false
        tbopts.searchFormButton.class = 'hidden'
      }

      if (ctx.bulkUpdateForm === undefined) {
        tbopts.selectedButtons.bulkUpdate.class = 'hidden'
      }

      ctx.toolbarOptions = tbopts

      //setup some defaults for gridOpts
      gopts.contextMenuClick = (model, menuItem) => {
        return ctrl.fireRowAction(model, menuItem)
      }

      gopts.fireToolbarAction = ctrl.fireToolbarAction

      gopts.restrictSearch = ctrl.restrictSearch || {}
      gopts.initSearch = ctrl.initSearch || {}

      // _.defaults(ctrl.ctx, ctx)
      ctrl.ctx = ctx

      ctrl.state.isConfigured = true
      console.log("End makeListDataCtrl.doConfig ctx", ctrl.ctx)
      return ctx
    },

    get gridCtrl(){ return ctrl.ctx.gridCtrl },

    getGridOptions() { return ctrl.ctx.gridOptions },

    //Need to implement
    getEditModalCtrl() { throw Error(not_implemented) },
    getBulkUpdateModalCtrl() { throw Error(not_implemented) },
    // get searchCtrl() { return SearchCtrl }

    fireRowAction(model, menuItem) {
      switch (menuItem.key) {
        case 'edit':
          return ctrl.edit(model.id)
        case 'delete':
          return ctrl.delete(model.id)
        // default:
        //   alert( "I don't know such values" );
      }
    },

    fireToolbarAction(btnItem, event) {
      switch (btnItem.key) {
        case 'create':
          return ctrl.create()
        case 'bulkUpdate':
          return ctrl.showBulkUpdate()
        case 'xlsExport':
          return ctrl.gridCtrl.xlsExport()
        case 'delete':
          return ctrl.deleteSelected()
        default:
          if (isFunction(ctrl[btnItem.key])) {
            return ctrl[btnItem.key](btnItem, event)
          }
      }
    },

    //FIXME dont depend on grid, these should be refactored out
    reloadKeepSelected() { ctrl.gridCtrl.reloadKeepSelected() },
    resetSort() { ctrl.gridCtrl.resetSort() },
    async quickSearch(text) { ctrl.gridCtrl.quickSearch(text) },
    toggleDensity() { this.state.isDense = !this.state.isDense },

    async edit(id) {
      ctrl.gridCtrl.toggleLoading(true)
      try {
        const vm = await ctrl.dataApi.get(id)
        ctrl.showEdit('Edit', vm)
      } catch (er) {
        ctrl.handleError(er)
      } finally {
        ctrl.gridCtrl.toggleLoading(false)
      }
    },

    updateFooter(data) {
      setTimeout(_ => {
        ctrl.gridCtrl.getGridEl().footerData('set', data)
      })
    },

    create(model = {}) {
      ctrl.showEdit('Create', model)
    },

    showEdit(title, model) {
      throw Error(not_implemented)
    },

    // modal options for edit
    getEditOptions(template, model, title) {
      throw Error(not_implemented)
    },

    showBulkUpdate() {
      throw Error(not_implemented)
    },

    getBulkUpdateOptions(model = {}) {
      throw Error(not_implemented)
    },

    async delete(id) {
      try {
        await ctrl.dataApi.remove(id)
        ctrl.gridCtrl.removeRow(id)
      } catch (er) {
        ctrl.handleError(er)
      }
    },

    async deleteSelected() {
      const id = ctrl.gridCtrl.getSelectedRowIds()[0]
      ctrl.delete(id)
    },

    async search(filters) {
      console.log("ListDataApiCtrl search called with", filters)
      try {
        ctrl.isSearching = true
        await ctrl.gridCtrl?.search(filters)
      } catch (er) {
        ctrl.handleError(er)
      } finally {
        ctrl.isSearching = false
      }
    },

    searchReset(searchForm) {
      ctrl.searchModel = ctrl.initSearch || {}
      searchForm.reset()
    },

    handleError(er) {
      console.error(er)
      const message = er?.response?.status === 500 ? 'Unexpected error' : null
      toast.error(message || er)
    },

    swalError(error) {
      Swal.fire({
        icon: 'error',
        title: error.title,
        text: error.message,
        showCloseButton: true
      })
    },


    handleResults(response) {
      if (response.ok) {
        toast.success(`${response.success.join('<br>')}`, response.defaultMessage)
      } else {
        toast.error(`${response.failed.join('<br>')} `, response.defaultMessage)
      }
    },

    handleAction(action) {
      const ids = ctrl.gridCtrl.getSelectedRowIds()
      const run = async (ids) => {
        ids.forEach((id) => {
          ctrl.gridCtrl.highlightRow(id)
        })

        try {
          const result = await action()
          if(result.ok){
            toast.success(result.title || 'Action is sucsess')
            ctrl.gridCtrl.reload() // todo: should we reload only selected rows?
          } else {
            ctrl.swalError({title: result.title , message: result?.failed?.join('<br>') || ''})
          }
        } catch (e) {
          ctrl.handleError(e)
        } finally {
          ids.forEach((id) => {
            ctrl.gridCtrl.highlightRow(id)
          })
        }
      }
      return run(ids)
    },
    // we need to generate gridId, because if we have 2 grids on a page they will have the same id and 2 pagers will
    // be assisgned to the second grid
    gridId(){
      return ctrl.apiKey?.replace(/[^\w\s]/gi, '_') + 'Grid'
    }

  }

  return Object.assign(ctrl, opts)
}

export default makeListDataCtrl
