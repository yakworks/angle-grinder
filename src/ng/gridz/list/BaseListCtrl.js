// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'
import toast from 'angle-grinder/src/tools/toast'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition
export default class BaseListCtrl {

  showSearchForm = true

  static $inject = ['$scope', '$element', '$uibModal']

  constructor(...args) {
    let argObj = this.constructor.$inject.reduce((obj, item, index) => {
      obj[item] = args[index]
      return obj
    }, {})
    _.defaults(this, argObj)
    // console.log("args", args)
    // console.log("argObj", argObj)
    // console.log("this.constructor.$inject", this.constructor.$inject)
  }

  onInit() {
    // todo
  }

  get gridCtrl() { return this.$element.find('gridz').controller('gridz') }

  dataLoader() {
    return (params) => this.dataStore.gridLoader(this.gridCtrl, params)
  }

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
    console.log("fireToolbarAction btnItem", btnItem)
    switch (btnItem.key) {
      case 'create':
        return this.create()
      case 'massUpdate':
        return this.showMassUpdate()
      case 'export':
        return this.xlsExport()
    }
  }

  async edit(id) {
    this.gridCtrl.toggleLoading(true)
    //let data = this.gridCtrl.getRowData(id)
    let data = await this.dataStore.get(id)
    this.gridCtrl.toggleLoading(false)
    this.showForm(this.editFormTpl, data)
  }

  delete(id){
    this.gridCtrl.removeRow(id)
  }

  create() {
    this.showForm(this.editFormTpl, {})
  }

  modalOptions(template) {
    return {
      // controller: function ($uibModalInstance, $scope) {
      //   this.cancel = () => {
      //     console.log("MassUpdateCtrl cancel scope", $scope)
      //     $uibModalInstance.dismiss('cancel')
      //   }
      // },
      // controllerAs: '$ctrl',
      // bindToController: true,
      template: template,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      scope: this.$scope
    }
  }

  showMassUpdate() {
    let modalOpts = {
      controller: function ($uibModalInstance, $scope) {
        this.cancel = () => {
          console.log("MassUpdateCtrl cancel scope", $scope)
          $uibModalInstance.dismiss('cancel')
        }
      },
      controllerAs: '$ctrl',
      // bindToController: true,
      template: this.massUpdateTpl,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static', // do not close on click outside of the dialog,
      // scope: this.$scope
    }
    // here just for example, does nothing
    this.form = this.$uibModal.open(modalOpts)
    console.log("showMassUpdate", this.form)
  }

  showForm(formTpl, data) {
    this.vm = data
    this.form = this.$uibModal.open(
      this.modalOptions(formTpl)
    )
  }

  save(data){
    if (data.id) {
      this.gridCtrl.updateRow(data.id, data)
    } else {
      data.id = new Date().getMilliseconds() //random id
      this.gridCtrl.addRow(data.id, data)
    }
    this.closeDialog()
  }

  closeDialog = () => {
    this.form.close()
  }

}
