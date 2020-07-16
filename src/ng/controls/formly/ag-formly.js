
const template = `
<formly-form ag-form is-horizontal model="fbCtrl.model" fields="fbCtrl.fields" form="fbCtrl.form">
</formly-form>
`

class Controller {
  // $onInit() {
  //   if (!this.okLabel) this.okLabel = 'Ok'
  //   if (!this.cancelLabel) this.cancelLabel = 'Cancel'
  // }
}

export default () => ({
  restrict: 'E',
  //replace: true,
  controllerAs: 'fbCtrl',
  bindToController: true,
  // transclude: true
  template: template,
  controller: Controller,
  scope: {
    model: '<',
    fields: '<',
    form: '=?'
  }
})
