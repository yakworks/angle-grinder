// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'
import EditModalCtrl from './EditModalCtrl'
import BulkUpdateModalCtrl from './BulkUpdateModalCtrl'
import { argsMerge } from '../../utils/classUtils'
import appConfigApi from '../../../dataApi/AppConfigApi'
import toast from '../../../tools/toast'
import Swal from '../../../tools/swal'
// import { transformOptions } from '../../controls/formly/helpers'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition

export default class BaseListCtrl {
  showSearchForm = false
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
  permanentFilters = {} //in some cases we need filters that couldnt be cleared like payment on batch page
  editTemplate = require('./editDialog.html')
  bulkUpdateTemplate = require('./bulkUpdateDialog.html')
  //  searchTemplate = require('./searchForm.html')

  static $inject = ['$scope', '$element', '$uibModal', '$timeout']
  constructor(...args) {
    argsMerge(this, args)
  }

  extendFilters(filters) {
    return _.merge(this.initSearch || {}, filters || {}, this.permanentFilters)
  }

  async doConfig(cfg) {
    if(!cfg){
      let apiCfg = await appConfigApi.getConfig(this.apiKey)
      cfg = _.cloneDeep(apiCfg)
    }

    const gopts = cfg.gridOptions
    if (this.eventHandlers) {
      gopts.eventHandlers = this.eventHandlers
    }
    // assign default datatype to grid loader
    // gopts.datatype = (params) => this.gridLoader(params)
    gopts.dataApi = this.dataApi

    if (!gopts.toolbarOptions) gopts.toolbarOptions = {}
    const tbopts = _.merge({}, this.defaultToolbarOpts, gopts.toolbarOptions)

    // setup search form show based on if searchForm is configured
    if (cfg.searchForm === undefined) {
      this.showSearchForm = false
      tbopts.searchFormButton.class = 'hidden'
    }

    if (cfg.bulkUpdateForm === undefined) {
      tbopts.selectedButtons.bulkUpdate.class = 'hidden'
    }

    if (gopts.showSearchForm) this.showSearchForm = gopts.showSearchForm
    // give toolbar scope
    tbopts.scope = () => this.$scope
    cfg.toolbarOptions = tbopts
    _.defaults(this.cfg, cfg)

    this.isConfigured = true
  }

  get gridCtrl() { return this.$element.find('gridz').controller('gridz') }
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
        console.log('Modal dismissed at: ' + new Date())
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
        // console.log('res.data', res.data)
        res.data.forEach(row => {
          this.gridCtrl.updateRow(row.id, row, false)
        })
      })
      .catch(() => {
        console.log('Modal dismissed at: ' + new Date())
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
  async gridLoader(p) {
    console.log('sseeeeearch', this.extendFilters(filters))
    this.gridCtrl.gridLoader(p, this.extendFilters(this.searchModel))
  }

  async search(filters) {
    console.log('sseeeeearch', this.extendFilters(filters))
    try {
      this.isSearching = true
      await this.gridCtrl?.search(this.extendFilters(filters))
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
    toast.error(er)
  }

  swalError(error) {
    Swal.fire({
      icon: 'error',
      title: error.title,
      text: error.message,
      showCloseButton: true
    })
  }

  handleResults(response) {
    if (response.ok) {
      toast.success(` ${response.success.join('<br>')}`, response.defaultMessage)
    } else {
      toast.error(`${response.failed.join('<br>')} `, response.defaultMessage)
    }
  }

  handleAction(action) {
    console.log('handleAction', action)
    const ids = this.gridCtrl?.getSelectedRowIds()
    console.log(this.gridCtrl)
    const run = async (ids) => {
      ids.forEach((id) => {
        this.gridCtrl.highlightRow(id)
      })

      try {
        const result = await action()
        if(result.ok){
          toast.success(result.success[0]?.message || 'Action is sucsess')
          this.gridCtrl.reload() // todo: should we reload only selected rows?
        } else {
          this.swalError({title: 'Action Error',message: result.failed[0]?.message || 'Action failed'})
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
