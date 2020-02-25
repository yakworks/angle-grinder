import BaseCtrl from '../../utils/BaseCtrl'
import angular from 'angular'
import formsModule from '../formsModule'

var forms = angular.module(formsModule)

// Opens a modal dialog with embedded generic form for
// create or update record
forms.factory('FormDialogServ', [
  '$uibModal', 'pathWithContext',
  ($modal, pathWithContext) => ({
    open(templateUrl, dialogOptions) {
      let scope
      if (dialogOptions == null) { dialogOptions = {} }
      if (angular.isDefined(dialogOptions.scope)) { ({ scope } = dialogOptions) }
      // if (angular.isDefined(dialogOptions.scope)) { ({ template } = dialogOptions) }

      return $modal.open({
        // template: template,
        templateUrl: pathWithContext(templateUrl || ''),
        controller: 'FormDialogCtrl',
        keyboard: false, // do not close the dialog with ESC key
        backdrop: 'static', // do not close on click outside of the dialog
        scope,

        resolve: {
          dialogOptions() { return dialogOptions }
        }
      })
    }
  })
])

// Generic controller for forms inside modal dialogs
class FormDialogCtrl extends BaseCtrl {
  constructor(...args) {
    super(...args)
    /* {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super() }
      let thisFn = (() => { return this }).toString()
      let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;/)[1]
      eval(`${thisName} = this;`)
    } */
    this.closeDialog = this.closeDialog.bind(this)
    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
  }

  static initClass() {
    this.register(forms, 'FormDialogCtrl')
    this.inject('$scope', '$rootScope', '$log', '$uibModalInstance', 'dialogOptions')
  }

  initialize() {
    // Assign dialog options to the scope
    this.$scope.dialogOptions = this.dialogOptions;
    ({ record: this.record, grid: this.grid } = this.$scope.dialogOptions)

    // assign the given resource to the scope under its name
    const resourceName = angular.isFunction(this.record.resourceName) ? this.record.resourceName() : 'record'
    this.$scope[resourceName] = this.record
    if (this.$scope.dialogOptions.exposeRecordToScope) { this.$scope.$parent[resourceName] = this.record }

    return this.expose(this.$scope, 'closeDialog', 'save', 'delete')
  }

  // Closes the dialog
  closeDialog() {
    this.$log.info('[ag] closing the dialog')
    return this.$uibModalInstance.close(this.record)
  }

  // If form is valid performs server side update
  save(record) {
    const promise = record.save().$promise

    promise.then(record => {
      this.$log.info('[ag] record has been updated/created', record)

      this.grid.saveRow(record.id, record)
      return this.$scope.closeDialog()
    })

    return [promise, record]
  }

  // Performs server side delete
  delete() {
    const promise = this.record.delete().$promise

    promise.then(response => {
      this.$log.info('[ag] record has been deleted', response)

      this.grid.removeRow(response.id)
      return this.$scope.closeDialog()
    })

    promise.catch(response => {
      return this.$log.error('[ag] something went wrong', response)
    })

    return promise
  }
}
FormDialogCtrl.initClass()
