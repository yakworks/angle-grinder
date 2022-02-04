// @ts-nocheck
// import Log from '@yakit/core/Log'
import _ from 'lodash'
import { get } from 'svelte/store';
import { isEmpty } from '@yakit/core/dash'
import EditModalCtrl from './EditModalCtrl'
import BulkUpdateModalCtrl from './BulkUpdateModalCtrl'
import { argsMerge } from '../../utils/classUtils'
import appConfigApi from '@yakit/core/stores/AppConfigApi'
import toast from '@yakit/ui/growl'
//import Swal from '../../../tools/swal'

export default class ListDataApiCtrl {
  defaultToolbarOpts = {
    selectedButtons: {
      bulkUpdate: { icon: 'far fa-edit', tooltip: 'Bulk Update' },
      xlsExport: { icon: 'far fa-file-excel', tooltip: 'Export to Excel' }
    },
    leftButtons: {
      create: { icon: 'far fa-plus-square', tooltip: 'Create New' }
    },
    searchFormButton: { icon: 'mdi-text-box-search-outline', tooltip: 'Show Search Filters Form' }
  }
  //in some cases we need filters that couldnt be cleared like payment on batch page
  permanentFilters = {}
  editTemplate = require('./editDialog.html')
  bulkUpdateTemplate = require('./bulkUpdateDialog.html')
  //  searchTemplate = require('./searchForm.html')
  state = {
    isDense:false,
    isConfigured: false,
    showSearchForm: false,
    hasSelected: false
  }

  static $inject = ['$scope', '$element', '$uibModal', '$timeout']
  constructor(...args) {
    argsMerge(this, args)
  }

  async doConfig(ctx = {}) {
    if(!this.apiKey) this.apiKey = this.dataApi.key

    if(isEmpty(ctx)) {
      let apiCfg = await appConfigApi.getConfig(this.apiKey)
      ctx = _.cloneDeep(apiCfg)
    }

    ctx.stateStore = this.dataApi.stores.stateStore
    ctx.stateStore.set(this.state)
    ctx.state = this.state
    //short cut
    // ctrl.state = state

    const gopts = ctx.gridOptions || {}
    if (this.eventHandlers) {
      gopts.eventHandlers = this.eventHandlers
    }
    gopts.dataApi = this.dataApi

    if (!gopts.toolbarOptions) gopts.toolbarOptions = {}
    const tbopts = _.merge({}, this.defaultToolbarOpts, gopts.toolbarOptions)

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
      return this.fireRowAction(model, menuItem)
    }

    gopts.fireToolbarAction = this.fireToolbarAction

    gopts.restrictSearch = this.restrictSearch || {}
    gopts.initSearch = this.initSearch || {}

    this.ctx = ctx

