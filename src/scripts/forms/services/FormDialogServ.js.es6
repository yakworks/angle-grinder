/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const forms = angular.module("angleGrinder.forms");

// Opens a modal dialog with embedded generic form for
// create or update record
forms.factory("FormDialogServ", [
  "$uibModal", "pathWithContext",
  ($modal, pathWithContext) => ({
    open(templateUrl, dialogOptions) {

      let scope;
      if (dialogOptions == null) { dialogOptions = {}; }
      if (angular.isDefined(dialogOptions.scope)) { ({
        scope
      } = dialogOptions); }

      return $modal.open({
        templateUrl: pathWithContext(templateUrl),
        controller: "FormDialogCtrl",
        keyboard: false, // do not close the dialog with ESC key
        backdrop: "static", // do not close on click outside of the dialog
        scope,

        resolve: {
          dialogOptions() { return dialogOptions; }
        }
      });
    }
  })
]);

// Generic controller for forms inside modal dialogs
class FormDialogCtrl extends BaseCtrl {
  constructor(...args) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;/)[1];
      eval(`${thisName} = this;`);
    }
    this.closeDialog = this.closeDialog.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    super(...args);
  }

  static initClass() {
  
    this.register(forms, "FormDialogCtrl");
    this.inject("$scope", "$rootScope", "$log", "$modalInstance", "dialogOptions");
  }

  initialize() {
    // Assign dialog options to the scope
    this.$scope.dialogOptions = this.dialogOptions;
    ({ record: this.record, grid: this.grid } = this.$scope.dialogOptions);

    // assign the given resource to the scope under its name
    const resourceName = angular.isFunction(this.record.resourceName) ? this.record.resourceName() : "record";
    this.$scope[resourceName] = this.record;
    if (this.$scope.dialogOptions.exposeRecordToScope) { this.$scope.$parent[resourceName] = this.record; }

    return this.expose(this.$scope, "closeDialog", "save", "delete");
  }

  // Closes the dialog
  closeDialog() {
    this.$log.info("[ag] closing the dialog");
    return this.$modalInstance.close(this.record);
  }

  // If form is valid performs server side update
  save(record) {
    const promise = record.save().$promise;

    promise.then(record => {
      this.$log.info("[ag] record has been updated/created", record);

      this.grid.saveRow(record.id, record);
      return this.$scope.closeDialog();
    });

    return [promise, record];
  }

  // Performs server side delete
  delete() {
    const promise = this.record.delete().$promise;

    promise.then(response => {
      this.$log.info("[ag] record has been deleted", response);

      this.grid.removeRow(response.id);
      return this.$scope.closeDialog();
    });

    promise.catch(response => {
      return this.$log.error("[ag] something went wrong", response);
    });

    return promise;
  }
}
FormDialogCtrl.initClass();
