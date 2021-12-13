import AgBaseControl from '../AgBaseControl'
import _ from 'lodash'
import controlsConfig from "../controlsConfig";

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

    _.merge(this.opts, controlsConfig.controls.ranges, this.rangeOptions)
    this.placeholderFrom = this.opts.fromField.placeholder
    this.placeholderTo = this.opts.toField.placeholder
    this.elementIdFrom = this.elementId + '_from'
    this.elementIdTo = this.elementId + '_to'
    super.onInit()
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name

    this.ngModelCtrl.$render = () => {
      let vmv = this.ngModelCtrl.$viewValue
      vmv = _.isEmpty(vmv) ? { [fromFld]: '', [toFld]: '' } : vmv
      // Log.debug('vmv', vmv)
      this.valueFrom = vmv[fromFld] || ''
      this.valueTo = vmv[toFld] || ''
    }
  }

  onChange() {
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name

    const fromToObj = { [fromFld]: this.valueFrom, [toFld]: this.valueTo }
    // Log.debug('onChange fromToObj', fromToObj)
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
