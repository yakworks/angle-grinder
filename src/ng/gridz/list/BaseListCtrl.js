// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'

export default class BaseListCtrl {

  showSearchForm = true

  /* @ngInject */
  constructor($scope, $element, $uibModal) {
    this.$scope = $scope
    this.$element = $element
    this.$uibModal = $uibModal
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
        this.edit(model.id)
        break;
      case 'delete':
        this.delete(model.id)
        break;
      // default:
      //   alert( "I don't know such values" );
    }
  }

  edit(id) {
    let data = this.gridCtrl.getRowData(id)
    // normally when dealing with rest we would get the object from server based on selected id
    // here we need to get the "flattened" grid data back into object form
    data.customer = {name: data['customer.name']}
    this.showForm(this.editFormTpl, data)
  }

  delete(id){
    this.gridCtrl.removeRow(id)
  }

  create() {
    this.showForm({})
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
