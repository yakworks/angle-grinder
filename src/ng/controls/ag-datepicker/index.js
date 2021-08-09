import AgBaseControl from '../AgBaseControl'
// import Log from '../../../utils/Log'
// import _ from 'lodash'

class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
    if (this.isExpanded === '' || this.isExpanded === 'true') {
      this.expanded = true
    }
  }

  getDatepicker() {
    const input = this.$element.find('.input.is-datepicker')[0]
    return input.datepicker
  }

  showDatepicker() {
    if (this.isDisabled) return
    // this.getDatepicker().update()
    this.$scope.$evalAsync(() => {
      this.getDatepicker().show()
    })
    // this.$timeout(() => {
    //   this.getDatepicker().show()
    // })
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-datepicker.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    datepickerOptions: '<',
    isExpanded: '@'
  }
})
