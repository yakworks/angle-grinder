// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'
import EditModalCtrl from './EditModalCtrl'
import MassUpdateModalCtrl from './MassUpdateModalCtrl'
import { argsMerge } from '../../utils/classUtils'
import appConfigApi from '../../../dataApi/AppConfigApi'
import toast from '../../../../src/tools/toast'
// import { transformOptions } from '../../controls/formly/helpers'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition

export default class BaseListCtrl {
  showSearchForm = false
  defaultToolbarOpts = {
    selectedButtons: {
      massUpdate: { icon: 'far fa-edit', tooltip: 'Mass Update' },
      xlsExport: { icon: 'far fa-file-excel', tooltip: 'Export to Excel' }
    },
    leftButtons: {
      create: { icon: 'far fa-plus-square', tooltip: 'Create New' }
    },
    searchFormButton: { icon: 'mdi-text-box-search-outline', tooltip: 'Show Search Filters Form' }
  }

  editTemplate = require('./editDialog.html')
  massUpdateTemplate = require('./massUpdateDialog.html')
  //  searchTemplate = require('./searchForm.html')

  static $inject = ['$scope', '$element', '$uibModal', '$timeout']
  constructor(...args) {
    argsMerge(this, args)
  }

  async doConfig() {
    let cfg = await appConfigApi.getConfig(this.apiKey)
    cfg = _.cloneDeep(cfg)
    const gopts = cfg.gridOptions
    // assign default datatype to grid loader
    gopts.datatype = (params) => this.gridLoader(params)
    if (!gopts.toolbar) gopts.toolbar = {}
    const tbopts = _.merge({}, this.defaultToolbarOpts, gopts.toolbar)

    // setup search form show based on if searchForm is configured
    if (cfg.searchForm === undefined) {
      this.showSearchForm = false
      tbopts.searchFormButton.class = 'hidden'
    }

    if (cfg.massUpdateForm === undefined) {
      tbopts.selectedButtons.massUpdate.class = 'hidden'
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
  get massUpdateModalCtrl() { return MassUpdateModalCtrl }
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
      case 'massUpdate':
        return this.showMassUpdate()
      case 'export':
        return this.xlsExport()
      default:
        if (_.isFunction(this[btnItem.key])) {
          this[btnItem.key](btnItem, event)
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
    this.gridCtrl.gridEl.footerData('set', data)
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

  showMassUpdate() {
    const modInst = this.$uibModal.open(
      this.getMassUpdateOptions()
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

  getMassUpdateOptions(model = {}) {
    return {
      controller: this.massUpdateModalCtrl,
      controllerAs: 'dlgCtrl',
      template: this.massUpdateTemplate,
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

  // showMassUpdate() {
  //   const modalOpts = {
  //     template: this.massUpdateTpl,
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

  // load results of a query into gridCtrl
  async gridLoader(p) {
    this.gridCtrl.toggleLoading(true)
    try {
      // console.log("gridLoader params", p)
      // fix up sort
      if (p.sort && p.order) p.sort = `${p.sort} ${p.order}`
      if (!p.sort) delete p.sort
      delete p.order
      // to be able to set default filters on the first load
      if (!p.q && this.searchModel && this.searchModel !== {}) {
        p.q = JSON.stringify(this.searchModel)
      }
      const data = await this.dataApi.search(p)
      this.gridCtrl.addJSONData(data)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.gridCtrl.toggleLoading(false)
    }
  }

  async search(filters) {
    try {
      this.isSearching = true
      await this.gridCtrl.search(filters)
    } catch (er) {
      console.error('search error', er)
    } finally {
      this.isSearching = false
    }
  }

  searchReset(searchForm) {
    console.log('searchReset agForm', searchForm)
    this.searchModel = {}
    searchForm.reset()
  }

  handleError(er) {
    console.error(er)
    toast.error(er)
  }
}
