// import Log from 'angle-grinder/src/utils/Log'
import _ from 'lodash'
// import toast from 'angle-grinder/src/tools/toast'

// see https://stackoverflow.com/questions/53349705/constructor-and-class-properties-within-javascript-mixins
// and https://alligator.io/js/class-composition/ for class composition
export default class BaseListCtrl {
  showSearchForm = true

  static $inject = ['$scope', '$element', '$uibModal']

  constructor(...args) {
    const argObj = this.constructor.$inject.reduce((obj, item, index) => {
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
    console.log('fireToolbarAction btnItem', btnItem)
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
    try {
      this.gridCtrl.toggleLoading(true)
      const vm = await this.dataStore.get(id)
      this.showEditForm(vm)
    } catch (er) {
      // toast alert the error
      console.log('edit error', er)
    } finally {
      this.gridCtrl.toggleLoading(false)
    }
  }

  showEditForm(model) {
    const modInst = this.$uibModal.open(
      this.getEditModalOptions(this.editFormTpl, model)
    )
    modInst.result.then(editedModel => {
      this.gridCtrl.updateRow(editedModel.id, editedModel)
    }, function() {
      console.log('Modal dismissed at: ' + new Date())
    })
  }

  getEditModalOptions(template, model) {
    // const listCtrl = this
    return {
      controller: this.getEditModalCtrl(model, this.dataStore),
      controllerAs: 'dlgCtrl',
      template: template,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static' // do not close on click outside of the dialog,
      // scope: this.$scope
    }
  }

  getEditModalCtrl(model, dataStore) {
    // const listCtrl = this
    return function($uibModalInstance, $scope) {
      console.log('$scope', $scope)
      this.vm = model

      this.save = async () => {
        console.log('edit modal save scope', $scope)
        const { editForm } = $scope
        if (editForm.$invalid || editForm.$pristine) return
        this.isSaving = true
        try {
          await dataStore.save(this.vm)
          $uibModalInstance.close(this.vm)
        } catch (error) {
          console.log('error', error)
          return
        } finally {
          this.isSaving = false
        }
      }

      this.cancel = () => {
        console.log('modal cancel scope', $scope)
        $uibModalInstance.result.catch(function() { $uibModalInstance.close() })
        $uibModalInstance.dismiss('cancel')
      }

      // prevents the "Possibly unhandled rejection: cancel"
      $uibModalInstance.result.catch(function() { $uibModalInstance.close() })
    }
  }

  async delete(id) {
    try {
      await this.dataStore.remove(id)
      this.gridCtrl.removeRow(id)
    } catch (er) {
      // toast alert the error
      console.log('delete error', er)
    }
  }

  create() {
    this.showForm(this.editFormTpl, {})
  }

  showMassUpdate() {
    const modalOpts = {
      // controller: function($uibModalInstance, $scope) {
      //   this.cancel = () => {
      //     console.log('MassUpdateCtrl cancel scope', $scope)
      //     $uibModalInstance.dismiss('cancel')
      //   }
      // },
      // controllerAs: '$ctrl',
      // bindToController: true,
      template: this.massUpdateTpl,
      keyboard: false, // do not close the dialog with ESC key
      backdrop: 'static' // do not close on click outside of the dialog,
      // scope: this.$scope
    }
    // here just for example, does nothing
    this.form = this.$uibModal.open(modalOpts)
    console.log('showMassUpdate', this.form)
  }

  showForm(formTpl, data) {
    this.vm = data
    this.form = this.$uibModal.open(
      this.modalOptions(formTpl)
    )
    console.log('this.form', this.form)
  }

  async save(editForm, data) {
    console.log('editForm', editForm)
    if (editForm.$invalid || editForm.$pristine) return
    try {
      await this.dataStore.save(data)
    } catch (error) {
      console.log('error', error)
      return
    }

    if (data.id) {
      this.gridCtrl.updateRow(data.id, data)
    } else {
      data.id = new Date().getMilliseconds() // random id
      this.gridCtrl.addRow(data.id, data)
    }
    this.closeDialog()
  }

  closeDialog = () => {
    this.form.close()
  }
}
