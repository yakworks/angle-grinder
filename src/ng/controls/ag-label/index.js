// import Log from '../../../utils/Log'

class Controller {
  $onInit() {
    // if required is added it wont be undefined and may have blank str if no value is set
    if (this.required === '' || this.required === 'true' ||
        this.ngRequired === '' || this.ngRequired === 'true') {
      this.isRequired = true
    }
    if (this.formCtrl) {
      if (!this.isHorizontal) this.isHorizontal = this.formCtrl.isHorizontal
      if (!this.labelClass && this.formCtrl.labelClass) this.labelClass = this.formCtrl.labelClass
    }
    // this.labelClass = this.labelClass || 'label'
    // Log.debug("this.isHorizontal", this.isHorizontal)
  }
}

export default () => ({
  restrict: 'E',
  replace: true,
  controllerAs: '$ctrl',
  bindToController: true,
  transclude: true,
  template: require('./ag-label.html'),
  controller: Controller,
  require: {
    formCtrl: '^?agForm'
  },
  scope: {
    // label: '@',
    labelClass: '@',
    required: '@',
    ngRequired: '@',
    isHorizontal: '@'
  }
})
