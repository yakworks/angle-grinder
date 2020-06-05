import AgBaseControl from '../AgBaseControl'
// import Log from '../../../utils/Log'
import _ from 'lodash'

class Controller extends AgBaseControl {
  rangeOptions = {}
  opts = {
    showOnFocus: true,
    fromField: {
      name: 'from',
      placeholder: 'from',
      step: 0.01
    },
    toField: {
      name: 'to',
      placeholder: 'to',
      step: 0.01
    }
  }

  $onInit() {
    _.merge(this.opts, this.rangeOptions)
    this.placeholder = this.opts.fromField.placeholder
    this.placeholderTo = this.opts.toField.placeholder

    super.onInit()
  }

  onChange() {
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name

    const fromToObj = { [fromFld]: this.valueFrom, [toFld]: this.valueTo }
    this.ngModelCtrl.$setViewValue(fromToObj)
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-amount-range.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    rangeOptions: '<'
  }
})
