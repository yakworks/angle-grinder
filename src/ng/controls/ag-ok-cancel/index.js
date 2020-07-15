class Controller {
  $onInit() {
    if (!this.okLabel) this.okLabel = 'Ok'
    if (!this.cancelLabel) this.cancelLabel = 'Cancel'
  }
}

export default () => ({
  restrict: 'E',
  replace: true,
  controllerAs: '$ctrl',
  bindToController: true,
  // transclude: true
  template: require('./ag-ok-cancel.html'),
  controller: Controller,
  scope: {
    okLabel: '@',
    cancelLabel: '@',
    isLoading: '<',
    okClick: '&',
    cancelClick: '&'
  }
})
