import AgBaseControl from '../AgBaseControl'
import { getConfig } from '../../../tools/AppConfig'
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
    const rangeConfig = getConfig().controls.ranges
    _.merge(this.opts, _.merge(rangeConfig, this.rangeOptions))
    this.placeholderFrom = this.opts.fromField.placeholder
    this.placeholderTo = this.opts.toField.placeholder
    this.elementIdFrom = this.elementId + '_from'
    this.elementIdTo = this.elementId + '_to'

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