    this.state.isConfigured = true
    return ctx
  }

  get gridCtrl() { return this.$element.find('gridz-ds').controller('gridz-ds') }
  get editModalCtrl() { return EditModalCtrl }
  get bulkUpdateModalCtrl() { return BulkUpdateModalCtrl }
  // get searchCtrl() { return SearchCtrl }

  fireRowAction(model, menuItem) {
    switch (menuItem.key) {
      case 'edit':
        return this.edit(model.id)
      case 'delete':
        return this.delete(model.id)
      // default:
      //   alert( "I don't know such values" );
    }
  }

  fireToolbarAction(btnItem, event) {
    switch (btnItem.key) {
      case 'create':
        return this.create()
      case 'bulkUpdate':
        return this.showBulkUpdate()
      case 'xlsExport':
        return this.gridCtrl.xlsExport()
      case 'delete':
        return this.deleteSelected()
      default:
        if (_.isFunction(this[btnItem.key])) {
          return this[btnItem.key](btnItem, event)
        }
    }
  }

  async edit(id) {
    this.gridCtrl.toggleLoading(true)
    try {
      const vm = await this.dataApi.get(id)
      this.showEdit('Edit', vm)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.gridCtrl.toggleLoading(false)
    }
  }

  updateFooter(data) {
    setTimeout(_ => {
      this.gridCtrl.getGridEl().footerData('set', data)
    })
  }

  create(model = {}) {
    this.showEdit('Create', model)
  }

  showEdit(title, model) {
    const isUpdate = !!model.id
    const modInst = this.$uibModal.open(
      this.getEditOptions(this.editTemplate, model, title)
    )
    modInst.result
      .then(editedVm => {
        isUpdate ? this.gridCtrl.updateRow(editedVm.id, editedVm) : this.gridCtrl.addRow(editedVm.id, editedVm)
      })
      .catch(() => {
      })
    // , () => {
    //   console.log('Modal dismissed at: ' + new Date())
    // })
  }

  // modal options for edit
  getEditOptions(template, model, title) {
    return {
      controller: this.editModalCtrl,
      controllerAs: 'dlgCtrl',
      template: template,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      resolve: {
        vm: () => model,
        dataApi: () => this.dataApi,
        cfg: () => this.cfg,
        title: () => title
      }
      // scope: this.$scope
    }
  }

  showBulkUpdate() {
    const modInst = this.$uibModal.open(
      this.getBulkUpdateOptions()
    )
    modInst.result
      .then(res => {
        res.data.forEach(row => {
          this.gridCtrl.updateRow(row.id, row, false)
        })
      })
      .catch(() => {
      })
  }

  getBulkUpdateOptions(model = {}) {
    return {
      controller: this.bulkUpdateModalCtrl,
      controllerAs: 'dlgCtrl',
      template: this.bulkUpdateTemplate,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      resolve: {
        vm: () => model,
        dataApi: () => this.dataApi,
        cfg: () => this.cfg,
        selectedIds: () => this.gridCtrl.getSelectedRowIds()
      }
      // scope: this.$scope
    }
  }

  // showBulkUpdate() {
  //   const modalOpts = {
  //     template: this.bulkUpdateTpl,
  //     keyboard: false, // do not close the dialog with ESC key
  //     backdrop: 'static' // do not close on click outside of the dialog,
  //     // scope: this.$scope
  //   }
  //   // here just for example, does nothing
  //   this.form = this.$uibModal.open(modalOpts)
  // }

  async delete(id) {
    try {
      await this.dataApi.remove(id)
      this.gridCtrl.removeRow(id)
    } catch (er) {
      this.handleError(er)
    }
  }

  async deleteSelected() {
    const id = this.gridCtrl.getSelectedRowIds()[0]
    this.delete(id)
  }

  // load results of a query into gridCtrl
  // async gridLoader(p) {
  //   this.gridCtrl.gridLoader(p, this.searchModel)
  // }

  async search(filters) {
    try {
      this.isSearching = true
      await this.gridCtrl?.search(filters)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.isSearching = false
    }
  }

  searchReset(searchForm) {
    this.searchModel = this.initSearch || {}
    searchForm.reset()
  }

  handleError(er) {
    console.error(er)
    const message = er?.response?.status === 500 ? 'Unexpected error' : null
    toast.error(message || er)
  }

  toastError(error) {
    toast.error(error.message, error.title)
    // Swal.fire({
    //   icon: 'error',
    //   title: error.title,
    //   text: error.message,
    //   showCloseButton: true
    // })
  }

  handleResults(response) {
    if (response.ok) {
      toast.success(` ${response.success.join('<br>')}`, response.defaultMessage)
    } else {
      toast.error(`${response.failed.join('<br>')} `, response.defaultMessage)
    }
  }

  handleAction(action) {
    const ids = this.gridCtrl?.getSelectedRowIds()
    const run = async (ids) => {
      ids.forEach((id) => {
        this.gridCtrl.highlightRow(id)
      })

      try {
        const result = await action()
        if(result.ok){
          toast.success(result.title || 'Action is sucsess')
          this.gridCtrl.reload() // todo: should we reload only selected rows?
        } else {
          this.toastError({title: result.title , message: result?.failed?.join('<br>') || ''})
        }
      } catch (e) {
        this.handleError(e)
      } finally {
        ids.forEach((id) => {
          this.gridCtrl.highlightRow(id)
        })
      }
    }
    return run(ids)
  }
}
