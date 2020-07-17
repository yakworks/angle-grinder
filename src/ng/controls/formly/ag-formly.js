
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
  // replace: true,
  controllerAs: 'fbCtrl',
  bindToController: {
    model: '<',
    fields: '<',
    form: '=?'
  },
  // transclude: true
  template: template,
  controller: Controller
  // don't do isolate scope here or forml doesnt set stuff right
  // scope: {}
})
