// import Log from 'angle-grinder/src/utils/Log'
// import _ from 'lodash'
import EditModalCtrl from './EditModalCtrl'
import { argsMerge } from '../../utils/classUtils'
import toast from 'angle-grinder/src/tools/toast'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition
export default class BaseListCtrl {
  showSearchForm = true

  static $inject = ['$scope', '$element', '$uibModal', '$timeout']
  constructor(...args) {
    argsMerge(this, args)
  }

  get gridCtrl() { return this.$element.find('gridz').controller('gridz') }

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
      this.showEditForm(vm)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.gridCtrl.toggleLoading(false)
    }
  }

  create(model = {}) {
    this.showEditForm(model)
  }

  showEditForm(model) {
    const isUpdate = !!model.id
    const modInst = this.$uibModal.open(
      this.getEditModalOptions(this.editFormTpl, model)
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

  getEditModalOptions(template, model) {
    // const listCtrl = this
    return {
      controller: this.editModalCtrl,
      controllerAs: 'dlgCtrl',
      template: template,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      resolve: {
        vm: () => model,
        dataApi: () => this.dataApi,
        cfg: () => this.cfg
      }
      // scope: this.$scope
    }
  }

  get editModalCtrl() { return EditModalCtrl }

  showMassUpdate() {
    const modalOpts = {
      template: this.massUpdateTpl,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static' // do not close on click outside of the dialog,
      // scope: this.$scope
    }
    // here just for example, does nothing
    this.form = this.$uibModal.open(modalOpts)
  }

  async delete(id) {
    try {
      await this.dataApi.remove(id)
      this.gridCtrl.removeRow(id)
    } catch (er) {
      this.handleError(er)
    }
  }

  // load results of a query into gridCtrl
  async gridLoader(params) {
    this.gridCtrl.toggleLoading(true)
    try {
      const data = await this.dataApi.search(params)
      this.gridCtrl.addJSONData(data)
    } catch (er) {
      this.handleError(er)
    } finally {
      this.gridCtrl.toggleLoading(false)
    }
  }

  handleError(er) {
    console.error(er)
    toast.error(er)
  }
}
